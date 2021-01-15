<template>
    <div class="markdown-body" v-html="display"></div>
</template>

<script lang="ts">
import {computed} from "vue"
import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
import MarkdownIt from "markdown-it";
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
      const md = new MarkdownIt();
      let contentInfo = splitMdHeader(props.content);
      return md.render(contentInfo);
    });

    return {
      display
    }
  }
}
</script>

<style scoped>

</style>