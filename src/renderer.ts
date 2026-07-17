import { chromium } from "playwright";
import { WebPullError } from "./errors";

export async function renderPage(url: string): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    // networkidle ensures JS bundles have finished executing
    const response = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    if (response && response.status() >= 400) {
      throw new WebPullError(
        `Server returned status ${response.status()}`,
        url,
        "NETWORK",
      );
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
