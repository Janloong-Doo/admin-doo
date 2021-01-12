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
import Http from '/@/layouts/tools/Http.vue'
import {ref} from "vue";


export default {
  name: "Tools",
  components: {Http},

  setup() {
    let returnTabResult = [
      {
        'key': 1,
        'tab': 'Http'
      }
    ]
    const tabComponent = ref("Http");
    const callback = (key: number) => {
      tabComponent.value = returnTabResult.filter(value => value.key === key)[0].tab;
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