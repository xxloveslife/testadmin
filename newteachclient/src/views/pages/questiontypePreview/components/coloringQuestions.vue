<template>
  <div class="coloring-questions-container">
    <div class="coloring-questions-header">
      <div
        class="coloring-questions-header-img"
        :style="{
          backgroundImage: 'url(' + questiontypeList.answer.art_color_pic + ')',
        }"
      ></div>
    </div>
    <div class="coloring-questions-body">
      <div
        class="coloring-questions-options"
        v-for="(item, i) in questiontypeList.answer.options"
        :key="i"
      >
        <p class="options-title-box">
          <span>{{ i + 1 }}、</span>
          <span>{{ item.text }}</span>
        </p>
        <div class="options">
          <div v-for="(color, index) in item.colors" :key="index">
            <span>{{ optionsStatus[index] }}.</span>
            <span
              class="color-box"
              :style="{ backgroundColor: '#' + color.rgb }"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsStatus: ['A', 'B', 'C', 'D', 'E'],
    }
  },
  name: 'coloringQuestions',
  props: {
    questionAnalyzeList: {
      type: Object,
    },
    questiontypeList: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
.coloring-questions-container {
  .coloring-questions-header {
    position: relative;
    margin: 0 auto 20px;
    width: 32.4375rem;
    height: 16.6875rem;
    // background: red;
    border: 1px solid #ebeef5;
    .coloring-questions-header-img {
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .coloring-questions-body {
    width: 300px;
    margin: auto;
    .coloring-questions-options {
      .options-title-box {
        margin-bottom: 10px;
      }
      .options {
        display: flex;
        margin-bottom: 10px;
        .color-box {
          display: inline-block;
          margin-right: 20px;
          height: 40px;
          width: 40px;
          border: 1px solid #ebeef5;
        }
      }
    }
  }
}
</style>
