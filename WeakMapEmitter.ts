type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

class EventEmitter<T extends EventMap> {
  private listeners: WeakMap<object, Map<EventKey<T>, EventReceiver<T[keyof T]>>>;

  constructor() {
    this.listeners = new WeakMap();
  }

  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    const eventListeners = this.listeners.get(this) || new Map();
    eventListeners.set(eventName, fn);
    this.listeners.set(this, eventListeners);
  }

  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    const eventListeners = this.listeners.get(this);
    if (eventListeners) {
      eventListeners.delete(eventName);
      if (eventListeners.size === 0) {
        this.listeners.delete(this);
      }
    }
  }

  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void {
    const eventListeners = this.listeners.get(this);
    if (eventListeners) {
      const listener = eventListeners.get(eventName);
      if (listener) {
        listener(params);
      }
    }
  }
}
