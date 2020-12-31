<template>
  <div class="sorting-questions-container">
    <div>
      <div
        class="connection-question-right"
        v-for="(item, i) in questiontypeList.answer.options"
        :key="i"
      >
        <div class="connection-question-rightbox">
          <img
            v-if="i === 0"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/one.png"
            alt=""
          />
          <img
            v-if="i === 1"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/two.png"
            alt=""
          />
          <img
            v-if="i === 2"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/three.png"
            alt=""
          />
          <img
            v-if="i === 3"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/four.png"
            alt=""
          />
          <img
            v-if="i === 4"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/five.png"
            alt=""
          />
          <div class="box-imgbox">
            <div
              v-if="item.image"
              class="box-imagebox"
              :style="{
                backgroundImage: 'url(' + item.image + ')',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sortingQuestions',
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
.sorting-questions-container {
  .connection-question-right {
    margin: auto;
    width: 350px;
    .connection-question-rightbox {
      position: relative;
      margin-bottom: 20px;
      .connection-question-img {
        position: absolute;
        left: 0;
        top: 64px;
        height: 26px;
        width: 26px;
      }
      .box-imgbox {
        overflow: hidden;
        width: 242px;
        height: 152px;
        margin-left: 59px;
        border: 1px solid #ebeef5;

        .box-imagebox {
          height: 100%;
          width: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
    }
  }
}
</style>
