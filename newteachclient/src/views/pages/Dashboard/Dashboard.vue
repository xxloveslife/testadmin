<template>
  <!-- dashboard -->
  <div class="dashboard"></div>
</template>


<script>
import $axios from "@/api/index.js";
export default {
  methods: {
    //测试
    testService() {
      const url = "/token";
      $axios.get(url).then((res) => {
        console.log("token", res);
        this.$store.commit("user/SET_TOKEN", res.token);
      });
    },
  },
};
</script>
<style lang="scss" >
.dashboard {
  // @extend %width-height;
  height: 100%;
  widows: 100%;
  background-color: orange;
}
</style>