#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkPipelinesElasticBeanstalkExampleStack } from '../lib/cdk-pipelines-elastic-beanstalk-example-stack';

const app = new cdk.App();
new CdkPipelinesElasticBeanstalkExampleStack(app, 'CdkPipelinesElasticBeanstalkExampleStack');
