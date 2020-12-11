<template>
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
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { permissionStore } from "vuex";
import {MailOutlined, PieChartOutlined,} from '@ant-design/icons-vue';

export default defineComponent({
    name: "SubMenu2",
    props: ['menuInfo'],
    components: {
        PieChartOutlined,
        MailOutlined,
    },
    setup() {
        permissionStore.getMenuListByUser()
    }
});
// });
</script>
<style scoped>

</style>