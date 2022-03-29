<template>
  <AsyncCom />
</template>
<script>
export default {
  components: {
    AsyncCom: defineAsyncComponent(() => import("ComA")),
  },
};
</script>
