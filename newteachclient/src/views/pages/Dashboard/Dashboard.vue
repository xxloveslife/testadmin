<template>
  <!-- dashboard -->

  <div class="dashboard">
    <!-- dashboard 上面内容 -->
    <div class="dash_t_pad">
      <!-- dashboard 左上内容 -->
      <div class="dash_lf_t_pad">
        <el-row class="cus_elrow" type="flex" align="top">
          <el-col :span="24"
            ><div class="showInfo">
              <span class="baseinfo">授课班级</span>
              <div class="row_rt">
                <span class="des">{{ userWorkBench.total_room }}个</span>
                <i class="arrow el-icon-arrow-right"></i>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="cus_elrow" type="flex" align="top">
          <el-col :span="24"
            ><div class="showInfo">
              <span class="baseinfo">授课学生</span>
              <div class="row_rt">
                <span class="des">{{ userWorkBench.total_student }}个</span>
                <i class="arrow el-icon-arrow-right"></i>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="cus_elrow" type="flex" align="top">
          <el-col :span="24"
            ><div class="showInfo">
              <span class="baseinfo">消息中心</span>
              <div class="row_rt">
                <span class="des">{{ userWorkBench.unread_num }}条</span>
                <i class="arrow el-icon-arrow-right"></i>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="cus_elrow" type="flex" align="top">
          <el-col :span="24"
            ><div class="showInfo">
              <span class="baseinfo">最近练习</span>
              <div class="row_rt">
                <span class="des fix_des">{{ recentprac }}</span>
                <i class="arrow el-icon-arrow-right"></i>
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
              <span>快捷操作</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span class="fix_span">布置练习</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>

        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span class="fix_span">添加出勤记录</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span class="fix_span">班级管理</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span class="fix_span">制作试题</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span class="fix_span">制作试卷</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>
      </div>
    </div>
    <!-- dashboard 下面内容 -->
    <div class="dash_d_pad">
      <div class="dash_d_pad_title">
        <span>授课班级</span>
      </div>
      <div class="dash_d_pad_info">
        <div>
          <!-- left -->
          <!-- 出勤,复习,自学 -->
          <div class="test_div">
            <div class="wrap_flex wrap_padding">
              <div class="wrap_flex_center">
                <i class="test_i"
                  ><img src="../../../assets/imgs/workbench/rili.png"
                /></i>
                <span class="span1">出勤</span>
              </div>
              <span class="span2">{{ total_attendance }}人</span>
            </div>
            <!-- 下面灰色文字   margintop 23 -->

            <div class="describe">
              <span
                >老师使用“艺术素质测评与学习平台”或“行知艺+APP”记录学生出勤的人数</span
              >
            </div>
          </div>
          <div class="test_div">
            <div class="wrap_flex wrap_padding">
              <div class="wrap_flex_center">
                <i class="test_i"
                  ><img src="../../../assets/imgs/workbench/fuxi.png"
                /></i>
                <span class="span1">复习</span>
              </div>
              <span class="span2">{{ mobile_review_records }}人</span>
            </div>
            <!-- 下面灰色文字   margintop 23 -->

            <div class="describe">
              <span
                >老师使用“艺术素质测评与学习平台”或“行知艺+APP”记录学生出勤的人数</span
              >
            </div>
          </div>
          <div class="test_div">
            <div class="wrap_flex wrap_padding">
              <div class="wrap_flex_center">
                <i class="test_i"
                  ><img src="../../../assets/imgs/workbench/zixue.png"
                /></i>
                <span class="span1">自学模考</span>
              </div>
              <span class="span2">{{ mobile_exams }}人</span>
            </div>
            <!-- 下面灰色文字   margintop 23 -->

            <div class="describe">
              <span
                >老师使用“艺术素质测评与学习平台”或“行知艺+APP”记录学生出勤的人数</span
              >
            </div>
          </div>
        </div>
        <div>
          <!-- 练习,闯关,上传档案 -->
          <div>
            <!-- left -->
            <!-- 出勤,复习,自学 -->
            <div class="test_div">
              <div class="wrap_flex wrap_padding">
                <div class="wrap_flex_center">
                  <i class="test_i"
                    ><img src="../../../assets/imgs/workbench/prac.png"
                  /></i>
                  <span class="span1">练习</span>
                </div>
                <span class="span2">{{ game_through_records }}人</span>
              </div>
              <!-- 下面灰色文字   margintop 23 -->

              <div class="describe">
                <span
                  >老师使用“艺术素质测评与学习平台”或“行知艺+APP”记录学生出勤的人数</span
                >
              </div>
            </div>
            <div class="test_div">
              <div class="wrap_flex wrap_padding">
                <div class="wrap_flex_center">
                  <i class="test_i"
                    ><img src="../../../assets/imgs/workbench/chuang.png"
                  /></i>
                  <span class="span1">闯关</span>
                </div>
                <span class="span2">{{ total_homeworks }}人</span>
              </div>
              <!-- 下面灰色文字   margintop 23 -->

              <div class="describe">
                <span
                  >老师使用“艺术素质测评与学习平台”或“行知艺+APP”记录学生出勤的人数</span
                >
              </div>
            </div>
            <div class="test_div">
              <div class="wrap_flex wrap_padding">
                <div class="wrap_flex_center">
                  <i class="test_i"
                    ><img src="../../../assets/imgs/workbench/shangc.png"
                  /></i>
                  <span class="span1">上传档案</span>
                </div>
                <span class="span2">{{ evaluation_student_uploads }}人</span>
              </div>
              <!-- 下面灰色文字   margintop 23 -->

              <div class="describe">
                <span
                  >老师使用“艺术素质测评与学习平台”或“行知艺+APP”记录学生出勤的人数</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $axios from "@/api/index.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // userWorkBench: this.$store.getters.userWorkBench,
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
  created() {
    // this.userWorkBench = this.$store.getters.userWorkBench;
  },
  computed: {
    ...mapGetters(["userWorkBench"]),
    recentprac: function () {
      const infos =
        this.userWorkBench.homework_record &&
        this.userWorkBench.homework_record;
      if (infos) {
        if (infos.length > 12) {
          return infos.slice(0, 11) + "...";
        }
      }
      return "";
    },
    total_attendance: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.total_attendance) ||
        ""
      );
    },
    mobile_review_records: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.mobile_review_records) ||
        ""
      );
    },
    mobile_exams: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.mobile_exams) ||
        ""
      );
    },
    game_through_records: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.game_through_records) ||
        ""
      );
    },
    total_homeworks: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.total_homeworks) ||
        ""
      );
    },
    evaluation_student_uploads: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.evaluation_student_uploads) ||
        ""
      );
    },
  },
};
</script>
<style lang="scss" >
.dashboard {
  height: 100%;
}

.dash_t_pad {
  display: flex;
  width: 100%;
  height: 324px;
  .dash_lf_t_pad {
    width: 940px;
    height: 324px;
    // background-color: grey;
  }
  .dash_rt_t_pad {
    margin-left: 23px;
    height: 324px;
    width: 712px;
    background-color: #ffffff;
  }
}

.dash_d_pad {
  width: 1676px;
  height: 482px;
  background-color: #ffffff;
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
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #303133;
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

    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #303133;
  }
  i {
    margin-right: 27px;
    line-height: 50px;
  }
  .fix_span {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #606266;
  }
}

.first_row {
  width: 712px;
  height: 50px;
}

.first_row:nth-child(1) {
  height: 69px;
  // background-color: cadetblue;
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
.dash_d_pad_title {
  height: 71px;
  background-color: #ffffff;
  padding-left: 26px;
  border-bottom: 1px solid #ebeef5;
  span {
    line-height: 71px;

    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 800;
    color: #303133;
  }
}
.dash_d_pad_info {
  display: flex;
  height: 411px;
}
.dash_d_pad_info > div {
  display: flex;
  flex-direction: column;
}

.test_div {
  width: 838px;
  height: 137px;
  padding-top: 0.8125rem;
  // background-color: green;
  .describe {
    margin-top: 23px;
    padding-left: 25px;
    span {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #909399;
    }
  }
}

.fix_des {
  height: 4.25rem;
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.test_div {
  .wrap_padding {
    align-items: center;
    padding-left: 27px;
    padding-right: 116px;
    i {
      // vertical-align: middle;
      line-height: 87px;
      width: 50px;
      height: 50px;
      // background-image: url("../../../assets/imgs/sucai1.png");
    }
    .span1 {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #303133;
      margin-left: 19px;
    }
    .span2 {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #67c23a;
    }
  }
}

.test_i {
  display: flex;
  background-color: #8bc4ff;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}
img {
  width: 3.125rem;
  // height: 3.125rem;
}
</style>