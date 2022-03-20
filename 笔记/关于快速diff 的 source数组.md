# 关于快速diff 的 source数组
## source 是什么
#### 1. source 每个元素与新的一组子节点中未处理的节点一一对应。
#### 2. source 初始值均为 -1。
#### 3. source 用来存储新的节点在旧的节点中的位置索引，存的是 新节点所对应的`旧节点的索引`。[ newKeyInOldChildrenIndex]
## source 作用
#### 用来计算出一个 `最长递归子序列`，辅助 dom 的移动操作。
## 构建 source 的方式
#### 1 利用双层 for 循环方式
1. 遍历旧节点，得到 oldVNode。
2. 遍历新节点，得到 newVNode。
3. 如果 oldVNode.key === newVNode.key
	1. patch打补丁
	2. source[ newIndex - newStart ] = oldIndex
#### 2 利用索引表方式
1. 构建 newVNodeKeyToIndex 对象，newVNodeKeyToIndex = { }。
2. 遍历 newChildren，得到 newVNodeKeyToIndex 的结构，{ newVNodeKey: newVNodeIndex }。
3. 遍历 oldChildren, 得到 oldVNode，从而得到oldVNodeKey。
4. 判断 newVNodeKeyToIndex 里面是否存在 oldVNodeKey，也就是判断 newVNodeKeyToIndex[ oldVNodeKey ] 是否有值？
	1. 有值。说明新旧节点存在相同key 的节点，需要进行打补丁。然后给 source 相应的元素赋值：source[ newVNodeKeyToIndex[ oldVNodeKey ] - newStart ] = oldIndex
	2. 无值。此时对应的 source 元素依然是初始值 -1。卸载此时的 oldVNode。