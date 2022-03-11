## 实现组件代理对象

#### 目标
1. 在 render 里面通过 this 访问 setupState $el $data 等属性

#### 思路
![](Pasted%20image%2020220311171130.png)

1. setupState
	- 在执行setup 函数时候 创建代理对象proxy
	- get 时机判断key是否是setupState的key，是则返回
	- 调用render 时候，把proxy绑定到render 的this 上面

```js
function setupStatefulComponent(instance: any) {
  instance.proxy = new Proxy(
    {},
    {
      get(target, key) {
        const { setupState } = instance;
        if (key in setupState) {
          return setupState[key];
        }
      },
    }
  );
  // 省略部分代码
}

function setupRenderEffect(instance: any, initialVnode,container: any) {
  const {proxy} = instance;
  const subTree = instance.render.call(proxy);
  // 胜率部分代码
}

```
	
2. $el
	- 先把el 存到虚拟节点vnode
	- 所有初始化完成之后才能拿到 el，也就是patch element 后，需要把根节点substree的el赋值给vnode的el
	- 当代理对象 的 key是 $el时候，通过 instance - vnode - el 找到el

```js
// 1 存 el
function processElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type))
  // 省略部分代码
}

// 2 把根节点subsTree的el赋值给vnode的el
function setupRenderEffect(instance: any, initialVnode,container: any) {
  const {proxy} = instance;
  // 执行 render 是为了获取 vnode，然后进行 patch element
  const subTree = instance.render.call(proxy);

  patch(subTree, container);
  initialVnode.el = subTree.el
}

// 3 instance - vnode - el 取值
function setupStatefulComponent(instance: any) {
  instance.proxy = new Proxy(
    {},
    {
      get(target, key) {
        const { setupState } = instance;
        if (key in setupState) {
          return setupState[key];
        }
        if (key === "$el") {
          return instance.vnode.el;
        }
      },
    }
  );
  // 省略部分代码
}
```

