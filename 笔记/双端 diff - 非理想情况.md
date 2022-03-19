## 双端diff - 非理想情况
#### 这次我们讨论非理想状态，先看下图
![](Pasted%20image%2020220318222010.png)

按照双端diff 进行更新
第一步：旧节点的头节点p-1 与新节点的头节点p-2 对比，key不同，不可复用。
第二步：旧节点的尾节点p-4 与新节点的尾节点p-3 对比，key不同，不可复用。
第三步：旧节点的头节点p-1 与新节点的尾节点p-3 对比，key不同，不可复用。
第四步：旧节点的尾节点p-4 与新节点的头节点p-2 对比，key不同，不可复用。

这时候怎么办？看看非头部，非尾部是否可以复用。
具体做法：那新的一组子节点中头部节点（newStartVNode）去旧的节点中寻找。代码如下
```js
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步
    } else {
      // 遍历旧节点，查找是否存在与 newStartVNode 可复用的节点
      const idxInOld = oldChildren.find(node => node.key === newStartVNode.key)
    }
  }
``` 
这样做的目的是什么呢？🌻 看下图
![](Pasted%20image%2020220318225033.png)

当我们拿新的一组节点的头节点p-2 去旧的一组节点中查找，会在索引为1 的位置找到可复用的节点。这就意味着 节点 p-2 应该变成头节点，🏋‍♀ 。实现如下
```js
while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步
    } else {
      // 遍历旧节点，查找是否存在与 newStartVNode 可复用的节点
      const idxInOld = oldChildren.find(
        (node) => node.key === newStartVNode.key
      );
      if (idxInOld > 0) {
        /**
         * 1 patch 打补丁
         * 2 移动
         * 3 置空
         * 4 跟新索引值,变换更新的索引指向的dom
         */
        const vnodeToMove = oldChildren[idxInOld];
        patch(vnodeToMove, newStartVNode, container);
        insert(vnodeToMove.el, container, oldStartVNode.el);
        oldChildren[idxInOld] = undefined;
        newStartIdx++;
        newStartVNode = newChildren[newStartIdx];
      }
    }
  }
```
此操作后，新旧节点，dom 如下图
![](Pasted%20image%2020220318232806.png)
双端diff 继续进行
第一步：旧节点的头节点p-1 与新节点的头节点p-4 对比，key不同，不可复用。
第二步：旧节点的尾节点p-4 与新节点的尾节点p-3 对比，key不同，不可复用。
第三步：旧节点的头节点p-1 与新节点的尾节点p-3 对比，key不同，不可复用。
第四步：旧节点的尾节点p-4 与新节点的头节点p-4 对比，key相同，dom可以复用。

按照之前的双端diff逻辑，进行移动。
此操作后，新旧节点，dom 如下图
![](Pasted%20image%2020220319155503.png)

接着，进行下一轮循环比较。
第一步：旧节点的头节点p-1 与新节点的头节点p-1 对比，key相同，dom可以复用。
按照之前的双端diff逻辑，只需进行打补丁，不需要移动。
此操作后，新旧节点，dom 如下图
![](Pasted%20image%2020220319161018.png)
接着，进行下一轮循环比较。
此时，旧的头节点是 undefined。说明该节点已经被处理，直接跳过即可。补充代码逻辑，如下
```js
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (!oldStartVNode) {
      /**
       * 1 索引变换
       * 2 索引对应的节点 改变
       */
      oldStartIdx++;
      oldStartVNode = oldChildren[oldStartIdx];
    } else if (!oldEndVNode) {
      oldEndIdx--;
      oldEndVNode = oldChildren[oldEndIdx];
    } else if (oldStartVNode.key === newStartVNode.key) {
      // 第一步
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步
    } else {
      // 遍历旧节点，查找是否存在与 newStartVNode 可复用的节点
      const idxInOld = oldChildren.find(
        (node) => node.key === newStartVNode.key
      );
      if (idxInOld > 0) {
        /**
         * 1 patch 打补丁
         * 2 移动
         * 3 置空
         * 4 跟新索引值,变换更新的索引指向的dom
         */
        const vnodeToMove = oldChildren[idxInOld];
        patch(vnodeToMove, newStartVNode, container);
        insert(vnodeToMove.el, container, oldStartVNode.el);
        oldChildren[idxInOld] = undefined;
        newStartIdx++;
        newStartVNode = newChildren[newStartIdx];
      }
    }
  }
```
此操作后，新旧节点，dom 如下图
![](Pasted%20image%2020220319163005.png)
接着，进行下一轮循环比较。
第一步：旧节点的头节点p-3 与新节点的头节点p-3 对比，key相同，dom可以复用。
按照之前的双端diff逻辑，只需进行打补丁，不需要移动。
此操作后，新旧节点，dom 如下图。
![](Pasted%20image%2020220319163902.png)

#### 添加新元素的情况
情况如下图
![](Pasted%20image%2020220319213106.png)
第一步：我们发现没有可复用的节点。
第二步：拿新的一组节点中头节点p-4 去旧的一组节点中寻找相同key的节点，但是没有。说明节点p-4 是一个新增的节点。
第三步：因为这个新增的节点是新节点的头节点，而且没找到在旧节点中的相同节点，所以，只要将其插入到旧节点的头节点所指向的dom 之前即可。如下代码 🌵
```js
while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (!oldStartVNode) {
      /**
       * 1 索引变换
       * 2 索引对应的节点 改变
       */
      oldStartIdx++;
      oldStartVNode = oldChildren[oldStartIdx];
    } else if (!oldEndVNode) {
      oldEndIdx--;
      oldEndVNode = oldChildren[oldEndIdx];
    } else if (oldStartVNode.key === newStartVNode.key) {
      // 第一步
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步
    } else {
      // 遍历旧节点，查找是否存在与 newStartVNode 可复用的节点
      const idxInOld = oldChildren.find(
        (node) => node.key === newStartVNode.key
      );
      if (idxInOld > 0) {
        /**
         * 1 patch 打补丁
         * 2 移动
         * 3 置空
         * 4 跟新索引值,变换更新的索引指向的dom
         */
        const vnodeToMove = oldChildren[idxInOld];
        patch(vnodeToMove, newStartVNode, container);
        insert(vnodeToMove.el, container, oldStartVNode.el);
        oldChildren[idxInOld] = undefined;
      } else {
        // 将newStartVNode 作为新节点挂载到头部，使用 当前头部节点oldStartVnode.el 作为锚点
        patch(null, newStartIdx, container, oldStartVNode.el);
      }
      newStartIdx++;
      newStartVNode = newChildren[newStartIdx];
    }
  }
```

此时两组节点，dom 如下图
![](Pasted%20image%2020220319220953.png)
后续继续进行之前的逻辑更新。
##### 可是这样并不完美
看另外一个的例子
![](Pasted%20image%2020220319221334.png)
开始跑逻辑 🏃‍♂
第一步：旧节点的头节点p-1 与新节点的头节点p-4 对比，key不同，不可复用。
第二步：旧节点的尾节点p-3 与新节点的尾节点p-3 对比，key同，dom可复用, 进行更新逻辑。
更新后如下图 ❓
![](Pasted%20image%2020220319222314.png)
继续跑逻辑 🏃‍♂🏃‍♂
第一步：旧节点的头节点p-1 与新节点的头节点p-4 对比，key不同，不可复用。
第二步：旧节点的尾节点p-2 与新节点的尾节点p-2 对比，key同，dom可复用, 进行更新逻辑。
更新后如下图 ❓❓
![](Pasted%20image%2020220319222828.png)
继续跑逻辑 🏃‍♂🏃‍♂🏃‍♂
第一步：旧节点的头节点p-1 与新节点的头节点p-4 对比，key不同，不可复用。
第二步：旧节点的尾节点p-1 与新节点的尾节点p-1 对比，key同，dom可复用, 进行更新逻辑。
更新后如下图 ❓❓❓
![](Pasted%20image%2020220319223304.png)
此轮结束后，不满足循环条件，结束程序。
但是：新节点的头节点p-4 被遗漏了，没有被处理。
`需要添加边缘逻辑`
- 新节点是否有遗漏
- 旧节点是否有遗漏（也就是说，存在没有被处理的旧节点，但是更新已经完成，这些没有被处理的旧节点需要被删除。下一模块分析，移除不存在的元素）
  
代码：
```js
while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
  // ...
}
if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
  // 存在被遗漏的新节点，需要挂载
  for (let i = newStartIdx; i < newEndIdx; i++) {
    patch(null, newChildren[i], container, oldStartVNode.el);
  }
}
```
#### 移除不能存在的元素 
题如下图 🌲
![](Pasted%20image%2020220319225122.png)
跑的逻辑大同小异 🏃‍♂🏃‍♂，这里不逐一分析了。
最终更新逻辑执行完，如下图
![](Pasted%20image%2020220319231000.png)
`需要添加边缘逻辑`
- 旧节点是否有遗漏（也就是说，存在没有被处理的旧节点，但是更新已经完成，这些没有被处理的旧节点需要被删除）

```js
while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
  // ...
}
if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
  // 存在被遗漏的新节点，需要挂载
  for (let i = newStartIdx; i < newEndIdx; i++) {
    patch(null, newChildren[i], container, oldStartVNode.el);
  }
} else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
  // 移除操作
  for (let i = oldStartIdx; i < oldEndIdx; i++) {
    unmount(oldChildren[i]);
  }
}
```

