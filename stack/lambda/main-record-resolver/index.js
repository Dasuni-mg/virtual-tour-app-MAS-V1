const AWS = require("aws-sdk");

const ddbClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

const resolverList = {
  Query: {
    getLatestRecord: async (event) => {
      const params = {
        TableName: process.env.DDB_RECORD_TABLE_NAME,
        FilterExpression:
          "recordedAt BETWEEN :min AND :max AND NOT begins_with(userId, :prefix)",
        ExpressionAttributeValues: {
          ":max": `${event.arguments.range.to}T23:59:59.999Z`,
          ":min": `${event.arguments.range.from}T00:00:00.000Z`,
          ":prefix": "master_admin::",
        },
      };
      const data = await ddbClient.scan(params).promise();
      const loginList = data.Items.filter(
        (item) => item.recordType === "sign_in"
      )
        .reduce((arr, item) => {
          let arrIndex = arr.findIndex(
            (i) => i.name === item.userId.split("::")[0]
          );
          if (arrIndex !== -1) {
            arr[arrIndex].count++;
          } else {
            arr.push({
              name: item.userId.split("::")[0],
              count: 1,
            });
          }
          return arr;
        }, [])
        .sort((a, b) => b.count - a.count);
      const tourAccessList = (
        await data.Items.filter(
          (item) => item.recordType === "tour_access"
        ).reduce(async (data, item) => {
          const arr = await data;
          let arrIndex = arr.findIndex((i) => i.path === item.extra.tourPath);
          if (arrIndex !== -1) arr[arrIndex].count++;
          else {
            const tourParams = {
              TableName: process.env.DDB_VT_TABLE_NAME,
              KeyConditionExpression: "#tour_url = :tour_url",
              ExpressionAttributeNames: {
                "#tour_url": "url",
              },
              ExpressionAttributeValues: {
                ":tour_url": `/tours/live${item.extra.tourPath}`,
              },
              IndexName: "index-url",
            };
            const {
              Items: [tour],
            } = await ddbClient.query(tourParams).promise();
            arr.push({
              path: item.extra.tourPath,
              id: tour.id,
              name: tour.name,
              count: 1,
            });
          }
          return arr;
        }, [])
      ).sort((a, b) => b.count - a.count);
      return {
        totalSignIn: loginList.reduce((t, i) => t + i.count, 0),
        mostTourAccess: tourAccessList[0],
        totalTourAccess: tourAccessList.reduce((t, i) => t + i.count, 0),
        rankedSignIn: loginList.reduce((arr, item) => {
          if (arr.length < 5) arr.push(item);
          else {
            let others = arr.splice(5, 1)[0] || { name: "Others", count: 0 };
            others.count += item.count;
            arr.push(others);
          }
          return arr;
        }, []),
        rankedTourAccess: tourAccessList.reduce((arr, item) => {
          if (arr.length < 5) arr.push(item);
          else {
            let others = arr.splice(5, 1)[0] || { name: "Others", count: 0 };
            others.count += item.count;
            arr.push(others);
          }
          return arr;
        }, []),
      };
    },
    getActivityLog: async (event) => {
      const limit = event.arguments.limit || 5;
      const params = {
        TableName: process.env.DDB_RECORD_TABLE_NAME,
        Limit: limit,
        KeyConditionExpression: "colIndex = :time",
        FilterExpression: "NOT begins_with(userId, :prefix)",
        ExpressionAttributeValues: {
          ":time": "time",
          ":prefix": "master_admin::",
        },
        ExclusiveStartKey:
          event.arguments.nextToken && JSON.parse(event.arguments.nextToken),
        ScanIndexForward: false,
        IndexName: "index-time",
      };
      const result = await ddbClient.query(params).promise();
      const tourData = await Promise.all(
        result.Items.reduce(
          (arr, item) =>
            !item.extra || arr.includes(item.extra.tourPath)
              ? arr
              : arr.concat([item.extra.tourPath]),
          []
        ).map((tour) => {
          const itemParams = {
            TableName: process.env.DDB_VT_TABLE_NAME,
            KeyConditionExpression: "#tour_url = :tour_url",
            ExpressionAttributeNames: {
              "#tour_url": "url",
            },
            ExpressionAttributeValues: {
              ":tour_url": `/tours/live${tour}`,
            },
            IndexName: "index-url",
          };
          return ddbClient
            .query(itemParams)
            .promise()
            .then(({ Items: [result] }) => ({
              name: result.name,
              path: tour,
            }));
        })
      );
      return {
        item: result.Items.map((item) => {
          return {
            ...item,
            userName: item.userId.split("::")[0],
            extra: item.extra && {
              tourPath: tourData.find(
                (tour) => tour.path === item.extra.tourPath
              ).name,
            },
          };
        }),
        nextToken:
          result.LastEvaluatedKey && JSON.stringify(result.LastEvaluatedKey),
      };
    },
    getUserReport: async (event) => {
      const params = {
        TableName: process.env.DDB_RECORD_TABLE_NAME,
        FilterExpression:
          "recordedAt BETWEEN :min AND :max AND NOT begins_with(userId, :prefix)",
        ExpressionAttributeValues: {
          ":max": `${event.arguments.range.to}T23:59:59.999Z`,
          ":min": `${event.arguments.range.from}T00:00:00.000Z`,
          ":prefix": "master_admin::",
        },
      };

      const data = await ddbClient.scan(params).promise();

      const loginList = data.Items.reduce((arr, item) => {
        if (item.recordType === "sign_in") {
          const username = item.userId.split("::")[0]; // Use userName instead of userId
          const existingUser = arr.find((entry) => entry.username === username);
          if (existingUser) {
            existingUser.loginCount++;
          } else {
            arr.push({ username, loginCount: 1 });
          }
        }
        return arr;
      }, []);

      const totalLoginCount = loginList.reduce(
        (total, user) => total + user.loginCount,
        0
      );

      return {
        users: loginList,
        total: totalLoginCount,
      };
    },
    getTourReport: async (event) => {
      const params = {
        TableName: process.env.DDB_RECORD_TABLE_NAME,
        FilterExpression:
          "recordedAt BETWEEN :min AND :max AND NOT begins_with(userId, :prefix)",
        ExpressionAttributeValues: {
          ":max": `${event.arguments.range.to}T23:59:59.999Z`,
          ":min": `${event.arguments.range.from}T00:00:00.000Z`,
          ":prefix": "master_admin::",
        },
      };
      const result = await ddbClient.scan(params).promise();
      const tourData = await Promise.all(
        result.Items.reduce(
          (arr, item) =>
            !item.extra || arr.includes(item.extra.tourPath)
              ? arr
              : arr.concat([item.extra.tourPath]),
          []
        ).map((tour) => {
          const itemParams = {
            TableName: process.env.DDB_VT_TABLE_NAME,
            KeyConditionExpression: "#tour_url = :tour_url",
            ExpressionAttributeNames: {
              "#tour_url": "url",
            },
            ExpressionAttributeValues: {
              ":tour_url": `/tours/live${tour}`,
            },
            IndexName: "index-url",
          };

          return ddbClient
            .query(itemParams)
            .promise()
            .then(({ Items: [result] }) => ({
              id: result.id,
              name: result.name,
              path: tour,
            }));
        })
      );
      const tourList = result.Items.reduce((arr, item) => {
        if (item.recordType === "tour_access") {
          const tourUrl = item.extra.tourPath;
          const existingTour = arr.find((entry) => entry.tourPath === tourUrl);
          if (existingTour) {
            existingTour.visitCount++;
          } else {
            const {
              id: tourId,
              name: tourName,
              path: tourPath,
            } = tourData.find((entry) => entry.path === tourUrl);
            arr.push({
              tourPath,
              tourId,
              tourName,
              visitCount: 1,
            });
          }
        }
        return arr;
      }, []);
      return {
        tours: tourList,
        total: tourList.reduce((total, tour) => total + tour.visitCount, 0),
      };
    },
    getSingleTourReport: async (event) => {
      const { tourId, range } = event.arguments;
      const params = {
        TableName: process.env.DDB_RECORD_TABLE_NAME,
        FilterExpression:
          "recordedAt BETWEEN :min AND :max AND NOT begins_with(userId, :prefix)",
        ExpressionAttributeValues: {
          ":max": `${range.to}T23:59:59.999Z`,
          ":min": `${range.from}T00:00:00.000Z`,
          ":prefix": "master_admin::",
        },
      };
      const result = await ddbClient.scan(params).promise();
      const tourData = await Promise.all(
        result.Items.reduce(
          (arr, item) =>
            !item.extra || arr.includes(item.extra.tourPath)
              ? arr
              : arr.concat([item.extra.tourPath]),
          []
        ).map((tour) => {
          const itemParams = {
            TableName: process.env.DDB_VT_TABLE_NAME,
            KeyConditionExpression: "#tour_url = :tour_url",
            ExpressionAttributeNames: {
              "#tour_url": "url",
            },
            ExpressionAttributeValues: {
              ":tour_url": `/tours/live${tour}`,
            },
            IndexName: "index-url",
          };
          return ddbClient
            .query(itemParams)
            .promise()
            .then(({ Items: [result] }) => ({
              id: result.id,
              name: result.name,
              path: tour,
            }));
        })
      );
      const tourList = result.Items.reduce((arr, item) => {
        if (item.recordType === "tour_access") {
          const username = item.userId.split("::")[0];
          const tourUrl = item.extra.tourPath;
          const existingTour = arr.find((entry) => entry.tourPath === tourUrl);
          if (existingTour) {
            existingTour.tours.push({
              accessedDate: item.recordedAt,
              username,
            });
          } else {
            const {
              id: tourId,
              name: tourName,
              path: tourPath,
            } = tourData.find((entry) => entry.path === tourUrl);
            arr.push({
              tourId,
              tourName,
              tourPath,
              tours: [{ accessedDate: item.recordedAt, username }],
            });
          }
        }
        return arr;
      }, []);
      const expectedTour = tourList.find((tour) => tour.tourId === tourId);
      return (
        expectedTour && {
          ...expectedTour,
          total: expectedTour.tours.length,
        }
      );
    },
  },
};

exports.handler = async (event) => {
  const typeHandler = resolverList[event.info.parentTypeName];
  if (typeHandler) {
    const resolver = typeHandler[event.info.fieldName];
    if (resolver) {
      return resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
