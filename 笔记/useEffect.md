*有了之前的逻辑，useEffect 的逻辑就相当简单了*
### 副作用是在 dom 挂载完成之后执行的，所以在commitWork 阶段后，统一执行 副作用
1. 当执行 useEffect 时候，将effectHook 收集到 一个数组，并关联到当前的 fiber 
```js
let effectHooks;
function useEffect(callback, deps) {
  const effectHook = {
    callback,
    deps,
  };
  effectHooks.push(effectHook);
  wipFiber.effectHooks = effectHooks;
}
```
2. 执行时机
```js
function commitRoot() {
  deletions.forEach(commitDeletion);
  commitWork(wipRoot.child);
  // 执行
  commitEffectHooks();
  currentRoot = wipRoot;
  console.log(currentRoot);
  wipRoot = null;
  deletions = [];
}
```
3. 执行阶段
```js
function commitEffectHooks() {
  function run(fiber) {
    if (!fiber) return;
    if (!fiber.alternate) {
      // 初始化阶段
      fiber.effectHooks?.forEach((hook) => {
        hook.callback();
      });
    } else {
	  // update 阶段，判断 deps
      fiber.effectHooks?.forEach((newHook, index) => {
        if (newHook.deps.length > 0) {
          const oldEffectHook = fiber.alternate?.effectHooks[index];
          const needUpdatee = oldEffectHook?.deps.some((oldDep, i) => {
            return oldDep !== newHook.deps[i];
          });
          if (needUpdatee) {
            newHook.callback();
          }
        }
      });
    }
	// 递归 节点
    run(fiber.child);
    run(fiber.sibling);
  }
  run(wipRoot);
}
```