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
            <i>{{ list.name }}</i>
          </li>
          <li>
            <span>账 号：</span>
            <i>{{ list.accountNumber }}</i>
          </li>
          <li>
            <span>学 校：</span>
            <i>{{ list.school }}</i>
          </li>
          <li>
            <span>系统账号：</span>
            <i>{{ list.systemAccount }}</i>
            <el-button type="text" @click="messageBoxStatus = true"
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
            <el-form-item label="当前密码：" prop="oldPassword">
              <el-input
                v-model="changePasswordList.oldPassword"
                placeholder="请输入当前密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="输入密码：" prop="newPassword">
              <el-input
                v-model="changePasswordList.newPassword"
                placeholder="请输入新的设置密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="再次输入：" prop="rePassword">
              <el-input
                v-model="changePasswordList.rePassword"
                placeholder="请重复输入新的设置密码"
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
    <!-- 弹出框 -->
    <message-box
      :phoneNumber="list.phoneNumber"
      :messageBoxStatus="messageBoxStatus"
      @closeMessage="messageBoxStatus = false"
    ></message-box>
  </div>
</template>

<script>
import messageBox from './components/messageBox'
export default {
  name: 'personalInformation',
  data() {
    return {
      messageBoxStatus: false,
      tabstatus: true,
      list: {
        name: '王浩',
        accountNumber: '18745685950',
        school: '青年路小学',
        systemAccount: 't4951069',
        phoneNumber: '13333333333',
      },
      changePasswordList: {
        oldPassword: '',
        newPassword: '',
        rePassword: '',
      },
      changePasswordFormRule: {
        oldPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新的设置密码', trigger: 'blur' },
        ],
        rePassword: [
          {
            required: true,
            message: '请重复输入新的设置密码',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  components: {
    messageBox,
  },
  methods: {
    changeTabstatus() {
      if (this.tabstatus) {
        this.tabstatus = false
      } else {
        this.tabstatus = true
      }
    },
    changePasswordOperating() {
      // 预验证并修改
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
    margin-top: -20px;
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
      width: 206px;
      height: 137px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
      li {
        flex: 1;
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
