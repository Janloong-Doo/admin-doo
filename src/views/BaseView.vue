<template>
    <div id="business">
        <a-layout id="components-layout-demo-custom-trigger">
            <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
                <div class="logo"/>
                <!--                        :default-selected-keys="['/business/department']"-->
                <a-menu theme="dark"
                        mode="inline"
                        v-model:selectedKeys="selectedKeys"
                        v-model:openKeys="openKeys"
                        @click="onMenuClick">
                    <!--    动态菜单 -->
                    <template v-for="item in menuResult" :key="item.id">
                        <template v-if="!item.children">
                            <!--                            <a-menu-item :key="item.id">-->
                            <a-menu-item :key="item.id">
                                <PieChartOutlined/>
                                <span>{{ item.name }}</span>
                            </a-menu-item>
                        </template>
                        <template v-else>
                            <SubMenu :menu-info="item" :key="item.id"></SubMenu>
                        </template>
                    </template>

                </a-menu>

            </a-layout-sider>

            <a-layout>
                <a-layout-header class="layoutheader">
                    <!--            <a-icon-->
                    <!--                class="trigger"-->
                    <!--                :type="collapsed ? 'menu-unfold' : 'menu-fold'"-->
                    <!--                @click="() => (collapsed = !collapsed)"-->
                    <!--            />-->
                    <menu-unfold-outlined
                        v-if="collapsed"
                        class="trigger"
                        @click="() => (collapsed = !collapsed)"
                    />
                    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
                </a-layout-header>

                <a-layout-content class="layoutcontent"
                >
                    <router-view/>
                </a-layout-content>

                <a-layout-footer style="textAlign: center">
                    Copyright © 2020 <a target="_blank" href="https://blog.janloong.com">Janloong Doo</a>
                </a-layout-footer>
            </a-layout>

        </a-layout>
    </div>
</template>
<script>
// import SubMenu2 from '/@/components/SubMenu2.vue'

import Api from '../assets/api/api'
import DataUtils from '../assets/js/DataUtils'
import {AppstoreOutlined, DesktopOutlined, InboxOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined,} from '@ant-design/icons-vue';

const SubMenu = {
    components: {
        PieChartOutlined,
        MailOutlined
    },
    template: `
        <a-sub-menu :key="menuInfo.id" v-bind="$attrs">
        <template #title>
        <span>
          <MailOutlined/><span>{{ menuInfo.name }}</span>
        </span>
        </template>
        <template v-for="item in menuInfo.children" :key="item.id">
            <template v-if="!item.children">
                <a-menu-item :key="item.id">
                    <PieChartOutlined/>
                    <span>{{ item.name }}</span>
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu-info="item" :key="item.id"/>
            </template>
        </template>
        </a-sub-menu>
    `,
    name: 'SubMenu',
    props: {
        menuInfo: {
            type: Object,
            default: () => ({}),
        },
    },
};

export default {
    name: "BaseView",
    components: {
        SubMenu,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        PieChartOutlined,
        MailOutlined,
        DesktopOutlined,
        InboxOutlined,
        AppstoreOutlined,
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
    computed: {
        // selectKeys(){
        //     let filter = this.resutData.filter(value => value.url === this.childPath);
        //     console.log("dataComputed",this.resutData,filter,this.childPath)
        //     return filter.id;
        // },
        // openKeys(){
        //     let filter = this.resutData.filter(value => value.url === this.rootPath);
        //     return  filter.id;
        // }

    },
    watch: {
        // '$route'(to, from) {
        //     console.log("to",to,from)
        // },
        '$route': {
            handler({path, matched}) {
                console.log("to", path, matched);
                let _keyPath = "";
                let _rootPath = matched[0].path;
                _keyPath = matched[0].children.length > 1 ? path : _rootPath
                this.rootPath = _rootPath;
                this.childPath = _keyPath
                console.log("path", this.rootPath, this.childPath)
                // let filter = this.resutData.filter(value => value.url === _keyPath);
                // this.openKeys = this.resutData.filter(value => value.url === rootPath).id;
                // this.selectedKeys = filter.id
                // console.log("menuSelect", this.openKeys, this.selectedKeys, filter)
            },
            immediate: true,
        },
        resutData(to, from) {
            let filter = to.filter(value => value.url === this.childPath);
            this.selectedKeys.push(filter[0].id);
            let filter1 = to.filter(value => value.url === this.rootPath);
            this.openKeys.push(filter1[0].id);
        }
    },
    beforeMount() {
    },
    beforeCreate() {
    },
    created() {
        this.initMenuList();
    },
    methods: {
        initMenuList() {
            Api.getMenuListByUser().then(value => {
                if (value.code === 0) {
                    this.resutData = value.data;
                    // this.menuResult = DataUtils.initTreeData(this.resutData);
                    this.menuResult = DataUtils.initTreeData(value.data);

                } else {
                    console.log("获取失败")
                }
            }).catch(reason => {

            });
        },

        onMenuClick({item, key, keyPath}) {
            console.log("item", key, keyPath);
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
                    this.$router.push({path: url});
                    // router.push({path: url});
                    // this.$router.push({name: code});
                    break;

            }
        }
    }


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