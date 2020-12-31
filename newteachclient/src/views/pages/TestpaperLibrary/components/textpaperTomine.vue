<template>
  <div class="textpaper-tomine-container" v-if="exam_dialogVisible">
    <div class="textpaper-tomine-container-header">
      <p class="textpaper-tomine-container-header-text">开始考试</p>
      <i class="el-icon-error" @click="$emit('close')"></i>
    </div>
    <div class="textpaper-tomine-container-body">
      <p>开始考试，会将系统试卷保存到我的卷库中，</p>
      <p>是否确定开始考试?</p>
    </div>
    <div class="textpaper-tomine-container-footer">
      <span @click="saveTomine">确认</span>
      <span @click="$emit('close')">取消</span>
    </div>
  </div>
</template>

<script>
import $axios from '../../../../api/index'
export default {
  name: 'textpaperTomine',
  props: {
    exam_dialogVisible: {
      type: Boolean,
    },
    tempItem: {
      type: Object,
    },
  },

  methods: {
    saveTomine() {
      console.log(this.tempItem)
      $axios
        .post('/examinationPaper/addPaperToSystem', {
          name: this.tempItem.name,
          paper_id: this.tempItem.id,
          is_share: 0,
        })
        .then((res) => {
          if (res && res.code === 0) {
            console.log('addres', res)
            console.log(this.tempItem.id)
            var title
            this.$message.success('加入我的卷库成功')
            // 先验证是否符合条件
            this.$store
              .dispatch('testlibrary/getCheckExamStart', {
                paper_id: this.tempItem.id,
              })
              .then((res) => {
                if (res.code === 0) {
                  console.log(res)

                  title = '成功'
                } else {
                  title = res.msg
                  // console.log(title)
                }
                this.$emit('openItem', title)
              })
          } else {
            console.log(res)
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.textpaper-tomine-container {
  width: 500px;
  height: 268px;
  background: #ffffff;
  box-shadow: 0px 5px 16px 0px #d6dbe7;
  border-radius: 8px;
  .textpaper-tomine-container-header {
    height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #dcdfe6;
    .textpaper-tomine-container-header-text {
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
  .textpaper-tomine-container-body {
    text-align: center;
    padding-top: 50px;
    p {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
    }
  }

  .textpaper-tomine-container-footer {
    position: absolute;
    display: flex;
    left: 0;
    bottom: 0;
    height: 52px;
    line-height: 52px;
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
