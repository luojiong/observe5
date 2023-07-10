# Observe or emitter  

## Example

```typescript


import EventEmitter from 'WeakMapEmitter.ts'

const Observe = new EventEmitter<{functionName: DataType}>();

Observe.on('eventName',callback)


Observe.emit('eventName',data)


Observe.off('eventName')

```
