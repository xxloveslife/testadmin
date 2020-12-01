<template>
  <div class="multiple-choice-container">
    <div class="chooseType">
      <span>选择类型 :</span>
      <el-radio-group v-model="textRadio" @change="changeRadio">
        <el-radio-button
          class="chooseTypeBtn"
          v-for="item in list"
          :key="item.id"
          :label="item.name"
          >{{ item.name }}</el-radio-button
        >
      </el-radio-group>
    </div>

    <div class="multipleChoice">
      <span>选择题型 :</span>
      <el-radio-group v-model="radioDefault" @change="changeSubRadio">
        <el-radio-button
          class="chooseTypeBtn"
          v-for="(item, i) in multipleChoiceList"
          :key="i"
          :label="item.questionTypeName"
          >{{ item.questionTypeName }}</el-radio-button
        >
      </el-radio-group>
    </div>

    <el-form ref="form">
      <!-- 题目内容 -->
      <div class="subjectContent">
        <div>题目内容 :</div>
        <div class="subjectContentItem">
          <el-form-item>
            <el-input placeholder="请输入题目内容"></el-input>
            <el-button type="primary">插入图片</el-button>
            <input type="file" hidden />
            <span class="changeText">点击上传题目所需要的配图</span>
          </el-form-item>
          <el-form-item class="second-form-item">
            <el-input
              class="secondInput"
              placeholder="某某某校第五次艺术  https://huaban.com/pins/3406106587/"
            ></el-input>
            <input type="file" hidden />
            <el-button type="primary">插入图片</el-button>
            <span class="changeText">点击上传题目所需要的配图</span>
          </el-form-item>
        </div>
      </div>
      <!-- 题目主体子组件 -->
      <topic-theme
        :changeRadioVal="changeRadioVal"
        :radioDefault="radioDefault"
        :testQuestionlists="testQuestionlists"
      ></topic-theme>
    </el-form>
  </div>
</template>

<script>
import topicTheme from "./topicTheme";
// import { getTestLibraryMultipleChoice } from '@/api/testLibrary'
export default {
  name: "multipleChoice",
  data() {
    return {
      textRadio: this.radio,
      // 选择类型选择值
      changeRadioVal: "",
      // 选择题型选择值
      changeMultipleChoice: "",
      radioDefault: "单项选择题",
      // 选择题型数据
      multipleChoiceList: [],
      // 试题list,给后台
      testQuestionlists: {},
    };
  },
  mounted() {
    this.getMultipleChoiceList(this.radio);
    this.testQuestionlists.changeRadioVal = this.radio;
    this.testQuestionlists.changeMultipleChoice = this.radioDefault;
  },
  props: {
    list: {
      type: Array,
    },
    radio: {
      type: String,
    },
  },
  methods: {
    changeRadio(val) {
      this.changeRadioVal = val;
      this.testQuestionlists.changeRadioVal = val;
      // console.log(this.testQuestionlists)
    },
    changeSubRadio(val) {
      console.log(val);
      this.changeMultipleChoice = val;
      this.testQuestionlists.changeMultipleChoice = val;
      // console.log(this.testQuestionlists)
      // 发起请求获取不同数据
    },
    // multipleChoiceList默认值
    getMultipleChoiceList(radio) {
      if (this.list) {
        this.list.forEach((item, i) => {
          if (item.name === radio) {
            this.multipleChoiceList = this.list[i].questionType;
          }
        });
      }
    },
  },
  watch: {
    changeRadioVal: function (newV, oldV) {
      this.list.forEach((item, i) => {
        if (this.list) {
          if (item.name == newV) {
            this.multipleChoiceList = this.list[i].questionType;
          }
        }
      });
    },
  },
  components: {
    topicTheme,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variable.scss";
.multiple-choice-container {
  padding: 0 44px;
  font-size: 12px;
  color: #303133;
  .chooseType {
    padding-bottom: 19px;
  }

  .multipleChoice {
    padding-bottom: 19px;
  }

  .changeText {
    width: 143px;
    height: 12px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #909399;
    line-height: 41px;
  }
  .subjectContent {
    position: relative;
    margin-bottom: 88px;
    div {
      font-size: 12px;
      height: 40px;
      line-height: 40px;
    }
    .el-input {
      width: 640px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #409eff;
      border-radius: 6px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      margin-right: 15px;
    }

    .subjectContentItem {
      position: absolute;
      top: 0;
      left: 62px;
      display: flex;
      flex-direction: column;
      button {
        margin-right: 17px;
      }
    }
  }
}
</style>
