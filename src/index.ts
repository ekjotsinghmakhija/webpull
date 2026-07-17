// src/index.ts
import { WorkerPool } from "./pool";

const targetUrl = process.argv[2];

// Parse the --depth argument (default to 1 if not provided)
const depthIndex = process.argv.indexOf("--depth");
const maxDepth =
  depthIndex !== -1 ? parseInt(process.argv[depthIndex + 1], 10) : 1;

if (!targetUrl || targetUrl.startsWith("--")) {
  console.error("Usage: ./bin/webpull <url> [--depth <number>]");
  process.exit(1);
}

console.log(`🚀 Starting webpull for: ${targetUrl}`);
console.log(`📡 Max Crawl Depth: ${maxDepth}`);
console.log(`--------------------------------------------------`);

// Initialize the pool with 5 concurrent workers and the specified max depth
const pool = new WorkerPool(5, maxDepth);

// Enqueue the first URL at depth 0
pool.enqueue(targetUrl, 0);

// Start the engine
await pool.start();

console.log(`--------------------------------------------------`);
console.log(
  `✅ Crawl complete. Check the 'output' directory for your cloned data.`,
);
