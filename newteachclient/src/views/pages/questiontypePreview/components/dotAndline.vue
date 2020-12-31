<template>
  <div class="dot-andline-container">
    <div class="dot-andline-header">
      <div
        class="dot-andline-header-img"
        :style="{
          backgroundImage: 'url(' + questiontypeList.answer.art_pic + ')',
        }"
      ></div>
    </div>
    <div
      class="dot-andline-body"
      :style="{
        backgroundImage: 'url(' + questiontypeList.answer.art_pic + ')',
      }"
    >
      <canvas
        id="myCanvas"
        width="600"
        height="400"
        style="position: absolute; width: 600px; height: 400px;"
        >您的浏览器不支持canvas</canvas
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'dotAndline',
  props: {
    questionAnalyzeList: {
      type: Object,
    },
    questiontypeList: {
      type: Object,
    },
  },
  mounted() {
    // 遍历然后调用
    if (this.questiontypeList.answer.correct instanceof Array) {
      this.questiontypeList.answer.correct.forEach((ele) => {
        // console.log(ele.points)
        this.canvasIsshow(ele.points)
      })
    }

    // this.canvasIsshow('8-329', '566-282')
  },
  methods: {
    canvasIsshow(x) {
      // console.log(x)
      if (x) {
        let xx = x.replaceAll('-', ',').split(',')
        console.log(xx)
        let myCanvas = document.getElementById('myCanvas')
        let context = myCanvas.getContext('2d')
        context.lineWidth = 4
        context.strokeStyle = '#FF0000'
        context.moveTo(xx[0], xx[1])
        context.lineTo(xx[2], xx[3])
        context.stroke()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dot-andline-container {
  .dot-andline-header {
    position: relative;
    margin: 0 auto 1.25rem;
    width: 32.4375rem;
    height: 16.6875rem;
    // background: red;
    border: 1px solid #ebeef5;
    .dot-andline-header-img {
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .dot-andline-body {
    position: relative;
    margin: 0 auto 1.25rem;
    width: 37.5rem;
    height: 25rem;
    // background: red;
    border: 1px solid #ebeef5;
    width: 600px;
    height: 400px;
    background-size: 100% 100%;
  }
}
</style>
