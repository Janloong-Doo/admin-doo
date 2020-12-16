<template>
    <div id="index" class="login">
        <div class="login-content">
            <div>
                <!--                <img :src="logo" class="mr-4"/>-->
                <a-avatar :src="logo" :size="99"/>
                <h1>Janloong Doo</h1>
            </div>
            <br/>
            <!--                layout="vertical"-->
            <a-form
                labelAlign="left"
                layout="horizontal"
                :label-col="baseData.labelCol"
                :wrapper-col="baseData.wrapperCol"
            >
                <a-form-item label="用户名:" v-bind="validateInfos.username">
                    <a-input placeholder="请输入用户名" v-model:value="formData.username"></a-input>
                </a-form-item>

                <a-form-item label="密码:" v-bind="validateInfos.password">
                    <a-input-password placeholder="请输入密码" v-model:value="formData.password"></a-input-password>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 7, offset: 1 }">
                    <a-checkbox>记住登录</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 24, offset: 1 }">
                    <a-button
                        type="primary"
                        @click="onSubmit"
                        :loading="formState.loading"
                        block>
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script lang="ts">
import {reactive, toRaw} from "vue";
import {useForm} from "@ant-design-vue/use";
import {userStore} from '/@/store/modules/User.ts';

export default {
    name: "Login",
    setup() {
        const baseData = reactive({
            labelCol: {span: 5},
            wrapperCol: {span: 18,offset:0},
        });
        const formData = reactive({
            username: '',
            password: ''
        })
        const formState = reactive({
            loading: false
        })

        const rulesRef = reactive({
            'username': [
                {
                    required: true,
                    message: '请输入账号',
                    trigger: ['change', 'blur']
                },
            ],
            'password': [
                {
                    required: true,
                    message: '请输入密码',
                    trigger: ['change', 'blur']
                }
            ],
        });
        const {resetFields, validate, validateInfos} = useForm(formData, rulesRef, {immediate: true});
        const onSubmit = async () => {
            // async function onSubmit() {
            validate()
                .then(() => {
                    console.log(toRaw(formData));
                    const userInfo = userStore.login({
                            username: formData.username,
                            password: formData.password
                        }
                    );

                })
                .catch(err => {
                    console.log('error', err);
                });
        };
        return {
            formData,
            baseData,
            validateInfos,
            resetFields,
            onSubmit,
            formState,
            logo: '/@/assets/img/1.ico'
        }
    }
}
</script>

<style lang="stylus">
.login
    background-image url('../../assets/img/bkg.jpg')

.login-content

    background white
    width 20%
    padding 2%
    padding-top 3%
    //display: flex;
    //flex-direction: column
    position absolute
    right: 10%
    opacity: 0.8;
    top 20%
    text-align center
</style>