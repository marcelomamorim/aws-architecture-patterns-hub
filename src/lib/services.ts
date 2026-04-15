import type { Language } from "./site";

export type ServiceCategory =
  | "compute"
  | "application-integration"
  | "database"
  | "analytics"
  | "networking"
  | "security"
  | "management"
  | "containers";

interface LocalizedText {
  pt: string;
  en: string;
}

interface ServiceSource {
  title: string;
  url: string;
}

interface ServiceDefinition {
  slug: string;
  name: string;
  category: ServiceCategory;
  summary: LocalizedText;
  detail: LocalizedText;
  useCases: LocalizedText[];
  source: ServiceSource;
  aliases?: string[];
}

export interface ServiceEntry {
  slug: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  summary: string;
  detail: string;
  useCases: string[];
  source: ServiceSource;
}

export const serviceCategoryLabels: Record<Language, Record<ServiceCategory, string>> = {
  pt: {
    compute: "Compute",
    "application-integration": "Integração",
    database: "Banco de dados",
    analytics: "Analytics",
    networking: "Rede e entrega",
    security: "Segurança",
    management: "Observabilidade",
    containers: "Containers"
  },
  en: {
    compute: "Compute",
    "application-integration": "Integration",
    database: "Database",
    analytics: "Analytics",
    networking: "Networking and delivery",
    security: "Security",
    management: "Observability",
    containers: "Containers"
  }
};

const services: ServiceDefinition[] = [
  {
    slug: "aws-lambda",
    name: "AWS Lambda",
    category: "compute",
    summary: {
      pt: "Executa código sob demanda sem gerenciar servidores, reagindo a eventos, filas, streams e chamadas HTTP.",
      en: "Runs code on demand without managing servers, reacting to events, queues, streams, and HTTP requests."
    },
    detail: {
      pt: "O AWS Lambda é uma base serverless para funções curtas e orientadas a evento. Ele combina bem com arquiteturas assíncronas, automações, integração entre serviços e backends enxutos.",
      en: "AWS Lambda is a serverless foundation for short, event-driven functions. It fits well with asynchronous architectures, automations, service integrations, and lean backends."
    },
    useCases: [
      {
        pt: "Processar eventos vindos de EventBridge, SQS, SNS e streams.",
        en: "Process events coming from EventBridge, SQS, SNS, and streams."
      },
      {
        pt: "Implementar adaptadores leves atrás de API Gateway.",
        en: "Implement lightweight adapters behind API Gateway."
      },
      {
        pt: "Executar tarefas automatizadas sem provisionar compute dedicado.",
        en: "Run automated tasks without provisioning dedicated compute."
      }
    ],
    source: {
      title: "What is AWS Lambda?",
      url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
    }
  },
  {
    slug: "amazon-eventbridge",
    name: "Amazon EventBridge",
    category: "application-integration",
    summary: {
      pt: "Orquestra eventos entre aplicações e serviços por meio de barramentos, regras e roteamento desacoplado.",
      en: "Routes events between applications and services through buses, rules, and decoupled event routing."
    },
    detail: {
      pt: "O Amazon EventBridge atua como backbone de eventos para integrações orientadas a evento. Ele ajuda a distribuir mudanças de estado, integrar sistemas SaaS e reduzir acoplamento entre produtores e consumidores.",
      en: "Amazon EventBridge acts as an event backbone for event-driven integrations. It helps distribute state changes, integrate SaaS systems, and reduce coupling between producers and consumers."
    },
    useCases: [
      {
        pt: "Publicar eventos de domínio para múltiplos consumidores.",
        en: "Publish domain events to multiple consumers."
      },
      {
        pt: "Encaminhar integrações assíncronas entre microserviços.",
        en: "Route asynchronous integrations between microservices."
      },
      {
        pt: "Criar regras de roteamento por tipo de evento e origem.",
        en: "Create routing rules by event type and source."
      }
    ],
    source: {
      title: "What is Amazon EventBridge?",
      url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"
    }
  },
  {
    slug: "amazon-eventbridge-pipes",
    name: "Amazon EventBridge Pipes",
    category: "application-integration",
    summary: {
      pt: "Conecta uma origem a um destino com filtros, enriquecimento e transformação sem construir um pipeline inteiro do zero.",
      en: "Connects a source to a target with filtering, enrichment, and transformation without building a full pipeline from scratch."
    },
    detail: {
      pt: "O EventBridge Pipes é útil quando você precisa de integração ponto a ponto com menos código operacional. Ele reduz trabalho de plumbing entre filas, streams, barramentos e alvos finais.",
      en: "EventBridge Pipes is useful when you need point-to-point integration with less operational code. It reduces plumbing work between queues, streams, buses, and final targets."
    },
    useCases: [
      {
        pt: "Ligar filas e streams a funções ou barramentos com filtro nativo.",
        en: "Connect queues and streams to functions or buses with native filtering."
      },
      {
        pt: "Aplicar pequenas transformações antes da entrega ao consumidor.",
        en: "Apply small transformations before delivery to the consumer."
      },
      {
        pt: "Simplificar integrações assíncronas sem criar código intermediário.",
        en: "Simplify asynchronous integrations without creating intermediary code."
      }
    ],
    source: {
      title: "Amazon EventBridge Pipes",
      url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html"
    }
  },
  {
    slug: "amazon-sqs",
    name: "Amazon SQS",
    category: "application-integration",
    summary: {
      pt: "Fornece filas gerenciadas para desacoplar produtores e consumidores e absorver variações de carga.",
      en: "Provides managed queues to decouple producers and consumers and absorb load variation."
    },
    detail: {
      pt: "O Amazon SQS é um bloco central para buffering, retry e processamento assíncrono. Ele ajuda a estabilizar throughput, isolar falhas e expor backlog de forma explícita.",
      en: "Amazon SQS is a core building block for buffering, retries, and asynchronous processing. It helps stabilize throughput, isolate failures, and expose backlog explicitly."
    },
    useCases: [
      {
        pt: "Amortecer picos entre APIs e workers.",
        en: "Buffer bursts between APIs and workers."
      },
      {
        pt: "Distribuir trabalho para consumidores concorrentes.",
        en: "Distribute work to competing consumers."
      },
      {
        pt: "Criar pipelines resilientes com retry e DLQ.",
        en: "Create resilient pipelines with retries and DLQ."
      }
    ],
    source: {
      title: "What is Amazon SQS?",
      url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"
    },
    aliases: ["Amazon Simple Queue Service"]
  },
  {
    slug: "amazon-sns",
    name: "Amazon SNS",
    category: "application-integration",
    summary: {
      pt: "Distribui mensagens em modelo pub/sub para múltiplos assinantes e destinos.",
      en: "Distributes messages in a pub/sub model to multiple subscribers and targets."
    },
    detail: {
      pt: "O Amazon SNS é forte em cenários de fanout, notificação e distribuição de eventos para vários consumidores. Ele é especialmente útil quando a mesma mensagem precisa chegar a diferentes canais ou serviços.",
      en: "Amazon SNS is strong for fanout, notification, and event distribution to multiple consumers. It is especially useful when the same message needs to reach different channels or services."
    },
    useCases: [
      {
        pt: "Fazer fanout de eventos para filas e funções.",
        en: "Fan out events to queues and functions."
      },
      {
        pt: "Publicar notificações para diferentes assinantes.",
        en: "Publish notifications to different subscribers."
      },
      {
        pt: "Desacoplar o produtor de múltiplos destinos de consumo.",
        en: "Decouple the producer from multiple consumption targets."
      }
    ],
    source: {
      title: "What is Amazon SNS?",
      url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html"
    },
    aliases: ["Amazon Simple Notification Service"]
  },
  {
    slug: "amazon-api-gateway",
    name: "Amazon API Gateway",
    category: "networking",
    summary: {
      pt: "Publica APIs com autenticação, throttling, versionamento e integração com backends gerenciados.",
      en: "Publishes APIs with authentication, throttling, versioning, and integration to managed backends."
    },
    detail: {
      pt: "O Amazon API Gateway funciona como camada de borda para expor contratos HTTP, REST ou WebSocket. Ele é útil para centralizar políticas de acesso, observabilidade e governança de tráfego.",
      en: "Amazon API Gateway works as an edge layer to expose HTTP, REST, or WebSocket contracts. It is useful for centralizing access policies, observability, and traffic governance."
    },
    useCases: [
      {
        pt: "Criar uma fachada única para múltiplos serviços.",
        en: "Create a single facade for multiple services."
      },
      {
        pt: "Aplicar autenticação, rate limiting e quotas na borda.",
        en: "Apply authentication, rate limiting, and quotas at the edge."
      },
      {
        pt: "Expor backends serverless e microserviços com contrato controlado.",
        en: "Expose serverless backends and microservices with a controlled contract."
      }
    ],
    source: {
      title: "What is Amazon API Gateway?",
      url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"
    }
  },
  {
    slug: "amazon-dynamodb",
    name: "Amazon DynamoDB",
    category: "database",
    summary: {
      pt: "Banco NoSQL gerenciado, serverless e de baixa latência para chave-valor e documentos.",
      en: "A managed, serverless, low-latency NoSQL database for key-value and document workloads."
    },
    detail: {
      pt: "O Amazon DynamoDB é indicado para cargas com alto throughput e padrões de acesso previsíveis. Ele aparece com frequência em arquiteturas event-driven, CQRS, idempotência e projeções de leitura.",
      en: "Amazon DynamoDB is suited for workloads with high throughput and predictable access patterns. It often appears in event-driven architectures, CQRS, idempotency, and read projections."
    },
    useCases: [
      {
        pt: "Persistir agregados e projeções com baixa latência.",
        en: "Persist aggregates and projections with low latency."
      },
      {
        pt: "Guardar chaves idempotentes e estado operacional.",
        en: "Store idempotency keys and operational state."
      },
      {
        pt: "Escalar leituras e escritas sem gerenciar infraestrutura de banco.",
        en: "Scale reads and writes without managing database infrastructure."
      }
    ],
    source: {
      title: "What is Amazon DynamoDB?",
      url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html"
    }
  },
  {
    slug: "amazon-cloudwatch",
    name: "Amazon CloudWatch",
    category: "management",
    summary: {
      pt: "Centraliza métricas, logs, alarmes e sinais operacionais para observabilidade na AWS.",
      en: "Centralizes metrics, logs, alarms, and operational signals for observability in AWS."
    },
    detail: {
      pt: "O Amazon CloudWatch é a base de monitoramento para workloads AWS. Ele ajuda a enxergar latência, erros, saturação e comportamento dos fluxos para reação operacional mais rápida.",
      en: "Amazon CloudWatch is the monitoring foundation for AWS workloads. It helps expose latency, errors, saturation, and flow behavior for faster operational response."
    },
    useCases: [
      {
        pt: "Criar alarmes para filas, funções, APIs e bancos.",
        en: "Create alarms for queues, functions, APIs, and databases."
      },
      {
        pt: "Consolidar logs e métricas de componentes distribuídos.",
        en: "Consolidate logs and metrics from distributed components."
      },
      {
        pt: "Apoiar troubleshooting e capacidade operacional.",
        en: "Support troubleshooting and operational capacity decisions."
      }
    ],
    source: {
      title: "What is Amazon CloudWatch?",
      url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
    }
  },
  {
    slug: "amazon-ecs",
    name: "Amazon ECS",
    category: "containers",
    summary: {
      pt: "Orquestra containers e serviços, facilitando deploy, escala e operação de workloads empacotados.",
      en: "Orchestrates containers and services, simplifying deploy, scaling, and operations for packaged workloads."
    },
    detail: {
      pt: "O Amazon ECS é útil quando a equipe precisa de controle maior sobre runtime, imagem e processos do que uma função serverless costuma oferecer. Ele aparece em workers, APIs e tarefas contínuas.",
      en: "Amazon ECS is useful when the team needs more control over runtime, image, and processes than a serverless function usually offers. It appears in workers, APIs, and long-running tasks."
    },
    useCases: [
      {
        pt: "Rodar workers consumidores de fila com controle fino de recursos.",
        en: "Run queue-consuming workers with finer resource control."
      },
      {
        pt: "Executar serviços HTTP baseados em container.",
        en: "Run container-based HTTP services."
      },
      {
        pt: "Isolar workloads com necessidades específicas de runtime.",
        en: "Isolate workloads with specific runtime needs."
      }
    ],
    source: {
      title: "What is Amazon ECS?",
      url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"
    },
    aliases: ["Amazon Elastic Container Service"]
  },
  {
    slug: "aws-step-functions",
    name: "AWS Step Functions",
    category: "application-integration",
    summary: {
      pt: "Modela workflows distribuídos com estados, transições, retries e compensações.",
      en: "Models distributed workflows with states, transitions, retries, and compensations."
    },
    detail: {
      pt: "O AWS Step Functions é valioso quando o fluxo de negócio precisa de coordenação explícita. Ele traz visibilidade sobre etapas, falhas, reprocessamentos e lógica de orquestração.",
      en: "AWS Step Functions is valuable when business flow needs explicit coordination. It brings visibility into steps, failures, reprocessing, and orchestration logic."
    },
    useCases: [
      {
        pt: "Orquestrar sagas e pipelines com múltiplas etapas.",
        en: "Orchestrate sagas and pipelines with multiple steps."
      },
      {
        pt: "Definir políticas de retry e timeout por etapa.",
        en: "Define retry and timeout policies per step."
      },
      {
        pt: "Documentar visualmente fluxos operacionais complexos.",
        en: "Visually document complex operational flows."
      }
    ],
    source: {
      title: "What is AWS Step Functions?",
      url: "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"
    }
  },
  {
    slug: "amazon-cloudfront",
    name: "Amazon CloudFront",
    category: "networking",
    summary: {
      pt: "Entrega conteúdo e APIs na borda com cache, aceleração e presença global.",
      en: "Delivers content and APIs at the edge with caching, acceleration, and global presence."
    },
    detail: {
      pt: "O Amazon CloudFront ajuda a reduzir latência para usuários distribuídos geograficamente. Ele também pode proteger origens e melhorar a experiência de consumo de APIs e ativos estáticos.",
      en: "Amazon CloudFront helps reduce latency for geographically distributed users. It can also protect origins and improve the delivery experience for APIs and static assets."
    },
    useCases: [
      {
        pt: "Distribuir conteúdo estático e assets na borda.",
        en: "Distribute static content and assets at the edge."
      },
      {
        pt: "Proteger APIs e serviços expostos com uma camada adicional de entrega.",
        en: "Protect exposed APIs and services with an additional delivery layer."
      },
      {
        pt: "Reduzir latência percebida em workloads globais.",
        en: "Reduce perceived latency in global workloads."
      }
    ],
    source: {
      title: "What is Amazon CloudFront?",
      url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
    }
  },
  {
    slug: "amazon-rds",
    name: "Amazon RDS",
    category: "database",
    summary: {
      pt: "Executa bancos relacionais gerenciados com operação simplificada, backups e alta disponibilidade.",
      en: "Runs managed relational databases with simplified operations, backups, and high availability."
    },
    detail: {
      pt: "O Amazon RDS é indicado quando o domínio precisa de modelo relacional, SQL e garantias transacionais clássicas. Ele é frequente em cenários de outbox, sistemas core e modernização incremental.",
      en: "Amazon RDS is suitable when the domain needs a relational model, SQL, and classic transactional guarantees. It is common in outbox scenarios, core systems, and incremental modernization."
    },
    useCases: [
      {
        pt: "Persistir dados transacionais com consistência relacional.",
        en: "Persist transactional data with relational consistency."
      },
      {
        pt: "Apoiar padrões que dependem de transação local forte.",
        en: "Support patterns that depend on strong local transactions."
      },
      {
        pt: "Modernizar bancos legados para um serviço gerenciado.",
        en: "Modernize legacy databases into a managed service."
      }
    ],
    source: {
      title: "What is Amazon RDS?",
      url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html"
    },
    aliases: ["Amazon Relational Database Service"]
  },
  {
    slug: "amazon-cognito",
    name: "Amazon Cognito",
    category: "security",
    summary: {
      pt: "Gerencia autenticação, identidade de usuários e federação para aplicações web e mobile.",
      en: "Manages authentication, user identity, and federation for web and mobile applications."
    },
    detail: {
      pt: "O Amazon Cognito entra quando a borda precisa lidar com login, tokens e identidade de forma gerenciada. Ele simplifica integração com APIs e experiências digitais que exigem controle de acesso.",
      en: "Amazon Cognito is useful when the edge needs managed login, tokens, and identity. It simplifies integration with APIs and digital experiences that require access control."
    },
    useCases: [
      {
        pt: "Autenticar usuários de aplicações web e mobile.",
        en: "Authenticate users in web and mobile applications."
      },
      {
        pt: "Emitir e validar tokens para APIs.",
        en: "Issue and validate tokens for APIs."
      },
      {
        pt: "Federar identidade com provedores externos.",
        en: "Federate identity with external providers."
      }
    ],
    source: {
      title: "What is Amazon Cognito?",
      url: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html"
    }
  },
  {
    slug: "amazon-elasticache",
    name: "Amazon ElastiCache",
    category: "database",
    summary: {
      pt: "Fornece cache em memória gerenciado para reduzir latência e aliviar pressão sobre datastores primários.",
      en: "Provides managed in-memory caching to reduce latency and relieve pressure on primary datastores."
    },
    detail: {
      pt: "O Amazon ElastiCache é um apoio clássico para padrões de leitura intensiva. Ele é comum quando o sistema precisa responder rápido, reduzir hot spots e controlar custo operacional do banco principal.",
      en: "Amazon ElastiCache is a classic support service for read-heavy patterns. It is common when the system must respond quickly, reduce hot spots, and control the operational cost of the primary database."
    },
    useCases: [
      {
        pt: "Aplicar cache-aside em consultas frequentes.",
        en: "Apply cache-aside to frequent queries."
      },
      {
        pt: "Diminuir latência de leitura em APIs e serviços.",
        en: "Reduce read latency in APIs and services."
      },
      {
        pt: "Absorver picos de leitura sem saturar o banco principal.",
        en: "Absorb read spikes without saturating the primary database."
      }
    ],
    source: {
      title: "What is Amazon ElastiCache?",
      url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html"
    }
  },
  {
    slug: "amazon-kinesis-data-streams",
    name: "Amazon Kinesis Data Streams",
    category: "analytics",
    summary: {
      pt: "Ingere e transporta dados em tempo real para processamento contínuo e consumidores paralelos.",
      en: "Ingests and transports real-time data for continuous processing and parallel consumers."
    },
    detail: {
      pt: "O Amazon Kinesis Data Streams é uma base para ingestão streaming quando a taxa de eventos é alta e o processamento precisa acontecer em quase tempo real. Ele aparece em pipelines analíticos e integrações contínuas.",
      en: "Amazon Kinesis Data Streams is a foundation for streaming ingestion when event rate is high and processing must happen near real time. It appears in analytical pipelines and continuous integrations."
    },
    useCases: [
      {
        pt: "Processar eventos de telemetria e logs em fluxo contínuo.",
        en: "Process telemetry events and logs in a continuous stream."
      },
      {
        pt: "Distribuir dados em tempo real para múltiplos consumidores.",
        en: "Distribute real-time data to multiple consumers."
      },
      {
        pt: "Alimentar pipelines analíticos e operacionais.",
        en: "Feed analytical and operational pipelines."
      }
    ],
    source: {
      title: "What is Amazon Kinesis Data Streams?",
      url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html"
    }
  },
  {
    slug: "amazon-opensearch-service",
    name: "Amazon OpenSearch Service",
    category: "analytics",
    summary: {
      pt: "Entrega busca, analytics e observabilidade gerenciadas sobre índices e dados consultáveis.",
      en: "Delivers managed search, analytics, and observability over searchable indexed data."
    },
    detail: {
      pt: "O Amazon OpenSearch Service é útil quando consultas precisam de busca textual, agregações e leitura otimizada para exploração. Ele entra com frequência em projeções CQRS, observabilidade e experiências de busca.",
      en: "Amazon OpenSearch Service is useful when queries need full-text search, aggregations, and a read model optimized for exploration. It often appears in CQRS projections, observability, and search experiences."
    },
    useCases: [
      {
        pt: "Montar read models para busca e filtragem avançada.",
        en: "Build read models for search and advanced filtering."
      },
      {
        pt: "Consolidar dados analíticos e de observabilidade.",
        en: "Consolidate analytical and observability data."
      },
      {
        pt: "Servir dashboards e consultas exploratórias.",
        en: "Serve dashboards and exploratory queries."
      }
    ],
    source: {
      title: "What is Amazon OpenSearch Service?",
      url: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html"
    }
  },
  {
    slug: "aws-appsync",
    name: "AWS AppSync",
    category: "application-integration",
    summary: {
      pt: "Publica APIs GraphQL gerenciadas com resolvers, composição de dados e suporte a tempo real.",
      en: "Publishes managed GraphQL APIs with resolvers, data composition, and real-time support."
    },
    detail: {
      pt: "O AWS AppSync é útil quando o frontend precisa consultar múltiplas fontes com um contrato único e mais flexível. Ele reduz atrito em cenários de composição e experiências centradas em cliente.",
      en: "AWS AppSync is useful when the frontend needs to query multiple sources through one flexible contract. It reduces friction in composition scenarios and client-centric experiences."
    },
    useCases: [
      {
        pt: "Compor dados de vários serviços para interfaces ricas.",
        en: "Compose data from multiple services for rich interfaces."
      },
      {
        pt: "Criar APIs GraphQL com resolvers gerenciados.",
        en: "Create GraphQL APIs with managed resolvers."
      },
      {
        pt: "Oferecer experiências realtime para web e mobile.",
        en: "Offer real-time experiences for web and mobile."
      }
    ],
    source: {
      title: "What is AWS AppSync?",
      url: "https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html"
    }
  },
  {
    slug: "aws-dms",
    name: "AWS DMS",
    category: "database",
    summary: {
      pt: "Migra e replica dados entre origens e destinos com foco em modernização e continuidade.",
      en: "Migrates and replicates data between sources and targets with a focus on modernization and continuity."
    },
    detail: {
      pt: "O AWS DMS ajuda a mover dados com menos interrupção em jornadas de modernização. Ele é relevante em estratégias graduais, replicação contínua e separação progressiva de sistemas legados.",
      en: "AWS DMS helps move data with less interruption during modernization journeys. It is relevant for gradual strategies, continuous replication, and progressive separation from legacy systems."
    },
    useCases: [
      {
        pt: "Migrar bancos com menor indisponibilidade.",
        en: "Migrate databases with lower downtime."
      },
      {
        pt: "Replicar dados durante transições de arquitetura.",
        en: "Replicate data during architecture transitions."
      },
      {
        pt: "Apoiar o desacoplamento gradual de um legado.",
        en: "Support the gradual decoupling of a legacy system."
      }
    ],
    source: {
      title: "What is AWS Database Migration Service?",
      url: "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html"
    },
    aliases: ["AWS Database Migration Service"]
  },
  {
    slug: "aws-waf",
    name: "AWS WAF",
    category: "security",
    summary: {
      pt: "Protege aplicações web e APIs com regras de inspeção, rate limiting e mitigação de tráfego abusivo.",
      en: "Protects web applications and APIs with inspection rules, rate limiting, and abusive traffic mitigation."
    },
    detail: {
      pt: "O AWS WAF atua na borda para reduzir exposição a bots, bursts e padrões maliciosos. Ele é especialmente útil quando governança de tráfego e proteção de capacidade são parte da arquitetura.",
      en: "AWS WAF acts at the edge to reduce exposure to bots, bursts, and malicious patterns. It is especially useful when traffic governance and capacity protection are part of the architecture."
    },
    useCases: [
      {
        pt: "Aplicar rate limiting e regras de bloqueio na borda.",
        en: "Apply rate limiting and blocking rules at the edge."
      },
      {
        pt: "Proteger APIs públicas e aplicações web expostas.",
        en: "Protect public APIs and exposed web applications."
      },
      {
        pt: "Reduzir impacto de tráfego abusivo em dependências compartilhadas.",
        en: "Reduce the impact of abusive traffic on shared dependencies."
      }
    ],
    source: {
      title: "AWS WAF",
      url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"
    }
  }
];

const bySlug = new Map<string, ServiceDefinition>(services.map((service) => [service.slug, service]));
const byName = new Map<string, ServiceDefinition>();

for (const service of services) {
  byName.set(service.name.toLowerCase(), service);

  for (const alias of service.aliases ?? []) {
    byName.set(alias.toLowerCase(), service);
  }
}

export function getAllServices(lang: Language): ServiceEntry[] {
  return services
    .map((service) => ({
      slug: service.slug,
      name: service.name,
      category: service.category,
      categoryLabel: serviceCategoryLabels[lang][service.category],
      summary: service.summary[lang],
      detail: service.detail[lang],
      useCases: service.useCases.map((item) => item[lang]),
      source: service.source
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function getServiceBySlug(lang: Language, slug: string) {
  const service = bySlug.get(slug);

  if (!service) {
    return null;
  }

  return {
    slug: service.slug,
    name: service.name,
    category: service.category,
    categoryLabel: serviceCategoryLabels[lang][service.category],
    summary: service.summary[lang],
    detail: service.detail[lang],
    useCases: service.useCases.map((item) => item[lang]),
    source: service.source
  } satisfies ServiceEntry;
}

export function resolveServiceByName(name: string) {
  return byName.get(name.toLowerCase()) ?? null;
}

export function assertAwsServiceCoverage(serviceNames: Iterable<string>) {
  const missing = new Set<string>();

  for (const name of serviceNames) {
    if (!resolveServiceByName(name)) {
      missing.add(name);
    }
  }

  if (missing.size > 0) {
    throw new Error(
      `Missing service catalog entry for: ${Array.from(missing).sort((a, b) => a.localeCompare(b)).join(", ")}`
    );
  }
}
