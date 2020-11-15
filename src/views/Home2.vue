<template>
  <div class="home">
      home2
    <HelloWorld :msg="msg" />
      <router-view></router-view>
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
      msg:"我是渣渣龙2!"
    }
  }
}
</script>

<style  scoped>

</style>