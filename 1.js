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
        patch(null, newStartIdx, container, oldStartVNode.el);
      }
      newStartIdx++;
      newStartVNode = newChildren[newStartIdx];
    }
  }
}

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
  }
}
const MyComponent = {
  name: "MyComponent",
  render() {
    return {
      type: "div",
      children: "text",
    };
  },
};
