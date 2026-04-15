# Referencias Classicas para os Padroes do Catalogo

Este arquivo consolida fontes canônicas para os padrões do catálogo.

Observação editorial:
- Nem todo padrão do catálogo nasceu em um paper acadêmico formal.
- Em vários casos, a fonte mais clássica e aceita pela comunidade é um livro de padrões, um catálogo do autor original ou um artigo de referência de praticantes reconhecidos.
- Quando a ligação entre a fonte e o nome exato do padrão do catálogo é uma inferência editorial forte, isso é marcado explicitamente.

## Fontes seminais e canônicas

### Mensageria e integração
- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/) - Gregor Hohpe e Bobby Woolf.
- [Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions](https://www.oreilly.com/library/view/enterprise-integration-patterns/0321200683/) - Gregor Hohpe e Bobby Woolf, Addison-Wesley, 2003.

### Arquitetura corporativa e modernização
- [CQRS](https://martinfowler.com/bliki/CQRS.html) - Martin Fowler, 14 de julho de 2011.
- [Event Sourcing](https://www.martinfowler.com/eaaDev/EventSourcing.html) - Martin Fowler, 12 de dezembro de 2005.
- [Original Strangler Fig Application](https://martinfowler.com/bliki/OriginalStranglerFigApplication.html) - Martin Fowler, 29 de junho de 2004.

### Microservices e dados distribuídos
- [Sagas](https://www.cs.princeton.edu/research/techreps/598) - Hector Garcia-Molina e Kenneth Salem, Princeton University technical report, 1987.
- [Sagas](https://dl.acm.org/doi/10.1145/38713.38742) - Hector Garcia-Molina e Kenneth Salem, SIGMOD/ACM, 1987.
- [Microservices Patterns](https://microservices.io/book.html) - Chris Richardson.
- [Pattern: Saga](https://microservices.io/patterns/data/saga.html) - Chris Richardson.
- [Pattern: Transactional outbox](https://microservices.io/patterns/data/transactional-outbox) - Chris Richardson.
- [Pattern: Database per service](https://microservices.io/patterns/data/database-per-service.html) - Chris Richardson.
- [Pattern: API Composition](https://microservices.io/patterns/data/api-composition.html) - Chris Richardson.
- [Pattern: API Gateway / Backends for Frontends](https://microservices.io/patterns/apigateway) - Chris Richardson.
- [Pattern: Command-side replica](https://microservices.io/patterns/data/command-side-replica.html) - Chris Richardson.
- [Pattern: Domain event](https://microservices.io/patterns/data/domain-event.html) - Chris Richardson.

### Resiliência operacional
- [Release It!: Design and Deploy Production-Ready Software](https://books.google.com/books/about/Release_It.html?id=UW7jAQAACAAJ) - Michael T. Nygard, Pragmatic Bookshelf, 2018 edition; obra original de 2007.
- [Bulkhead pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead) - Azure Architecture Center.
- [Circuit Breaker pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html) - AWS Prescriptive Guidance.
- [Circuit Breaker pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker) - Azure Architecture Center.

### Operação distribuída, retries e consumo seguro
- [Timeouts, retries and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) - Marc Brooker, Amazon Builders' Library.
- [Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) - Malcolm Featonby, Amazon Builders' Library.
- [Retry with backoff pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html) - AWS Prescriptive Guidance.

### Cloud patterns consolidados
- [Queue-Based Load Leveling pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling) - Azure Architecture Center.
- [Rate Limiting pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern) - Azure Architecture Center.
- [Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) - Azure Architecture Center.
- [Pattern-Oriented Software Architecture, A System of Patterns](https://books.google.com/books/about/Pattern_Oriented_Software_Architecture_A.html?id=Rpyg0QEACAAJ) - Frank Buschmann et al., Wiley, 1996.

## Mapeamento recomendado por padrão

| Padrao | Fonte principal recomendada | Tipo | Observacao |
| --- | --- | --- | --- |
| Fanout | Enterprise Integration Patterns | Livro + catálogo | O nome exato "fanout" varia; a linhagem canônica vem de publish-subscribe, recipient list e canais de mensageria. |
| Competing Consumers | Enterprise Integration Patterns | Livro + catálogo | Fonte clássica direta. |
| Idempotent Consumer | Enterprise Integration Patterns + Making retries safe with idempotent APIs | Livro + artigo técnico | A forma moderna para eventos/filas se apoia na noção clássica de idempotent receiver. |
| Pipes and Filters | Enterprise Integration Patterns + POSA Vol. 1 | Livro | Fonte clássica direta de arquitetura e integração. |
| CQRS | Martin Fowler - CQRS | Artigo canônico | Padrão de praticante; não é clássico acadêmico no sentido formal. |
| Event Sourcing | Martin Fowler - Event Sourcing | Artigo canônico | Fonte de referência mais citada na prática. |
| Saga | Garcia-Molina e Salem (1987) + microservices.io Saga | Paper seminal + catálogo | O paper é a raiz acadêmica; Richardson conecta ao uso moderno em microservices. |
| Transactional Outbox | microservices.io Transactional Outbox + Microservices Patterns | Catálogo + livro | Fonte canônica de mercado para o nome atual do padrão. |
| Database per Service | microservices.io Database per Service + Microservices Patterns | Catálogo + livro | Fonte canônica de mercado. |
| API Composition | microservices.io API Composition + Microservices Patterns | Catálogo + livro | Fonte canônica de mercado. |
| API Gateway | microservices.io API Gateway / Backends for Frontends | Catálogo | Fonte canônica prática muito usada em modernização. |
| Strangler Fig | Martin Fowler - Original Strangler Fig Application | Artigo canônico | Fonte original do termo. |
| Bulkhead | Release It! + Azure Bulkhead | Livro + catálogo | A formulação moderna de cloud resilience se ancora em Nygard e nos centros de arquitetura. |
| Circuit Breaker | Release It! + AWS/Azure Circuit Breaker | Livro + catálogos | Nygard é a referência clássica mais associada ao padrão. |
| Timeout | Release It! + Timeouts, retries and backoff with jitter | Livro + artigo técnico | Sem paper fundador claro; a combinação aqui é editorialmente forte. |
| Retry with Exponential Backoff | Timeouts, retries and backoff with jitter + AWS Retry with backoff pattern | Artigo técnico + catálogo | Fonte prática mais forte para sistemas distribuídos modernos. |
| Queue-Based Load Leveling | Azure Queue-Based Load Leveling pattern | Catálogo | Fonte clássica de cloud patterns; não há um paper seminal dominante para o nome atual. |
| Rate Limiting | Azure Rate Limiting pattern | Catálogo | Fonte prática consolidada; pode ser complementada futuramente com literatura sobre token bucket/leaky bucket. |
| Cache-Aside | Azure Cache-Aside pattern | Catálogo | Fonte consolidada de cloud patterns. |
| Event-Carried State Transfer | microservices.io Domain event + Command-side replica | Catalogos correlatos | Inferência editorial: a forma moderna do padrão deriva dessas duas ideias. |

## Recomendacao de uso no site

- Para cada padrão, manter no mínimo:
  - 1 fonte seminal ou canônica conceitual.
  - 1 fonte oficial de implementação cloud.
  - 1 fonte complementar moderna.
- Onde não houver paper fundador claro, deixar isso transparente no texto do padrão.
- Para os padrões com melhor lastro acadêmico ou histórico claro, priorizar esta ordem:
  - Saga
  - Pipes and Filters
  - Competing Consumers / Idempotent Receiver
  - CQRS
  - Event Sourcing
  - Strangler Fig

## Prioridade de enriquecimento editorial

Se formos integrar essa curadoria no conteúdo do site na próxima rodada, eu recomendo começar por:

1. Saga
2. CQRS
3. Event Sourcing
4. Transactional Outbox
5. Circuit Breaker
6. Strangler Fig
7. Pipes and Filters
8. Database per Service
