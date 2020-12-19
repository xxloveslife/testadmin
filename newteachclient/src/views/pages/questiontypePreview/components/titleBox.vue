<template>
  <div class="title-box-container">
    <div class="body-container">
      <p class="question-title">{{ questiontypeList.content }}</p>
      <div class="title-img-box" v-show="questiontypeList.pic_url" v-for="(item, i) in questiontypeList.pic_url"
          :key="i">
        <span class="title-img-span">说明图片</span>
        <div
          :style="{ backgroundImage: 'url(' + item + ')' }"
          class="img"
          
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'titleBox',
  props: {
    questiontypeList: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
.title-box-container {
  .body-container {
    margin: 0 1.25rem;
    .question-title {
      text-align: center;
      margin-bottom: 20px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
    }
    .title-img-box {
      position: relative;
      margin: 0 auto 20px;
      width: 32.4375rem;
      height: 16.6875rem;
      // background: red;
      border: 1px solid #ebeef5;
      .title-img-span {
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        width: 4.3125rem;
        height: 1.75rem;
        line-height: 1.75rem;
        background: #efefef;
        font-size: 0.75rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      .img {
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
