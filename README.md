# Observe

## 使用示例
```typescript 
import Observe from 'xx/Observe.ts'
// 监听你emit的方法 
Observe.on('functionName',callback)
// 触发方法
Observe.emit('functionName',data)
// 删除方法
Observe.remove('xxxx')
// 删除所有
Observe.removeAll()
```
