# Observe or emitter  

## setup 
` yarn add observe5 or pnpm add observe5 `
## Example

```typescript
import Observe5 from 'observe5'


const Observe = new Observe5<{eventName: DataType}>();


Observe.on('eventName',callback)


Observe.emit('eventName',data)


Observe.off('eventName')

```

## Demo

```typescript
import Observe5 from 'observe5' //esm
//const Observe5 = require("observe5") //cjs

// create Observe
const Observe = new Observe5<{test: string}>();

// watch eventName for test
Observe.on('test',(res)=>{
    console.log(res)
})

// it is true.
Observe.emit('test',"test")

// it is  error code.
Observe.emit('test',1)

```
