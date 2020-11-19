<template>
    <div class="home">
        home3
        <HelloWorld :msg="msg"/>
        <CustomTreeTransfer></CustomTreeTransfer>
        <router-view></router-view>
    </div>
</template>

<script>

import HelloWorld from '../components/HelloWorld.vue'

export default {

    components: {
        HelloWorld, CustomTreeTransfer
    },
    data() {
        return {
            msg: "我是渣渣龙3!"
        }
    },
    methods: {
        djx() {
            console.log(this.ddd);
            this.ddd = this.ddd
                .split("")
                .reverse()
                .join("");
        },
    }
}
</script>

<style scoped>

</style>