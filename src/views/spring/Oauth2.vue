<template>
    <div id="Oauth2">
        <a-tabs type="card" @change="callback">
            <!--            <template v-for="item in tabResult">-->
            <!--                <a-tab-pane :key="item.key" :tab="item.tab">-->
            <!--                   <Login v-if="item.key==1"></Login>-->
            <!--                   <user v-else-if="item.key==2"></user>-->
            <!--                   <index v-else-if="item.key==3"></index>-->
            <!--                   <authenticate v-else-if="item.key==4"></authenticate>-->
            <!--                </a-tab-pane>-->
            <!--            </template>-->
            <keep-alive>
                <component :is="tabComponent"></component>
            </keep-alive>
        </a-tabs>
        <!--		<div id="nav">-->
        <!--			<router-link to="/spring/login">Login</router-link>-->
        <!--			|-->
        <!--			<router-link to="/spring/index">Index</router-link>-->
        <!--			|-->
        <!--			<router-link to="/spring/doo/user">User</router-link>-->
        <!--			|-->
        <!--			<router-link to="/spring/oauth">oauth</router-link>-->
        <!--		</div>-->
    </div>
</template>
<script>
import Login from './oauth2/Login'
import Authenticate from './oauth2/Authenticate'
import Index from './oauth2/Index'
import User from './oauth2/User'

export default {
    name: "Oauth2",
    components: {Login, User, Index, Authenticate},
    data() {
        let returnTabResult = [
            {
                'key': 1,
                'tab': 'login'
            }, {
                'key': 2,
                'tab': 'user'
            }, {
                'key': 3,
                'tab': 'index'
            }, {
                'key': 4,
                'tab': 'authenticate'
            }
        ]
        return {
            tabResult: returnTabResult,
            tabComponent: ''
        }
    },
    methods: {
        callback(key) {
            console.log(key);
            this.tabComponent = this.tabResult.filter(value => value.key === key).tab;
        },
    }
}
</script>

<style lang="stylus">
</style>