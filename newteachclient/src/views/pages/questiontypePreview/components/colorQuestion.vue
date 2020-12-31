<template>
  <div class="color-questions-container">
    <div class="color-questions-header">
      <div
        class="color-questions-header-img"
        :style="{
          backgroundImage: 'url(' + questiontypeList.answer.art_color_pic + ')',
        }"
      ></div>
    </div>
    <div class="contrasting-colors">
      <img src="@/assets/imgs/testquestlibrary/peise_bg.png" alt="" />
    </div>
    <div class="color-questions-body">
      <div
        class="color-questions-body-item"
        v-for="(item, i) in questiontypeList.answer.options"
        :key="i"
      >
        <div class="firstline">
          <span
            class="color-span"
            :style="{
              backgroundColor: colorList[item.color - 1],
            }"
          ></span>
          <span>{{ i + 1 }}、</span>
          <span>{{ item.text }}</span>
        </div>
        <div class="secondline">
          <span
            class="secondline-span"
            v-for="(item1, index) in item.op"
            :key="index"
            >{{ item1.name }}</span
          >
        </div>
        <div class="thirdline">
          <span
            class="thirdline-span"
            v-for="(item1, index) in item.op"
            :key="index"
            >{{ item1.type == 1 ? '（邻近色）' : '（对比色）' }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorList: [
        '#6fba2c',
        '#009843',
        '#02a09b',
        '#1f6fbc',
        '#3f48a0',
        '#703393',
        '#c7007c',
        '#e60011',
        '#ef6f01',
        '#f29700',
        '#fcbd00',
        '#fdf001',
      ],
    }
  },
  name: 'colorQuestion',
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
.color-questions-container {
  .color-questions-header {
    position: relative;
    margin: 0 auto 1.25rem;
    width: 32.4375rem;
    height: 16.6875rem;
    // background: red;
    border: 1px solid #ebeef5;
    .color-questions-header-img {
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .contrasting-colors {
    margin: auto;
    height: 2.8125rem;
    width: 32.5rem;
    background-color: #ccc;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .color-questions-body {
    width: 32.5rem;
    margin: 1.25rem auto;
    font-size: 0.875rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #303133;
    .color-questions-body-item {
      .firstline {
        margin: 0.9375rem 0;
        .color-span {
          display: inline-block;
          margin-right: 0.9375rem;
          height: 0.9375rem;
          width: 0.9375rem;
          // background-color: #ccc;
        }
      }
      .secondline {
        .secondline-span {
          display: inline-block;
          height: 1.875rem;
          width: 5rem;
          line-height: 1.875rem;
          text-align: center;
          border: 2px solid #598294;
          border-radius: 0.1875rem;
          margin-left: 0.9375rem;
        }
      }
      .thirdline {
        .thirdline-span {
          display: inline-block;
          height: 1.875rem;
          width: 5rem;
          line-height: 1.875rem;
          text-align: center;
          margin-left: 0.9375rem;
        }
      }
    }
  }
}
</style>
