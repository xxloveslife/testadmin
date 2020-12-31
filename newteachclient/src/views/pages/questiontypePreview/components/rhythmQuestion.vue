<template>
  <div class="rhythm-question-container">
    <div class="rhythm-question-imgbox">
      <div
        class="wx_image"
        v-if="questionAnalyzeList.wx_image !== ''"
        :style="{
          backgroundImage: 'url(' + questionAnalyzeList.wx_image + ')',
        }"
      ></div>
      <div
        class="jp_image"
        v-if="questionAnalyzeList.jp_image !== ''"
        :style="{
          backgroundImage: 'url(' + questionAnalyzeList.jp_image + ')',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rhythmQuestion',
  props: {
    questionAnalyzeList: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
.rhythm-question-container {
  .rhythm-question-imgbox {
    .wx_image,
    .jp_image {
      margin: 0 auto 1.25rem;
      width: 32.4375rem;
      height: 18.75rem;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>
