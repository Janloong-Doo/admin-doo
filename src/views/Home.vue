<template>
    <span>首页展示</span>
    <br>
    <br>
    <a-descriptions>
        <a-descriptions-item>一个demo练习实战项目</a-descriptions-item>
    </a-descriptions>
    <br>
    <a-row>
        <a-col>
            <a-descriptions title="主要技术框架" bordered :column="1">
                <template :key="key" v-for="key in (Object.keys(displayInfo.data))">
                    <a-descriptions-item
                        :label="key"
                        span="1"
                    >{{ displayInfo.data[key] }}
                    </a-descriptions-item>
                </template>
            </a-descriptions>
        </a-col>
    </a-row>
</template>

<script lang="ts">

import {reactive} from "vue";

export default {
    name: "Home",

    setup() {
        const data = {
            "vue": "^3.0.3",
            "vuex": "^4.0.0-rc.2",
            "vue-router": "^4.0.0-rc.5",
            "vite": "^1.0.0-rc.13",
            "typescript": "^4.1.2",
            "ant-design-vue": "^2.0.0-rc.2",
        }
        const displayInfo = reactive({data: data});
        return {
            displayInfo
        }
    }
}
</script>

<style scoped>

</style>