<template>
  <div id="Tools">
    <a-tabs type="card" @change="callback">
      <template v-for="item in tabResult" :key="item.key">
        <a-tab-pane :tab="item.tab">
          <keep-alive>
            <component :is="tabComponent"></component>
          </keep-alive>
        </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import Display from '/@/layouts/markdown/Display.vue'
import Editor from '/@/layouts/markdown/Editor.vue'
import {ref} from "vue";


export default {
  name: "Markdown",
  components: {Display,Editor},

  setup() {
    let returnTabResult = [
      {
        'key': 1,
        'value': "Display",
        'tab': '渲染'
      },   {
        'key': 2,
        'value': "Editor",
        'tab': '编辑器'
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

<style lang="stylus">
</style>