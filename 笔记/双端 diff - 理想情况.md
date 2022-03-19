## 双端diff-理想情况
#### 1 双端比较的原理
存在下图新旧子节点
![](image%201.png)

如果使用简单 diff，需要移动两次 dom，如下图
![](Pasted%20image%2020220317235506.png)

如果只是把旧节点的 p-3 对应的dom 移动到 旧节点的 p-1 前面，只需要移动一次 dom。双端 diff 可以做到这种操作。如下图
![](Pasted%20image%2020220318000927.png)

顾名思义，双端diff, 是一种同时对新旧两组节点的两个端点进行比较的算法，所以需要四个索引值。如下图 
![](Pasted%20image%2020220318002035.png)

代码表示
```javascript
function patchChildren(n1, n2, container) {
  if (typeof n2.children === "string") {
    // ... 元素
  } else if (Array.isArray(n2.children)) {
    patchKeyedChildren(n1, n2, container);
  } else {
    // ...
  }
}
function patchKeyedChildren(n1, n2, container) {
  const oldChildren = n1.children;
  const newChildren = n2.children;

  // 四个索引
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length - 1;
  // 四个索引指向的虚拟节点
  let oldStartVNode = oldChildren[oldStartIdx];
  let oldEndVNode = oldChildren[oldEndIdx];
  let newStartVNode = newChildren[newStartIdx];
  let newEndVNode = newChildren[newEndIdx];
}

```

双端比较中，分为四个步骤，如下图连线所示
![](Pasted%20image%2020220318003915.png)

第一步：旧的头节点p-1 与新的头节点p-4 比较，key不同，不可复用，什么都不做。
第二步：旧的尾结点p-4 与新的尾节点p-3 比较，key不同，不可复用，什么都不做。
第三步：旧的头节点p-1 与新的尾节点p-3 比较，key不同，不可复用，什么都不做。
第四步：旧的尾节点p-4 与新的头节点p-4 比较，key相同，dom可复用。

可以看出，旧的尾节点p-4 更新之后应该是第一个节点。在逻辑里应该这样解释：`将索引为 oldEndIdx 指向的虚拟节点所对应的dom 移动到索引为 oldStartIdx 指向的虚拟节点所对应的dom 的前面`

上代码
```js
function patchKeyedChildren(n1, n2, container) {
  const oldChildren = n1.children;
  const newChildren = n2.children;

  // 四个索引
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length - 1;
  // 四个索引指向的虚拟节点
  let oldStartVNode = oldChildren[oldStartIdx];
  let oldEndVNode = oldChildren[oldEndIdx];
  let newStartVNode = newChildren[newStartIdx];
  let newEndVNode = newChildren[newEndIdx];

  if (oldStartVNode.key === newStartVNode.key) {
    // 第一步
  } else if (oldEndVNode.key === newEndVNode.key) {
    // 第二步
  } else if (oldStartVNode.key === newEndVNode.key) {
    // 第三步
  } else if (oldEndVNode.key === newStartVNode.key) {
    // 第四步
    /**
     * 1 patch 节点打补丁
     * 2 移动
     * 3 更新索引值
     */
    // 1
    patch(oldEndVNode, newStartVNode, container);
    // 2
    insert(oldEndVNode.el, container, oldStartVNode.el);
    // 3
    oldEndIdx--;
    newStartIdx++;
    oldEndVNode = oldChildren[oldEndIdx];
    newStartVNode = newChildren[newStartIdx];
  }
}
```

此步骤后，新旧节点如下图
![](Pasted%20image%2020220318011338.png)
此时dom 顺序是 p-4 p-1 p-2 p-3，需要进行下一轮更新，需要一个循环逻辑，代码如下
```js
function patchKeyedChildren(n1, n2, container) {
  const oldChildren = n1.children;
  const newChildren = n2.children;

  // 四个索引
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length - 1;
  // 四个索引指向的虚拟节点
  let oldStartVNode = oldChildren[oldStartIdx];
  let oldEndVNode = oldChildren[oldEndIdx];
  let newStartVNode = newChildren[newStartIdx];
  let newEndVNode = newChildren[newEndIdx];
  // 循环条件是 头索引 小于等于 尾索引
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步
      /**
       * 1 patch 节点打补丁
       * 2 移动
       * 3 更新索引值
       */
      // 1
      patch(oldEndVNode, newStartVNode, container);
      // 2
      insert(oldEndVNode.el, container, oldStartVNode.el);
      // 3
      oldEndIdx--;
      newStartIdx++;
      oldEndVNode = oldChildren[oldEndIdx];
      newStartVNode = newChildren[newStartIdx];
    }
  }
}
```
第一次循环结束后，仍然满足循环条件，继续执行

第一步：旧的头节点p-1 与新的头节点p-2 比较，key不同，不可复用，什么都不做。
第二步：旧的尾节点p-3 与新的尾节点p-3 比较，key相同，dom可复用。此时 新旧节点都是尾节点，不需要dom 的移动，只需要进行打补丁操作。如下代码
```js
while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步
      /**
       * 1 patch 节点打补丁
       * 2 都是尾节点，不需要移动位置
       * 3 更新索引值
       */
      // 1
      patch(oldEndVNode, newEndVNode, container);
      // 3
      oldEndIdx--;
      newEndIdx--;
      oldEndVNode = oldChildren[oldEndIdx];
      newEndVNode = newChildren[newEndIdx];
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步
      /**
       * 1 patch 节点打补丁
       * 2 移动
       * 3 更新索引值
       */
      // 1
      patch(oldEndVNode, newStartVNode, container);
      // 2
      insert(oldEndVNode.el, container, oldStartVNode.el);
      // 3
      oldEndIdx--;
      newStartIdx++;
      oldEndVNode = oldChildren[oldEndIdx];
      newStartVNode = newChildren[newStartIdx];
    }
  }
```
此轮更新后，dom顺序没有改变，新旧节点以及dom 如下图
![](Pasted%20image%2020220318114549.png)

第二次循环后，仍然满足循环条件，继续执行。
第一步：旧的头节点p-1 与新的头节点p-2 比较，key不同，不可复用。
第二步：旧的尾节点p-2 与新的尾节点p-1 比较，key不同，不可复用。
第三步：旧的头节点p-1 与新的尾节点p-1 比较，key相同，dom可复用。
旧的头节点应该变成尾节点，只需要将旧p-1 对应dom 移动到 旧p-2 对应dom 的后面，即可。同样需要打补丁，更新索引。代码如下

```js
while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步
      /**
       * 1 patch 节点打补丁
       * 2 都是尾节点，不需要移动位置
       * 3 更新索引值
       */
      // 1
      patch(oldEndVNode, newEndVNode, container);
      // 3
      oldEndIdx--;
      newEndIdx--;
      oldEndVNode = oldChildren[oldEndIdx];
      newEndVNode = newChildren[newEndIdx];
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步
      /**
       * 1 patch 节点打补丁
       * 2 移动位置 旧的头节点对应dom 移动到旧尾节点对应dom 的后面
       * 更新索引值
       */
      // 1
      patch(oldStartVNode, newEndVNode);
      // 2
      insert(oldEndVNode.el, container, oldEndVNode.el.nextSibling);
      // 3
      oldStartIdx++;
      newEndIdx--;
      oldStartVNode = oldChildren[oldStartIdx];
      newEndVNode = newChildren[newStartIdx];
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步
      /**
       * 1 patch 节点打补丁
       * 2 移动
       * 3 更新索引值
       */
      // 1
      patch(oldEndVNode, newStartVNode, container);
      // 2
      insert(oldEndVNode.el, container, oldStartVNode.el);
      // 3
      oldEndIdx--;
      newStartIdx++;
      oldEndVNode = oldChildren[oldEndIdx];
      newStartVNode = newChildren[newStartIdx];
    }
  }
```
此轮循环更新后，新旧节点，dom 如下图
![](Pasted%20image%2020220318135939.png)

新旧两组节点头尾索引重合，但仍然满足循环条件，继续执行。
第一步：旧节点的头节点p-2 与新节点的头节点p-2 比较，key相同，dom可复用。此时 新旧节点都是头节点，不需要移动dom，只进行打补丁。代码如下
```js
while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步
      /**
       * 1 patch 节点打补丁
       * 2 都是头节点，不需要移动
       * 3 更新索引值
       */
      // 1
      patch(oldStartVNode, newStartVNode, container);
      // 3
      oldStartIdx++;
      newStartIdx++;
      oldStartVNode = oldChildren[oldStartIdx];
      newStartVNode = newChildren[newStartIdx];
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步
      /**
       * 1 patch 节点打补丁
       * 2 都是尾节点，不需要移动位置
       * 3 更新索引值
       */
      // 1
      patch(oldEndVNode, newEndVNode, container);
      // 3
      oldEndIdx--;
      newEndIdx--;
      oldEndVNode = oldChildren[oldEndIdx];
      newEndVNode = newChildren[newEndIdx];
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步
      /**
       * 1 patch 节点打补丁
       * 2 移动位置 旧的头节点对应dom 移动到旧尾节点对应dom 的后面
       * 更新索引值
       */
      // 1
      patch(oldStartVNode, newEndVNode);
      // 2
      insert(oldEndVNode.el, container, oldEndVNode.el.nextSibling);
      // 3
      oldStartIdx++;
      newEndIdx--;
      oldStartVNode = oldChildren[oldStartIdx];
      newEndVNode = newChildren[newStartIdx];
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步
      /**
       * 1 patch 节点打补丁
       * 2 移动
       * 3 更新索引值
       */
      // 1
      patch(oldEndVNode, newStartVNode, container);
      // 2
      insert(oldEndVNode.el, container, oldStartVNode.el);
      // 3
      oldEndIdx--;
      newStartIdx++;
      oldEndVNode = oldChildren[oldEndIdx];
      newStartVNode = newChildren[newStartIdx];
    }
  }
```
此轮更新后，dom顺序没有改变，新旧节点以及dom 如下图
![](Pasted%20image%2020220318143132.png)
此时，dom节点顺序与新的一组节点顺序相同了，4-2-1-3。同时不满足循环条件，跳出循环。
双端 diff 算法执行完毕。

