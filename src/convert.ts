import { JSDOM } from "jsdom";
import { NodeHtmlMarkdown } from "node-html-markdown";

export function convertToMarkdown(html: string, url: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Clean up unnecessary bloat before conversion
  const selectorsToRemove = [
    "nav",
    "footer",
    "script",
    "style",
    "noscript",
    "iframe",
    "svg",
  ];
  selectorsToRemove.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  });

  const title = document.title || "Untitled";

  // Convert the remaining clean DOM body
  const markdown = NodeHtmlMarkdown.translate(document.body.innerHTML);

  // Inject YAML Frontmatter
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
source: "${url}"
date: "${new Date().toISOString()}"
---\n\n`;

  return frontmatter + markdown;
}
