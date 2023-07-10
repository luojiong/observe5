type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string;
type EventReceiver<T> = (params?: T extends undefined ? undefined : T) => void;
declare class observe5<T extends EventMap> {
    private listeners;
    constructor();
    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    emit<K extends EventKey<T>>(eventName: K, params?: T[K] extends undefined ? undefined : T[K]): void;
}
export default observe5;
