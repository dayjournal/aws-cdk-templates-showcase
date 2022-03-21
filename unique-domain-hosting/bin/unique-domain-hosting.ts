#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { UniqueDomainHostingStack } from '../lib/unique-domain-hosting-stack';

const app = new cdk.App();
new UniqueDomainHostingStack(app, 'UniqueDomainHostingStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});