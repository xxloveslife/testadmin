<template>
  <div class="questiontyp-preview-container" v-if="dialogVisible">
    <div class="questiontyp-preview-container-header">
      <i class="el-icon-error" @click="$emit('close')"></i>
      <span class="spanText">ID:{{ questiontypeList.id }}</span>
      <div class="icon-box">
        <i
          class="star"
          @click="isfavorite()"
          :class="
            changeStar == this.questiontypeList.is_favorite ? 'changeStar' : ''
          "
          :title="
            (this.questiontypeList.is_favorite == 1 && '已收藏') || '点击收藏'
          "
        ></i>
        <i
          class="share"
          @click="isshare()"
          :class="
            changeShare == this.questiontypeList.is_share ? 'changeShare' : ''
          "
          :title="
            (this.questiontypeList.is_share == 1 && '取消分享') || '点击分享'
          "
        ></i>
        <!-- 纠错 -->
        <i class="errorCorrection" @click="errorCorrection()" title="纠错"></i>
      </div>
    </div>
    <div class="subject">
      <!-- 题目以及题目图片 -->
      <title-box :questiontypeList="questiontypeList"></title-box>
      <!-- 节奏题 -->
      <rhythm-question
        v-if="
          this.questiontypeList.stype == 1 &&
            this.questiontypeList.question_type == 9
        "
      ></rhythm-question>
      <!-- 单选多选判断 -->
      <music-radio :questiontypeList="questiontypeList"></music-radio>
    </div>

    <div class="questionAnalysis">
      <p class="question-analysis">试题解析</p>
      <div class="analysis" v-if="questiontypeList.answer.correct">
        <span class="analysis-title">【答案】</span>
        <p class="analysis-text">
          <span v-for="(item, i) in questiontypeList.answer.correct" :key="i">{{
            options[item]
          }}</span>
        </p>
      </div>
      <div class="analysis">
        <span class="analysis-title">【解析】</span>
        <p class="analysis-text">{{ questiontypeList.answer_parse }}</p>
      </div>
      <div class="analysis">
        <span class="analysis-title">【知识点】</span>
        <p class="analysis-text">知识点没写</p>
      </div>
      <div class="analysis">
        <span class="analysis-title">【难易程度】</span>
        <p class="analysis-text">
          <span v-if="this.questiontypeList.difficult == 1">易</span>
          <span v-if="this.questiontypeList.difficult == 2">中</span>
          <span v-else>难</span>
        </p>
      </div>
      <div class="analysis">
        <span class="analysis-title">【能力层次】</span>
        <p class="analysis-text">
          <span v-if="this.questiontypeList.request == 1">识记</span>
          <span v-if="this.questiontypeList.request == 2">理解</span>
          <span v-if="this.questiontypeList.request == 3">掌握</span>
          <span v-else>运用</span>
        </p>
      </div>
      <div class="analysis">
        <span class="analysis-title">【题型】</span>
        <p class="analysis-text">
          <span v-if="this.questiontypeList.question_type == 1"
            >单项选择题</span
          >
          <span v-if="this.questiontypeList.question_type == 2"
            >多项选择题</span
          >
          <span
            v-if="
              this.questiontypeList.question_type == 3 ||
                (this.questiontypeList.stype == 1 &&
                  this.questiontypeList.question_type == 10)
            "
            >判断题</span
          >
          <span
            v-if="
              this.questiontypeList.stype == 1 &&
                this.questiontypeList.question_type == 9
            "
            >节奏题</span
          >
          <span
            v-if="
              this.questiontypeList.stype == 1 &&
                this.questiontypeList.question_type == 7
            "
            >演唱题</span
          >
          <span
            v-if="
              (this.questiontypeList.stype == 1 &&
                this.questiontypeList.question_type == 11) ||
                (this.questiontypeList.stype == 2 &&
                  this.questiontypeList.question_type == 4)
            "
            >连线题</span
          >
          <span v-if="this.questiontypeList.question_type == 6">排序题</span>
          <span
            v-if="
              this.questiontypeList.stype == 2 &&
                this.questiontypeList.question_type == 7
            "
            >拼图题</span
          >
          <span v-if="this.questiontypeList.question_type == 5">表现题</span>
          <span v-if="this.questiontypeList.question_type == 8">点线题</span>
          <span
            v-if="
              this.questiontypeList.stype == 2 &&
                this.questiontypeList.question_type == 9
            "
            >填色题</span
          >
          <span
            v-if="
              this.questiontypeList.stype == 2 &&
                this.questiontypeList.question_type == 10
            "
            >配色题</span
          >
          <span
            v-if="
              this.questiontypeList.stype == 2 &&
                this.questiontypeList.question_type == 11
            "
            >填空题</span
          >
        </p>
      </div>
    </div>
    <div>{{ questiontypeList }}</div>
  </div>
</template>

<script>
import titleBox from './components/titleBox'
import rhythmQuestion from './components/rhythmQuestion'
import musicRadio from './components/musicRadio'
export default {
  name: 'questiontypePreview',
  data() {
    return {
      changeStar: 1,
      changeShare: 1,
      options: ['A', 'B', 'C', 'D', 'E'],
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
    },
    // 列表
    questiontypeList: {
      type: Object,
    },
    // 题库类型
    currentLib: {
      type: String,
    },
    // 传入地址
    incomingAddress: {
      type: Number,
    },
  },
  components: { titleBox, musicRadio, rhythmQuestion },
  methods: {
    isfavorite() {},
    isshare() {},
  },
}
</script>

<style lang="scss" scoped>
.questiontyp-preview-container {
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 40rem;
  width: 68rem;
  overflow: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 4.625rem 0 2.1875rem;
  .questiontyp-preview-container-header {
    z-index: 999;
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    height: 4.5625rem;
    top: 0;
    left: 0;
    padding: 2.1875rem 1.625rem 0;
    border-bottom: 1px solid #ebeef5;
    .el-icon-error {
      position: absolute;
      top: 9px;
      right: 9px;
      font-size: 20px;
      color: #c0c4cc;
    }
    .el-icon-error:hover {
      color: #f56c6c;
    }
    .spanText {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .icon-box {
      i {
        display: inline-block;
        height: 1.3125rem;
        width: 1.3125rem;
        margin-left: 0.5rem;
      }
      // 收藏
      .star {
        // z-index: 1;
        // position: relative;
        width: 1.125rem;
        height: 1.125rem;
        cursor: pointer;
        background-image: url('../../../assets/imgs/testquestlibrary/stardefault.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
      }
      .star:hover {
        background-image: url('../../../assets/imgs/testquestlibrary/starhover.png');
      }

      .changeStar {
        background-image: url('../../../assets/imgs/testquestlibrary/starsc.png');
        &:hover {
          background-image: url('../../../assets/imgs/testquestlibrary/starsc.png');
        }
      }
      // 分享
      .share {
        // z-index: 1;
        // position: relative;
        width: 1.125rem;
        height: 1.125rem;
        cursor: pointer;
        background-image: url('../../../assets/imgs/testquestlibrary/sharedefault.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
      }
      .share:hover {
        background-image: url('../../../assets/imgs/testquestlibrary/sharedhover.png');
      }

      .changeShare {
        background-image: url('../../../assets/imgs/testquestlibrary/cancleShareddefault.png');
        &:hover {
          background-image: url('../../../assets/imgs/testquestlibrary/cancleSharedhover.png');
        }
      }
      // 纠错
      .errorCorrection {
        width: 1.125rem;
        height: 1.125rem;
        cursor: pointer;
        background-image: url('../../../assets/imgs/testquestlibrary/errorCorrection.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
      }
      .errorCorrection:hover {
        background-image: url('../../../assets/imgs/testquestlibrary/errorCorrectionHover.png');
      }
    }
  }
  .subject {
    border-bottom: 1px solid #ebeef5;
    padding: 20px 0 0;
  }
  .questionAnalysis {
    padding: 20px 25px;
    .question-analysis {
      margin-bottom: 10px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
    }
    .analysis {
      .analysis-title {
        position: relative;
        left: -8px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      .analysis-text {
        margin: 10px 0;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #64666a;
      }
    }
  }
}
</style>
