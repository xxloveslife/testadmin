<template>
  <div class="option-components-container">
    <div class="leftTitle">选 项 :</div>
    <div class="rightBox">
      <div class="rightBoxItem">
        <div class="rightBox-header">
          <span>A.</span>
          <el-input class="elInput" type="text" placeholder="请输入题目内容" />
          <i class="el-icon-delete"></i>
        </div>
        <div class="rightBox-body">
          <el-button type="primary">图片/音频</el-button>
          <el-checkbox v-model="checked">设置为正确答案</el-checkbox>
        </div>
        <div class="rightBox-footer">111</div>
      </div>
      <div class="rightBoxItem">
        <div class="rightBox-header">
          <span>B.</span>
          <el-input class="elInput" type="text" placeholder="请输入题目内容" />
          <i class="el-icon-delete"></i>
        </div>
        <div class="rightBox-body">
          <el-button type="primary">图片/音频</el-button>
          <el-checkbox v-model="checked">设置为正确答案</el-checkbox>
        </div>
        <div class="rightBox-footer">111</div>
      </div>
      <div class="rightBoxItem">
        <div class="rightBox-header">
          <span>C.</span>
          <el-input class="elInput" type="text" placeholder="请输入题目内容" />
          <i class="el-icon-delete"></i>
        </div>
        <div class="rightBox-body">
          <el-button type="primary">图片/音频</el-button>
          <el-checkbox v-model="checked">设置为正确答案</el-checkbox>
        </div>
        <div class="rightBox-footer">111</div>
      </div>
      <div class="rightBoxItem">
        <div class="rightBox-header">
          <span>D.</span>
          <el-input class="elInput" type="text" placeholder="请输入题目内容" />
          <i class="el-icon-delete"></i>
        </div>
        <div class="rightBox-body">
          <el-button type="primary">图片/音频</el-button>
          <el-checkbox v-model="checked">设置为正确答案</el-checkbox>
        </div>
        <div class="rightBox-footer">111</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'optionComponents',
  data() {
    return {
      // 单选list
      singleChoiceList: [
        {
          // 选项
          options: 0,
          checked: '设置为正确答案',
          content: '',
        },
        {
          // 选项
          options: 1,
          checked: '设置为正确答案',
          content: '',
        },
        {
          // 选项
          options: 2,
          checked: '设置为正确答案',
          content: '',
        },
        {
          // 选项
          options: 3,
          checked: '设置为正确答案',
          content: '',
        },
      ],
    }
  },
  props: {
    // 类型选择值
    changeRadioVal: {
      type: String,
    },
    // 试题list
    testQuestionlists: {
      type: Object,
    },
  },
  methods: {},
  mounted() {
    console.log(this.testQuestionlists)
  },
}
</script>

<style lang="scss" scoped>
.option-components-container {
  position: relative;
  .rightBox {
    position: absolute;
    top: 0;
    left: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    .rightBoxItem {
      margin-right: 39px;
      .rightBox-header {
        display: flex;
        span {
          width: 11px;
          height: 10px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #409eff;
          line-height: 41px;
          margin-right: 12px;
        }
        .elInput {
          width: 316px;
          background: #ffffff;
          border-radius: 6px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
          line-height: 41px;
          margin-right: 5px;
        }
        i {
          width: 16px;
          height: 16px;
          font-size: 16px;
          color: #c0c4cc;
          margin-top: 15px;
        }
      }
      .rightBox-body {
        margin: 10px 23px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
