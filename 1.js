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
}
