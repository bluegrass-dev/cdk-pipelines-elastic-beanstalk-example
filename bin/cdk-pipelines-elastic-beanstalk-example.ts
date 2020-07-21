#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkPipelineStack } from "../lib/CdkPipelineStack";
import { BeanstalkEnvironmentStage } from "../lib/BeanstalkEnvironmentStage";
const app = new cdk.App();

const pipeline = new CdkPipelineStack(app, "PipelineStack", {
  GitHubOwner: "bluegrass-dev",
  GitHubRepo: "cdk-pipelines-elastic-beanstalk-example",
  SolutionStackName: "64bit Amazon Linux 2018.03 v2.10.9 running Java 8",
  ApplicationName: "bluegrass",
});
