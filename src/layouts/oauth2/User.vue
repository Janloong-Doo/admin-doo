<template>
	<div id="index">
		<!--		<span v-if="signStatus==='index'">测试首页面</span>-->
		<!--		<span v-if="signStatus==='success'">登陆成功</span>-->
		<!--		<span v-else>测试首页面</span>-->
		<!--		<el-button v-on:click="getUserInfo">获取用户信息</el-button>-->
		<!--		<el-button v-on:click="logout">退出登录</el-button>-->
		<!--		<span v-text="'用户界面:'+id"></span>-->
		<span>{{id}}</span>
		<span>{{name}}</span>
		<span>{{age}}</span>
	</div>
</template>

<script>
  import AxiosUtil from "../../../assets/js/AxiosUtil";
  import {Message} from 'element-ui'

  export default {
    name: "User",
    props: [
      'id', 'age', 'name'
    ],
    watch: {
      '$route'(to, from) {
        console.log(to);
        console.log(from)
      }
    },
    data() {
      return {
        requestUrl: 'http://192.168.211.1:9001/logout',
        signStatus: 'index',
        idValue: ''

      }
    },

    mounted() {
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>

</style>