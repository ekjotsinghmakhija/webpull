// src/index.ts
import { WorkerPool } from "./pool";

async function main() {
  const pool = new WorkerPool(5);
  // Logic to parse CLI args and enqueue tasks
  await pool.start();
}

main();
