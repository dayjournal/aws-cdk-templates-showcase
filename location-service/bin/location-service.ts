#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LocationServiceStack } from '../lib/location-service-stack';

const app = new cdk.App();
new LocationServiceStack(app, 'location-service', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  apiKeyName: 'LocationServiceApiKey',
  mapName: 'LocationServiceMap',
  placeIndexName: 'LocationServicePlace',
  routeCalculatorName: 'LocationServiceRoute',
});
