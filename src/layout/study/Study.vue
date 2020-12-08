<template>
    <span>sssss</span>
    <button @click="f">获取用户信息</button>
</template>

<script lang="ts">
// import defAxios from '/@/utils/http/index.ts'
import {getUserInfoById} from "/@/api/User";

export default {
    name: "Study",
    setup() {
        const f = () => {
            let userInfoById = getUserInfoById({userId: "1"});
            console.log("userInfoById", userInfoById)
        }
        return {
            f
        }
    }
}
</script>

<style scoped>

</style>