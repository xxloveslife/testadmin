<template>
  <div class="personal-information-container">
    <div class="titleBar">
      <span
        class="spanItem1"
        :class="tabstatus ? 'spanItem' : ''"
        @click="changeTabstatus"
        >我的资料</span
      >
      <span
        class="spanItem2"
        :class="tabstatus ? '' : 'spanItem'"
        @click="changeTabstatus"
        >修改密码</span
      >
    </div>
    <!-- 我的资料 -->
    <div class="myProfile" v-if="tabstatus">
      <el-card>
        <div class="card-top">我的资料</div>
        <ul>
          <li>
            <span>姓 名：</span>
            <i>{{ list.teacher_name }}</i>
          </li>
          <li>
            <span>账 号：</span>
            <i>{{ list.teacher_account }}</i>
          </li>
          <li>
            <span>学 校：</span>
            <i>{{ list.school_name }}</i>
          </li>
          <li>
            <span>系统账号：</span>
            <i>{{ list.login_account }}</i>
          </li>
          <li>
            <span>绑定手机：</span>
            <span v-if="!this.phoneNumber">当前未绑定手机号</span>
            <i v-if="this.phoneNumber">{{
              phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
            }}</i>
            <el-button
              type="text"
              @click="messageBoxStatus = true"
              v-if="this.phoneNumber"
              >解绑手机</el-button
            >
          </li>
        </ul>
      </el-card>
    </div>
    <!-- 修改密码 -->
    <div class="changePassword" v-else>
      <el-card>
        <div class="card-top">修改密码</div>
        <el-form
          ref="changePasswordForm"
          :model="changePasswordList"
          label-width="93px"
          :rules="changePasswordFormRule"
        >
          <div class="formItem">
            <el-form-item label="当前密码：" prop="before">
              <el-input
                type="password"
                v-model="changePasswordList.before"
                placeholder="请输入当前密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="输入密码：" prop="pwd">
              <el-input
                type="password"
                v-model="changePasswordList.pwd"
                placeholder="请输入新的设置密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="再次输入：" prop="pwd2">
              <el-input
                type="password"
                v-model="changePasswordList.pwd2"
                placeholder="请重复输入新的设置密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePasswordOperating"
                >确定修改</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>
    <!-- 解绑手机发送验证码弹出框 -->
    <message-box
      :phoneNumber="phoneNumber"
      :messageBoxStatus="messageBoxStatus"
      @closeMessage="messageBoxStatus = false"
      @unbindPhoneShow="unbindPhoneStatus = true"
    ></message-box>
    <!-- 解绑手机弹出框-->
    <unbind-phone
      :phoneNumber="phoneNumber"
      :unbindPhoneStatus="unbindPhoneStatus"
      @close="unbindPhoneStatus = false"
      @refrech="getList"
    ></unbind-phone>
  </div>
</template>

<script>
import messageBox from './components/messageBox'
import unbindPhone from './components/unbindPhone'

export default {
  name: 'personalInformation',
  data() {
    var checkOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else if (value.toString().length < 5 || value.toString().length > 20) {
        callback(new Error('密码长度在 5 到 20 个字符'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
        callback(new Error('密码不能包含汉字'))
      } else if (value.toString().length < 5 || value.toString().length > 20) {
        callback(new Error('密码长度在 5 到 20 个字符'))
      } else {
        if (this.changePasswordList.checkPass !== '') {
          this.$refs.changePasswordForm.validateField('pwd2')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePasswordList.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      phoneNumber: '',
      unbindPhoneStatus: false,
      messageBoxStatus: false,
      tabstatus: true,
      list: {},
      changePasswordList: {
        before: '',
        pwd: '',
        pwd2: '',
      },
      changePasswordFormRule: {
        pwd: [
          //新密码
          { validator: validatePass, trigger: 'blur' },
        ],
        pwd2: [
          //确认密码
          { validator: validatePass2, trigger: 'blur' },
        ],
        before: [
          //旧密码
          { validator: checkOldPwd, trigger: 'blur' },
        ],
      },
    }
  },
  components: {
    messageBox,
    unbindPhone,
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('manageAccount/makeUserInfo').then((res) => {
        if (res || res.code == 0) {
          this.list = res.data
          this.phoneNumber = res.data.phone
          console.log(this.list)
        }
      })
    },
    changeTabstatus() {
      if (this.tabstatus) {
        this.tabstatus = false
      } else {
        this.tabstatus = true
      }
    },
    changePasswordOperating() {
      this.$store
        .dispatch('manageAccount/resetPwd', this.changePasswordList)
        .then((res) => {
          console.log(res)
          if (res && res.code == 0) {
            this.$message.success('修改密码成功')
          } else if (res.code == 400) {
            this.$message.error('原密码输入有误')
          } else {
            this.$message.error('修改密码失败，请稍后重试')
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.personal-information-container {
  .titleBar {
    display: flex;
    width: 700px;
    height: 45px;
    background: #ffffff;
    border-radius: 8px;
    margin: auto;
    margin-bottom: 20px;
    span {
      display: block;
      flex: 1;
      border-radius: 8px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 45px;
      text-align: center;
      color: #303133;
    }
    .spanItem {
      background: #409eff;
      color: #ffffff;
    }
  }
  .el-card {
    box-shadow: none;
  }
  .card-top {
    width: 56px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
    line-height: 41px;
    margin-bottom: 10px;
  }
  .myProfile {
    margin-bottom: 20px;
    ul {
      display: flex;
      flex-direction: column;
      width: 260px;
      height: 137px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
      li {
        flex: 1;
        .el-button {
          padding: 0px 13px;
        }
      }
      i {
        font-style: normal;
        margin-right: 15px;
      }
    }
  }
  .changePassword {
    .formItem {
      .el-input {
        width: 316px;
        border-radius: 6px;
      }
    }
  }
}
</style>
