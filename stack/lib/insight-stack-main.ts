import * as appsync from "@aws-cdk/aws-appsync-alpha";
import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as ses from "aws-cdk-lib/aws-ses";
import { Construct } from "constructs";

export class InsightStackMain extends Stack {
  public readonly recordTable: dynamodb.Table;

  private emailIdentity = "zanochvision@gmail.com";

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.recordTable = new dynamodb.Table(this, "insight-RecordTable", {
      partitionKey: {
        name: "userId",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "recordedAt",
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.RETAIN,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    this.recordTable.addGlobalSecondaryIndex({
      indexName: "index-time",
      partitionKey: {
        name: "colIndex",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "recordedAt",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const lambdaTrigger = new lambda.Function(this, "insight-CognitoTrigger", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda/main-login-trigger"),
      handler: "index.handler",
      environment: {
        DDB_TABLE_NAME: this.recordTable.tableName,
        REGION: Stack.of(this).region,
      },
    });

    this.recordTable.grant(lambdaTrigger, "dynamodb:PutItem");

    //#region Custom email identity for sending emails.
    new ses.CfnEmailIdentity(this, "insight-SESEmailIdentity", {
      emailIdentity: this.emailIdentity,
    });
    //#endregion

    const emailSenderKey = new kms.Key(this, "insight-EmailSenderKey");
    const emailSenderKeyAlias = emailSenderKey.addAlias(
      "alias/email-sender-development"
    );

    //#region Lambda trigger function for sending emails.
    const emailSender = new lambda.Function(this, "insight-EmailSender", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda/email-template-sender"),
      handler: "index.handler",
      environment: {
        KMS_KEY: emailSenderKey.keyArn,
        KMS_ALIAS: emailSenderKeyAlias.keyArn,
        SES_EMAIL_IDENTITY: this.emailIdentity,
      },
    });

    emailSender.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["ses:SendRawEmail"],
        resources: ["*"],
      })
    );
    //#endregion

    // const sesTemplate = new ses.CfnTemplate(this, "insight-SESTemplate", {
    //   template: {
    //     subjectPart: "Meeting Creation",
    //     htmlPart: "Meeting ID: {{id}}",
    //   },
    // });

    const userPool = new cognito.UserPool(this, "insight-UserPool", {
      removalPolicy: RemovalPolicy.RETAIN,
      //#region Current user attributes.
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        fullname: {
          required: true,
          mutable: true,
        },
      },
      //#endregion
      //#region Updated user attributes.
      customAttributes: {
        country: new cognito.StringAttribute({ mutable: true }),
        company: new cognito.StringAttribute({ mutable: true }),
      },
      //#endregion
      //#region Changing Cognito email service.
      // email: cognito.UserPoolEmail.withSES({
      //   fromEmail: "zanochvision@gmail.com",
      // }),
      customSenderKmsKey: emailSenderKey,
      //#endregion
      // userInvitation: {
      //   emailSubject: "Welcome to MAS Insight Production Demo",
      //   emailBody: `
      //     <h3>Hi! Welcome to MAS Insight Production Demo.</h3>
      //     <p>Please login to the following link to verify your credentials.</p>
      //     <p>
      //       Link: <a href="https://mas-insight-vercel-prod.vercel.app/login">https://mas-insight-vercel-prod.vercel.app/login</a><br>
      //       Your username is: {username}<br>
      //       Your temporary password is: {####}
      //     </p>
      //   `,
      // },
      lambdaTriggers: {
        postAuthentication: lambdaTrigger,
        customEmailSender: emailSender,
        // customMessage: emailSender,
      },
    });

    emailSenderKey.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["kms:Encrypt"],
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal("cognito-idp.amazonaws.com")],
        resources: ["*"],
      })
    );

    emailSender.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["kms:Decrypt", "kms:DescribeKey"],
        effect: iam.Effect.ALLOW,
        resources: [emailSenderKey.keyArn],
      })
    );

    emailSender.addPermission("cognito-email-invoke", {
      principal: new iam.ServicePrincipal("cognito-idp.amazonaws.com"),
      action: "lambda:InvokeFunction",
    });

    new cognito.CfnUserPoolGroup(this, "MasterAdminGroup", {
      userPoolId: userPool.userPoolId,
      groupName: "MasterAdmin",
    });

    new cognito.CfnUserPoolGroup(this, "ClusterAdminGroup", {
      userPoolId: userPool.userPoolId,
      groupName: "ClusterAdmin",
    });

    new cognito.CfnUserPoolGroup(this, "VisitorGroup", {
      userPoolId: userPool.userPoolId,
      groupName: "Visitor",
    });

    const userPoolClient = new cognito.UserPoolClient(
      this,
      "insight-WebClient",
      { userPool }
    );

    const gqlApi = new appsync.GraphqlApi(this, "insight-GqlApi", {
      name: "InsightApi",
      schema: appsync.Schema.fromAsset("appsync/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
    });

    const emailSenderResolver = gqlApi.addLambdaDataSource(
      "EmailSenderResolver",
      emailSender
    );

    emailSenderResolver.createResolver({
      typeName: "Mutation",
      fieldName: "sendSupportMessage",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Mutation.sendSupportMessage.req.vtl"
      ),
    });

    const allocatedTourTable = new dynamodb.Table(
      this,
      "insight-AllocatedTourTable",
      {
        partitionKey: {
          name: "userId",
          type: dynamodb.AttributeType.STRING,
        },
        sortKey: {
          name: "tourId",
          type: dynamodb.AttributeType.STRING,
        },
        removalPolicy: RemovalPolicy.RETAIN,
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      }
    );

    const allocatedTourDataSource = gqlApi.addDynamoDbDataSource(
      "AllocatedTourTableDataSource",
      allocatedTourTable
    );

    allocatedTourDataSource.createResolver({
      typeName: "MasterAdmin",
      fieldName: "tours",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/MasterAdmin.tours.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/MasterAdmin.tours.res.vtl"
      ),
    });

    allocatedTourDataSource.createResolver({
      typeName: "ClusterAdmin",
      fieldName: "tours",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/ClusterAdmin.tours.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/ClusterAdmin.tours.res.vtl"
      ),
    });

    allocatedTourDataSource.createResolver({
      typeName: "Visitor",
      fieldName: "tours",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Visitor.tours.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Visitor.tours.res.vtl"
      ),
    });

    const clusterTable = new dynamodb.Table(this, "insight-ClusterTable", {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.RETAIN,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const clusterDataSource = gqlApi.addDynamoDbDataSource(
      "ClusterTableDataSource",
      clusterTable
    );

    clusterDataSource.createResolver({
      typeName: "Tour",
      fieldName: "cluster",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Tour.cluster.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Tour.cluster.res.vtl"
      ),
    });

    const virtualTourTable = new dynamodb.Table(
      this,
      "insight-VirtualTourTable",
      {
        partitionKey: {
          name: "id",
          type: dynamodb.AttributeType.STRING,
        },
        removalPolicy: RemovalPolicy.RETAIN,
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      }
    );

    virtualTourTable.addGlobalSecondaryIndex({
      indexName: "index-url",
      partitionKey: {
        name: "url",
        type: dynamodb.AttributeType.STRING,
      },
    });

    virtualTourTable.addGlobalSecondaryIndex({
      indexName: "index-cluster-id",
      partitionKey: {
        name: "clusterId",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const virtualTourDataSource = gqlApi.addDynamoDbDataSource(
      "VirtualTourTableDataSource",
      virtualTourTable
    );

    virtualTourDataSource.createResolver({
      typeName: "AllocatedTour",
      fieldName: "tour",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/AllocatedTour.tour.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/AllocatedTour.tour.res.vtl"
      ),
    });

    virtualTourDataSource.createResolver({
      typeName: "Cluster",
      fieldName: "tours",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Cluster.tours.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Cluster.tours.res.vtl"
      ),
    });

    virtualTourDataSource.createResolver({
      typeName: "Query",
      fieldName: "getAllTours",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Query.getAllTours.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Query.getAllTours.res.vtl"
      ),
    });

    virtualTourDataSource.createResolver({
      typeName: "Meeting",
      fieldName: "tour",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Meeting.tour.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Meeting.tour.res.vtl"
      ),
    });

    const meetingTable = new dynamodb.Table(this, "insight-MeetingTable", {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.RETAIN,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    meetingTable.addGlobalSecondaryIndex({
      indexName: "index-user-id",
      partitionKey: {
        name: "userId",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const meetingDataSource = gqlApi.addDynamoDbDataSource(
      "MeetingTableDataSource",
      meetingTable
    );

    meetingDataSource.createResolver({
      typeName: "MasterAdmin",
      fieldName: "meetings",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/MasterAdmin.meetings.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/MasterAdmin.meetings.res.vtl"
      ),
    });

    meetingDataSource.createResolver({
      typeName: "ClusterAdmin",
      fieldName: "meetings",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/ClusterAdmin.meetings.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/ClusterAdmin.meetings.res.vtl"
      ),
    });

    meetingDataSource.createResolver({
      typeName: "Visitor",
      fieldName: "meetings",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Visitor.meetings.req.vtl"
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        "appsync/resolvers/Visitor.meetings.res.vtl"
      ),
    });

    const cognitoResolver = new lambda.Function(
      this,
      "insight-GraphqlResolverCognito",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        code: lambda.Code.fromAsset("lambda/main-graphql-resolver"),
        handler: "index.handler",
        environment: {
          DDB_ALLOCATED_TOUR_TABLE_NAME: allocatedTourTable.tableName,
          DDB_MEETING_TABLE_NAME: meetingTable.tableName,
          DDB_RECORD_TABLE_NAME: this.recordTable.tableName,
          DDB_VIRTUAL_TOUR_TABLE_NAME: virtualTourTable.tableName,
          LAMBDA_EMAIL_SENDER: emailSender.functionName,
          REGION: Stack.of(this).region,
          USER_POOL_ID: userPool.userPoolId,
        },
        timeout: Duration.seconds(30),
      }
    );

    emailSender.grantInvoke(cognitoResolver);

    userPool.grant(
      cognitoResolver,
      "cognito-idp:AdminAddUserToGroup",
      "cognito-idp:AdminCreateUser",
      "cognito-idp:AdminDisableUser",
      "cognito-idp:AdminDeleteUser",
      "cognito-idp:AdminEnableUser",
      "cognito-idp:AdminGetUser",
      "cognito-idp:AdminListGroupsForUser",
      "cognito-idp:AdminUpdateUserAttributes",
      // "cognito-idp:ListUsersInGroup",
      "cognito-idp:ListUsers"
    );

    allocatedTourTable.grant(
      cognitoResolver,
      "dynamodb:Query",
      "dynamodb:BatchWriteItem"
    );

    meetingTable.grant(cognitoResolver, "dynamodb:PutItem");

    // cognitoResolver.addToRolePolicy(
    //   new iam.PolicyStatement({
    //     effect: iam.Effect.ALLOW,
    //     actions: ["ses:SendTemplatedEmail"],
    //     resources: ["*"],
    //   })
    // );

    this.recordTable.grant(cognitoResolver, "dynamodb:Query");

    virtualTourTable.grant(cognitoResolver, "dynamodb:GetItem");

    const cognitoResolverSource = gqlApi.addLambdaDataSource(
      "CognitoDataSource",
      cognitoResolver
    );

    cognitoResolverSource.createResolver({
      typeName: "Query",
      fieldName: "getCurrentUser",
    });

    cognitoResolverSource.createResolver({
      typeName: "Query",
      fieldName: "getUser",
    });

    cognitoResolverSource.createResolver({
      typeName: "Query",
      fieldName: "getAllUsers",
    });

    cognitoResolverSource.createResolver({
      typeName: "Mutation",
      fieldName: "createUser",
    });

    cognitoResolverSource.createResolver({
      typeName: "Mutation",
      fieldName: "editUser",
    });

    cognitoResolverSource.createResolver({
      typeName: "Mutation",
      fieldName: "toggleUser",
    });

    cognitoResolverSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteUser",
    });

    cognitoResolverSource.createResolver({
      typeName: "Mutation",
      fieldName: "createMeeting",
    });

    const recordResolver = new lambda.Function(
      this,
      "insight-GraphqlResolverRecord",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        code: lambda.Code.fromAsset("lambda/main-record-resolver"),
        handler: "index.handler",
        environment: {
          DDB_RECORD_TABLE_NAME: this.recordTable.tableName,
          DDB_VT_TABLE_NAME: virtualTourTable.tableName,
          REGION: Stack.of(this).region,
        },
      }
    );

    this.recordTable.grant(recordResolver, "dynamodb:Scan");
    this.recordTable.grant(recordResolver, "dynamodb:Query");
    virtualTourTable.grant(recordResolver, "dynamodb:Query");

    const recordResolverSource = gqlApi.addLambdaDataSource(
      "RecordDataSource",
      recordResolver
    );

    recordResolverSource.createResolver({
      typeName: "Query",
      fieldName: "getLatestRecord",
    });

    recordResolverSource.createResolver({
      typeName: "Query",
      fieldName: "getActivityLog",
    });

    recordResolverSource.createResolver({
      typeName: "Query",
      fieldName: "getUserReport",
    });

    recordResolverSource.createResolver({
      typeName: "Query",
      fieldName: "getTourReport",
    });

    recordResolverSource.createResolver({
      typeName: "Query",
      fieldName: "getSingleTourReport",
    });

    new CfnOutput(this, "userPoolId", {
      value: userPool.userPoolId,
    });

    new CfnOutput(this, "appClientId", {
      value: userPoolClient.userPoolClientId,
    });

    new CfnOutput(this, "graphqlEndpoint", {
      value: gqlApi.graphqlUrl,
    });

    new CfnOutput(this, "ddbTableName", {
      value: this.recordTable.tableName,
    });
  }
}
