// src/write.ts
import { write } from "bun";
import { join } from "path";

export async function saveMarkdown(path: string, content: string) {
  const outputPath = join("output", path + ".md");
  await write(outputPath, content);
}
