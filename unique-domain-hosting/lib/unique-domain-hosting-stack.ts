import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class UniqueDomainHostingStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const domainName = this.node.tryGetContext('domainName');
    const {
      accountId,
      region,
    } = new cdk.ScopedAws(this);
    const hostedZoneId = route53.HostedZone.fromLookup(this, 'HostedZoneId', {
      domainName: domainName
    });
    const certificateManagerCertificate = new acm.DnsValidatedCertificate(this, 'CertificateManagerCertificate', {
      domainName: domainName,
      hostedZone: hostedZoneId,
      region: 'us-east-1',
      validation: acm.CertificateValidation.fromDns(),
    });
    const s3Bucket = new s3.Bucket(this, 'S3Bucket', {
      bucketName: `${domainName}-${region}-${accountId}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'CloudFrontOriginAccessIdentityy', {
      comment: 'Unique Domain Hosting Environment',
    })
    const cloudFrontDistribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
      domainNames: [domainName],
      defaultBehavior: {
        origin: new origins.S3Origin(s3Bucket, {
          originAccessIdentity: cloudFrontOAI
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responsePagePath: '/index.html',
          responseHttpStatus: 200,
          ttl: cdk.Duration.minutes(0),
        },
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
          responseHttpStatus: 200,
          ttl: cdk.Duration.minutes(0),
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      enabled: true,
      certificate: certificateManagerCertificate,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      defaultRootObject: 'index.html',
      enableIpv6: true,
    })
    new route53.ARecord(this, 'Route53RecordSet', {
      recordName: domainName,
      zone: hostedZoneId,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(cloudFrontDistribution)
      ),
    });
    new s3deploy.BucketDeployment(this, 'S3BucketDeploy', {
      sources: [s3deploy.Source.asset('./dist')],
      destinationBucket: s3Bucket,
      distribution: cloudFrontDistribution,
      distributionPaths: ['/*'],
    });
    new CfnOutput(this, 'DeployURL', {
      value: `https://${domainName}`,
    })
  }
}
