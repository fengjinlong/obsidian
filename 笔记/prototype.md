#### 原型的 `constructor` 属性指向构造函数，构造函数又通过 `prototype` 属性指回原型，但是并不是所有函数都具有这个属性，`Function.prototype.bind()` 就没有这个属性。
1. `__proto__` 访问对象 __const obj = {}__ 的原型
![](Pasted%20image%2020220525232038.png)
2. 原型的 `constructor` 属性指向构造函数
![](Pasted%20image%2020220525232221.png)
3. 构造函数又通过 `prototype` 属性指回原型
![](Pasted%20image%2020220525232244.png)