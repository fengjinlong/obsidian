function defineAsyncComponent(options) {
  // options 可以是配置项 也可以是加载器
  if (typeof options === "function") {
    options = {
      loader: options,
    };
  }
  const { loader } = options;
  let InnerComp = null;
  return {
    name: "AsyncComponent",
    setup() {
      const loaded = ref(false);
      const loading = ref(false);
      const loadingTimer = null;
      // loading 相关
      if (options.delay) {
        loadingTimer = setTimeout(() => {
          loading.value = true;
        }, options.delay);
      } else {
        loading.value = true;
      }

      const timeout = ref(false);
      loader()
        .then((c) => {
          InnerComp = c;
          loaded = true;
        })
        .finish(() => {
          loading.value = false;
          clearTimeout(loadingTimer);
        });

      let timer = null;
      // 超时
      if (options.timeout) {
        timer = setTimeout(() => {
          timeout.value = true;
        }, options.timeout);
      }
      // 组件卸载时清除定时器
      unMounted(() => {
        clearTimeout(timer);
      });
      // 站位内容
      const placeholder = {
        type: "Text",
        children: "",
      };
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
