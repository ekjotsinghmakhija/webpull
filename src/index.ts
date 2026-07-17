// src/index.ts
import { WorkerPool } from "./pool";

const targetUrl = process.argv[2];
if (!targetUrl) {
  console.error("Usage: ./bin/webpull <url>");
  process.exit(1);
}

console.log(`🚀 Starting webpull for: ${targetUrl}`);
const pool = new WorkerPool(5);
pool.enqueue({ url: targetUrl });

// Await the pool so the process doesn't exit prematurely
await pool.start();
console.log(`✅ Extraction complete. Check your output directory.`);
