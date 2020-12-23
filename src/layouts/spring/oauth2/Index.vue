<template>
    <div id="index">
        <a-space>
            <a-button :onclick="getUserInfo">获取用户返回信息</a-button>
            <a-button :onclick="getUserCurrent">获取用户认证信息</a-button>
            <a-button>获取token</a-button>
            <a-button>校验token</a-button>
            <a-button>登出</a-button>
        </a-space>
        <a-descriptions title="返回信息" bordered :column="1">
            <template :key="key" v-for="key in (Object.keys(displayInfo.data))">
                <a-descriptions-item
                    :label="key"
                    span="1"
                >{{ displayInfo.data[key] }}
                </a-descriptions-item>
            </template>
        </a-descriptions>

    </div>
</template>

<script lang="ts">

import {oauth2Store} from "/@/store/modules/Oauth2";
import {reactive, toRaw} from "vue";
import {deepMerge} from "/@/utils";
import {userCurrent} from "/@/api/Oauth2.ts";

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

        const displayInfo = reactive({data: toRaw(customOauth2UserInfo)})

        const getUserInfo = () => {
            let customOauth2UserInfo = oauth2Store.getCustomOauth2UserInfo
            displayInfo.data = {};
            deepMerge(displayInfo.data, customOauth2UserInfo)
        }
        const getUserCurrent = () => {
            userCurrent().then(value => {
                displayInfo.data = {};
                deepMerge(displayInfo.data, value)
            });
        }

        return {
            displayInfo,
            getUserInfo,
            getUserCurrent
        }
    },
}
</script>

<style scoped>

</style>