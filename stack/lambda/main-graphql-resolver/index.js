const AWS = require("aws-sdk");
const crypto = require("crypto");
const { DateTime, Interval } = require("luxon");

const cognitoClient = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REGION,
});

const ddbClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

const lambdaClient = new AWS.Lambda({
  region: process.env.REGION,
});

async function getUser(username) {
  const getUserParams = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: username,
  };
  const user = await cognitoClient.adminGetUser(getUserParams).promise();
  const attributes = user.UserAttributes.reduce(
    (obj, entry) => ({ ...obj, [entry.Name]: entry.Value }),
    {}
  );

  const [type, companyName] = attributes["custom:company"]
    ? attributes["custom:company"].split(":")
    : [];

  const listGroupsParams = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: username,
  };
  const {
    Groups: [group],
  } = await cognitoClient.adminListGroupsForUser(listGroupsParams).promise();

  const lastSignedInParams = {
    TableName: process.env.DDB_RECORD_TABLE_NAME,
    KeyConditionExpression: "userId = :id",
    FilterExpression: "recordType = :type",
    ExpressionAttributeValues: {
      ":id": `${username}::${attributes.sub}`,
      ":type": "sign_in",
    },
    Limit: 1,
    ScanIndexForward: false,
  };
  const lastSignedIn = await ddbClient.query(lastSignedInParams).promise();

  return {
    __typename: group.GroupName,
    id: `${username}::${attributes.sub}`,
    name: attributes.name,
    email: attributes.email,
    country: attributes["custom:country"],
    company: {
      name: companyName,
      external: type === "external",
    },
    enabled: user.Enabled,
    createdAt: user.UserCreateDate,
    signedInAt: lastSignedIn.Items[0]?.recordedAt,
  };
}

const resolverList = {
  Query: {
    getCurrentUser: async (event) => {
      return await getUser(event.identity.username);
    },
    getUser: async (event) => {
      return await getUser(event.arguments.username);
    },
    getAllUsers: async (event) => {
      let params = {
        UserPoolId: process.env.USER_POOL_ID,
      };
      const data = await cognitoClient.listUsers(params).promise();

      const extraUserDetailsList = await Promise.all(
        data.Users.map((user) => {
          const attributes = user.Attributes.reduce(
            (obj, entry) => ({ ...obj, [entry.Name]: entry.Value }),
            {}
          );

          const lastSignedInParams = {
            TableName: process.env.DDB_RECORD_TABLE_NAME,
            KeyConditionExpression: "userId = :id",
            FilterExpression: "recordType = :type",
            ExpressionAttributeValues: {
              ":id": `${user.Username}::${attributes.sub}`,
              ":type": "sign_in",
            },
            Limit: 1,
            ScanIndexForward: false,
          };

          const listGroupsParams = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: user.Username,
          };

          return Promise.all([
            ddbClient.query(lastSignedInParams).promise(),
            cognitoClient.adminListGroupsForUser(listGroupsParams).promise(),
          ]);
        })
      );

      const filterFunctions = {
        names: (valueArray, user) =>
          valueArray
            .map((value) => value.toLowerCase())
            .some((value) => user.name.toLowerCase().includes(value)),
        emails: (valueArray, user) =>
          valueArray
            .map((value) => value.toLowerCase())
            .some((value) => user.email.toLowerCase().includes(value)),
        groups: (valueArray, user) =>
          valueArray
            .map((value) => value.toLowerCase())
            .includes(user.__typename.toLowerCase()),
        countries: (valueArray, user) =>
          valueArray
            .map((value) => value.toLowerCase())
            .some((value) => user.country.toLowerCase().includes(value)),
        companies: (valueArray, user) =>
          valueArray
            .map((value) => value.toLowerCase())
            .some((value) => user.company.name.toLowerCase().includes(value)),
        latest: (valueRange, user) =>
          Interval.fromDateTimes(
            DateTime.fromISO(valueRange.from),
            DateTime.fromISO(valueRange.to).plus({ days: 1 })
          ).contains(DateTime.fromISO(user.signedInAt)),
        enabled: (value, user) => value === user.enabled,
      };

      const nextToken = event.arguments.nextToken || 0;
      const limit = event.arguments.limit || 10;

      const item = data.Users.map((user, index) => {
        const attributes = user.Attributes.reduce(
          (obj, entry) => ({ ...obj, [entry.Name]: entry.Value }),
          {}
        );

        const [type, companyName] = attributes["custom:company"]
          ? attributes["custom:company"].split(":")
          : [];

        return {
          __typename: extraUserDetailsList[index][1].Groups[0].GroupName,
          id: `${user.Username}::${attributes.sub}`,
          name: attributes.name,
          email: attributes.email,
          //#region Updated user attributes
          country: attributes["custom:country"],
          company: {
            name: companyName,
            external: type === "external",
          },
          //#endregion
          enabled: user.Enabled,
          createdAt: user.UserCreateDate,
          signedInAt: extraUserDetailsList[index][0].Items[0]?.recordedAt,
        };
      }).filter((user) =>
        event.arguments.filter
          ? Object.keys(event.arguments.filter).reduce(
              (result, key) =>
                result &&
                filterFunctions[key](event.arguments.filter[key], user),
              true
            )
          : true
      );

      return {
        item: item.slice(nextToken, nextToken + limit),
        nextToken: nextToken + limit < item.length ? nextToken + limit : null,
      };
    },
  },
  Mutation: {
    /* #region createUser */
    createUser: async (event) => {
      const cognitoCreateUserParams = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: event.arguments.username,
        UserAttributes: [
          {
            Name: "email",
            Value: event.arguments.email,
          },
          {
            Name: "email_verified",
            Value: "true",
          },
          {
            Name: "name",
            Value: event.arguments.name,
          },
          //#region Updated user attributes
          {
            Name: "custom:country",
            Value: event.arguments.country,
          },
          {
            Name: "custom:company",
            Value: `${event.arguments.external ? "external" : "internal"}:${
              event.arguments.company
            }`,
          },
          //#endregion
        ],
        DesiredDeliveryMediums: ["EMAIL"],
      };
      const data = await cognitoClient
        .adminCreateUser(cognitoCreateUserParams)
        .promise();
      const id = `${data.User.Username}::${
        data.User.Attributes.find((entry) => entry.Name === "sub").Value
      }`;

      const cognitoAddToGroupParams = {
        GroupName: event.arguments.typename,
        Username: data.User.Username,
        UserPoolId: process.env.USER_POOL_ID,
      };
      await cognitoClient
        .adminAddUserToGroup(cognitoAddToGroupParams)
        .promise();

      const ddbParams = {
        RequestItems: {
          [process.env.DDB_ALLOCATED_TOUR_TABLE_NAME]:
            event.arguments.allocatedTours.map((tourId) => ({
              PutRequest: {
                Item: {
                  userId: id,
                  tourId: tourId,
                },
              },
            })),
        },
      };
      if (
        ddbParams.RequestItems[process.env.DDB_ALLOCATED_TOUR_TABLE_NAME].length
      )
        await ddbClient.batchWrite(ddbParams).promise();

      return id;
    },
    /* #endregion */

    /* #region editUser */
    editUser: async (event) => {
      const cognitoParams = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: event.arguments.id.split("::")[0],
        UserAttributes: [
          {
            Name: "email",
            Value: event.arguments.email,
          },
          {
            Name: "name",
            Value: event.arguments.name,
          },
          {
            Name: "custom:country",
            Value: event.arguments.country,
          },
          {
            Name: "custom:company",
            Value: `${event.arguments.external ? "external" : "internal"}:${
              event.arguments.company
            }`,
          },
        ],
      };
      await cognitoClient.adminUpdateUserAttributes(cognitoParams).promise();

      const ddbQueryParams = {
        TableName: process.env.DDB_ALLOCATED_TOUR_TABLE_NAME,
        KeyConditionExpression: "userId = :id",
        ExpressionAttributeValues: {
          ":id": event.arguments.id,
        },
      };
      const data = await ddbClient.query(ddbQueryParams).promise();
      let toursFound = data.Items.map((item) => item.tourId);

      let ddbParams = {
        RequestItems: {
          [process.env.DDB_ALLOCATED_TOUR_TABLE_NAME]:
            event.arguments.allocatedTours
              .filter((tourId) => !toursFound.includes(tourId))
              .map((tourId) => ({
                PutRequest: {
                  Item: {
                    userId: event.arguments.id,
                    tourId,
                  },
                },
              }))
              .concat(
                toursFound
                  .filter(
                    (item) => !event.arguments.allocatedTours.includes(item)
                  )
                  .map((tourId) => ({
                    DeleteRequest: {
                      Key: {
                        userId: event.arguments.id,
                        tourId,
                      },
                    },
                  }))
              ),
        },
      };
      if (
        ddbParams.RequestItems[process.env.DDB_ALLOCATED_TOUR_TABLE_NAME].length
      )
        await ddbClient.batchWrite(ddbParams).promise();

      return event.arguments.id;
    },
    /* #endregion */
    /* #region toggleUser */
    toggleUser: async (event) => {
      const params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: event.arguments.id.split("::")[0],
      };
      const toggleFunction = event.arguments.enable
        ? cognitoClient.adminEnableUser
        : cognitoClient.adminDisableUser;
      await toggleFunction.call(cognitoClient, params).promise();
      return event.arguments.id;
    },
    /* #endregion */
    /* #region deleteUser */
    deleteUser: async (event) => {
      const params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: event.arguments.id.split("::")[0],
      };
      await cognitoClient.adminDeleteUser(params).promise();

      const ddbQueryParams = {
        TableName: process.env.DDB_ALLOCATED_TOUR_TABLE_NAME,
        KeyConditionExpression: "userId = :id",
        ExpressionAttributeValues: {
          ":id": event.arguments.id,
        },
      };
      const data = await ddbClient.query(ddbQueryParams).promise();

      const ddbParams = {
        RequestItems: {
          [process.env.DDB_ALLOCATED_TOUR_TABLE_NAME]: data.Items.map(
            ({ tourId }) => ({
              DeleteRequest: {
                Key: {
                  userId: event.arguments.id,
                  tourId,
                },
              },
            })
          ),
        },
      };
      if (
        ddbParams.RequestItems[process.env.DDB_ALLOCATED_TOUR_TABLE_NAME].length
      )
        await ddbClient.batchWrite(ddbParams).promise();

      return event.arguments.id;
    },
    /* #endregion */
    /* #region createMeeting */
    createMeeting: async (event) => {
      const Item = {
        id: crypto.randomUUID(),
        ...event.arguments,
        userId: `${event.identity.username}::${event.identity.sub}`,
      };
      const ddbParams = {
        TableName: process.env.DDB_MEETING_TABLE_NAME,
        Item,
      };
      await ddbClient.put(ddbParams).promise();

      const user = await getUser(event.identity.username);

      const tourParams = {
        TableName: process.env.DDB_VIRTUAL_TOUR_TABLE_NAME,
        Key: {
          id: event.arguments.tourId,
        },
      };

      const tour = await ddbClient.get(tourParams).promise();

      const lambdaParams = {
        FunctionName: process.env.LAMBDA_EMAIL_SENDER,
        InvocationType: "Event",
        Payload: JSON.stringify({
          triggerSource: "CustomEmailSender_CreateMeeting",
          user,
          info: { ...event.arguments, tourUrl: tour.Item.url },
        }),
      };

      await lambdaClient.invoke(lambdaParams).promise();
      return Item;
    },
    /* #endregion */
  },
};

exports.handler = (event) => {
  const typeHandler = resolverList[event.info.parentTypeName];
  if (typeHandler) {
    const resolver = typeHandler[event.info.fieldName];
    if (resolver) {
      return resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
