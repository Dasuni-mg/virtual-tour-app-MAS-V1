#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { InsightStackMain } from "../lib/insight-stack-main";
import { InsightStackVT } from "../lib/insight-stack-vt";

const app = new cdk.App();

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const main = new InsightStackMain(app, "InsightMain-Development", { env });
new InsightStackVT(app, "InsightVT-Development", {
  env,
  recordTable: main.recordTable,
});
