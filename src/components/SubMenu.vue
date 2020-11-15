<template functional>
    <!--<template>-->
    <a-sub-menu :key="props.menuInfo.id">
     <span slot="title">
       <a-icon type="mail"/><span>{{ props.menuInfo.name }}</span>
     </span>
        <template v-for="item in props.menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.id">
<!--                <a-icon type="mail"/>-->
                <span>{{ item.name }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.id" :menu-info="item"/>
        </template>
    </a-sub-menu>
</template>
<script>
import { defineComponent } from "vue";

// export default ({
export default defineComponent({
// export default ({
    name: "SubMenu",
    props: ['menuInfo']
// };
});
</script>
<style scoped>

</style>