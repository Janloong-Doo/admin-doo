<template>
  md编辑器
</template>

<script lang="ts">
import {onMounted, reactive} from "vue";

export default {
  name: "Editor",
  components: {},

  setup() {
    const content = reactive({data: ""});
    onMounted(() => {
    });
    return {
      content
    }
  }
}


</script>

<style scoped>

</style>