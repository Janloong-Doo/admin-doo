<template>
  <div id="index">

    <br/>
    <a-textarea v-model:value="baseData.params" :placeholder="commonData.paramsTip" :rows="4"/>
    <br/>
    <br/>
    <a-button type="primary" @click="sendWsMsg">发送</a-button>
    <br/>
    <vue-json-pretty :path="'res'" :data="displayInfo.data" :deep="3" :showLength="true"></vue-json-pretty>
  </div>
</template>

<script lang="ts">

import {onMounted, reactive,ref} from "vue";
import {deepMerge} from "/@/utils";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {initWebSocket} from "/@/utils/ws/index.ts"

export default {
  name: "WebSocket",
  components: {VueJsonPretty},
  props: {},
  setup() {
    const commonData = {
      baseRequstType: ["GET", "POST", "DELETE", "PUT"],
      paramsTip: "输入参数内容(json格式)"
    }
    //基础输入数据
    const baseData = reactive({
      requestType: 'GET',
      urlInput: 'ws://localhost:8902/hap/ws/msg/doo',
      params: ''
    })
    const messageHandler = (data:any) => {
      deepMerge(displayInfo.data, data)
      console.log("收到数据:", data);
    }
    let customWs = initWebSocket("ws://api.janloong.com/hap/ws/msg/doo", messageHandler);
    onMounted(() => {
    })
    //展示信息
    const displayInfo = reactive({data: {}})

    const sendWsMsg = () => {
      displayInfo.data = {};
      customWs.sendMsg(baseData.params)
    }
    return {
      customWs,
      commonData,
      messageHandler,
      baseData,
      displayInfo,
      sendWsMsg,
    }
  },
  created() {
    // ws = initWebSocket("ws://localhost:8902/hap/ws/msg/doo", this.messageHandler);
    // this.ws.value = initWebSocket("ws://localhost:8902/hap/ws/msg/doo", this.messageHandler);
  }
}
</script>

<style scoped>

</style>