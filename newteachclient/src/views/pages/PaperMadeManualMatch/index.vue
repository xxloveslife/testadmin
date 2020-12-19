<template>
  <div>制作试卷手动匹配</div>
</template>

<script>
export default {
  created() {
    const infos = this.$route.params.paperInfos;
    // console.log("infos", infos);
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