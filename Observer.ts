interface AsyncBusFn<T> {
    (args: T , resolve?: Function, reject?: Function): Promise<any> | void;
  }
  
  export class Observer {
    private __events: { [key: string]: AsyncBusFn<any>[] } = {};
    private timeout?: number;
    constructor(timeout?: number) {
      this.timeout = timeout || 10000;
    }
  
    public emit<T>(event: string, args: T): Promise<any[]> | undefined {
      if (!this.__events[event]) return; 
      let eventFns: AsyncBusFn<T>[] = this.__events[event];
      if (eventFns) {
        let ps: Promise<any>[] = [];
        eventFns.forEach(fn => {
          let p = new Promise((resolve, reject) => {
            let res = fn.call(this, args, resolve, reject);
            setTimeout(() => {
              reject('timeout');
            }, this.timeout);
            if (fn.length === 1) {
              resolve(res);
            }
          });
          ps.push(p);
        });
  
        return Promise.all(ps);
      } else {
        return undefined;
      }
    }
  
    on<T>(event: string, fn: AsyncBusFn<T>) {
      let eventFns = this.__events[event];
      if (!eventFns) {
        this.__events[event] = [fn];
      } else {
        eventFns.push(fn);
      }
    }
  
    remove(event: string, fn: AsyncBusFn<null>) {
      let eventFns = this.__events[event];
      if (!eventFns) return;
      let index = eventFns.indexOf(fn);
      if (index >= 0) {
        eventFns.splice(index, 1);
      }
    }
  
    removeAll(event: string) {
      if (event) {
        delete this.__events[event];
      } else {
        this.__events = {};
      }
    }
  }
  
  export default new Observer();