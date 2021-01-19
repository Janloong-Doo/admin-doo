<template>
  <div id="display">

    <!--      <div class="content markdown-body" v-html="blog.targetContent"></div>-->
    <!--  <div class="markdown-body" v-html="blog.targetContent"></div>-->
    <md class="markdown-children" :content="content.data"></md>

    <!--  <div class="body" v-html="blog.targetContent"></div>-->
    <!--  <div class="mark"  v-html="blog.targetContent"></div>-->
    <!--  <div  v-html="blog.targetContent"></div>-->
  </div>
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
      getMdFileByUrl("/mdfile/c1090af7-2e05-49f3-9eb3-1adf6d58ef7f.md").then(value => {
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

<style lang="stylus" scoped>
/*@import "../../assets/css/vue.css";*/

/*.mark /deep/ a {*/
/*  color: #42b983;*/
/*  font-weight: 600;*/
/*  padding: 0 2px;*/
/*  text-decoration: none;*/
/*}*/
#display {
  width 100%
  display flex
  justify-content: center;
}

#display .markdown-children {
  //position: center;
  //width
}

</style>