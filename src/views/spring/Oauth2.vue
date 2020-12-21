<template>
    <div id="Oauth2">
        <a-tabs type="card" @change="callback">
            <template v-for="item in tabResult" :key="item.key">
                <a-tab-pane :tab="item.tab">
                    <!--                    <Login v-if="item.key==1"></Login>-->
                    <!--                    <user v-else-if="item.key==2"></user>-->
                    <!--                    <index v-else-if="item.key==3"></index>-->
                    <!--                    <authenticate v-else-if="item.key==4"></authenticate>-->
                    <keep-alive>
                        <component :is="tabComponent"></component>
                    </keep-alive>
                </a-tab-pane>
            </template>
        </a-tabs>
    </div>
</template>
<script lang="ts">
import Login from '/@/layouts/oauth2/Login.vue'
// import Authenticate from '/@/layouts/oauth2/Authenticate.vue'
// import Index from '/@/layouts/oauth2/Index.vue'
// import User from '/@/layouts/oauth2/User.vue'
import {ref} from "vue";

export default {
    name: "Oauth2",
    // components: {Login, User, Index, Authenticate},
    components: {Login},

    setup() {
        let returnTabResult = [
            {
                'key': 1,
                'tab': 'login'
            },
            {
                'key': 2,
                'tab': 'user'
            },
            {
                'key': 3,
                'tab': 'index'
            },
            {
                'key': 4,
                'tab': 'authenticate'
            }
        ]
        const tabComponent = ref("Login");
        const callback = (key: number) => {
            console.log(key);
            tabComponent.value = returnTabResult.filter(value => value.key === key)[0].tab;
        };
        return {
            tabResult: returnTabResult,
            callback,
            tabComponent
        }
    },

}
</script>

<style lang="stylus">
</style>