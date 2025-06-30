const { CognitoJwtVerifier } = require("aws-jwt-verify");
const AWS = require("aws-sdk");

const { ddbTableName, ddbRegion, ...awsConfig } = require("./config");

const verifier = CognitoJwtVerifier.create({
  ...awsConfig,
  tokenUse: "access",
});

const client = new AWS.DynamoDB.DocumentClient({
  region: ddbRegion,
});

function obtainCookieData(cookie) {
  return cookie?.[0].value.split(";").reduce((obj, item) => {
    const [key, value] = item.trim().split("=");
    return { ...obj, [key]: value };
  }, {});
}

async function verifyAccessToken(cookieList) {
  const accessTokenKey =
    cookieList &&
    Object.keys(cookieList).find((key) => key.endsWith(".accessToken"));
  return verifier.verify(accessTokenKey && cookieList[accessTokenKey]);
}

exports.handler = async (event) => {
  const { headers, ...rest } = event.Records[0].cf.request;
  const { cookie, ...restHeaders } = headers;
  const cookieList = obtainCookieData(cookie);
  let payload;
  try {
    payload = await verifyAccessToken(cookieList);
  } catch {
    return { status: 403 };
  }
  if (["/"].includes(rest.uri)) return { status: 404 };
  if (rest.uri.endsWith("/index.htm")) {
    const params = {
      TableName: ddbTableName,
      Item: {
        userId: `${payload.username}::${payload.sub}`,
        recordedAt: new Date().toISOString(),
        colIndex: "time",
        recordType: "tour_access",
        extra: { tourPath: rest.uri },
      },
    };
    await client.put(params).promise();
  }
  return { ...rest, headers: { ...restHeaders } };
};
