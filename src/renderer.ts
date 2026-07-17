// src/renderer.ts
import { chromium, type Page } from "playwright";

export async function renderPage(url: string): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, { waitUntil: "networkidle" });
  const content = await page.content();

  await browser.close();
  return content;
}
