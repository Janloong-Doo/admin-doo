<template>
  <div class="home">
      home2
    <HelloWorld :msg="msg" />
      <CustomTreeTransfer></CustomTreeTransfer>
      <router-view></router-view>
  </div>
</template>

<script>

import HelloWorld from '../components/HelloWorld.vue'
import CustomTreeTransfer from '../components/CustomTreeTransfer.vue'
export default {
  components:{
    HelloWorld,CustomTreeTransfer
  },
    data() {
        return {
            msg: "我是渣渣龙2!"
        }
    },

  methods:{
      djx() {
          console.log(this.ddd);
          this.ddd = this.ddd
              .split("")
              .reverse()
              .join("");
      },
  }
}
</script>

<style  scoped>

</style>