### 简单的diff

1.  当新旧节点的`子节点` 都是数组节点，为了以最小性能开销完成更新，比较两组子节点，用于比较的算法就是Diff 算法。
2.  假设新旧节点如下

```JavaScript
const oldVnode = {
  type: "div",
  children: [
    { type: "p", children: "1" },
    { type: "p", children: "2" },
    { type: "p", children: "3" },
  ],
};

const newVnode = {
  type: "div",
  children: [
    { type: "p", children: "4" },
    { type: "p", children: "5" },
    { type: "p", children: "6" },
  ],
};
```

直接更新p 标签对应的文本节点，只进行3次dom操作

![](image.png)

```JavaScript
function patchChildren(n1, n2, container) {
  if (n2.children === "string") {
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;
    for (let i = 0; i < oldChildren.length; i++) {
      **patch(oldChildren[i], newChildren[i]);**
    }
  } else {
  }
}
```

3.  存在的问题就是加入新旧节点的长度不一样，上面逻辑就不适用了。

-   如果新的长，将多的新的节点挂载。
-   如果旧的长，将多的旧的节点卸载。

![](image%20(1).png)


```JavaScript
function patchChildren(n1, n2, container) {
  if (n2.children === "string") {
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;

    const oldLen = oldChildren.length;
    const newLen = newChildren.length;

    const commonLength = Math.min(oldLen, newLen);

    for (let i = 0; i < commonLength; i++) {
      patch(oldChildren[i], newChildren[i]);
    }
    if (newLen > oldLen) {
      // 挂载
      for (let i = commonLength; i < newLen; i++) {
        patch(null, newChildren[i]);
      }
    } else if (newLen < oldLen) {
      // 卸载
      for (let i = commonLength; i < oldLen; i++) {
        unmount(oldChildren[i]);
      }
    }
  } else {
  }
}
```

4.  如果新旧节点如果只是顺序不同，那么只需要移动节点便完成了更新

![](image%201.png)

所以新旧两组节点只要确定存在可复用的节点。

```JavaScript
const oldChildren = {
  type: "p",
  key: 1,
  children: "text 1",
};

const newChildren = {
  type: "p",
  key: 1,
  children: "text 2",
};
```

只要节点的type ,key 相同，那就是相同的节点，就可以进行复用dom 元素，即通过移动操作完成更新。但仍然需要对两个虚拟进行打补操作，因为文本节点已经改变。1 复用 2 移动

复用相同dom 的逻辑

```JavaScript
function patchChildren(n1, n2, container) {
  if (n2.children === "string") {
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;

    const oldLen = oldChildren.length;
    const newLen = newChildren.length;
    for (let i = 0; i < newLen; i++) {
      const newVNode = newChildren[i];
      for (let j = 0; j < oldLen; j++) {
        const oldVNode = oldChildren[j];

        if (newVNode.key === oldVNode.key) {
          patch(oldVNode, newVNode);
          break;
        }
      }
    }
  } else {
  }
}
```

移动相同 dom 的逻辑

-   不需要移动的🌰

![](Pasted%20image%2020220314144916.png)

新旧两组节点的顺序不变时，不需要移动。

-   特点
    1.  第一步：取新节点中的 p-1,它的key 是1，在旧节点中找到相同key的可复用节点，能够找到，该新节点对应的旧节点的索引是0
    2.  第二步：取新节点中的 p-2,它的key 是2，在旧节点中找到相同key的可复用节点，能够找到，该新节点对应的旧节点的索引是1
    3.  第三步：取新节点中的 p-3,它的key 是3，在旧节点中找到相同key的可复用节点，能够找到，该新节点对应的旧节点的索引是2
    4.  这个过程中，每次找到可复用节点时，都会记录该可复用节点在旧的一组节点中的位置索引，可以得到一个递增序列。0 1 2。这种情况不需要移动。

需要移动的🌰

![](Pasted%20image%2020220314144807.png)

-   特点
    1.  第一步：取新节点中的 p-3,它的key 是3，在旧节点中找到相同key的可复用节点，能够找到，该新节点对应的旧节点的索引是2
        
    2.  第二步：取新节点中的 p-1,它的key 是1，在旧节点中找到相同key的可复用节点，能够找到，该新节点对应的旧节点的索引是0。
        
        到了这一步我们发现，索引值递增序列被打破了。节点p-1 在旧的children 的索引是0，它小于节点p-3在旧children 中的索引2。`说明节点p-1在旧的children中排在节点p-3前面，但在新的children中，它在p-3的后面。所以，p-1对应的真实dom需要移动。`
        
    3.  第三步：取新节点中的 p-2,它的key 是2，在旧节点中找到相同key的可复用节点，能够找到，该新节点对应的旧节点的索引是1。
        
        节点p-2 在旧的children 的索引是1，它小于节点p-3在旧children 中的索引2。`说明节点p-2在旧的children中排在p-3的前面，但在新的children中排在p-3的后面。所以 p-2 对应的真实dom需要移动。`
        
    4.  等到 2 0 1 的序列，不符合递增序列。
        
-   p-3 在旧的children的索引定义为：`在旧的children 中找到具有相同key值节点的过程中，遇到最大的索引值`，在后续的查找中，存在比当前遇到的最大的索引值要小的节点，就意味该节点需要移动。（旧的索引肯定是递增的，新的节点对应的索引如果不是递增，那么久需要移动此节点）
```js
function patchChildren(n1, n2, container) {
  if (n2.children === "string") {
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;

    const oldLen = oldChildren.length;
    const newLen = newChildren.length;
    const lastIndex = 0;
    for (let i = 0; i < newLen; i++) {
      const newVNode = newChildren[i];
      for (let j = 0; j < oldLen; j++) {
        const oldVNode = oldChildren[j];

        if (newVNode.key === oldVNode.key) {
          patch(oldVNode, newVNode);
          if (lastIndex > j) {
            // 当前的新节点找到的对应的旧节点的索引小于之前找到的 最索引值
            // 需要移动
          } else {
            lastIndex = j;
          }
          break;
        }
      }
    }
  } else {
  }
}
```

移动指的移动真实dom，不是移动虚拟节点。既然移动dom，必须取到它的引用。一个虚拟节点被挂载后，与其对应的真实dom会存储在 vnode.el 属性里。

当调用更新逻辑时候，渲染器会调用 patchElement 函数在新旧节点之前打补丁。

```JavaScript
function patchElement(n1, n2) {
  // ...
  // dom 元素复用后，新节点就有了对真实dom 的引用
  const el = n2.el = n1.el
  // ...
}
```
![](Pasted%20image%2020220314172718.png)

p-1 对应的真实dom需要移动到p-3对应的真实dom的后面，此时dom的顺序变成 p-2, p-3, p-1。

p-2 对应的真实dom需要移动到p-3对应的真实dom的后面，也在p-1对应的真实dom后面，此时dom的顺序变成p-3, p-1, p-2更新完成。

![](Pasted%20image%2020220314174926.png)

```js

function patchChildren(n1, n2, container) {
  if (n2.children === "string") {
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;

    const oldLen = oldChildren.length;
    const newLen = newChildren.length;
    const lastIndex = 0;
    for (let i = 0; i < newLen; i++) {
      const newVNode = newChildren[i];
      for (let j = 0; j < oldLen; j++) {
        const oldVNode = oldChildren[j];

        if (newVNode.key === oldVNode.key) {
          patch(oldVNode, newVNode);
          if (lastIndex > j) {
            // 当前的新节点找到的对应的旧节点的索引小于之前找到的 最索引值
            // 需要移动

            // 上一个节点
            const prevVNode = newChildren[i - 1];
            if (prevVNode) {
              // 将 newVNode 对应的dom移动到 prevVNode 对应的dom的后面
              // 所以我们要获取 prevVNode 对应dom的下一个兄弟节点，将其作为锚点
              const anchor = prevVNode.el.nextSibling;

              // 调用insert 将 newVNode 对应的dom 插入到锚点的前面，也就是prevVnode对应dom的后面
              insert(newVNode.el, container, anchor);
            } else {
              // 如果 prevVNode 不存在，说明当前 newVNode 是第一个节点，不需要移动
            }
          } else {
            lastIndex = j;
          }
          break;
        }
      }
    }
  } else {
  }
}
```
insert 函数依赖浏览器原生的 insertBefore 函数

```JavaScript
const renderer = createRenderer({
  // ...
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor);
  },
  // ...
});

```

5. 添加新元素

![](Pasted%20image%2020220315000335.png)

-   找到新増节点
-   将新增节点挂载到正确位置

思路

-   第一步，取新的一组节点中的第一个节点p-3，它的key值是3，找到可复用的节点，该节点在旧的一组节点中索引值是2。此时变量lastIndex=0, 索引值2 > 0，所以p-3对应的dom不能移动，将lastIndex 更新为 2。
    
-   第二步，取新的一组节点中第二个节点p-3，它的key是1，找到可复用的节点，该节点在旧的一组节点中索引值是0。此时变量 lastIndex=2,索引值0 < 2，所以p-1对应的dom需要移动，并且应该移动到p-3对应的dom的后面。
    
    此时的dom 顺序是 p-2 p-3 p-1
    
-   第三步，取新的一组节点中的第三个节点p-4,它的key是4，没有找到可复用节点，因此渲染器会把p-4看做新节点并挂载。由于p-4 在节点p-1的后面，所以需要把p-4挂载到p-1对应的dom的后面。
    
    此时dom：p-2 p-3 p-1 p-4
    
-   第四步，取新的一组节点中的第四个节点p-2,它的可以是2，找到可复用的节点，该节点在旧的一组节点中的索引是1。此时lastIndex=2，1<2,所以p-2对应的dom需要移动，移动到p-4的后面
    
    此时dom：p-3 p-1 p-4 p-2
	
	![](Pasted%20image%2020220315171754.png)
	
```js
function patchChildren(n1, n2, container) {
  if (n2.children === "string") {
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;

    const oldLen = oldChildren.length;
    const newLen = newChildren.length;
    const lastIndex = 0;
    for (let i = 0; i < newLen; i++) {
      const newVNode = newChildren[i];

      /**
       * find 初始没有找到
       * 新节点在旧节点中找到了对应的可复用节点 find = true
       *
       * 如果没找到，此时的新节点需要进行添加操作
       *
       */
      let find = false;
      for (let j = 0; j < oldLen; j++) {
        const oldVNode = oldChildren[j];

        if (newVNode.key === oldVNode.key) {
          find = true;
          patch(oldVNode, newVNode);
          if (lastIndex > j) {
            // 当前的新节点找到的对应的旧节点的索引小于之前找到的 最索引值
            // 需要移动

            // 上一个节点
            const prevVNode = newChildren[i - 1];
            if (prevVNode) {
              // 将 newVNode 对应的dom移动到 prevVNode 对应的dom的后面
              // 所以我们要获取 prevVNode 对应dom的下一个兄弟节点，将其作为锚点
              const anchor = prevVNode.el.nextSibling;

              // 调用insert 将 newVNode 对应的dom 插入到锚点的前面，也就是prevVnode对应dom的后面
              insert(newVNode.el, container, anchor);
            } else {
              // 如果 prevVNode 不存在，说明当前 newVNode 是第一个节点，不需要移动
            }
          } else {
            lastIndex = j;
          }
          break;
        }
      }
      if (!find) {
        // 添加 新节点
        // 找锚点
        const prevVNode = newChildren[i - 1];
        let anchor = null;

        if (prevVNode) {
          anchor = prevVNode.el.nextSibling;
        } else {
          anchor = container.firstChild;
        }
        // 挂载
        patch(null, newVNode, container, anchor);
      }
    }
  } else {
  }
}
```
此时的patch 函数
```js
function patch(n1, n2, container, anchor) {
  // ...
  if (typeof type === "string") {
    if (!n1) {
      // 挂载
      mountElement(n2, container, anchor);
    } else {
      // 更新
      patchElement(n1, n2);
    }
  } else if (type === Text) {
  } else if (type === Fragment) {
  }
}
function mountElement(vnode, container, anchor) {
  insert(el, container, anchor);
}

```
移除不存在的节点

思路
  - 基本更新结束后，遍历一组旧的节点，然后在新的一组节点中寻找具有相同key的节点
  - 找不到的话直接删除节点

```javascript

function patchChildren(n1, n2, container) {
  if (typeof n2.children === "string") {
    // ... element
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;
    let lastIndex = 0;
    for (let i = 0; i < newChildren.length; i++) {
      // 判断更新的逻辑
    }
    // 旧节点是否存在 没有出现在新的子节点组里的节点
    for (let i = 0; i < oldChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const has = newChildren.find((vnode) => vnode.key === oldVNode.key);
      if (!has) {
        // 如果不在新的子节点里，卸载
        unmount(oldVNode);
      }
    }
  } else {
  }
```

