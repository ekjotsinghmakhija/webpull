import { JSDOM } from "jsdom";

export async function extractLinks(
  html: string,
  baseUrl: string,
): Promise<string[]> {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const links = new Set<string>();
  const base = new URL(baseUrl);

  // 1. Standard Anchor Extraction
  const anchors = document.querySelectorAll("a[href]");
  anchors.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("javascript:") || href.startsWith("mailto:"))
      return;

    try {
      const url = new URL(href, baseUrl);
      // Only keep links from the same origin to avoid crawling the entire internet
      if (url.origin === base.origin) {
        links.add(url.href.split("#")[0]); // Ignore anchor hashes
      }
    } catch {
      // Ignore malformed URLs
    }
  });

  // 2. Next.js / SPA Data Route Extraction (Example)
  const nextData = document.getElementById("__NEXT_DATA__");
  if (nextData && nextData.textContent) {
    try {
      const parsedData = JSON.parse(nextData.textContent);
      // Extract paths from the JSON bundle if applicable
      // (Custom logic depends on the specific SPA framework)
    } catch {
      // Ignore JSON parse errors
    }
  }

  return Array.from(links);
}
