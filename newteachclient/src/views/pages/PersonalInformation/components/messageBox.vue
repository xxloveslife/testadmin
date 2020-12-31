<template>
  <div class="messageBox" v-if="messageBoxStatus">
    <el-card>
      <div class="care-header">
        <i class="el-icon-error" @click="closeMessageBox"></i>
        <div class="card-text">
          <span>解绑手机号码</span>
          <span
            >您确定解绑手机号码{{
              phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
            }}吗？</span
          >
          <span class="spanItem">解绑之后无法用该手机号修改找回密码</span>
        </div>
      </div>
      <div class="care-body">
        <span class="spanleft" @click="removePhone">确定</span>
        <span @click="closeMessageBox">取消</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'messageBox',
  props: {
    phoneNumber: {
      type: String,
    },
    messageBoxStatus: {
      type: Boolean,
    },
  },
  methods: {
    closeMessageBox() {
      this.$emit('closeMessage')
    },
    removePhone() {
      // 发请求解绑手机 发送验证码 关闭当前弹窗 弹出新弹窗
      console.log(1212)
      this.$store
        .dispatch('manageAccount/getMessageCode', {
          type: 'unbind',
          phone: this.phoneNumber,
        })
        .then((res) => {
          console.log(res)
          if (res && res.code == 0) {
            console.log(res)
            this.closeMessageBox()
            this.$emit('unbindPhoneShow')
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.messageBox {
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
