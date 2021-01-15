<template>
  <!--      <div class="content markdown-body" v-html="blog.targetContent"></div>-->
  <!--  <div class="markdown-body" v-html="blog.targetContent"></div>-->
  <md :content="content.data"></md>

  <!--  <div class="body" v-html="blog.targetContent"></div>-->
  <!--  <div class="mark"  v-html="blog.targetContent"></div>-->
  <!--  <div  v-html="blog.targetContent"></div>-->
</template>

<script lang="ts">
import {onMounted, reactive} from "vue";
import {getMdFileByUrl} from "/@/api/Md"
import Md from "/@/components/md/Md.vue";

export default {
  name: "Display",
  components: {Md},
  setup() {
    const content = reactive({data: ""});
    onMounted(() => {
      getMdFileByUrl("/mdfile/d7973221-9476-4f1d-82e0-f5386fb53fb2.md").then(value => {
        new Blob([value]).text().then(value1 => {
          content.data = value1;
        });
      })
    });
    return {
      content
    }
  }
}
</script>

<style lang="css" scoped>
/*@import "../../assets/css/vue.css";*/

/*.mark /deep/ a {*/
/*  color: #42b983;*/
/*  font-weight: 600;*/
/*  padding: 0 2px;*/
/*  text-decoration: none;*/
/*}*/


</style>