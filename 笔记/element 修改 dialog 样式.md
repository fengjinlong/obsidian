```vue
<template>
  <el-dialog class="dialogrep" v-model="centerDialogVisible" width="293" center>
    <el-button class="dialog-btn" @click="Cancel">Submit</el-button>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
const Props = defineProps({
  centerDialogVisible: Boolean,
});
const centerDialogVisible = ref(Props.centerDialogVisible);
const emit = defineEmits(["update:modelValue"]);

const Cancel = () => {
  emit("update:modelValue", false);
};

</script>
<style lang="scss" scoped>
// 页面样式
.dialogrep {
  img {}
  .p {}
}
</style>
// 修改样式
<style lang="scss">
.el-dialog.dialogrep {
  // --el-dialog-padding-primary: -10px;
  .el-dialog__header {
    padding-top: 19px;
  }
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 20px;
  }
  .el-dialog__footer {
    padding-bottom: 20px;
    margin: 0;
    display: none;
  }
}
</style>
```