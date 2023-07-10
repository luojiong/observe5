type EventMap = Record<string, unknown>;

type EventKey<T extends EventMap> = string & keyof T;

type EventReceiver<T> = (params?: T) => void;

class observe5<T extends EventMap> {
  private listeners: WeakMap<
    object,
    Map<EventKey<T>, EventReceiver<T[keyof T]>[]>
  >;

  constructor() {
    this.listeners = new WeakMap();
  }

  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    const eventListeners = this.listeners.get(this) || new Map();
    const listeners = eventListeners.get(eventName) || [];
    listeners.push(fn);
    eventListeners.set(eventName, listeners);
    this.listeners.set(this, eventListeners);
  }

  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    const eventListeners = this.listeners.get(this);
    if (eventListeners) {
      const listeners = eventListeners.get(eventName);
      if (listeners) {
        const index = listeners.indexOf(fn as EventReceiver<T[keyof T]>);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
        if (listeners.length === 0) {
          eventListeners.delete(eventName);
        }
      }
      if (eventListeners.size === 0) {
        this.listeners.delete(this);
      }
    }
  }

  emit<K extends EventKey<T>>(eventName: K, params?: T[K]): void {
    const eventListeners = this.listeners.get(this);
    if (eventListeners) {
      const listeners = eventListeners.get(eventName);
      if (listeners) {
        for (const listener of listeners) {
          listener(params);
        }
      }
    }
  }
}
export default  observe5;
