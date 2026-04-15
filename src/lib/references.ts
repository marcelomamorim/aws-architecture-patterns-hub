export const referenceTypes = [
  "book",
  "paper",
  "official-doc",
  "pattern-catalog",
  "article"
] as const;

export const referenceRoles = [
  "conceptual",
  "implementation",
  "complementary"
] as const;

export type ReferenceType = (typeof referenceTypes)[number];
export type ReferenceRole = (typeof referenceRoles)[number];

export interface PatternReference {
  id: string;
  title: string;
  authors: string[];
  year: number;
  publisher: string;
  type: ReferenceType;
  role: ReferenceRole;
  url?: string;
}

const citePattern = /<Cite\b[\s\S]*?ids=\{\s*\[(.*?)\]\s*\}[\s\S]*?\/?>/g;
const quotePattern = /"([^"]+)"|'([^']+)'/g;
const architectureDiagramPattern = /<ArchitectureDiagram\b/;

export function extractCitationIds(body: string) {
  const ids = new Set<string>();

  for (const match of body.matchAll(citePattern)) {
    const rawList = match[1] ?? "";

    for (const token of rawList.matchAll(quotePattern)) {
      const id = (token[1] ?? token[2] ?? "").trim();
      if (id) {
        ids.add(id);
      }
    }
  }

  return [...ids];
}

export function hasArchitectureDiagram(body: string) {
  return architectureDiagramPattern.test(body);
}

export function formatAuthors(authors: string[]) {
  if (authors.length === 0) {
    return "";
  }

  if (authors.length === 1) {
    return authors[0];
  }

  if (authors.length === 2) {
    return `${authors[0]} and ${authors[1]}`;
  }

  return `${authors.slice(0, -1).join(", ")}, and ${authors.at(-1)}`;
}

export function formatReference(reference: PatternReference) {
  const parts = [
    `${formatAuthors(reference.authors)} (${reference.year}).`,
    `${reference.title}.`,
    `${reference.publisher}.`
  ];

  if (reference.url) {
    parts.push(reference.url);
  }

  return parts.join(" ");
}

export function getCitationLabel(reference: PatternReference) {
  const primaryAuthor = reference.authors[0] ?? reference.publisher;
  const surname = primaryAuthor.split(/\s+/).at(-1) ?? primaryAuthor;
  return `${surname}, ${reference.year}`;
}
