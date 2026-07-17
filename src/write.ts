import { write } from "bun";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "path";

export async function saveMarkdown(urlPath: string, content: string) {
  // Normalize the URL path to a local file system path
  let safePath = urlPath === "/" ? "index" : urlPath.replace(/^\//, "");
  if (!safePath.endsWith(".md")) {
    safePath += ".md";
  }

  const outputPath = join("output", safePath);

  // Ensure nested directories exist
  await mkdir(dirname(outputPath), { recursive: true });
  await write(outputPath, content);

  console.log(`📄 Saved: ${outputPath}`);
}
