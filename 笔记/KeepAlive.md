# KeepAlive 组件
#### 需要渲染器底层支持
#### KeepAlive 避免一个组件被频繁销毁和重建
```html
<template>
  <KeepAlive>
    <Tab v-if="i === 1" />
    <Tab v-if="i === 2" />
    <Tab v-if="i === 3" />
  </KeepAlive>
</template>
```
#### KeepAlive 本质是缓存管理，加上特殊的挂载，卸载逻辑
被KeepAlive 的组件从原容器搬运到另外一个隐藏的容器中，实现 `假卸载`，当被搬运到隐藏容器的组件需要再次被`挂载`时，把该组件从隐藏容器搬运到原容器。这个过程对应的生命周期就是 activated 和 deactivated。
![](Pasted%20image%2020220330221152.png)

代码
```js
const keepalive = {
  // 标识
  __isKeepAlive: true,
  setup(props, { slots }) {
    // 缓存对象
    // key: vnode.type
    // value: vnode
    const cache = new Map();
    // KeepAlive 的实例
    const instance = currentInstance;
    // 对于 KeepAlive 组件来说，它的实例上存在特殊的 keepAliveCtx 对象，该对象由渲染器注入
    // 该对象会暴露渲染器的一些内部方法，move 用来将一段dom 移动到另一个容器
    const { move, createElement } = instance.KeepAliveCtx;
    // 隐藏容器
    const storageContainer = createElement("div");

    // KeepAlive 组件实例添加两个内部函数，_deActivate 和 _activate
    // 这两个函数会在 渲染器中调用
    // 老套路 rawVNode.keepAliveInstance = instance, rawVNode.keepAliveInstance._activate(...)
    instance._deActivate = (vnode) => {
      move(vnode, storageContainer);
    };
    instance._activate = (vnode, container, anchor) => {
      move(vnode, container, anchor);
    };
    return () => {
      // keepalive 默认插槽就是要被 keepalive 的组件
      let rawVNode = slots.default();
      // 如果不是 组件，直接渲染
      // 也就是说 keepalive 只能 缓存组件
      if (typeof rawVNode !== "object") {
        return rawVNode;
      }
      // 在挂载时先获取缓存的组件 vnode
      const cacheVNode = cache.get(rawVNode.type);
      if (cacheVNode) {
        // 有缓存，不需要挂载，应该执行激活
        // 继承组件实例
        rawVNode.component = cacheVNode.component;
        // 在 vnode 上添加keptAlive属性，标记为 true，避免渲染器重新挂载它
        rawVNode.keptAlive = true;
      } else {
        // 缓存
        cache.set(rawVNode.type, rawVNode);
      }
      // 在组件 vnode 上添加shouldKeepAlive 属性，标记 true,避免渲染器将其卸载
      rawVNode.shouldKeepAlive = true;
      // 将keepalive 实例添加到vnode，以便渲染器访问实例的 两个方法
      rawVNode.keepAliveInstance = instance;
      // 渲染组件 vnode
      return rawVNode;
    };
  },
};

```
keepalive 本身不会渲染额外内容，它的渲染最终返回需要被 keepalive 的组件A，这个A 我们称之为 “内部组件”，keepalive 就是给这个内部组件添加一些标识，以便渲染器根据标识进行特定的卸载和挂载逻辑。
#### shouldKeepAlive 当渲染器卸载内部组件时，不会真实卸载内部组件，而是调用_deActivate 完成搬运，unmount
```js
function unmount(vnode) {
  if (vnode.type === Fragment) {
    // ...
  } else if (vnode.type === "object") {
    if (vnode.shouldKeepAlive) {
      // 使其失活
      vnode.KeepAliveInstance._deActivate(vnode);
    }
  }
  // ...
}
```
#### keptAlive 内部组件被缓存后，会添加keptAlive 标识，但内部组件需要重新渲染时，渲染器不会重新挂载它，而是将其激活，patch
```js
function patch(n1, n2, container, anchor) {
  // ...
  if (typeof n2.type === "object" || typeof n2.type === "function") {
    if (!n1) {
      if (n2.keptAlive) {
        // 激活
        n2.keepAliveInstance._activate(n2, container, anchor);
      } else {
        mountComponent(n2, container, anchor);
      }
    }
  }
  // ...
}
```
#### 看看 move 的来历
```js
function mountComponent(vnode, container, anchor) {
  // ...
  const instance = {
    state,
    props: shallowReactive(props),
    isMounted: false,
    subTree: null,
    slots,
    // keepalive 组件的实例才有 keepAliveCtx 属性
    keepAliveCtx: null,
  };
  // 检查当前组件是否是 KeepAlive 的组件
  const isKeepAlive = vnode.type.__isKeepAlive;
  if (isKeepAlive) {
    // 添加特有的对象 keepAliveCtx
    instance.keepAliveCtx = {
      move(vnode, container, anchor) {
        insert(vnode.component.subTree.el, container, anchor);
      },
      createElement,
    };
  }
}
```

#### include exclude 这两个props
配置那些需要，那些不需要缓存
```js
const keepalive = {
  // 标识
  __isKeepAlive: true,
  props: {
    include: RegExp,
    exclude: RegExp,
  },
  setup(props, { slots }) {
    // ...
    return () => {
      // keepalive 默认插槽就是要被 keepalive 的组件
      let rawVNode = slots.default();
      // 如果不是 组件，直接渲染
      // 也就是说 keepalive 只能 缓存组件
      if (typeof rawVNode !== "object") {
        return rawVNode;
      }

      const name = rawVNode.type.name;
      if (
        (name && props.include && !props.include.test(name)) ||
        (props.exclude && props.exclude.test(name))
      ) {
        return rawVNode;
      } else {
        // ...
      }
    };
  },
};
```

