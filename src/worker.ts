import { renderPage } from "./renderer";
import { extractLinks } from "./discover";
import { convertToMarkdown } from "./convert";
import { saveMarkdown } from "./write";
import { handleAndLog, WebPullError } from "./errors";
import { getRandomUA } from "./ua";

export interface Task {
  url: string;
  depth: number;
}

export async function processUrl(
  task: Task,
  maxDepth: number,
): Promise<string[]> {
  try {
    console.log(`[Worker] Fetching: ${task.url}`);
    const html = await renderPage(task.url);

    const markdown = convertToMarkdown(html, task.url);
    const pathName = new URL(task.url).pathname;
    await saveMarkdown(pathName, markdown);

    if (task.depth < maxDepth) {
      return await extractLinks(html, task.url);
    }
    return [];
  } catch (err: any) {
    if (err instanceof WebPullError) {
      handleAndLog(err);
    } else {
      console.error(`❌ Unknown error processing ${task.url}:`, err);
    }
    return [];
  }
}
