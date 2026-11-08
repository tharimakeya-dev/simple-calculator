/**
 * Type-Safe Event Emitter (Publish-Subscribe Pattern)
 * Exchanging messages between components or modules without global coupling
 */

type Listener<T> = (data: T) => void;

export class EventEmitter<Events extends Record<string, any>> {
  private events: { [K in keyof Events]?: Listener<Events[K]>[] } = {};

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(listener);

    // Return the unsubscribe function
    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event]!.filter(l => l !== listener);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    if (!this.events[event]) return;
    this.events[event]!.forEach(listener => listener(data));
  }
}
