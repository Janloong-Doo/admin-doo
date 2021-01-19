<template>
  <div>
    <!--                <a-layout id="components-layout-demo-fixed-sider">-->
    <a-layout id="components-layout-demo-custom-trigger">

      <!--            <a-layout-sider class="custom-layout-sider" v-model:collapsed="collapsed" :trigger="null" collapsible >-->
      <!--            <a-layout-sider class="custom-layout-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>-->
      <a-layout-sider class="custom-layout-sider" v-model:collapsed="collapsed">
        <div class="logo"></div>
        <tree-menu></tree-menu>
      </a-layout-sider>

      <a-layout class="custom-layout-right">
        <a-layout-header class="custom-layout-header">
          <!--                        <a-col :span="1">-->
          <!--                            <MenuUnfoldOutlined-->
          <!--                                v-if="collapsed"-->
          <!--                                class="trigger"-->
          <!--                                @click="() => (collapsed = !collapsed)"-->
          <!--                            />-->
          <!--                            <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>-->
          <!--                        </a-col>-->
          <!--            <a-col :span="4" offset="19">-->
          <!--            <a-col :offset="2" :span="4">-->
          <!--          <a-row type="flex" justify="start" align="middle">-->
          <user-header></user-header>
          <local-menu></local-menu>
          <!--          </a-row>-->
          <!--          <a-divider type="horizontal"></a-divider>-->
        </a-layout-header>
        <a-layout-content class="custom-layout-content"
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

<style lang="stylus" scoped>
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

#components-layout-demo-custom-trigger .custom-layout-header {
  background-color #fff
  padding 0
}

.custom-layout-sider {
  overflow auto
  height 100vh
  position fixed
  left 0
  //width 20%
}

.custom-layout-right {
  margin-left 200px
  //margin-left 120px
  display flex
  flex-direction column
}

.custom-layout-header {
  position fixed
  overflow initial
  z-index 1
  outline-color #c8c7cc
  outline-width 1px
  outline-style solid
  //box-sizing border-box
  //border-bottom-style solid
  //border-bottom-color #c8c7cc
  //border-width:1px;
  //padding-right 300px
  flex-direction row
  //width calc(100vw)
  //position: relative;
  //width 100%
  justify-content end
}

.custom-layout-content {
  overflow initial
  margin 65px 0 14px
  padding 30px 35px
  background #fff
  //minHeight 80%
  //width 100%

  //position fixed
  //zIndex 1
}


.routeviewcontent {
  //height 800px
  //height 500px
  //height 240px
}
</style>