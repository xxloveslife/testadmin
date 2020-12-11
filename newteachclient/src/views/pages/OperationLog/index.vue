<template>
  <div class="operation-log-container">
    <div class="operation-header-box">
      <el-dropdown
        trigger="click"
        @command="handleCommand1"
        class="select-option"
      >
        <el-button>
          <span>
            全部
          </span>
          <img src="@/assets/imgs/multipleChoice/sanjiaoxing.png" alt="" />
        </el-button>
        <div class="dropdown">
          <el-dropdown-menu slot="dropdown" class="dropdown12">
            <el-dropdown-item
              v-for="(item, i) in logActionList"
              :key="i"
              :command="item.op_uid"
              >{{ item.op_uid }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </div>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        @command="handleCommand1"
        class="select-option"
      >
        <el-button>
          <span>
            时间
          </span>
          <img src="@/assets/imgs/multipleChoice/sanjiaoxing.png" alt="" />
        </el-button>
        <div class="dropdown">
          <el-dropdown-menu slot="dropdown" class="dropdown12">
            <el-dropdown-item
              v-for="(item, i) in timeList"
              :key="i"
              :command="item.time"
              >{{ item.title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logActionList: [],
      userList: {},
      data: {
        page: 1,
        uid: null,
        day: null,
      },
      timeList: [
        { title: '全部', time: null },
        { title: '最近一个月', time: '1' },
        { title: '最近三个月', time: '3' },
        { title: '最近一年', time: '12' },
      ],
    }
  },
  created() {
    this.getlogActionList(this.data)
  },
  methods: {
    getlogActionList(data) {
      this.$store.dispatch('manageAccount/makelogAction', data).then((res) => {
        console.log(res)
        if (res || res.code == 0) {
          this.userList = res.data.user
          this.logActionList = res.data.data
        }
      })
    },
    handleCommand1(command) {
      console.log(command)
    },
  },
}
</script>

<style lang="scss">
.operation-log-container {
  .operation-header-box {
    .select-option {
      width: 93px;
      height: 32px;
      border-radius: 6px;
      .el-button {
        padding: 0 19px;
        width: 93px;
        height: 32px;
        background: #ffffff;
        border-radius: 6px;
        border: none;
        span {
          float: left;
          font-size: 12px;
          line-height: 32px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
        img {
          float: right;
          margin-top: 15px;
          position: relative;
          left: 25px;
          width: 8px;
          height: 4px;
        }
      }
    }
  }
}
.dropdown12,
.el-dropdown-menu__item:not(.is-disabled) {
  box-shadow: none;
  font-size: 12px;
  margin: 0;
  width: 53px;
  background: #ffffff;
  text-align: center;
}
.dropdown12 {
  width: 93px;
}
.dropdown12 {
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    background: #409eff !important;
    text-align: center;
  }
}
// &::v-deep.el-select-dropdown {
//   max-height: 500px !important;
//   overflow: auto !important;
// }
.dropdown12:hover {
  border: 1px solid #409eff;
}
.dropdown12 {
  .el-popper .popper__arrow,
  .el-popper .popper__arrow::after {
    display: none;
  }
}

.dropdown12 {
  max-height: 145px;
  overflow: auto;
}
.dropdown12::-webkit-scrollbar {
  display: none;
}
</style>
