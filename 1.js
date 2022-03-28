class Parent {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}
class Game extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
const ga = new Game("ga", 20);
ga.getName();

function Person() {
  this.name = "Jack";
  return { age: 18 };
}

var p = new Person();
console.log(p); // {age: 18}
console.log(p.name); // undefined
console.log(p.age); // 18

function neww(fun, ...args) {
  let obj = {};
  Object.setPrototypeOf(obj, fun.prototype);
  let result = fun.apply(obj, args);
  return result instanceof Object ? result : obj;
}
