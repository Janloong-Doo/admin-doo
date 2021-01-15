<template>
  <div id="Tools">
    <a-tabs type="card" @change="callback">

      <template v-for="item in tabResult" :key="item.key">
        <a-tab-pane :tab="item.tab" :forceRender="true">
          <!--          //TODO 【问题】 造成页面卡死 by Janloong_Doo-->
          <!--          <component :is="tabComponent"></component>-->
        </a-tab-pane>
      </template>
    </a-tabs>
    <!--      <template #tabBarExtraContent>-->
<!--    <keep-alive>-->
      <component :is="tabComponent"></component>
<!--    </keep-alive>-->
    <!--      </template>-->
  </div>
</template>
<script lang="ts">
import Display from '/@/layouts/markdown/Display.vue'
import Editor from '/@/layouts/markdown/Editor.vue'
import SyncMd from '/@/layouts/markdown/SyncMd.vue'
import {ref} from "vue";


export default {
  name: "Markdown",
  components: {Display, Editor, SyncMd},

  setup() {
    let returnTabResult = [
      {
        'key': 1,
        'value': "Display",
        'tab': '渲染'
      }, {
        'key': 2,
        'value': "Editor",
        'tab': '编辑器'
      }
      , {
        'key': 3,
        'value': "SyncMd",
        'tab': '同步助手'
      }
    ]
    const tabComponent = ref("Display");
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

<style lang="stylus" scoped>
</style>