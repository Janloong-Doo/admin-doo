<template>
  <a-dropdown class="dropdownButtion">
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="1">
          <g-icon icon="twemoji-flag-for-flag-china" size="28"></g-icon>
          中文
        </a-menu-item>
        <a-menu-item key="2">
          <g-icon icon="twemoji-flag-for-flag-united-states" size="28"></g-icon>
          English
        </a-menu-item>
      </a-menu>
    </template>
    <!--        <span style="margin: 5px ;padding: 20px">-->
    <!--        <iconify-icon data-icon="ion:language-outline"></iconify-icon>-->
    <span>
<!--                <g-icon icon="ion:language-outline" size="28"></g-icon>-->
      <!--                <g-icon icon="ic-baseline-language" size="28"></g-icon>-->
                <g-icon :icon="iconRef" size="35"></g-icon>
      <!--                <g-icon icon="twemoji-flag-for-flag-china" size="28"></g-icon>-->
      <!--                <g-icon icon="emojione-flag-for-china" size="28"></g-icon>-->
      <!--                <g-icon icon="twemoji-flag-for-flag-united-states" size="28"></g-icon>-->
        </span>
  </a-dropdown>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import GIcon from "/@/components/Icon"
import {useLocale} from '/@/hooks/web/useLocale';

export default defineComponent({
  props: {
    menuInfo: Array
  },
  components: {
    GIcon
  },


  setup() {
    const {changeLocale, getLocale} = useLocale()
    let lang = getLocale._value.lang;
    const getIconByLang = (lang): string => {
      return lang && lang === "en" ? "twemoji-flag-for-flag-united-states" : "twemoji-flag-for-flag-china"
    }
    let iconByLang = getIconByLang(lang);
    const iconRef = ref(iconByLang)
    const handleMenuClick = ({key}) => {
      switch (key) {
        case "1":
          console.log("data", key)
          changeLocale("zh_CN")
          iconRef.value = "twemoji-flag-for-flag-china"
          location.reload();
          break;
        case "2":
          changeLocale("en")
          iconRef.value = "twemoji-flag-for-flag-united-states"
          location.reload();
          break;
      }
    }
    return {
      iconRef,
      handleMenuClick
    }
  }
})
</script>


<style lang="stylus"  scoped>
.dropdownButtion
  cursor: pointer;
  //height  available
  //max-content 63px
  margin-right 20px
  padding 30px 30px 25px 30px
//.ant-dropdown-trigger .dropdownButtion{
//  height 100%
//  size auto
//}

.dropdownButtion:hover
  background-color #f1f1f1
</style>