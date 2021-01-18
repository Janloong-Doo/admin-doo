<template>
    <div class="markdown-body" v-html="display"></div>
</template>

<script lang="ts">
import {computed} from "vue"
// import 'highlight.js/default.css'
// import 'highlight.js/styles/a11y-dark.css'
// import 'highlight.js/styles/default.css'
// import 'highlight.js/styles/darcula.css'
import 'highlight.js/styles/lioshi.css'
// import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
import '/@/assets/css/markdown.css'
import {md} from "/@/utils/md";
import {splitMdHeader} from "/@/utils";

export default {
  name: "Md",
  props: {
    content: {
      type: String
    }
  },
  setup(props: any, context: any) {

    const display = computed(() => {
      let contentInfo = splitMdHeader(props.content);
      return md.render(contentInfo);
    });

    return {
      display
    }
  }
}
</script>

<style lang="stylus" scoped>
//.markdown-body pre code{
//  background-color #000c17;
//}
.markdown-body pre {
  background #000c17
}
.hljs {
  background-color #000c17
}
</style>