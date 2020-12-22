<template>
    <div id="index">
        <a-space>
            <a-button :onclick="getUserInfo">获取返回信息</a-button>
            <a-button>获取当前认证信息</a-button>
            <a-button>获取token</a-button>
            <a-button>校验token</a-button>
            <a-button>登出</a-button>
        </a-space>
        <a-descriptions title="返回信息" bordered :column="1">
            <template :key="key" v-for="key in (Object.keys(displayInfo))">
                <a-descriptions-item
                    :label="key"
                    span="1"
                >{{ displayInfo[key] }}
                </a-descriptions-item>
            </template>
        </a-descriptions>

    </div>
</template>

<script lang="ts">

import {oauth2Store} from "/@/store/modules/Oauth2";
import {reactive} from "vue";
import {deepMerge} from "/@/utils";

export default {
    name: "Index",
    props: {
        'signStatus': {
            type: String,
            default: 'index'
        }
    },
    setup() {
        let customOauth2UserInfo = oauth2Store.getCustomOauth2UserInfo;
        const displayInfo=reactive(customOauth2UserInfo)
        console.log("index页面", customOauth2UserInfo)

        const getUserInfo=()=>{
            console.log("点击")
            let customOauth2UserInfo= oauth2Store.getCustomOauth2UserInfo
            deepMerge(displayInfo,customOauth2UserInfo)
        }

        return {
            displayInfo,
            getUserInfo
        }
    },
}
</script>

<style scoped>

</style>