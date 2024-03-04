import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as location from 'aws-cdk-lib/aws-location';

export interface LocationServiceStackProps extends cdk.StackProps {
  readonly mapName: string;
  readonly placeIndexName: string;
  readonly routeCalculatorName: string;
  readonly apiKeyName: string;
}

/**
 * Amazon Location Service Creation
 */
export class LocationServiceStack extends cdk.Stack {
  public constructor(scope: Construct, id: string, props: LocationServiceStackProps) {
    super(scope, id, props);
    // Amazon Location Service APIKey
    const locationServiceApiKey = new location.CfnAPIKey(this, 'LocationServiceAPIKey', {
      description: 'Amazon Location Service APIKey',
      keyName: `${props.apiKeyName!}`,
      noExpiry: true,
      restrictions: {
        allowActions: [
          'geo:GetMap*',
          'geo:SearchPlaceIndexForPosition',
          'geo:CalculateRoute',
        ],
        allowResources: [
          `arn:aws:geo:${this.region}:${this.account}:map/${props.mapName}`,
          `arn:aws:geo:${this.region}:${this.account}:place-index/${props.placeIndexName}`,
          `arn:aws:geo:${this.region}:${this.account}:route-calculator/${props.routeCalculatorName}`,
        ],
      },
    });
    // Amazon Location Service Map
    const locationServiceMap = new location.CfnMap(this, 'LocationServiceMap', {
      configuration: {
        style: 'VectorHereExplore',
      },
      description: 'Amazon Location Service Map',
      mapName: props.mapName,
      pricingPlan: 'RequestBasedUsage',
    });
    // Amazon Location Service Place Index
    const locationServicePlaceIndex = new location.CfnPlaceIndex(this, 'LocationServicePlaceIndex', {
      dataSource: 'Here',
      dataSourceConfiguration: {
        intendedUse: 'SingleUse',
      },
      description: 'Amazon Location Service PlaceIndex',
      indexName: props.placeIndexName,
      pricingPlan: 'RequestBasedUsage',
    });
    // Amazon Location Service Route Calculator
    const locationServiceRouteCalculator = new location.CfnRouteCalculator(this, 'LocationServiceRouteCalculator', {
      dataSource: 'Here',
      description: 'Amazon Location Service eRouteCalculator',
      calculatorName: props.routeCalculatorName,
      pricingPlan: 'RequestBasedUsage',
    });
    // Outputs
    new cdk.CfnOutput(this, 'CfnOutputRegionName', {
      description: 'Region Name',
      value: this.region,
      //value: `${this.region}`.toString(),
    });
    new cdk.CfnOutput(this, 'CfnOutputMapName', {
      description: 'Map Name',
      value: locationServiceMap.ref,
    });
    new cdk.CfnOutput(this, 'CfnOutputPlaceIndexName', {
      description: 'PlaceIndex Name',
      value: locationServicePlaceIndex.ref,
    });
    new cdk.CfnOutput(this, 'CfnOutputRouteCalculatorName', {
      description: 'RouteCalculator Name',
      value: locationServiceRouteCalculator.ref,
    });
  }
}
