<template>
    <div id="business">
        <a-layout id="components-layout-demo-custom-trigger">
            <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
                <div class="logo"/>
            <tree-menu></tree-menu>
            </a-layout-sider>

            <a-layout>
                <a-layout-header class="layoutheader">
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
import TreeMenu from "/@/components/menu/TreeMenu.vue"
export default {
    name: "BaseView",
    components: {
        TreeMenu
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
    // watch: {
    //     // '$route'(to, from) {
    //     //     console.log("to",to,from)
    //     // },
    //     '$route': {
    //         handler({path, matched}) {
    //             console.log("to", path, matched);
    //             let _keyPath = "";
    //             let _rootPath = matched[0].path;
    //             _keyPath = matched[0].children.length > 1 ? path : _rootPath
    //             this.rootPath = _rootPath;
    //             this.childPath = _keyPath
    //         },
    //         immediate: true,
    //     },
    //     resutData(to, from) {
    //         let filter = to.filter(value => value.path === this.childPath);
    //         console.log("to",to);
    //         this.selectedKeys.push(filter[0].id);
    //         let filter1 = to.filter(value => value.path === this.rootPath);
    //         this.openKeys.push(filter1[0].id);
    //     }
    // },
    beforeMount() {
    },
    beforeCreate() {
    },
    created() {
    },
    methods: {
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