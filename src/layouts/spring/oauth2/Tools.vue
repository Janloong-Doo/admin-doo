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

    <a-descriptions title="返回信息" bordered :column="1">
      <template :key="key" v-for="key in (Object.keys(displayInfo.data))">
        <a-descriptions-item
            :label="key"
            span="1"
        >{{ displayInfo.data[key] }}
        </a-descriptions-item>
      </template>
    </a-descriptions>

  </div>
</template>

<script lang="ts">

import {reactive} from "vue";
import {deepMerge} from "/@/utils";
import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

export default {
  name: "Tools",
  props: {
    'signStatus': {
      type: String,
      default: 'index'
    }
  },
  setup() {
    const commonData = {
      baseRequstType: ["GET", "POST", "DELETE", "PUT"],
      paramsTip: "输入参数内容(json格式)"
    }
    //基础输入数据
    const baseData = reactive({
      requestType: 'GET',
      urlInput: '',
      params: ''
    })

    //展示信息
    const displayInfo = reactive({data: {}})

    const executeRequest = () => {
      displayInfo.data = {};
      defAxios.get<any>({
        url: baseData.urlInput,
        params:baseData.params,
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