// src/renderer.ts
import { WebPullError } from "./errors";

export async function renderPage(url: string): Promise<string> {
  try {
    // ... launch browser ...
    const response = await page.goto(url, { timeout: 30000 });

    if (response?.status() !== 200) {
      throw new WebPullError(
        `Server returned status ${response?.status()}`,
        url,
        "NETWORK",
      );
    }

    return await page.content();
  } catch (e: any) {
    throw new WebPullError(e.message, url, "TIMEOUT");
  }
}
