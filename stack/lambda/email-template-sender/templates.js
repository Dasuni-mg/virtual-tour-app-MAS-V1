module.exports = {
  forgot_password: (logo, code) => /* HTML */ `<body
    style="
    box-sizing: border-box;
      width: 90%;
      margin: 0 auto;
      padding: 32px;
      background: #212121;
      color: #ffffff;
      font-family: sans-serif;
      text-align: center;
    "
  >
    ${logo}
    <h2 style="padding: 0 16px">MAS Insight Virtual Experience</h2>
    <p style="padding: 0 16px">Dear User,</p>
    <p style="padding: 0 16px">
      We received your request to reset your password.
    </p>
    <p style="padding: 0 16px">
      <span style="display: block"><b>Your Secret Code:</b> ${code}</span>
    </p>
    <p style="padding: 0 16px">
      <span style="display: block"
        >Use the above code to reset your password.</span
      >
      <span style="display: block"
        >If you did not forget your password, you can ignore this email.</span
      >
    </p>
    <p style="padding: 0 16px">
      For further assistance, please contact the admin on +94 76 566 9111.
    </p>
    <p style="padding: 0 16px">
      <span style="display: block">Thank You</span>
      <span style="display: block">MAS Insight</span>
    </p>
  </body>`,
  meeting_invitation: (logo, title, when, link) => /* HTML */ `<body
    style="
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto;
    padding: 32px;
    background: #212121;
    color: #ffffff;
    font-family: sans-serif;
    text-align: center;
  "
  >
    ${logo}
    <h2 style="padding: 0 16px">MAS Insight Virtual Experience</h2>
    <p style="padding: 0 16px">Dear User,</p>
    <p style="padding: 0 16px">
      The management of MAS Holdings invites you to join the
      <b>MAS Insight Virtual Experience</b>.
    </p>
    <p style="padding: 0 16px">Your meeting schedule will be as follows:</p>
    <p style="padding: 0 16px">
      <span style="display: block"><b>Title:</b> ${title}</span>
      <span style="display: block"><b>When:</b> ${when}</span>
    </p>
    <p style="padding: 0 16px">
      The host will let you in once the meeting commences.
    </p>
    <p style="padding: 0 16px">Click on the button below to join the tour.</p>
    <a
      style="
      display: inline-block;
      margin: 0 16px;
      padding: 12px 16px;
      background: #ed1c24;
      color: #ffffff;
      text-decoration: none;
      text-transform: uppercase;
      border-radius: 8px;
    "
      href="${link}"
      >Join tour</a
    >
    <p style="padding: 0 16px">
      For further assistance, please contact the admin on +94 76 566 9111.
    </p>
    <p style="padding: 0 16px">
      <span style="display: block">Thank You,</span>
      <span style="display: block">MAS Insight</span>
    </p>
  </body>`,
  user_invitation: (logo, username, password, link) => /* HTML */ `<body
    style="
    box-sizing: border-box;
      width: 90%;
      margin: 0 auto;
      padding: 32px;
      background: #212121;
      color: #ffffff;
      font-family: sans-serif;
      text-align: center;
    "
  >
    ${logo}
    <h2 style="padding: 0 16px">MAS Insight Virtual Experience</h2>
    <p style="padding: 0 16px">
      MAS Holdings Invites you to join in on the MAS Insight Virtual Experience.
    </p>
    <p style="padding: 0 16px">
      The platform will give you an opportunity to understand and gain an
      in-depth experience of our operations and manufacturing process of
      crafting the worlds finest quality garments while also interacting with
      our teams on comprehensive live guided tour.
    </p>
    <p style="padding: 0 16px">Please find your login credentials below:</p>
    <p style="padding: 0 16px">
      <span style="display: block"><b>Username:</b> ${username}</span>
      <span style="display: block"><b>Password:</b> ${password}</span>
    </p>
    <a
      style="
        display: inline-block;
        margin: 0 16px;
        padding: 12px 16px;
        background: #ed1c24;
        color: #ffffff;
        text-decoration: none;
        text-transform: uppercase;
        border-radius: 8px;
      "
      href="${link}"
      >Join now</a
    >
    <p style="padding: 0 16px">
      Please note during the initial login, the system will request for a
      password change.
    </p>
    <p style="padding: 0 16px">
      For further assistance, please contact the admin on +94 76 566 9111.
    </p>
    <p style="padding: 0 16px">
      <span style="display: block">Thank You</span>
      <span style="display: block">MAS Insight</span>
    </p>
  </body>`,
};
