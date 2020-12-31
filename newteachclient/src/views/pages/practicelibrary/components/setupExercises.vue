<template>
  <div class="setup-exercises-container" v-if="practice_dialogVisible">
    <div class="setup-exercises-container-header">
      <p class="setup-exercises-container-header-text">布置练习</p>
      <i class="el-icon-error" @click="closeBtn"></i>
    </div>

    <div class="setup-exercises-container-body" v-if="openPopubItem === '成功'">
      <el-form
        ref="setupExercisesForm"
        :model="setupExercisesForm"
        label-width="80px"
        size="mini"
      >
        <!-- <el-form-item label="练习名称">
          <el-input
            v-model="setupExercisesForm.name"
            class="exerciseName"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="选择年级">
          <div class="select-grade">
            <el-select
              v-model="fitGradeValue"
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
            v-if="classRoomList === null || fitGradeValue === -1"
            class="checked-class-text"
          >
            请先选择年级
          </div>
          <el-checkbox-group
            v-model="checkboxGroup"
            v-if="classRoomList && classRoomList.length"
          >
            <el-checkbox-button
              class="checked-class"
              v-for="classroom in classRoomList"
              :label="classroom"
              :key="classroom.id"
              >{{ classroom.name }}</el-checkbox-button
            >
          </el-checkbox-group>
          <div
            class="checked-class-text"
            v-if="
              classRoomList &&
                classRoomList.length === 0 &&
                fitGradeValue !== -1
            "
          >
            暂无班级
          </div>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="timeValue"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="setup-exercises-container-body" v-else>
      <p class="errorText">{{ openPopubItem }}</p>
    </div>

    <div class="setup-exercises-container-footer">
      <span @click="setupExercises">确认</span>
      <span @click="closeBtn">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setupExercises',
  data() {
    return {
      // 班级列表
      classRoomList: null,
      checkboxGroup: [],
      timeValue: '',
      system: 0,
      setupExercisesForm: {
        name: '',
      },
      fitGradeValue: '',
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
    }
  },
  props: {
    practice_dialogVisible: {
      type: Boolean,
    },
    tempItem: {
      type: Object,
    },
    currentLib: {
      type: String,
    },
    openPopubItem: {
      type: String,
    },
  },
  watch: {
    tempItem() {
      // console.log(this.tempItem)
      this.setupExercisesForm.name = this.tempItem.name
    },
  },
  mounted() {
    console.log(this.setupExercisesForm)
  },
  methods: {
    // 布置作业
    setupExercises() {
      if (this.openPopubItem === '成功') {
        var data = {}
        data.homeworks_id = this.tempItem.id
        console.log(this.checkboxGroup)
        data.room_ids = []
        data.time = this.timeValue
        console.log(data)

        if (this.classRoomList === null || this.fitGradeValue === -1) {
          this.$message.error('请先选择年级')
        } else {
          if (this.checkboxGroup.length) {
            this.checkboxGroup.forEach((ele) => {
              console.log(ele)
              data.room_ids.push(ele.id)
            })
            if (this.timeValue === '') {
              this.$message.error('请选择截止时间')
            } else {
              // 发请求
              console.log(data)
              this.$store
                .dispatch('practiceLibrary/getbuzhi', data)
                .then((res) => {
                  console.log(res)
                  if (res && res.code === 0) {
                    console.log(res)
                    this.$message.success('布置练习成功')
                    this.$emit('close')
                    this.clearData()
                  } else {
                    console.log(res.msg)
                  }
                })
            }
          } else {
            this.$message.error('请先选择班级')
          }
        }
      } else {
        this.closeBtn()
      }
    },
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
    closeBtn() {
      this.$emit('close')
      this.clearData()
    },
    clearData() {
      // 清除弹窗数据
      this.classRoomList = null
      this.timeValue = ''
      this.fitGradeValue = ''
      this.checkboxGroup = []
      this.system = 0
    },
  },
}
</script>

<style lang="scss">
@import '../../../../style/variable.scss';
.setup-exercises-container {
  z-index: 55;
  width: 416px;
  height: 384px;
  background-color: #fff;
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
    height: 260px;
    overflow: auto;
    .errorText {
      font-size: 16px;
      text-align: center;
      margin-top: 50px;
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
        top: 152px !important;
        left: 80px !important;
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
        margin-right: 15px;
        margin-bottom: 15px;
        .el-checkbox-button__inner {
          width: 60px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #dcdfe6;
          padding: 9px 15px;
        }
      }
      .checked-class.is-checked {
        .el-checkbox-button__inner {
          box-shadow: none;
        }
      }
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
