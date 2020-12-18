<template>
    <div id="business">
        <a-layout id="components-layout-demo-custom-trigger">
            <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
                <div class="logo"/>
                <tree-menu></tree-menu>
            </a-layout-sider>

            <a-layout>
                <a-layout-header class="layoutheader">
                    <a-row type="flex" justify="start" align="middle">
                        <a-col :span="1">
                            <MenuUnfoldOutlined
                                v-if="collapsed"
                                class="trigger"
                                @click="() => (collapsed = !collapsed)"
                            />
                            <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
                        </a-col>
                        <a-col :span="4" offset="19">
                            <user-header></user-header>
                            <local-menu></local-menu>
                        </a-col>
                    </a-row>
                </a-layout-header>

                <a-layout-content class="layoutcontent"
                >
<!--                    <suspense>-->
<!--                        <template #default>-->
                            <router-view/>
<!--                        </template>-->
<!--                        <template #fallback>-->
<!--                            <h1>Loading</h1>-->
<!--                        </template>-->
<!--                    </suspense>-->
                </a-layout-content>

                <a-layout-footer style="textAlign: center">
                    Copyright © 2020 <a target="_blank" href="https://blog.janloong.com">Janloong Doo</a>
                </a-layout-footer>
            </a-layout>

        </a-layout>
    </div>
</template>
<script lang="ts">
import TreeMenu from "/@/components/menu/TreeMenu.vue"
import UserHeader from "/@/components/header/UserHeader.vue"
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import LocalMenu from "/@/components/header/LocalMenu.vue";

export default {
    name: "BaseView",
    components: {
        LocalMenu,
        TreeMenu,
        MenuFoldOutlined,
        UserHeader,
        MenuUnfoldOutlined
    },
    setup() {
    },

    data() {
        return {
            collapsed: false,
            // collapsed: 'collapsed',
            resutData: [],
            menuResult: [],
            //菜单选项
            selectedKeys: [],
            openKeys: [],
            //当前路由菜单信息
            rootPath: '',
            childPath: ''
        }
    },
}
</script>

<style lang="stylus">
#components-layout-demo-custom-trigger {
    height 100%
    //line-height: 64px;
    //padding: 0
    //cursor: pointer;
    //transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}

#components-layout-demo-custom-trigger .layoutheader {
    background #fff
    padding 0
}


.layoutcontent {
    //margin 2px
    //padding 24px
    //background #fff
    //margin 24px 16px
    margin 20px 12px 0px
    padding 24px
    background #fff
    minHeight 280px
}


.routeviewcontent {
    //height 800px
    //height 500px
    //height 240px
}
</style>