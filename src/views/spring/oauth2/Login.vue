<template>
	<div id="login">
		<el-form
			:model="ruleForm"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="用戶名" prop="username">
				<el-input
					type="text"
					v-model="ruleForm.username"
					auto-complete="off"
				></el-input>
			</el-form-item>

			<el-form-item label="密码" prop="password">
				<el-input
					type="password"
					v-model="ruleForm.password"
					auto-complete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="validateCode">
				<el-input
					type="text"
					v-model="ruleForm.validateCode"
					auto-complete="off"
				></el-input>
				<img :src="imageSrc">
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')"
				>提交
				</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
  import AxiosUtil from "../../../assets/js/AxiosUtil";
  import {Message} from "element-ui";

  export default {
    name: "Login",
    data() {
      var validateUserName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用戶名"));
        } else {
          if (value.length < 2) {
            callback(new Error("用户名长度过短"));
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      var validateValidateCode = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入验证码"));
        } else {
          if (value.length < 2) {
            callback(new Error("用户名长度过短"));
          }
          callback();
        }
      };
      return {
        // imageSrc: 'http://192.168.211.1:9001/validate/imageCode',
        imageSrc: 'http://localhost:9001/validate/imageCode',
        ruleForm: {
          username: "doo",
          password: "doo",
          validateCode: "1111",
          // requestUrl: "http://192.168.211.129:9001/login"
          requestUrl: "http://localhost:9001/login"
        },
        rules: {
          username: [{validator: validateUserName, trigger: "blur"}],
          password: [{validator: validatePass, trigger: "blur"}],
          validateCode: [{validator: validateValidateCode, trigger: "blur"}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let username = this.$refs[formName].model.username;
            let password = this.$refs[formName].model.password;
            let validateCode = this.$refs[formName].model.validateCode;
            // AxiosUtil.post(this.loginUrl, {
            AxiosUtil.post(this.$refs[formName].model.requestUrl, {
              username: username,
              password: password,
              imageCode: validateCode
              , grant_type: 'password'
              , scope: 'read'
              , client_id: 'fooClientIdPassword'
              , client_secret: 'doo'
            })
              .then(res => {
                console.log(res);
                if (res.success) {
                  // this.$router.push({path: "/spring/index"})
                  console.log("登录成功");
                  this.$router.push({
                    name: "index",
                    // path: "/spring/index",
                    params: {signStatus: "success"}
                  });
                } else {
                  console.log("登录失败");
                  Message.error("登录失败");
                }
              })
              .catch(res => {
                console.log("异常错误");
              });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }


    }
  };
</script>

<style lang="stylus" scoped>
	#login
		width 30%
</style>
