<template>
  <div class="paperDetail">
    <div class="returnSave wrap_flex_center">
      <!-- 返回 -->
      <div class="returnLogo">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
      <!-- 保存 -->
      <div class="saveButton">
        <span class="tips"
          >注：点击单个题目空白区域可以在此题型中进行拖动排序</span
        >

        <button>保存</button>
      </div>
    </div>
    <!-- 音乐类试卷 -->
    <div class="forMusicType">
      <!--  试卷名称 音乐类试卷-->
      <div class="paperName wrap_flex_center">
        <div class="paper_name_left wrap_flex_center">
          <span>试卷名称</span>
          <span class="tenpx">音乐类试卷 </span>
          <span class="tenpx">教材名称</span>
        </div>
        <div class="right_operation wrap_flex_center">
          <!-- 考试 -->
          <i></i>
          <!-- 布置 -->
          <i></i>
        </div>
      </div>

      <!-- 多种题型 -->
      <div>
        <m-questionType></m-questionType>
      </div>
    </div>

    <!-- 美术类试卷 -->
    <div class="forArtType">
      <!--  试卷名称 音乐类试卷-->
      <div class="paperName wrap_flex_center">
        <div class="paper_name_left wrap_flex_center">
          <span>试卷名称</span>
          <span class="tenpx">美术类试卷 </span>
          <span class="tenpx">教材名称</span>
        </div>
        <div class="right_operation wrap_flex_center">
          <!-- 考试 -->
          <i></i>
          <!-- 布置 -->
          <i></i>
        </div>
      </div>

      <!-- 多种题型 -->
      <div>
        <m-questionType></m-questionType>
      </div>
    </div>
  </div>
</template>

<script>
import mQuestionType from "../../views/pages/PaperMadeSysMatch/Components/questionType";
export default {
  props: {
    paperInfos: { type: Object },
  },
  data() {
    return {
      m_paperInfos: this.paperInfos,
    };
  },
  components: {
    mQuestionType,
  },
};
</script>
<style lang="scss" scoped>
.paperDetail {
  .returnSave {
    width: 100%;
    height: 2rem;
    justify-content: space-between;
    .saveButton {
      span {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #f56c6c;
      }
      button {
        width: 6.25rem;
        height: 2rem;
        background-color: #409eff;
        margin-left: 0.875rem;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        &:focus {
          outline: 0;
        }
      }
    }
    .returnLogo {
      cursor: pointer;
      i {
        margin-right: 1rem;
      }
    }
  }

  // 试卷名称
  .paperName {
    width: 100%;
    height: 2.8125rem;
    justify-content: space-between;
    background-color: #ffffff;
    margin-top: 1.1875rem;
    border-radius: 0.5rem;

    .paper_name_left {
      span:nth-child(1) {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        margin-left: 0.9375rem;
      }
      span:nth-child(2) {
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #c0c4cc;
        margin-left: 0.5625rem;
      }
      span:nth-child(3) {
        font-size: 12px;
        transform: scale(0.83, 0.83);
        *font-size: 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #c0c4cc;
      }
    }

    .right_operation {
      i {
        margin-right: 1.375rem;
      }
      & :first-child {
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("../../assets/imgs/paperSysMatch/exam.png");
        background-repeat: no-repeat;
        background-size: cover;
      }

      & :last-child {
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("../../assets/imgs/paperSysMatch/prac.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }

  .forMusicType {
    margin-bottom: 2.25rem;
  }
  .forArtType {
    margin-bottom: 6.25rem;
  }
}
</style>