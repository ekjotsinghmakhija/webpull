import { processUrl, type Task } from "./worker";

export class WorkerPool {
  private concurrency: number;
  private maxDepth: number;
  private queue: Task[] = [];
  private visited = new Set<string>();

  constructor(concurrency: number = 5, maxDepth: number = 2) {
    this.concurrency = concurrency;
    this.maxDepth = maxDepth;
  }

  enqueue(url: string, depth: number = 0) {
    if (!this.visited.has(url)) {
      this.visited.add(url);
      this.queue.push({ url, depth });
    }
  }

  async start() {
    const activeWorkers = new Set<Promise<void>>();

    while (this.queue.length > 0 || activeWorkers.size > 0) {
      while (activeWorkers.size < this.concurrency && this.queue.length > 0) {
        const task = this.queue.shift()!;

        const worker = processUrl(task, this.maxDepth)
          .then((newLinks) => {
            newLinks.forEach((link) => this.enqueue(link, task.depth + 1));
          })
          .finally(() => {
            activeWorkers.delete(worker);
          });

        activeWorkers.add(worker);
      }
      // Wait for at least one worker to finish before continuing the loop
      if (activeWorkers.size >= this.concurrency || this.queue.length === 0) {
        await Promise.race(activeWorkers);
      }
    }
  }
}
