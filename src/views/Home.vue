<template>
  <!--  <span>首页展示</span>-->
  <!--  <br>-->
  <!--  <br>-->
  <div id="home">
    <md class="custom-md" :content="content.data"></md>
  </div>
  <!--  <a-descriptions>-->
  <!--    <a-descriptions-item>一个demo练习实战项目</a-descriptions-item>-->
  <!--  </a-descriptions>-->
  <!--  <br>-->

  <!--  <a-descriptions title="前端技术框架" bordered :column="1">-->
  <!--    <template :key="key" v-for="key in (Object.keys(displayInfo.data))">-->
  <!--      <a-descriptions-item-->
  <!--          :label="key"-->
  <!--          :span="8"-->
  <!--      >{{ displayInfo.data[key] }}-->
  <!--      </a-descriptions-item>-->
  <!--    </template>-->
  <!--  </a-descriptions>-->
  <!--  <br/>-->
  <!--  <a-descriptions title="后端技术框架" bordered>-->
  <!--    <template :key="key" v-for="key in (Object.keys(displayInfo.back))">-->
  <!--      <a-descriptions-item-->
  <!--          :label="key"-->
  <!--          :span="24"-->
  <!--      > {{ displayInfo.back[key] }}-->
  <!--      </a-descriptions-item>-->
  <!--    </template>-->
  <!--  </a-descriptions>-->

</template>

<script lang="ts">
import Md from '/@/components/md/Md.vue'
import {onMounted, reactive} from "vue";
import {getMdFileByUrl} from "/@/api/Md";

export default {
  name: "Home",
  components: {Md},
  setup() {
    const data = {
      "vue": "^3.0.3",
      "vuex": "^4.0.0-rc.2",
      "vue-router": "^4.0.0-rc.5",
      "vite": "^1.0.0-rc.13",
      "typescript": "^4.1.2",
      "ant-design-vue": "^2.0.0-rc.2",
    }
    const back = {
      "jdk": "13",
      "nacos": "1.2.1",
      "sentinel": "1.7.1",
      "spring cloud alibaba": "2.2.0.RELEASE",
      "spring data jpa": "~",
      "knife4j": "2.0.3",
      "cloud oauth2": "~",
      "mysql": "8.0.18",
      "redis": "5.0.7",
      "docker": "19.03.11",
      "nginx": "1.19.1",
    }
    const displayInfo = reactive({data: data, back: back});

    const content = reactive({data: ""});
    onMounted(() => {
      getMdFileByUrl("/mdfile/d7973221-9476-4f1d-82e0-f5386fb53fb2.md").then(value => {
        new Blob([value]).text().then(value1 => {
          content.data = value1;
        });
      })
    });
    return {
      content,
      displayInfo
    }
  }
}
</script>

<style lang="stylus" scoped>
.custom-md {
  /*position: center;*/
  /*left: 30%;*/
}
#home {
  width 100%
  display flex
  justify-content: center;
}
</style>