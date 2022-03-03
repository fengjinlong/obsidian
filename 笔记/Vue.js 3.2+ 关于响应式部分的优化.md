![细说 Vue.js 3.2 关于响应式部分的优化](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48197505d2964c07890deccba4f48f04~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp)

## 背景
1. 背景
vue 3 正式版已经发布，Vue.js 3.2 已经[正式发布](https://link.juejin.cn/?target=https%3A%2F%2Fblog.vuejs.org%2Fposts%2Fvue-3.2.html "https://blog.vuejs.org/posts/vue-3.2.html")，而这次 `minor` 版本的升级主要体现在源码层级的优化，对于用户的使用层面来说其实变化并不大。其中一个吸引我的点是提升了响应式的性能:

-   More efficient ref implementation (~260% faster read / ~50% faster write)
-   ~40% faster dependency tracking
-   ~17% less memory usage

翻译过来就是 `ref` API 的读效率提升约为 `260%`，写效率提升约为 `50%` ，依赖收集的效率提升约为 `40%`，同时还减少了约 `17%` 的内存使用。

而且这个优化并不是 Vue 官方人员实现的，而是社区一位大佬 [@basvanmeurs](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbasvanmeurs "https://github.com/basvanmeurs") 提出的，相关的[优化代码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-next%2Fpull%2F2345 "https://github.com/vuejs/vue-next/pull/2345")在 2020 年 10 月 9 号就已经提交了，但由于对内部的实现改动较大，官方一直等到了 Vue.js 3.2 发布，才把代码合入。

2. `Object.defineProperty`  VS `Proxy` 
实际上 `Proxy` 在性能上是要比 `Object.defineProperty` 差的，详情可以参考 [Thoughts on ES6 Proxies Performance](https://link.juejin.cn/?target=https%3A%2F%2Fthecodebarbarian.com%2Fthoughts-on-es6-proxies-performance "https://thecodebarbarian.com/thoughts-on-es6-proxies-performance") 这篇文章，老黄也对此做了测试，结论同上，可以参考这个 [repo](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fustbhuangyi%2FProxy-vs-DefineProperty "https://github.com/ustbhuangyi/Proxy-vs-DefineProperty")。

既然 Proxy 慢，为啥vue3还用，因为 `proxy`本质上是对对象的劫持，可以监听属性变化，可以监听属性的新增和删除；而`Object.defineProperty` 是给对象的某个已存在的属性添加对应的 `getter` 和 `setter`，所以它只能监听这个属性值的变化，而不能去监听对象属性的新增和删除。

响应式在性能方面的优化其实就是体现在把嵌套层级深的对象变成响应式的场景。vue2 中组件初始化阶段把数据设置成响应式的，遇到子属性是对象的情况，会递归执行Object.defineProperty 定义子对象的响应式；vue3 中只有在对象属性被访问时候才会判断子属性的类型来决定要不要递归执行 reactive，这种延时定义子对象响应式的实现，性能有一定的提升。但是仅仅的优化是有限的。

3.2 这次在响应式性能方面的优化，是真的做到了质的飞跃，接下来我们就来上点硬菜

## 响应式原理 3.2 之前
vue3 实现响应式，本质上就是 通过 proxy 劫持了数据对象的读写，访问数据时触发 getter 执行收集依赖；修改数据时，会触发 setter 派发通知。

#### 依赖收集
```js
let shouldTrack = true
// 当前激活的 effect
let activeEffect
// 原始数据对象 map
const targetMap = new WeakMap()
function track(target, type, key) {
  if (!shouldTrack || activeEffect === undefined) {
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 每个 target 对应一个 depsMap
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    // 每个 key 对应一个 dep 集合
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    // 收集当前激活的 effect 作为依赖
    dep.add(activeEffect)
   // 当前激活的 effect 收集 dep 集合作为依赖
    activeEffect.deps.push(dep)
  }
}

```
收集的依赖是什么，为什么要收集？响应式的目的就是当数据变化的时候可以自动的做一些事情，比如执行函数，所以 这些 被执行的副作用函数就是 要收集的 `依赖`。
`track` 函数拥有三个参数，其中 `target` 表示原始数据；`type` 表示这次依赖收集的类型；`key` 表示访问的属性。
`track` 外部创建了全局的 targetMap 作为原始对象的 Map , 它的键是taget，值是depsMap, 作为依赖的 Map；这个 depsMap 的键 是 target 的key，值是dep 集合，dep集合存的是依赖的副作用函数。如图
![track.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0df1a9ca4b9459ca0287c613d9e9b04~tplv-k3u1fbpfcp-watermark.awebp)
因此每次执行 `track` 函数，就是把当前激活的副作用函数 `activeEffect` 作为依赖，然后收集到 `target` 相关的 `depsMap` 对应 `key` 下的依赖集合 `dep` 中。

#### 派发通知
派发通知发生在数据更新的阶段，核心就是在修改响应式数据时，触发 `setter` 函数，进而执行 `trigger` 函数派发通知:
```js
const targetMap = new WeakMap()
function trigger(target, type, key) {
  // 通过 targetMap 拿到 target 对应的依赖集合
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // 没有依赖，直接返回
    return
  }
  // 创建运行的 effects 集合
  const effects = new Set()
  // 添加 effects 的函数
  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        effects.add(effect)
      })
    }
  }
  // SET | ADD | DELETE 操作之一，添加对应的 effects
  if (key !== void 0) {
    add(depsMap.get(key))
  }
  const run = (effect) => {
    // 调度执行
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    }
    else {
      // 直接运行
      effect()
    }
  }
  // 遍历执行 effects
  effects.forEach(run)
}

```
`trigger` 函数拥有三个参数，其中 `target` 表示目标原始对象；`type` 表示更新的类型；`key` 表示要修改的属性。

`trigger` 函数 主要做了四件事情：
1.  从 `targetMap` 中拿到 `target` 对应的依赖集合 `depsMap`；
2.  创建运行的 `effects` 集合；
3.  根据 `key` 从 `depsMap` 中找到对应的 `effect` 添加到 `effects` 集合；
4.  遍历 `effects` 执行相关的副作用函数。
因此每次执行 `trigger` 函数，就是根据 `target` 和 `key`，从 `targetMap` 中找到相关的所有副作用函数遍历执行一遍。

副作用函数是 effect 的参数，我们看看effect 函数

```js
// 全局 effect 栈
const effectStack = []
// 当前激活的 effect
let activeEffect
function effect(fn, options = EMPTY_OBJ) {
  if (isEffect(fn)) {
    // 如果 fn 已经是一个 effect 函数了，则指向原始函数
    fn = fn.raw
  }
  // 创建一个 wrapper，它是一个响应式的副作用的函数
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    // lazy 配置，计算属性会用到，非 lazy 则直接执行一次
    effect()
  }
  return effect
}
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effect.active) {
      // 非激活状态，则判断如果非调度执行，则直接执行原始函数。
      return options.scheduler ? undefined : fn()
    }
    if (!effectStack.includes(effect)) {
      // 清空 effect 引用的依赖
      cleanup(effect)

      try {
        // 开启全局 shouldTrack，允许依赖收集
        enableTracking()
        // 压栈
        effectStack.push(effect)
        activeEffect = effect
        // 执行原始函数
        return fn()
      }
      finally {
        // 出栈
        effectStack.pop()
        // 恢复 shouldTrack 开启之前的状态
        resetTracking()
        // 指向栈最后一个 effect
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++
  // 标识是一个 effect 函数
  effect._isEffect = true
  // effect 自身的状态
  effect.active = true
  // 包装的原始函数
  effect.raw = fn
  // effect 对应的依赖，双向指针，依赖包含对 effect 的引用，effect 也包含对依赖的引用
  effect.deps = []
  // effect 的相关配置
  effect.options = options
  return effect
}

```
reactiveEffect 函数有两个作用，让全局的 `activeEffect` 指向它， 然后执行被包装的原始函数 `fn`。
但实际上它的实现要更复杂一些，一些细节先放放，我们说中心内容
接着判断 `effectStack` 中是否包含 `effect`，如果没有就把 `effect` 压入栈内。之前我们提到，只要设置 `activeEffect = effect` 即可，那么这里为什么要设计一个栈的结构呢？
有一种嵌套的effect 的场景：
```ts
  it("effect 压栈的测试", () => {
    const counter = reactive({
      num: 0,
      num2: 0,
    });

    effect(() => {  // effect1
      effect(() => {// effect2
        console.log("num2:", counter.num2);
      });
      console.log("num:", counter.num);
    });
    counter.num++;
    expect(counter.num).toBe(1)
  });
```

我们每次执行 `effect` 函数时，如果仅仅把 `reactiveEffect` 函数赋值给 `activeEffect`，那么针对这种嵌套场景, 执行effect1，activeEffect 指向 effect1，然后执行effect2，activeEffect 指向 effect2。当外部修改counter.num，activeEffect 还是指向 effect2，执行了 effect2的fn。这就是问题。
```js
// 实际
num2: 0 
num: 0 
num2: 0
// 期望
num2: 0 
num: 0 
num2: 0 
num: 1
```
这里我们还注意到一个细节，在入栈前会执行 `cleanup` 函数清空 `reactiveEffect` 函数对应的依赖 。在执行 `track` 函数的时候，除了收集当前激活的 `effect` 作为依赖，还通过 `activeEffect.deps.push(dep)` 把 `dep` 作为 `activeEffect` 的依赖，这样在 `cleanup` 的时候我们就可以找到 `effect` 对应的 `dep` 了，然后把 `effect` 从这些 `dep` 中删除。`cleanup` 函数的代码如下所示：
```js
function cleanup(effect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

```
为什么要 cleanup 呢？

```js
demo
```


















## 响应式原理优化 3.2 及以后
前面分析了响应式实现原理，看上去一切都很 OK，那么这里面还有哪些可以值得优化的点呢?

#### 收集依赖的优化
目前每次副函数执行，都需先 执行 cleanup 清除依赖，然后在副作用函数执行的过程中重新收集依赖，这个过程牵涉大量对 Set 集合的添加和删除操作。在许多场景下，依赖关系很少改变，这里存在优化空间

为了减少集合的添加和删除操作，我们需要标识每个依赖集合的状态，`是不是新收集？已经被收集？`

这里给 dep 添加两个属性

```js
export const createDep = (effects) => {
  const dep = new Set(effects)
  dep.w = 0
  dep.n = 0
  return dep
}

```
其中 `w` 表示是否已经被收集，`n` 表示是否新收集。
其中 `effectTrackDepth` 表示递归嵌套执行 `effect` 函数的深度；`trackOpBit` 用于标识依赖收集的状态；`maxMarkerBits` 表示最大标记的位数。

```js
// effect
function effect(fn, options) {
  if (fn.effect) {
    fn = fn.effect.fn
  }
  // 创建 _effect 实例 
  const _effect = new ReactiveEffect(fn)
  if (options) {
    // 拷贝 options 中的属性到 _effect 中
    extend(_effect, options)
    if (options.scope)
      // effectScope 相关处理逻辑
      recordEffectScope(_effect, options.scope)
  }
  if (!options || !options.lazy) {
    // 立即执行
    _effect.run()
  }
  // 绑定 run 函数，作为 effect runner
  const runner = _effect.run.bind(_effect)
  // runner 中保留对 _effect 的引用
  runner.effect = _effect
  return runner
}

class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn
    this.scheduler = scheduler
    this.active = true
    // effect 存储相关的 deps 依赖
    this.deps = []
    // effectScope 相关处理逻辑
    recordEffectScope(this, scope)
  }
  run() {
    if (!this.active) {
      return this.fn()
    }
    if (!effectStack.includes(this)) {
      try {
        // 压栈
        effectStack.push((activeEffect = this))
        enableTracking()
        // 根据递归的深度记录位数
        trackOpBit = 1 << ++effectTrackDepth
        // 超过 maxMarkerBits 则 trackOpBit 的计算会超过最大整形的位数，降级为 cleanupEffect
        if (effectTrackDepth <= maxMarkerBits) {
          // 给依赖打标记
          initDepMarkers(this)
        }
        else {
          cleanupEffect(this)
        }
        return this.fn()
		// 到此需要跳转到 track 的逻辑
      }
      finally {
        if (effectTrackDepth <= maxMarkerBits) {
          // 完成依赖标记
          finalizeDepMarkers(this)
        }
        // 恢复到上一级
        trackOpBit = 1 << --effectTrackDepth
        resetTracking()
        // 出栈
        effectStack.pop()
        const n = effectStack.length
        // 指向栈最后一个 effect
        activeEffect = n > 0 ? effectStack[n - 1] : undefined
      }
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

```
可以看到，`effect` 函数的实现做了一定的修改和调整，内部使用 `ReactiveEffect` 类创建了一个 `_effect` 实例，并且函数返回的 `runner` 指向的是 `ReactiveEffect` 类的 `run` 方法。

也就是执行副作用函数 `effect` 函数时，实际上执行的就是这个 `run` 函数。

执行run，不默认执行 cleanup，在fn执行前 首席执行了 `trackOpBit = 1 << ++effectTrackDepth` 记录 `trackOpBit`  ，然后对比深度是否超过 30

为啥是30呢？用二进制标识整数，一共32位，第一位是符号位，默许不用最后一位，所以 为 30.

如果超过（通常情况下不会）则仍然执行老的 `cleanup` 逻辑，如果没超过则执行 `initDepMarkers` 给依赖打标记，来看它的实现：

```js
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit // 标记依赖已经被收集
    }
  }
}

```

当为一层时候，trackOpBit 为 0010，所以 dep.w = 0010，dep.n = 0000

执行 fn，进入 track 逻辑
```js
// track
function track(target, type, key) {
  if (!isTracking()) {
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 每个 target 对应一个 depsMap
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    // 每个 key 对应一个 dep 集合
    depsMap.set(key, (dep = createDep()))
  }
  const eventInfo = (process.env.NODE_ENV !== 'production')
    ? { effect: activeEffect, target, type, key }
    : undefined
  trackEffects(dep, eventInfo)
}

function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack = false
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      // 标记为新依赖
      dep.n |= trackOpBit 
      // 如果依赖已经被收集，则不需要再次收集
      shouldTrack = !wasTracked(dep)
    }
  }
  else {
    // cleanup 模式
    shouldTrack = !dep.has(activeEffect)
  }
  if (shouldTrack) {
    // 收集当前激活的 effect 作为依赖
    dep.add(activeEffect)
    // 当前激活的 effect 收集 dep 集合作为依赖
    activeEffect.deps.push(dep)
    if ((process.env.NODE_ENV !== 'production') && activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({
        effect: activeEffect
      }, debuggerEventExtraInfo))
    }
  }
}

```
每个 key 对应一个 dep 集合，创建dep，depsMap.set(key, (dep = createDep()))
```js
export const createDep = (effects?: ReactiveEffect[]): Dep => { 
const dep = new Set(effects) as Dep 
dep.w = 0 dep.n = 0 
return dep 
}
```

当创建 `dep` 的时候，是通过执行 `createDep` 方法完成的，此外，在 `dep` 把前激活的 `effect` 作为依赖收集前，会判断这个 `dep` 是否已经被收集，如果已经被收集，则不需要再次收集了。此外，这里还会判断这 `dep` 是不是新的依赖，如果不是，则标记为新的。

接下来，我们再来看 `fn` 执行完后的逻辑

```js
finally {
  if (effectTrackDepth <= maxMarkerBits) {
    // 完成依赖标记
    finalizeDepMarkers(this)
  }
  // 恢复到上一级
  trackOpBit = 1 << --effectTrackDepth
  resetTracking()
  // 出栈
  effectStack.pop()
  const n = effectStack.length
  // 指向栈最后一个 effect
  activeEffect = n > 0 ? effectStack[n - 1] : undefined
}
```

```js
const finalizeDepMarkers = (effect) => {
  const { deps } = effect
  if (deps.length) {
    let ptr = 0
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i]
      // 曾经被收集过但不是新的依赖，需要删除
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect)
      }
      else {
        deps[ptr++] = dep
      }
      // 清空状态
      dep.w &= ~trackOpBit // 取反 恢复    0010 & ~0010 = 0
      dep.n &= ~trackOpBit //
    }
    deps.length = ptr
  }
}

```

`finalizeDepMarkers` 主要做的事情就是找到那些曾经被收集过但是新的一轮依赖收集没有被收集的依赖，从 `deps` 中移除。这其实就是解决前面举的需要 `cleanup` 的场景：在新的组件渲染过程中没有访问到的响应式对象，那么它的变化不应该触发组件的重新渲染。

以上就实现了依赖收集部分的优化，可以看到相比于之前每次执行 `effect` 函数都需要先清空依赖，再添加依赖的过程，现在的实现会在每次执行 `effect` 包裹的函数前标记依赖的状态，过程中对于已经收集的依赖不会重复收集，执行完 `effect` 函数还会移除掉已被收集但是新的一轮依赖收集中没有被收集的依赖。

优化后对于 `dep` 依赖集合的操作就减少了，自然也就优化了性能。

#### trackOpBit 的设计

细心的你可能会发现，标记依赖的 `trackOpBit`，在每次计算时采用了左移的运算符 `trackOpBit = 1 << ++effectTrackDepth`；并且在赋值的时候，使用了或运算：

```js
deps[i].w |= trackOpBit
dep.n |= trackOpBit

```

那么为什么这么设计呢？因为 `effect` 的执行可能会有递归的情况，通过这种方式就可以记录每个层级的依赖标记情况。

在判断某个 `dep` 是否已经被依赖收集的时候，使用了 `wasTracked` 函数：

```js
const wasTracked = (dep) => (dep.w & trackOpBit) > 0

```

通过与运算的结果是否大于 `0` 来判断，这就要求依赖被收集时嵌套的层级要匹配。举个例子，假设此时 `dep.w` 的值是 `2`，说明它是在第一层执行 `effect` 函数时创建的，但是这时候已经执行了嵌套在第二层的 `effect` 函数，`trackOpBit` 左移两位变成了 `4`，`2 & 4` 的值是 `0`，那么 `wasTracked` 函数返回值为 `false`，说明需要收集这个依赖。显然，这个需求是合理的。

可以看到，如果没有 `trackOpBit` 位运算的设计，你就很难去处理不同嵌套层级的依赖标记，这个设计也体现了 basvanmeurs 大佬非常扎实的计算机基础功力。


