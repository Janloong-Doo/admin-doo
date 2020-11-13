<template>
	<div id="study" class="bk-inner">
		<div >

			<div :title="sup">悬停titile</div>
			<div>数值渲染: {{name}}</div>
			<div :title='sup' v-pre>显示原始信息跳过编译过程: {{name}}</div>

			<div :title="sup" v-cloak>插值表达式闪动（即显示双大括号）: {{name}}</div>
			<div  :title="sup" v-text="'使用v-text 没有闪动问题: '+name"></div>

			<div>

				<button v-on:click="seenAble">看美女</button>
				&nbsp
				<a v-if="seen">美女来了!!!</a>
				<a v-if="!seen">美女走了...</a>
			</div>
			<div class="bk2" v-on:click="djx">{{ddd}}</div>
		</div>
		<div>
			<p>{{name2}}</p>
			<input v-model="name2"/>
		</div>
		<div>
			<ol class="bk-inner">
				<li v-for="tt in todo">{{tt.text}}</li>
			</ol>
		</div>
		<div>
			<todolist v-for="(a,i) in todo " v-bind:key="i" v-bind:todo-name="a"></todolist>
		</div>
		<div>
		</div>
		<el-table>
			<el-row>
				<el-table-column label="1"/>
				<el-table-column label="2"/>
			</el-row>
			<el-row>
				<el-table-column label="1"/>
				<el-table-column label="2"/>
			</el-row>
		</el-table>
		<div>
			<el-input v-model.trim="requesturl" placeholder="请求url">
				<template slot="prepend">url:</template>
			</el-input>
			<el-select v-model="value" placeholder="选择">
				<el-option v-for="i in httpType"
				           :key="i.value"
				           :label="i.lable"
				           :value="i.value">
				</el-option>
			</el-select>

			<br>
			<el-radio-group v-model="requestMethod" size="small">
				<el-radio-button label="get"></el-radio-button>
				<el-radio-button label="post"></el-radio-button>
			</el-radio-group>
			<el-button v-on:click="requestUrl">提交
			</el-button>
			<br>
			<a>{{resultD}}</a><br>
			<br>
			<el-button @:click="randomTest">随机测试</el-button>
		</div>
	</div>
</template>
<script>
  import todolist from "../components/TodoList";
  import {Message} from 'element-ui';

  import axiosutils from "../assets/js/AxiosUtil.js";
  import signutil from '../assets/js/signMd5Utils';

  export default {
    name: "study",
    data() {
      return {
        name: "我是被渲染的"
        , sup: "指令"
        , seen: true
        , todo: [{text: "没钱"}, {text: "没车"}, {text: "没对象"}]
        , ddd: "点击有惊喜"
        , name2: "双向绑定"
        , requesturl: ''
        , resultD: ''
        , requestMethod: 'get',
        httpType: [{
          lable: "http://"
          , value: "as"
        }, {
          lable: "https://",
          value: "dds"
        }]

      };
    },
    props: {
      // name: "我是被渲染的"
      userId: Object
    },
    methods: {
      djx() {
        console.log(this.ddd);
        this.ddd = this.ddd
          .split("")
          .reverse()
          .join("");
      },
      seenAble() {
        this.seen = !this.seen
      },
      requestUrl() {
        if (this.requesturl === '' || this.requesturl == null) {
          // this.requesturl = "http://168.130.1.33:11001/authcenter/sysUser/login"
          // this.requesturl = "https://127.0.0.1:8082/warn/readList?type=today";
          // this.requesturl = "https://127.0.0.1:8082/warn/read";
          this.requesturl = "http://127.0.0.1:8082/zdh/zdhgj";
          // this.requesturl = "https://localhost:8088/head"
          // this.requesturl = "http://127.0.0.1:8082/getcache";
          // this.requesturl = "http://192.168.137.69:8082/getcache";
        }
        console.log('get请求开始');
        console.log(this.requesturl);
        let urlParams = signutil.parseQueryString(this.requesturl);
        console.log(this.requesturl);
        urlParams.apiCode = 'w3';
        urlParams.userId = '1';
        urlParams.type = 'cpu';
        let timestamp = new Date().valueOf();
        urlParams.timestamp = timestamp + '';
        urlParams.nonce = signutil.getNonce(timestamp);
        urlParams.sign = signutil.getSign(this.requesturl, urlParams);
        console.log(urlParams);
        if (this.requestMethod === "get") {
          axiosutils.get(this.requesturl, urlParams).then(res => {
            console.log("成功");
            console.log(res);
            this.resultD = res;
            Message.success(res);
          }).catch(res => {
            console.log("失敗");
            console.log(res);
            this.resultD = res;
            Message.error(res);
          })
        } else {
          axiosutils.post(this.requesturl, urlParams).then(res => {
            console.log("成功");
            console.log(res);
            this.resultD = res;
            Message.success(res);
          }).catch(res => {
            console.log("失敗");
            console.log(res);
            this.resultD = res;
            Message.error(res);
          })
        }
      },
      randomTest() {
        let router = this.$router;
        console.log(router)
      }

    },
    components: {
      todolist: todolist
    }

  }
  ;
</script>

<style lang="stylus" scoped>
	#study
		/*.bk-inner*/
		/*text-align left;*/

		div
			border-style solid
			border-width 1px
			margin-bottom 5px
			margin-top 2px
			padding 3px
			/*display inline*/

			div
				/*display inline*/
				margin: 2px
				margin-right 5px
				border-width 1px

		/*float start*/

		/*span*/
		/*  border-style solid*/
		/*  border-width 1px*/
		/*  margin-left 2px*/
		/*  margin-right: 2px*/

		.bk2
			background-color darkgray

		.area-single
			display inline

	[v-clock] {
		display none
	}
</style>
