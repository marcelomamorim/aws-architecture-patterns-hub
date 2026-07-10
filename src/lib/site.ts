export const languages = ["pt", "en"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "pt";

export const languageLabels: Record<Language, string> = {
  pt: "Português",
  en: "English"
};

export const siteTitle = {
  pt: "AWS Architecture Patterns Hub",
  en: "AWS Architecture Patterns Hub"
} as const;

export const siteDescription = {
  pt: "Catálogo bilíngue de padrões arquiteturais com explicações visuais, trade-offs e implementações com serviços AWS.",
  en: "Bilingual catalog of architecture patterns with visual explanations, trade-offs, and AWS implementation guidance."
} as const;

// Projetos irmãos do ecossistema de estudos AWS (cross-linking).
export const servicesCatalogBase = "https://marcelomamorim.github.io/aws-services-catalog";
export const certificationHubBase = "https://marcelomamorim.github.io/aws-certification-hub";

export const uiCopy = {
  pt: {
    home: "Início",
    catalog: "Catálogo",
    patterns: "Padrões",
    services: "Serviços AWS",
    servicesTitle: "Catálogo de serviços AWS",
    servicesIntro:
      "Entenda rapidamente o papel de cada serviço citado nos padrões e navegue do serviço para os padrões relacionados.",
    serviceSearchPlaceholder: "Buscar por nome do serviço ou categoria",
    relatedServicesPatterns: "Padrões que usam este serviço",
    serviceSource: "Documentação oficial",
    explore: "Explorar padrões",
    featured: "Padrões em destaque",
    allPatterns: "Todos os padrões",
    howToRead: "Como ler cada padrão",
    searchPlaceholder: "Buscar por nome, tag ou serviço AWS",
    filterCategory: "Categoria",
    filterProblem: "Problema resolvido",
    filterComplexity: "Complexidade",
    filterFlow: "Tipo de fluxo",
    clearFilters: "Limpar filtros",
    emptyState: "Nenhum padrão encontrado com a combinação atual.",
    relatedPatterns: "Padrões relacionados",
    awsServices: "Serviços AWS envolvidos",
    references: "Referências",
    bibliography: "Bibliografia comentada",
    whenToUse: "Quando usar",
    whenNotToUse: "Quando evitar",
    problemLabel: "Problema",
    solutionLabel: "Solução",
    flowTypeLabel: "Fluxo",
    complexityLabel: "Complexidade",
    categoryLabel: "Categoria",
    languageLabel: "Idioma",
    tocLabel: "Nesta página",
    trailsLabel: "Trilhas sugeridas",
    mediaLabel: "Visual explicativo",
    backToCatalog: "Voltar ao catálogo",
    introEyebrow: "Catálogo editorial bilíngue",
    introTitle: "Padrões consolidados para desenhar sistemas AWS com mais clareza.",
    introText:
      "Conceito geral, fluxo visual, trade-offs e implementação prática em AWS em páginas feitas para estudo rápido e consulta recorrente.",
    introCtaPrimary: "Abrir catálogo",
    introCtaSecondary: "Ver padrões em destaque",
    guideTitle: "Aprenda o padrão em quatro camadas",
    guideText:
      "Cada página abre pelo problema, mostra o fluxo, discute trade-offs e fecha com uma implementação AWS aplicável.",
    guideItems: [
      "Comece pelo contexto: qual gargalo ou decisão arquitetural o padrão resolve.",
      "Use o fluxo visual para entender como os blocos conversam entre si.",
      "Leia os trade-offs antes de adotar o padrão em produção.",
      "Feche na seção AWS para transformar o conceito em design concreto."
    ],
    catalogTitle: "Escolha o padrão pelo problema que você precisa resolver.",
    catalogText:
      "Filtre por categoria, complexidade, tipo de fluxo e foco do problema para comparar alternativas rapidamente.",
    footerText:
      "Feito para GitHub Pages com Astro + MDX, pronto para receber GIFs, vídeos, diagramas locais e ícones oficiais da AWS."
  },
  en: {
    home: "Home",
    catalog: "Catalog",
    patterns: "Patterns",
    services: "AWS services",
    servicesTitle: "AWS services catalog",
    servicesIntro:
      "Quickly understand the role of each service mentioned across the patterns and jump from the service to related patterns.",
    serviceSearchPlaceholder: "Search by service name or category",
    relatedServicesPatterns: "Patterns using this service",
    serviceSource: "Official documentation",
    explore: "Explore patterns",
    featured: "Featured patterns",
    allPatterns: "All patterns",
    howToRead: "How to read each pattern",
    searchPlaceholder: "Search by title, tag, or AWS service",
    filterCategory: "Category",
    filterProblem: "Solved problem",
    filterComplexity: "Complexity",
    filterFlow: "Flow type",
    clearFilters: "Clear filters",
    emptyState: "No patterns match the current combination.",
    relatedPatterns: "Related patterns",
    awsServices: "AWS services involved",
    references: "References",
    bibliography: "Annotated bibliography",
    whenToUse: "When to use",
    whenNotToUse: "When to avoid",
    problemLabel: "Problem",
    solutionLabel: "Solution",
    flowTypeLabel: "Flow",
    complexityLabel: "Complexity",
    categoryLabel: "Category",
    languageLabel: "Language",
    tocLabel: "On this page",
    trailsLabel: "Suggested paths",
    mediaLabel: "Explainer visual",
    backToCatalog: "Back to catalog",
    introEyebrow: "Bilingual editorial catalog",
    introTitle: "Consolidated patterns to design AWS systems with more clarity.",
    introText:
      "Universal concept, visual flow, trade-offs, and practical AWS implementation in pages made for quick study and recurring reference.",
    introCtaPrimary: "Open catalog",
    introCtaSecondary: "See featured patterns",
    guideTitle: "Learn each pattern in four layers",
    guideText:
      "Every page opens with the problem, shows the flow, explains the trade-offs, and closes with an AWS implementation lens.",
    guideItems: [
      "Start with the context: which architectural bottleneck or decision the pattern resolves.",
      "Use the visual flow to understand how the building blocks interact.",
      "Read the trade-offs before adopting the pattern in production.",
      "Finish with the AWS section to turn the concept into a concrete design."
    ],
    catalogTitle: "Choose the pattern by the problem you need to solve.",
    catalogText:
      "Filter by category, complexity, flow type, and problem focus to compare alternatives quickly.",
    footerText:
      "Built for GitHub Pages with Astro + MDX, ready for local GIFs, videos, local diagrams, and official AWS icons."
  }
} as const;

export const categoryLabels = {
  pt: {
    "event-driven": "Event-driven",
    data: "Dados e consistência",
    resilience: "Resiliência",
    modernization: "Modernização"
  },
  en: {
    "event-driven": "Event-driven",
    data: "Data and consistency",
    resilience: "Resilience",
    modernization: "Modernization"
  }
} as const;

export const complexityLabels = {
  pt: {
    starter: "Essencial",
    intermediate: "Intermediário",
    advanced: "Avançado"
  },
  en: {
    starter: "Foundational",
    intermediate: "Intermediate",
    advanced: "Advanced"
  }
} as const;

export const flowTypeLabels = {
  pt: {
    synchronous: "Síncrono",
    asynchronous: "Assíncrono",
    hybrid: "Híbrido"
  },
  en: {
    synchronous: "Synchronous",
    asynchronous: "Asynchronous",
    hybrid: "Hybrid"
  }
} as const;

export const problemFocusLabels = {
  pt: {
    broadcast: "Distribuir eventos para múltiplos destinos",
    "data-consistency": "Separar leitura e escrita",
    "workflow-orchestration": "Coordenar processos distribuídos",
    auditability: "Registrar toda mudança de estado",
    "spike-buffering": "Absorver picos com filas",
    "fault-isolation": "Conter falhas em chamadas remotas",
    "latency-reduction": "Reduzir latência de leitura",
    "incremental-migration": "Migrar sistemas gradualmente",
    "reliable-delivery": "Garantir publicação e entrega confiáveis",
    "consumer-scale": "Escalar processamento concorrente",
    "duplicate-handling": "Tornar consumo resiliente a duplicidade",
    "pipeline-composition": "Encadear etapas com baixo acoplamento",
    "traffic-governance": "Controlar pressão e picos de tráfego",
    "api-abstraction": "Compor e expor APIs com menos atrito",
    "service-data-ownership": "Descentralizar propriedade de dados",
    "data-propagation": "Distribuir estado entre serviços por eventos"
  },
  en: {
    broadcast: "Distribute events to multiple targets",
    "data-consistency": "Separate write and read models",
    "workflow-orchestration": "Coordinate distributed workflows",
    auditability: "Record every state transition",
    "spike-buffering": "Absorb spikes with queues",
    "fault-isolation": "Contain failures in remote calls",
    "latency-reduction": "Reduce read latency",
    "incremental-migration": "Migrate systems incrementally",
    "reliable-delivery": "Publish and deliver changes reliably",
    "consumer-scale": "Scale concurrent message processing",
    "duplicate-handling": "Absorb duplicate deliveries safely",
    "pipeline-composition": "Chain stages with low coupling",
    "traffic-governance": "Shape traffic and protect shared capacity",
    "api-abstraction": "Expose and compose APIs with less friction",
    "service-data-ownership": "Decentralize data ownership by service",
    "data-propagation": "Distribute state through domain events"
  }
} as const;

export function getCopy(lang: Language) {
  return uiCopy[lang];
}
