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
                    <g-icon :icon="item.icon" :size="iconSize.value"></g-icon><span>{{ item.name }}</span>
                </a-menu-item>
            </template>
            <template v-else>
                <SubMenu :menu-info="item" :key="item.path" icon-size="16"></SubMenu>
            </template>
        </template>

    </a-menu>
</template>

<script lang='ts'>
import {defineComponent, reactive, ref} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {permissionStore} from "/@/store/modules/permission.ts";
import {MailOutlined, PieChartOutlined} from '@ant-design/icons-vue';
import SubMenu from "/@/components/menu/SubMenu.vue"
import GIcon from "/@/components/Icon";

export default defineComponent({
    name: "TreeMenu",
    props: ['menuInfo'],
    components: {
        GIcon,
        PieChartOutlined,
        MailOutlined,
        SubMenu,
    },
    setup() {

        const iconSize = ref(16);
        //获取菜单信息
        let backMenuListState = permissionStore.getBackMenuListState;
        //获取当前路由节点信息
        let route = useRoute();
        //当前路由的匹配路由路径项
        let strings = route.matched.map(value => value.path).concat();
        const menuBase = reactive({
            selectedKeys: [route.path],
            openKeys: strings
        });
        let router = useRouter();
        onBeforeRouteUpdate((to, from) => {
            console.log("to from: ", to, from)
        })

        const onMenuClick = ({item, key, keyPath}: any) => {
            console.log("item", key, keyPath, item);
            router.push({path: key})
        }

        return {
            menuInfo: backMenuListState,
            onMenuClick,
            menuBase,
            iconSize
        }
    }
});
// });
</script>
<style scoped>

</style>