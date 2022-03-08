## ref

#### 1 .value 的调用方式

```js
// 测试
const a = ref(1)
expect(a.value).toBe(1)

// 实现
class RefImpl {
  private _value: any;
  constructor(value) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
}
export function ref(value) {
  return new RefImpl(value);
}
```

#### 2 能触发响应式收集

- 测试
```js
// 测试
const a = ref(1)
let b;
effect(() => {
	call++
	b = a.value
})
expect(calls).toBe(1)
expect(dummy).toBe(1)

a.value = 2
expect(calls).toBe(2)
expect(dummy).toBe(2)
```

- 触发响应式依赖，必然涉及到收集依赖和触发依赖，所以 get 时收集依赖，set 时触发依赖
- 收集和触发依赖就像 reactive 那样找对应关系（target - Map，key - Dep, [ effect ] )，由于 ref 是个单值，不存在 target，所以这里少了一些对应。ref 只需要一个 dep，一个ref 就是一个dep，执行收集和触发依赖的逻辑
```js
class RefImpl {
  private _value: any;
  // ref 对应的 dep
  public dep;
  constructor(value) {
    this._value = value;
    this.dep = new Set();
  }
  get value() {
    // 收集依赖
    trackRefValue(this);
    return this._value;
  }
  set value(newValue: any) {
    this._value = newValue;
    // 触发依赖
    triggerEffect(this.dep);
  }
}
function trackRefValue(ref) {
  // effect 有个逻辑是  执行完 effect.run 的effect 不应收集
  // isTracking() 逻辑是 应该收集 且 activeEffect 存在	
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}
export function ref(value) {
  return new RefImpl(value);
}
```

#### 3 避免重复触发依赖，如果重复赋相同的值，那么不应再次触发依赖

- 测试
```js
// 测试
	const a = ref(1)
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    })

    a.value++
	// 触发一次依赖
    expect(calls).toBe(2)
    expect(dummy).toBe(2)

    a.value = 2;
	// 不能再次触发依赖
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
```

- 实现
```js
// 实现
  set value(newValue: any) {
    // 触发依赖
    if (this._value !== newValue) {
      this._value = newValue;
      triggerEffect(this.dep);
    }
  }
```

#### 4 给 ref 传个对象，要能支持响应式
- 对象就转换为 reactive
- 测试
```js
	const a = ref({
      count: 1,
    })
    let dummy;
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
```

- 实现
```js
class RefImpl {
  private _value: any;
  public dep;
  private _rawValue: any;
  constructor(value) {
    // 原始值
    this._rawValue = value;
    // 如果是对象
    this._value = isObject(value) ? reactive(value) : value;
    this.dep = new Set();
  }
  get value() {
    // 收集依赖
    trackRefValue(this);
    return this._value;
  }
  set value(newValue: any) {
    // 原始值已经变了，需要用原始值做比较
    // if (this._value !== newValue) {
    if (this._rawValue !== newValue) {
      // 触发依赖
      this._value = isObject(newValue) ? reactive(newValue) : newValue;
      this._rawValue = newValue;
      triggerEffect(this.dep);
    }
  }
}
``` 

## isRef 
- 是不是ref 类型？在ref 值加个属性
```js

export function isRef(value) {
	return !!value.__v_isRef
}
```

## unRef 访问 ref 值时自动 返回 .value 的值
```js
export function unRef(value) {
	return !!value.__v_isRef ? value.value : value
}
```

## proxyRefs , 省略对象某一个ref值的  .value 的写法
```js
export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get (target, key) {
      return unRef(Reflect.get(target, key))
    },
    set (target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return target[key].value = value
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}
```