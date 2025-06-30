const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

exports.handler = async (event) => {
  const params = {
    TableName: process.env.DDB_TABLE_NAME,
    Item: {
      userId: `${event.userName}::${event.request.userAttributes.sub}`,
      recordedAt: new Date().toISOString(),
      colIndex: "time",
      recordType: "sign_in",
    },
  };
  await client.put(params).promise();
  return event;
};
