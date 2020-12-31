<template>
  <div>
    <m-paperdetail :paperInfos="infos"></m-paperdetail>
  </div>
</template>

<script>
import mPaperdetail from "../../../components/common/PaperDetail";
export default {
  data() {
    return {
      infos: {},
    };
  },
  components: {
    mPaperdetail,
  },
  created() {
    this.infos = this.$route.params.paperInfos;
    console.log("infos", this.infos);
  },

  beforeRouteLeave(to, from, next) {
    if (to.name === "maketestpaper") {
      to.meta.keepAlive = true;
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
</style>