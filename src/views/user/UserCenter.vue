<template>
    我的中心
    <a-card hoverable style="width:30%">
        <template #cover>
            <img alt="JanloongDoo" :src="logo"/>
        </template>
        <a-card-grid style="width:50%;text-align:center">
            <br/>
            <a-card-meta :title="userDetailInfo.username">
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
import {getUserDetailInfo} from "/@/api/User";
import {defineComponent, onMounted, reactive} from "vue";
import {UserDetailInfo} from "/@/api/model/UserModel";
import {deepMerge} from "/@/utils";
import logo from "/@/assets/img/1.ico";

export default defineComponent({
    name: "UserCenter",
    components: {SettingOutlined, EditOutlined, EllipsisOutlined},
    // async setup() {
    setup() {
        let userInfoState = userStore.getUserInfoState;
        let userDetailInfo = reactive({} as UserDetailInfo)
        onMounted(async () => {
            const userDetailInfo2 = await getUserDetailInfo({id: userInfoState.id});
            deepMerge(userDetailInfo, userDetailInfo2);
        });
        return {
            userDetailInfo,
            logo
        }
    }
})
</script>

<style lang="stylus">

</style>