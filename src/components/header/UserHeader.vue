<template>
  <a-dropdown class="dropdownButtion">
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <!--                <span>{{userDetailInfo.trueName}}</span>-->
        <!--                <color-tag tag-list=""></color-tag>-->
        <a-menu-item key="1">
          <UserOutlined/>
          {{ t('admin.app.userInfo') }}
        </a-menu-item>
        <a-menu-item key="2">
          <PoweroffOutlined/>
          {{ t('admin.app.loginOutButton') }}
        </a-menu-item>
      </a-menu>
    </template>
    <span class="user-basic">
<!--        <span >-->
            <a-space>
<!--            <a-avatar :src="logo" size="midem"/>-->
            <a-avatar :src="logo" size="large"/>
            <span style="font-size: medium">{{ userDetailInfo.aliaName }}</span>
            </a-space>
        </span>
  </a-dropdown>

  <a-drawer
      :title="t('admin.app.userInfo')"
      placement="right"
      :closable="false"
      width="25%"
      v-model:visible="userInfoDrawerVisible"
  >
    <!--        :after-visible-change="afterVisibleChange"-->
    <a-descriptions bordered :column="1">
      <template :key="key" v-for="key in (Object.keys(userDetailInfo))">
        <a-descriptions-item
            :label="key"
            span="1"
        >{{ userDetailInfo[key] }}
        </a-descriptions-item>
      </template>
    </a-descriptions>

  </a-drawer>
</template>

<script lang="ts">
import {PoweroffOutlined, UserOutlined} from '@ant-design/icons-vue';
import {userStore} from "/@/store/modules/User.ts";
import {useI18n} from '/@/hooks/web/useI18n.ts';
import {onMounted, reactive, ref} from "vue";
import {getUserDetailInfo} from "/@/api/User.ts"
import {deepMerge} from "/@/utils";
import {UserDetailInfo} from "/@/api/model/UserModel";
import ColorTag from "/@/components/ColorTag.vue";
import logo from '/@/assets/img/1.ico';

export default {
  name: "UserHeader",
  components: {
    ColorTag,
    PoweroffOutlined,
    UserOutlined
  },
  setup() {
    const {t} = useI18n();
    const {id} = userStore.getUserInfoState;
    const userInfoDrawerVisible = ref(false)
    const userDetailInfo: UserDetailInfo = reactive({})
    const handleMenuClick = ({key}) => {
      switch (key) {
        case "1":
          userInfoDrawerVisible.value = true
          console.log(userInfoDrawerVisible.value)
          break;
        case "2":
          userStore.confirmLoginOut();
          break;
      }
    }
    onMounted(async () => {
      getUserDetailInfo({id: id}).then(value => {
        deepMerge(userDetailInfo, value);
      })
    })
    return {
      logo,
      userInfoDrawerVisible,
      userDetailInfo,
      handleMenuClick,
      t
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-basic {
  //margin: 5px
  //padding: 30px
}

.dropdownButtion
  cursor: pointer;
  padding 30px 30px 25px 30px

//height 100%
  //padding 50% 0

.dropdownButtion:hover
  background-color #f1f1f1
</style>