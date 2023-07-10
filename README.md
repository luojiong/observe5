# Observe or emitter  

## setup 
` yarn add observe5 or pnpm add observe5 `
## Example

```typescript


import Observe5 from 'observe5'


const Observe = new Observe5<{functionName: DataType}>();


Observe.on('eventName',callback)


Observe.emit('eventName',data)


Observe.off('eventName')

```
