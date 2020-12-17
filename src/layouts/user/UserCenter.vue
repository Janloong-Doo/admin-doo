<template>
    我的中心
    <a-card hoverable style="width:30%">
            <template #cover>
                <img alt="JanloongDoo" src="/@/assets/img/1.ico"/>
            </template>
        <a-card-grid style="width:50%;text-align:center">
            <br/>
            <a-card-meta :title="userInfoState.username">
                <template #description>
                    <span>blog.janloong.com</span><br/>
                    <span>You have to work very hard to look effortless.</span>
                </template>
            </a-card-meta>
            <template class="ant-card-actions" #actions>
                <setting-outlined key="setting"/>
                <edit-outlined key="edit"/>
                <ellipsis-outlined key="ellipsis"/>
            </template>
        </a-card-grid>
        <a-card-grid style="width:50%;text-align:center">
            Content
        </a-card-grid>
    </a-card>
</template>

<script lang="ts">
import {userStore} from "/@/store/modules/User.ts"
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons-vue';

export default {
    name: "UserCenter",
    components: {SettingOutlined, EditOutlined, EllipsisOutlined},
    setup() {
        let userInfoState = userStore.getUserInfoState;
        console.log("userInfoState", userInfoState);
        return {
            userInfoState
        }
    }
}
</script>

<style lang="stylus">

</style>