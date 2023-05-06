#### 更新流程

`update`流程与`mount`流程的区别。

对于`beginWork`：

- 删除
  - 能复用就复用
  - 不能复用，先标记删除，在创建
- 移动 ，多节点的移动就是diff

对于`completeWork`：标记 update flags 的过程

- 需要处理`HostText`内容更新的情况，标记 Update flag
- 需要处理`HostComponent`属性变化的情况

对于`commitWork`：

- 对于`ChildDeletion`，需要遍历被删除的子树
- 对于`Update`的 flags，需要更新文本内容

对于 useState
- 从数据共享层拿到 update 阶段的 useState

单节点 diff

- 这里的单节点指的是，新节点是单节点，老节点可能是多节点
- 对比type key ，如果存在不同，标记删除，再创建
多节点diff，**同级对比**，老的的 tree的结构，新的是 array 的结构

- 构建当前 fiber tree 的 map [ { key1, fiber1 },{ key2, fiber2 },{ key3, fiber3 },{ key4, fiber4 } ]
- 新 newReactElement 放在在 map 中查找是否存在复用的 fiber ，有就复用并在 map 中删除，没有就创建一个。此时 有一个 newFiber
- 最终构建一个 tree ，newFiber1 ---  newFiber2 ---newFiber3

- 老的 b1 c2 a3，新的 a3 b1 c2，哪些需要标记移动 flag
  - 首先定义当前最后不要移动的老节点的索引 lastOldIndexNoMove = 0
  - 因为我们遍历新 fiber的顺序是 从 0开始的，也就是 a3 b1 c2
    - 当遍历新节点 a3 时候，对应老节点的 a3 索引是 2，2 > 0 不需要移动，改变 lastOldIndexNoMove = 2
    - 当遍历新节点 b1 时候，对应老节点的 b1 索引是 0，0 < 2  需要移动，标记 移动flag
    - 当遍历新节点 c2 时候，对应老节点的 c2 索引是 1，1 < 2 不需要移动，标记 移动flag
- 此时 map 中 变成  [ { key4, fiber4 } ]，都标记删除