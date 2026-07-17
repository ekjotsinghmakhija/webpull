// src/convert.ts
import { JSDOM } from "jsdom";
import { NodeHtmlMarkdown } from "node-html-markdown";

export function convertToMarkdown(html: string, url: string): string {
  const dom = new JSDOM(html);
  const title = dom.window.document.title || "Untitled";

  const markdown = NodeHtmlMarkdown.translate(
    dom.window.document.body.innerHTML,
  );

  // Injecting YAML Frontmatter
  const frontmatter = `---
title: "${title}"
source: "${url}"
date: "${new Date().toISOString()}"
---\n\n`;

  return frontmatter + markdown;
}
