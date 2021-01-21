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
//全局样式覆盖
.ant-table-body {
    &::-webkit-scrollbar {
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: 0;
        border-radius: 0;
        background: #fffff;
    }
}
.c-border{
  flex 1
}
</style>