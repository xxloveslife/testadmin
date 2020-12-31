<template>
  <div class="setup-exercises-container" v-if="setupExercisesStatus">
    <div class="setup-exercises-container-header">
      <p class="setup-exercises-container-header-text">布置作业</p>
      <i class="el-icon-error" @click="$emit('close')"></i>
    </div>
    <div class="setup-exercises-container-body">
      <p>你是否确定把该试卷加入到"布置作业"中</p>
      <el-form ref="form" :model="setupexercisesLIst" label-width="80px">
        <el-form-item label="作业名称">
          <el-input v-model="setupexercisesLIst.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="setup-exercises-container-footer">
      <span @click="addExercises">确认</span>
      <span @click="$emit('close')">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setupExercises',
  props: {
    setupexercisesLIst: {
      type: Object,
    },
    setupExercisesStatus: {
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  methods: {
    addExercises() {
      console.log(this.setupexercisesLIst)
      this.$store
        .dispatch('testlibrary/getaddPaperHomeworksByMake', {
          paper_id: this.setupexercisesLIst.id,
          name: this.setupexercisesLIst.name,
          system: 0,
        })
        .then((res) => {
          console.log(res)
          if (res && res.code === 0) {
            console.log(res)
            console.log(res.data.homeworks_id)
            // 打开布置作业弹窗
            this.$emit('JumpItem', res.data.homeworks_id)
          } else {
            // 打开布置作业弹窗,显示异常字段
            console.log(res.msg)
            this.$emit('openPopub', res.msg)
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.setup-exercises-container {
  position: relative;
  width: 500px;
  height: 268px;
  background: #ffffff;
  box-shadow: 0px 5px 16px 0px #d6dbe7;
  border-radius: 8px;
  .setup-exercises-container-header {
    height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #dcdfe6;
    .setup-exercises-container-header-text {
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
  .setup-exercises-container-body {
    p {
      text-align: center;
      font-size: 14px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .el-form {
      width: 450px;
      margin: auto;
    }
  }
  .setup-exercises-container-footer {
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
