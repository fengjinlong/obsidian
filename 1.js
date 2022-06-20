function getsequence(arr) {
  const p = arr.slice();

  const result = [0];

  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arri = arr[i];

    if (arri !== 0) {
      j = result[result.length - 1];

      if (arr[j] < arri) {
        // 存储在 result 更新前的最后一个索引的值

        p[i] = j;

        // result.push(i);

        continue;
      }

      u = 0;

      v = result.length - 1;

      // 二分搜索，查找比 arri 小的节点，更新 result 的值

      while (u < v) {
        c = ((u + v) / 2) | 0;

        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }

        result[u] = i;
      }
    }
  }

  u = result.length;

  v = result[u - 1];

  // 回溯数组 p，找到最终的索引

  while (u-- > 0) {
    result[u] = v;

    v = p[v];
  }

  return result;
}

// diff
function add (){
  let a = 1
  function f() {
    let b = 1
  }
}