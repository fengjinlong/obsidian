## runtime-core 运行时流程
#### 目的
1. 将组件挂载到页面，组件 - vnode - element

#### 处理目标
1. 渲染 component 组件
2. 渲染 element 元素

#### 流程
1. 程序总体流程是将组件转换为虚拟节点，后续操作都是基于虚拟节点进行后续操作的
 
2. 用户调用方式
`createApp(App).mount(rootContainer)`

3. 由于根组件肯定是App，所以第一肯定是渲染 App 组件

```js
function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // 先创建 vnode
        // component -> vnode
        // 所有逻辑操作 都会基于 vnode 做处理
        const vnode = createVNode(rootComponent);
        // 渲染虚拟节点
        render(vnode, rootContainer);
      },
    }
}
```

4. 把App组件转换为虚拟节点
`const vnode = createVNode(rootComponent);`

5. 渲染虚拟节点
`render(vnode, rootContainer)`

6. render 就是渲染逻辑了。但里面有个patch方法。
```js
 function render(vnode, container) {
   // patch
   patch(null, vnode, container, null, null);
 }
```


7. patch 是为了出递归的情况，以及挂载 更新 卸载
```js
// 这里走的是  patch 组件的逻辑，processComponent

  function patch(n1, n2: any, container: any, parentComponent, anchor) {
    // 当vnode.type的值时，组件是object，element是string，这样区分组件和元素
    const { type, shapeFlag } = n2;
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent, anchor);
        break;
      case Text:
        processText(n1, n2, container);
        break;
      default:
        // if (typeof vnode.type === "string") {
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // patch element
          processElement(n1, n2, container, parentComponent, anchor);
          // } else if (isObject(vnode.type)) {
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // patch 组件
          console.log("组件逻辑");
          processComponent(n1, n2, container, parentComponent, anchor);
        }
    }
  }
```

8. patch 组件 `processComponent` , patch 组件有创建和更新 两个流程，从创建说起
	1. 创建组件实例，是为了挂载组件方法（vnode, slots，props, emit, type, setupState, isMounted, provides, parent 等等）。`instance = createComponentInstance(vnode)`
	2. 初始化组件的 props slots setupState。 `setupComponent(instance)`
		- setupState 是初始化有状态的组件（没有状态的组件是函数组件）。说人话就是 处理 setup 函数的返回值 `setupStatefulComponent(instance);` 赋值给组件实例的 setupState 属性
		- 拿到setup 的返回值，可能是对象，可能是方法。
			+ 返回值是Object，那需要把这个对象挂到组件上下文， `instance.setupState = proxyRefs(setupResult)`
			+ 返回值是function，那就是render函数
		- 给组件实例添加 render 方法。 instance.render = Component.render  
		- Component 的 render 哪来的？
			+ export const App = {
					render() {}
					setup() {}
				}
			+ temple 编译出来的 render

	3. 调用组件的 render 函数， `setupRenderEffect(instance, container)`
	```js
	// 组件
	import { h } from "../../lib/guide-mini-vue.esm.js";
	export const Foo = {
	  setup(props) {
		console.log("props", props)
	  },
	  render() {
		return h('p',{}, "foo "+ this.count)
	  }
	}
	```
	```js
	// 组件调用render 方法
	function setupRenderEffect(instance, container) {
		const subTree = instacne.render()
		// 也就是 subTree = h('p',{}, "foo "+ this.count)，subTree 是 虚拟节点 vnode
	}
	```

	现在拿到虚拟节点了，用 patch  Element 执行挂载的操作

	```js
	function setupRenderEffect(instance, container) {
		const subTree = instacne.render()
		// patch  Elements
		patch(subTree, container)
		// 也就是 patch 的 processElement 逻辑
		// 区分创建元素？更新元素？ 进行 元素，属性，children，挂载的操作
	}
	```


	