// src/pool.ts
import { processUrl, type Task } from "./worker";

export class WorkerPool {
  private concurrency: number;
  private queue: Task[] = [];

  constructor(concurrency: number = 5) {
    this.concurrency = concurrency;
  }

  enqueue(task: Task) {
    this.queue.push(task);
  }

  async start() {
    const activeWorkers = new Set<Promise<any>>();

    while (this.queue.length > 0 || activeWorkers.size > 0) {
      while (activeWorkers.size < this.concurrency && this.queue.length > 0) {
        const task = this.queue.shift()!;
        const worker = processUrl(task).finally(() =>
          activeWorkers.delete(worker),
        );
        activeWorkers.add(worker);
      }
      await Promise.race(activeWorkers);
    }
  }
}
