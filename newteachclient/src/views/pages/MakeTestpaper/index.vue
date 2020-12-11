<template>
  <div>
    <make-testpaper
      :m_checkItems="multiCheck"
      :m_radio="radio"
      :m_paperName="paperName"
      :m_music_checked="false"
      :m_withMachine_checked="false"
      :m_art_checked="false"
    ></make-testpaper>
  </div>
</template>

<script>
import MakeTestpaper from "./makeTestpaper";

export default {
  data() {
    return {
      multiCheck: ["音乐类"],
      radio: "苏少版",
      paperName: "",
    };
  },
  components: {
    MakeTestpaper,
  },
};
</script>
<style lang="scss" scoped>
</style>