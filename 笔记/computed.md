## 🌶️ computed
##### 功能点
- const p = computed(() => { console.log(a) }) `参数 a 是响应式对象`
- p.value 的访问方式
- 缓存 返回值p 功能
- 收集依赖
- set 操作不要触发 getter

##### 实现
1. .value 的访问方式

```js
// 一般访问 .value 都是访问一个类的 get 方式
// 接收一个 getter 函数作为参数

class Com {
	private _getter;
	cunstructor(getter) {
		this._getter = getter
	}
	get value () {
		return this._getter()
	}
}

```

2. 缓存

```js
// 缓存功能, 如果已经拿到值，那么就没必要再次 调用 getter，设置一个开关 dirty

class Com {
	private _getter;
	private _value;
	private _dirty:boolean = true;

	cunstructor(getter) {
		this._getter = getter
	}
	get value () {
		if (this._dirty) {
			this._dirty = false
			this._value = this._getter()
		}
		return this._value
	}
}

```

3. 收集依赖 。const p = computed(() => { console.log(a) }) `参数 a 是响应式对象`

```js
// 收集依赖 这里指的是当参数a,也就是响应式对象发生改变，需要触发 getter，从而才能获取
// 最新的p值，那么就需要将 a 与 getter进行关联。也就是 a 改变，通过触发getter，让p更新
// 在 cunstructor 创建 effect 

class Com {
	private _getter;
	private _value;
	private _dirty:boolean = true;
	private _effect;
	cunstructor(getter) {
		this._effect = new ReactiveEffect(getter)
	}
	get value () {
		if (this._dirty) {
			this._dirty = false
			this._value = this._effect.run()
		}
		return this._value
	}
}
```

4. 对参 a 进行 set 操作，不要触发 getter

```js
// 如果 a 进行set 操作，那么会触发 trigget，执行effect.run, 执行 getter。
// 但实际我们现在不想执行getter，我想当我调用p.value 时候在执行getter
// 1 不要执行getter 2 把锁给我打开，方便我择机调度getter

// 换句话说，如果a 改变了100次，也不能立刻执行 100次getter ！nextTick 也是这个思路

class Com {
	private _getter;
	private _value;
	private _dirty:boolean = true;
	private _effect;
	cunstructor(getter) {
		this._effect = new ReactiveEffect(getter, () => {
			if (!this._dirty) {
				this._dirty = true;
			  }
		})
	}
	get value () {
		if (this._dirty) {
			this._dirty = false
			this._value = this._effect.run()
		}
		return this._value
	}
}
```

5. 导出

```js
export function computed(getter) {
  return new Com(getter);
}
```