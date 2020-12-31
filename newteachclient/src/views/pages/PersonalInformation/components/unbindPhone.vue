<template>
  <div class="unbind-phone-container" v-if="unbindPhoneStatus">
    <el-card>
      <div class="care-header">
        <i class="el-icon-error" @click="close"></i>
        <div class="card-text">
          <span>请输入验证码</span>
          <el-input
            v-model="verificationCode"
            placeholder="请输入验证码"
          ></el-input>
        </div>
      </div>
      <div class="care-body">
        <span class="spanleft" @click="unbindPhone">确定</span>
        <span @click="close">取消</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'unbindPhone',
  data() {
    return {
      verificationCode: '',
    }
  },
  props: {
    unbindPhoneStatus: {
      type: Boolean,
    },
    phoneNumber: {
      type: String,
    },
  },
  methods: {
    close() {
      this.$emit('close')
      this.verificationCode = ''
    },
    unbindPhone() {
      console.log(this.verificationCode)
      if (this.verificationCode.trim().length) {
        this.$store
          .dispatch('manageAccount/unbindPhoneNumber', {
            phone: this.phoneNumber + '1',
            code: this.verificationCode,
          })
          .then((res) => {
            console.log(res)
            if (res && res.code == 0) {
              console.log(res)
              this.$message.success('解绑手机成功')
              this.close()
              this.$emit('refrech')
            }
          })
      } else {
        this.$message.error('请输入验证码')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.unbind-phone-container {
  .el-card {
    position: relative;
    width: 366px;
    height: 191px;
    background: #ffffff;
    border-radius: 8px;
    margin: auto;
    box-shadow: none;
    .care-header {
      i {
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 20px;
        color: #c0c4cc;
      }
      i:hover {
        color: #f56c6c;
      }
      .card-text {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        line-height: 41px;
        text-align: center;
        margin-top: 10px;
        span {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-bottom: 15px;
        }
        .spanItem {
          font-size: 12px;
        }
      }
    }
    .care-body {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 49px;
      line-height: 49px;
      border-top: 1px solid #dcdfe6;
      display: flex;
      span {
        text-align: center;
        display: block;
        flex: 1;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      span:hover {
        color: #409eff;
      }
      .spanleft {
        border-right: 1px solid #dcdfe6;
      }
    }
  }
}
</style>
