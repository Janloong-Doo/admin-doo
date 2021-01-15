<template>
  <a-space>
    <a-button type="primary" @click="syncMdFileServer">同步服务端Md文件</a-button>
  </a-space>
  <vue-json-pretty :path="'res'" :data="displayInfo.data" :deep="3" :showLength="true"></vue-json-pretty>
</template>

<script lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import {reactive} from "vue";
import {deepMerge} from "/@/utils";
import {syncMdFile} from "/@/api/Md.ts"
import 'vue-json-pretty/lib/styles.css';

export default {
  name: "SyncMd",
  components: {VueJsonPretty},
  setup() {
    //展示信息
    const displayInfo = reactive({data: {}})

    const syncMdFileServer = () => {
      displayInfo.data = {};
      syncMdFile().then(value => {
        deepMerge(displayInfo.data, value)
      })
    }
    return {
      syncMdFileServer,
      displayInfo
    }
  }
}
</script>

<style scoped>

</style>