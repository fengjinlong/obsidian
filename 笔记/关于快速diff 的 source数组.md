# 关于快速diff 的 source数组
## source 是什么
#### 1. source 每个元素与新的一组子节点中未处理的节点一一对应。
#### 2. source 初始值均为 -1。
#### 3. source 用来存储新的节点在旧的节点中的位置索引，存的是 新节点所对应的`旧节点的索引`。[ newKeyInOldChildrenIndex]
## source 作用
#### 用来计算出一个 `最长递归子序列`，辅助 dom 的移动操作。
## 构建 source 的方式
#### 1 利用双层 for 循环方式 时间复杂度 O(n^2)
1. 遍历旧节点，得到 oldVNode。
2. 遍历新节点，得到 newVNode。
3. 如果 oldVNode.key === newVNode.key
	1. patch打补丁
	2. source[ newIndex - newStart ] = oldIndex

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
    // for for
    const count = newEnd - j + 1;
    const source = new Array(count);
    source.fill(-1);
    const oldStart = j;
    const newStart = j;
    // 遍历旧节点
    for (let i = oldStart; i < oldEnd; i++) {
      const oldVNode = oldChildren[i];
      // 遍历新节点
      for (let k = newStart; k < newEnd; k++) {
        const newVNode = newChildren[k];
        // 相同
        if (newVNode.key === oldVNode.key) {
          patch(oldVNode, newVNode, container);
          // 填充数组
          source[k - newStart] = i;
        }
      }
    }
  }
```
#### 2 利用索引表方式 时间复杂度 O(n)
1. 构建 newVNodeKeyToIndex 对象，newVNodeKeyToIndex = { }。
2. 遍历 newChildren，得到 newVNodeKeyToIndex 的结构，{ newVNodeKey: newVNodeIndex }。
3. 遍历 oldChildren, 得到 oldVNode，从而得到oldVNodeKey。
4. 判断 newVNodeKeyToIndex 里面是否存在 oldVNodeKey，也就是判断 newVNodeKeyToIndex[ oldVNodeKey ] 是否有值？
	1. 有值。说明新旧节点存在相同key 的节点，需要进行打补丁。然后给 source 相应的元素赋值：source[ newVNodeKeyToIndex[ oldVNodeKey ] - newStart ] = oldIndex
	2. 无值。此时对应的 source 元素依然是初始值 -1。卸载此时的 oldVNode。

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
      } else {
        unmount(oldVNode);
      }
    }
  }
```