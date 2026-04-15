import fs from "node:fs";
import path from "node:path";
import { getCollection, type CollectionEntry } from "astro:content";
import { assertAwsIconCoverage } from "./aws-icons";
import {
  extractCitationIds,
  hasArchitectureDiagram,
  referenceRoles
} from "./references";
import { assertAwsServiceCoverage } from "./services";
import { languages, type Language } from "./site";

export type PatternEntry = CollectionEntry<"patterns">;

const publicDir = path.resolve(process.cwd(), "public");
let patternCache: Promise<PatternEntry[]> | undefined;

function ensureMediaAsset(entry: PatternEntry, asset?: string) {
  if (!asset) {
    return;
  }

  const assetPath = asset.replace(/^\/+/, "");
  const fullPath = path.join(publicDir, assetPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing media asset for ${entry.data.slug} (${entry.data.lang}): ${asset}`);
  }
}

function validatePairs(entries: PatternEntry[]) {
  const grouped = new Map<string, Set<Language>>();

  for (const entry of entries) {
    const langs = grouped.get(entry.data.slug) ?? new Set<Language>();
    langs.add(entry.data.lang);
    grouped.set(entry.data.slug, langs);
  }

  for (const [slug, present] of grouped.entries()) {
    for (const lang of languages) {
      if (!present.has(lang)) {
        throw new Error(`Missing translation for pattern "${slug}" in language "${lang}"`);
      }
    }
  }
}

function validateRelations(entries: PatternEntry[]) {
  const slugs = new Set(entries.map((entry) => entry.data.slug));

  for (const entry of entries) {
    for (const related of entry.data.relatedPatterns) {
      if (!slugs.has(related)) {
        throw new Error(`Pattern "${entry.data.slug}" references unknown related pattern "${related}"`);
      }
    }
  }
}

function validateAssets(entries: PatternEntry[]) {
  for (const entry of entries) {
    ensureMediaAsset(entry, entry.data.media.heroImage?.src);
    ensureMediaAsset(entry, entry.data.media.animation?.src);
    ensureMediaAsset(entry, entry.data.media.diagram?.src);
    ensureMediaAsset(entry, entry.data.media.videoPoster);
  }

  assertAwsIconCoverage(entries.flatMap((entry) => entry.data.awsServices));
  assertAwsServiceCoverage(entries.flatMap((entry) => entry.data.awsServices));
}

function validateReferences(entries: PatternEntry[]) {
  const referencesByPattern = new Map<string, string[]>();

  for (const entry of entries) {
    const referenceIds = new Set<string>();
    const references = entry.data.references;

    for (const reference of references) {
      if (referenceIds.has(reference.id)) {
        throw new Error(`Pattern "${entry.data.slug}" (${entry.data.lang}) repeats reference id "${reference.id}"`);
      }

      referenceIds.add(reference.id);
    }

    for (const requiredRole of referenceRoles) {
      if (!references.some((reference) => reference.role === requiredRole)) {
        throw new Error(
          `Pattern "${entry.data.slug}" (${entry.data.lang}) is missing a "${requiredRole}" reference`
        );
      }
    }

    const body = entry.body ?? "";
    const citedIds = extractCitationIds(body);
    if (citedIds.length === 0) {
      throw new Error(`Pattern "${entry.data.slug}" (${entry.data.lang}) must include inline citations`);
    }

    for (const citedId of citedIds) {
      if (!referenceIds.has(citedId)) {
        throw new Error(
          `Pattern "${entry.data.slug}" (${entry.data.lang}) cites unknown reference id "${citedId}"`
        );
      }
    }

    if (!hasArchitectureDiagram(body) && !entry.data.media.diagram?.src) {
      throw new Error(
        `Pattern "${entry.data.slug}" (${entry.data.lang}) must include an ArchitectureDiagram or local diagram asset`
      );
    }

    if (!entry.data.asciiDiagram?.art.trim()) {
      throw new Error(`Pattern "${entry.data.slug}" (${entry.data.lang}) must include an asciiDiagram`);
    }

    referencesByPattern.set(`${entry.data.slug}:${entry.data.lang}`, [...referenceIds]);
  }

  for (const entry of entries) {
    const otherLang = entry.data.lang === "pt" ? "en" : "pt";
    const sourceIds = referencesByPattern.get(`${entry.data.slug}:${entry.data.lang}`) ?? [];
    const translatedIds = referencesByPattern.get(`${entry.data.slug}:${otherLang}`) ?? [];

    if (sourceIds.join("|") !== translatedIds.join("|")) {
      throw new Error(
        `Pattern "${entry.data.slug}" must keep matching reference ids between PT and EN`
      );
    }
  }
}

async function loadPatterns() {
  const entries = await getCollection("patterns");

  validatePairs(entries);
  validateRelations(entries);
  validateAssets(entries);
  validateReferences(entries);

  return entries.sort((left, right) => left.data.title.localeCompare(right.data.title));
}

export async function getValidatedPatterns() {
  patternCache ??= loadPatterns();
  return patternCache;
}

export async function getPatternsByLanguage(lang: Language) {
  const patterns = await getValidatedPatterns();
  return patterns.filter((entry) => entry.data.lang === lang);
}

export async function getPattern(lang: Language, slug: string) {
  const patterns = await getValidatedPatterns();
  return patterns.find((entry) => entry.data.lang === lang && entry.data.slug === slug);
}

export async function getPatternTranslation(lang: Language, slug: string) {
  return getPattern(lang, slug);
}

export async function getRelatedPatterns(lang: Language, slugs: string[]) {
  const patterns = await getPatternsByLanguage(lang);
  return patterns.filter((entry) => slugs.includes(entry.data.slug));
}

export async function getFeaturedPatterns(lang: Language) {
  const patterns = await getPatternsByLanguage(lang);
  return patterns.filter((entry) => entry.data.featured);
}

export async function getPatternSearchIndex(lang: Language) {
  const patterns = await getPatternsByLanguage(lang);
  return patterns.map((entry) => ({
    slug: entry.data.slug,
    title: entry.data.title,
    summary: entry.data.summary,
    tags: entry.data.tags,
    category: entry.data.category,
    problemFocus: entry.data.problemFocus,
    awsServices: entry.data.awsServices,
    complexity: entry.data.complexity,
    flowType: entry.data.flowType,
    featured: entry.data.featured
  }));
}
