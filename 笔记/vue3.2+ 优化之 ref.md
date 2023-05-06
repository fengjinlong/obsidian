## 加深了对上篇文章的理解 
[响应式 API 的优化-ref](Vue.js%203.2+%20关于响应式部分的优化.md#响应式%20API%20的优化-ref)



# 一 reactive 收集，触发依赖过程是这样的(只展示主要逻辑)
## 1 track
```ts

export function track(target: any, key: any) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  trackEffects(dep);
}
export function trackEffects(dep) {
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}
```
## 2 trigger
```ts

export function trigger(target: any, key: any) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  triggerEffects(dep);
}

export function triggerEffects(dep: any) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
```

# 二 vue3.2 之前的 ref 实现
```ts

class RefImpl<T> {
  constructor(value: T, public readonly _shallow = false) {
    this._rawValue = _shallow ? value : toRaw(value)
    this._value = _shallow ? value : convert(value)
  }

  get value() {
    track(toRaw(this), TrackOpTypes.GET, 'value')
    return this._value
  }

  set value(newVal) {
    newVal = this._shallow ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = this._shallow ? newVal : convert(newVal)
      trigger(toRaw(this), TriggerOpTypes.SET, 'value', newVal)
    }
  }
}
```

# 三 vue3.2 之后的 ref 实现
```ts

class RefImpl {
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    // 也就是 trackEffects(ref.dep);
	//	if (dep.has(activeEffect)) return;
	//	dep.add(activeEffect);
	//	activeEffect.deps.push(dep);
    return this._value;
  }
  set value(newValue: any) {
    if (hasChanged(newValue, this._rawValue)) {
      this._value = convert(newValue);
      this._rawValue = newValue;
      triggerEffects(this.dep);
    }
  }
}
```

# 总结
#### 其实这个优化逻辑很简单，ref 只是一个 value 的操作，不会有其他 key。显然，`track` 函数内部可能需要做多次判断和设置逻辑，而把依赖保存到 `ref` 对象的 `dep` 属性中则省去了这一系列的判断和设置，从而优化性能。优化的数据很可观。

-   More efficient ref implementation (~260% faster read / ~50% faster write)
- 过来就是 `ref` API 的读效率提升约为 `260%`，写效率提升约为 `50%` 