const AWS = require("aws-sdk");
const encryptionSdk = require("@aws-crypto/client-node");
const fs = require("fs");
const { createMimeMessage } = require("mimetext");
const { DateTime } = require("luxon");
const templates = require("./templates");

const logo = fs.readFileSync("./assets/logo.png", "base64");

const sesClient = new AWS.SES({
  region: process.env.REGION,
});

const { decrypt } = encryptionSdk.buildClient(
  encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT
);

const generatorKeyId = process.env.KMS_KEY_ALIAS;
const keyIds = [process.env.KMS_KEY];

const keyring = new encryptionSdk.KmsKeyringNode({ generatorKeyId, keyIds });

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

exports.handler = async (event) => {
  switch (event.triggerSource) {
    case "CustomEmailSender_AdminCreateUser": {
      const { plaintext: password } = await decrypt(
        keyring,
        Buffer.from(event.request.code, "base64")
      );
      const msg = createMimeMessage();
      msg.setSender(process.env.SES_EMAIL_IDENTITY);
      msg.setRecipient(event.request.userAttributes.email);
      msg.setSubject("Welcome to the MAS Insight Virtual Experience");
      msg.setAttachment("logo.png", "image/png", logo, {
        "Content-ID": "<logo.png>",
        "X-Attachment-Id": "logo.png",
      });
      msg.setMessage(
        "text/html",
        templates.user_invitation(
          '<img src="cid:logo.png" alt="MAS Holdings">',
          event.userName,
          password,
          "https://mas-insight-vercel.vercel.app/login"
        )
      );
      const sesParams = {
        RawMessage: {
          Data: msg.asRaw(),
        },
      };
      await sesClient.sendRawEmail(sesParams).promise();
      return;
    }
    case "CustomEmailSender_ForgotPassword": {
      const { plaintext: code } = await decrypt(
        keyring,
        Buffer.from(event.request.code, "base64")
      );
      const msg = createMimeMessage();
      msg.setSender(process.env.SES_EMAIL_IDENTITY);
      msg.setRecipient(event.request.userAttributes.email);
      msg.setSubject("You have requested a password change on MAS Insight");
      msg.setAttachment("logo.png", "image/png", logo, {
        "Content-ID": "<logo.png>",
        "X-Attachment-Id": "logo.png",
      });
      msg.setMessage(
        "text/html",
        templates.forgot_password(
          '<img src="cid:logo.png" alt="MAS Holdings">',
          code
        )
      );
      const sesParams = {
        RawMessage: {
          Data: msg.asRaw(),
        },
      };
      await sesClient.sendRawEmail(sesParams).promise();
      return;
    }
    case "CustomEmailSender_CreateMeeting": {
      const msg = createMimeMessage();
      msg.setSender(process.env.SES_EMAIL_IDENTITY);
      msg.setRecipient(event.user.email);
      if (event.info.participants) msg.setCc(event.info.participants);
      msg.setSubject("You are invited for a scheduled meeting on MAS Insight");
      msg.setAttachment("logo.png", "image/png", logo, {
        "Content-ID": "<logo.png>",
        "X-Attachment-Id": "logo.png",
      });
      msg.setMessage(
        "text/html",
        templates.meeting_invitation(
          '<img src="cid:logo.png" alt="MAS Holdings">',
          event.info.title,
          DateTime.fromISO(event.info.date)
            .toFormat("dd/LL/yyyy, hh:mm a")
            .concat(" (UTC)"),
          `https://mas-insight-vercel.vercel.app${event.info.tourUrl}`
        )
      );
      const sesParams = {
        RawMessage: {
          Data: msg.asRaw(),
        },
      };
      await sesClient.sendRawEmail(sesParams).promise();
      return;
    }
    case "CustomEmailSender_SupportMessage": {
      const msg = createMimeMessage();
      msg.setSender(process.env.SES_EMAIL_IDENTITY);
      msg.setRecipient("zanochvision@gmail.com");
      msg.setSubject(`MAS Insight: ${event.info.subject}`);
      msg.setMessage(
        "text/plain",
        `User: ${event.info.email}\nMessage: ${event.info.message}`
      );
      const sesParams = {
        RawMessage: {
          Data: msg.asRaw(),
        },
      };
      await sesClient.sendRawEmail(sesParams).promise();
      return;
    }
    default: {
      throw new Error("Trigger source not recognized.");
    }
  }
};
