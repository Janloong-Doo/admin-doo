<template>
  <div id="index">

    <br/>
    <a-input-search v-model:value="baseData.urlInput" enter-button="运行" @search="executeRequest" allow-clear placeholder="url">
      <template #addonBefore>
        <a-select v-model:value="baseData.requestType" style="width: 100px">
          <template key="item" v-for="item in commonData.baseRequstType">
            <a-select-option :value="item">
              {{ item }}
            </a-select-option>
          </template>
        </a-select>
      </template>
    </a-input-search>
    <br/>
    <a-textarea v-model:value="baseData.params" :placeholder="commonData.paramsTip" :rows="4"/>
    <br/>
    <vue-json-pretty :path="'res'" :data="displayInfo.data" :deep="3" :showLength="true"> </vue-json-pretty>
  </div>
</template>

<script lang="ts">

import {reactive} from "vue";
import {deepMerge} from "/@/utils";
import {defAxios} from "/@/utils/http"
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  name: "Http",
  components: {VueJsonPretty},
  props: {
  },
  setup() {
    const commonData = {
      baseRequstType: ["GET", "POST", "DELETE", "PUT"],
      paramsTip: "输入参数内容(json格式)"
    }
    //基础输入数据
    const baseData = reactive({
      requestType: 'GET',
      urlInput: 'http://localhost:8901/hap/app/allUrl',
      params: ''
    })

    //展示信息
    const displayInfo = reactive({data: {}})

    const executeRequest = () => {
      displayInfo.data = {};
      defAxios.request<any>({
        url: baseData.urlInput,
        params:baseData.params,
        method:baseData.requestType
      }, {
        isTransformRequestResult: false
      }).then(value => {
        deepMerge(displayInfo.data, value)
      })
    }

    return {
      commonData,
      baseData,
      displayInfo,
      executeRequest,
    }
  },
}
</script>

<style scoped>

</style>