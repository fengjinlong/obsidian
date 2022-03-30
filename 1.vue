<template>
  <KeepAlive>

    <Tab v-if="i === 1" />
    <Tab v-if="i === 2" />
    <Tab v-if="i === 3" />
  </KeepAlive>
</template>
  <script>
    export default {
      components: {
        AsyncCom: defineAsyncComponent(() => import("ComA")),
      },
    };
  </script>
</template>
