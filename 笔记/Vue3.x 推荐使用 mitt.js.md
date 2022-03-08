##### 🍎 Vue2.x 使用 EventBus 进行组件通信，而 Vue3.x 推荐使用 mitt.js
1. 首先它足够小，仅有200bytes
2. 支持全部事件的监听和批量移除
3. 它还不依赖 Vue 实例，所以可以跨框架使用

##### 🍋 使用
1. 安装
```js
npm install --save mitt

// 封装自定义事务总线文件js，创建新的 js 文件，在任何你想使用的地方导入即可
import mitt from 'mitt'
export default mitt()

```

2. 使用
```js
import mitt from 'mitt'

const emitter = mitt()

// listen to an event
emitter.on('foo', e => console.log('foo', e) )

// listen to all events
emitter.on('*', (type, e) => console.log(type, e) )

// fire an event
emitter.emit('foo', { a: 'b' })

// clearing all events
emitter.all.clear()

// working with handler references:
function onFoo() {}
emitter.on('foo', onFoo)   // listen
emitter.off('foo', onFoo)  // unlisten

```

##### 🥕 核心
```js
export default function mitt(all) {
  all = all || new Map();
  return {
    all,
    on(type, handler) {
      const handlers = all.get(type);
      const added = handlers && handlers.push(handler);
      if (!added) {
        all.set(type, [handler]);
      }
    },
    off(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(type, evt) {
      (all.get(type) || []).slice().map((handler) => {
        handler(evt);
      });
      (all.get("*") || []).slice().map((handler) => {
        handler(type, evt);
      });
    },
  };
}


```