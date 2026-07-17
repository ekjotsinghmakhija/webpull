// src/write.ts
import { write, mkdir } from "bun";
import { join } from "path";

export async function saveMarkdown(path: string, content: string) {
  // Ensure the directory exists
  await mkdir("output", { recursive: true });

  const filename = path.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const outputPath = join("output", filename + ".md");
  await write(outputPath, content);
  console.log(`📄 Saved to ${outputPath}`);
}
