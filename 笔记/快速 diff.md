# 快速diff
#### vue.js 3 借鉴的快速diff 性能要稍优于 vue.js 2 的双端diff算法。
## 预处理步骤
#### 借鉴了纯文本的diff思路
##### 例如
1. 两端文本进行diff 之前，先进行全等比较
```js
if (text1 === text2) return // 快捷路径
```
2. 处理两段文本相同的前缀和后缀

T1: `I use` vue
T2: `I use` react

真正要diff 的部分是
```js
T1: vue
T2: react
```
##### 快速diff 借鉴了纯文本diff 的处理步骤。
##### 需要新增的情况
如下两组子节点
```js
旧节点：p-1 p-2 p-3
新节点：p-1 p-4 p-2 p-3
```
###### 对于相同的前置节点和后置节点，由于在新旧节点的相对位置不变，所以无需移动，只需要进行打补丁。
对于前置节点，建立索引 j ，其初始值为 0 ，用来指向两组节点的开头 如下图
![](Pasted%20image%2020220321223602.png)
开启一个 while 循环，让 j 递增，直到遇见不同节点为止，如下面 patchKeyedChildren 函数
```js
function patchKeyedChildren(n1, n2, container) {
  const newChildren = n2.children;
  const oldChildren = n1.children;
  // 处理相同的前置节点
  let j = 0;
  let oldVNode = oldChildren[j];
  let newVNode = newChildren[j];
  // 直到遇见不相同的节点为止
  while (oldVNode.key === newVNode.key) {
    // 打补丁
    patch(oldVNode, newVNode, container);
    j++;
    oldVNode = oldChildren[j];
    newVNode = newChildren[j];
  }
  // 完成前置节点的更新
}
```
此操作后，状态如下图
![](Pasted%20image%2020220321225322.png)
接下里处理相同的后置节点，由于新旧节点不一定长度相等，所以需要两个索引 newEnd 和 oldEnd，分别指向新旧节点的尾节点，如下图
![](Pasted%20image%2020220321230055.png)
再开启一个 while ，从后向前遍历两组节点，直到遇见key 不相同的节点为止，代码如下
```js
function patchKeyedChildren(n1, n2, container) {
  const newChildren = n2.children;
  const oldChildren = n1.children;
  // 处理相同的前置节点
  let j = 0;
  let oldVNode = oldChildren[j];
  let newVNode = newChildren[j];
  // 直到遇见不相同的节点为止
  // 完成前置节点的更新
  while (oldVNode.key === newVNode.key) {
    // 打补丁
    patch(oldVNode, newVNode, container);
    j++;
    oldVNode = oldChildren[j];
    newVNode = newChildren[j];
  }
  // 处理后置节点
  // 完成后置节点的更新
  let newEnd = newChildren.length - 1;
  let oldEnd = oldChildren.length - 1;
  oldVNode = oldChildren[oldEnd];
  newVNode = newChildren[newEnd];
  while (oldVNode.key === newVNode.key) {
    // 打补丁
    patch(oldVNode, newVNode, container);
    newEnd--;
    oldEnd--;
    oldVNode = oldChildren[oldEnd];
    newVNode = newChildren[newEnd];
  }
}
```
此操作后，状态如下图
![](Pasted%20image%2020220321231553.png)
此时旧节点已经处理完毕，但是新节点还有遗留，也就是需要新增的节点。
`结论：`
1. 条件一 oldEnd < j，说明预处理过程中，所有旧节点 都处理完毕。
2. 条件二 newEnd >= j,说明预处理过程中，新节点中 有遗留的新节点没有处理，应视为 新增节点。

条件一和条件二同时满足，说明新的节点中遗留的节点都是要新增的节点。需要将它们挂载到正确的位置。如下图
![](Pasted%20image%2020220322150203.png)

节点p-2 对应的真实dom 就是挂载操作的锚点元素。
```js
function patchKeyedChildren(n1, n2, container) {
  const newChildren = n2.children;
  const oldChildren = n1.children;
  // 处理相同的前置节点
  let j = 0;
  let oldVNode = oldChildren[j];
  let newVNode = newChildren[j];
  // 直到遇见不相同的节点为止
  // 完成前置节点的更新
  while (oldVNode.key === newVNode.key) {
    // 打补丁
    patch(oldVNode, newVNode, container);
    j++;
    oldVNode = oldChildren[j];
    newVNode = newChildren[j];
  }
  // 处理后置节点
  // 完成后置节点的更新
  let newEnd = newChildren.length - 1;
  let oldEnd = oldChildren.length - 1;
  oldVNode = oldChildren[oldEnd];
  newVNode = newChildren[newEnd];
  while (oldVNode.key === newVNode.key) {
    // 打补丁
    patch(oldVNode, newVNode, container);
    newEnd--;
    oldEnd--;
    oldVNode = oldChildren[oldEnd];
    newVNode = newChildren[newEnd];
  }
  // 预处理完成，如果满足如下条件，则说明从 j --- newEnd 之间的节点
  if (j > oldEnd && j <= newEnd) {
    // 锚点的索引
    const anchorIndex = newEnd + 1;
    // 锚点元素
    const anchor =
      anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
    while (j <= newEnd) {
      patch(null, newChildren[j], container, anchor);
    }
  }
}
```
##### 需要删除的情况
如下图
![](Pasted%20image%2020220322162041.png)
然后的逻辑就是对相同的前置节点和后置节点进行 预处理。
状态如下
![](Pasted%20image%2020220322163638.png)
对比新增的逻辑，代码如下
```js
function patchKeyedChildren(n1, n2, container) {
  const newChildren = n2.children;
  const oldChildren = n1.children;
  // 处理相同的前置节点
  let j = 0;
  let oldVNode = oldChildren[j];
  let newVNode = newChildren[j];
  // 直到遇见不相同的节点为止
  // 完成前置节点的更新
  while (oldVNode.key === newVNode.key) {
    // 打补丁
    patch(oldVNode, newVNode, container);
    j++;
    oldVNode = oldChildren[j];
    newVNode = newChildren[j];
  }
  // 处理后置节点
  // 完成后置节点的更新
  let newEnd = newChildren.length - 1;
  let oldEnd = oldChildren.length - 1;
  oldVNode = oldChildren[oldEnd];
  newVNode = newChildren[newEnd];
  while (oldVNode.key === newVNode.key) {
    // 打补丁
    patch(oldVNode, newVNode, container);
    newEnd--;
    oldEnd--;
    oldVNode = oldChildren[oldEnd];
    newVNode = newChildren[newEnd];
  }
  // 预处理完成，如果满足如下条件，则说明从 j --- newEnd 之间的节点
  if (j > oldEnd && j <= newEnd) {
    // 锚点的索引
    const anchorIndex = newEnd + 1;
    // 锚点元素
    const anchor =
      anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
    while (j <= newEnd) {
      patch(null, newChildren[j], container, anchor);
    }
  } else if (j > newEnd && j <= oldEnd) {
    // 卸载
    while (j <= oldEnd) {
      unmount(oldChildren[j]);
    }
  }
}
```
##### 复杂的例子
![](Pasted%20image%2020220322221155.png)
预处理后的状态
![](Pasted%20image%2020220322221551.png)
无论是简单diff 双端diff 快速diff 处理原则都是
- 判断是否有需要移动的节点，以及怎么移动
- 找出那些需要被添加或移除的节点
在处理过程中，发现不满足下面条件,代码需要添加 else 分支处理非理想情况
- j > oldEnd && j <= newEnd
- j > newEnd && j <= oldEnd

首先，我们构架一个 source 数组，长度是新的一组节点在经过预处理后剩余未处理的数量，初始值为 -1。
关于source 的详细介绍 [关于快速diff 的 source数组](关于快速diff%20的%20source数组.md) 

##### source 填充完毕，如何判断节点是否需要移动
快速diff 判断节点是否需要移动与 简单diff 是类似的
我们在简单diff提到，如果遍历过程中，遇到的索引值呈现递增趋势，说明不需要移动节点，反之则需要。
```js
 if (j > oldEnd && j <= newEnd) {
    // 锚点的索引
    const anchorIndex = newEnd + 1;
    // 锚点元素
    const anchor =
      anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
    // 添加
    while (j <= newEnd) {
      patch(null, newChildren[j], container, anchor);
    }
  } else if (j > newEnd && j <= oldEnd) {
    // 卸载
    while (j <= oldEnd) {
      unmount(oldChildren[j]);
    }
  } else {
    const count = newEnd - j + 1;
    const source = new Array(count);
    source.fill(-1);
    const oldStart = j;
    const newStart = j;

    // 新增两个变量 moved pos
    let moved = false;
    let pos = 0;

    // 构建索引表
    const keyIndex = {};
    for (let i = newStart; i < oldEnd; i++) {
      keyIndex[newChildren[i].key] = i;
    }
    // 遍历旧节点未处理的节点
    for (let i = oldStart; i < oldEnd; i++) {
      oldVNode = oldChildren[i];
      // 通过索引表快速查找到新的一组节点中具有相同key 的节点位置
      const k = keyIndex[oldVNode.key];
      if (typeof k !== "undefined") {
        newVNode = newChildren[k];
        patch(oldVNode, newVNode, container);
        source[k - newStart] = i;
        // need move ？
        if (k < pos) {
          moved = true;
        } else {
          pos = k;
        }
      } else {
        unmount(oldVNode);
      }
    }
  }

```
存在一个优化点，`已经更新过的节点数量 patched <= 新的节点中需要更新的数量 count`
```js
  if (j > oldEnd && j <= newEnd) {
    // 锚点的索引
    const anchorIndex = newEnd + 1;
    // 锚点元素
    const anchor =
      anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
    // 添加
    while (j <= newEnd) {
      patch(null, newChildren[j], container, anchor);
    }
  } else if (j > newEnd && j <= oldEnd) {
    // 卸载
    while (j <= oldEnd) {
      unmount(oldChildren[j]);
    }
  } else {
    const count = newEnd - j + 1;
    const source = new Array(count);
    source.fill(-1);
    const oldStart = j;
    const newStart = j;

    // 新增两个变量 moved pos
    let moved = false;
    let pos = 0;

    // 构建索引表
    const keyIndex = {};
    for (let i = newStart; i < oldEnd; i++) {
      keyIndex[newChildren[i].key] = i;
    }
    let patched = 0;
    // 遍历旧节点未处理的节点
    for (let i = oldStart; i < oldEnd; i++) {
      oldVNode = oldChildren[i];
      if (patched <= count) {
        // 通过索引表快速查找到新的一组节点中具有相同key 的节点位置
        const k = keyIndex[oldVNode.key];
        if (typeof k !== "undefined") {
          newVNode = newChildren[k];
          patch(oldVNode, newVNode, container);
          source[k - newStart] = i;
          patched++;
          // need move ?
          if (k < pos) {
            moved = true;
          } else {
            pos = k;
          }
        } else {
          // 没找到,卸载
          unmount(oldVNode);
        }
      } else {
        // 卸载多余的
        unmount(oldVNode);
      }
    }
  }
```

#### 如何移动节点
未为了进行dom移动，需要计算 source 的最长递归子序列。此时状态如下图
![](Pasted%20image%2020220323151044.png)
source 数组是 [2, 3, 1, -1]
source 最长递增子序列是 [2, 3],得到其索引是 [0, 1]
`[0, 1] 它的含义是 在新的一组节点中，重新编号后索引值为 0 和 1 的两个节点在更新前后顺序不变。`
也就是说，节点 p-3 p-4 对应的真实 dom 不需要移动。节点 p-2 p-7 可能需要移动。
为了完成移动，还需要创建两个索引 i s，如下图
- i 指向新的一组节点中最后一个节点
- s 指向最长递增子序列中最后一个元素
![](Pasted%20image%2020220323155028.png)
```js
  if (moved) {
    const seq = lis(source);
    let s = seq.length - 1;
    let i = count - 1;
    for (let i; i >= 0; i--) {
      if (i !== seq[s]) {
        // 该节点需要移动
      } else {
        // 不需要移动
        // i === seq[s] 时，该节点不需要移动
        s--;
      }
    }
  }
```
跑程序 🏃‍♂
1. 初始 i 指向 指向节点 p-7。由于p-7 对应的source 是-1，也就是节点p-7 需要作为新节点进行挂载
```js
    if (moved) {
      const seq = lis(source);
      let s = seq.length - 1;
      let i = count - 1;
      for (let i; i >= 0; i--) {
        if (source[i] === -1) {
          // 新节点，挂载
          // 该节点在newChilren 真实的位置
          const pos = i + newStart;
          const newVNode = newChildren[pos];
          // 该节点下一个位置
          const nextPos = pos + 1;
          // 锚点
          const anchor =
            nextPos <= newChildren.length ? newChildren[nextPos] : null;
          // 挂载
          patch(null, newVNode, container, anchor);
        } else if (i !== seq[s]) {
          // 需要移动
        } else {
          // 不需要移动
          // i === seq[s] 时，该位置不需要移动
          s--;
        }
      }
    }
```
2. 上一步执行完毕，for 继续，i--。s是1， i 是 2，source[i] 不等于 -1，seq[s] === 1, i!== seq[s]，p-2 需要移动。
思路类似挂载新节点，但 移动节点是通过 insert

```js
 if (moved) {
    const seq = lis(source);
    let s = seq.length - 1;
    let i = count - 1;
    for (let i; i >= 0; i--) {
      if (source[i] === -1) {
        // 新节点，挂载
        // 该节点在newChilren 真实的位置
        const pos = i + newStart;
        const newVNode = newChildren[pos];
        // 该节点下一个位置
        const nextPos = pos + 1;
        // 锚点
        const anchor =
          nextPos <= newChildren.length ? newChildren[nextPos] : null;
        // 挂载
        patch(null, newVNode, container, anchor);
      } else if (i !== seq[s]) {
        // 需要移动
        // 该节点在newChilren 真实的位置
        const pos = i + newStart;
        const newVNode = newChildren[pos];
        // 该节点下一个位置
        const nextPos = pos + 1;
        // 锚点
        const anchor =
          nextPos <= newChildren.length ? newChildren[nextPos] : null;
        // 移动
        insert(newVNode.el, container, anchor);
      } else {
        // 不需要移动
        // i === seq[s] 时，该位置不需要移动
        s--;
      }
    }
  }

```
3. 进入下一轮循环。
```js
s 是 1
i 是 1
seq[s] 是 1
source[i] 是 3 不等于 -1，不走挂载逻辑
i 等于 seq[s], 走 不需要移动逻辑, 即 s--
```
`这里执行不需要移动的逻辑，s--。但不需要进行patch 逻辑了，因为在 构建source 时候已经执行了一次patch `

4. 进入下一轮循环。同 上一次的 逻辑。
