<template>
  <div class="error-correction-container" v-if="errorCorrectionStatus">
    <div class="error-correction-container-header">
      <p class="error-correction-container-header-text">题目纠错</p>
      <i class="el-icon-error" @click="$emit('close')"></i>
    </div>
    <!-- <div>{{ questiontypeList }}</div> -->
    <div class="error-correction-container-body">
      <p class="first-line">
        您好，如果您对题目有疑问或者发现题目有错误请详细描述，我们会尽快处理！
      </p>
      <p class="second-line">题目:{{ questiontypeList.content }}</p>
      <div class="third-line">
        <span>问题类型:</span>
        <div class="checkbox">
          <el-checkbox-group v-model="checkedList">
            <el-checkbox class="checkboxitem" label="1"
              >题目描述错误</el-checkbox
            >
            <el-checkbox class="checkboxitem" label="2">答案错误</el-checkbox>
            <el-checkbox class="checkboxitem" label="3"
              >关联知识点错误</el-checkbox
            >
            <el-checkbox class="checkboxitem" label="4">其他</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="last-line">
        <span>问题描述:</span>
        <el-input
          type="textarea"
          class="textarea"
          placeholder="必填，请详细描述问题，我们会尽快为您解决"
          v-model="desc"
        >
        </el-input>
      </div>
    </div>
    <div class="error-correction-container-footer">
      <span @click="errorCorrection">确认</span>
      <span @click="$emit('close')">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'errorCorrection',
  data() {
    return {
      // cities: ['上海', '北京', '广州', '深圳'],
      checkedList: [],
      desc: '',
    }
  },
  props: {
    errorCorrectionStatus: {
      type: Boolean,
    },
    questiontypeList: {
      type: Object,
    },
  },
  methods: {
    errorCorrection() {
      if (this.checkedList.length === 0) {
        this.$message.error('请选择问题类型')
      } else {
        if (this.desc.trim() === '') {
          this.$message.error('请填写问题描述')
        } else {
          // 发请求纠错
          this.$store
            .dispatch('testlibrary/getSubmitQuestionError', {
              qid: this.questiontypeList.id,
              type: this.checkedList.join(','),
              desc: this.desc,
            })
            .then((res) => {
              if (res.code === 0) {
                console.log(res)
                this.$message.success('纠错成功')
              } else {
                this.$message.error('纠错失败,请稍后重试')
              }
              this.$emit('close')
            })
        }
      }
    },
  },
}
</script>

<style lang="scss">
.error-correction-container {
  position: relative;
  z-index: 10000;
  width: 580px;
  height: 452px;
  background: #ffffff;
  box-shadow: 0px 5px 16px 0px #d6dbe7;
  border-radius: 8px;
  .error-correction-container-header {
    height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #dcdfe6;
    .error-correction-container-header-text {
      margin-left: 30px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
    }
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
  }
  .error-correction-container-body {
    padding: 0 30px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #303133;
    .first-line {
      margin-top: 15px;
    }
    .second-line {
      margin-top: 15px;
      color: #409eff;
    }
    .third-line {
      margin-top: 15px;
      display: flex;
      .checkbox {
        margin-left: 15px;
        .checkboxitem {
          margin-right: 20px;
          .el-checkbox__label {
            padding-left: 8px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #303133;
          }
        }
      }
    }
    .last-line {
      margin-top: 15px;
      .textarea {
        margin-top: 10px;
        width: 520px;
        height: 184px;
        .el-textarea__inner {
          resize: none;
          width: 520px;
          height: 184px;
          border: 1px solid #dcdfe6;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }
      }
    }
  }
  .error-correction-container-footer {
    position: absolute;
    display: flex;
    left: 0;
    bottom: 0;
    height: 48px;
    line-height: 48px;
    width: 100%;
    border-top: 1px solid #dcdfe6;
    span {
      flex: 1;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }
    span:hover {
      color: #409eff;
    }
    span:first-child {
      border-right: 1px solid #dcdfe6;
    }
  }
}
</style>
