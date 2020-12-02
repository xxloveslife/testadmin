<template>
  <div class="option-components-container">
    <div class="rightBox">
      <div class="rightBoxItem" v-for="(item, i) in singleChoiceList" :key="i">
        <div class="rightBox-header">
          <span>{{ item.options }}.</span>
          <el-input class="elInput" type="text" placeholder="请输入题目内容" />
          <i class="el-icon-delete"></i>
        </div>
        <div class="rightBox-body">
          <el-button
            v-if="changeRadioVal === '音乐'"
            type="primary"
            @click="$refs.file.click()"
            >图片/音频</el-button
          >
          <el-button v-else type="primary" @click="$refs.file.click()"
            >上传图片</el-button
          >
          <el-checkbox-group v-model="item.content">
            <el-checkbox :label="item.content" :key="item.content">{{
              item.checked
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="rightBox-footer">
          <p>111</p>
        </div>
      </div>
      <input
        type="file"
        ref="file"
        hidden
        accept="image/png,image/jpg,audio/3gpp"
      />
    </div>
    <div class="footerBox">
      <div class="boxLeft">
        <el-button type="primary">新增答案选项</el-button>
        <span v-if="radioDefault === '连线题'">最多五个选项</span>
      </div>
      <div class="boxRight">
        <span v-if="changeRadioVal === '音乐'"
          >可以点击图片/音频上传答案元素，图片尺寸不超过260*158px,图片格式支持jpg、png&nbsp;
        </span>
        <span v-else
          >可以点击上传图片上传答案元素，图片尺寸不超过260*158px,图片格式支持jpg、png&nbsp;
        </span>
        <span class="spanItemer">查看图例</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "optionComponents",
  data() {
    return {
      // 单选list
      singleChoiceList: [
        {
          // 选项
          options: "A",
          checked: "设置为正确答案",
          content: "",
        },
        {
          // 选项
          options: "B",
          checked: "设置为正确答案",
          content: "",
        },
        {
          // 选项
          options: "C",
          checked: "设置为正确答案",
          content: "",
        },
        {
          // 选项
          options: "D",
          checked: "设置为正确答案",
          content: "",
        },
      ],
    };
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
    // 题型选择值
    radioDefault: {
      type: String,
    },
  },
  methods: {},
  mounted() {
    console.log(this.testQuestionlists);
  },
};
</script>

<style lang="scss" scoped>
.option-components-container {
  position: relative;
  .leftTitle {
    position: absolute;
    left: 0;
    top: 13px;
  }
  .rightBox {
    margin-left: 130px;
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
  .footerBox {
    display: flex;
    padding-left: 68px;
    justify-content: space-between;
    .boxLeft {
      span {
        margin-left: 11px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
    }
    .boxRight {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
      .spanItemer {
        color: #409eff;
      }
    }
  }
}
</style>
