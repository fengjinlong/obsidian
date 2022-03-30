function defineAsyncComponent(options) {
  if (typeof options === "function") {
    options = {
      loader: options,
    };
  }
  const { loader } = options;
  let InnerComp = null;
  // 记录重试次数
  let retries = 0;
  function load() {
    return loader().catch((err) => {
      return new Promise((resolve, reject) => {
        const retry = () => {
          resolve(load());
          retries++;
        };
        const fail = () => {
          reject(err);
        };
        // 交给用户处理
        options.onError(retry, fail, retries);
      });
    });
  }
  return {
    name: "AsyncComponentWrapper",
    setup() {
      const loaded = ref(false);
      const loading = ref(false);

      let loadingTimer = null;
      if (options.delay) {
        loadingTimer = setTimeout(() => {
          loading.value = true;
        }, options.delay);
      } else {
        loading.value = true;
      }

      load()
        .then((c) => {
          InnerComp = c;
          loaded.value = true;
        })
        .catch((err) => {})
        .finally(() => {
          loading.value = false;
          clearTimeout(loadingTimer);
        });
      return () => {
        if (loaded.value) {
          // 加载成功
          return {
            type: InnerComp,
          };
        } else if (timeout.value) {
          // 超时
          return options.errorComponent
            ? { type: options.errorComponent }
            : placeholder;
        } else if (loading.value) {
          return { type: loadingComponent };
        } else {
          return placeholder;
        }
      };
    },
  };
}

// 用户使用
const Foo = defineAsyncComponent({
  loader: () => new Promise((r) => {}),
  delay: 200,
  loadingComponent: {
    setup() {},
  },
  timeout: true,
  errorComponent: {},
  // 重试机制, 看用户怎么定义
  onError(err, retry, fail) {
    if (retry) {
      retry();
    }
  },
});
