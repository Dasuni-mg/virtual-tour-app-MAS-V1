import { CfnOutput, RemovalPolicy, Size, Stack, StackProps } from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export interface InsightStackVTProps extends StackProps {
  recordTable: dynamodb.Table;
}

export class InsightStackVT extends Stack {
  constructor(scope: Construct, id: string, props: InsightStackVTProps) {
    super(scope, id, props);

    const vtHostBucket = new s3.Bucket(this, "insight-VtHostBucket", {
      removalPolicy: RemovalPolicy.RETAIN,
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "origin-access"
    );
    vtHostBucket.grantRead(originAccessIdentity);

    const vtHostHandler = new cloudfront.experimental.EdgeFunction(
      this,
      "insight-VtHostHandler",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        code: lambda.Code.fromAsset("lambda/vt-host-handler"),
        handler: "index.handler",
      }
    );

    props.recordTable.grant(vtHostHandler, "dynamodb:PutItem");

    const vtHostDistribution = new cloudfront.Distribution(
      this,
      "insight-VtHostDistribution",
      {
        defaultBehavior: {
          origin: new cloudfrontOrigins.S3Origin(vtHostBucket, {
            originAccessIdentity,
          }),
          edgeLambdas: [
            {
              functionVersion: vtHostHandler.currentVersion,
              eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            },
          ],
        },
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 404,
            responsePagePath: "/errors/404.html",
          },
          {
            httpStatus: 403,
            responseHttpStatus: 403,
            responsePagePath: "/errors/403.html",
          },
        ],
      }
    );

    // new s3Deployment.BucketDeployment(this, "bucket-deploy", {
    //   sources: [s3Deployment.Source.asset("vt-host-bucket")],
    //   destinationBucket: vtHostBucket,
    //   distribution: vtHostDistribution,
    //   memoryLimit: 4096,
    //   ephemeralStorageSize: Size.gibibytes(20),
    // });

    new CfnOutput(this, "cloudfrontDomain", {
      value: vtHostDistribution.domainName,
    });
  }
}
