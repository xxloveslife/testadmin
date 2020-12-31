<template>
  <!-- dashboard -->

  <div class="dashboard">
    <!-- dashboard 上面内容 -->
    <div
      class="test"
      v-if="userWorkBench.exam_record && userWorkBench.exam_record.length"
    >
      <div class="test_word">
        <span>进行中的考试 ({{ userWorkBench.exam_record.length }}) 场</span>
      </div>
      <div
        class="test_bottom"
        v-for="(item, i) in userWorkBench.exam_record"
        :key="i"
      >
        <div class="data">{{ date | dateFormat }}</div>
        <!---进度条--->
        <div class="Progress_bar">
          <div class="progress">
            <el-progress
              :text-inside="true"
              :stroke-width="15"
              :percentage="
                Number(item.cnt) === 0
                  ? 0
                  : `${
                      (Number(item.student_num) / Number(item.cnt)).toFixed(2) *
                      100
                    }` - 0
              "
            ></el-progress>
          </div>
          <div class="number">{{ item.student_num }}/{{ item.cnt }}人</div>
        </div>
        <div class="begin_time">
          已进行: <span>{{ sharetime[i] }}</span>
        </div>
        <div class="classroom">
          {{ item.class_name }}
        </div>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="dash_t_pad">
      <!-- dashboard 左上内容 -->
      <div class="dash_lf_t_pad">
        <el-row class="cus_elrow" type="flex" align="top">
          <el-col :span="24"
            ><div class="showInfo" @click="routePush('/classmanage')">
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
            ><div class="showInfo" @click="routePush('/studentmanage')">
              <span class="baseinfo">授课学生</span>
              <div class="row_rt">
                <span class="des">{{ userWorkBench.total_student }}人</span>
                <i class="arrow el-icon-arrow-right"></i>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="cus_elrow" type="flex" align="top">
          <el-col :span="24"
            ><div class="showInfo" @click="routePush('/messageCenter')">
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
            ><div class="showInfo" @click="routePush('/practicerecord')">
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
            ><div class="shortcuts firstShortcuts">
              <span>快捷操作</span>
              <i></i></div
          ></el-col>
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts" @click="routePush('/practicelib')">
              <span class="fix_span">布置练习</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>

        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts" @click="routePush('/studentturnout')">
              <span class="fix_span">添加出勤记录</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts" @click="routePush('/classmanage')">
              <span class="fix_span">班级管理</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts" @click="routePush('/maketestquestion')">
              <span class="fix_span">制作试题</span>
              <i class="el-icon-arrow-right"></i></div
          ></el-col>
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts" @click="routePush('/maketestpaper')">
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
        <div class="left_pad">
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
                >老师使用“校园艺术学习平台”或“艺声行APP”记录学生出勤的人数</span
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
              <span>学生使用“艺声行APP”完成一次复习的人数</span>
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
              <span>学生使用“艺声行APP”完成一次自学模考的人数</span>
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
                <span>学生使用“艺声行APP”完成一次练习的人数</span>
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
                <span>学生使用“艺声行APP”完成一次闯关的人数</span>
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
                <span>学生使用“艺声行APP”完成一次个人档案上传的人数</span>
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
      sharetime: [],
      date: new Date(),
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
  filters: {
    dateFormat(dateStr) {
      var dt = new Date(dateStr);
      var yy = dt.getFullYear();

      var mm = (dt.getMonth() + 1).toString().padStart(2, "0");
      var dd = dt.getDate().toString().padStart(2, "0");
      var h = dt.getHours().toString().padStart(2, "0");
      var m = dt.getMinutes().toString().padStart(2, "0");
      var s = dt.getSeconds().toString().padStart(2, "0");

      return yy + "-" + mm + "-" + dd;
    },
  },
  watch: {},
  methods: {
    //测试
    // testService() {
    //   const url = '/token'
    //   $axios.get(url).then((res) => {
    //     console.log('token', res)
    //     this.$store.commit('user/SET_TOKEN', res.token)
    //   })
    // },

    // 路由跳转
    routePush(val) {
      this.$router.push(val);
    },
    // 获取时间方法 开始时间
    getTime(val, index) {
      // console.log(this)
      var that = this;
      let TimeItem = setInterval(function () {
        //毕业时间
        let BirthDay = new Date(val);
        //获取当前时间
        let today = new Date();
        let timeold = today.getTime() - BirthDay.getTime(); //总豪秒数
        let secondsold = Math.floor(timeold / 1000); //总秒数
        let e_daysold = timeold / (24 * 60 * 60 * 1000);
        // let daysold = Math.floor(e_daysold) //相差天数
        let e_hrsold = e_daysold * 24;
        let hrsold = Math.floor(e_hrsold) + ""; //相差小时数
        let e_minsold = (e_hrsold - hrsold) * 60;
        let minsold = Math.floor(e_minsold) + ""; //相差分钟数
        let seconds = Math.floor((e_minsold - minsold) * 60) + ""; //相差秒数
        //将所获取的时间拼接到一起，再把值显示到页面
        let share_time =
          hrsold.padStart(2, "0") +
          ":" +
          minsold.padStart(2, "0") +
          ":" +
          seconds.padStart(2, "0");
        // console.log(that)
        // console.log(that.sharetime)
        that.$set(that.sharetime, index, share_time);
        // that.sharetime[index] = share_time
        // console.log(that.sharetime)
        // console.log(share_time)
        // console.log(this.sharetime)
      }, 1000);
    },
  },
  created() {
    // this.userWorkBench = this.$store.getters.userWorkBench;
    this.$store.dispatch("user/getWorkBench").then((res) => {
      console.log("userWorkBench", this.userWorkBench.exam_record);
      this.userWorkBench.exam_record.forEach((ele, i) => {
        this.getTime(ele.start_time, i);
      });
    });
    // console.log(this.userWorkBench.exam_record);
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
        0
      );
    },
    mobile_review_records: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.mobile_review_records) ||
        0
      );
    },
    mobile_exams: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.mobile_exams) ||
        0
      );
    },
    game_through_records: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.game_through_records) ||
        0
      );
    },
    total_homeworks: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.total_homeworks) ||
        0
      );
    },
    evaluation_student_uploads: function () {
      return (
        (this.userWorkBench.statistics &&
          this.userWorkBench.statistics.evaluation_student_uploads) ||
        0
      );
    },
  },
};
</script>
<style lang="scss">
.dashboard {
  height: 100%;
  .test {
    width: 104.6875rem;
    background: white;
    margin-bottom: 1.875rem;
    border-radius: 0.25rem;
    .test_word {
      width: 104.6875rem;
      height: 3.75rem;
      box-shadow: 0px 0.5px 0.5px #c0c4cc;
      span {
        display: inline;
        height: 3.75rem;
        font-size: 1.25rem;
        line-height: 3.75rem;
        align-items: center;
        margin-left: 1.5625rem;
        font-family: PingFang-SC-Heavy;
        font-weight: 600;
      }
    }
    .test_bottom {
      width: 104.6875rem;
      height: 3.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .data {
        width: 6.25rem;
        height: 1.875rem;
        font-size: 1rem;
        line-height: 1.875rem;
        align-items: center;
        margin-left: 1.5625rem;
      }
      .Progress_bar {
        width: 23.75rem;
        height: 1.875rem;
        display: flex;
        align-items: center;
        .progress {
          width: 18.75rem;
        }
        .number {
          height: 1.25rem;
          font-size: 0.9375rem;
          color: #606266;
        }
      }
      .begin_time {
        width: 12.5rem;
        height: 1.875rem;
        line-height: 1.875rem;
        align-items: center;
        font-size: 1rem;
        color: #67c23a;
        margin-left: 1.25rem;
        span {
          padding-left: 0.3125rem;
          font-size: 1rem;
          color: #67c23a;
        }
      }
      .classroom {
        width: 5rem;
        height: 1.875rem;
        line-height: 1.875rem;
        align-items: center;
        font-size: 1rem;
      }
      .arrow {
        margin-right: 1.6875rem;
      }
    }
  }
  .textHeight {
    height: 3.75rem;
  }
}

.dash_t_pad {
  display: flex;
  width: 100%;
  height: 20.25rem;
  .dash_lf_t_pad {
    width: 58.75rem;
    height: 20.25rem;
    // background-color: grey;
  }
  .dash_rt_t_pad {
    margin-left: 1.4375rem;
    height: 20.25rem;
    width: 44.5rem;
    background-color: #ffffff;
  }
}

.dash_d_pad {
  width: 104.75rem;
  height: 30.125rem;
  background-color: #ffffff;
  border-radius: 0.25rem;
  margin-top: 2.1875rem;
}

.grid-content {
  background-color: ivory;
}

.cus_elrow {
  width: 58.75rem;
  height: 4.25rem;
  background-color: #ffffff;
  margin-top: 1.125rem;
  border-radius: 0.3125rem;
}
.cus_elrow:nth-child(1) {
  margin-top: 0;
}

.showInfo {
  display: -webkit-flex; /* Safari */
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #efefef;
  }
  .baseinfo {
    display: inline-block;
    margin-left: 1.5625rem;
    font-size: 1.125rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #303133;
  }
  .des {
    margin-right: 1.8125rem;
  }
  .arrow {
    margin-right: 1.9375rem;
    line-height: 4.25rem;
  }
}

.shortcuts {
  &:hover {
    background-color: #efefef;
  }
  // &:nth-child(1):hover {
  //   background-color: #ffffff;
  // }
  display: flex;
  justify-content: space-between;
  span {
    line-height: 3.125rem;
    margin-left: 1.25rem;

    font-size: 1.125rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #303133;
  }
  i {
    margin-right: 1.6875rem;
    line-height: 3.125rem;
  }
  .fix_span {
    font-size: 1rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #606266;
  }
}

.first_row {
  width: 44.5rem;
  height: 3.125rem;
}

.first_row:nth-child(1) {
  height: 4.3125rem;
  // background-color: cadetblue;
  .shortcuts {
    border-bottom: 0.0625rem solid #ebeef5;
  }
  span {
    line-height: 4.3125rem;
  }
  i {
    line-height: 4.3125rem;
  }
}
.dash_d_pad_title {
  height: 4.4375rem;
  background-color: #ffffff;
  padding-left: 1.625rem;
  border-bottom: 0.0625rem solid #ebeef5;
  border-radius: 0.25rem;
  span {
    line-height: 4.4375rem;
    font-size: 1.5rem;
    font-family: PingFang SC;
    font-weight: 800;
    color: #303133;
  }
}
.dash_d_pad_info {
  display: flex;
  height: 25.6875rem;
  .left_pad {
    border-right: 0.0625rem solid #ebeef5;
  }
}
.dash_d_pad_info > div {
  display: flex;
  flex-direction: column;
}

.test_div {
  width: 52.375rem;
  height: 8.5625rem;
  padding-top: 0.8125rem;
  // background-color: green;
  .describe {
    margin-top: 1.4375rem;
    padding-left: 1.5625rem;
    span {
      font-size: 1.125rem;
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
    padding-left: 1.6875rem;
    padding-right: 7.25rem;
    i {
      // vertical-align: middle;
      line-height: 5.4375rem;
      width: 3.125rem;
      height: 3.125rem;
      // background-image: url("../../../assets/imgs/sucai1.png");
    }
    .span1 {
      font-size: 1.375rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #303133;
      margin-left: 1.1875rem;
    }
    .span2 {
      font-size: 1.375rem;
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

.first_row {
  .firstShortcuts:hover {
    background-color: #ffffff;
  }
}
</style>
