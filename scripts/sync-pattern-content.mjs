import fs from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const contentDir = path.join(rootDir, "src", "content", "patterns");

const labels = {
  pt: {
    overview: "Conceito geral",
    diagram: "Representacao grafica",
    flow: "Fluxo visual",
    tradeoffs: "Trade-offs principais",
    checklist: "Checklist rapido",
    fit: "Quando faz sentido",
    warning: "Sinais de alerta",
    aws: "Implementacao na AWS",
    mistakes: "Erros comuns",
    comparisons: "Comparacoes rapidas"
  },
  en: {
    overview: "General concept",
    diagram: "Graphical representation",
    flow: "Visual flow",
    tradeoffs: "Key trade-offs",
    checklist: "Quick checklist",
    fit: "Strong fit",
    warning: "Warning signs",
    aws: "AWS implementation",
    mistakes: "Common mistakes",
    comparisons: "Quick comparisons"
  }
};

const referenceLibrary = {
  "aws-api-gateway-usage-plans": {
    title: "Usage plans and API keys for REST APIs in API Gateway",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "Amazon API Gateway Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html"
  },
  "aws-api-gateway-welcome": {
    title: "What is Amazon API Gateway?",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "Amazon API Gateway Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"
  },
  "aws-appsync-pipeline-js": {
    title: "Configuring and using pipeline resolvers in AWS AppSync (JavaScript)",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS AppSync Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/appsync/latest/devguide/pipeline-resolvers-js.html"
  },
  "aws-builders-dependency-isolation": {
    title: "Using dependency isolation to contain concurrency overload",
    authors: ["Amazon Web Services"],
    year: 2020,
    publisher: "Amazon Builders' Library",
    type: "article",
    url: "https://aws.amazon.com/builders-library/dependency-isolation/"
  },
  "aws-builders-idempotent-apis": {
    title: "Making retries safe with idempotent APIs",
    authors: ["Malcolm Featonby"],
    year: 2021,
    publisher: "Amazon Builders' Library",
    type: "article",
    url: "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/"
  },
  "aws-builders-timeouts-retries": {
    title: "Timeouts, retries, and backoff with jitter",
    authors: ["Marc Brooker"],
    year: 2020,
    publisher: "Amazon Builders' Library",
    type: "article",
    url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
  },
  "aws-cache-read": {
    title: "Cache read behavior",
    authors: ["Amazon Web Services"],
    year: 2024,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/dynamodb-elasticache-integration/cache-read.html"
  },
  "aws-cache-write": {
    title: "Cache write behavior",
    authors: ["Amazon Web Services"],
    year: 2024,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/dynamodb-elasticache-integration/cache-write.html"
  },
  "aws-circuit-breaker": {
    title: "Circuit breaker pattern",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html"
  },
  "aws-cqrs-pattern": {
    title: "CQRS pattern",
    authors: ["Amazon Web Services"],
    year: 2024,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/cqrs-pattern.html"
  },
  "aws-database-per-service": {
    title: "Database-per-service pattern",
    authors: ["Amazon Web Services"],
    year: 2024,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/database-per-service.html"
  },
  "aws-event-sourcing": {
    title: "Event sourcing pattern",
    authors: ["Amazon Web Services"],
    year: 2024,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/event-sourcing.html"
  },
  "aws-eventbridge-pipes": {
    title: "Amazon EventBridge Pipes",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "Amazon EventBridge User Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html"
  },
  "aws-eventbridge-pipes-concepts": {
    title: "Amazon EventBridge Pipes concepts",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "Amazon EventBridge User Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/pipes-concepts.html"
  },
  "aws-eventbridge-bus": {
    title: "Amazon EventBridge event buses",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "Amazon EventBridge User Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html"
  },
  "aws-lambda-sqs-configure": {
    title: "Creating and configuring an Amazon SQS event source mapping",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS Lambda Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html"
  },
  "aws-lambda-sqs-scaling": {
    title: "Configuring scaling behavior for SQS event source mappings",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS Lambda Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html"
  },
  "aws-lambda-timeout": {
    title: "Configure Lambda function timeout",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS Lambda Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html"
  },
  "aws-pg-retry-backoff": {
    title: "Retry with backoff pattern",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html"
  },
  "aws-powertools-idempotency": {
    title: "Idempotency - Powertools for AWS Lambda (TypeScript)",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "Powertools for AWS Lambda documentation",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/powertools/typescript/main/features/idempotency/"
  },
  "aws-rate-based-rules": {
    title: "Using rate-based rule statements in AWS WAF",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS WAF Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html"
  },
  "aws-saga-pattern": {
    title: "Saga pattern",
    authors: ["Amazon Web Services"],
    year: 2024,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/saga-pattern.html"
  },
  "aws-sns-a2a": {
    title: "Using Amazon SNS for application-to-application messaging",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "Amazon SNS Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/sns/latest/dg/sns-system-to-system-messaging.html"
  },
  "aws-sns-fanout-lambda": {
    title: "Fanout Amazon SNS notifications to Lambda functions for automated processing",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "Amazon SNS Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/sns/latest/dg/sns-lambda-as-subscriber.html"
  },
  "aws-stepfunctions-best-practices": {
    title: "Best practices for Step Functions",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS Step Functions Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html"
  },
  "aws-stepfunctions-error-handling": {
    title: "Handling errors in Step Functions workflows",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS Step Functions Developer Guide",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"
  },
  "aws-strangler-fig": {
    title: "Strangler fig pattern",
    authors: ["Amazon Web Services"],
    year: 2024,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/strangler-fig.html"
  },
  "aws-transactional-outbox": {
    title: "Transactional outbox pattern",
    authors: ["Amazon Web Services"],
    year: 2026,
    publisher: "AWS Prescriptive Guidance",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html"
  },
  "aws-wellarchitected-idempotent": {
    title: "REL04-BP04 Make mutating operations idempotent",
    authors: ["Amazon Web Services"],
    year: 2025,
    publisher: "AWS Well-Architected Framework",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_prevent_interaction_failure_idempotent.html"
  },
  "aws-wellarchitected-loose-coupling": {
    title: "REL04-BP02 Implement loosely coupled dependencies",
    authors: ["Amazon Web Services"],
    year: 2024,
    publisher: "AWS Well-Architected Framework",
    type: "official-doc",
    url: "https://docs.aws.amazon.com/wellarchitected/2024-06-27/framework/rel_prevent_interaction_failure_loosely_coupled_system.html"
  },
  "azure-bulkhead": {
    title: "Bulkhead pattern",
    authors: ["Microsoft"],
    year: 2025,
    publisher: "Azure Architecture Center",
    type: "official-doc",
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead"
  },
  "azure-cache-aside": {
    title: "Cache-Aside pattern",
    authors: ["Microsoft"],
    year: 2025,
    publisher: "Azure Architecture Center",
    type: "official-doc",
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside"
  },
  "azure-circuit-breaker": {
    title: "Circuit Breaker pattern",
    authors: ["Microsoft"],
    year: 2025,
    publisher: "Azure Architecture Center",
    type: "official-doc",
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker"
  },
  "azure-competing-consumers": {
    title: "Competing Consumers pattern",
    authors: ["Microsoft"],
    year: 2025,
    publisher: "Azure Architecture Center",
    type: "official-doc",
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers"
  },
  "azure-queue-based-load-leveling": {
    title: "Queue-Based Load Leveling pattern",
    authors: ["Microsoft"],
    year: 2025,
    publisher: "Azure Architecture Center",
    type: "official-doc",
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling"
  },
  "azure-rate-limiting": {
    title: "Rate Limiting pattern",
    authors: ["Microsoft"],
    year: 2025,
    publisher: "Azure Architecture Center",
    type: "official-doc",
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern"
  },
  "azure-throttling": {
    title: "Throttling pattern",
    authors: ["Microsoft"],
    year: 2025,
    publisher: "Azure Architecture Center",
    type: "official-doc",
    url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling"
  },
  "bellemare-event-driven-microservices": {
    title: "Building Event-Driven Microservices",
    authors: ["Adam Bellemare"],
    year: 2020,
    publisher: "O'Reilly Media",
    type: "book"
  },
  "fowler-cqrs": {
    title: "CQRS",
    authors: ["Martin Fowler"],
    year: 2011,
    publisher: "martinfowler.com",
    type: "article",
    url: "https://martinfowler.com/bliki/CQRS.html"
  },
  "fowler-event-sourcing": {
    title: "Event Sourcing",
    authors: ["Martin Fowler"],
    year: 2005,
    publisher: "martinfowler.com",
    type: "article",
    url: "https://martinfowler.com/eaaDev/EventSourcing.html"
  },
  "fowler-strangler": {
    title: "Strangler Fig Application",
    authors: ["Martin Fowler"],
    year: 2004,
    publisher: "martinfowler.com",
    type: "article",
    url: "https://martinfowler.com/bliki/StranglerFigApplication.html"
  },
  "garcia-molina-sagas": {
    title: "Sagas",
    authors: ["Hector Garcia-Molina", "Kenneth Salem"],
    year: 1987,
    publisher: "ACM SIGMOD Record",
    type: "paper"
  },
  "hohpe-eip": {
    title: "Enterprise Integration Patterns",
    authors: ["Gregor Hohpe", "Bobby Woolf"],
    year: 2003,
    publisher: "Addison-Wesley Professional",
    type: "book"
  },
  "kleppmann-ddia": {
    title: "Designing Data-Intensive Applications",
    authors: ["Martin Kleppmann"],
    year: 2017,
    publisher: "O'Reilly Media",
    type: "book"
  },
  "microservices-api-composition": {
    title: "Pattern: API Composition",
    authors: ["Chris Richardson"],
    year: 2025,
    publisher: "microservices.io",
    type: "pattern-catalog",
    url: "https://microservices.io/patterns/data/api-composition.html"
  },
  "microservices-api-gateway": {
    title: "Pattern: API Gateway / Backends for Frontends",
    authors: ["Chris Richardson"],
    year: 2025,
    publisher: "microservices.io",
    type: "pattern-catalog",
    url: "https://microservices.io/patterns/apigateway"
  },
  "microservices-database-per-service": {
    title: "Pattern: Database per service",
    authors: ["Chris Richardson"],
    year: 2025,
    publisher: "microservices.io",
    type: "pattern-catalog",
    url: "https://microservices.io/patterns/data/database-per-service.html"
  },
  "microservices-idempotent-consumer": {
    title: "Handling duplicate messages using the Idempotent consumer pattern",
    authors: ["Chris Richardson"],
    year: 2020,
    publisher: "microservices.io",
    type: "article",
    url: "https://microservices.io/post/microservices/patterns/2020/10/16/idempotent-consumer.html"
  },
  "microservices-patterns-book": {
    title: "Microservices Patterns",
    authors: ["Chris Richardson"],
    year: 2018,
    publisher: "Manning",
    type: "book"
  },
  "microservices-transactional-outbox": {
    title: "Pattern: Transactional Outbox",
    authors: ["Chris Richardson"],
    year: 2025,
    publisher: "microservices.io",
    type: "pattern-catalog",
    url: "https://microservices.io/patterns/data/transactional-outbox"
  },
  "nygard-release-it": {
    title: "Release It! Design and Deploy Production-Ready Software",
    authors: ["Michael T. Nygard"],
    year: 2018,
    publisher: "Pragmatic Bookshelf",
    type: "book"
  }
};

function reference(id, role) {
  return { id, role, ...referenceLibrary[id] };
}

function mediaFromAsset(slug, ptAlt, ptCaption, enAlt, enCaption) {
  return {
    pt: {
      heroImage: {
        src: `/media/patterns/${slug}.svg`,
        alt: ptAlt,
        caption: ptCaption
      },
      diagram: {
        src: `/media/patterns/${slug}.svg`,
        alt: ptAlt,
        caption: ptCaption
      }
    },
    en: {
      heroImage: {
        src: `/media/patterns/${slug}.svg`,
        alt: enAlt,
        caption: enCaption
      },
      diagram: {
        src: `/media/patterns/${slug}.svg`,
        alt: enAlt,
        caption: enCaption
      }
    }
  };
}

function toYamlString(value) {
  return JSON.stringify(value);
}

function renderScalarList(key, values) {
  if (!values || values.length === 0) {
    return `${key}: []\n`;
  }

  return `${key}:\n${values.map((value) => `  - ${toYamlString(value)}`).join("\n")}\n`;
}

function renderMedia(media) {
  const sections = [];

  for (const [key, value] of Object.entries(media ?? {})) {
    if (!value) {
      continue;
    }

    sections.push(
      `  ${key}:`,
      `    src: ${toYamlString(value.src)}`,
      `    alt: ${toYamlString(value.alt)}`,
      value.caption ? `    caption: ${toYamlString(value.caption)}` : null
    );
  }

  if (sections.length === 0) {
    return "media: {}\n";
  }

  return `media:\n${sections.filter(Boolean).join("\n")}\n`;
}

function normalizeAsciiText(value) {
  return value
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateAscii(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

function framedLine(value, width) {
  const innerWidth = width - 4;
  return `| ${truncateAscii(normalizeAsciiText(value), innerWidth).padEnd(innerWidth, " ")} |`;
}

function buildAsciiDiagram(pattern, lang) {
  const content = pattern[lang];
  const width = 66;
  const lines = [
    `+${"-".repeat(width - 2)}+`,
    framedLine(
      lang === "pt" ? `${content.title} :: leitura rapida` : `${content.title} :: quick read`,
      width
    ),
    `+${"-".repeat(width - 2)}+`
  ];

  for (const [index, step] of content.flowSteps.slice(0, 4).entries()) {
    lines.push(framedLine(`[${String(index + 1).padStart(2, "0")}] ${step.title}`, width));
    lines.push(framedLine(`-> ${step.description}`, width));
  }

  lines.push(`+${"-".repeat(width - 2)}+`);
  lines.push(
    framedLine(
      `${lang === "pt" ? "AWS" : "AWS"} :: ${pattern.awsServices.slice(0, 3).join(" | ")}`,
      width
    )
  );
  lines.push(`+${"-".repeat(width - 2)}+`);

  return {
    title:
      lang === "pt"
        ? `${content.title} :: diagrama terminal`
        : `${content.title} :: terminal diagram`,
    art: lines.join("\n"),
    caption:
      lang === "pt"
        ? "Leitura sintetica em ASCII do fluxo principal, pensada para consulta rapida."
        : "ASCII summary of the primary flow, designed for quick reference."
  };
}

function renderAsciiDiagram(asciiDiagram) {
  const lines = [
    "asciiDiagram:",
    `  title: ${toYamlString(asciiDiagram.title)}`,
    "  art: |-"
  ];

  for (const line of asciiDiagram.art.split("\n")) {
    lines.push(`    ${line}`);
  }

  if (asciiDiagram.caption) {
    lines.push(`  caption: ${toYamlString(asciiDiagram.caption)}`);
  }

  return `${lines.join("\n")}\n`;
}

function renderReferences(references) {
  const lines = ["references:"];

  for (const item of references) {
    lines.push(`  - id: ${toYamlString(item.id)}`);
    lines.push(`    title: ${toYamlString(item.title)}`);
    lines.push(`    authors:`);
    for (const author of item.authors) {
      lines.push(`      - ${toYamlString(author)}`);
    }
    lines.push(`    year: ${item.year}`);
    lines.push(`    publisher: ${toYamlString(item.publisher)}`);
    lines.push(`    type: ${item.type}`);
    lines.push(`    role: ${item.role}`);
    if (item.url) {
      lines.push(`    url: ${toYamlString(item.url)}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

function renderFrontmatter(pattern, lang) {
  const content = pattern[lang];
  const asciiDiagram = buildAsciiDiagram(pattern, lang);
  return [
    "---",
    `lang: ${lang}`,
    `slug: ${pattern.slug}`,
    `title: ${toYamlString(content.title)}`,
    `summary: ${toYamlString(content.summary)}`,
    `category: ${pattern.category}`,
    `problemFocus: ${pattern.problemFocus}`,
    `problem: ${toYamlString(content.problem)}`,
    renderScalarList("whenToUse", content.whenToUse).trimEnd(),
    renderScalarList("whenNotToUse", content.whenNotToUse).trimEnd(),
    `complexity: ${pattern.complexity}`,
    `flowType: ${pattern.flowType}`,
    renderScalarList("tags", content.tags).trimEnd(),
    renderScalarList("awsServices", pattern.awsServices).trimEnd(),
    renderScalarList("relatedPatterns", pattern.relatedPatterns).trimEnd(),
    renderMedia(content.media).trimEnd(),
    renderAsciiDiagram(asciiDiagram).trimEnd(),
    renderReferences(pattern.references).trimEnd(),
    `featured: ${pattern.featured ? "true" : "false"}`,
    "---"
  ].join("\n");
}

function cite(ids) {
  return ids && ids.length > 0 ? ` <Cite ids={${JSON.stringify(ids)}} />` : "";
}

function renderParagraphs(items) {
  return items.map((item) => `${item.text}${cite(item.ids)}`).join("\n\n");
}

function renderCallout(callout) {
  if (!callout) {
    return "";
  }

  return [
    `<Callout title={${JSON.stringify(callout.title)}} tone=${JSON.stringify(callout.tone ?? "warning")}>`,
    `  <p>${callout.text}${cite(callout.ids)}</p>`,
    `</Callout>`
  ].join("\n");
}

function renderBody(pattern, lang) {
  const content = pattern[lang];
  const text = labels[lang];
  const sections = [
    `## ${text.overview}`,
    "",
    renderParagraphs(content.overview),
    "",
    `## ${text.diagram}`,
    "",
    `<ArchitectureDiagram title={${JSON.stringify(content.diagram.title)}} type=${JSON.stringify(content.diagram.type)} code={${JSON.stringify(content.diagram.code)}} caption={${JSON.stringify(content.diagram.caption)}} />`,
    "",
    `## ${text.flow}`,
    "",
    `<FlowSteps steps={${JSON.stringify(content.flowSteps, null, 2)}} />`,
    "",
    `## ${text.tradeoffs}`,
    "",
    `<TradeoffTable rows={${JSON.stringify(content.tradeoffs, null, 2)}} />`,
    "",
    `## ${text.checklist}`,
    "",
    `### ${text.fit}`,
    "",
    `<Checklist items={${JSON.stringify(content.goodFit, null, 2)}} />`,
    "",
    `### ${text.warning}`,
    "",
    `<Checklist tone="warning" items={${JSON.stringify(content.warningSigns, null, 2)}} />`
  ];

  if (content.callout) {
    sections.push("", renderCallout(content.callout));
  }

  sections.push(
    "",
    `## ${text.aws}`,
    "",
    `<AwsExample scenario={${JSON.stringify(content.awsScenario)}} services={${JSON.stringify(pattern.awsServices, null, 2)}} implementation={${JSON.stringify(content.awsImplementation, null, 2)}} />`,
    "",
    `## ${text.mistakes}`,
    "",
    ...content.commonMistakes.map((item) => `- ${item}`),
    "",
    `## ${text.comparisons}`,
    "",
    `<ComparisonBlock items={${JSON.stringify(content.comparisons, null, 2)}} />`
  );

  return sections.join("\n");
}

const patterns = [
  {
    slug: "fanout",
    category: "event-driven",
    problemFocus: "broadcast",
    complexity: "intermediate",
    flowType: "asynchronous",
    awsServices: ["Amazon SNS", "Amazon EventBridge", "Amazon SQS", "AWS Lambda"],
    relatedPatterns: ["competing-consumers", "event-carried-state-transfer", "transactional-outbox"],
    references: [
      reference("hohpe-eip", "conceptual"),
      reference("aws-sns-a2a", "implementation"),
      reference("aws-sns-fanout-lambda", "complementary")
    ],
    featured: true,
    pt: {
      title: "Fanout",
      summary:
        "Replica um mesmo evento para multiplos consumidores independentes sem obrigar o produtor a conhecer cada destino.",
      problem:
        "Um servico precisa disparar a mesma mudanca para varias capacidades downstream e o acoplamento ponto a ponto comeca a atrasar evolucao e operacao.",
      whenToUse: [
        "Quando um mesmo evento deve acionar notificacoes, analytics, integracoes e workflows paralelos.",
        "Quando voce quer adicionar novos consumidores sem redeployar o produtor.",
        "Quando cada assinante precisa evoluir no proprio ritmo."
      ],
      whenNotToUse: [
        "Quando existe dependencia sequencial forte entre os consumidores.",
        "Quando o evento ainda nao tem contrato estavel o suficiente para ser compartilhado.",
        "Quando todos os assinantes exigem resposta sincronica ao mesmo tempo."
      ],
      tags: ["eventos", "pub-sub", "desacoplamento", "assinantes"],
      media: mediaFromAsset(
        "fanout",
        "Diagrama com um produtor publicando um evento para varios consumidores independentes.",
        "Um canal central distribui o mesmo evento para equipes e capacidades diferentes.",
        "Diagram showing one producer publishing the same event to multiple independent consumers.",
        "A central channel distributes the same event to different teams and downstream capabilities."
      ).pt,
      overview: [
        {
          text:
            "Fanout resolve o momento em que um dominio passa a ter mais de um interessado na mesma mudanca de estado e cada nova integracao comeca a gerar dependencia acidental no produtor.",
          ids: ["hohpe-eip"]
        },
        {
          text:
            "Com um topico ou barramento de eventos, o servico emissor publica uma vez e deixa a responsabilidade de assinatura, retentativa e entrega para a infraestrutura de mensageria.",
          ids: ["aws-sns-a2a", "aws-sns-fanout-lambda"]
        }
      ],
      diagram: {
        title: "Um produtor, varios destinos, contratos independentes",
        type: "flowchart",
        code:
          'Producer["Servico emissor"] --> Bus["SNS Topic / EventBridge Bus"]\nBus --> Billing["Faturamento"]\nBus --> Notifications["Notificacoes"]\nBus --> Analytics["Analytics"]\nBus --> Workflow["Workflow assinado"]',
        caption:
          "O produtor emite apenas o fato de dominio; cada consumidor decide o proprio processamento."
      },
      flowSteps: [
        {
          title: "O produtor publica um unico evento",
          description: "A emissao precisa conter um contrato minimamente estavel e versionavel."
        },
        {
          title: "O barramento replica para os assinantes",
          description: "SNS, EventBridge ou SQS fanout absorvem entrega, filtro e retentativa."
        },
        {
          title: "Cada consumidor processa com autonomia",
          description: "Falhas ou mudancas locais nao exigem acoplamento direto com o produtor."
        },
        {
          title: "Novos destinos entram sem tocar no emissor",
          description: "A arquitetura ganha extensibilidade real para novos casos de uso."
        }
      ],
      tradeoffs: [
        {
          area: "Evolucao",
          benefit: "Novos consumidores podem ser adicionados sem alterar o servico emissor.",
          cost: "Governanca de contrato e versionamento de evento ficam mais importantes."
        },
        {
          area: "Operacao",
          benefit: "Cada assinante escala e falha de forma independente.",
          cost: "Tracing fim a fim exige correlacao entre publicacao e consumo."
        },
        {
          area: "Produto",
          benefit: "A mesma mudanca de negocio abastece varias capacidades em paralelo.",
          cost: "Um evento mal desenhado espalha ambiguidade para varios times."
        }
      ],
      goodFit: [
        "Existe mais de um consumidor para o mesmo fato de dominio.",
        "Os downstreams podem operar assincronamente.",
        "O time quer habilitar extensibilidade sem alterar o emissor."
      ],
      warningSigns: [
        "O evento carrega detalhes internos demais do produtor.",
        "Nao existe estrategia de idempotencia nos consumidores.",
        "Os consumidores dependem de ordem global sem infraestrutura para isso."
      ],
      callout: {
        title: "Nota editorial",
        text:
          "Fanout desacopla distribuicao, mas nao elimina a necessidade de contratos bem definidos, DLQ e observabilidade por assinante.",
        ids: ["aws-sns-a2a", "aws-sns-fanout-lambda"]
      },
      awsScenario: "Checkout publica OrderPlaced e varios contextos precisam reagir sem acoplamento ponto a ponto.",
      awsImplementation: [
        "O servico de pedidos publica o evento em Amazon EventBridge ou Amazon SNS.",
        "Assinantes simples processam direto com AWS Lambda; assinantes com absorcao de pico podem usar Amazon SQS entre o topico e o consumidor.",
        "Filtros por atributo evitam que cada assinante receba eventos irrelevantes.",
        "Correlacao por eventId e traceId facilita debugar entrega e reprocessamento."
      ],
      commonMistakes: [
        "Usar fanout quando a regra de negocio exige uma cadeia sequencial de passos.",
        "Publicar payloads excessivos e transformar o barramento em espelho do banco do produtor.",
        "Ignorar DLQ e reprocessamento para assinantes criticos."
      ],
      comparisons: [
        {
          title: "Fanout vs Competing Consumers",
          difference: "Fanout replica para varios destinos; Competing Consumers divide trabalho entre workers do mesmo destino."
        },
        {
          title: "Fanout vs Pipes and Filters",
          difference: "Fanout espalha o mesmo evento; Pipes and Filters encadeia transformacoes em uma mesma jornada."
        }
      ]
    },
    en: {
      title: "Fanout",
      summary:
        "Replicates the same event to multiple independent consumers without forcing the producer to know every destination.",
      problem:
        "A service needs to trigger the same domain change across several downstream capabilities and point-to-point integrations are starting to slow down change and operations.",
      whenToUse: [
        "When the same event should trigger notifications, analytics, integrations, and parallel workflows.",
        "When you want to add new consumers without redeploying the producer.",
        "When each subscriber should evolve on its own cadence."
      ],
      whenNotToUse: [
        "When consumers have strong sequential dependencies on each other.",
        "When the event contract is still too unstable to be shared widely.",
        "When every subscriber requires a synchronous response path."
      ],
      tags: ["events", "pub-sub", "decoupling", "subscribers"],
      media: mediaFromAsset(
        "fanout",
        "Diagrama com um produtor publicando um evento para varios consumidores independentes.",
        "Um canal central distribui o mesmo evento para equipes e capacidades diferentes.",
        "Diagram showing one producer publishing the same event to multiple independent consumers.",
        "A central channel distributes the same event to different teams and downstream capabilities."
      ).en,
      overview: [
        {
          text:
            "Fanout becomes useful when one domain event suddenly has several interested parties and each new integration starts introducing accidental dependency back into the producer.",
          ids: ["hohpe-eip"]
        },
        {
          text:
            "With a topic or event bus in place, the producer publishes once and lets the messaging layer handle subscription, delivery, and retries for each consumer.",
          ids: ["aws-sns-a2a", "aws-sns-fanout-lambda"]
        }
      ],
      diagram: {
        title: "One producer, many destinations, independent contracts",
        type: "flowchart",
        code:
          'Producer["Publishing service"] --> Bus["SNS Topic / EventBridge Bus"]\nBus --> Billing["Billing"]\nBus --> Notifications["Notifications"]\nBus --> Analytics["Analytics"]\nBus --> Workflow["Subscribed workflow"]',
        caption:
          "The producer emits the business fact once; each consumer owns its own reaction."
      },
      flowSteps: [
        {
          title: "The producer emits a single event",
          description: "That event should be stable enough to version and share."
        },
        {
          title: "The bus fans out to subscribers",
          description: "SNS, EventBridge, or SQS fanout absorb delivery, filtering, and retries."
        },
        {
          title: "Each consumer processes independently",
          description: "Local failures or code changes do not require producer-side changes."
        },
        {
          title: "New destinations join without touching the emitter",
          description: "The architecture gains genuine extensibility for new use cases."
        }
      ],
      tradeoffs: [
        {
          area: "Evolution",
          benefit: "New consumers can be added without changing the source service.",
          cost: "Event governance and versioning become much more important."
        },
        {
          area: "Operations",
          benefit: "Each subscriber can scale and fail independently.",
          cost: "End-to-end tracing requires correlation across publish and consume paths."
        },
        {
          area: "Product",
          benefit: "One business change can feed several capabilities in parallel.",
          cost: "A poorly designed event spreads ambiguity across many teams."
        }
      ],
      goodFit: [
        "More than one consumer cares about the same domain fact.",
        "Downstream processing can be asynchronous.",
        "The team wants extensibility without modifying the producer."
      ],
      warningSigns: [
        "The event exposes too many internal producer details.",
        "Consumers have no idempotency strategy.",
        "Consumers require global ordering without infrastructure to support it."
      ],
      callout: {
        title: "Editorial note",
        text:
          "Fanout decouples distribution, but it does not remove the need for strong contracts, DLQs, and subscriber-level observability.",
        ids: ["aws-sns-a2a", "aws-sns-fanout-lambda"]
      },
      awsScenario: "Checkout publishes OrderPlaced and multiple contexts must react without point-to-point coupling.",
      awsImplementation: [
        "The order service publishes the event into Amazon EventBridge or Amazon SNS.",
        "Simple subscribers process directly with AWS Lambda; subscribers that need burst absorption can use Amazon SQS between the topic and the consumer.",
        "Attribute-based filtering keeps each subscriber focused on relevant events.",
        "Correlating by eventId and traceId makes delivery and replay easier to debug."
      ],
      commonMistakes: [
        "Using fanout when the business flow really requires a sequential process.",
        "Publishing oversized payloads and turning the bus into a mirror of the producer database.",
        "Skipping DLQs and replay paths for critical subscribers."
      ],
      comparisons: [
        {
          title: "Fanout vs Competing Consumers",
          difference: "Fanout replicates to multiple destinations; Competing Consumers split work across workers for the same destination."
        },
        {
          title: "Fanout vs Pipes and Filters",
          difference: "Fanout spreads the same event broadly; Pipes and Filters chains transformations through one journey."
        }
      ]
    }
  },
  {
    slug: "cqrs",
    category: "data",
    problemFocus: "data-consistency",
    complexity: "advanced",
    flowType: "hybrid",
    awsServices: ["Amazon DynamoDB", "Amazon EventBridge", "AWS Lambda", "Amazon OpenSearch Service"],
    relatedPatterns: ["event-sourcing", "api-composition", "cache-aside"],
    references: [
      reference("fowler-cqrs", "conceptual"),
      reference("aws-cqrs-pattern", "implementation"),
      reference("kleppmann-ddia", "complementary")
    ],
    featured: true,
    pt: {
      title: "CQRS",
      summary:
        "Separa comandos de escrita e consultas de leitura para otimizar cada lado com modelos, escalas e contratos diferentes.",
      problem:
        "O mesmo modelo esta tentando sustentar validacoes transacionais rigorosas e consultas de leitura com formatos e latencias muito diferentes.",
      whenToUse: [
        "Quando leitura e escrita possuem perfis de carga e modelagem muito distintos.",
        "Quando a experiencia de leitura precisa de projecoes prontas para UI, relatorios ou busca.",
        "Quando o dominio exige proteger invariantes no write side."
      ],
      whenNotToUse: [
        "Quando um CRUD simples resolve o problema com baixo custo operacional.",
        "Quando a equipe ainda nao domina consistencia eventual e reprocessamento.",
        "Quando a duplicacao de modelos nao entrega ganho claro de negocio."
      ],
      tags: ["leitura", "escrita", "projecoes", "consistencia eventual"],
      media: mediaFromAsset(
        "cqrs",
        "Diagrama separando comandos, modelo de escrita, projecoes e leitura.",
        "Escrita e leitura evoluem de forma independente ao redor do mesmo dominio.",
        "Diagram separating commands, the write model, projections, and the read model.",
        "Read and write concerns evolve independently around the same domain."
      ).pt,
      overview: [
        {
          text:
            "CQRS aparece quando um modelo unico sacrifica demais um dos lados: ou a escrita perde clareza e protecao de invariantes, ou a leitura vira uma composicao lenta e cara.",
          ids: ["fowler-cqrs"]
        },
        {
          text:
            "Ao separar command side e query side, voce pode persistir o dominio com rigor e publicar mudancas para projecoes de leitura desenhadas especificamente para consumo.",
          ids: ["aws-cqrs-pattern", "kleppmann-ddia"]
        }
      ],
      diagram: {
        title: "Write side protegido, read side otimizado",
        type: "flowchart",
        code:
          'Client["Cliente / API"] --> Commands["Commands"]\nCommands --> Write["Write model"]\nWrite --> Events["Domain events"]\nEvents --> Projections["Projection pipeline"]\nProjections --> Read["Read models"]\nRead --> Queries["Queries / Search / Dashboards"]',
        caption:
          "A escrita preserva regras de dominio; a leitura recebe visoes materializadas para consumo rapido."
      },
      flowSteps: [
        {
          title: "Comandos entram no write side",
          description: "Validacao, autorizacao e invariantes vivem no modelo transacional."
        },
        {
          title: "Mudancas confirmadas geram eventos ou sinais derivados",
          description: "Essas mudancas abastecem o pipeline de projecoes."
        },
        {
          title: "Read models materializam visoes especializadas",
          description: "Cada consumidor recebe a forma de dado que realmente precisa."
        },
        {
          title: "Consultas leem apenas o lado de leitura",
          description: "A interface deixa de forcar joins e agregacoes no caminho critico."
        }
      ],
      tradeoffs: [
        {
          area: "Performance",
          benefit: "Leitura e escrita escalam de forma independente.",
          cost: "Voce opera multiplas representacoes do mesmo dominio."
        },
        {
          area: "Clareza",
          benefit: "O write side fica focado em intencao e invariantes.",
          cost: "Aumenta a carga conceitual para times acostumados a CRUD."
        },
        {
          area: "Consistencia",
          benefit: "Read models podem ficar muito proximos da experiencia final.",
          cost: "A arquitetura precisa aceitar e observar consistencia eventual."
        }
      ],
      goodFit: [
        "Ha telas ou consultas que pedem agregacoes custosas demais no modelo transacional.",
        "O dominio possui regras de escrita que precisam de forte protecao.",
        "Existe maturidade para reconstruir projecoes e lidar com lag."
      ],
      warningSigns: [
        "CQRS esta sendo introduzido apenas por moda arquitetural.",
        "Nao existe estrategia para replay ou rebuild de read models.",
        "As equipes esperam leitura instantaneamente consistente em todos os casos."
      ],
      callout: {
        title: "Nuance importante",
        text:
          "CQRS nao exige Event Sourcing, mas combina muito bem com fluxos dirigidos por eventos quando as projecoes precisam ser recalculadas ou especializadas.",
        ids: ["fowler-cqrs", "kleppmann-ddia"]
      },
      awsScenario: "Plataforma de pedidos com APIs transacionais, busca operacional e dashboards de leitura intensa.",
      awsImplementation: [
        "Commands entram por uma API que persiste aggregates em Amazon DynamoDB.",
        "Eventos de dominio seguem para Amazon EventBridge logo apos a escrita validada.",
        "AWS Lambda atualiza projecoes em tabelas dedicadas ou indices do Amazon OpenSearch Service.",
        "As APIs de consulta apontam apenas para o read side, isolando o modelo transacional."
      ],
      commonMistakes: [
        "Duplicar o mesmo schema no read side e perder o principal beneficio do padrao.",
        "Misturar regra de negocio pesada dentro do pipeline de projecao.",
        "Ignorar medicao de lag entre escrita e leitura."
      ],
      comparisons: [
        {
          title: "CQRS vs Cache-Aside",
          difference: "Cache-Aside acelera um modelo existente; CQRS cria um modelo de leitura explicitamente separado."
        },
        {
          title: "CQRS vs API Composition",
          difference: "CQRS materializa leitura antecipadamente; API Composition junta dados on demand."
        }
      ]
    },
    en: {
      title: "CQRS",
      summary:
        "Separates write commands and read queries so each side can optimize around different models, scale, and contracts.",
      problem:
        "The same model is trying to support strict transactional validation and high-volume reads with very different shapes and latency expectations.",
      whenToUse: [
        "When read and write workloads demand different models and scaling paths.",
        "When the read experience needs tailored projections for UI, reporting, or search.",
        "When the domain requires explicit protection of write-side invariants."
      ],
      whenNotToUse: [
        "When a simple CRUD model solves the problem with low operational cost.",
        "When the team is not ready for eventual consistency and replay workflows.",
        "When duplicated models do not provide a clear business gain."
      ],
      tags: ["reads", "writes", "projections", "eventual consistency"],
      media: mediaFromAsset(
        "cqrs",
        "Diagrama separando comandos, modelo de escrita, projecoes e leitura.",
        "Escrita e leitura evoluem de forma independente ao redor do mesmo dominio.",
        "Diagram separating commands, the write model, projections, and the read model.",
        "Read and write concerns evolve independently around the same domain."
      ).en,
      overview: [
        {
          text:
            "CQRS usually appears when a single model is compromising too much on one side of the system: either writes lose clarity and invariant protection, or reads become slow and expensive to assemble.",
          ids: ["fowler-cqrs"]
        },
        {
          text:
            "By separating command and query responsibilities, you can persist the domain rigorously while publishing changes into read projections shaped specifically for consumption.",
          ids: ["aws-cqrs-pattern", "kleppmann-ddia"]
        }
      ],
      diagram: {
        title: "Protected write side, optimized read side",
        type: "flowchart",
        code:
          'Client["Client / API"] --> Commands["Commands"]\nCommands --> Write["Write model"]\nWrite --> Events["Domain events"]\nEvents --> Projections["Projection pipeline"]\nProjections --> Read["Read models"]\nRead --> Queries["Queries / Search / Dashboards"]',
        caption:
          "The write path preserves domain rules; the read path exposes materialized views for fast consumption."
      },
      flowSteps: [
        {
          title: "Commands enter the write side",
          description: "Validation, authorization, and invariants stay close to the transactional model."
        },
        {
          title: "Confirmed changes emit domain signals",
          description: "Those changes feed the projection pipeline."
        },
        {
          title: "Read models materialize specialized views",
          description: "Each consumer receives the data shape it actually needs."
        },
        {
          title: "Queries hit the read side only",
          description: "The interface no longer forces joins and heavy aggregation on the critical path."
        }
      ],
      tradeoffs: [
        {
          area: "Performance",
          benefit: "Read and write paths can scale independently.",
          cost: "You operate multiple representations of the same domain."
        },
        {
          area: "Clarity",
          benefit: "The write side stays focused on intent and invariants.",
          cost: "The conceptual load rises for teams used to plain CRUD."
        },
        {
          area: "Consistency",
          benefit: "Read models can sit much closer to the final experience.",
          cost: "The architecture must embrace and observe eventual consistency."
        }
      ],
      goodFit: [
        "Some views or queries are too expensive in the transactional model.",
        "The domain contains important write invariants worth protecting explicitly.",
        "The team can rebuild projections and handle read lag operationally."
      ],
      warningSigns: [
        "CQRS is being introduced as an architecture trend instead of a problem-driven choice.",
        "There is no replay or rebuild strategy for read models.",
        "Stakeholders still expect instantly consistent reads in every case."
      ],
      callout: {
        title: "Important nuance",
        text:
          "CQRS does not require Event Sourcing, but it pairs well with event-driven flows when projections need to be rebuilt or specialized repeatedly.",
        ids: ["fowler-cqrs", "kleppmann-ddia"]
      },
      awsScenario: "Order platform with transactional APIs, operational search, and read-heavy dashboards.",
      awsImplementation: [
        "Commands reach an API that persists aggregates in Amazon DynamoDB.",
        "Domain events are emitted to Amazon EventBridge after the validated write.",
        "AWS Lambda updates dedicated projection tables or Amazon OpenSearch Service indexes.",
        "Query APIs point only to the read side, keeping the transactional model isolated."
      ],
      commonMistakes: [
        "Duplicating the same schema on the read side and losing the main benefit of the pattern.",
        "Mixing heavy business logic into the projection pipeline.",
        "Ignoring read lag metrics and recovery paths."
      ],
      comparisons: [
        {
          title: "CQRS vs Cache-Aside",
          difference: "Cache-Aside accelerates an existing model; CQRS creates a dedicated read model on purpose."
        },
        {
          title: "CQRS vs API Composition",
          difference: "CQRS materializes read views ahead of time; API Composition joins data on demand."
        }
      ]
    }
  },
  {
    slug: "saga",
    category: "event-driven",
    problemFocus: "workflow-orchestration",
    complexity: "advanced",
    flowType: "hybrid",
    awsServices: ["AWS Step Functions", "Amazon EventBridge", "AWS Lambda", "Amazon SQS"],
    relatedPatterns: ["transactional-outbox", "competing-consumers", "cqrs"],
    references: [
      reference("garcia-molina-sagas", "conceptual"),
      reference("aws-saga-pattern", "implementation"),
      reference("aws-stepfunctions-best-practices", "complementary")
    ],
    featured: true,
    pt: {
      title: "Saga",
      summary:
        "Coordena transacoes distribuidas por etapas locais e compensacoes, sem depender de um commit global entre servicos.",
      problem:
        "Uma operacao de negocio cruza varios servicos e a consistencia entre eles precisa ser mantida mesmo sem transacao distribuida tradicional.",
      whenToUse: [
        "Quando um processo de negocio atravessa varios microservicos com dados proprios.",
        "Quando voce precisa de rollback sem bloquear tudo com two-phase commit.",
        "Quando ha passos long-lived e dependencias de negocio claras entre eles."
      ],
      whenNotToUse: [
        "Quando toda a operacao cabe em uma transacao local simples.",
        "Quando as compensacoes ainda nao estao modeladas como regra de negocio.",
        "Quando o fluxo muda a todo momento e ainda nao possui fronteiras estaveis."
      ],
      tags: ["orquestracao", "compensacao", "workflow", "consistencia"],
      media: mediaFromAsset(
        "saga",
        "Diagrama de saga com passos de sucesso e compensacao entre servicos.",
        "Cada passo confirma localmente e a saga coordena sucesso ou compensacao.",
        "Saga diagram showing local transactions and compensating steps across services.",
        "Each step commits locally and the saga coordinates success or compensation."
      ).pt,
      overview: [
        {
          text:
            "Saga e a resposta classica para consistencia em processos distribuidos quando cada servico controla seu proprio estado e um commit global se torna impraticavel.",
          ids: ["garcia-molina-sagas"]
        },
        {
          text:
            "Em vez de uma transacao unica, o fluxo e quebrado em passos locais e compensacoes, que podem ser coordenados por orquestracao explicita ou por troca de eventos.",
          ids: ["aws-saga-pattern", "aws-stepfunctions-best-practices"]
        }
      ],
      diagram: {
        title: "Sequencia de sucesso e compensacao",
        type: "sequenceDiagram",
        code:
          "participant Order as Order Service\nparticipant Saga as Saga Orchestrator\nparticipant Payment as Payment Service\nparticipant Inventory as Inventory Service\nOrder->>Saga: Start order workflow\nSaga->>Payment: Reserve payment\nPayment-->>Saga: Confirmed\nSaga->>Inventory: Reserve stock\nInventory-->>Saga: Failed\nSaga->>Payment: Compensate payment\nSaga-->>Order: Order rejected",
        caption:
          "Quando um passo falha, a saga dispara compensacoes para desfazer efeitos ja confirmados."
      },
      flowSteps: [
        {
          title: "A saga inicia com um comando de negocio",
          description: "O fluxo sabe quais servicos precisam participar e em que ordem."
        },
        {
          title: "Cada servico executa sua transacao local",
          description: "Nao ha lock global; cada passo confirma no proprio banco."
        },
        {
          title: "Falhas disparam compensacoes",
          description: "A logica de desfazer precisa ser desenhada como primeira classe."
        },
        {
          title: "O processo fecha com um estado final observavel",
          description: "A aplicacao comunica sucesso, rejeicao ou timeout com contexto."
        }
      ],
      tradeoffs: [
        {
          area: "Consistencia",
          benefit: "Mantem alinhamento entre servicos sem transacao distribuida classica.",
          cost: "A consistencia passa a depender de compensacoes corretas e observaveis."
        },
        {
          area: "Modelagem",
          benefit: "O fluxo de negocio fica explicito.",
          cost: "As fronteiras e estados intermediarios ficam mais trabalhosos de desenhar."
        },
        {
          area: "Operacao",
          benefit: "Cada servico segue autonomo.",
          cost: "Tracing, retry e timeout exigem instrumentacao forte."
        }
      ],
      goodFit: [
        "O processo cruza varios servicos com bancos separados.",
        "Existe clareza sobre o que precisa ser compensado em caso de falha.",
        "O time quer tornar o workflow distribuido explicitamente observavel."
      ],
      warningSigns: [
        "Compensacoes nao foram modeladas ou testadas.",
        "O fluxo depende de efeitos externos irreversiveis sem estrategia de mitigacao.",
        "Nao ha timeout e reconciliacao para sagas presas."
      ],
      callout: {
        title: "Decisao importante",
        text:
          "Antes de escolher orquestracao ou coreografia, vale mapear qual time precisa enxergar, governar e depurar o fluxo distribuido no dia a dia.",
        ids: ["aws-saga-pattern", "aws-stepfunctions-best-practices"]
      },
      awsScenario: "Checkout distribui reserva de pagamento, estoque e expedicao em servicos distintos.",
      awsImplementation: [
        "AWS Step Functions modela o estado da saga e suas transicoes principais.",
        "Cada passo chama AWS Lambda, filas ou APIs internas para executar a transacao local.",
        "Falhas tecnicas usam retry com politicas explicitas; falhas de negocio disparam compensacoes.",
        "Eventos relevantes podem ser publicados em Amazon EventBridge para observabilidade e integracoes."
      ],
      commonMistakes: [
        "Tratar compensacao como detalhe tecnico e nao como regra de negocio.",
        "Esquecer estados intermediarios e dificultar suporte operacional.",
        "Misturar tudo em uma coreografia difusa sem dono claro do fluxo."
      ],
      comparisons: [
        {
          title: "Saga vs Transactional Outbox",
          difference: "Saga coordena varias transacoes locais; Transactional Outbox garante publicar eventos junto com uma unica escrita."
        },
        {
          title: "Saga vs Queue-Based Load Leveling",
          difference: "Saga modela consistencia de processo; Load Leveling absorve picos e desacopla ritmo."
        }
      ]
    },
    en: {
      title: "Saga",
      summary:
        "Coordinates distributed transactions through local steps and compensations without relying on a global commit across services.",
      problem:
        "A business operation spans multiple services and consistency must be preserved even though a traditional distributed transaction is not practical.",
      whenToUse: [
        "When a business process crosses multiple microservices that own their data.",
        "When rollback is needed but two-phase commit would be too expensive or rigid.",
        "When long-lived steps and explicit business dependencies exist between participants."
      ],
      whenNotToUse: [
        "When the whole operation fits inside a simple local transaction.",
        "When compensations have not been modeled as business behavior yet.",
        "When the flow is still too unstable to define clear boundaries."
      ],
      tags: ["orchestration", "compensation", "workflow", "consistency"],
      media: mediaFromAsset(
        "saga",
        "Diagrama de saga com passos de sucesso e compensacao entre servicos.",
        "Cada passo confirma localmente e a saga coordena sucesso ou compensacao.",
        "Saga diagram showing local transactions and compensating steps across services.",
        "Each step commits locally and the saga coordinates success or compensation."
      ).en,
      overview: [
        {
          text:
            "Saga is the classic answer for consistency in distributed business processes where each service owns its own state and a global commit becomes impractical.",
          ids: ["garcia-molina-sagas"]
        },
        {
          text:
            "Instead of one transaction, the workflow is broken into local transactions and compensations that can be coordinated through explicit orchestration or event choreography.",
          ids: ["aws-saga-pattern", "aws-stepfunctions-best-practices"]
        }
      ],
      diagram: {
        title: "Success and compensation sequence",
        type: "sequenceDiagram",
        code:
          "participant Order as Order Service\nparticipant Saga as Saga Orchestrator\nparticipant Payment as Payment Service\nparticipant Inventory as Inventory Service\nOrder->>Saga: Start order workflow\nSaga->>Payment: Reserve payment\nPayment-->>Saga: Confirmed\nSaga->>Inventory: Reserve stock\nInventory-->>Saga: Failed\nSaga->>Payment: Compensate payment\nSaga-->>Order: Order rejected",
        caption:
          "When a step fails, the saga triggers compensations to undo already-confirmed effects."
      },
      flowSteps: [
        {
          title: "The saga starts from a business command",
          description: "The flow knows which services participate and in which order."
        },
        {
          title: "Each service runs its own local transaction",
          description: "There is no global lock; each step commits in its own store."
        },
        {
          title: "Failures trigger compensations",
          description: "Undo logic must be treated as first-class behavior."
        },
        {
          title: "The process ends in an observable final state",
          description: "The application communicates success, rejection, or timeout with context."
        }
      ],
      tradeoffs: [
        {
          area: "Consistency",
          benefit: "Keeps services aligned without classic distributed transactions.",
          cost: "Correctness now depends on sound, observable compensations."
        },
        {
          area: "Modeling",
          benefit: "The business workflow becomes explicit.",
          cost: "Boundaries and intermediate states take more effort to design."
        },
        {
          area: "Operations",
          benefit: "Each service remains autonomous.",
          cost: "Tracing, retries, and timeouts require stronger instrumentation."
        }
      ],
      goodFit: [
        "The process crosses multiple services with separate databases.",
        "There is clarity on what must be compensated when something fails.",
        "The team wants the distributed workflow to be operationally visible."
      ],
      warningSigns: [
        "Compensations were not modeled or tested.",
        "The flow depends on irreversible side effects without mitigation.",
        "There is no timeout or reconciliation for stuck sagas."
      ],
      callout: {
        title: "Important decision",
        text:
          "Before choosing orchestration or choreography, map which team needs to see, govern, and debug the distributed workflow every day.",
        ids: ["aws-saga-pattern", "aws-stepfunctions-best-practices"]
      },
      awsScenario: "Checkout coordinates payment, inventory, and shipping across separate services.",
      awsImplementation: [
        "AWS Step Functions models saga state and the main transitions.",
        "Each step calls AWS Lambda, queues, or internal APIs to execute the local transaction.",
        "Technical failures use explicit retries; business failures trigger compensations.",
        "Relevant milestones can be published to Amazon EventBridge for observability and integrations."
      ],
      commonMistakes: [
        "Treating compensation as a technical detail instead of business behavior.",
        "Forgetting intermediate states and making support harder.",
        "Pushing everything into a diffuse choreography with no clear owner."
      ],
      comparisons: [
        {
          title: "Saga vs Transactional Outbox",
          difference: "Saga coordinates multiple local transactions; Transactional Outbox guarantees event publication alongside one local write."
        },
        {
          title: "Saga vs Queue-Based Load Leveling",
          difference: "Saga models process consistency; Load Leveling absorbs bursts and decouples pace."
        }
      ]
    }
  },
  {
    slug: "event-sourcing",
    category: "data",
    problemFocus: "auditability",
    complexity: "advanced",
    flowType: "asynchronous",
    awsServices: ["Amazon DynamoDB", "Amazon EventBridge", "Amazon Kinesis Data Streams", "AWS Lambda"],
    relatedPatterns: ["cqrs", "transactional-outbox", "event-carried-state-transfer"],
    references: [
      reference("fowler-event-sourcing", "conceptual"),
      reference("aws-event-sourcing", "implementation"),
      reference("kleppmann-ddia", "complementary")
    ],
    featured: true,
    pt: {
      title: "Event Sourcing",
      summary:
        "Persiste o estado como uma sequencia imutavel de eventos, preservando historico completo, replay e reconstrucoes temporais.",
      problem:
        "Atualizar o estado final diretamente apaga o caminho percorrido, dificulta auditoria e torna reprocessamento ou reconstrucoes mais caros.",
      whenToUse: [
        "Quando historico completo e auditavel e parte central do dominio.",
        "Quando voce precisa reconstituir estado passado ou recalcular visoes.",
        "Quando eventos de dominio ja sao artefatos valiosos por si so."
      ],
      whenNotToUse: [
        "Quando o dominio e simples e nao justifica replay nem versionamento de evento.",
        "Quando a equipe ainda nao possui estrategia para evolucao de schemas.",
        "Quando o principal requisito e apenas acelerar leitura."
      ],
      tags: ["auditoria", "eventos", "replay", "historico"],
      media: mediaFromAsset(
        "event-sourcing",
        "Diagrama de um event store alimentando projecoes e reconstrucoes de estado.",
        "O historico de eventos vira a fonte primaria de verdade e habilita replay.",
        "Diagram of an event store feeding projections and state reconstruction.",
        "The event history becomes the primary source of truth and enables replay."
      ).pt,
      overview: [
        {
          text:
            "Event Sourcing troca a pergunta 'qual e o estado atual?' por 'quais fatos aconteceram para chegarmos aqui?', transformando o historico em fonte primaria de verdade.",
          ids: ["fowler-event-sourcing"]
        },
        {
          text:
            "Isso permite auditoria rica, depuracao temporal e reconstrucoes de estado ou projecoes sem depender apenas de snapshots atuais.",
          ids: ["aws-event-sourcing", "kleppmann-ddia"]
        }
      ],
      diagram: {
        title: "Eventos imutaveis como fonte de verdade",
        type: "flowchart",
        code:
          'Commands["Commands"] --> Aggregate["Aggregate"]\nAggregate --> EventStore["Event store"]\nEventStore --> Snapshot["Snapshots"]\nEventStore --> Projections["Projections"]\nEventStore --> Replay["Replay / rebuild"]\nProjections --> Read["Read models"]',
        caption:
          "O estado pode ser reconstruido ao reaplicar eventos, com snapshots para reduzir custo de leitura."
      },
      flowSteps: [
        {
          title: "O comando valida a intencao no aggregate",
          description: "A decisao de negocio ainda acontece antes do evento ser persistido."
        },
        {
          title: "O aggregate grava um novo evento imutavel",
          description: "Nao se atualiza um registro final; adiciona-se um novo fato ao historico."
        },
        {
          title: "Projecoes e snapshots derivam desse historico",
          description: "Leituras rapidas e reconstrucoes partem da mesma linha do tempo."
        },
        {
          title: "Reprocessamento recupera ou recalcula visoes",
          description: "Novos consumidores podem nascer a partir do log historico."
        }
      ],
      tradeoffs: [
        {
          area: "Auditoria",
          benefit: "Todo o caminho do estado fica preservado.",
          cost: "A modelagem e versionamento dos eventos precisa ser muito disciplinada."
        },
        {
          area: "Flexibilidade",
          benefit: "Read models e analises podem ser recalculados depois.",
          cost: "Replays grandes exigem snapshots, batch e governanca operacional."
        },
        {
          area: "Complexidade",
          benefit: "O dominio fica expresso em fatos de negocio explicitos.",
          cost: "Curva conceitual e de tooling aumenta significativamente."
        }
      ],
      goodFit: [
        "Auditoria, trilha temporal e replay tem valor de negocio real.",
        "O dominio pode ser expresso por eventos sem ambiguidades grandes.",
        "Ha investimento para tratar evolucao de evento e snapshots."
      ],
      warningSigns: [
        "Os eventos estao sendo tratados como logs tecnicos e nao fatos de negocio.",
        "Nao ha estrategia para versao e compatibilidade retroativa.",
        "O time espera consultas simples diretamente no event store."
      ],
      callout: {
        title: "Lembrete importante",
        text:
          "Snapshots ajudam no desempenho, mas nao substituem o event store como registro canonico do que realmente aconteceu.",
        ids: ["fowler-event-sourcing", "aws-event-sourcing"]
      },
      awsScenario: "Conta digital precisa trilha completa de operacoes, replay e novas projecoes reguladas por dominio.",
      awsImplementation: [
        "Commands validam aggregates e gravam eventos em Amazon DynamoDB ou em um fluxo persistido com Amazon Kinesis Data Streams.",
        "Snapshots periodicos reduzem o custo de reconstruir aggregates longos.",
        "AWS Lambda publica eventos derivados em Amazon EventBridge para projecoes e integracoes.",
        "Read models especializados podem ser recalculados a partir do historico quando necessario."
      ],
      commonMistakes: [
        "Persistir eventos vagos demais para reconstituir o significado de negocio.",
        "Confundir Event Sourcing com auditoria tecnica simples.",
        "Deixar snapshots e replays sem estrategia operacional."
      ],
      comparisons: [
        {
          title: "Event Sourcing vs CQRS",
          difference: "Event Sourcing define como o estado e persistido; CQRS define como leitura e escrita se separam."
        },
        {
          title: "Event Sourcing vs Transactional Outbox",
          difference: "Outbox garante publicacao confiavel junto da escrita; Event Sourcing transforma o proprio historico em persistencia principal."
        }
      ]
    },
    en: {
      title: "Event Sourcing",
      summary:
        "Persists state as an immutable sequence of events, preserving full history, replay, and point-in-time reconstruction.",
      problem:
        "Writing only the latest state erases how the system got there, making auditability and reprocessing much harder.",
      whenToUse: [
        "When full, auditable history is central to the domain.",
        "When you need to reconstruct past state or recalculate downstream views.",
        "When domain events are valuable artifacts in their own right."
      ],
      whenNotToUse: [
        "When the domain is simple and does not justify replay or event versioning.",
        "When the team has no strategy for schema evolution.",
        "When the main requirement is only faster reads."
      ],
      tags: ["audit", "events", "replay", "history"],
      media: mediaFromAsset(
        "event-sourcing",
        "Diagrama de um event store alimentando projecoes e reconstrucoes de estado.",
        "O historico de eventos vira a fonte primaria de verdade e habilita replay.",
        "Diagram of an event store feeding projections and state reconstruction.",
        "The event history becomes the primary source of truth and enables replay."
      ).en,
      overview: [
        {
          text:
            "Event Sourcing replaces the question 'what is the current state?' with 'which facts happened to get here?', turning the history itself into the primary source of truth.",
          ids: ["fowler-event-sourcing"]
        },
        {
          text:
            "That creates rich auditability, time-travel debugging, and the ability to rebuild state or projections without relying only on today's materialized view.",
          ids: ["aws-event-sourcing", "kleppmann-ddia"]
        }
      ],
      diagram: {
        title: "Immutable events as the source of truth",
        type: "flowchart",
        code:
          'Commands["Commands"] --> Aggregate["Aggregate"]\nAggregate --> EventStore["Event store"]\nEventStore --> Snapshot["Snapshots"]\nEventStore --> Projections["Projections"]\nEventStore --> Replay["Replay / rebuild"]\nProjections --> Read["Read models"]',
        caption:
          "State can be rebuilt by replaying events, while snapshots keep the cost manageable."
      },
      flowSteps: [
        {
          title: "The command validates intent in the aggregate",
          description: "Business decisions still happen before the event is persisted."
        },
        {
          title: "The aggregate appends a new immutable event",
          description: "You do not overwrite the state record; you append a new fact."
        },
        {
          title: "Projections and snapshots derive from that history",
          description: "Fast reads and rebuilds start from the same event timeline."
        },
        {
          title: "Replay recovers or recalculates views",
          description: "New consumers can be born from the historical log."
        }
      ],
      tradeoffs: [
        {
          area: "Auditability",
          benefit: "The entire state journey is preserved.",
          cost: "Event modeling and versioning require strong discipline."
        },
        {
          area: "Flexibility",
          benefit: "Read models and analytics can be recalculated later.",
          cost: "Large replays require snapshots, batching, and operational care."
        },
        {
          area: "Complexity",
          benefit: "The domain is expressed as explicit business facts.",
          cost: "The conceptual and tooling curve rises significantly."
        }
      ],
      goodFit: [
        "Auditability, time travel, and replay create real business value.",
        "The domain can be expressed through events without major ambiguity.",
        "There is willingness to invest in event evolution and snapshots."
      ],
      warningSigns: [
        "Events are treated as technical logs instead of business facts.",
        "There is no versioning or backward-compatibility strategy.",
        "The team expects to serve simple queries directly from the event store."
      ],
      callout: {
        title: "Important reminder",
        text:
          "Snapshots help performance, but they do not replace the event store as the canonical record of what really happened.",
        ids: ["fowler-event-sourcing", "aws-event-sourcing"]
      },
      awsScenario: "Digital account domain needs a full timeline of operations, replay, and specialized downstream projections.",
      awsImplementation: [
        "Commands validate aggregates and append events in Amazon DynamoDB or a durable stream such as Amazon Kinesis Data Streams.",
        "Periodic snapshots reduce the cost of rebuilding long-lived aggregates.",
        "AWS Lambda publishes derived events to Amazon EventBridge for projections and integrations.",
        "Specialized read models can be recalculated from history whenever the business needs a new view."
      ],
      commonMistakes: [
        "Persisting events that are too vague to reconstruct business meaning.",
        "Confusing Event Sourcing with simple technical auditing.",
        "Leaving snapshots and replay without an operational plan."
      ],
      comparisons: [
        {
          title: "Event Sourcing vs CQRS",
          difference: "Event Sourcing defines how state is persisted; CQRS defines how reads and writes are separated."
        },
        {
          title: "Event Sourcing vs Transactional Outbox",
          difference: "Outbox guarantees reliable publication alongside a write; Event Sourcing makes the event history the primary persistence model."
        }
      ]
    }
  },
  {
    slug: "queue-based-load-leveling",
    category: "resilience",
    problemFocus: "spike-buffering",
    complexity: "starter",
    flowType: "asynchronous",
    awsServices: ["Amazon SQS", "AWS Lambda", "Amazon ECS", "Amazon CloudWatch"],
    relatedPatterns: ["competing-consumers", "retry-with-exponential-backoff", "bulkhead"],
    references: [
      reference("azure-queue-based-load-leveling", "conceptual"),
      reference("aws-wellarchitected-loose-coupling", "implementation"),
      reference("aws-lambda-sqs-configure", "complementary")
    ],
    featured: false,
    pt: {
      title: "Queue-Based Load Leveling",
      summary:
        "Coloca uma fila entre produtor e consumidor para absorver picos, desacoplar ritmo de processamento e proteger o backend.",
      problem:
        "A carga chega em rajadas, o backend nao acompanha o mesmo ritmo e chamadas diretas passam a derrubar todo o fluxo.",
      whenToUse: [
        "Quando a demanda entra em picos maiores do que a capacidade de processamento imediata.",
        "Quando o backend pode trabalhar assincronamente.",
        "Quando voce precisa de buffer operacional e controle de retry."
      ],
      whenNotToUse: [
        "Quando a resposta precisa ser sincronica no caminho do usuario.",
        "Quando o workload nao tolera fila, atraso ou processamento eventual.",
        "Quando o consumidor nao consegue lidar com idempotencia e reentrega."
      ],
      tags: ["fila", "buffer", "backpressure", "picos"],
      media: mediaFromAsset(
        "queue-based-load-leveling",
        "Diagrama de produtores enviando trabalho para uma fila antes do consumo.",
        "A fila desacopla taxa de chegada e taxa de processamento.",
        "Diagram showing producers sending work into a queue before consumers process it.",
        "The queue decouples arrival rate from processing rate."
      ).pt,
      overview: [
        {
          text:
            "Queue-Based Load Leveling e o padrao mais direto para lidar com diferenca entre a velocidade de chegada de trabalho e a velocidade com que o sistema realmente consegue processar.",
          ids: ["azure-queue-based-load-leveling"]
        },
        {
          text:
            "A fila funciona como amortecedor operacional: o front continua aceitando pedidos, enquanto os consumidores processam no ritmo sustentavel e observavel do backend.",
          ids: ["aws-wellarchitected-loose-coupling", "aws-lambda-sqs-configure"]
        }
      ],
      diagram: {
        title: "A fila absorve o pico e estabiliza o consumo",
        type: "flowchart",
        code:
          'Ingress["API / Producers"] --> Queue["Amazon SQS"]\nQueue --> ConsumerA["Worker A"]\nQueue --> ConsumerB["Worker B"]\nQueue --> ConsumerC["Worker C"]\nConsumerA --> Backend["Backend / DB"]\nConsumerB --> Backend\nConsumerC --> Backend',
        caption:
          "O backlog fica visivel na fila, e nao escondido em timeouts ou saturacao silenciosa do backend."
      },
      flowSteps: [
        {
          title: "O produtor aceita a requisicao rapidamente",
          description: "O trabalho e persistido na fila, nao empurrado imediatamente ao backend."
        },
        {
          title: "A fila acumula backlog de forma controlada",
          description: "O sistema ganha um ponto explicito de backpressure e medicao."
        },
        {
          title: "Consumidores drenam conforme capacidade",
          description: "Escala horizontal ou concorrencia podem ser ajustadas com seguranca."
        },
        {
          title: "Observabilidade orienta tuning",
          description: "Lag, depth e idade da mensagem viram sinais operacionais claros."
        }
      ],
      tradeoffs: [
        {
          area: "Resiliencia",
          benefit: "O backend fica protegido contra rajadas de trafego.",
          cost: "A resposta passa a ser eventual para parte do processamento."
        },
        {
          area: "Operacao",
          benefit: "Backlog e throughput ficam mais visiveis.",
          cost: "DLQ, reprocessamento e idempotencia viram obrigatorios."
        },
        {
          area: "Escala",
          benefit: "Consumidores podem crescer conforme a fila pede.",
          cost: "Escalar sem controle pode mover o gargalo para outra camada."
        }
      ],
      goodFit: [
        "A carga chega em picos ou lotes.",
        "O backend nao precisa responder imediatamente ao usuario final.",
        "A operacao consegue medir backlog e latencia de fila."
      ],
      warningSigns: [
        "O time usa fila para esconder um fluxo que deveria continuar sincronico.",
        "Nao existe DLQ nem politica de retry.",
        "Os consumidores nao sao idempotentes."
      ],
      callout: {
        title: "Sinal pratico",
        text:
          "Se o seu timeout atual esta funcionando como 'fila invisivel', provavelmente chegou a hora de tornar o buffer explicito.",
        ids: ["azure-queue-based-load-leveling", "aws-wellarchitected-loose-coupling"]
      },
      awsScenario: "Uploads de documentos e geracao de thumbnails chegam em rajadas acima da capacidade media do pipeline.",
      awsImplementation: [
        "A API grava unidades de trabalho em Amazon SQS imediatamente apos validar a entrada.",
        "AWS Lambda ou workers em Amazon ECS drenam a fila conforme a concorrencia configurada.",
        "CloudWatch monitora profundidade da fila, idade da mensagem e taxa de erro.",
        "Mensagens irrecuperaveis seguem para DLQ para analise e replay controlado."
      ],
      commonMistakes: [
        "Ignorar a experiencia do usuario e nao comunicar que o processamento e assincrono.",
        "Escalar consumidores sem observar limites do backend real.",
        "Usar a fila sem estrategia para mensagens venenosas."
      ],
      comparisons: [
        {
          title: "Queue-Based Load Leveling vs Competing Consumers",
          difference: "Load Leveling cria o buffer; Competing Consumers aumentam a vazao drenando esse buffer em paralelo."
        },
        {
          title: "Queue-Based Load Leveling vs Bulkhead",
          difference: "Load Leveling controla ritmo; Bulkhead isola capacidade entre grupos de trabalho."
        }
      ]
    },
    en: {
      title: "Queue-Based Load Leveling",
      summary:
        "Places a queue between producer and consumer to absorb bursts, decouple processing pace, and protect the backend.",
      problem:
        "Traffic arrives in spikes, the backend cannot keep up at the same pace, and direct calls start taking the entire flow down.",
      whenToUse: [
        "When demand arrives in spikes larger than immediate processing capacity.",
        "When the backend can work asynchronously.",
        "When you need an operational buffer and explicit retry control."
      ],
      whenNotToUse: [
        "When the response must remain synchronous in the user path.",
        "When the workload cannot tolerate queuing or eventual processing.",
        "When the consumer cannot safely handle redelivery."
      ],
      tags: ["queue", "buffer", "backpressure", "spikes"],
      media: mediaFromAsset(
        "queue-based-load-leveling",
        "Diagrama de produtores enviando trabalho para uma fila antes do consumo.",
        "A fila desacopla taxa de chegada e taxa de processamento.",
        "Diagram showing producers sending work into a queue before consumers process it.",
        "The queue decouples arrival rate from processing rate."
      ).en,
      overview: [
        {
          text:
            "Queue-Based Load Leveling is the most direct pattern for handling the gap between how fast work arrives and how fast the system can actually process it.",
          ids: ["azure-queue-based-load-leveling"]
        },
        {
          text:
            "The queue becomes an operational shock absorber: the front door keeps accepting work while consumers drain at the sustainable pace of the backend.",
          ids: ["aws-wellarchitected-loose-coupling", "aws-lambda-sqs-configure"]
        }
      ],
      diagram: {
        title: "The queue absorbs bursts and stabilizes processing",
        type: "flowchart",
        code:
          'Ingress["API / Producers"] --> Queue["Amazon SQS"]\nQueue --> ConsumerA["Worker A"]\nQueue --> ConsumerB["Worker B"]\nQueue --> ConsumerC["Worker C"]\nConsumerA --> Backend["Backend / DB"]\nConsumerB --> Backend\nConsumerC --> Backend',
        caption:
          "Backlog becomes visible in the queue instead of hiding behind timeouts and silent backend saturation."
      },
      flowSteps: [
        {
          title: "The producer accepts work quickly",
          description: "The job is persisted in the queue instead of pushed straight into the backend."
        },
        {
          title: "The queue accumulates controlled backlog",
          description: "The system gains an explicit backpressure point and measurement surface."
        },
        {
          title: "Consumers drain according to capacity",
          description: "Horizontal scale and concurrency can be tuned safely."
        },
        {
          title: "Observability drives tuning",
          description: "Lag, depth, and message age become clear operational signals."
        }
      ],
      tradeoffs: [
        {
          area: "Resilience",
          benefit: "The backend is protected from sudden bursts.",
          cost: "Part of the response becomes eventually processed."
        },
        {
          area: "Operations",
          benefit: "Backlog and throughput are easier to observe.",
          cost: "DLQ handling, replay, and idempotency become mandatory."
        },
        {
          area: "Scale",
          benefit: "Consumers can grow as the queue demands.",
          cost: "Blindly scaling consumers can simply move the bottleneck elsewhere."
        }
      ],
      goodFit: [
        "Traffic arrives in spikes or batches.",
        "The backend does not need to complete work inside the synchronous user path.",
        "The team can measure backlog and queue latency operationally."
      ],
      warningSigns: [
        "The queue is being used to hide a flow that should stay synchronous.",
        "There is no DLQ or retry policy.",
        "Consumers are not idempotent."
      ],
      callout: {
        title: "Practical signal",
        text:
          "If timeouts are acting as an invisible queue today, it is usually time to make the buffer explicit.",
        ids: ["azure-queue-based-load-leveling", "aws-wellarchitected-loose-coupling"]
      },
      awsScenario: "Document uploads and thumbnail generation arrive in bursts above the average pipeline capacity.",
      awsImplementation: [
        "The API writes work items to Amazon SQS right after validating the request.",
        "AWS Lambda or Amazon ECS workers drain the queue according to configured concurrency.",
        "CloudWatch tracks queue depth, age of oldest message, and error rate.",
        "Unrecoverable messages flow to a DLQ for analysis and controlled replay."
      ],
      commonMistakes: [
        "Ignoring user experience and failing to communicate that processing is asynchronous.",
        "Scaling consumers without observing real backend limits.",
        "Using a queue without a plan for poison messages."
      ],
      comparisons: [
        {
          title: "Queue-Based Load Leveling vs Competing Consumers",
          difference: "Load Leveling creates the buffer; Competing Consumers increase throughput by draining that buffer in parallel."
        },
        {
          title: "Queue-Based Load Leveling vs Bulkhead",
          difference: "Load Leveling controls pace; Bulkhead isolates capacity between work pools."
        }
      ]
    }
  },
  {
    slug: "circuit-breaker",
    category: "resilience",
    problemFocus: "fault-isolation",
    complexity: "intermediate",
    flowType: "synchronous",
    awsServices: ["Amazon API Gateway", "AWS Lambda", "Amazon CloudWatch", "AWS Step Functions"],
    relatedPatterns: ["timeout", "retry-with-exponential-backoff", "bulkhead"],
    references: [
      reference("nygard-release-it", "conceptual"),
      reference("aws-circuit-breaker", "implementation"),
      reference("azure-circuit-breaker", "complementary")
    ],
    featured: true,
    pt: {
      title: "Circuit Breaker",
      summary:
        "Interrompe chamadas para dependencias instaveis quando a taxa de falha ultrapassa um limiar, reduzindo cascatas e acelerando recuperacao.",
      problem:
        "Chamadas repetidas para uma dependencia degradada consomem threads, tempo e capacidade ate contaminar todo o servico chamador.",
      whenToUse: [
        "Quando ha chamadas remotas criticas sujeitas a latencia, erro ou indisponibilidade.",
        "Quando o chamador precisa falhar rapido e preservar recursos.",
        "Quando existe fallback, resposta degradada ou fila de compensacao."
      ],
      whenNotToUse: [
        "Quando a dependencia e local e barata o suficiente para retry simples.",
        "Quando nao existe estrategia para o estado aberto e half-open.",
        "Quando o time nao monitora taxa de falha e latencia."
      ],
      tags: ["falhas", "isolamento", "dependencias", "fallback"],
      media: mediaFromAsset(
        "circuit-breaker",
        "Diagrama mostrando o circuito fechado, aberto e meio aberto entre servico e dependencia.",
        "O circuito bloqueia chamadas repetidas ate a dependencia mostrar sinais de recuperacao.",
        "Diagram showing closed, open, and half-open states between a service and a dependency.",
        "The breaker stops repeated calls until the dependency shows signs of recovery."
      ).pt,
      overview: [
        {
          text:
            "Circuit Breaker trata uma dependencia remota como um componente cujo comportamento precisa ser observado e governado, e nao apenas chamado em loop com retries cegos.",
          ids: ["nygard-release-it"]
        },
        {
          text:
            "Ao abrir o circuito apos um limiar de falha, o servico preserva recursos locais, protege o usuario de latencia infinita e ganha tempo para a dependencia se recuperar.",
          ids: ["aws-circuit-breaker", "azure-circuit-breaker"]
        }
      ],
      diagram: {
        title: "Estados do circuito ao redor da dependencia",
        type: "stateDiagram-v2",
        code:
          'state "Closed" as Closed\nstate "Open" as Open\nstate "Half-open" as HalfOpen\n[*] --> Closed\nClosed --> Open: Taxa de falha / timeout ultrapassa o limiar\nOpen --> HalfOpen: Janela de recuperacao expira\nHalfOpen --> Closed: Chamadas de teste funcionam\nHalfOpen --> Open: Falha novamente',
        caption:
          "O breaker troca disponibilidade imediata por estabilidade sistemica e recuperacao controlada."
      },
      flowSteps: [
        {
          title: "O circuito comeca fechado",
          description: "Chamadas seguem normalmente enquanto a dependencia responde dentro do esperado."
        },
        {
          title: "Falhas e timeouts alimentam a metrica do breaker",
          description: "Quando o limiar estoura, novas chamadas deixam de ir para o downstream."
        },
        {
          title: "O estado aberto falha rapido",
          description: "O servico retorna fallback, fila compensatoria ou erro controlado."
        },
        {
          title: "O half-open testa recuperacao",
          description: "Um pequeno numero de chamadas valida se o downstream voltou a ficar saudavel."
        }
      ],
      tradeoffs: [
        {
          area: "Protecao",
          benefit: "Evita cascatas de falha e exaustao de recursos locais.",
          cost: "Pode rejeitar chamadas durante o periodo de abertura."
        },
        {
          area: "Operacao",
          benefit: "A saude da dependencia vira um estado observavel.",
          cost: "Limiar, janela e fallback precisam ser bem calibrados."
        },
        {
          area: "Experiencia",
          benefit: "Falha rapido costuma ser melhor do que travar o usuario.",
          cost: "Resposta degradada precisa ser entendida pelo produto."
        }
      ],
      goodFit: [
        "Existem dependencias remotas com historico de instabilidade ou picos de latencia.",
        "Falhar rapido e melhor do que segurar conexoes indefinidamente.",
        "Ha fallback ou forma clara de comunicar degradacao."
      ],
      warningSigns: [
        "O breaker foi configurado sem telemetry e sem revisao dos limiares.",
        "O sistema ainda faz retries agressivos em todas as camadas.",
        "Nao existe estrategia para o estado half-open."
      ],
      callout: {
        title: "Regra pratica",
        text:
          "Circuit Breaker funciona melhor combinado com timeout curto, retries limitados e isolamento de capacidade; sozinho ele nao salva uma dependencia mal governada.",
        ids: ["aws-circuit-breaker", "nygard-release-it"]
      },
      awsScenario: "Gateway interno chama servico de pagamentos que oscila durante janelas de pico.",
      awsImplementation: [
        "O chamador mede timeout e taxa de erro por operacao com CloudWatch.",
        "Quando o limiar dispara, uma camada de politica ou workflow em AWS Step Functions passa a falhar rapido e acionar fallback.",
        "Amazon API Gateway ou a propria aplicacao pode responder com mensagem degradada e correlation id.",
        "Alarmes e dashboards acompanham transicoes de estado do breaker e tempo em circuito aberto."
      ],
      commonMistakes: [
        "Abrir o circuito apenas por contagem bruta sem considerar janela temporal.",
        "Usar breaker sem timeout curto e continuar prendendo recursos locais.",
        "Nao revisar fallbacks junto com o time de produto."
      ],
      comparisons: [
        {
          title: "Circuit Breaker vs Retry with Exponential Backoff",
          difference: "Retry tenta novamente; Circuit Breaker decide quando parar de tentar por um periodo."
        },
        {
          title: "Circuit Breaker vs Bulkhead",
          difference: "Circuit Breaker protege contra dependencia degradada; Bulkhead isola pools de capacidade."
        }
      ]
    },
    en: {
      title: "Circuit Breaker",
      summary:
        "Stops calls to unstable dependencies when failure rates cross a threshold, reducing cascades and accelerating recovery.",
      problem:
        "Repeated calls into a degraded dependency burn threads, time, and local capacity until the caller becomes unhealthy as well.",
      whenToUse: [
        "When critical remote calls are exposed to latency, failures, or outages.",
        "When the caller should fail fast and preserve local resources.",
        "When there is a fallback, degraded response, or compensation path."
      ],
      whenNotToUse: [
        "When the dependency is local and cheap enough for simple retries.",
        "When there is no strategy for open and half-open behavior.",
        "When the team does not observe latency and failure rate."
      ],
      tags: ["failures", "isolation", "dependencies", "fallback"],
      media: mediaFromAsset(
        "circuit-breaker",
        "Diagrama mostrando o circuito fechado, aberto e meio aberto entre servico e dependencia.",
        "O circuito bloqueia chamadas repetidas ate a dependencia mostrar sinais de recuperacao.",
        "Diagram showing closed, open, and half-open states between a service and a dependency.",
        "The breaker stops repeated calls until the dependency shows signs of recovery."
      ).en,
      overview: [
        {
          text:
            "Circuit Breaker treats a remote dependency as something that must be observed and governed, not simply hammered with blind retries.",
          ids: ["nygard-release-it"]
        },
        {
          text:
            "By opening the circuit after a failure threshold, the service preserves local resources, protects the user from unbounded latency, and gives the dependency time to recover.",
          ids: ["aws-circuit-breaker", "azure-circuit-breaker"]
        }
      ],
      diagram: {
        title: "Circuit states around a dependency",
        type: "stateDiagram-v2",
        code:
          'state "Closed" as Closed\nstate "Open" as Open\nstate "Half-open" as HalfOpen\n[*] --> Closed\nClosed --> Open: Failure rate / timeout crosses threshold\nOpen --> HalfOpen: Recovery window expires\nHalfOpen --> Closed: Probe calls succeed\nHalfOpen --> Open: Probe calls fail again',
        caption:
          "The breaker trades immediate availability for systemic stability and controlled recovery."
      },
      flowSteps: [
        {
          title: "The circuit starts closed",
          description: "Calls flow normally while the dependency responds within acceptable bounds."
        },
        {
          title: "Failures and timeouts feed breaker metrics",
          description: "Once the threshold is crossed, new calls stop reaching the downstream service."
        },
        {
          title: "The open state fails fast",
          description: "The service returns a fallback, compensation route, or controlled error."
        },
        {
          title: "Half-open probes recovery",
          description: "A small number of calls checks whether the dependency is healthy again."
        }
      ],
      tradeoffs: [
        {
          area: "Protection",
          benefit: "Prevents failure cascades and local resource exhaustion.",
          cost: "Can reject calls during the open period."
        },
        {
          area: "Operations",
          benefit: "Dependency health becomes an observable system state.",
          cost: "Thresholds, windows, and fallbacks need careful tuning."
        },
        {
          area: "Experience",
          benefit: "Fail-fast is often better than making the user wait forever.",
          cost: "Degraded behavior must be understood by product and support."
        }
      ],
      goodFit: [
        "There are remote dependencies with instability or latency spikes.",
        "Failing fast is better than holding connections indefinitely.",
        "There is a clear degraded response or fallback path."
      ],
      warningSigns: [
        "The breaker was configured without telemetry or threshold review.",
        "The system still retries aggressively at every layer.",
        "There is no half-open strategy."
      ],
      callout: {
        title: "Practical rule",
        text:
          "Circuit Breaker works best together with short timeouts, bounded retries, and capacity isolation; by itself it does not save an unmanaged dependency.",
        ids: ["aws-circuit-breaker", "nygard-release-it"]
      },
      awsScenario: "An internal gateway calls a payment service that becomes unstable during burst windows.",
      awsImplementation: [
        "The caller tracks timeout and error rate per operation in CloudWatch.",
        "When the threshold trips, a policy layer or AWS Step Functions workflow starts failing fast and routing to fallback behavior.",
        "Amazon API Gateway or the calling application can return a degraded response with a correlation id.",
        "Alarms and dashboards follow breaker state transitions and total time spent open."
      ],
      commonMistakes: [
        "Opening the circuit on raw counts alone without a time window.",
        "Using a breaker without short timeouts and still pinning local resources.",
        "Skipping product review of degraded responses."
      ],
      comparisons: [
        {
          title: "Circuit Breaker vs Retry with Exponential Backoff",
          difference: "Retry decides how to try again; Circuit Breaker decides when to stop trying for a while."
        },
        {
          title: "Circuit Breaker vs Bulkhead",
          difference: "Circuit Breaker protects against an unhealthy dependency; Bulkhead isolates capacity pools."
        }
      ]
    }
  },
  {
    slug: "cache-aside",
    category: "data",
    problemFocus: "latency-reduction",
    complexity: "starter",
    flowType: "synchronous",
    awsServices: ["Amazon ElastiCache", "Amazon DynamoDB", "AWS Lambda", "Amazon API Gateway"],
    relatedPatterns: ["cqrs", "api-composition", "rate-limiting"],
    references: [
      reference("azure-cache-aside", "conceptual"),
      reference("aws-cache-read", "implementation"),
      reference("aws-cache-write", "complementary")
    ],
    featured: true,
    pt: {
      title: "Cache-Aside",
      summary:
        "Carrega dados sob demanda no cache, reduz latencia de leitura e protege o datastore em acessos repetidos.",
      problem:
        "A mesma consulta e refeita continuamente no datastore primario, aumentando latencia e custo em dados quentes.",
      whenToUse: [
        "Quando leituras repetidas concentram-se em um subconjunto quente de dados.",
        "Quando a aplicacao pode tolerar expiracao controlada ou inconsistencia breve.",
        "Quando o acesso ao datastore primario e significativamente mais caro do que servir do cache."
      ],
      whenNotToUse: [
        "Quando os dados mudam o tempo todo e stale data e inaceitavel.",
        "Quando o padrao de acesso e disperso demais para manter boa taxa de hit.",
        "Quando nao ha estrategia para invalidacao ou TTL."
      ],
      tags: ["cache", "leitura", "latencia", "ttl"],
      media: mediaFromAsset(
        "cache-aside",
        "Diagrama de leitura consultando cache antes do banco principal.",
        "O cache responde hits rapidamente e busca no banco apenas em miss.",
        "Diagram showing reads checking the cache before the primary database.",
        "The cache serves hits quickly and reaches the database only on misses."
      ).pt,
      overview: [
        {
          text:
            "Cache-Aside e a estrategia mais comum quando uma aplicacao quer manter o datastore canonico como fonte de verdade, mas evitar consultas repetidas para os mesmos dados quentes.",
          ids: ["azure-cache-aside"]
        },
        {
          text:
            "A aplicacao tenta ler do cache primeiro, cai no banco apenas em miss e grava o resultado no cache para as proximas leituras equivalentes.",
          ids: ["aws-cache-read", "aws-cache-write"]
        }
      ],
      diagram: {
        title: "Read-through manual no lado da aplicacao",
        type: "flowchart",
        code:
          'Client["Client / API"] --> App["Application"]\nApp --> Cache{"Cache hit?"}\nCache -->|Yes| Response["Return cached data"]\nCache -->|No| Database["Primary database"]\nDatabase --> App\nApp --> Warm["Store in cache"]\nWarm --> Response',
        caption:
          "A aplicacao controla miss, warm-up e politicas de expiracao de forma explicita."
      },
      flowSteps: [
        {
          title: "A aplicacao procura primeiro no cache",
          description: "Hits devolvem resposta rapida sem tocar no datastore principal."
        },
        {
          title: "Em caso de miss, a consulta vai ao datastore",
          description: "O resultado canonico ainda vem da fonte de verdade."
        },
        {
          title: "O dado e aquecido no cache",
          description: "As proximas leituras equivalentes passam a ser atendidas com menor latencia."
        },
        {
          title: "TTL ou invalidacao removem versoes antigas",
          description: "O desafio central e equilibrar frescor com custo e simplicidade."
        }
      ],
      tradeoffs: [
        {
          area: "Desempenho",
          benefit: "Reduce latencia e pressao sobre o datastore primario.",
          cost: "Erros de invalidacao podem servir dado stale."
        },
        {
          area: "Custos",
          benefit: "Leituras frequentes ficam muito mais baratas.",
          cost: "Voce passa a operar infraestrutura e politicas de cache."
        },
        {
          area: "Simplicidade",
          benefit: "O padrao pode ser introduzido sem reescrever todo o modelo.",
          cost: "O comportamento fica espalhado pela camada de aplicacao."
        }
      ],
      goodFit: [
        "Existe um conjunto quente de chaves ou consultas repetidas.",
        "A aplicacao tolera TTL e pequena defasagem.",
        "Ha telemetria de hit ratio, miss e expiracao."
      ],
      warningSigns: [
        "O time trata cache como fonte de verdade.",
        "Nao ha invalidacao para escritas relevantes.",
        "O acesso e tao disperso que o cache nunca esquenta."
      ],
      callout: {
        title: "Detalhe importante",
        text:
          "Cache-Aside melhora o caminho de leitura, mas continua exigindo uma estrategia clara para escrita, invalidação e quedas de cache.",
        ids: ["aws-cache-read", "aws-cache-write"]
      },
      awsScenario: "Catalogo de produtos possui um conjunto pequeno de itens muito consultados ao longo do dia.",
      awsImplementation: [
        "A API tenta ler primeiro do Amazon ElastiCache usando a chave da consulta.",
        "Em miss, o dado e buscado no Amazon DynamoDB e armazenado no cache com TTL coerente com o dominio.",
        "Escritas invalidam ou atualizam a chave relacionada logo apos a persistencia.",
        "Metricas de hit ratio e latencia ajudam a evitar um cache caro e pouco efetivo."
      ],
      commonMistakes: [
        "Usar TTL arbitrario sem relacao com a semantica do dado.",
        "Esquecer que um miss em massa pode causar stampede no banco.",
        "Ignorar comportamento quando o cache fica indisponivel."
      ],
      comparisons: [
        {
          title: "Cache-Aside vs CQRS",
          difference: "Cache-Aside acelera leitura de um modelo existente; CQRS cria um read model dedicado."
        },
        {
          title: "Cache-Aside vs API Composition",
          difference: "Cache-Aside reduz custo de leituras repetidas; API Composition junta dados de varios servicos."
        }
      ]
    },
    en: {
      title: "Cache-Aside",
      summary:
        "Loads data into the cache on demand, reducing read latency and protecting the primary store for repeated access.",
      problem:
        "The same query keeps hitting the primary datastore over and over, increasing latency and cost for hot data.",
      whenToUse: [
        "When repeated reads concentrate around a hot subset of data.",
        "When the application can tolerate controlled expiration or brief staleness.",
        "When serving from the primary datastore is significantly more expensive than serving from cache."
      ],
      whenNotToUse: [
        "When data changes constantly and stale values are unacceptable.",
        "When access is too dispersed to maintain healthy hit ratios.",
        "When there is no TTL or invalidation strategy."
      ],
      tags: ["cache", "reads", "latency", "ttl"],
      media: mediaFromAsset(
        "cache-aside",
        "Diagrama de leitura consultando cache antes do banco principal.",
        "O cache responde hits rapidamente e busca no banco apenas em miss.",
        "Diagram showing reads checking the cache before the primary database.",
        "The cache serves hits quickly and reaches the database only on misses."
      ).en,
      overview: [
        {
          text:
            "Cache-Aside is the most common strategy when an application wants to keep the canonical datastore as the source of truth while avoiding repeated reads for the same hot data.",
          ids: ["azure-cache-aside"]
        },
        {
          text:
            "The application checks the cache first, falls back to the database on a miss, and stores the result back in cache for the next equivalent read.",
          ids: ["aws-cache-read", "aws-cache-write"]
        }
      ],
      diagram: {
        title: "Application-managed read-through behavior",
        type: "flowchart",
        code:
          'Client["Client / API"] --> App["Application"]\nApp --> Cache{"Cache hit?"}\nCache -->|Yes| Response["Return cached data"]\nCache -->|No| Database["Primary database"]\nDatabase --> App\nApp --> Warm["Store in cache"]\nWarm --> Response',
        caption:
          "The application owns miss handling, warming, and expiration policy explicitly."
      },
      flowSteps: [
        {
          title: "The application reads from cache first",
          description: "Hits return quickly without touching the primary store."
        },
        {
          title: "On a miss, the request falls back to the datastore",
          description: "Canonical data still comes from the source of truth."
        },
        {
          title: "The result warms the cache",
          description: "Equivalent future reads become cheaper and faster."
        },
        {
          title: "TTL or invalidation removes old values",
          description: "The core challenge is balancing freshness, simplicity, and cost."
        }
      ],
      tradeoffs: [
        {
          area: "Performance",
          benefit: "Reduces latency and pressure on the primary datastore.",
          cost: "Invalidation mistakes can serve stale data."
        },
        {
          area: "Cost",
          benefit: "Frequent reads become much cheaper.",
          cost: "You now operate cache infrastructure and policy."
        },
        {
          area: "Simplicity",
          benefit: "The pattern can be introduced without redesigning the whole model.",
          cost: "Behavior lives in application code instead of pure infrastructure."
        }
      ],
      goodFit: [
        "There is a hot set of keys or repeated queries.",
        "The application tolerates TTL and minor staleness.",
        "Hit ratio, miss rate, and expiration are observable."
      ],
      warningSigns: [
        "The team treats cache as the source of truth.",
        "There is no invalidation path for important writes.",
        "Access is so dispersed that the cache never really warms."
      ],
      callout: {
        title: "Important detail",
        text:
          "Cache-Aside improves the read path, but it still needs a clear plan for writes, invalidation, and cache outages.",
        ids: ["aws-cache-read", "aws-cache-write"]
      },
      awsScenario: "A product catalog has a small set of items that are queried repeatedly throughout the day.",
      awsImplementation: [
        "The API first checks Amazon ElastiCache using the query key.",
        "On a miss, data is loaded from Amazon DynamoDB and written back with a domain-appropriate TTL.",
        "Writes invalidate or update the related cache key right after persistence.",
        "Hit ratio and latency metrics help avoid running an expensive but ineffective cache."
      ],
      commonMistakes: [
        "Picking arbitrary TTL values with no relation to data semantics.",
        "Forgetting that mass misses can cause a stampede on the database.",
        "Ignoring behavior when the cache becomes unavailable."
      ],
      comparisons: [
        {
          title: "Cache-Aside vs CQRS",
          difference: "Cache-Aside speeds up an existing model; CQRS creates a dedicated read model."
        },
        {
          title: "Cache-Aside vs API Composition",
          difference: "Cache-Aside reduces cost for repeated reads; API Composition joins data from multiple services."
        }
      ]
    }
  },
  {
    slug: "strangler-fig",
    category: "modernization",
    problemFocus: "incremental-migration",
    complexity: "advanced",
    flowType: "hybrid",
    awsServices: ["Amazon API Gateway", "AWS Lambda", "Amazon ECS", "Amazon EventBridge"],
    relatedPatterns: ["api-gateway", "cqrs", "database-per-service"],
    references: [
      reference("fowler-strangler", "conceptual"),
      reference("aws-strangler-fig", "implementation"),
      reference("aws-api-gateway-welcome", "complementary")
    ],
    featured: true,
    pt: {
      title: "Strangler Fig",
      summary:
        "Moderniza um sistema legado por substituicao gradual de fluxos, com um proxy controlando o roteamento entre antigo e novo.",
      problem:
        "Reescrever tudo de uma vez e arriscado demais, mas o legado ja nao permite evolucao segura na velocidade do negocio.",
      whenToUse: [
        "Quando o monolito ou sistema legado ainda carrega valor e nao pode parar.",
        "Quando voce consegue isolar fluxos ou capacidades para migrar por etapas.",
        "Quando o time precisa reduzir risco e validar cada corte em producao."
      ],
      whenNotToUse: [
        "Quando nao existe fronteira minima entre capacidades antigas e novas.",
        "Quando o time nao consegue medir e governar o roteamento entre dois mundos.",
        "Quando a reescrita gradual apenas adicionaria mais acoplamento sem plano de aposentadoria."
      ],
      tags: ["modernizacao", "proxy", "legado", "migracao incremental"],
      media: mediaFromAsset(
        "strangler-fig",
        "Diagrama com um proxy encaminhando parte do trafego para o legado e parte para novos servicos.",
        "O novo sistema envolve o antigo aos poucos ate substitui-lo por completo.",
        "Diagram with a proxy routing some traffic to the legacy system and some to new services.",
        "The new system gradually surrounds the old one until it can replace it."
      ).pt,
      overview: [
        {
          text:
            "Strangler Fig parte da ideia de que modernizacao segura raramente acontece em um big bang; ela exige rotas pequenas, observaveis e reversiveis.",
          ids: ["fowler-strangler"]
        },
        {
          text:
            "Um proxy ou camada de fachada controla para onde cada request vai, permitindo migrar um fluxo por vez enquanto o legado continua servindo o resto do negocio.",
          ids: ["aws-strangler-fig", "aws-api-gateway-welcome"]
        }
      ],
      diagram: {
        title: "O proxy governa a migracao por fatias",
        type: "flowchart",
        code:
          'Clients["Consumers"] --> Gateway["API Gateway / Proxy"]\nGateway --> Legacy["Legacy system"]\nGateway --> NewOrder["New order service"]\nGateway --> NewCatalog["New catalog service"]\nNewOrder --> Events["Domain events"]\nEvents --> Legacy',
        caption:
          "A substituicao acontece por fluxo de negocio, e nao por uma reescrita total de uma vez."
      },
      flowSteps: [
        {
          title: "A fachada recebe todo o trafego",
          description: "Ela vira o ponto unico de controle para cortar, testar e reverter."
        },
        {
          title: "Uma capacidade e extraida do legado",
          description: "O fluxo novo passa a responder apenas por um recorte claro."
        },
        {
          title: "Dados e integracoes sao alinhados",
          description: "Eventos, sincronizacao e contratos evitam duplicidade desgovernada."
        },
        {
          title: "O legado perde relevancia progressivamente",
          description: "Cada corte reduz a superficie do sistema antigo ate a aposentadoria."
        }
      ],
      tradeoffs: [
        {
          area: "Risco",
          benefit: "Permite migracao incremental com rollback mais simples.",
          cost: "Durante a transicao existem dois mundos para operar."
        },
        {
          area: "Arquitetura",
          benefit: "Forca a criar fronteiras de negocio mais claras.",
          cost: "Dados, observabilidade e ownership ficam mais complexos temporariamente."
        },
        {
          area: "Entrega",
          benefit: "Cada fatia pode gerar valor antes da modernizacao completa.",
          cost: "Sem disciplina, a transicao pode durar demais e virar um limbo permanente."
        }
      ],
      goodFit: [
        "O legado nao pode ser desligado de uma vez.",
        "Existem recortes de dominio com fronteiras minimamente separaveis.",
        "Ha governanca para acompanhar roteamento, duplicidade e cortes."
      ],
      warningSigns: [
        "Ninguem definiu criterio de pronto para aposentar o fluxo antigo.",
        "O proxy esta virando ponto de logica de negocio acidental.",
        "Nao existe telemetria para comparar comportamento entre antigo e novo."
      ],
      callout: {
        title: "Disciplina de transicao",
        text:
          "Strangler Fig so funciona de verdade quando cada etapa fecha um compromisso de substituicao, e nao apenas mais uma camada em cima do legado.",
        ids: ["fowler-strangler", "aws-strangler-fig"]
      },
      awsScenario: "Uma plataforma legado de pedidos precisa migrar para servicos menores sem interromper clientes externos.",
      awsImplementation: [
        "Amazon API Gateway se torna a fachada externa para controlar roteamento por rota, versao ou cliente.",
        "Fluxos extraidos rodam em AWS Lambda ou Amazon ECS, enquanto o legado segue atendendo o restante.",
        "Eventos publicados em Amazon EventBridge sincronizam estados relevantes durante a convivencia.",
        "Observabilidade por rota mostra quando um fluxo esta pronto para aposentar sua contraparte legada."
      ],
      commonMistakes: [
        "Extrair tecnicamente sem definir ownership e fronteira de negocio.",
        "Nunca desligar o caminho antigo depois que o novo estabiliza.",
        "Transformar a fachada em um novo monolito de integracao."
      ],
      comparisons: [
        {
          title: "Strangler Fig vs Big Bang Rewrite",
          difference: "Strangler Fig reparte o risco e entrega valor por fatias; Big Bang concentra risco e validacao no fim."
        },
        {
          title: "Strangler Fig vs API Gateway",
          difference: "API Gateway e uma capacidade de borda; Strangler Fig e a estrategia de modernizacao que frequentemente usa essa capacidade."
        }
      ]
    },
    en: {
      title: "Strangler Fig",
      summary:
        "Modernizes a legacy system through gradual replacement, with a proxy governing how traffic is split between old and new.",
      problem:
        "Rewriting everything at once is too risky, but the legacy system no longer supports safe business evolution.",
      whenToUse: [
        "When the monolith or legacy system still carries business value and cannot be stopped abruptly.",
        "When you can isolate capabilities or flows to migrate incrementally.",
        "When the team needs to reduce risk and validate each cut in production."
      ],
      whenNotToUse: [
        "When there is no minimal boundary between old and new capabilities.",
        "When the team cannot observe and govern routing between the two worlds.",
        "When gradual rewriting would only add more coupling with no retirement plan."
      ],
      tags: ["modernization", "proxy", "legacy", "incremental migration"],
      media: mediaFromAsset(
        "strangler-fig",
        "Diagrama com um proxy encaminhando parte do trafego para o legado e parte para novos servicos.",
        "O novo sistema envolve o antigo aos poucos ate substitui-lo por completo.",
        "Diagram with a proxy routing some traffic to the legacy system and some to new services.",
        "The new system gradually surrounds the old one until it can replace it."
      ).en,
      overview: [
        {
          text:
            "Strangler Fig starts from the idea that safe modernization rarely happens as a big bang; it depends on small, observable, and reversible cuts.",
          ids: ["fowler-strangler"]
        },
        {
          text:
            "A proxy or façade layer governs where each request goes, allowing one flow at a time to move while the legacy platform still serves the rest of the business.",
          ids: ["aws-strangler-fig", "aws-api-gateway-welcome"]
        }
      ],
      diagram: {
        title: "The proxy governs migration by capability slice",
        type: "flowchart",
        code:
          'Clients["Consumers"] --> Gateway["API Gateway / Proxy"]\nGateway --> Legacy["Legacy system"]\nGateway --> NewOrder["New order service"]\nGateway --> NewCatalog["New catalog service"]\nNewOrder --> Events["Domain events"]\nEvents --> Legacy',
        caption:
          "Replacement happens by business flow, not through a full rewrite in one move."
      },
      flowSteps: [
        {
          title: "The façade receives all traffic",
          description: "It becomes the single point of control for cuts, tests, and rollback."
        },
        {
          title: "One capability is extracted from the legacy system",
          description: "The new flow becomes responsible for a clear slice only."
        },
        {
          title: "Data and integrations are aligned",
          description: "Events, synchronization, and contracts keep duplication under control."
        },
        {
          title: "Legacy surface area shrinks over time",
          description: "Each cut reduces the old system until retirement becomes realistic."
        }
      ],
      tradeoffs: [
        {
          area: "Risk",
          benefit: "Enables incremental migration with simpler rollback.",
          cost: "Two worlds must be operated during the transition."
        },
        {
          area: "Architecture",
          benefit: "Forces clearer business boundaries.",
          cost: "Data ownership and observability become temporarily more complex."
        },
        {
          area: "Delivery",
          benefit: "Each slice can deliver value before the entire modernization finishes.",
          cost: "Without discipline, the transition can drag on and become permanent limbo."
        }
      ],
      goodFit: [
        "The legacy platform cannot be turned off in one move.",
        "There are domain slices with at least some separable boundary.",
        "There is governance for routing, duplication, and migration cuts."
      ],
      warningSigns: [
        "No retirement criteria exist for the old path.",
        "The proxy is becoming a new accidental business-logic monolith.",
        "There is no telemetry to compare old and new behavior."
      ],
      callout: {
        title: "Transition discipline",
        text:
          "Strangler Fig only works when every migration step closes a replacement commitment instead of adding yet another layer on top of the legacy system.",
        ids: ["fowler-strangler", "aws-strangler-fig"]
      },
      awsScenario: "A legacy ordering platform needs to move to smaller services without breaking external clients.",
      awsImplementation: [
        "Amazon API Gateway becomes the external façade and controls routing by route, version, or client segment.",
        "Extracted flows run on AWS Lambda or Amazon ECS while the legacy platform keeps serving the rest.",
        "Events published through Amazon EventBridge synchronize relevant state during coexistence.",
        "Route-level observability shows when a flow is ready to retire its legacy counterpart."
      ],
      commonMistakes: [
        "Extracting technically without clarifying business ownership and boundaries.",
        "Never shutting down the old path after the new one stabilizes.",
        "Turning the façade into a new integration monolith."
      ],
      comparisons: [
        {
          title: "Strangler Fig vs Big Bang Rewrite",
          difference: "Strangler Fig spreads risk and delivers value by slice; a big bang rewrite concentrates risk and validation at the end."
        },
        {
          title: "Strangler Fig vs API Gateway",
          difference: "API Gateway is an edge capability; Strangler Fig is the modernization strategy that often uses that capability."
        }
      ]
    }
  },
  {
    slug: "transactional-outbox",
    category: "event-driven",
    problemFocus: "reliable-delivery",
    complexity: "advanced",
    flowType: "asynchronous",
    awsServices: ["Amazon RDS", "Amazon DynamoDB", "Amazon EventBridge", "AWS Lambda"],
    relatedPatterns: ["saga", "event-sourcing", "idempotent-consumer"],
    references: [
      reference("microservices-transactional-outbox", "conceptual"),
      reference("aws-transactional-outbox", "implementation"),
      reference("microservices-patterns-book", "complementary")
    ],
    featured: true,
    pt: {
      title: "Transactional Outbox",
      summary:
        "Grava a mudanca de estado e o evento correspondente na mesma transacao local, publicando depois com seguranca.",
      problem:
        "O servico precisa persistir uma alteracao e publicar um evento, mas nao pode correr o risco de fazer apenas uma das duas coisas.",
      whenToUse: [
        "Quando a escrita local e a publicacao do evento precisam ser atomicamente alinhadas.",
        "Quando dois-phase commit entre banco e broker nao e viavel.",
        "Quando eventos de integracao sao parte central do contrato entre servicos."
      ],
      whenNotToUse: [
        "Quando nao existe consumo assinado ou necessidade de evento confiavel.",
        "Quando a publicacao eventual e desnecessaria e a integracao pode ser local.",
        "Quando a equipe nao tem estrategia para relay, retry e deduplicacao downstream."
      ],
      tags: ["outbox", "mensageria", "consistencia", "publicacao confiavel"],
      media: {},
      overview: [
        {
          text:
            "Transactional Outbox existe para remover a janela perigosa entre 'gravei no banco' e 'publiquei no broker', onde uma falha parcial costuma gerar inconsistencias dificeis de reconciliar.",
          ids: ["microservices-transactional-outbox"]
        },
        {
          text:
            "A solucao e registrar o evento de saida na mesma transacao local da mudanca de estado e deixar um relay publicar esse outbox de forma assincrona e observavel.",
          ids: ["aws-transactional-outbox", "microservices-patterns-book"]
        }
      ],
      diagram: {
        title: "Write e evento saem da mesma transacao local",
        type: "flowchart",
        code:
          'Command["Business command"] --> Service["Service"]\nService --> Tx["Local transaction"]\nTx --> State["Business tables"]\nTx --> Outbox["Outbox table / item"]\nOutbox --> Relay["Outbox relay"]\nRelay --> Bus["EventBridge / Broker"]\nBus --> Consumers["Subscribers"]',
        caption:
          "A publicacao pode atrasar, mas a intencao de publicar ja ficou registrada de forma atomica."
      },
      flowSteps: [
        {
          title: "A operacao de negocio abre uma transacao local",
          description: "O aggregate e atualizado junto com um registro na outbox."
        },
        {
          title: "A transacao confirma estado e mensagem pendente",
          description: "Nao existe janela onde o estado muda e o evento some."
        },
        {
          title: "Um relay publica os registros da outbox",
          description: "Esse processo pode ser polling ou baseado em stream/CDC."
        },
        {
          title: "Consumidores tratam duplicidade e ordem local",
          description: "A confiabilidade completa depende de idempotencia downstream."
        }
      ],
      tradeoffs: [
        {
          area: "Consistencia",
          benefit: "Estado local e intencao de publicar ficam atomicamente alinhados.",
          cost: "A entrega do evento continua eventual, nao instantanea."
        },
        {
          area: "Operacao",
          benefit: "Fica claro o que esta pendente de publicacao.",
          cost: "Outbox relay, retry e limpeza viram componentes reais da solucao."
        },
        {
          area: "Escalabilidade",
          benefit: "Evita 2PC entre banco e broker.",
          cost: "Ordem e deduplicacao exigem desenho cuidadoso."
        }
      ],
      goodFit: [
        "Eventos sao obrigatorios para manter servicos downstream sincronizados.",
        "O banco local e a mensagem precisam nascer juntos.",
        "A equipe aceita publicacao eventual com replay controlado."
      ],
      warningSigns: [
        "Nao ha estrategia para outbox presa ou relay parado.",
        "Consumidores nao sao idempotentes.",
        "A equipe espera publicacao perfeitamente instantanea."
      ],
      callout: {
        title: "Lembrete operacional",
        text:
          "Transactional Outbox reduz falha parcial na origem, mas a cadeia inteira ainda precisa de DLQ, idempotencia e reconciliacao.",
        ids: ["aws-transactional-outbox", "microservices-patterns-book"]
      },
      awsScenario: "Servico de pedidos grava OrderCreated e precisa notificar faturamento e estoque com confiabilidade.",
      awsImplementation: [
        "A API persiste o pedido e um registro de outbox em Amazon RDS ou Amazon DynamoDB na mesma unidade transacional local.",
        "Um relay em AWS Lambda ou processo dedicado le os itens pendentes e publica em Amazon EventBridge.",
        "Campos como eventId, aggregateId e createdAt ajudam a manter observabilidade e ordenacao local.",
        "Itens publicados com sucesso sao marcados ou removidos depois de uma politica de retenção segura."
      ],
      commonMistakes: [
        "Publicar direto no broker fora da transacao e manter a janela de falha parcial.",
        "Esquecer limpeza e crescimento da tabela de outbox.",
        "Nao tratar duplicidade nos consumidores."
      ],
      comparisons: [
        {
          title: "Transactional Outbox vs Event Sourcing",
          difference: "Outbox registra a intencao de publicar junto com uma escrita convencional; Event Sourcing usa os eventos como persistencia principal."
        },
        {
          title: "Transactional Outbox vs Saga",
          difference: "Outbox garante a emissao confiavel de um evento; Saga coordena varias etapas de negocio."
        }
      ]
    },
    en: {
      title: "Transactional Outbox",
      summary:
        "Stores the state change and the outgoing event inside the same local transaction, then publishes safely afterward.",
      problem:
        "A service must persist a change and publish an event, but it cannot risk completing only one of those actions.",
      whenToUse: [
        "When the local write and event publication must stay atomically aligned.",
        "When two-phase commit between database and broker is not viable.",
        "When integration events are part of the contract between services."
      ],
      whenNotToUse: [
        "When there is no subscribed downstream consumer or no need for reliable publication.",
        "When publication can remain local and eventual messaging adds no value.",
        "When the team has no plan for relay, retry, and downstream deduplication."
      ],
      tags: ["outbox", "messaging", "consistency", "reliable publication"],
      media: {},
      overview: [
        {
          text:
            "Transactional Outbox removes the dangerous gap between 'I wrote to the database' and 'I published to the broker', where partial failure often creates difficult reconciliation work.",
          ids: ["microservices-transactional-outbox"]
        },
        {
          text:
            "The solution is to persist the outgoing event in the same local transaction as the business change and let a relay publish the outbox asynchronously and observably.",
          ids: ["aws-transactional-outbox", "microservices-patterns-book"]
        }
      ],
      diagram: {
        title: "State change and event intent share one local transaction",
        type: "flowchart",
        code:
          'Command["Business command"] --> Service["Service"]\nService --> Tx["Local transaction"]\nTx --> State["Business tables"]\nTx --> Outbox["Outbox table / item"]\nOutbox --> Relay["Outbox relay"]\nRelay --> Bus["EventBridge / Broker"]\nBus --> Consumers["Subscribers"]',
        caption:
          "Publication may lag, but the intent to publish is stored atomically from the start."
      },
      flowSteps: [
        {
          title: "The business operation opens a local transaction",
          description: "The aggregate update and an outbox record are written together."
        },
        {
          title: "The transaction commits state and pending message",
          description: "There is no gap where state changes but the event disappears."
        },
        {
          title: "A relay publishes pending outbox records",
          description: "That relay can be polling-based or driven by streams / CDC."
        },
        {
          title: "Consumers handle duplicates and local ordering",
          description: "End-to-end reliability still depends on idempotent downstream processing."
        }
      ],
      tradeoffs: [
        {
          area: "Consistency",
          benefit: "Local state and the intent to publish stay atomically aligned.",
          cost: "Delivery is still eventual rather than instantaneous."
        },
        {
          area: "Operations",
          benefit: "Pending publications become visible and traceable.",
          cost: "Relay, cleanup, and retry are now real solution components."
        },
        {
          area: "Scalability",
          benefit: "Avoids 2PC between database and broker.",
          cost: "Ordering and deduplication require careful design."
        }
      ],
      goodFit: [
        "Events are required to keep downstream services aligned.",
        "The local database write and message must be born together.",
        "The team accepts eventual publication with controlled replay."
      ],
      warningSigns: [
        "There is no strategy for stuck outbox records or stopped relays.",
        "Consumers are not idempotent.",
        "Stakeholders expect perfectly immediate publication."
      ],
      callout: {
        title: "Operational reminder",
        text:
          "Transactional Outbox reduces partial failure at the source, but the full chain still needs DLQ, idempotency, and reconciliation.",
        ids: ["aws-transactional-outbox", "microservices-patterns-book"]
      },
      awsScenario: "An order service persists OrderCreated and must notify billing and inventory reliably.",
      awsImplementation: [
        "The API writes the order and an outbox record in Amazon RDS or Amazon DynamoDB inside the same local transactional unit.",
        "A relay running on AWS Lambda or a dedicated process reads pending records and publishes them to Amazon EventBridge.",
        "Fields such as eventId, aggregateId, and createdAt help with observability and local ordering.",
        "Published records are marked or removed after a safe retention policy."
      ],
      commonMistakes: [
        "Publishing directly to the broker outside the transaction and keeping the partial-failure gap alive.",
        "Ignoring cleanup and unbounded growth in the outbox table.",
        "Skipping deduplication in consumers."
      ],
      comparisons: [
        {
          title: "Transactional Outbox vs Event Sourcing",
          difference: "Outbox records the intent to publish alongside a conventional write; Event Sourcing uses events as the persistence model itself."
        },
        {
          title: "Transactional Outbox vs Saga",
          difference: "Outbox guarantees reliable event emission; Saga coordinates multiple business steps."
        }
      ]
    }
  },
  {
    slug: "competing-consumers",
    category: "event-driven",
    problemFocus: "consumer-scale",
    complexity: "intermediate",
    flowType: "asynchronous",
    awsServices: ["Amazon SQS", "AWS Lambda", "Amazon ECS", "Amazon CloudWatch"],
    relatedPatterns: ["queue-based-load-leveling", "fanout", "idempotent-consumer"],
    references: [
      reference("hohpe-eip", "conceptual"),
      reference("aws-lambda-sqs-scaling", "implementation"),
      reference("azure-competing-consumers", "complementary")
    ],
    featured: false,
    pt: {
      title: "Competing Consumers",
      summary:
        "Escala o consumo paralelo de uma mesma fila distribuindo mensagens entre varios workers independentes.",
      problem:
        "Um unico consumidor nao consegue drenar o backlog no tempo necessario e o throughput do sistema fica limitado por um unico worker.",
      whenToUse: [
        "Quando o trabalho pode ser processado em paralelo sem coordenacao global pesada.",
        "Quando a fila ja representa a unidade de trabalho correta.",
        "Quando voce precisa aumentar vazao sem alterar o produtor."
      ],
      whenNotToUse: [
        "Quando a ordem global da fila inteira precisa ser preservada.",
        "Quando o processamento depende de estado compartilhado sem protecao.",
        "Quando o consumidor nao e idempotente."
      ],
      tags: ["paralelismo", "throughput", "workers", "fila"],
      media: {},
      overview: [
        {
          text:
            "Competing Consumers aumenta throughput colocando varios workers competindo pela mesma fonte de mensagens, cada um processando uma parte do backlog de forma independente.",
          ids: ["hohpe-eip"]
        },
        {
          text:
            "O ganho vem de paralelismo horizontal, mas ele so funciona bem quando a unidade de trabalho e isolavel e o sistema aceita ordem local em vez de sequencia global unica.",
          ids: ["aws-lambda-sqs-scaling", "azure-competing-consumers"]
        }
      ],
      diagram: {
        title: "Varios workers drenam a mesma fila",
        type: "flowchart",
        code:
          'Queue["Amazon SQS"] --> Worker1["Worker 1"]\nQueue --> Worker2["Worker 2"]\nQueue --> Worker3["Worker 3"]\nWorker1 --> Result["Processamento"]\nWorker2 --> Result\nWorker3 --> Result',
        caption:
          "Cada mensagem vai para apenas um worker, aumentando vazao sem replicar o trabalho."
      },
      flowSteps: [
        {
          title: "A fila representa unidades independentes de trabalho",
          description: "O desenho da mensagem precisa permitir processamento isolado."
        },
        {
          title: "Varios consumers disputam mensagens",
          description: "Cada worker retira mensagens conforme sua propria capacidade."
        },
        {
          title: "A concorrencia escala throughput",
          description: "Mais workers drenam backlog com menor tempo total."
        },
        {
          title: "Observabilidade regula paralelismo",
          description: "Lag, erro e custo orientam o limite saudavel de concorrencia."
        }
      ],
      tradeoffs: [
        {
          area: "Escala",
          benefit: "Aumenta vazao sem mexer no produtor.",
          cost: "Ordenacao global e afinidade de estado ficam mais dificeis."
        },
        {
          area: "Operacao",
          benefit: "A concorrencia pode subir e descer conforme backlog.",
          cost: "Debug fica mais complexo com muitos workers em paralelo."
        },
        {
          area: "Confiabilidade",
          benefit: "Falha de um worker nao derruba todo o processamento.",
          cost: "Idempotencia e lock por recurso podem ser necessarios."
        }
      ],
      goodFit: [
        "As mensagens sao independentes entre si.",
        "O backlog precisa ser drenado mais rapidamente do que um worker unico consegue.",
        "Ha metricas de concorrencia, retries e DLQ."
      ],
      warningSigns: [
        "A mesma entidade e atualizada concorrentemente sem protecao.",
        "Existe dependencia forte de ordem global.",
        "O time esta escalando workers para mascarar payload ou logica ineficiente."
      ],
      callout: {
        title: "Dica de desenho",
        text:
          "Antes de subir concorrencia, valide se a unidade de trabalho cabe em processamento isolado e se a fila realmente e o ponto certo para paralelizar.",
        ids: ["hohpe-eip", "aws-lambda-sqs-scaling"]
      },
      awsScenario: "Fila de processamento de arquivos precisa reduzir backlog em horarios de pico.",
      awsImplementation: [
        "Amazon SQS concentra as unidades de trabalho em uma fila unica.",
        "AWS Lambda ou tarefas em Amazon ECS escalam horizontalmente conforme o volume e a configuracao de concorrencia maxima.",
        "CloudWatch acompanha idade da mensagem, taxa de erro e throughput por worker.",
        "DLQ e idempotencia protegem o sistema contra reentregas e falhas parciais."
      ],
      commonMistakes: [
        "Assumir ordem global quando a fila e standard.",
        "Escalar concorrencia sem revisar limites do banco ou API downstream.",
        "Ignorar deduplicacao e processamento idempotente."
      ],
      comparisons: [
        {
          title: "Competing Consumers vs Fanout",
          difference: "Competing Consumers divide o mesmo backlog entre workers; Fanout replica o evento para varios destinos."
        },
        {
          title: "Competing Consumers vs Queue-Based Load Leveling",
          difference: "Load Leveling cria o buffer; Competing Consumers define como esse buffer e drenado em paralelo."
        }
      ]
    },
    en: {
      title: "Competing Consumers",
      summary:
        "Scales parallel consumption of the same queue by distributing messages across multiple independent workers.",
      problem:
        "A single consumer cannot drain the backlog fast enough and the system throughput becomes limited by one worker.",
      whenToUse: [
        "When work can be processed in parallel without heavy global coordination.",
        "When the queue already represents the right unit of work.",
        "When you need more throughput without changing the producer."
      ],
      whenNotToUse: [
        "When global ordering across the full queue must be preserved.",
        "When processing depends on shared mutable state without protection.",
        "When consumers are not idempotent."
      ],
      tags: ["parallelism", "throughput", "workers", "queue"],
      media: {},
      overview: [
        {
          text:
            "Competing Consumers increase throughput by placing multiple workers against the same message source, each processing a share of the backlog independently.",
          ids: ["hohpe-eip"]
        },
        {
          text:
            "The gain comes from horizontal parallelism, but it only works well when the work unit can be isolated and the system accepts local ordering rather than one global sequence.",
          ids: ["aws-lambda-sqs-scaling", "azure-competing-consumers"]
        }
      ],
      diagram: {
        title: "Multiple workers drain the same queue",
        type: "flowchart",
        code:
          'Queue["Amazon SQS"] --> Worker1["Worker 1"]\nQueue --> Worker2["Worker 2"]\nQueue --> Worker3["Worker 3"]\nWorker1 --> Result["Processing"]\nWorker2 --> Result\nWorker3 --> Result',
        caption:
          "Each message goes to only one worker, increasing throughput without duplicating work."
      },
      flowSteps: [
        {
          title: "The queue represents isolated work units",
          description: "The message shape must support independent execution."
        },
        {
          title: "Several consumers compete for messages",
          description: "Each worker pulls messages according to its own capacity."
        },
        {
          title: "Concurrency increases throughput",
          description: "More workers drain backlog faster."
        },
        {
          title: "Observability governs parallelism",
          description: "Lag, error rate, and cost determine the healthy concurrency range."
        }
      ],
      tradeoffs: [
        {
          area: "Scale",
          benefit: "Increases throughput without touching producers.",
          cost: "Global ordering and state affinity become harder."
        },
        {
          area: "Operations",
          benefit: "Concurrency can scale up and down with backlog.",
          cost: "Debugging becomes more complex with many workers in flight."
        },
        {
          area: "Reliability",
          benefit: "A single worker failure does not stop all processing.",
          cost: "Idempotency and resource-level locking may be required."
        }
      ],
      goodFit: [
        "Messages are independent from one another.",
        "Backlog must drain faster than one worker can manage alone.",
        "Concurrency, retry, and DLQ metrics exist."
      ],
      warningSigns: [
        "The same entity is updated concurrently with no protection.",
        "Global ordering is still assumed.",
        "The team is scaling workers to hide poor payload design or inefficient processing."
      ],
      callout: {
        title: "Design tip",
        text:
          "Before increasing concurrency, verify that the unit of work fits isolated processing and that the queue is really the correct parallelization point.",
        ids: ["hohpe-eip", "aws-lambda-sqs-scaling"]
      },
      awsScenario: "A file-processing queue needs to reduce backlog during peak periods.",
      awsImplementation: [
        "Amazon SQS holds the work items in a shared queue.",
        "AWS Lambda or Amazon ECS tasks scale horizontally based on volume and configured maximum concurrency.",
        "CloudWatch tracks age of oldest message, error rate, and throughput per worker.",
        "DLQs and idempotency protect the system from retries and partial failures."
      ],
      commonMistakes: [
        "Assuming global ordering on a standard queue.",
        "Scaling concurrency without reviewing downstream database or API limits.",
        "Ignoring deduplication and idempotent processing."
      ],
      comparisons: [
        {
          title: "Competing Consumers vs Fanout",
          difference: "Competing Consumers divide one backlog among workers; Fanout replicates an event to multiple destinations."
        },
        {
          title: "Competing Consumers vs Queue-Based Load Leveling",
          difference: "Load Leveling creates the buffer; Competing Consumers define how that buffer is drained in parallel."
        }
      ]
    }
  },
  {
    slug: "idempotent-consumer",
    category: "event-driven",
    problemFocus: "duplicate-handling",
    complexity: "intermediate",
    flowType: "asynchronous",
    awsServices: ["Amazon SQS", "AWS Lambda", "Amazon DynamoDB", "Amazon EventBridge"],
    relatedPatterns: ["transactional-outbox", "competing-consumers", "retry-with-exponential-backoff"],
    references: [
      reference("microservices-idempotent-consumer", "conceptual"),
      reference("aws-powertools-idempotency", "implementation"),
      reference("aws-builders-idempotent-apis", "complementary")
    ],
    featured: false,
    pt: {
      title: "Idempotent Consumer",
      summary:
        "Processa mensagens repetidas sem produzir efeito duplicado, protegendo fluxos com entrega pelo menos uma vez.",
      problem:
        "Retries, redelivery e relay podem fazer a mesma mensagem chegar mais de uma vez, criando efeitos colaterais duplicados no consumidor.",
      whenToUse: [
        "Quando o sistema usa filas, eventos ou relays com entrega pelo menos uma vez.",
        "Quando o efeito do consumidor altera saldo, estoque, status ou qualquer operacao sensivel.",
        "Quando retries sao parte normal da resiliencia do fluxo."
      ],
      whenNotToUse: [
        "Quando o processamento e puramente derivado e sem efeitos colaterais persistentes.",
        "Quando nao existe identificador confiavel para deduplicacao.",
        "Quando o dominio exige semantica diferente de ignorar repeticoes."
      ],
      tags: ["idempotencia", "duplicidade", "consumo", "retries"],
      media: {},
      overview: [
        {
          text:
            "Idempotent Consumer parte do principio de que, em sistemas distribuidos reais, a pergunta certa nao e 'a mensagem sera entregue uma vez?' e sim 'o que acontece quando ela chegar de novo?'.",
          ids: ["microservices-idempotent-consumer"]
        },
        {
          text:
            "O consumidor precisa reconhecer repeticoes pelo identificador da operacao ou do evento e garantir que o efeito observavel permaneça o mesmo, mesmo sob retries e redelivery.",
          ids: ["aws-powertools-idempotency", "aws-builders-idempotent-apis"]
        }
      ],
      diagram: {
        title: "Deduplicacao antes do efeito colateral",
        type: "flowchart",
        code:
          'Queue["Queue / Event bus"] --> Consumer["Consumer"]\nConsumer --> Check{"Message id already seen?"}\nCheck -->|Yes| Ack["Acknowledge without side effect"]\nCheck -->|No| Effect["Apply business effect"]\nEffect --> Store["Persist idempotency record"]\nStore --> Ack',
        caption:
          "A checagem de idempotencia precisa ficar antes do efeito externo, e nao depois."
      },
      flowSteps: [
        {
          title: "A mensagem chega com um identificador estavel",
          description: "EventId, commandId ou chave de negocio servem de base para deduplicar."
        },
        {
          title: "O consumidor consulta o registro idempotente",
          description: "Se a operacao ja foi concluida, o processamento nao e repetido."
        },
        {
          title: "So mensagens novas aplicam efeito",
          description: "Persistencia, side effect externo ou mudanca de estado acontecem uma unica vez."
        },
        {
          title: "O resultado e registrado para proximas tentativas",
          description: "Retries futuros devolvem o mesmo comportamento sem duplicar impacto."
        }
      ],
      tradeoffs: [
        {
          area: "Confiabilidade",
          benefit: "Entrega pelo menos uma vez deixa de ser problema de negocio.",
          cost: "E preciso manter chave e armazenamento de deduplicacao."
        },
        {
          area: "Operacao",
          benefit: "Retries e replay ficam mais seguros.",
          cost: "Janela de retencao e expiracao do registro precisam ser definidas."
        },
        {
          area: "Modelagem",
          benefit: "O contrato do evento fica mais explicito.",
          cost: "Nem toda operacao se encaixa facilmente em semantica idempotente."
        }
      ],
      goodFit: [
        "O transporte trabalha com at-least-once delivery.",
        "O efeito do consumidor nao pode ser duplicado.",
        "Ha chave estavel para identificar a operacao."
      ],
      warningSigns: [
        "A deduplicacao depende de timestamp ou heuristica fraca.",
        "O side effect externo acontece antes da verificacao idempotente.",
        "A janela de retencao da chave nao cobre o risco real de redelivery."
      ],
      callout: {
        title: "Ponto de atencao",
        text:
          "Idempotencia e uma garantia observavel do comportamento, nao apenas um detalhe de implementacao escondido no framework.",
        ids: ["microservices-idempotent-consumer", "aws-builders-idempotent-apis"]
      },
      awsScenario: "Consumidor de OrderPlaced atualiza faturamento e nao pode gerar cobranca dupla em caso de redelivery.",
      awsImplementation: [
        "Cada evento chega com eventId ou idempotency key consistente.",
        "AWS Lambda usa Amazon DynamoDB ou Powertools para AWS Lambda para guardar o estado da chave idempotente.",
        "Somente mensagens novas executam o efeito de negocio; repeticoes retornam o resultado esperado ou sao descartadas com seguranca.",
        "A janela de expiracao da chave deve refletir retry, replay e retencao do transporte."
      ],
      commonMistakes: [
        "Deduplicar por payload bruto sem chave estavel do dominio.",
        "Persistir o registro idempotente depois de aplicar o efeito.",
        "Assumir que FIFO elimina toda necessidade de idempotencia."
      ],
      comparisons: [
        {
          title: "Idempotent Consumer vs Competing Consumers",
          difference: "Competing Consumers aumenta paralelismo; Idempotent Consumer garante que redelivery nao duplica efeito."
        },
        {
          title: "Idempotent Consumer vs Transactional Outbox",
          difference: "Outbox protege a publicacao na origem; Idempotent Consumer protege o processamento no destino."
        }
      ]
    },
    en: {
      title: "Idempotent Consumer",
      summary:
        "Processes repeated messages without producing duplicated effects, protecting at-least-once delivery flows.",
      problem:
        "Retries, redelivery, and relays can deliver the same message more than once, causing duplicate side effects in the consumer.",
      whenToUse: [
        "When the system uses queues, events, or relays with at-least-once delivery.",
        "When the consumer changes balance, inventory, status, or any other sensitive state.",
        "When retries are a normal part of resilience."
      ],
      whenNotToUse: [
        "When processing is purely derived and has no persistent side effects.",
        "When there is no trustworthy identifier for deduplication.",
        "When the domain needs behavior other than ignoring repeats."
      ],
      tags: ["idempotency", "duplicates", "consumption", "retries"],
      media: {},
      overview: [
        {
          text:
            "Idempotent Consumer starts from the idea that, in real distributed systems, the useful question is not 'will the message be delivered once?' but 'what happens when it shows up again?'.",
          ids: ["microservices-idempotent-consumer"]
        },
        {
          text:
            "The consumer must recognize repeats through an operation or event identifier and guarantee the same observable outcome even under retries and redelivery.",
          ids: ["aws-powertools-idempotency", "aws-builders-idempotent-apis"]
        }
      ],
      diagram: {
        title: "Deduplicate before creating side effects",
        type: "flowchart",
        code:
          'Queue["Queue / Event bus"] --> Consumer["Consumer"]\nConsumer --> Check{"Message id already seen?"}\nCheck -->|Yes| Ack["Acknowledge without side effect"]\nCheck -->|No| Effect["Apply business effect"]\nEffect --> Store["Persist idempotency record"]\nStore --> Ack',
        caption:
          "The idempotency check must happen before the external side effect, not after."
      },
      flowSteps: [
        {
          title: "The message arrives with a stable identifier",
          description: "An eventId, commandId, or business key forms the deduplication basis."
        },
        {
          title: "The consumer checks its idempotency record",
          description: "If the operation already completed, processing does not run again."
        },
        {
          title: "Only new messages apply the effect",
          description: "Persistence, external side effects, or state transitions occur once."
        },
        {
          title: "The result is stored for future attempts",
          description: "Later retries return the same behavior without duplicating impact."
        }
      ],
      tradeoffs: [
        {
          area: "Reliability",
          benefit: "At-least-once delivery stops being a business risk.",
          cost: "You need a stable key and deduplication storage."
        },
        {
          area: "Operations",
          benefit: "Retries and replay become much safer.",
          cost: "Retention window and expiration must be defined."
        },
        {
          area: "Modeling",
          benefit: "The contract becomes more explicit.",
          cost: "Not every operation maps naturally to idempotent behavior."
        }
      ],
      goodFit: [
        "The transport uses at-least-once delivery.",
        "The consumer effect must never be duplicated.",
        "A stable key exists to identify the operation."
      ],
      warningSigns: [
        "Deduplication depends on timestamps or weak heuristics.",
        "The external side effect happens before the idempotency check.",
        "The retention window does not cover the real redelivery risk."
      ],
      callout: {
        title: "Key reminder",
        text:
          "Idempotency is an observable behavior guarantee, not merely an implementation detail hidden inside a framework.",
        ids: ["microservices-idempotent-consumer", "aws-builders-idempotent-apis"]
      },
      awsScenario: "An OrderPlaced consumer updates billing and must not produce double charges under redelivery.",
      awsImplementation: [
        "Each event arrives with a consistent eventId or idempotency key.",
        "AWS Lambda uses Amazon DynamoDB or Powertools for AWS Lambda to store idempotency state.",
        "Only new messages execute the business effect; repeated deliveries return the same outcome or are safely ignored.",
        "The key expiration window should reflect transport retry, replay, and retention behavior."
      ],
      commonMistakes: [
        "Deduplicating on raw payload without a stable domain key.",
        "Persisting the idempotency record after the side effect.",
        "Assuming FIFO removes every need for idempotency."
      ],
      comparisons: [
        {
          title: "Idempotent Consumer vs Competing Consumers",
          difference: "Competing Consumers increase parallelism; Idempotent Consumer guarantees redelivery does not duplicate business effects."
        },
        {
          title: "Idempotent Consumer vs Transactional Outbox",
          difference: "Outbox protects publication at the source; Idempotent Consumer protects processing at the destination."
        }
      ]
    }
  },
  {
    slug: "pipes-and-filters",
    category: "event-driven",
    problemFocus: "pipeline-composition",
    complexity: "intermediate",
    flowType: "asynchronous",
    awsServices: ["Amazon EventBridge Pipes", "AWS Lambda", "Amazon SQS", "Amazon EventBridge"],
    relatedPatterns: ["fanout", "competing-consumers", "api-composition"],
    references: [
      reference("hohpe-eip", "conceptual"),
      reference("aws-eventbridge-pipes", "implementation"),
      reference("aws-eventbridge-pipes-concepts", "complementary")
    ],
    featured: false,
    pt: {
      title: "Pipes and Filters",
      summary:
        "Encadeia etapas independentes de transformacao e roteamento, mantendo cada filtro pequeno, reutilizavel e facilmente substituivel.",
      problem:
        "O processamento de uma mensagem ou arquivo esta virando um bloco unico, dificil de evoluir, testar e observar por etapa.",
      whenToUse: [
        "Quando o fluxo pode ser dividido em passos independentes e composiveis.",
        "Quando cada transformacao precisa evoluir, escalar ou ser substituida separadamente.",
        "Quando o time quer clareza operacional sobre onde a mensagem esta no pipeline."
      ],
      whenNotToUse: [
        "Quando os passos dependem de estado compartilhado e acoplado.",
        "Quando a latencia fim a fim precisa ser minima e cada hop extra pesa demais.",
        "Quando um unico passo simples resolveria o fluxo inteiro."
      ],
      tags: ["pipeline", "transformacao", "filtros", "composicao"],
      media: {},
      overview: [
        {
          text:
            "Pipes and Filters e valioso quando o processamento pode ser decomposto em etapas pequenas, cada uma focada em uma unica responsabilidade de validacao, enrich, roteamento ou formatacao.",
          ids: ["hohpe-eip"]
        },
        {
          text:
            "Ao separar essas etapas, voce ganha substituibilidade, observabilidade por filtro e a opcao de reordenar o pipeline conforme o dominio amadurece.",
          ids: ["aws-eventbridge-pipes", "aws-eventbridge-pipes-concepts"]
        }
      ],
      diagram: {
        title: "Pipeline composto por filtros independentes",
        type: "flowchart",
        code:
          'Input["Input queue / bus"] --> Validate["Validate filter"]\nValidate --> Enrich["Enrich filter"]\nEnrich --> Route["Route filter"]\nRoute --> TargetA["Target A"]\nRoute --> TargetB["Target B"]',
        caption:
          "Cada filtro recebe, transforma ou decide, e o pipe entre eles deixa o fluxo explicito."
      },
      flowSteps: [
        {
          title: "A entrada chega em um pipe definido",
          description: "A mensagem segue um contrato minimo para atravessar o pipeline."
        },
        {
          title: "Cada filtro aplica uma responsabilidade pequena",
          description: "Validar, enriquecer, normalizar ou rotear ficam separados."
        },
        {
          title: "O resultado passa para o proximo pipe",
          description: "Cada passo pode ser monitorado, testado e substituido individualmente."
        },
        {
          title: "O pipeline entrega em um ou mais destinos finais",
          description: "Roteamento e transformacao deixam de viver num unico bloco opaco."
        }
      ],
      tradeoffs: [
        {
          area: "Modularidade",
          benefit: "Cada etapa pode evoluir e escalar de forma independente.",
          cost: "Mais hops significam mais pontos de falha e observacao."
        },
        {
          area: "Clareza",
          benefit: "Fica evidente onde a mensagem foi transformada.",
          cost: "Excesso de filtros pode fragmentar demais o fluxo."
        },
        {
          area: "Reuso",
          benefit: "Filtros podem ser reaproveitados em pipelines diferentes.",
          cost: "Contratos entre etapas precisam ser muito bem geridos."
        }
      ],
      goodFit: [
        "O processamento tem etapas naturalmente separaveis.",
        "O time precisa trocar ou inserir passos com frequencia.",
        "A observabilidade por etapa traz valor real."
      ],
      warningSigns: [
        "Cada filtro depende fortemente do contexto interno do anterior.",
        "O pipeline virou apenas uma cascata de wrappers sem responsabilidade clara.",
        "A latencia adicional e inaceitavel para o caso de uso."
      ],
      callout: {
        title: "Heuristica util",
        text:
          "Se um filtro nao consegue explicar sua responsabilidade em uma frase, ele provavelmente esta fazendo trabalho demais.",
        ids: ["hohpe-eip", "aws-eventbridge-pipes-concepts"]
      },
      awsScenario: "Eventos de onboarding passam por validacao, enrichment e roteamento para destinos diferentes.",
      awsImplementation: [
        "Amazon EventBridge Pipes conecta origem, transformacao e destino com filtros declarativos.",
        "AWS Lambda entra apenas nas etapas que realmente exigem logica customizada.",
        "Amazon SQS pode servir como buffer entre partes mais lentas do pipeline.",
        "Cada filtro publica metricas e logs suficientes para diagnosticar gargalos e falhas."
      ],
      commonMistakes: [
        "Criar filtros pequenos demais sem ganho real de separacao.",
        "Deixar contratos entre etapas implícitos.",
        "Esconder regras de roteamento criticas em scripts pouco observaveis."
      ],
      comparisons: [
        {
          title: "Pipes and Filters vs Fanout",
          difference: "Pipes and Filters encadeia transformacoes; Fanout replica o mesmo evento para varios consumidores."
        },
        {
          title: "Pipes and Filters vs API Composition",
          difference: "Pipes and Filters processa fluxos assincronos em etapas; API Composition agrega dados sob demanda para resposta."
        }
      ]
    },
    en: {
      title: "Pipes and Filters",
      summary:
        "Chains independent transformation and routing stages so each filter stays small, reusable, and replaceable.",
      problem:
        "Message or file processing has become one large block that is hard to evolve, test, and observe per stage.",
      whenToUse: [
        "When the flow can be divided into independent, composable stages.",
        "When each transformation must evolve, scale, or be replaced separately.",
        "When the team wants clear operational visibility into where the message sits in the pipeline."
      ],
      whenNotToUse: [
        "When stages depend on tightly shared mutable state.",
        "When end-to-end latency must stay extremely low and every extra hop hurts.",
        "When one simple step would solve the whole flow cleanly."
      ],
      tags: ["pipeline", "transformation", "filters", "composition"],
      media: {},
      overview: [
        {
          text:
            "Pipes and Filters is valuable when processing can be decomposed into small stages, each focused on one responsibility such as validation, enrichment, routing, or normalization.",
          ids: ["hohpe-eip"]
        },
        {
          text:
            "By separating those stages, you gain replaceability, per-filter observability, and the ability to reorder the pipeline as the domain matures.",
          ids: ["aws-eventbridge-pipes", "aws-eventbridge-pipes-concepts"]
        }
      ],
      diagram: {
        title: "Pipeline composed of independent filters",
        type: "flowchart",
        code:
          'Input["Input queue / bus"] --> Validate["Validate filter"]\nValidate --> Enrich["Enrich filter"]\nEnrich --> Route["Route filter"]\nRoute --> TargetA["Target A"]\nRoute --> TargetB["Target B"]',
        caption:
          "Each filter receives, transforms, or decides, and the pipes between them make the flow explicit."
      },
      flowSteps: [
        {
          title: "Input reaches a defined pipe",
          description: "The message follows a minimal contract to move through the pipeline."
        },
        {
          title: "Each filter applies one small responsibility",
          description: "Validation, enrichment, normalization, and routing remain separate."
        },
        {
          title: "The result moves to the next pipe",
          description: "Each stage can be monitored, tested, and replaced individually."
        },
        {
          title: "The pipeline delivers to one or more final targets",
          description: "Routing and transformation no longer live in one opaque block."
        }
      ],
      tradeoffs: [
        {
          area: "Modularity",
          benefit: "Each stage can evolve and scale independently.",
          cost: "More hops mean more failure and observation points."
        },
        {
          area: "Clarity",
          benefit: "It is obvious where the message was transformed.",
          cost: "Too many filters can fragment the flow excessively."
        },
        {
          area: "Reuse",
          benefit: "Filters can be reused in multiple pipelines.",
          cost: "Contracts between stages require disciplined governance."
        }
      ],
      goodFit: [
        "Processing has naturally separable stages.",
        "The team often needs to insert, replace, or reorder steps.",
        "Stage-level observability creates real value."
      ],
      warningSigns: [
        "Each filter depends heavily on the previous filter's internal context.",
        "The pipeline has become just a stack of wrappers with no clear responsibility.",
        "The added latency is unacceptable for the use case."
      ],
      callout: {
        title: "Useful heuristic",
        text:
          "If a filter cannot explain its responsibility in one sentence, it is probably doing too much.",
        ids: ["hohpe-eip", "aws-eventbridge-pipes-concepts"]
      },
      awsScenario: "Onboarding events pass through validation, enrichment, and routing toward different destinations.",
      awsImplementation: [
        "Amazon EventBridge Pipes connects source, transformation, and destination with declarative filters.",
        "AWS Lambda is used only for stages that truly require custom code.",
        "Amazon SQS can buffer slower sections of the pipeline.",
        "Each filter emits enough metrics and logs to diagnose bottlenecks and failures."
      ],
      commonMistakes: [
        "Creating filters that are too small without real separation value.",
        "Leaving contracts between stages implicit.",
        "Hiding critical routing rules inside low-observability scripts."
      ],
      comparisons: [
        {
          title: "Pipes and Filters vs Fanout",
          difference: "Pipes and Filters chains transformations; Fanout replicates the same event to multiple consumers."
        },
        {
          title: "Pipes and Filters vs API Composition",
          difference: "Pipes and Filters processes asynchronous flows in stages; API Composition aggregates data on demand for a response."
        }
      ]
    }
  },
  {
    slug: "event-carried-state-transfer",
    category: "event-driven",
    problemFocus: "data-propagation",
    complexity: "advanced",
    flowType: "asynchronous",
    awsServices: ["Amazon EventBridge", "Amazon SQS", "AWS Lambda", "Amazon DynamoDB"],
    relatedPatterns: ["fanout", "cqrs", "database-per-service"],
    references: [
      reference("bellemare-event-driven-microservices", "conceptual"),
      reference("aws-eventbridge-bus", "implementation"),
      reference("kleppmann-ddia", "complementary")
    ],
    featured: false,
    pt: {
      title: "Event-Carried State Transfer",
      summary:
        "Propaga por evento o estado necessario para outros servicos consumirem sem consultas sincronas constantes ao sistema de origem.",
      problem:
        "Servicos downstream dependem de dados que pertencem a outro contexto e acabam fazendo consultas sincronas repetidas, gerando acoplamento temporal.",
      whenToUse: [
        "Quando consumidores precisam de uma copia local suficiente de dados remotos.",
        "Quando o custo de chamadas sincronas entre servicos se tornou alto demais.",
        "Quando consistencia eventual e aceitavel para a leitura local."
      ],
      whenNotToUse: [
        "Quando o dado muda rapido demais e stale data e inviavel.",
        "Quando eventos nao conseguem carregar informacao suficiente para o uso do downstream.",
        "Quando o consumo precisa sempre do estado canônico mais recente em tempo real."
      ],
      tags: ["replicacao", "estado", "eventos", "dados distribuidos"],
      media: {},
      overview: [
        {
          text:
            "Event-Carried State Transfer reduz o acoplamento temporal entre servicos ao distribuir, via evento, o subconjunto de estado que os consumidores realmente precisam para trabalhar localmente.",
          ids: ["bellemare-event-driven-microservices"]
        },
        {
          text:
            "Em vez de consultar o servico dono a cada leitura, o consumidor mantem uma representacao local atualizada assincronamente, aceitando consistencia eventual em troca de autonomia.",
          ids: ["aws-eventbridge-bus", "kleppmann-ddia"]
        }
      ],
      diagram: {
        title: "O produtor envia estado suficiente para o consumidor",
        type: "flowchart",
        code:
          'Owner["Service owner"] --> Event["State-carrying event"]\nEvent --> Bus["EventBridge bus"]\nBus --> ConsumerA["Consumer A local store"]\nBus --> ConsumerB["Consumer B local store"]\nConsumerA --> QueryA["Local reads"]\nConsumerB --> QueryB["Local reads"]',
        caption:
          "O consumidor prefere ler da propria copia local em vez de chamar o servico dono a cada operacao."
      },
      flowSteps: [
        {
          title: "O servico dono publica um evento com estado relevante",
          description: "O payload precisa carregar dados suficientes para o consumidor."
        },
        {
          title: "Consumidores recebem e materializam copia local",
          description: "Cada contexto guarda apenas o recorte necessario."
        },
        {
          title: "Leituras passam a ser locais",
          description: "Consultas sincronas ao servico de origem ficam muito menos frequentes."
        },
        {
          title: "Mudancas futuras atualizam a replica",
          description: "A consistencia agora depende da qualidade do fluxo de eventos."
        }
      ],
      tradeoffs: [
        {
          area: "Autonomia",
          benefit: "Consumidores deixam de depender de chamadas sincronas para dados frequentes.",
          cost: "Cada copia local precisa ser atualizada e reconciliada."
        },
        {
          area: "Desempenho",
          benefit: "Read path fica mais rapido e previsivel.",
          cost: "O payload do evento pode crescer e exigir governanca."
        },
        {
          area: "Consistencia",
          benefit: "O sistema tolera independencia entre servicos.",
          cost: "Staleness e reprocessamento precisam ser aceitos e monitorados."
        }
      ],
      goodFit: [
        "Consumidores leem os mesmos dados remotos com frequencia.",
        "Uma copia local parcial resolve a maioria dos casos.",
        "A equipe aceita consistencia eventual e replay."
      ],
      warningSigns: [
        "Os eventos carregam o modelo inteiro do servico dono sem curadoria.",
        "Nao ha ownership claro da replica local.",
        "Consumidores continuam chamando o produtor para quase tudo."
      ],
      callout: {
        title: "Equilibrio necessario",
        text:
          "O objetivo nao e espalhar todo o banco por eventos, e sim publicar apenas o estado que reduz dependencia sincronica de forma consciente.",
        ids: ["bellemare-event-driven-microservices", "kleppmann-ddia"]
      },
      awsScenario: "Servico de catalogo publica detalhes essenciais do produto para servicos de carrinho e recomendacao manterem leitura local.",
      awsImplementation: [
        "Amazon EventBridge distribui eventos de produto enriquecidos com os campos realmente necessarios aos consumidores.",
        "AWS Lambda materializa copias locais em Amazon DynamoDB para cada contexto consumidor.",
        "Amazon SQS pode absorver backlog e permitir reprocessamento controlado.",
        "Versionamento de schema e metadados de evento ajudam a proteger a evolucao do contrato."
      ],
      commonMistakes: [
        "Enviar payloads gigantes sem considerar ownership e evolucao.",
        "Nao versionar eventos que carregam estado.",
        "Esperar consistencia instantanea entre replicas locais."
      ],
      comparisons: [
        {
          title: "Event-Carried State Transfer vs API Composition",
          difference: "State Transfer replica dados antes da consulta; API Composition junta dados sob demanda na hora da resposta."
        },
        {
          title: "Event-Carried State Transfer vs CQRS",
          difference: "CQRS separa leitura e escrita dentro de um dominio; State Transfer propaga estado entre dominios distintos."
        }
      ]
    },
    en: {
      title: "Event-Carried State Transfer",
      summary:
        "Propagates the state consumers need through events so they can work locally without constant synchronous lookups to the source system.",
      problem:
        "Downstream services depend on data owned by another context and end up making repeated synchronous calls, creating temporal coupling.",
      whenToUse: [
        "When consumers need a sufficient local copy of remote data.",
        "When synchronous service-to-service calls have become too expensive or fragile.",
        "When eventual consistency is acceptable for local reads."
      ],
      whenNotToUse: [
        "When the data changes too quickly and staleness is unacceptable.",
        "When events cannot carry enough information for downstream use.",
        "When consumers always need the canonical latest state in real time."
      ],
      tags: ["replication", "state", "events", "distributed data"],
      media: {},
      overview: [
        {
          text:
            "Event-Carried State Transfer reduces temporal coupling between services by distributing, through events, the subset of state consumers actually need to operate locally.",
          ids: ["bellemare-event-driven-microservices"]
        },
        {
          text:
            "Instead of calling the owning service on every read, the consumer maintains a local representation that is updated asynchronously, accepting eventual consistency in exchange for autonomy.",
          ids: ["aws-eventbridge-bus", "kleppmann-ddia"]
        }
      ],
      diagram: {
        title: "The producer sends enough state for local consumption",
        type: "flowchart",
        code:
          'Owner["Service owner"] --> Event["State-carrying event"]\nEvent --> Bus["EventBridge bus"]\nBus --> ConsumerA["Consumer A local store"]\nBus --> ConsumerB["Consumer B local store"]\nConsumerA --> QueryA["Local reads"]\nConsumerB --> QueryB["Local reads"]',
        caption:
          "Consumers prefer their own local copy instead of calling the owner service for every operation."
      },
      flowSteps: [
        {
          title: "The owning service publishes a state-rich event",
          description: "The payload must carry enough information for consumer use."
        },
        {
          title: "Consumers materialize a local copy",
          description: "Each context stores only the subset it needs."
        },
        {
          title: "Reads become local",
          description: "Synchronous lookups to the source service become much less frequent."
        },
        {
          title: "Future changes refresh the local replica",
          description: "Consistency now depends on the quality of the event flow."
        }
      ],
      tradeoffs: [
        {
          area: "Autonomy",
          benefit: "Consumers stop depending on synchronous calls for frequent data.",
          cost: "Each local copy must be updated and reconciled."
        },
        {
          area: "Performance",
          benefit: "The read path becomes faster and more predictable.",
          cost: "Event payloads can grow and require governance."
        },
        {
          area: "Consistency",
          benefit: "Services gain more operational independence.",
          cost: "Staleness and replay must be accepted and observed."
        }
      ],
      goodFit: [
        "Consumers read the same remote data frequently.",
        "A partial local copy solves most use cases.",
        "The team accepts eventual consistency and replay."
      ],
      warningSigns: [
        "Events carry the producer's whole model without curation.",
        "Local replica ownership is unclear.",
        "Consumers still call the producer for almost everything."
      ],
      callout: {
        title: "Necessary balance",
        text:
          "The goal is not to broadcast the whole database through events, but to publish only the state that consciously reduces synchronous dependency.",
        ids: ["bellemare-event-driven-microservices", "kleppmann-ddia"]
      },
      awsScenario: "A catalog service publishes essential product details so cart and recommendation services can keep local read models.",
      awsImplementation: [
        "Amazon EventBridge distributes product events enriched with only the fields consumers really need.",
        "AWS Lambda materializes local copies into Amazon DynamoDB for each consuming context.",
        "Amazon SQS can absorb backlog and enable controlled replay.",
        "Schema versioning and event metadata protect contract evolution."
      ],
      commonMistakes: [
        "Sending massive payloads with no ownership or evolution plan.",
        "Failing to version state-carrying events.",
        "Expecting instant consistency between local replicas."
      ],
      comparisons: [
        {
          title: "Event-Carried State Transfer vs API Composition",
          difference: "State Transfer replicates data before the query; API Composition joins data on demand at response time."
        },
        {
          title: "Event-Carried State Transfer vs CQRS",
          difference: "CQRS separates read and write within one domain; State Transfer propagates state across separate domains."
        }
      ]
    }
  },
  {
    slug: "bulkhead",
    category: "resilience",
    problemFocus: "fault-isolation",
    complexity: "advanced",
    flowType: "hybrid",
    awsServices: ["Amazon ECS", "AWS Lambda", "Amazon SQS", "Amazon CloudWatch"],
    relatedPatterns: ["circuit-breaker", "queue-based-load-leveling", "rate-limiting"],
    references: [
      reference("nygard-release-it", "conceptual"),
      reference("aws-builders-dependency-isolation", "implementation"),
      reference("azure-bulkhead", "complementary")
    ],
    featured: false,
    pt: {
      title: "Bulkhead",
      summary:
        "Separa pools de capacidade, filas ou recursos para que a saturacao de uma carga nao derrube o restante do sistema.",
      problem:
        "Uma classe de workload ou dependencia pode consumir toda a concorrencia disponivel e contaminar usuarios e fluxos que nao tem relacao com a falha.",
      whenToUse: [
        "Quando diferentes tipos de trafego competem pelos mesmos recursos limitados.",
        "Quando uma dependencia lenta pode drenar toda a concorrencia do processo.",
        "Quando ha workloads com prioridades e SLAs diferentes."
      ],
      whenNotToUse: [
        "Quando o sistema e pequeno demais para justificar multiplos pools.",
        "Quando a equipe nao consegue medir capacidade por workload.",
        "Quando a separacao nao representa nenhuma prioridade real do negocio."
      ],
      tags: ["isolamento", "capacidade", "concorrencia", "prioridades"],
      media: {},
      overview: [
        {
          text:
            "Bulkhead parte da mesma intuicao dos compartimentos de um navio: um vazamento em uma area nao pode afundar a embarcacao inteira.",
          ids: ["nygard-release-it", "azure-bulkhead"]
        },
        {
          text:
            "Na pratica, isso significa separar filas, concorrencia, pools de conexao ou capacidade computacional para que um workload degradado nao consuma tudo.",
          ids: ["aws-builders-dependency-isolation"]
        }
      ],
      diagram: {
        title: "Capacidade segmentada por workload",
        type: "flowchart",
        code:
          'Ingress["Ingress"] --> Premium["Pool premium"]\nIngress --> Standard["Pool standard"]\nPremium --> ServiceA["Isolated capacity A"]\nStandard --> ServiceB["Isolated capacity B"]\nServiceA --> Downstream["Dependencies"]\nServiceB --> Downstream',
        caption:
          "Cada compartimento preserva parte da capacidade para sua propria classe de trabalho."
      },
      flowSteps: [
        {
          title: "Os workloads sao classificados",
          description: "Prioridade, tipo de usuario ou natureza da operacao definem o particionamento."
        },
        {
          title: "Cada grupo recebe capacidade isolada",
          description: "Filas, limites de concorrencia ou pools separados tornam o isolamento real."
        },
        {
          title: "Falhas ficam contidas no compartimento afetado",
          description: "O restante do sistema continua com capacidade preservada."
        },
        {
          title: "Observabilidade orienta rebalanceamento",
          description: "Os limites precisam evoluir conforme comportamento e SLA."
        }
      ],
      tradeoffs: [
        {
          area: "Protecao",
          benefit: "Evita que uma carga derrube todo o sistema.",
          cost: "Capacidade pode ficar ociosa em um pool enquanto outro satura."
        },
        {
          area: "Operacao",
          benefit: "SLAs por classe de workload ficam mais governaveis.",
          cost: "Dimensionamento e tuning se tornam mais complexos."
        },
        {
          area: "Produto",
          benefit: "Permite priorizar fluxos criticos.",
          cost: "As escolhas de prioridade precisam ser transparentes e justificadas."
        }
      ],
      goodFit: [
        "Existem workloads com impacto e prioridade diferentes.",
        "Uma dependencia lenta ja causou exaustao de concorrencia.",
        "O time tem telemetria por pool ou tipo de trafego."
      ],
      warningSigns: [
        "Os pools foram criados sem criterio de negocio ou operacao.",
        "Nao existe revisao periodica da divisao de capacidade.",
        "O isolamento e apenas logico, sem limites reais na infraestrutura."
      ],
      callout: {
        title: "Nao confundir",
        text:
          "Bulkhead nao elimina a necessidade de timeout ou circuit breaker; ele garante que, quando algo der errado, nem todo mundo pague o mesmo preco.",
        ids: ["aws-builders-dependency-isolation", "azure-bulkhead"]
      },
      awsScenario: "API premium e API standard compartilham o mesmo backend, mas nao podem perder capacidade ao mesmo tempo.",
      awsImplementation: [
        "Filas separadas em Amazon SQS e limites distintos de concorrencia em AWS Lambda ou Amazon ECS isolam classes de workload.",
        "Cada pool recebe alertas e dashboards proprios em CloudWatch.",
        "Dependencias mais instaveis podem ter workers dedicados para nao consumir tudo.",
        "Revisoes periodicas ajustam o tamanho de cada compartimento conforme uso real."
      ],
      commonMistakes: [
        "Criar pools demais e fragmentar capacidade sem criterio.",
        "Nao reservar capacidade para fluxos realmente criticos.",
        "Chamar bulkhead de pronto quando so existe separacao de codigo."
      ],
      comparisons: [
        {
          title: "Bulkhead vs Circuit Breaker",
          difference: "Bulkhead isola capacidade; Circuit Breaker decide quando parar de chamar uma dependencia instavel."
        },
        {
          title: "Bulkhead vs Rate Limiting",
          difference: "Bulkhead reserva capacidade por compartimento; Rate Limiting controla quanto entra por janela."
        }
      ]
    },
    en: {
      title: "Bulkhead",
      summary:
        "Separates capacity pools, queues, or resources so saturation in one workload does not take down the rest of the system.",
      problem:
        "One workload class or slow dependency can consume all available concurrency and spill its failure into users and flows that should have been isolated.",
      whenToUse: [
        "When different traffic classes compete for the same limited resources.",
        "When a slow dependency can drain all process concurrency.",
        "When workloads have different priorities and SLAs."
      ],
      whenNotToUse: [
        "When the system is too small to justify multiple pools.",
        "When the team cannot measure capacity per workload.",
        "When separation does not reflect any real business priority."
      ],
      tags: ["isolation", "capacity", "concurrency", "priorities"],
      media: {},
      overview: [
        {
          text:
            "Bulkhead starts from the same intuition as ship compartments: damage in one area should not sink the whole vessel.",
          ids: ["nygard-release-it", "azure-bulkhead"]
        },
        {
          text:
            "In practice, that means separating queues, concurrency, connection pools, or compute capacity so one degraded workload cannot consume everything.",
          ids: ["aws-builders-dependency-isolation"]
        }
      ],
      diagram: {
        title: "Capacity segmented by workload class",
        type: "flowchart",
        code:
          'Ingress["Ingress"] --> Premium["Premium pool"]\nIngress --> Standard["Standard pool"]\nPremium --> ServiceA["Isolated capacity A"]\nStandard --> ServiceB["Isolated capacity B"]\nServiceA --> Downstream["Dependencies"]\nServiceB --> Downstream',
        caption:
          "Each compartment preserves part of the system for its own class of work."
      },
      flowSteps: [
        {
          title: "Workloads are classified",
          description: "Priority, user tier, or operation type define the partitioning."
        },
        {
          title: "Each group gets isolated capacity",
          description: "Separate queues, concurrency ceilings, or pools make isolation real."
        },
        {
          title: "Failures stay inside the affected compartment",
          description: "The rest of the system keeps protected capacity."
        },
        {
          title: "Observability drives rebalancing",
          description: "Limits must evolve with usage and SLA expectations."
        }
      ],
      tradeoffs: [
        {
          area: "Protection",
          benefit: "Prevents one workload from taking down the entire system.",
          cost: "Capacity can sit idle in one pool while another saturates."
        },
        {
          area: "Operations",
          benefit: "Per-workload SLAs are easier to govern.",
          cost: "Sizing and tuning become more complex."
        },
        {
          area: "Product",
          benefit: "Lets you protect critical traffic explicitly.",
          cost: "Priority choices must be visible and justified."
        }
      ],
      goodFit: [
        "There are workloads with clearly different impact and priority.",
        "A slow dependency has already caused concurrency exhaustion.",
        "The team has telemetry per pool or traffic class."
      ],
      warningSigns: [
        "Pools were created without business or operational rationale.",
        "There is no periodic review of how capacity is split.",
        "Isolation is only logical, with no real infrastructure limits."
      ],
      callout: {
        title: "Do not confuse the layers",
        text:
          "Bulkhead does not remove the need for timeouts or circuit breakers; it makes sure that when something goes wrong, not everyone pays the same price.",
        ids: ["aws-builders-dependency-isolation", "azure-bulkhead"]
      },
      awsScenario: "Premium and standard APIs share the same backend but must not lose capacity at the same time.",
      awsImplementation: [
        "Separate Amazon SQS queues and distinct concurrency limits in AWS Lambda or Amazon ECS isolate workload classes.",
        "Each pool receives its own CloudWatch alarms and dashboards.",
        "More unstable dependencies can use dedicated workers so they do not consume the whole fleet.",
        "Periodic reviews adjust each compartment size based on real usage."
      ],
      commonMistakes: [
        "Creating too many pools and fragmenting capacity with no rationale.",
        "Failing to reserve capacity for truly critical flows.",
        "Calling it bulkhead when only the code is separated."
      ],
      comparisons: [
        {
          title: "Bulkhead vs Circuit Breaker",
          difference: "Bulkhead isolates capacity; Circuit Breaker decides when to stop calling an unhealthy dependency."
        },
        {
          title: "Bulkhead vs Rate Limiting",
          difference: "Bulkhead reserves capacity by compartment; Rate Limiting controls how much traffic enters within a window."
        }
      ]
    }
  },
  {
    slug: "retry-with-exponential-backoff",
    category: "resilience",
    problemFocus: "fault-isolation",
    complexity: "intermediate",
    flowType: "synchronous",
    awsServices: ["AWS Step Functions", "AWS Lambda", "Amazon API Gateway", "Amazon SQS"],
    relatedPatterns: ["timeout", "circuit-breaker", "idempotent-consumer"],
    references: [
      reference("aws-builders-timeouts-retries", "conceptual"),
      reference("aws-pg-retry-backoff", "implementation"),
      reference("aws-stepfunctions-error-handling", "complementary")
    ],
    featured: false,
    pt: {
      title: "Retry with Exponential Backoff",
      summary:
        "Repete falhas transitórias com intervalos crescentes e limites claros, reduzindo pressão sobre dependencias instaveis.",
      problem:
        "Erros temporarios ou picos curtos podem ser resolvidos com nova tentativa, mas retries agressivos em sequencia so agravam a sobrecarga.",
      whenToUse: [
        "Quando a falha e claramente transitória e a operacao pode ser repetida.",
        "Quando a chamada e idempotente ou protegida contra duplicidade.",
        "Quando existe limite de tentativas e budget de latencia para o usuario."
      ],
      whenNotToUse: [
        "Quando o erro e permanente ou de negocio, nao tecnico.",
        "Quando a operacao nao e idempotente.",
        "Quando retries em varias camadas multiplicam pressao demais no downstream."
      ],
      tags: ["retry", "backoff", "jitter", "falhas transitorias"],
      media: {},
      overview: [
        {
          text:
            "Retry with Exponential Backoff parte da observacao de que algumas falhas sao momentaneas, mas tentar de novo imediatamente e de forma sincronizada costuma piorar ainda mais a situacao.",
          ids: ["aws-builders-timeouts-retries"]
        },
        {
          text:
            "Ao aumentar o intervalo entre tentativas e limitar seu numero, o cliente reduz a pressao sobre o downstream enquanto ainda captura recuperacoes rapidas e legitimas.",
          ids: ["aws-pg-retry-backoff", "aws-stepfunctions-error-handling"]
        }
      ],
      diagram: {
        title: "Tentativas com espera crescente",
        type: "sequenceDiagram",
        code:
          "participant Client\nparticipant Service\nClient->>Service: Request\nService-->>Client: Transient failure\nClient->>Client: Wait 1s\nClient->>Service: Retry #1\nService-->>Client: Transient failure\nClient->>Client: Wait 2s + jitter\nClient->>Service: Retry #2\nService-->>Client: Success",
        caption:
          "Backoff controla ritmo; jitter evita que todos tentem de novo no mesmo instante."
      },
      flowSteps: [
        {
          title: "A chamada falha por motivo transitório",
          description: "Timeout breve, throttling ou indisponibilidade momentanea sao candidatos tipicos."
        },
        {
          title: "O cliente espera antes de tentar de novo",
          description: "O intervalo cresce a cada tentativa para aliviar o downstream."
        },
        {
          title: "Jitter espalha as tentativas no tempo",
          description: "Evita a famosa rebatida coletiva no mesmo segundo."
        },
        {
          title: "O fluxo para em um limite claro",
          description: "Toda politica de retry precisa de max attempts e budget de latencia."
        }
      ],
      tradeoffs: [
        {
          area: "Disponibilidade percebida",
          benefit: "Falhas breves podem ser mascaradas com sucesso legitimo.",
          cost: "Latencia aumenta enquanto o cliente tenta novamente."
        },
        {
          area: "Protecao",
          benefit: "Backoff reduz carga sobre dependencia instavel.",
          cost: "Sem limites, retries continuam sendo pressao extra."
        },
        {
          area: "Corretude",
          benefit: "Pode melhorar resiliencia sem mudar a semantica de negocio.",
          cost: "Depende de idempotencia e classificacao correta de erro."
        }
      ],
      goodFit: [
        "A operacao falha de modo transitório e previsivel.",
        "Existe idempotencia ou controle seguro de repeticao.",
        "A politica de retry esta centralizada e observavel."
      ],
      warningSigns: [
        "Retries estao configurados em varias camadas da pilha sem coordenacao.",
        "O sistema tenta novamente para erros permanentes de negocio.",
        "Nao existe jitter nem limite maximo de tentativas."
      ],
      callout: {
        title: "Regra de ouro",
        text:
          "Retry nao e remedio universal: ele so funciona quando combinado com classificacao de erro, idempotencia e um limite de paciencia bem definido.",
        ids: ["aws-builders-timeouts-retries", "aws-pg-retry-backoff"]
      },
      awsScenario: "Um workflow chama API externa sujeita a throttling intermitente e pequenas indisponibilidades.",
      awsImplementation: [
        "AWS Step Functions define Retry com intervalSeconds, backoffRate e maxAttempts por etapa.",
        "AWS Lambda e clientes HTTP usam timeout curto e politica de retry centralizada.",
        "Amazon SQS pode servir como buffer quando o retry precisa sair do caminho sincronico.",
        "Metrica de tentativas, taxa final de sucesso e latencia total ajudam a calibrar a politica."
      ],
      commonMistakes: [
        "Repetir sem jitter e causar thundering herd.",
        "Fazer retry de operacoes nao idempotentes.",
        "Configurar maxAttempts alto sem budget de latencia."
      ],
      comparisons: [
        {
          title: "Retry with Exponential Backoff vs Circuit Breaker",
          difference: "Backoff decide como repetir; Circuit Breaker decide quando parar de tentar completamente por um tempo."
        },
        {
          title: "Retry with Exponential Backoff vs Timeout",
          difference: "Timeout define quando desistir de uma tentativa; Backoff define quanto esperar antes da proxima."
        }
      ]
    },
    en: {
      title: "Retry with Exponential Backoff",
      summary:
        "Repeats transient failures with increasing wait intervals and clear limits, reducing pressure on unstable dependencies.",
      problem:
        "Short-lived failures might succeed on retry, but aggressive immediate retries often amplify overload instead of helping recovery.",
      whenToUse: [
        "When the failure is clearly transient and the operation can be repeated safely.",
        "When the call is idempotent or protected against duplicate effects.",
        "When there is a bounded attempt budget and latency budget for the caller."
      ],
      whenNotToUse: [
        "When the error is permanent or business-related rather than technical.",
        "When the operation is not idempotent.",
        "When retries at multiple layers multiply pressure on the downstream dependency."
      ],
      tags: ["retry", "backoff", "jitter", "transient failures"],
      media: {},
      overview: [
        {
          text:
            "Retry with Exponential Backoff starts from the observation that some failures are temporary, but retrying again immediately and in lockstep usually makes things worse.",
          ids: ["aws-builders-timeouts-retries"]
        },
        {
          text:
            "By increasing the delay between attempts and limiting total retries, the client reduces pressure on the dependency while still capturing legitimate quick recoveries.",
          ids: ["aws-pg-retry-backoff", "aws-stepfunctions-error-handling"]
        }
      ],
      diagram: {
        title: "Retries with increasing delay",
        type: "sequenceDiagram",
        code:
          "participant Client\nparticipant Service\nClient->>Service: Request\nService-->>Client: Transient failure\nClient->>Client: Wait 1s\nClient->>Service: Retry #1\nService-->>Client: Transient failure\nClient->>Client: Wait 2s + jitter\nClient->>Service: Retry #2\nService-->>Client: Success",
        caption:
          "Backoff controls pace; jitter prevents everybody from retrying at the same instant."
      },
      flowSteps: [
        {
          title: "The call fails for a transient reason",
          description: "Short timeouts, throttling, or temporary unavailability are typical candidates."
        },
        {
          title: "The client waits before trying again",
          description: "The interval grows with each attempt to relieve the downstream system."
        },
        {
          title: "Jitter spreads retries over time",
          description: "That avoids the classic synchronized retry wave."
        },
        {
          title: "The flow stops at a clear limit",
          description: "Every retry policy needs max attempts and a caller-visible latency budget."
        }
      ],
      tradeoffs: [
        {
          area: "Perceived availability",
          benefit: "Short failures can turn into legitimate success.",
          cost: "Latency grows while the caller keeps retrying."
        },
        {
          area: "Protection",
          benefit: "Backoff reduces load on unstable dependencies.",
          cost: "Without limits, retries are still extra pressure."
        },
        {
          area: "Correctness",
          benefit: "Can improve resilience without changing business semantics.",
          cost: "Depends on idempotency and correct error classification."
        }
      ],
      goodFit: [
        "The operation fails in a transient and predictable way.",
        "There is idempotency or another safe repeat mechanism.",
        "Retry policy is centralized and observable."
      ],
      warningSigns: [
        "Retries are configured independently at several layers of the stack.",
        "The system retries permanent business errors.",
        "There is no jitter and no maximum attempt limit."
      ],
      callout: {
        title: "Golden rule",
        text:
          "Retry is not a universal cure: it only works when combined with error classification, idempotency, and a clearly bounded patience budget.",
        ids: ["aws-builders-timeouts-retries", "aws-pg-retry-backoff"]
      },
      awsScenario: "A workflow calls an external API that is subject to intermittent throttling and short outages.",
      awsImplementation: [
        "AWS Step Functions defines Retry with intervalSeconds, backoffRate, and maxAttempts per task.",
        "AWS Lambda and HTTP clients use short timeouts plus a centralized retry policy.",
        "Amazon SQS can buffer work when retries should move out of the synchronous path.",
        "Attempt count, final success rate, and end-to-end latency help tune the policy."
      ],
      commonMistakes: [
        "Retrying without jitter and causing a thundering herd.",
        "Retrying non-idempotent operations.",
        "Using very high maxAttempts with no latency budget."
      ],
      comparisons: [
        {
          title: "Retry with Exponential Backoff vs Circuit Breaker",
          difference: "Backoff decides how to retry; Circuit Breaker decides when to stop trying altogether for a while."
        },
        {
          title: "Retry with Exponential Backoff vs Timeout",
          difference: "Timeout decides when to give up on one attempt; Backoff decides how long to wait before the next."
        }
      ]
    }
  },
  {
    slug: "timeout",
    category: "resilience",
    problemFocus: "fault-isolation",
    complexity: "starter",
    flowType: "synchronous",
    awsServices: ["AWS Lambda", "AWS Step Functions", "Amazon API Gateway", "Amazon CloudWatch"],
    relatedPatterns: ["retry-with-exponential-backoff", "circuit-breaker", "bulkhead"],
    references: [
      reference("aws-builders-timeouts-retries", "conceptual"),
      reference("aws-stepfunctions-best-practices", "implementation"),
      reference("aws-lambda-timeout", "complementary")
    ],
    featured: false,
    pt: {
      title: "Timeout",
      summary:
        "Define um limite maximo de espera para chamadas e tarefas, evitando recursos presos e latencia sem fim.",
      problem:
        "Sem um limite claro de espera, chamadas lentas consomem conexoes, threads e concorrencia ate degradar o servico inteiro.",
      whenToUse: [
        "Quando ha chamadas remotas, I/O ou tarefas que podem travar por mais tempo do que o aceitavel.",
        "Quando o servico precisa proteger seu proprio budget de latencia.",
        "Quando downstreams tem variacao relevante de resposta."
      ],
      whenNotToUse: [
        "Quando o fluxo ainda nao sabe qual latencia maxima e aceitavel para o usuario.",
        "Quando o timeout e usado sem retry, fallback ou observabilidade adequada.",
        "Quando o valor escolhido e puramente arbitrario e nunca revisado."
      ],
      tags: ["timeout", "latencia", "protecao", "fail-fast"],
      media: {},
      overview: [
        {
          text:
            "Timeout e uma das protecoes mais basicas em sistemas distribuidos: ele define por quanto tempo vale a pena esperar antes de concluir que a tentativa falhou.",
          ids: ["aws-builders-timeouts-retries"]
        },
        {
          text:
            "Sem esse limite, o sistema fica preso em chamadas que talvez nunca retornem, consumindo capacidade que deveria estar disponivel para outras operacoes.",
          ids: ["aws-stepfunctions-best-practices", "aws-lambda-timeout"]
        }
      ],
      diagram: {
        title: "Uma tentativa nao pode esperar para sempre",
        type: "sequenceDiagram",
        code:
          "participant Caller\nparticipant Downstream\nCaller->>Downstream: Request\nNote over Caller: Start timeout budget\nDownstream--xCaller: No response in time\nCaller->>Caller: Abort call / release resources\nCaller-->>Caller: Trigger fallback or retry policy",
        caption:
          "O timeout encerra a tentativa e devolve o controle para que a aplicacao decida o proximo passo."
      },
      flowSteps: [
        {
          title: "A chamada inicia com budget de tempo definido",
          description: "O limite deve refletir a experiencia aceitavel e o historico do downstream."
        },
        {
          title: "A resposta nao chega no tempo esperado",
          description: "O chamador encerra a tentativa em vez de esperar indefinidamente."
        },
        {
          title: "Recursos locais sao liberados",
          description: "Threads, conexoes e slots de concorrencia voltam para o pool."
        },
        {
          title: "A aplicacao decide o proximo passo",
          description: "Retry, fallback, fila ou erro controlado entram de forma consciente."
        }
      ],
      tradeoffs: [
        {
          area: "Protecao",
          benefit: "Evita recursos presos em chamadas lentas.",
          cost: "Timeout curto demais aumenta falso negativo e retries desnecessarios."
        },
        {
          area: "Experiencia",
          benefit: "Mantem o budget de latencia sob controle.",
          cost: "O usuario pode receber falha mais cedo."
        },
        {
          area: "Operacao",
          benefit: "Ajuda a expor dependencias lentas com mais clareza.",
          cost: "Escolher o valor certo exige metrica e calibracao continua."
        }
      ],
      goodFit: [
        "Existem dependencias remotas ou tarefas longas no caminho critico.",
        "O time conhece a latencia maxima aceitavel para o cliente.",
        "Timeouts sao acompanhados por metricas e alarmes."
      ],
      warningSigns: [
        "Nao ha diferenca entre timeout de conexao e de resposta.",
        "O valor foi escolhido no chute e nunca reavaliado.",
        "Nao existe acao definida depois do timeout."
      ],
      callout: {
        title: "Ajuste fino",
        text:
          "Timeout bom nao nasce de palpite; ele nasce de percentis reais de latencia, custo de retry e experiencia maxima aceitavel para o usuario.",
        ids: ["aws-builders-timeouts-retries", "aws-stepfunctions-best-practices"]
      },
      awsScenario: "Servico sincronico consulta dependencia interna e precisa proteger o proprio budget de resposta.",
      awsImplementation: [
        "AWS Step Functions define TimeoutSeconds e HeartbeatSeconds para tarefas que nao podem ficar presas.",
        "AWS Lambda usa timeout coerente com o trabalho real e com a experiencia desejada no chamador.",
        "Amazon API Gateway limita o tempo de integracao, forcando desenho assincrono quando o backend demora demais.",
        "CloudWatch alerta quando timeouts ultrapassam o padrao normal."
      ],
      commonMistakes: [
        "Configurar timeout alto demais e chamar isso de resiliencia.",
        "Esquecer que retry tambem consome o mesmo budget de latencia.",
        "Nao diferenciar operacoes baratas e caras na mesma politica."
      ],
      comparisons: [
        {
          title: "Timeout vs Retry with Exponential Backoff",
          difference: "Timeout decide quando desistir da tentativa atual; Retry define como e quando tentar de novo."
        },
        {
          title: "Timeout vs Circuit Breaker",
          difference: "Timeout protege uma chamada individual; Circuit Breaker reage ao comportamento agregado de varias chamadas."
        }
      ]
    },
    en: {
      title: "Timeout",
      summary:
        "Defines a maximum wait time for calls and tasks, preventing stuck resources and unbounded latency.",
      problem:
        "Without a clear wait limit, slow calls consume connections, threads, and concurrency until the whole service starts degrading.",
      whenToUse: [
        "When remote calls, I/O, or tasks can stall longer than the system should tolerate.",
        "When the service must protect its own latency budget.",
        "When downstream response time varies materially."
      ],
      whenNotToUse: [
        "When the flow still does not know what maximum acceptable latency is for the user.",
        "When timeouts are used without retry, fallback, or observability.",
        "When the chosen value is arbitrary and never revisited."
      ],
      tags: ["timeout", "latency", "protection", "fail-fast"],
      media: {},
      overview: [
        {
          text:
            "Timeout is one of the most basic safeguards in distributed systems: it defines how long it is worth waiting before concluding that an attempt failed.",
          ids: ["aws-builders-timeouts-retries"]
        },
        {
          text:
            "Without that limit, the system gets stuck in calls that may never return, consuming capacity that should remain available to other operations.",
          ids: ["aws-stepfunctions-best-practices", "aws-lambda-timeout"]
        }
      ],
      diagram: {
        title: "One attempt cannot wait forever",
        type: "sequenceDiagram",
        code:
          "participant Caller\nparticipant Downstream\nCaller->>Downstream: Request\nNote over Caller: Start timeout budget\nDownstream--xCaller: No response in time\nCaller->>Caller: Abort call / release resources\nCaller-->>Caller: Trigger fallback or retry policy",
        caption:
          "Timeout ends the attempt and returns control so the application can choose the next step."
      },
      flowSteps: [
        {
          title: "The call starts with a defined time budget",
          description: "The limit should reflect acceptable experience and downstream history."
        },
        {
          title: "The response does not arrive on time",
          description: "The caller ends the attempt instead of waiting indefinitely."
        },
        {
          title: "Local resources are released",
          description: "Threads, connections, and concurrency slots return to the pool."
        },
        {
          title: "The application chooses the next step",
          description: "Retry, fallback, queueing, or controlled failure happen consciously."
        }
      ],
      tradeoffs: [
        {
          area: "Protection",
          benefit: "Prevents slow calls from pinning local resources.",
          cost: "A timeout that is too short increases false failures and unnecessary retries."
        },
        {
          area: "Experience",
          benefit: "Keeps the latency budget under control.",
          cost: "Users may receive failure sooner."
        },
        {
          area: "Operations",
          benefit: "Makes slow dependencies more visible.",
          cost: "Picking the right value requires metrics and continuous tuning."
        }
      ],
      goodFit: [
        "There are remote dependencies or long tasks in the critical path.",
        "The team knows the maximum acceptable latency for callers.",
        "Timeouts are tracked through metrics and alarms."
      ],
      warningSigns: [
        "There is no distinction between connection timeout and response timeout.",
        "The value was chosen by guesswork and never revisited.",
        "There is no defined action after timeout."
      ],
      callout: {
        title: "Fine tuning",
        text:
          "Good timeout values do not come from guesswork; they come from latency percentiles, retry cost, and the maximum tolerable user wait.",
        ids: ["aws-builders-timeouts-retries", "aws-stepfunctions-best-practices"]
      },
      awsScenario: "A synchronous service calls an internal dependency and must protect its own response budget.",
      awsImplementation: [
        "AWS Step Functions uses TimeoutSeconds and HeartbeatSeconds so tasks do not remain stuck.",
        "AWS Lambda sets timeouts that reflect real work and the desired caller experience.",
        "Amazon API Gateway integration limits force asynchronous design when the backend runs too long.",
        "CloudWatch alarms highlight timeout spikes beyond normal patterns."
      ],
      commonMistakes: [
        "Setting a very high timeout and calling that resilience.",
        "Forgetting that retries also consume the same latency budget.",
        "Using one identical timeout policy for cheap and expensive operations."
      ],
      comparisons: [
        {
          title: "Timeout vs Retry with Exponential Backoff",
          difference: "Timeout decides when to give up on the current attempt; Retry defines how and when to try again."
        },
        {
          title: "Timeout vs Circuit Breaker",
          difference: "Timeout protects one call; Circuit Breaker reacts to the aggregate behavior of many calls."
        }
      ]
    }
  },
  {
    slug: "rate-limiting",
    category: "resilience",
    problemFocus: "traffic-governance",
    complexity: "intermediate",
    flowType: "synchronous",
    awsServices: ["Amazon API Gateway", "AWS WAF", "Amazon CloudFront", "Amazon CloudWatch"],
    relatedPatterns: ["bulkhead", "api-gateway", "queue-based-load-leveling"],
    references: [
      reference("azure-rate-limiting", "conceptual"),
      reference("aws-api-gateway-usage-plans", "implementation"),
      reference("aws-rate-based-rules", "complementary")
    ],
    featured: false,
    pt: {
      title: "Rate Limiting",
      summary:
        "Controla quanto trafego pode entrar por cliente, rota ou janela de tempo para proteger capacidade compartilhada.",
      problem:
        "Sem governanca de entrada, bursts legitimos ou abuso consomem toda a capacidade antes que o backend consiga reagir.",
      whenToUse: [
        "Quando recursos compartilhados precisam de protecao contra burst ou abuso.",
        "Quando diferentes clientes ou planos merecem limites distintos.",
        "Quando o sistema precisa manter previsibilidade sob alta demanda."
      ],
      whenNotToUse: [
        "Quando nao ha clareza sobre o que o negocio quer proteger ou priorizar.",
        "Quando a taxa aceitavel muda demais sem telemetria para recalibrar.",
        "Quando a sobrecarga real esta no backend e a borda nao e o gargalo."
      ],
      tags: ["limites", "throttling", "trafego", "protecao de borda"],
      media: {},
      overview: [
        {
          text:
            "Rate Limiting governa a entrada de trafego antes que a sobrecarga vire problema interno, definindo quanto cada origem ou rota pode consumir em uma janela.",
          ids: ["azure-rate-limiting"]
        },
        {
          text:
            "Ele protege recursos compartilhados, melhora previsibilidade e ajuda a transformar capacidade finita em contrato explicito de uso.",
          ids: ["aws-api-gateway-usage-plans", "aws-rate-based-rules"]
        }
      ],
      diagram: {
        title: "A borda decide quanto entra em cada janela",
        type: "flowchart",
        code:
          'Clients["Clients"] --> Edge{"Within rate limit?"}\nEdge -->|Yes| Backend["Protected backend"]\nEdge -->|No| Reject["429 / Block / Queue"]',
        caption:
          "Limitar na borda costuma ser mais barato e seguro do que deixar o backend descobrir o excesso sozinho."
      },
      flowSteps: [
        {
          title: "A entrada e classificada por chave de limite",
          description: "Cliente, API key, rota ou IP podem definir a identidade do consumo."
        },
        {
          title: "A borda calcula consumo na janela",
          description: "Token bucket, fixed window ou outra politica controlam o ritmo."
        },
        {
          title: "Chamadas acima do limite sao recusadas ou desviadas",
          description: "O sistema preserva capacidade para o trafego dentro do contrato."
        },
        {
          title: "Metricas recalibram o limite",
          description: "Limites bons nascem de uso real, nao apenas de intuicao."
        }
      ],
      tradeoffs: [
        {
          area: "Protecao",
          benefit: "Evita que bursts derrubem a plataforma inteira.",
          cost: "Clientes legitimos podem receber 429 durante picos."
        },
        {
          area: "Produto",
          benefit: "Permite planos e prioridades diferentes.",
          cost: "Politicas mal explicadas geram frustracao na integracao."
        },
        {
          area: "Operacao",
          benefit: "Ajuda a tornar uso previsivel e observavel.",
          cost: "Limites precisam ser revisados conforme o trafego muda."
        }
      ],
      goodFit: [
        "A borda recebe trafego com variacao ou risco de abuso.",
        "O negocio quer contratos diferentes por cliente ou plano.",
        "A capacidade compartilhada precisa de protecao antecipada."
      ],
      warningSigns: [
        "Nao existe mensagem clara para clientes excedidos.",
        "Os limites foram copiados sem observar uso real.",
        "A equipe usa rate limiting para esconder gargalos internos permanentes."
      ],
      callout: {
        title: "Politica explicita",
        text:
          "Rate limiting funciona melhor quando o limite faz sentido para o negocio e e comunicado como parte do contrato, nao como surpresa tecnica.",
        ids: ["azure-rate-limiting", "aws-api-gateway-usage-plans"]
      },
      awsScenario: "API publica precisa proteger backends e diferenciar clientes gratuitos e enterprise.",
      awsImplementation: [
        "Amazon API Gateway aplica throttle e quotas por usage plan ou por rota.",
        "AWS WAF usa rate-based rules para conter abuso volumetrico antes de a chamada chegar ao backend.",
        "CloudWatch monitora 429, burst, latencia e saturacao por consumidor.",
        "Clientes recebem feedback claro sobre limite, reset e caminhos de upgrade."
      ],
      commonMistakes: [
        "Aplicar o mesmo limite para todos os clientes e casos de uso.",
        "Nao expor 429 e cabecalhos de limite de forma consistente.",
        "Tratar limitacao como substituto de escalabilidade basica."
      ],
      comparisons: [
        {
          title: "Rate Limiting vs Bulkhead",
          difference: "Rate Limiting controla entrada; Bulkhead separa capacidade interna."
        },
        {
          title: "Rate Limiting vs Queue-Based Load Leveling",
          difference: "Rate Limiting rejeita ou desacelera entrada; Load Leveling aceita e bufferiza para processar depois."
        }
      ]
    },
    en: {
      title: "Rate Limiting",
      summary:
        "Controls how much traffic can enter per client, route, or time window to protect shared capacity.",
      problem:
        "Without entry governance, legitimate bursts or abusive traffic consume all capacity before the backend can react.",
      whenToUse: [
        "When shared resources need protection from bursts or abuse.",
        "When different clients or plans deserve different limits.",
        "When the system needs predictable behavior under high demand."
      ],
      whenNotToUse: [
        "When there is no clarity on what the business actually wants to protect or prioritize.",
        "When acceptable rate changes too often and there is no telemetry to recalibrate.",
        "When the real bottleneck sits deep in the backend and edge limiting is not the leverage point."
      ],
      tags: ["limits", "throttling", "traffic", "edge protection"],
      media: {},
      overview: [
        {
          text:
            "Rate Limiting governs incoming traffic before overload becomes an internal problem, defining how much each caller or route can consume within a window.",
          ids: ["azure-rate-limiting"]
        },
        {
          text:
            "It protects shared resources, improves predictability, and turns finite capacity into an explicit usage contract.",
          ids: ["aws-api-gateway-usage-plans", "aws-rate-based-rules"]
        }
      ],
      diagram: {
        title: "The edge decides how much enters in each window",
        type: "flowchart",
        code:
          'Clients["Clients"] --> Edge{"Within rate limit?"}\nEdge -->|Yes| Backend["Protected backend"]\nEdge -->|No| Reject["429 / Block / Queue"]',
        caption:
          "Limiting at the edge is usually cheaper and safer than waiting for the backend to discover the overload."
      },
      flowSteps: [
        {
          title: "Traffic is classified by a limiting key",
          description: "Client, API key, route, or IP may define the consumption identity."
        },
        {
          title: "The edge calculates usage in a window",
          description: "Token bucket, fixed window, or similar policy controls the pace."
        },
        {
          title: "Excess requests are rejected or diverted",
          description: "The system preserves capacity for traffic inside the contract."
        },
        {
          title: "Metrics recalibrate the policy",
          description: "Good limits come from real usage rather than intuition alone."
        }
      ],
      tradeoffs: [
        {
          area: "Protection",
          benefit: "Prevents bursts from taking down the whole platform.",
          cost: "Legitimate clients may receive 429s during peaks."
        },
        {
          area: "Product",
          benefit: "Enables differentiated plans and priorities.",
          cost: "Poorly explained policies create integration frustration."
        },
        {
          area: "Operations",
          benefit: "Makes consumption more predictable and observable.",
          cost: "Limits must be revisited as traffic changes."
        }
      ],
      goodFit: [
        "The edge receives variable traffic or abuse risk.",
        "The business wants differentiated contracts by client or plan.",
        "Shared capacity needs protection before the backend saturates."
      ],
      warningSigns: [
        "There is no clear response for throttled clients.",
        "Limits were copied from somewhere else without observing real use.",
        "The team is using rate limiting to hide permanent internal bottlenecks."
      ],
      callout: {
        title: "Make the policy explicit",
        text:
          "Rate limiting works best when the limit makes business sense and is communicated as part of the contract instead of appearing as a technical surprise.",
        ids: ["azure-rate-limiting", "aws-api-gateway-usage-plans"]
      },
      awsScenario: "A public API must protect backends and differentiate free and enterprise customers.",
      awsImplementation: [
        "Amazon API Gateway applies throttling and quotas per usage plan or route.",
        "AWS WAF uses rate-based rules to contain volumetric abuse before traffic reaches the backend.",
        "CloudWatch monitors 429s, bursts, latency, and saturation per consumer.",
        "Clients receive clear feedback about limits, reset behavior, and upgrade paths."
      ],
      commonMistakes: [
        "Applying the same limit to every client and use case.",
        "Failing to expose 429 responses and limit headers consistently.",
        "Treating rate limiting as a substitute for baseline scalability."
      ],
      comparisons: [
        {
          title: "Rate Limiting vs Bulkhead",
          difference: "Rate Limiting controls ingress; Bulkhead separates internal capacity."
        },
        {
          title: "Rate Limiting vs Queue-Based Load Leveling",
          difference: "Rate Limiting rejects or slows intake; Load Leveling accepts and buffers work for later processing."
        }
      ]
    }
  },
  {
    slug: "api-gateway",
    category: "modernization",
    problemFocus: "api-abstraction",
    complexity: "intermediate",
    flowType: "synchronous",
    awsServices: ["Amazon API Gateway", "AWS Lambda", "Amazon CloudFront", "Amazon Cognito"],
    relatedPatterns: ["strangler-fig", "api-composition", "rate-limiting"],
    references: [
      reference("microservices-api-gateway", "conceptual"),
      reference("aws-api-gateway-welcome", "implementation"),
      reference("aws-api-gateway-usage-plans", "complementary")
    ],
    featured: true,
    pt: {
      title: "API Gateway",
      summary:
        "Concentra preocupacoes de borda como autenticacao, roteamento, versionamento e observabilidade atras de uma interface unica.",
      problem:
        "Clientes precisam lidar com muitos servicos, protocolos e regras transversais diferentes, aumentando acoplamento e atrito de consumo.",
      whenToUse: [
        "Quando varios servicos precisam ser expostos como uma experiencia de API coerente.",
        "Quando autenticacao, limite, observabilidade e roteamento precisam de um ponto comum.",
        "Quando clientes web, mobile ou parceiros externos pedem uma fachada estavel."
      ],
      whenNotToUse: [
        "Quando o gateway passa a concentrar regra de negocio pesada.",
        "Quando um unico servico simples nao precisa de camada de borda dedicada.",
        "Quando a equipe pretende esconder todos os problemas internos atras do gateway."
      ],
      tags: ["borda", "fachada", "roteamento", "governanca"],
      media: {},
      overview: [
        {
          text:
            "O padrao API Gateway cria uma fachada na borda para reduzir o acoplamento dos clientes com a topologia interna e centralizar politicas transversais.",
          ids: ["microservices-api-gateway"]
        },
        {
          text:
            "Ele simplifica autenticacao, versionamento, observabilidade e roteamento, desde que o time resista a tentacao de transformar o gateway em um novo monolito de negocio.",
          ids: ["aws-api-gateway-welcome", "aws-api-gateway-usage-plans"]
        }
      ],
      diagram: {
        title: "Uma interface de borda para varios servicos",
        type: "flowchart",
        code:
          'Clients["Web / Mobile / Partners"] --> Gateway["API Gateway"]\nGateway --> Orders["Orders service"]\nGateway --> Catalog["Catalog service"]\nGateway --> Auth["Auth service"]\nGateway --> BFF["BFF / Lambda adapter"]',
        caption:
          "O cliente conversa com uma fachada coerente enquanto o gateway aplica politicas comuns e rotea para os donos corretos."
      },
      flowSteps: [
        {
          title: "O cliente fala com uma unica porta de entrada",
          description: "A borda mascara a topologia e a distribuicao interna."
        },
        {
          title: "Politicas comuns sao aplicadas na borda",
          description: "Auth, rate limiting, observabilidade e transformacao ficam centralizados."
        },
        {
          title: "O gateway roteia para os servicos corretos",
          description: "Cada backend continua dono da sua regra e dado."
        },
        {
          title: "Clientes recebem uma API mais estavel",
          description: "Mudancas internas podem ser absorvidas sem quebrar consumidores externos."
        }
      ],
      tradeoffs: [
        {
          area: "Experiencia",
          benefit: "Reduz complexidade para clientes e parceiros.",
          cost: "O gateway vira componente critico da plataforma."
        },
        {
          area: "Governanca",
          benefit: "Centraliza politicas de borda.",
          cost: "O risco de concentrar logica demais aumenta."
        },
        {
          area: "Evolucao",
          benefit: "Protege clientes de mudancas internas frequentes.",
          cost: "Times precisam manter ownership claro entre gateway e servicos."
        }
      ],
      goodFit: [
        "Ha varios backends e clientes diferentes consumindo a plataforma.",
        "Regras transversais merecem centralizacao.",
        "O time consegue manter o gateway focado em borda."
      ],
      warningSigns: [
        "O gateway esta acumulando regra de negocio, joins e persistencia.",
        "Todas as equipes dependem de uma unica squad para qualquer mudanca simples.",
        "Nao ha observabilidade para separar falha do gateway e falha do backend."
      ],
      callout: {
        title: "Limite saudavel",
        text:
          "API Gateway deve orquestrar preocupacoes de borda; quando ele passa a decidir negocio, o acoplamento apenas muda de lugar.",
        ids: ["microservices-api-gateway", "aws-api-gateway-welcome"]
      },
      awsScenario: "Plataforma expoe APIs para web, mobile e parceiros com diferentes politicas de autenticacao e throttling.",
      awsImplementation: [
        "Amazon API Gateway publica uma fachada unica para rotas internas e externas.",
        "Autenticacao pode ser integrada com Amazon Cognito, custom authorizers ou IAM.",
        "AWS Lambda funciona bem como adaptador leve para BFFs ou transformacoes pequenas na borda.",
        "CloudFront, throttling e usage plans protegem a experiencia e o backend."
      ],
      commonMistakes: [
        "Empurrar composicao pesada e regra de negocio para o gateway.",
        "Criar uma fachada tao generica que nao atende bem nenhum cliente.",
        "Esquecer que disponibilidade da borda vira disponibilidade do produto."
      ],
      comparisons: [
        {
          title: "API Gateway vs API Composition",
          difference: "API Gateway e a fachada de borda; API Composition e uma tecnica de juntar dados para responder consultas."
        },
        {
          title: "API Gateway vs Strangler Fig",
          difference: "API Gateway e um componente; Strangler Fig e a estrategia de migracao que pode usar esse componente."
        }
      ]
    },
    en: {
      title: "API Gateway",
      summary:
        "Centralizes edge concerns such as authentication, routing, versioning, and observability behind one interface.",
      problem:
        "Clients must deal with many services, protocols, and cross-cutting rules, increasing coupling and consumption friction.",
      whenToUse: [
        "When several services need to be exposed as one coherent API experience.",
        "When authentication, limits, observability, and routing need a common control point.",
        "When web, mobile, or partner clients need a stable facade."
      ],
      whenNotToUse: [
        "When the gateway starts accumulating heavy business logic.",
        "When one simple service does not need a dedicated edge layer.",
        "When the team is trying to hide every internal problem behind the gateway."
      ],
      tags: ["edge", "facade", "routing", "governance"],
      media: {},
      overview: [
        {
          text:
            "The API Gateway pattern creates an edge facade that reduces client coupling to internal topology while centralizing cross-cutting policy.",
          ids: ["microservices-api-gateway"]
        },
        {
          text:
            "It simplifies authentication, versioning, observability, and routing, as long as the team resists turning the gateway into a new business-logic monolith.",
          ids: ["aws-api-gateway-welcome", "aws-api-gateway-usage-plans"]
        }
      ],
      diagram: {
        title: "One edge interface over multiple services",
        type: "flowchart",
        code:
          'Clients["Web / Mobile / Partners"] --> Gateway["API Gateway"]\nGateway --> Orders["Orders service"]\nGateway --> Catalog["Catalog service"]\nGateway --> Auth["Auth service"]\nGateway --> BFF["BFF / Lambda adapter"]',
        caption:
          "Clients talk to one coherent facade while the gateway applies shared policy and routes to the right owners."
      },
      flowSteps: [
        {
          title: "The client uses one entry point",
          description: "The edge hides internal topology and distribution details."
        },
        {
          title: "Shared policy runs at the edge",
          description: "Auth, rate limiting, observability, and small transformations stay centralized."
        },
        {
          title: "The gateway routes to the right backend",
          description: "Each service still owns its own logic and data."
        },
        {
          title: "Clients receive a more stable API surface",
          description: "Internal changes can be absorbed without breaking external consumers."
        }
      ],
      tradeoffs: [
        {
          area: "Experience",
          benefit: "Reduces complexity for clients and partners.",
          cost: "The gateway becomes a critical platform component."
        },
        {
          area: "Governance",
          benefit: "Centralizes edge policy.",
          cost: "The risk of concentrating too much logic increases."
        },
        {
          area: "Evolution",
          benefit: "Protects clients from frequent internal change.",
          cost: "Teams must maintain clear ownership between gateway and services."
        }
      ],
      goodFit: [
        "There are several backends and client types consuming the platform.",
        "Cross-cutting edge concerns deserve centralization.",
        "The team can keep the gateway focused on edge behavior."
      ],
      warningSigns: [
        "The gateway is accumulating business rules, joins, or persistence.",
        "Every team depends on one central squad for trivial changes.",
        "There is no observability to separate gateway failure from backend failure."
      ],
      callout: {
        title: "Healthy boundary",
        text:
          "API Gateway should orchestrate edge concerns; when it starts making business decisions, coupling has only moved to another place.",
        ids: ["microservices-api-gateway", "aws-api-gateway-welcome"]
      },
      awsScenario: "A platform exposes APIs to web, mobile, and partners with different authentication and throttling rules.",
      awsImplementation: [
        "Amazon API Gateway publishes one facade for internal and external routes.",
        "Authentication can integrate with Amazon Cognito, custom authorizers, or IAM.",
        "AWS Lambda works well as a lightweight adapter for BFFs or small edge transformations.",
        "CloudFront, throttling, and usage plans protect both the user experience and the backend."
      ],
      commonMistakes: [
        "Pushing heavy composition and business logic into the gateway.",
        "Creating a facade so generic that it serves no client well.",
        "Forgetting that edge availability becomes product availability."
      ],
      comparisons: [
        {
          title: "API Gateway vs API Composition",
          difference: "API Gateway is the edge facade; API Composition is a technique for joining data to answer queries."
        },
        {
          title: "API Gateway vs Strangler Fig",
          difference: "API Gateway is a component; Strangler Fig is the migration strategy that can use that component."
        }
      ]
    }
  },
  {
    slug: "api-composition",
    category: "data",
    problemFocus: "api-abstraction",
    complexity: "intermediate",
    flowType: "synchronous",
    awsServices: ["AWS AppSync", "AWS Lambda", "Amazon API Gateway", "Amazon DynamoDB"],
    relatedPatterns: ["api-gateway", "cqrs", "database-per-service"],
    references: [
      reference("microservices-api-composition", "conceptual"),
      reference("aws-appsync-pipeline-js", "implementation"),
      reference("microservices-patterns-book", "complementary")
    ],
    featured: false,
    pt: {
      title: "API Composition",
      summary:
        "Monta respostas consultando varios servicos em tempo de requisicao, combinando dados sem criar uma projecao persistida previa.",
      problem:
        "Uma consulta de negocio precisa juntar dados espalhados por varios servicos, mas nao existe ainda um read model pronto para isso.",
      whenToUse: [
        "Quando a necessidade principal e responder consultas agregadas rapidamente.",
        "Quando o volume e a complexidade ainda nao justificam uma projecao materializada dedicada.",
        "Quando os dados de varios servicos precisam aparecer juntos para o cliente."
      ],
      whenNotToUse: [
        "Quando a consulta e muito frequente ou pesada para ser montada sob demanda.",
        "Quando a latencia acumulada de varias chamadas ficaria alta demais.",
        "Quando ja existe um read model melhor desenhado para esse caso."
      ],
      tags: ["composicao", "queries", "agregacao", "fachada de leitura"],
      media: {},
      overview: [
        {
          text:
            "API Composition responde consultas chamando os servicos que possuem os dados e montando a resposta em tempo real no ponto de entrada.",
          ids: ["microservices-api-composition"]
        },
        {
          text:
            "Ela e util quando a demanda por agregacao existe, mas ainda nao justifica criar e operar uma projecao dedicada como em CQRS.",
          ids: ["aws-appsync-pipeline-js", "microservices-patterns-book"]
        }
      ],
      diagram: {
        title: "Resposta agregada em tempo de requisicao",
        type: "flowchart",
        code:
          'Client["Client"] --> Composer["API composer"]\nComposer --> Orders["Orders service"]\nComposer --> Catalog["Catalog service"]\nComposer --> Pricing["Pricing service"]\nOrders --> Composer\nCatalog --> Composer\nPricing --> Composer\nComposer --> Response["Aggregated response"]',
        caption:
          "O composer busca os dados necessarios e monta uma resposta unificada sem persistir uma projecao previa."
      },
      flowSteps: [
        {
          title: "A requisicao chega ao composer",
          description: "Ele sabe quais servicos precisam contribuir para a resposta."
        },
        {
          title: "Consultas paralelas coletam fragmentos de dado",
          description: "Cada servico continua dono do proprio dado."
        },
        {
          title: "O composer junta os resultados em memoria",
          description: "A resposta final ja sai no formato que o cliente precisa."
        },
        {
          title: "A latencia total reflete a soma das dependencias",
          description: "Observabilidade e timeouts tornam-se essenciais."
        }
      ],
      tradeoffs: [
        {
          area: "Simplicidade",
          benefit: "Resolve agregacao sem criar novos stores de leitura.",
          cost: "A consulta depende da saude e da latencia de varios servicos."
        },
        {
          area: "Entrega",
          benefit: "Pode ser introduzida rapidamente para atender um caso de leitura.",
          cost: "Pode ficar cara e lenta em queries frequentes ou amplas."
        },
        {
          area: "Arquitetura",
          benefit: "Mantem ownership de dados nos servicos de origem.",
          cost: "O composer vira mais um ponto de acoplamento sincronico."
        }
      ],
      goodFit: [
        "Existe demanda por agregacao, mas ainda nao por projecao materializada.",
        "O numero de dependencias por consulta continua controlado.",
        "A latencia agregada cabe no budget do cliente."
      ],
      warningSigns: [
        "A consulta depende de muitos hops e joins em memoria custosos.",
        "O composer virou uma camada cheia de regras de negocio.",
        "O caso de uso esta ficando frequente o bastante para merecer CQRS."
      ],
      callout: {
        title: "Boa heuristica",
        text:
          "Quando a mesma composicao passa a ser muito frequente ou cara, vale avaliar se ela deve virar um read model dedicado.",
        ids: ["microservices-api-composition", "microservices-patterns-book"]
      },
      awsScenario: "Tela de pedido precisa combinar status do pedido, catalogo e precificacao em uma unica resposta.",
      awsImplementation: [
        "AWS AppSync pipeline resolvers ou uma funcao em AWS Lambda podem executar a composicao de forma controlada.",
        "Cada dependencia recebe timeout, observabilidade e fallback apropriados.",
        "Amazon API Gateway pode expor a fachada enquanto a composicao ocorre por tras.",
        "Se a consulta virar critica demais, o time pode migrar depois para CQRS ou replica especializada."
      ],
      commonMistakes: [
        "Montar respostas com chamadas demais em cadeia.",
        "Esconder regras de negocio complexas dentro do composer.",
        "Persistir joins acidentais em memoria sem observar custo de latencia."
      ],
      comparisons: [
        {
          title: "API Composition vs CQRS",
          difference: "API Composition agrega dados on demand; CQRS pre-materializa visoes de leitura."
        },
        {
          title: "API Composition vs API Gateway",
          difference: "API Composition e a tecnica de juntar dados; API Gateway e a fachada de borda onde essa tecnica pode aparecer."
        }
      ]
    },
    en: {
      title: "API Composition",
      summary:
        "Builds responses by querying multiple services at request time, combining data without precomputing a dedicated read model.",
      problem:
        "A business query needs data from multiple services, but there is not yet a purpose-built read model for it.",
      whenToUse: [
        "When the main need is aggregated query responses quickly.",
        "When volume and complexity still do not justify a dedicated materialized projection.",
        "When several service-owned datasets must appear together for the client."
      ],
      whenNotToUse: [
        "When the query is too frequent or heavy to assemble on demand.",
        "When cumulative latency across calls would be too high.",
        "When a dedicated read model already exists for the use case."
      ],
      tags: ["composition", "queries", "aggregation", "read facade"],
      media: {},
      overview: [
        {
          text:
            "API Composition answers queries by calling the services that own the data and assembling the response in real time at the entry point.",
          ids: ["microservices-api-composition"]
        },
        {
          text:
            "It is useful when aggregation is needed, but not yet enough to justify creating and operating a dedicated projection as in CQRS.",
          ids: ["aws-appsync-pipeline-js", "microservices-patterns-book"]
        }
      ],
      diagram: {
        title: "Aggregated response at request time",
        type: "flowchart",
        code:
          'Client["Client"] --> Composer["API composer"]\nComposer --> Orders["Orders service"]\nComposer --> Catalog["Catalog service"]\nComposer --> Pricing["Pricing service"]\nOrders --> Composer\nCatalog --> Composer\nPricing --> Composer\nComposer --> Response["Aggregated response"]',
        caption:
          "The composer fetches the necessary fragments and returns one unified response without precomputing a read store."
      },
      flowSteps: [
        {
          title: "The request reaches the composer",
          description: "It knows which services need to contribute to the final view."
        },
        {
          title: "Parallel calls collect the needed fragments",
          description: "Each service still owns its own data."
        },
        {
          title: "The composer joins results in memory",
          description: "The client receives the shape it actually needs."
        },
        {
          title: "Total latency reflects all dependencies",
          description: "Observability and timeouts become essential."
        }
      ],
      tradeoffs: [
        {
          area: "Simplicity",
          benefit: "Solves aggregation without building new read stores.",
          cost: "The query depends on the health and latency of several services."
        },
        {
          area: "Delivery",
          benefit: "Can be introduced quickly for a new read use case.",
          cost: "Can become slow and expensive for frequent or broad queries."
        },
        {
          area: "Architecture",
          benefit: "Keeps data ownership with the source services.",
          cost: "The composer becomes another point of synchronous coupling."
        }
      ],
      goodFit: [
        "There is demand for aggregation, but not yet for a materialized view.",
        "The number of dependencies per query remains controlled.",
        "Aggregate latency still fits the client budget."
      ],
      warningSigns: [
        "The query depends on too many hops or expensive in-memory joins.",
        "The composer has turned into a layer full of business rules.",
        "The use case is frequent enough that CQRS may now be a better fit."
      ],
      callout: {
        title: "Useful heuristic",
        text:
          "When the same composition becomes too frequent or too expensive, it is usually time to evaluate a dedicated read model.",
        ids: ["microservices-api-composition", "microservices-patterns-book"]
      },
      awsScenario: "An order screen must combine order status, catalog data, and pricing in one response.",
      awsImplementation: [
        "AWS AppSync pipeline resolvers or an AWS Lambda function can perform the composition in a controlled way.",
        "Each dependency gets its own timeout, observability, and fallback treatment.",
        "Amazon API Gateway can expose the facade while composition runs behind it.",
        "If the query becomes too critical, the team can later migrate it toward CQRS or a specialized replica."
      ],
      commonMistakes: [
        "Building responses through too many sequential calls.",
        "Hiding complex business rules inside the composer.",
        "Ignoring the latency cost of repeated in-memory joins."
      ],
      comparisons: [
        {
          title: "API Composition vs CQRS",
          difference: "API Composition aggregates data on demand; CQRS pre-materializes read views."
        },
        {
          title: "API Composition vs API Gateway",
          difference: "API Composition is the technique of joining data; API Gateway is the edge facade where that technique may live."
        }
      ]
    }
  },
  {
    slug: "database-per-service",
    category: "data",
    problemFocus: "service-data-ownership",
    complexity: "advanced",
    flowType: "hybrid",
    awsServices: ["Amazon RDS", "Amazon DynamoDB", "Amazon EventBridge", "AWS DMS"],
    relatedPatterns: ["api-composition", "cqrs", "event-carried-state-transfer"],
    references: [
      reference("microservices-database-per-service", "conceptual"),
      reference("aws-database-per-service", "implementation"),
      reference("microservices-patterns-book", "complementary")
    ],
    featured: true,
    pt: {
      title: "Database per Service",
      summary:
        "Entrega ownership de dados a cada servico, evitando acoplamento por banco compartilhado e reforcando fronteiras de dominio.",
      problem:
        "Varios servicos alteram o mesmo banco ou schema e acabam se acoplando por estrutura de dado, deployment e governanca.",
      whenToUse: [
        "Quando cada servico precisa controlar seu proprio modelo e ciclo de mudanca.",
        "Quando o schema compartilhado esta travando autonomia entre times.",
        "Quando a arquitetura quer refletir fronteiras de dominio de forma mais clara."
      ],
      whenNotToUse: [
        "Quando a organizacao ainda nao consegue operar ownership separado com maturidade.",
        "Quando a principal demanda e apenas dividir codigo, sem fronteiras reais de dado.",
        "Quando queries cross-service ainda dominam o uso sem estrategia complementar."
      ],
      tags: ["ownership", "dados", "microservicos", "fronteiras"],
      media: {},
      overview: [
        {
          text:
            "Database per Service fortalece um principio fundamental de arquitetura de microservicos: cada servico deve ser dono do proprio dado, e nao apenas do proprio deploy.",
          ids: ["microservices-database-per-service"]
        },
        {
          text:
            "Ao separar persistencia por servico, o sistema reduz acoplamento estrutural, mas precisa complementar essa autonomia com padroes de leitura e integracao entre dominios.",
          ids: ["aws-database-per-service", "microservices-patterns-book"]
        }
      ],
      diagram: {
        title: "Cada servico controla o proprio store",
        type: "flowchart",
        code:
          'Orders["Orders service"] --> OrdersDB["Orders DB"]\nCatalog["Catalog service"] --> CatalogDB["Catalog DB"]\nBilling["Billing service"] --> BillingDB["Billing DB"]\nOrders --> Events["Integration events"]\nCatalog --> Events\nBilling --> Events',
        caption:
          "A autonomia aumenta quando o contrato entre servicos deixa de ser o schema compartilhado e passa a ser a API ou o evento."
      },
      flowSteps: [
        {
          title: "Cada servico modela e opera seu store",
          description: "Schema, indice e estrategia de persistencia passam a seguir o dominio dono."
        },
        {
          title: "Mudancas internas deixam de quebrar vizinhos por banco",
          description: "O contrato entre servicos sai do SQL implicito e vira API ou evento."
        },
        {
          title: "Consultas entre dominios pedem padroes complementares",
          description: "API Composition, CQRS ou replicas locais entram para resolver leitura cruzada."
        },
        {
          title: "Ownership e governanca ficam mais claros",
          description: "Cada time responde por dado, operacao e evolucao de seu contexto."
        }
      ],
      tradeoffs: [
        {
          area: "Autonomia",
          benefit: "Times evoluem schema e persistencia sem coordenacao central constante.",
          cost: "Queries cross-service ficam mais trabalhosas."
        },
        {
          area: "Governanca",
          benefit: "Ownership de dado se alinha melhor com ownership de servico.",
          cost: "Duplicacao e sincronizacao entre contextos precisam de novos padroes."
        },
        {
          area: "Modernizacao",
          benefit: "Ajuda a quebrar dependencias profundas em bancos legados compartilhados.",
          cost: "Migrar ownership de dado exige planejamento e reconciliacao cuidadosos."
        }
      ],
      goodFit: [
        "O schema compartilhado virou gargalo de autonomia.",
        "Os servicos possuem fronteiras de dominio mais claras.",
        "O time aceita usar padroes complementares para leitura cruzada."
      ],
      warningSigns: [
        "A separacao de bancos esta acontecendo sem ownership funcional claro.",
        "As equipes continuam acessando o banco do vizinho por conveniencia.",
        "Nao existe estrategia para integrar dados entre servicos."
      ],
      callout: {
        title: "Mudanca cultural",
        text:
          "Database per Service nao e apenas criar bancos novos; e parar de tratar o schema compartilhado como o principal contrato da organizacao.",
        ids: ["microservices-database-per-service", "microservices-patterns-book"]
      },
      awsScenario: "Monolito de comercio separa dominios de pedidos, catalogo e faturamento com ownership de dados por equipe.",
      awsImplementation: [
        "Cada servico escolhe o store mais adequado, como Amazon RDS ou Amazon DynamoDB, sob ownership do proprio time.",
        "Eventos publicados em Amazon EventBridge mantem outros contextos informados sobre mudancas relevantes.",
        "AWS DMS pode ajudar em etapas de migracao quando a origem ainda esta em banco compartilhado.",
        "Queries cross-service usam API Composition, CQRS ou replicas locais em vez de acesso direto ao banco alheio."
      ],
      commonMistakes: [
        "Criar bancos separados e continuar compartilhando tabelas por tras.",
        "Ignorar estrategia de leitura entre contextos.",
        "Separar ownership tecnico sem alinhar ownership de negocio."
      ],
      comparisons: [
        {
          title: "Database per Service vs Shared Database",
          difference: "Database per Service privilegia autonomia e ownership; shared database privilegia conveniencia imediata e cria acoplamento estrutural."
        },
        {
          title: "Database per Service vs CQRS",
          difference: "Database per Service define ownership por servico; CQRS define separacao de leitura e escrita."
        }
      ]
    },
    en: {
      title: "Database per Service",
      summary:
        "Gives each service ownership of its own data, avoiding shared-database coupling and reinforcing domain boundaries.",
      problem:
        "Multiple services change the same database or schema and become tightly coupled through structure, deployment, and governance.",
      whenToUse: [
        "When each service needs control over its own model and change cycle.",
        "When the shared schema is limiting team autonomy.",
        "When the architecture needs domain boundaries to become explicit."
      ],
      whenNotToUse: [
        "When the organization cannot yet operate separate ownership with enough maturity.",
        "When the main goal is only code separation without real data boundaries.",
        "When cross-service queries still dominate the workload and no complementary read strategy exists."
      ],
      tags: ["ownership", "data", "microservices", "boundaries"],
      media: {},
      overview: [
        {
          text:
            "Database per Service reinforces a fundamental microservices principle: each service should own its own data, not merely its own deployment unit.",
          ids: ["microservices-database-per-service"]
        },
        {
          text:
            "By separating persistence per service, the system reduces structural coupling, but it must complement that autonomy with integration and read patterns across domains.",
          ids: ["aws-database-per-service", "microservices-patterns-book"]
        }
      ],
      diagram: {
        title: "Each service controls its own store",
        type: "flowchart",
        code:
          'Orders["Orders service"] --> OrdersDB["Orders DB"]\nCatalog["Catalog service"] --> CatalogDB["Catalog DB"]\nBilling["Billing service"] --> BillingDB["Billing DB"]\nOrders --> Events["Integration events"]\nCatalog --> Events\nBilling --> Events',
        caption:
          "Autonomy increases when the contract between services stops being a shared schema and becomes an API or event."
      },
      flowSteps: [
        {
          title: "Each service models and operates its own store",
          description: "Schema, indexing, and persistence choices follow the owning domain."
        },
        {
          title: "Internal changes stop breaking neighbors through the database",
          description: "The service contract moves from implicit SQL to explicit APIs or events."
        },
        {
          title: "Cross-domain reads need complementary patterns",
          description: "API Composition, CQRS, or local replicas solve distributed queries."
        },
        {
          title: "Ownership and governance become clearer",
          description: "Each team is accountable for its data, operations, and evolution."
        }
      ],
      tradeoffs: [
        {
          area: "Autonomy",
          benefit: "Teams evolve schema and persistence without constant central coordination.",
          cost: "Cross-service queries become harder."
        },
        {
          area: "Governance",
          benefit: "Data ownership aligns better with service ownership.",
          cost: "Duplication and synchronization across contexts need new patterns."
        },
        {
          area: "Modernization",
          benefit: "Helps break deep dependency on shared legacy databases.",
          cost: "Migrating data ownership requires careful planning and reconciliation."
        }
      ],
      goodFit: [
        "The shared schema has become an autonomy bottleneck.",
        "Services have clearer domain boundaries.",
        "The team accepts complementary patterns for cross-service reads."
      ],
      warningSigns: [
        "Databases are being separated without clear functional ownership.",
        "Teams still read each other's databases for convenience.",
        "There is no strategy for integrating data across services."
      ],
      callout: {
        title: "Cultural shift",
        text:
          "Database per Service is not only about creating more databases; it is about stopping the shared schema from being the main organizational contract.",
        ids: ["microservices-database-per-service", "microservices-patterns-book"]
      },
      awsScenario: "A commerce monolith separates order, catalog, and billing domains with data ownership per team.",
      awsImplementation: [
        "Each service chooses the store that fits best, such as Amazon RDS or Amazon DynamoDB, under the ownership of that team.",
        "Events published through Amazon EventBridge keep other contexts informed about relevant changes.",
        "AWS DMS can help during migration stages when the source still lives in a shared database.",
        "Cross-service reads use API Composition, CQRS, or local replicas instead of direct database access."
      ],
      commonMistakes: [
        "Creating separate databases while still sharing tables behind the scenes.",
        "Ignoring a read strategy across contexts.",
        "Splitting technical ownership without aligning business ownership."
      ],
      comparisons: [
        {
          title: "Database per Service vs Shared Database",
          difference: "Database per Service prioritizes autonomy and ownership; a shared database prioritizes short-term convenience and creates structural coupling."
        },
        {
          title: "Database per Service vs CQRS",
          difference: "Database per Service defines service data ownership; CQRS defines read/write separation."
        }
      ]
    }
  }
];

async function writePattern(pattern, lang) {
  const directory = path.join(contentDir, lang);
  await fs.mkdir(directory, { recursive: true });
  const filePath = path.join(directory, `${pattern.slug}.mdx`);
  const fileContents = `${renderFrontmatter(pattern, lang)}\n\n${renderBody(pattern, lang)}\n`;
  await fs.writeFile(filePath, fileContents, "utf8");
}

async function main() {
  for (const pattern of patterns) {
    await writePattern(pattern, "pt");
    await writePattern(pattern, "en");
  }

  console.log(`Generated ${patterns.length * 2} pattern files.`);
}

await main();
