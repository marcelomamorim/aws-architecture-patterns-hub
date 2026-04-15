import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { referenceRoles, referenceTypes } from "./lib/references";

const mediaAssetSchema = z.object({
  src: z.string(),
  alt: z.string().min(1),
  caption: z.string().optional()
});

const asciiDiagramSchema = z.object({
  title: z.string().min(1),
  art: z.string().min(1),
  caption: z.string().optional()
});

const categorySchema = z.enum(["event-driven", "data", "resilience", "modernization"]);
const problemFocusSchema = z.enum([
  "broadcast",
  "data-consistency",
  "workflow-orchestration",
  "auditability",
  "spike-buffering",
  "fault-isolation",
  "latency-reduction",
  "incremental-migration",
  "reliable-delivery",
  "consumer-scale",
  "duplicate-handling",
  "pipeline-composition",
  "traffic-governance",
  "api-abstraction",
  "service-data-ownership",
  "data-propagation"
]);
const complexitySchema = z.enum(["starter", "intermediate", "advanced"]);
const flowTypeSchema = z.enum(["synchronous", "asynchronous", "hybrid"]);
const referenceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  authors: z.array(z.string().min(1)).min(1),
  year: z.number().int().min(1900).max(2100),
  publisher: z.string().min(1),
  type: z.enum(referenceTypes),
  role: z.enum(referenceRoles),
  url: z.url().optional()
});

const patterns = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/patterns",
    generateId: ({ data, entry }) => {
      const lang = typeof data.lang === "string" ? data.lang : entry.split("/")[0];
      const slug = typeof data.slug === "string" ? data.slug : entry.replace(/\.(md|mdx)$/, "");
      return `${lang}/${slug}`;
    }
  }),
  schema: z.object({
    lang: z.enum(["pt", "en"]),
    slug: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    category: categorySchema,
    problemFocus: problemFocusSchema,
    problem: z.string().min(1),
    whenToUse: z.array(z.string().min(1)).min(2),
    whenNotToUse: z.array(z.string().min(1)).min(2),
    complexity: complexitySchema,
    flowType: flowTypeSchema,
    tags: z.array(z.string().min(1)).min(2),
    awsServices: z.array(z.string().min(1)).min(1),
    relatedPatterns: z.array(z.string().min(1)).default([]),
    media: z.object({
      heroImage: mediaAssetSchema.optional(),
      animation: mediaAssetSchema.optional(),
      diagram: mediaAssetSchema.optional(),
      videoPoster: z.string().optional()
    }),
    asciiDiagram: asciiDiagramSchema,
    references: z.array(referenceSchema).min(3),
    featured: z.boolean().default(false)
  })
});

export const collections = { patterns };
