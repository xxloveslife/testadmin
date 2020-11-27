<template>
  <!-- dashboard -->
  <div class="dashboard">
    <!-- dashboard 上面内容 -->
    <div class="dash_t_pad">
      <!-- dashboard 左上内容 -->
      <div class="dash_lf_t_pad">
        <el-row
          class="cus_elrow"
          type="flex"
          align="top"
          v-for="(item, i) in items"
          :key="i"
        >
          <el-col :span="24"
            ><div class="showInfo">
              <span class="baseinfo">授课学生</span>
              <div class="row_rt">
                <span class="des">几个</span>
                <i class="arrow">箭头</i>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- dashboard 右上内容 -->
      <div class="dash_rt_t_pad">
        <el-row class="first_row diff_first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>

        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <!-- dashboard 下面内容 -->
    <div class="dash_d_pad">
      <!-- 标题 -->
      <div class="dash_d_pad_title">
        <span>授课班级</span>
      </div>
      <!-- 信息展示 -->
      <div class="dash_d_pad_info">
        <div class="left_info"></div>
        <div class="right_info"></div>
      </div>
    </div>
  </div>
</template>


<script>
import $axios from "@/api/index.js";
export default {
  data() {
    return {
      items: [
        {
          baseinfo: "授课班级",
          des: "5",
        },
        {
          baseinfo: "授课学生",
          des: "80",
        },
        {
          baseinfo: "消息中心",
          des: "175",
        },
        {
          baseinfo: "最近练习",
          des: "....",
        },
      ],
    };
  },
  methods: {
    //测试
    testService() {
      const url = "/token";
      $axios.get(url).then((res) => {
        console.log("token", res);
        this.$store.commit("user/SET_TOKEN", res.token);
      });
    },
  },
};
</script>
<style lang="scss" >
.dashboard {
  height: 100%;
  margin-left: 17px;
  margin-right: 28px;
  background-color: orange;
}

.dash_t_pad {
  background-color: cornflowerblue;
  display: flex;
  width: 100%;
  height: 324px;
  .dash_lf_t_pad {
    width: 940px;
    height: 324px;
    background-color: grey;
  }
  .dash_rt_t_pad {
    margin-left: 23px;
    height: 324px;
    width: 712px;
    background-color: indianred;
  }
}

.dash_d_pad {
  width: 100%;
  height: 482px;
  background-color: indigo;
  margin-top: 35px;
}

.grid-content {
  background-color: ivory;
}

.cus_elrow {
  width: 940px;
  height: 68px;
  background-color: #ffffff;
  margin-top: 18px;
  border-radius: 5px;
}
.cus_elrow:nth-child(1) {
  margin-top: 0;
}

.showInfo {
  display: -webkit-flex; /* Safari */
  display: flex;
  align-items: center;
  justify-content: space-between;
  .baseinfo {
    display: inline-block;
    margin-left: 25px;
    font-family: PingFang-SC-Medium;
    color: #303133;
    font-weight: 500;
    font-size: 18px;
  }
  .des {
    margin-right: 29px;
  }
  .arrow {
    margin-right: 31px;
    line-height: 68px;
  }
}

.shortcuts {
  display: flex;
  justify-content: space-between;
  span {
    line-height: 50px;
    margin-left: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #606266;
  }
  i {
    margin-right: 27px;
    line-height: 50px;
  }
}

.first_row {
  width: 712px;
  height: 50px;
}

.first_row:nth-child(1) {
  height: 69px;
  background-color: cadetblue;
  .shortcuts {
    border-bottom: 1px solid #ebeef5;
  }
  span {
    line-height: 69px;
  }
  i {
    line-height: 69px;
  }
}
</style>