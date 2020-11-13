<template>
    <div id="business">
        <!--              <router-link to="/business/department">department</router-link>-->
        <!--                  <router-link to="/business/role">Role</router-link>-->
        <a-layout id="components-layout-demo-side">
            <a-layout-sider class="menusider" theme="dark" v-model="collapsed" trigger collapsible>
                <div class="logo"/>

                <a-menu theme="dark" mode="inline" :default-selected-keys="['/department']"  @click="onMenuClick">
                    <!--    动态菜单          -->
                    <template v-for="item in menuResult">
                        <a-menu-item v-if="!item.children" :key="item.id" >
                            <a-icon type="pie-chart"/>
                            <span>{{ item.name }}</span>
                        </a-menu-item>
                        <SubMenu v-else :key="item.id" :menu-info="item"></SubMenu>
                    </template>

                </a-menu>

            </a-layout-sider>


            <a-layout>
                <a-layout-header style="background: #fff; padding: 0">
                    <!--          <a-icon-->
                    <!--              class="trigger"-->
                    <!--              :type="collapsed ? 'menu-unfold' : 'menu-fold'"-->
                    <!--              @click="() => (collapsed = !collapsed)"-->
                    <!--          />-->

                </a-layout-header>
                <a-layout-content class="layoutcontent"
                >
                    <router-view class="routeviewcontent"/>
                </a-layout-content>
                <a-layout-footer style="textAlign: center">
                    Copyright © 2020 <a target="_blank" href="https://blog.janloong.com">Janloong Doo</a>
                </a-layout-footer>
            </a-layout>

        </a-layout>
    </div>
</template>
<script>
import SubMenu from '../components/SubMenu'
import Api from '../assets/api/api'
import DataUtils from '../assets/js/DataUtils'

export default {
    name: "Business",
    components: {SubMenu},
    data() {
        return {
            collapsed: false,
            // collapsed: 'collapsed',
            resutData: [],
            menuResult: []
        }
    },
    computed: {},
    created() {
        this.initMenuList();
    },
    methods: {
        initMenuList() {
            Api.getMenuListByUser().then(value => {
                if (value.code === 0) {
                    this.resutData = value.data;
                   this.menuResult= DataUtils.initTreeData(this.resutData);
                    // this.menuList=
                } else {
                    console.log("修改失败")
                    console.log(value)
                }
            }).catch(reason => {

            });
        },

        onMenuClick({item, key, keyPath}) {
            console.log(item);
            console.log(key);
            console.log(keyPath);
            switch (key) {
                case '/department':
                    this.$router.push({path: "/business/department"});
                    break;
                case '/role':
                    this.$router.push({path: "/business/role"});
                    break;
                case '/menuManager':
                    this.$router.push({path: "/business/menuManager"});
                    break;
                default:
                    let filterElement = this.resutData.filter(value => value.id === key)[0];
                    let code = filterElement.code;
                    let url = filterElement.url;
                    console.log(code);
                    console.log(url);
                    this.$router.push({path: url});
                    // this.$router.push({name: code});
                    break;

            }
        }
    }


}
</script>

<style lang="stylus">
#components-layout-demo-side {
    height 100%
}

#components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;

}

.menusider {
    //overflow 'auto'
    //height: '100vh'
    //position: 'fixed'
    //left 0
}

.layoutcontent {
    margin 2px
    padding 24px
    background #fff
    minHeight 800px
    //height 100%
    //height 800px
}

.routeviewcontent {
    //height 800px
    //height 500px
    //height 240px
}
</style>