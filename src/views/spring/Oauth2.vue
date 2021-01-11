<template>
  <div id="Oauth2">
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
import Login from '/@/layouts/spring/oauth2/Login.vue'
import Index from '/@/layouts/spring/oauth2/Index.vue'
import Current from '/@/layouts/spring/oauth2/Current.vue'
import Tools from '/@/layouts/spring/oauth2/Tools.vue'
import {ref} from "vue";

export default {
  name: "Oauth2",
  components: {Login, Index, Current,Tools},

  setup() {
    let returnTabResult = [
      {
        'key': 1,
        'tab': 'Login'
      },
      {
        'key': 2,
        'tab': 'Index'
      }, {
        'key': 3,
        'tab': 'Current'
      }, {
        'key': 4,
        'tab': 'Tools'
      },
    ]
    const tabComponent = ref("Login");
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