<template>
    <a-dropdown class="dropdownButtion">
        <template #overlay>
            <a-menu @click="handleMenuClick">
                <a-menu-item key="1">
                    中文
                </a-menu-item>
                <a-menu-item key="2">
                    英文
                </a-menu-item>
            </a-menu>
        </template>
        <span style="margin: 5px ;padding: 20px">
            <a-space>
                <span class="iconify" data-icon="gg:loadbar-doc" data-inline="false"></span>
<!--                <g-icon icon="gg:loadbar-doc"></g-icon>-->
            <span style="size: 30px">JanloongDoo</span>
            </a-space>
        </span>
    </a-dropdown>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {userStore} from "/@/store/modules/User.ts";
// import GIcon from "/@/components/Icon"

export default defineComponent({
    props: {
        menuInfo: Array
    },
    components: {},


    setup() {
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
            handleMenuClick
        }
    }
})
</script>


<style lang="stylus">
.dropdownButtion
    cursor: pointer;

.dropdownButtion:hover
    background-color #f1f1f1
</style>