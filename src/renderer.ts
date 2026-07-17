// src/renderer.ts
import { chromium } from "playwright";
import { WebPullError } from "./errors";

export async function renderPage(url: string): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const response = await page.goto(url, { timeout: 30000 });

    if (response?.status() !== 200) {
      throw new WebPullError(`Status ${response?.status()}`, url, "NETWORK");
    }

    return await page.content();
  } catch (e: any) {
    throw new WebPullError(
      e.message,
      url,
      e.message.includes("timeout") ? "TIMEOUT" : "PARSE",
    );
  } finally {
    await browser.close();
  }
}
