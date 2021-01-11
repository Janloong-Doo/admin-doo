<template>
    <div id="index">
        <a-space>
            <a-button :onclick="getUserInfo">获取返回信息</a-button>
            <a-button :onclick="getUserCurrentByAuth">获取Auth当前认证信息</a-button>
            <a-button :onclick="getUserCurrent">获取Hap当前认证信息</a-button>
            <a-button :onclick="getTokenInfo">获取token</a-button>
            <a-button :onclick="checkToken">校验token</a-button>
        </a-space>
        <br/>
        <br/>
        <a-input  v-model:value="tokenInput"  placeholder="默认查询当前用户token,输入后查询指定的token"></a-input>
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

import {userStore} from "/@/store/modules/User.ts";
import {reactive, ref, toRaw} from "vue";
import {deepMerge} from "/@/utils";
import {checkoutToken, userCurrent} from "/@/api/Oauth2.ts";
import {GetUserCurrent} from "/@/api/User.ts";

export default {
    name: "Current",
    props: {
        'signStatus': {
            type: String,
            default: 'index'
        }
    },
    setup() {
        let userBaseInfo = userStore.getUserInfoState;
        let data = toRaw(userBaseInfo);
        const displayInfo = reactive({data: data})
        const tokenInput = ref("");
        let tokenState = userStore.getTokenState;

        const getUserInfo = () => {
            let baseInfo = userStore.getUserInfoState
            displayInfo.data = {};
            deepMerge(displayInfo.data, toRaw(baseInfo))
        }
        const getUserCurrent = () => {
            userCurrent().then(value => {
                displayInfo.data = {};
                deepMerge(displayInfo.data, value)
            });
        }

        const getUserCurrentByAuth = () => {
            GetUserCurrent({}).then(value => {
                displayInfo.data = {};
                deepMerge(displayInfo.data, value)
            });
        }

        const getTokenInfo = () => {
            displayInfo.data = {};
            // deepMerge(displayInfo.data, toRaw(tokenState))
            deepMerge(displayInfo.data, {token: tokenState})
        }

        const checkToken = () => {
            let token = tokenState;
            if (tokenInput.value) {
                token = tokenInput.value;
            }
            if (token.startsWith("bearer ") || token.startsWith("Bearer ")) {
                token = token.split(" ")[1];
            }
            checkoutToken({token: token}).then(value => {
                displayInfo.data = {};
                deepMerge(displayInfo.data, value)
            });
        }
        return {
            displayInfo,
            getUserInfo,
            getTokenInfo,
            checkToken,
            getUserCurrentByAuth,
            getUserCurrent,
            tokenInput
        }
    },
}
</script>

<style scoped>

</style>