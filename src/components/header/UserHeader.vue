<template>
    <a-dropdown class="dropdownButtion">
        <template #overlay>
            <a-menu @click="handleMenuClick">
                <a-menu-item key="1">
                    <UserOutlined/>
                    个人信息
                </a-menu-item>
                <a-menu-item key="2">
                    <UserOutlined/>
                    退出
                </a-menu-item>
            </a-menu>
        </template>
        <span style="margin: 5px ;padding: 20px">
            <a-space>
            <a-avatar src="/@/assets/img/1.ico" size="midem"/>
            <span style="size: 30px">JanloongDoo</span>
            </a-space>
        </span>
    </a-dropdown>
</template>

<script lang="ts">
import {UserOutlined} from '@ant-design/icons-vue';

export default {
    name: "UserHeader",
    components: {
        UserOutlined
    },
    setup() {

    }
}
</script>

<style lang="stylus">
.dropdownButtion
    cursor: pointer;

.dropdownButtion:hover
    background-color #f1f1f1
</style>