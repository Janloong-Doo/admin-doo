<template>
    <a-sub-menu :key="menuInfo.path" v-bind="$attrs">
        <template #title>
        <span>
          <MailOutlined/><span>{{ menuInfo.name }}</span>
        </span>
        </template>
        <template v-for="item in menuInfo.children" :key="item.path">
            <template v-if="!item.children">
                <a-menu-item :key="item.path">
                    <PieChartOutlined/>
                    <span>{{ item.name }}</span>
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu-info="item" :key="item.path"/>
            </template>
        </template>
    </a-sub-menu>
</template>
<script>
import {defineComponent} from "vue";
import {MailOutlined, PieChartOutlined} from '@ant-design/icons-vue';

export default defineComponent({
    name: "SubMenu",
    components: {
        PieChartOutlined,
        MailOutlined,
    },
    props: ['menuInfo']
// };
});
</script>
<style scoped>

</style>