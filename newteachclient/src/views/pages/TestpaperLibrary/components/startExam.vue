<template>
  <div class="start-exam-container" v-if="exam_dialogVisible">
    <div class="start-exam-container-header">
      <p
        class="start-exam-container-header-text"
        v-if="startExamText === '成功'"
      >
        开启考试
      </p>
      <p class="start-exam-container-header-text" v-else>提示</p>
      <i class="el-icon-error" @click="closeForm"></i>
    </div>
    <div class="start-exam-container-body" v-if="startExamText === '成功'">
      <p class="start-exam-container-body-text">你是否确定开启考试</p>
      <el-form ref="startExamForm" :model="startExamForm" label-width="100px">
        <!-- 考试部分 -->
        <el-form-item
          label="考试部分"
          v-if="this.tempItem.paper_question_conf.length"
        >
          <el-button type="primary" size="mini">上机考试</el-button>
        </el-form-item>
        <!-- 答卷时长 -->
        <el-form-item label="答卷时长">
          <div class="answering-time">
            <el-select
              v-model="startExamForm.fitTimeValue"
              :popper-append-to-body="false"
              placeholder="请选择答卷方式"
              @change="changeFitTime"
            >
              <el-option
                v-for="item in allTimeOptions"
                :key="item.mark"
                :label="item.label"
                :value="item.mark"
              >
              </el-option>
            </el-select>
          </div>
          <div class="time-limit-box" v-if="startExamForm.fitTimeValue == 2">
            <el-input
              class="time-limit-input"
              v-model="startExamForm.time_limit"
              placeholder=""
            ></el-input
            ><span class="time-limit-span">分钟</span>
          </div>
        </el-form-item>

        <!--评分难易度-->
        <el-form-item label="评分难易度" class="difficulty">
          <div class="select-difficulty">
            <el-select
              v-model="startExamForm.fitDifficultyValue"
              :popper-append-to-body="false"
              placeholder="中"
              @change="changeFitDifficulty"
            >
              <el-option
                v-for="item in allDifficultyOptions"
                :key="item.mark"
                :label="item.label"
                :value="item.mark"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="选择年级">
          <div class="select-grade">
            <el-select
              v-model="startExamForm.fitGradeValue"
              :popper-append-to-body="false"
              placeholder="选择年级"
              @change="changeFitGrade"
            >
              <el-option
                v-for="item in allGradeOptions"
                :key="item.mark"
                :label="item.label"
                :value="item.mark"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="选择班级">
          <div
            v-if="classRoomList === null || startExamForm.fitGradeValue === -1"
            class="checked-class-text"
          >
            请先选择年级
          </div>
          <el-radio-group
            v-model="startExamForm.checkboxGroup"
            v-if="classRoomList && classRoomList.length"
          >
            <el-radio-button
              class="checked-class"
              v-for="classroom in classRoomList"
              :label="classroom"
              :key="classroom.id"
              >{{ classroom.name }}</el-radio-button
            >
          </el-radio-group>
          <div
            class="checked-class-text"
            v-if="
              classRoomList &&
                classRoomList.length === 0 &&
                startExamForm.fitGradeValue !== -1
            "
          >
            暂无班级
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="start-exam-container-body" v-else>
      <div class="start-exam-container-body-box">
        <p class="start-exam-container-body-tig">{{ startExamText }}</p>
      </div>
    </div>
    <div class="start-exam-container-footer">
      <span @click="determineTheExam" v-if="startExamText === '成功'"
        >确认</span
      >
      <span @click="closeForm" v-else>确认</span>
      <span @click="closeForm">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'startExam',
  data() {
    return {
      radio: '2',
      classRoomList: null,
      answerSheetPaperOptions: [
        { mark: 1, label: 'A3 (8K)' },
        { mark: 2, label: 'A4 (16K)' },
      ],
      allTimeOptions: [
        { mark: -1, label: '请选择答卷方式' },
        { mark: 1, label: '不限考试总时长' },
        { mark: 2, label: '限制考试总时长' },
        { mark: 3, label: '根据模考限时' },
      ],

      allDifficultyOptions: [
        { mark: 1, label: '易' },
        { mark: 2, label: '中' },
        { mark: 3, label: '难' },
      ],

      allGradeOptions: [
        { mark: -1, label: '所有年级' },
        { mark: 4, label: '一年级' },
        { mark: 5, label: '二年级' },
        { mark: 6, label: '三年级' },
        { mark: 7, label: '四年级' },
        { mark: 8, label: '五年级' },
        { mark: 9, label: '六年级' },
        { mark: 1, label: '七年级' },
        { mark: 2, label: '八年级' },
        { mark: 3, label: '九年级' },
        { mark: 10, label: '高一' },
        { mark: 11, label: '高二' },
        { mark: 12, label: '高三' },
      ],
      startExamForm: {
        // 班级列表
        checkboxGroup: {},
        fitTimeValue: '',
        answerSheetPaper: '',
        fitDifficultyValue: 2,
        fitGradeValue: '',
        time_limit: '',
      },
    }
  },
  props: {
    exam_dialogVisible: {
      type: Boolean,
    },
    tempItem: {
      type: Object,
    },
    startExamText: {
      type: String,
    },
  },

  methods: {
    // 年级选择
    changeFitGrade(val) {
      console.log(val)
      // 调接口获取班级数据
      this.$store
        .dispatch('testlibrary/getClassListByYear', { year: val })
        .then((res) => {
          if (res.code === 0) {
            console.log(res)
            this.classRoomList = res.data
          } else {
            this.$message.error('查询班级失败')
          }
        })
    },
    changeFitTime(val) {
      console.log(val)
    },
    changeFitDifficulty(val) {
      console.log(val)
    },
    closeForm() {
      this.$emit('close')
      this.clearForm()
    },
    // 清空表单
    clearForm() {
      this.startExamForm.checkboxGroup = {}
      this.startExamForm.fitTimeValue = ''
      this.startExamForm.fitDifficultyValue = 2
      this.startExamForm.fitGradeValue = ''
      this.classRoomList = null
      this.time_limit = ''
    },
    // 确定考试
    determineTheExam() {
      console.log(this.startExamForm)
      if (!this.tempItem.paper_question_conf.length) {
        if (
          this.startExamForm.fitTimeValue === '' ||
          this.startExamForm.fitTimeValue == -1
        ) {
          this.$message.error('请选择答卷方式')
        } else if (
          this.startExamForm.fitTimeValue == 2 &&
          this.startExamForm.time_limit === ''
        ) {
          this.$message.error('请输入考试时长')
        } else {
          if (
            this.startExamForm.fitGradeValue === '' ||
            this.startExamForm.fitGradeValue == -1
          ) {
            this.$message.error('请先选择年级')
          } else {
            if (this.startExamForm.checkboxGroup.id) {
              // console.log(this.startExamForm)
              // console.log(this.startExamForm.checkboxGroup)
              // console.log(this.tempItem)
              var data = {
                classroom_id: this.Global.database.roomId,
                exam_record_id: 0,
                paper_id: this.tempItem.id,
                singing_difficulty: this.startExamForm.fitDifficultyValue,
                time_type: this.startExamForm.fitTimeValue,
                time_limit:
                  this.startExamForm.fitTimeValue == 2
                    ? this.startExamForm.time_limit
                    : 0,
                room_id: this.startExamForm.checkboxGroup.id,
              }

              console.log(data.room_id)
              // 发请求开始考试
              this.$store
                .dispatch('testlibrary/getStartExam', data)
                .then((res) => {
                  console.log(res)
                  if (res.code === 0) {
                    console.log(res)
                    this.closeForm()
                  } else {
                    this.$message.error(res.msg)
                  }
                })
            } else {
              this.$message.error('请选择班级')
            }
          }
        }
      } else {
        // 接口文档

        if (
          this.startExamForm.fitGradeValue === '' ||
          this.startExamForm.fitGradeValue == -1
        ) {
          this.$message.error('请先选择年级')
        } else {
          if (this.startExamForm.checkboxGroup.id) {
            // console.log(this.startExamForm)
            // console.log(this.startExamForm.checkboxGroup)
            // console.log(this.tempItem)
            var data1 = {
              classroom_id: this.Global.database.roomId,
              exam_record_id: 0,
              paper_id: this.tempItem.id,
              singing_difficulty: this.startExamForm.fitDifficultyValue,
              time_type: this.startExamForm.fitTimeValue,
              time_limit:
                this.startExamForm.fitTimeValue == 2
                  ? this.startExamForm.time_limit
                  : 0,
              room_id: this.startExamForm.checkboxGroup.id,
            }

            console.log(data1)
            console.log(data1.room_id)
            // 发请求开始考试
            this.$store
              .dispatch('testlibrary/getStartExam', data1)
              .then((res) => {
                console.log(res)
                if (res.code === 0) {
                  console.log(res)
                  this.closeForm()
                } else {
                  this.$message.error(res.msg)
                }
              })
          } else {
            this.$message.error('请选择班级')
          }
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../../../style/variable.scss';
.start-exam-container {
  width: 416px;
  height: 419px;
  background: #ffffff;
  box-shadow: 0px 5px 16px 0px #d6dbe7;
  border-radius: 8px;
  .start-exam-container-header {
    height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #dcdfe6;
    .start-exam-container-header-text {
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
  .start-exam-container-body {
    height: 305px;
    padding: 18px 0;
    overflow: auto;
    .start-exam-container-body-box {
      padding: 0 20px;
      .start-exam-container-body-tig {
        font-size: 16px;
        text-align: center;
        margin-top: 100px;
      }
    }

    .start-exam-container-body-text {
      padding-left: 40px;
    }
    .el-form {
      position: relative;
      .difficulty {
        padding-left: 12px;
      }
    }
    .time-limit-box {
      position: absolute;
      top: 0;
      right: 65px;
      .time-limit-input {
        width: 50px;
        height: 32px;
        margin-right: 10px;
        .el-input__inner {
          height: 32px;
          padding: 0 5px;
        }
      }
    }
    .marking-method {
      .el-radio__label {
        font-size: 12px;
      }
    }
    .answering-time {
      @include for_el_select(9.375rem, 2rem);
      .el-input__inner {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
      .el-select-dropdown {
        top: 146px !important;
        left: 101px !important;
      }
    }
    .answe-sheet-paper {
      @include for_el_select(9.375rem, 2rem);
      .el-input__inner {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
      .el-select-dropdown {
        top: 146px !important;
        left: 101px !important;
      }
    }
    .select-difficulty {
      @include for_el_select(4.375rem, 2rem);
      .el-input__inner {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
      .el-select-dropdown {
        top: 200px !important;
        left: 100px !important;
      }
    }
    .select-grade {
      @include for_el_select(7.375rem, 2rem);
      .el-input__inner {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
      .el-select-dropdown {
        top: 257px !important;
        left: 100px !important;
      }
    }
    .el-form {
      .el-form-item {
        margin: 8px 0 16px;
        .exerciseName {
          width: 314px;
          height: 32px;
          .el-input__inner {
            width: 314;
            height: 32px;
            border-radius: 6px;
          }
        }
        .el-form-item__label {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #303133;
        }
      }
      .checked-class-text {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
      .checked-class {
        width: 60px;
        height: 32px;
        border-radius: 6px;
        margin-right: 13px;
        margin-bottom: 15px;
        .el-radio-button__inner {
          width: 60px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #dcdfe6;
          padding: 9px 15px;
        }
      }
      .checked-class {
        .el-radio-button__orig-radio:checked + {
          .el-radio-button__inner {
            box-shadow: none;
          }
        }
      }
    }
  }
  .start-exam-container-footer {
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
