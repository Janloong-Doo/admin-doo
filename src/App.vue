<template>
    <div id="app">
    <router-view class="c-border" />
    </div>
</template>
<script lang="ts">
import { getConfigProvider, initAppConfigStore } from '/@/setup/App';

export default {
  name: 'App',
    components: {},
  setup(){
      //初始化全局配置
      initAppConfigStore();
  }
}
</script>
<style lang="stylus">
@import "./assets/css/common.styl"
</style>