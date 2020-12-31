<template>
  <div class="contariner">
    <div class="login_box">
      <div class="img_box">
        <img class="image" src="../../../assets/Loginimg/zhineng.png" />
      </div>
      <div class="login">
        <!--log--->
        <div class="log_box">
          <img class="log" src="../../../assets/Loginimg/log.png" />
        </div>
        <!---form表单--->
        <el-form
          :model="userWorkBench"
          :rules="rules"
          ref="userWorkBench"
          class="form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="userWorkBench.username"
              placeholder="请输入你的账号"
            ></el-input>
          </el-form-item>
          <el-form-item class="form_item" prop="password">
            <el-input
              v-model="userWorkBench.password"
              placeholder="请输入你的密码"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <!----复选框--->
        <!---复选框--->
        <div class="check">
          <div class="check_box">
            <input type="checkbox" v-model="checkList" class="checkpass" />
          </div>
          <div class="word">记住密码</div>
          <div class="password">忘记密码?</div>
        </div>
        <!---登录按钮--->
        <el-button type="primary" @click="submit('userWorkBench')"
          >确认登陆</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import $axios from "../../../api/index";
import { mapGetters } from "vuex";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
    };
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
    };
    return {
      checkList: true,
      userWorkBench: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: checkName, trigger: ["chang", "blur"] }],
        password: [{ validator: checkPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    //登录功能
    submit(userWorkBench) {
      console.log("dianji ");
      let params = {
        username: this.userWorkBench.username,
        password: this.userWorkBench.password,
      };
      this.$store.dispatch("user/getLoginInfo", params).then((res) => {
        console.log("RES", res);
        if (res.code !== 0) {
          this.$message.error("登录失败");
          this.$router.push({ path: "/login" });
        } else {
          this.$message({
            message: "登录成功",
            type: "success",
          });

          // 设置cookies    for  iframe
          this.$cookies.set("test_uc_sid", this.token, 60);
          this.$router.push({ path: "/dashboard" });
        }
        this.userWorkBench = this.$store.getters.userWorkBench;
      });
    },
  },
  computed: {
    ...mapGetters(["token"]),
  },
};
</script>

<style lang="scss">
.contariner {
  width: 100%;
  height: 100%;
  background: url("../../../assets/Loginimg/beijing.png");
  .login_box {
    width: 68.75rem;
    height: 42.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 0.625rem;
    background: url("../../../assets/Loginimg/4.png") center center no-repeat;
    background-size: cover;

    .img_box {
      width: 30.25rem;
      height: 27.5625rem;
      margin-top: 6.25rem;
      margin-left: 3.4375rem;
      float: left;
      .image {
        width: 100%;
        height: 100%;
      }
    }
    .login {
      width: 30.25rem;
      height: 27.5625rem;
      margin-top: 6.25rem;
      margin-right: 0.8rem;
      float: right;
      .log_box {
        width: 4.4375rem;
        height: 3.6875rem;
        margin-top: 0.9375rem;
        margin-left: 13.5rem;
        .log {
          height: 100%;
          width: 100%;
        }
      }
      .form {
        width: 22.5rem;
        height: 8.625rem;
        margin-left: 4.625rem;
        margin-top: 1.6875rem;
        .el-input {
          border: 0rem solid #409eff;
          box-sizing: border-box;
          .el-input__inner {
            height: 3.125rem;
            padding: 1rem 13.125rem 1.0625rem 1rem;
            font-family: PingFang-SC-Medium;
            font-size: 1.125rem;
          }
        }
        .el-input {
          box-sizing: border-box;
          .form_item {
            margin-bottom: 0rem;
          }
          .el-input__inner {
            height: 3.125rem;
            padding: 1rem 13.125rem 1.0625rem 1rem;
            font-family: PingFang-SC-Medium;
            border-radius: 0.25rem;
          }
        }
      }
      .el-button {
        background: #409eff;
        width: 22.5rem;
        height: 3.125rem;
        border-radius: 0.25rem;
        margin: 2.75rem 5rem 0rem 0.625rem;
        height: 3.125rem;
        font-size: 1.125rem;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 1.0625rem;
        margin-left: 4.6rem;
        span {
          width: 4.4375rem;
          height: 1.0625rem;
        }
      }
    }
  }
  .check {
    width: 22.5rem;
    height: 1.25rem;
    margin-left: 4.625rem;
    margin-top: 0.6rem;
    display: flex;
  }
  .check_box {
    margin-top: -0.1875rem;

    float: left;
    .checkbox {
      width: 0.99375rem;
      height: 0.99375rem;
      margin-top: 0.0625rem;
      border-radius: 0.125rem;
    }
    .checkpass {
      width: 0.99375rem;
      height: 0.99375rem;
      margin-top: 0.38rem;
      border-radius: 0.125rem;
    }
  }
  .word {
    display: inline-block;
    width: 4.9375rem;
    height: 1.25rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #303133;
    padding-left: 0.019531rem;
    font-family: PingFang-SC-Medium;
    font-size: 1rem;
    margin-left: 0.25rem;
  }
  .password {
    width: 5rem;
    height: 1.25rem;
    color: #409eff;
    line-height: 1.25rem;
    font-size: 1rem;
    font-family: PingFang SC;
    font-weight: 500;
    margin-left: 11.1875rem;
    align-items: center;
  }
}
</style>
