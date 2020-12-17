<template>
    <a-dropdown class="dropdownButtion">
        <template #overlay>
            <a-menu @click="handleMenuClick">
                <a-menu-item key="1">
                    <UserOutlined/>
                    {{t('admin.app.userInfo')}}
                </a-menu-item>
                <a-menu-item key="2">
                    <PoweroffOutlined/>
                    {{t('admin.app.loginOutButton')}}
                </a-menu-item>
            </a-menu>
        </template>
        <span style="margin: 5px ;padding: 20px">
<!--        <span >-->
            <a-space>
            <a-avatar src="/@/assets/img/1.ico" size="midem"/>
            <span style="font-size: medium">JanloongDoo</span>
            </a-space>
        </span>
    </a-dropdown>
</template>

<script lang="ts">
import {UserOutlined,PoweroffOutlined} from '@ant-design/icons-vue';
import {userStore} from "/@/store/modules/User.ts";
import {useI18n} from '/@/hooks/web/useI18n.ts';

export default {
    name: "UserHeader",
    components: {
        PoweroffOutlined,
        UserOutlined
    },
    setup() {
        const {t}=useI18n();
        const handleMenuClick = ({key}) => {
            switch (key) {
                case "1":
                    console.log("data", key)
                    break;
                case "2":
                    userStore.confirmLoginOut();
                    break;
            }
        }
        return {
            handleMenuClick,
            t
        }
    }
}
</script>

<style lang="stylus">
.dropdownButtion
    cursor: pointer;

.dropdownButtion:hover
    background-color #f1f1f1
</style>