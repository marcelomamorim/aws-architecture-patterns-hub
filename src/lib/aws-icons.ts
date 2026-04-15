import fs from "node:fs";
import path from "node:path";

export type AwsIconSize = 32 | 48;

export interface AwsIconMeta {
  name: string;
  canonicalName: string;
  src: Record<AwsIconSize, string>;
  alt: string;
  category?: string;
  aliases?: string[];
}

type PatternCategory = "event-driven" | "data" | "resilience" | "modernization";

const publicDir = path.resolve(process.cwd(), "public");

const serviceRegistry: AwsIconMeta[] = [
  {
    name: "AWS Lambda",
    canonicalName: "AWS Lambda",
    src: {
      32: "aws-icons/services/32/aws-lambda.svg",
      48: "aws-icons/services/48/aws-lambda.svg"
    },
    alt: "AWS Lambda icon",
    category: "compute"
  },
  {
    name: "Amazon EventBridge",
    canonicalName: "Amazon EventBridge",
    src: {
      32: "aws-icons/services/32/amazon-eventbridge.svg",
      48: "aws-icons/services/48/amazon-eventbridge.svg"
    },
    alt: "Amazon EventBridge icon",
    category: "application-integration",
    aliases: ["Amazon EventBridge Pipes"]
  },
  {
    name: "Amazon SQS",
    canonicalName: "Amazon SQS",
    src: {
      32: "aws-icons/services/32/amazon-sqs.svg",
      48: "aws-icons/services/48/amazon-sqs.svg"
    },
    alt: "Amazon SQS icon",
    category: "application-integration",
    aliases: ["Amazon Simple Queue Service"]
  },
  {
    name: "Amazon SNS",
    canonicalName: "Amazon SNS",
    src: {
      32: "aws-icons/services/32/amazon-sns.svg",
      48: "aws-icons/services/48/amazon-sns.svg"
    },
    alt: "Amazon SNS icon",
    category: "application-integration",
    aliases: ["Amazon Simple Notification Service"]
  },
  {
    name: "Amazon API Gateway",
    canonicalName: "Amazon API Gateway",
    src: {
      32: "aws-icons/services/32/amazon-api-gateway.svg",
      48: "aws-icons/services/48/amazon-api-gateway.svg"
    },
    alt: "Amazon API Gateway icon",
    category: "networking"
  },
  {
    name: "Amazon DynamoDB",
    canonicalName: "Amazon DynamoDB",
    src: {
      32: "aws-icons/services/32/amazon-dynamodb.svg",
      48: "aws-icons/services/48/amazon-dynamodb.svg"
    },
    alt: "Amazon DynamoDB icon",
    category: "database"
  },
  {
    name: "Amazon CloudWatch",
    canonicalName: "Amazon CloudWatch",
    src: {
      32: "aws-icons/services/32/amazon-cloudwatch.svg",
      48: "aws-icons/services/48/amazon-cloudwatch.svg"
    },
    alt: "Amazon CloudWatch icon",
    category: "management"
  },
  {
    name: "Amazon ECS",
    canonicalName: "Amazon Elastic Container Service",
    src: {
      32: "aws-icons/services/32/amazon-ecs.svg",
      48: "aws-icons/services/48/amazon-ecs.svg"
    },
    alt: "Amazon ECS icon",
    category: "containers",
    aliases: ["Amazon Elastic Container Service"]
  },
  {
    name: "AWS Step Functions",
    canonicalName: "AWS Step Functions",
    src: {
      32: "aws-icons/services/32/aws-step-functions.svg",
      48: "aws-icons/services/48/aws-step-functions.svg"
    },
    alt: "AWS Step Functions icon",
    category: "application-integration"
  },
  {
    name: "Amazon CloudFront",
    canonicalName: "Amazon CloudFront",
    src: {
      32: "aws-icons/services/32/amazon-cloudfront.svg",
      48: "aws-icons/services/48/amazon-cloudfront.svg"
    },
    alt: "Amazon CloudFront icon",
    category: "networking"
  },
  {
    name: "Amazon RDS",
    canonicalName: "Amazon RDS",
    src: {
      32: "aws-icons/services/32/amazon-rds.svg",
      48: "aws-icons/services/48/amazon-rds.svg"
    },
    alt: "Amazon RDS icon",
    category: "database",
    aliases: ["Amazon Relational Database Service"]
  },
  {
    name: "Amazon Cognito",
    canonicalName: "Amazon Cognito",
    src: {
      32: "aws-icons/services/32/amazon-cognito.svg",
      48: "aws-icons/services/48/amazon-cognito.svg"
    },
    alt: "Amazon Cognito icon",
    category: "security"
  },
  {
    name: "Amazon ElastiCache",
    canonicalName: "Amazon ElastiCache",
    src: {
      32: "aws-icons/services/32/amazon-elasticache.svg",
      48: "aws-icons/services/48/amazon-elasticache.svg"
    },
    alt: "Amazon ElastiCache icon",
    category: "database"
  },
  {
    name: "Amazon Kinesis Data Streams",
    canonicalName: "Amazon Kinesis Data Streams",
    src: {
      32: "aws-icons/services/32/amazon-kinesis-data-streams.svg",
      48: "aws-icons/services/48/amazon-kinesis-data-streams.svg"
    },
    alt: "Amazon Kinesis Data Streams icon",
    category: "analytics"
  },
  {
    name: "Amazon OpenSearch Service",
    canonicalName: "Amazon OpenSearch Service",
    src: {
      32: "aws-icons/services/32/amazon-opensearch-service.svg",
      48: "aws-icons/services/48/amazon-opensearch-service.svg"
    },
    alt: "Amazon OpenSearch Service icon",
    category: "analytics"
  },
  {
    name: "AWS AppSync",
    canonicalName: "AWS AppSync",
    src: {
      32: "aws-icons/services/32/aws-appsync.svg",
      48: "aws-icons/services/48/aws-appsync.svg"
    },
    alt: "AWS AppSync icon",
    category: "application-integration"
  },
  {
    name: "AWS DMS",
    canonicalName: "AWS Database Migration Service",
    src: {
      32: "aws-icons/services/32/aws-dms.svg",
      48: "aws-icons/services/48/aws-dms.svg"
    },
    alt: "AWS Database Migration Service icon",
    category: "database",
    aliases: ["AWS Database Migration Service"]
  },
  {
    name: "AWS WAF",
    canonicalName: "AWS WAF",
    src: {
      32: "aws-icons/services/32/aws-waf.svg",
      48: "aws-icons/services/48/aws-waf.svg"
    },
    alt: "AWS WAF icon",
    category: "security"
  }
];

const serviceIndex = new Map<string, AwsIconMeta>();

for (const item of serviceRegistry) {
  serviceIndex.set(item.name.toLowerCase(), item);

  for (const alias of item.aliases ?? []) {
    serviceIndex.set(alias.toLowerCase(), item);
  }
}

const categoryRegistry: Record<
  PatternCategory,
  { label: string; src: string; alt: string; awsCategory: string }
> = {
  "event-driven": {
    label: "Application Integration",
    src: "aws-icons/categories/32/application-integration.svg",
    alt: "AWS Application Integration category icon",
    awsCategory: "Application Integration"
  },
  data: {
    label: "Database",
    src: "aws-icons/categories/32/database.svg",
    alt: "AWS Database category icon",
    awsCategory: "Database"
  },
  resilience: {
    label: "Management and Governance",
    src: "aws-icons/categories/32/management-governance.svg",
    alt: "AWS Management and Governance category icon",
    awsCategory: "Management and Governance"
  },
  modernization: {
    label: "Migration and Modernization",
    src: "aws-icons/categories/32/migration-modernization.svg",
    alt: "AWS Migration and Modernization category icon",
    awsCategory: "Migration and Modernization"
  }
};

export function resolveAwsServiceIcon(service: string) {
  return serviceIndex.get(service.toLowerCase()) ?? null;
}

export function getAwsServiceIconPath(service: string, size: AwsIconSize) {
  return resolveAwsServiceIcon(service)?.src[size] ?? null;
}

export function getAwsCategoryIcon(category: PatternCategory) {
  return categoryRegistry[category];
}

export function assertAwsIconCoverage(services: Iterable<string>) {
  const missing = new Set<string>();

  for (const service of services) {
    const icon = resolveAwsServiceIcon(service);

    if (!icon) {
      missing.add(service);
      continue;
    }

    for (const asset of Object.values(icon.src)) {
      const iconPath = path.join(publicDir, asset);
      if (!fs.existsSync(iconPath)) {
        throw new Error(`Missing AWS icon asset for "${service}": ${asset}`);
      }
    }
  }

  if (missing.size > 0) {
    throw new Error(
      `Missing AWS icon mapping for services: ${Array.from(missing).sort((a, b) => a.localeCompare(b)).join(", ")}`
    );
  }
}
