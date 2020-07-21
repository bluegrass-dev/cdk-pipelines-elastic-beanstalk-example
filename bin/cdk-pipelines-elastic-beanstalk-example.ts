#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkPipelineStack } from "../lib/CdkPipelineStack";
import { BeanstalkApplicationStack } from "../lib/BeanstalkApplicationStack";
import { BeanstalkEnvironmentStack } from "../lib/BeanstalkEnvironmentStack";
import { BeanstalkEnvironmentStage } from "../lib/BeanstalkEnvironmentStage";
const app = new cdk.App();

const application = new BeanstalkApplicationStack(app, "ApplicationStack", {
  ApplicationName: "bluegrass",
});

const pipeline = new CdkPipelineStack(app, "PipelineStack", {
  GitHubOwner: "bluegrass",
  GitHubRepo: "cdk-pipelines-elastic-beanstalk-example",
});

pipeline.cdkPipeline.addApplicationStage(
  new BeanstalkEnvironmentStage(app, "dev", {
    ApplicationName: application.applicationName.value,
    EnvironmentName: "dev",
    SolutionStackName: "64bit Amazon Linux 2018.03 v2.10.9 running Java 8",
  })
);
