<template>
    <a-menu theme="dark"
            mode="inline"
            v-model:selectedKeys="menuBase.selectedKeys"
            v-model:openKeys="menuBase.openKeys"
            @click="onMenuClick">
        <!--    动态菜单 -->
        <template v-for="item in menuInfo" :key="item.path">
            <template v-if="!item.children">
                <a-menu-item :key="item.path">
                    <PieChartOutlined/>
                    <span>{{ item.name }}</span>
                </a-menu-item>
            </template>
            <template v-else>
                <SubMenu :menu-info="item" :key="item.path"></SubMenu>
            </template>
        </template>

    </a-menu>
</template>

<script lang='ts'>
import {defineComponent, reactive} from "vue";
import {useRouter} from "vue-router";
import {permissionStore} from "/@/store/modules/permission.ts";
import {MailOutlined, PieChartOutlined} from '@ant-design/icons-vue';
import SubMenu from "/@/components/menu/SubMenu.vue"

export default defineComponent({
    name: "SubMenu2",
    props: ['menuInfo'],
    components: {
        PieChartOutlined,
        MailOutlined,
        SubMenu,
    },
    setup() {
        let backMenuListState = permissionStore.getBackMenuListState;
        const menuBase = reactive({
            selectedKeys: [],
            openKeys: []
        });

        console.log("menu组件内list", backMenuListState)
        let router = useRouter();
        router.beforeEach((to, from) => {
            console.log("to22222222", to, from)
        })
        const onMenuClick = ({item, key, keyPath}: any) => {
            console.log("item", key, keyPath, item);
            // let filterElement = backMenuListState.filter(value => value.path === JSON.stringify(key));
            // console.log("筛选后的数据", filterElement)
            // let url = filterElement.path;
            // this.$router.push({path: url});
            router.push({path: key})
            // router.push({path: url});
            // this.$router.push({name: code});

        }
        return {
            menuInfo: backMenuListState,
            onMenuClick,
            menuBase
        }
    }
});
// });
</script>
<style scoped>

</style>