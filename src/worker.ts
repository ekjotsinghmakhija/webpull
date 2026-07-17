// src/worker.ts
import { getRandomUA } from "./ua";

export interface Task {
  url: string;
}

export async function processUrl(task: Task): Promise<string> {
  console.log(`Processing: ${task.url} with UA: ${getRandomUA()}`);

  // Logic will be expanded to call the renderer in Phase 4
  return `Content extracted from ${task.url}`;
}
