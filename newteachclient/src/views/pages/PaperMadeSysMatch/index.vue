<template>
  <div>
    <m-paperdetail></m-paperdetail>
  </div>
</template>

<script>
import $axios from "../../../api/index";
import mPaperdetail from "../../../components/common/PaperDetail";
import { mapGetters } from "vuex";
export default {
  components: {
    mPaperdetail,
  },
  computed: {
    ...mapGetters(["artInfos", "musicInfos"]),
  },
  methods: {
    //请求手动换题分类
    getCategory() {
      $axios
        .post("/examinationPaper/getCategory", { type: "music" })
        .then((res) => {
          console.log("res", res);
          if (res.code == 0) {
            this.$store.commit("manualSelectInfos/SET_MUSICINFOS", res.data);
          }
        });
      $axios
        .post("/examinationPaper/getCategory", { type: "art" })
        .then((res) => {
          console.log("res", res);
          if (res.code == 0) {
            this.$store.commit("manualSelectInfos/SET_ARTINFOS", res.data);
          }
        });
    },
  },
  created() {
    //   this.$route.params.paperInfos
    console.log("infos", this.$route.params.paperInfos);

    if (this.artInfos.length < 1 || this.musicInfos < 1) {
      this.getCategory();
    }
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
