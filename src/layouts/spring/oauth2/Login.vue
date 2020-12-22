<template>
    <div id="login">
        <a-form
            layout="vertical"
            :model="ruleForm"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-item label="用户名:" v-bind="validateInfos.username">
                <a-input placeholder="请输入用户名" v-model:value="ruleForm.username"></a-input>
            </a-form-item>
            <a-form-item label="密码:" v-bind="validateInfos.password">
                <a-input-password placeholder="请输入密码" v-model:value="ruleForm.password"></a-input-password>
            </a-form-item>
            <a-space>
                <a-button @click="resetFields">
                    取消
                </a-button>
                <a-button type="primary" @click="submitForm">
                    确认
                </a-button>
            </a-space>
        </a-form>
        <a-descriptions title="返回信息" bordered :column="1" >
            <template :key="key" v-for="key in (Object.keys(userBaseInfo))" >
                <a-descriptions-item
                    :label="key"
                    span="1"
                >{{ userBaseInfo[key] }}
                </a-descriptions-item >
            </template>
        </a-descriptions>

    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {useForm} from "@ant-design-vue/use";
import {oauth2Store} from "/@/store/modules/Oauth2.ts";
import {deepMerge} from "/@/utils";
import {UserBaseInfo} from "/@/api/model/UserModel";


export default defineComponent({
    name: "Login",
    setup() {
        const imageSrc = ref('http://localhost:9001/validate/imageCode');
        const requestUrl = ref('http://localhost:9001');
        const userBaseInfo = reactive({} as UserBaseInfo);
        const ruleForm = reactive({
            username: "janloongdoo",
            password: "janloong",
            validateCode: "1111",
        });
        const rules = reactive({
            username: [{
                required: true,
                message: '请输入角色名称',
                trigger: "blur"
            }],
            password: [{
                required: true,
                message: '请输入角色名称',
                trigger: "blur"
            }],
        });
        const {resetFields, validate, validateInfos} = useForm(ruleForm, rules, {immediate: true});

        const submitForm = () => {
            validate()
                .then(() => {
                    console.log("校验成功")
                    let username = ruleForm.username;
                    let password = ruleForm.password;
                    let validateCode = ruleForm.validateCode;
                    // imageCode: validateCode
                    // , grant_type: 'password'
                    // , scope: 'read'
                    // , client_id: 'fooClientIdPassword'
                    // , client_secret: 'doo'
                    console.log(222)
                    oauth2Store.customLogin({username: username, password: password}).then(value => {
                        deepMerge(userBaseInfo, value)
                    });
                })
                .catch(err => {
                    console.log("校验失败")
                });
        }


        return {
            resetFields,
            validateInfos,
            labelCol: {span: 4},
            wrapperCol: {span: 14},
            ruleForm,
            rules,
            userBaseInfo,
            submitForm
        }
    },

    methods: {}
});
</script>

<style lang="stylus" scoped>
#login
    width 100%
</style>
