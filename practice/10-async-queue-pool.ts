/**
 * Async Task Queue Pool
 * A queue manager that runs at most N requests in parallel at the same time
 */

export class AsyncQueue {
  private queue: (() => Promise<any>)[] = [];
  private running = 0;

  constructor(private concurrency: number = 3) {}

  add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processNext();
    });
  }

  private async processNext(): Promise<void> {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const nextTask = this.queue.shift();

    if (nextTask) {
      try {
        await nextTask();
      } finally {
        this.running--;
        this.processNext();
      }
    }
  }
}
