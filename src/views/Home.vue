<template>
  <div class="home">
    <HelloWorld :msg="msg" />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
export default {
  components:{
    HelloWorld
  },
  data(){
    return {
      msg:"我是渣渣龙!"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>