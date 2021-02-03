<template>
  <div id="Tools">
    <a-tabs type="card" @change="callback">
      <template v-for="item in tabResult" :key="item.key">
        <a-tab-pane :tab="item.tab" :forceRender="true">
          <!--          <keep-alive>-->
          <!--          </keep-alive>-->
        </a-tab-pane>
      </template>
    </a-tabs>
    <component :is="tabComponent"></component>
  </div>
</template>
<script lang="ts">
import Http from '/@/layouts/tools/Http.vue'
import WebSocket from '/@/layouts/tools/WebSocket.vue'
import {ref} from "vue";


export default {
  name: "Tools",
  components: {Http,WebSocket},

  setup() {
    let returnTabResult = [
      {
        'key': 1,
        'value': 'Http',
        'tab': 'Http'
      }, {
        'key': 2,
        'value': 'WebSocket',
        'tab': 'WebSocket'
      }
    ]
    const tabComponent = ref("Http");
    const callback = (key: number) => {
      tabComponent.value = returnTabResult.filter(value => value.key === key)[0].value;
    };
    return {
      tabResult: returnTabResult,
      callback,
      tabComponent
    }
  },

}
</script>

<style lang="stylus">
</style>