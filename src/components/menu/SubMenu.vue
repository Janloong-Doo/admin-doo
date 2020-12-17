<template>
    <a-sub-menu :key="menuInfo.path" v-bind="$attrs">
        <template #title>
        <span>
           <g-icon :icon="menuInfo.icon" :size="iconSize.value"></g-icon>
            <span>{{ menuInfo.name }}</span>
        </span>
        </template>
        <template v-for="item in menuInfo.children" :key="item.path">
            <template v-if="!item.children">
                <a-menu-item :key="item.path">
                    <g-icon :icon="item.icon" :size="iconSize.value"></g-icon>
                    <span>{{ item.name }}</span>
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu-info="item" :key="item.path"/>
            </template>
        </template>
    </a-sub-menu>
</template>
<script lang="ts">
import {defineComponent,ref} from "vue";
import {MailOutlined, PieChartOutlined} from '@ant-design/icons-vue';
import GIcon from "/@/components/Icon";

export default defineComponent({
    name: "SubMenu",
    components: {
        GIcon,
        PieChartOutlined,
        MailOutlined,
    },

    props: {
        menuInfo: {
            type: Object
        },
        iconSize: {
            type: String
        }
    },
    setup(props,context){
        const iconSize=ref(props.iconSize)
        return {
            iconSize
        }
    }
// };
});
</script>
<style scoped>

</style>