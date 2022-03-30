export function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }

  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout, // undefined = never times out
    suspensible = true,
    onError: userOnError,
  } = source;

  let pendingRequest = null;
  let resolvedComp;

  // 次数
  let retries = 0;

  // 重试
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };

  const load = () => {
    let thisRequest;
    return loader()
      .catch((err) => {
        err = err instanceof Error ? err : new Error(String(err));
        if (userOnError) {
          return new Promise((resolve, reject) => {
            const userRetry = () => resolve(retry());
            const userFail = () => reject(err);
            userOnError(err, userRetry, userFail, retries + 1);
          });
        } else {
          throw err;
        }
      })
      .then((comp) => {
        if (thisRequest !== pendingRequest && pendingRequest) {
          return pendingRequest;
        }
        resolvedComp = comp;
        return comp;
      });
  };

  return defineComponent({
    name: "AsyncComponentWrapper",

    __asyncLoader: load,

    get __asyncResolved() {
      return resolvedComp;
    },

    setup() {
      const instance = currentInstance;

      // already resolved
      // success
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }

      const onError = (err) => {
        pendingRequest = null;
        handleError(
          err,
          instance,
          ErrorCodes.ASYNC_COMPONENT_LOADER,
          errorComponent /* do not throw in dev if user provided error component */
        );
      };

      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay);
      // loading time
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }


      // 超时
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(
              `Async component timed out after ${timeout}ms.`
            );
            onError(err);
            error.value = err;
          }
        }, timeout);
      }

      load()
        .then(() => {
          // ok
          loaded.value = true;
        })
        .catch((err) => {
          onError(err);
          error.value = err;
        });

      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value,
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    },
  });
}

function createInnerComp(comp, { vnode: { ref, props, children } }) {
  const vnode = createVNode(comp, props, children);
  // ensure inner component inherits the async wrapper's ref owner
  vnode.ref = ref;
  return vnode;
}
