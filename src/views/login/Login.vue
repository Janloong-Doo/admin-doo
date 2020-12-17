<template>
    <div id="index" class="login">
        <div class="login-content">
            <local-menu class="localmenu"></local-menu>
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
                <a-form-item :label="t('admin.login.loginAccount')+':'" v-bind="validateInfos.username">
                    <!--                <a-form-item :label="baseFormName.account" v-bind="validateInfos.username">-->
                    <a-input :placeholder="t('admin.login.accountPlaceholder')" v-model:value="formData.username"></a-input>
                </a-form-item>

                <a-form-item :label="t('admin.login.loginPassword')+':'" v-bind="validateInfos.password">
                    <a-input-password :placeholder="t('admin.login.passwordPlaceholder')" v-model:value="formData.password"></a-input-password>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 8, offset: 1 }">
                    <a-checkbox>{{t('admin.login.autoLogin')}}</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 24, offset: 1 }">
                    <a-button
                        type="primary"
                        @click="onSubmit"
                        :loading="formState.loading"
                        block>
                        {{t('admin.login.loginButton')}}
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
import LocalMenu from "/@/components/header/LocalMenu.vue";
import {useI18n} from "/@/hooks/web/useI18n.ts";

export default {
    name: "Login",
    components: {
        LocalMenu
    },
    setup() {
        const baseData = reactive({
            labelCol: {span: 5},
            wrapperCol: {span: 17, offset: 2},
        });
        let {t} = useI18n();
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
            t,
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
    top 15%
    text-align center

    .localmenu
        position relative
        left 45%

//padding-top 3%
//transform:translate(0px,-100px)
</style>