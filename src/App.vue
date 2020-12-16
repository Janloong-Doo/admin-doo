<template>
    <div id="app">
        <!--            v-bind="lockEvent"-->
        <a-config-provider
            :locale="antConfigLocale"
            :transform-cell-text="transformCellText"
        >

            <router-view class="c-border"/>
        </a-config-provider>
    </div>
</template>
<script lang="ts">
import {getConfigProvider, initAppConfigStore} from '/@/setup/App';
import {useLocale} from "/@/hooks/web/useLocale";

export default {
    name: 'App',
    components: {},
    setup() {
        //初始化全局配置
        initAppConfigStore();
        //ant全局配置
        const {transformCellText} = getConfigProvider();
        const {antConfigLocale} = useLocale();
        return {
            antConfigLocale,
            transformCellText
        }
    }
}
</script>
<style lang="stylus">
@import "./assets/css/common.styl"
</style>