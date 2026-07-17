// src/discover.ts
import { JSDOM } from "jsdom";

export async function extractLinks(
  html: string,
  baseUrl: string,
): Promise<string[]> {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const links = new Set<string>();

  // 1. Standard Anchor Extraction
  const anchors = document.querySelectorAll("a[href]");
  anchors.forEach((a) => {
    const href = a.getAttribute("href");
    if (href) links.add(new URL(href, baseUrl).href);
  });

  // 2. Sitemap/Route Discovery logic (Skeleton)
  // Logic here would scan for /sitemap.xml or __NEXT_DATA__ bundles
  return Array.from(links);
}
