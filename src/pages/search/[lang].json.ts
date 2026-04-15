import type { APIRoute } from "astro";
import { getPatternSearchIndex } from "../../lib/patterns";
import { languages } from "../../lib/site";

export function getStaticPaths() {
  return languages.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as "pt" | "en";
  const data = await getPatternSearchIndex(lang);

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};
