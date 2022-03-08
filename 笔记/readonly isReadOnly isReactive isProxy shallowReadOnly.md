#### readonly
- readonly 就是对象只读，不能进行set操作，不能trigger，也就不能track
```js
// 简单实现
function readonly(raw){
	return new Proxy(raw, {
		get (target, key) {
			return Reflect.get(target, key);
		},
		set (target,key,value) {
			return true
		}
	})
}
```


#### isReadOnly
- readonly 与 reactive 本质上是get 与 set 的区别
- 抽离出公共的逻辑，方便添加判断逻辑，在进行一些isXxxx 的判断时候，我们在getter里面进行拦截

```js
export const enum ReactiveFlegs {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isREADONLY'
}

export function isReadOnly(raw) {
  return !!raw[ReactiveFlegs.IS_READONLY]
}

function createGetter(isReadOnly = false, shallow = false) {
  return function get(target, key) {
	  // 是否是 reactive
    if (key === ReactiveFlegs.IS_REACTIVE) {
      return !isReadOnly;
    } else if (key === ReactiveFlegs.IS_READONLY) {
		// 是否是 readonly
      return isReadOnly;
    }
    let res = Reflect.get(target, key);
	  // 对象没有嵌套
    if (shallow) {
      return res;
    }
    if (isObject(res)) {
		// 对象嵌套处理
      return isReadOnly ? readonly(res) : reactive(res);
    }
    // 不是readonly 进行收集依赖
    if (!isReadOnly) {
      track(target, key);
    }
    return res;
  };
}
```
#### isReactive
```js
export function isReactive(raw) {
  return !!raw[ReactiveFlegs.IS_REACTIVE]
}
```
#### isProxy
- 检查 obj 是否是readonly 或 reactive 创建出来的
```js
export function isProxy(raw) {
  return !!raw[ReactiveFlegs.IS_REACTIVE] || !!raw[ReactiveFlegs.IS_READONLY]
}
```
#### createGetter 的 第二个参数 shallow，  浅层次，这里是服务 shallowReadonly 的
- 具备readonly 的特性
- 如果对象是嵌套的，只进行第一层的响应式收集

```js
export function shallowReadonly (raw) {
	return new Proxy(raw, shallowReadonlyHandles)
}

export const readonlyHandles = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`${key} 不能set，readonly！`);
    return true;
  },
};
export const shallowReadonlyHandles = extend({}, readonlyHandles, {
  get: createGetter(true, true)
});
```