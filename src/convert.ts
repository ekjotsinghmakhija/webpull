// src/convert.ts
import { JSDOM } from "jsdom";
import { NodeHtmlMarkdown } from "node-html-markdown";

export function convertToMarkdown(html: string): string {
  const dom = new JSDOM(html);
  // Optional: Add logic here to remove <script>, <style>, and <nav> tags
  // to ensure clean content extraction.
  return NodeHtmlMarkdown.translate(dom.window.document.body.innerHTML);
}
