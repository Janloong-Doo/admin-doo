<template>
	<div id="index">
		<span v-if="signStatus=='success'">登陆成功</span>
		<span v-else>测试首页面</span>
		<el-button v-on:click="getUserInfo">获取用户信息</el-button>
		<el-button v-on:click="getUserInfo2">获取所有信息</el-button>
		<el-button v-on:click="getUserInfo3">获取token</el-button>
		<el-button v-on:click="logout">退出登录</el-button>
		<span v-text="userInfo"></span>
	</div>
</template>

<script>
  import AxiosUtil from "../../../assets/js/AxiosUtil";
  import {Message} from 'element-ui'

  export default {
    name: "Index",
    data() {
      return {
        requestUrl: 'http://192.168.211.1:9001/logout',
        userInfo: ''
      }
    },
    props: {
      // 'signStatus'
      'signStatus': {
        type: String,
        default: 'index'
      }
    },
    // ],

    mounted() {
      console.log("status的值为");
      console.log(this.signStatus);
    },
    computed: {},
    methods: {
      getUserInfo() {
        console.log(this.signStatus);

        let url = 'http://localhost:9001/user/auth';
        AxiosUtil.get(url, null)
          .then(res => {
            if (res.success) {
              console.log(res);
              this.userInfo = res.data;
            } else {
              Message.error({message: "请求失败"});
            }
          }).catch(res => {
          console.log("获取用户信息失败")
          console.log(res);
        });
      },
      getUserInfo2() {
        console.log(this.signStatus);

        let url = 'http://localhost:9001/user';
        AxiosUtil.get(url, null)
          .then(res => {
            if (res.success) {
              console.log(res);
              this.userInfo = res.data;
            } else {
              Message.error({message: "请求失败"});
            }
          }).catch(res => {
          console.log("获取用户信息失败")
          console.log(res);
        });
      },
      getUserInfo3() {
        console.log(this.signStatus);

        let url = 'http://localhost:9001/oauth/token';

        AxiosUtil.post(url, {

          username: 'doo'
          , password: 'doo'
          , grant_type: 'password'
          , scope: 'read'
          , client_id: 'fooClientIdPassword'
          , client_secret: 'doo'
        })
          .then(res => {
            if (res.success) {
              console.log(res);
              this.userInfo = res.data;
            } else {
              Message.error({message: "请求失败"});
            }
          }).catch(res => {
          console.log("获取用户信息失败")
          console.log(res);
        });
      },
      logout() {
        AxiosUtil.post(this.requestUrl, null)
          .then(res => {
            if (res.success) {
              Message.info("退出成功");
              console.log(this.$router);
              this.$router.push({
                name: "login",
                params: {status: "success"}
              });
            } else {
              Message.info("退出失败");
            }
          }).catch(res => {
          console.log("退出失败")
        })

      }
    }
  }
</script>

<style scoped>

</style>