<template>
	<div id="Authenticate">
		<!--		<el-button v-on:click="getUserInfo">获取用户信息</el-button>-->
		<!--		<el-button v-on:click="logout">退出登录</el-button>-->
		<!--		<span v-text="'用户界面:'+id"></span>-->
		<el-button v-on:click="getToken">获取token</el-button>
		|
		<el-button v-on:click="checkoutToken">校验token</el-button>
		|
		<el-button v-on:click="getResourceInfo">获取资源信息</el-button>
	</div>
</template>

<script>
  import Api from "../../../assets/api/api.js";
  import {
    mapState,
    mapMutations
  } from 'vuex';

  export default {
    name: "Authenticate",
    props: [],
    watch: {
      '$route'(to, from) {
        console.log(to);
        console.log(from)
      }
    },
    data() {
      return {}
    },

    mounted() {

    },
    computed: {
      ...mapState(['token'])
    },
    methods: {
      ...mapMutations(['setToken']),

      getToken() {
        let that = this;
        let parmas = {
          username: 'doo'
          , password: 'doo'
          , grant_type: 'password'
          , scope: 'read'
          , client_id: 'fooClientIdPassword'
          , client_secret: 'doo'
		        , create_time:new Date()
        };
        Api.getToken(parmas).then(value => {
          console.log('result value');
          console.log(value);
          that.setToken(value.access_token);
        }).catch(reason => {
        })
      },
      checkoutToken() {
        let parmas = {
          token: this.token
        };
        Api.checkToken(parmas).then(value => {
          console.log('result value');
          console.log(value);
        }).catch(reason => {
        })
      },
      getResourceInfo() {
        let parmas = {
          // token: this.token
          access_token: this.token

        };
        Api.getResourceInfo(parmas).then(value => {
          console.log('result value');
          console.log(value);
        }).catch(reason => {
        })
      }

    }
  }
</script>

<style scoped>

</style>