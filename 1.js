const keepalive = {
  // 标识
  __isKeepAlive: true,
  props: {
    include: RegExp,
    exclude: RegExp,
  },
  setup(props, { slots }) {
    // ...
    return () => {
      // keepalive 默认插槽就是要被 keepalive 的组件
      let rawVNode = slots.default();
      // 如果不是 组件，直接渲染
      // 也就是说 keepalive 只能 缓存组件
      if (typeof rawVNode !== "object") {
        return rawVNode;
      }

      const name = rawVNode.type.name;
      if (
        (name && props.include && !props.include.test(name)) ||
        (props.exclude && props.exclude.test(name))
      ) {
        // 不需要缓存操作
        return rawVNode;
      } else {
        // ...
      }
    };
  },
};
function unmount(vnode) {
  if (vnode.type === Fragment) {
    // ...
  } else if (vnode.type === "object") {
    if (vnode.shouldKeepAlive) {
      // 使其失活
      vnode.KeepAliveInstance._deActivate(vnode);
    }
  }
  // ...
}
function patch(n1, n2, container, anchor) {
  // ...
  if (typeof n2.type === "object" || typeof n2.type === "function") {
    if (!n1) {
      if (n2.keptAlive) {
        // 激活
        n2.keepAliveInstance._activate(n2, container, anchor);
      } else {
        mountComponent(n2, container, anchor);
      }
    }
  }
  // ...
}
function mountComponent(vnode, container, anchor) {
  // ...
  const instance = {
    state,
    props: shallowReactive(props),
    isMounted: false,
    subTree: null,
    slots,
    // keepalive 组件的实例才有 keepAliveCtx 属性
    keepAliveCtx: null,
  };
  // 检查当前组件是否是 KeepAlive 的组件
  const isKeepAlive = vnode.type.__isKeepAlive;
  if (isKeepAlive) {
    // 添加特有的对象 keepAliveCtx
    instance.keepAliveCtx = {
      move(vnode, container, anchor) {
        insert(vnode.component.subTree.el, container, anchor);
      },
      createElement,
    };
  }
}
function F() {
  this.a = 1;
  return {};
}
function F2() {
  this.a = 1;
  return 1;
}
function F3() {
  this.a = 1;
}

function Neww(fun, ...args) {
  let obj = {};
  Objectj.setPrototypeOf(obj, fun.prototype);
  let result = fun.apply(obj, args);
  return result instanceof Object ? result : obj;
}

F.call(obj, args);
Function.prototype._call = (ctx, ...args) => {
  ctx = ctx ? Object(ctx) : window;
  ctx.fn = this;
  let result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};
Function.prototype._apply = (ctx, args) => {
  ctx = ctx ? Object(ctx) : window;
  ctx.fn = this;
  let r = ctx.fn(...args);
  delete ctx.fn;
  return r;
};
fun.bind(obj, args)();
Function.prototype._bind = (ctx, ...args) => {
  if (typeof this !== "function") {
    return new Error("xxx");
  }
  let fn = this;
  function F() {
    let con = this instanceof F ? this : ctx;
    let a = args.concat(...arguments);
    fn.call(con, a);
  }
  if (this.prototype) {
    Object.setPrototypeOf(F, this.prototype);
  }
  return F;
};

function fun3() {
  console.log("fun3");
}
function fun2() {
  fun3();
}
function fun1() {
  fun2();
}
fun1();
//执⾏fun1 结果如下
ECStack = [fun1, globalContext];



