#### 父向子

| 方案             | 父向子     | 子向父     |
| ---------------- | ---------- | ---------- |
| props / emits    | props      | emits      |
| v-model / emits  | v-model    | emits      |
| ref / emits      | ref        | emits      |
| provide / inject | provide    | inject     |
| EventBus         | emits / on | emits / on |
| vuex             | -          | -          |


#### 兄弟通信

| 方案     | 发起方 | 接收方 |
| -------- | ------ | ------ |
| EventBus/mitt | emit   | on     |
| vuex     | -      | -      | 
