### 1 大致流程,走一遍happy path，不讨论边界情况
```js
	// 这里是写好了 effect 函数，其参数就是依赖。还有一种情况是项目里面没有写 effect，实际是在setup 里面调用了 effect，才有的依赖

  it("happy path", () => {
    const user = reactive({
      age:10
    })
    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)
    
    // update
    user.age++
    expect(nextAge).toBe(12)
  });
```

1. reactive(raw)
2. new Proxy(raw, mutableHandles)
3. mutableHandles={get, set}

	1. get
```js
function createGetter(isReadOnly = false, shallow = false) {
  return function get(target, key) {

    let res = Reflect.get(target, key);
   
    // TODO 收集依赖
    if (!isReadOnly) {
      track(target, key);
    }
    return res;
  };
}

// 全局变量
let targetMap = new Map();
// 当前激活的 effect
let activeEffect;

function track (target, key) {
	// target key dep
	// 对象-- key -- 依赖
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

	// 这不光光是抽离一个函数那么简单，为ref做准备
	trackEffects(dep);
	// trackEffects(dep) 就是下面的内容
	// if(dep.has(activeEffect)) return
	// dep.add(activeEffect);
}
```

![](Pasted%20image%2020220223110852.png)

	2. 找一下 activeEffect 的定义时机
```js
// 执行 effect 函数
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options);
  _effect.run();
}

export class ReactiveEffect {
  private _fn: any;
  deps = [];
  // pbulic 是为了给外部获取到
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {

	// 自身赋值给 当前激活的 activeEffect
	// 呼应 dep.add(activeEffect)
	// 收集完毕

	
    activeEffect = this;
	// 这里执行依赖
	return this._fn()
  }
}
```

	3. set
```js 
function createSetter() {
  return function set(target, key, value) {
    let res = Reflect.set(target, key, value);
    trigger(target, key);
    return res;
  };
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);

  triggerEffect(dep);
}
export function triggerEffect(dep: any) {
  for (const effect of dep) {
	effect.run();
  }
}

```

 
