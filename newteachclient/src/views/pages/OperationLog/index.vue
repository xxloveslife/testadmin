<template>
  <div class="operation-log-container">
    <div class="operation-header-box">
      <el-dropdown
        trigger="click"
        @command="handleCommand1"
        class="select-option"
      >
        <el-button>
          <span class="span">
            {{ nameTitle }}
          </span>
          <img src="@/assets/imgs/multipleChoice/sanjiaoxing.png" alt="" />
        </el-button>
        <div class="dropdown">
          <el-dropdown-menu slot="dropdown" class="dropdown12">
            <el-dropdown-item
              v-for="(item, i) in userarr2"
              :key="i"
              :command="item"
              >{{ item }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </div>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        @command="handleCommand"
        class="select-option"
      >
        <el-button>
          <span class="span">
            {{ timeTitle }}
          </span>
          <img src="@/assets/imgs/multipleChoice/sanjiaoxing.png" alt="" />
        </el-button>
        <div class="dropdown">
          <el-dropdown-menu slot="dropdown" class="dropdown12">
            <el-dropdown-item
              v-for="(item, i) in timeList"
              :key="i"
              :command="item.title"
              >{{ item.title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </div>
      </el-dropdown>
      <el-input
        v-model="data.keywords"
        placeholder="请输入账号或姓名"
      ></el-input>
      <el-button class="button" type="primary" @click="getlogActionList(data)"
        >搜索</el-button
      >
    </div>
    <el-card>
      <el-table :data="logActionList" style="width: 100%">
        <el-table-column prop="id" label="序号" width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.id }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="系统账号" width="250">
          <template slot-scope="scope">
            <div>{{ scope.row.login_account }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="老师姓名" width="250">
          <template slot-scope="scope">
            <div>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="op_desc" label="操作内容">
          <template slot-scope="scope">
            <div>{{ scope.row.op_desc }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP地址" width="250">
          <template slot-scope="scope">
            <div>{{ scope.row.ip }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="操作时间" width="250">
          <template slot-scope="scope">
            <div>{{ scope.row.create_time | dateFormat }}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="data.page"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameTitle: '全部',
      timeTitle: '时间',
      logActionList: [],
      userList: {},
      userarr1: [null],
      userarr2: ['全部'],
      data: {
        page: 1,
        uid: null,
        day: null,
        keywords: '',
      },
      timeList: [
        { title: '全部', time: null },
        { title: '最近一个月', time: '1' },
        { title: '最近三个月', time: '3' },
        { title: '最近一年', time: '12' },
      ],
      total: 0,
    }
  },
  filters: {
    dateFormat(dateStr) {
      var dt = new Date(dateStr * 1000)
      var yy = dt.getFullYear()

      var mm = (dt.getMonth() + 1).toString().padStart(2, '0')
      var dd = dt
        .getDate()
        .toString()
        .padStart(2, '0')
      var h = dt
        .getHours()
        .toString()
        .padStart(2, '0')
      var m = dt
        .getMinutes()
        .toString()
        .padStart(2, '0')
      var s = dt
        .getSeconds()
        .toString()
        .padStart(2, '0')

      return yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s
    },
  },
  created() {
    this.getlogActionList(this.data)
    console.log(Math.round(new Date()))
    console.log(new Date(1607928840000))
  },
  watch: {
    userList() {
      this.userarr1 = [null]
      this.userarr2 = ['全部']
      for (var k in this.userList) {
        this.userarr1.push(k)
        this.userarr2.push(this.userList[k])
      }
      console.log(this.userarr1, this.userarr2)
    },
  },
  methods: {
    getlogActionList(data) {
      this.$store.dispatch('manageAccount/makelogAction', data).then((res) => {
        console.log(res)
        if (res || res.code == 0) {
          this.userList = res.data.user
          this.logActionList = res.data.data
          this.total = res.data.total
        }
      })
    },
    handleCommand(command) {
      console.log(command)
      this.timeTitle = command
      this.timeList.forEach((ele) => {
        if (ele.title === command) {
          this.data.day = ele.time
        }
      })
    },
    handleCommand1(command) {
      // console.log(command)
      // console.log(this.userarr2.indexOf(command))
      this.data.uid = this.userarr1[this.userarr2.indexOf(command)]
      console.log(this.data.uid)
      this.nameTitle = command
    },
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.data.page = val
      this.getlogActionList(this.data)
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
      margin-right: 14px;
      .el-button {
        padding: 0 5px;
        width: 93px;
        height: 32px;
        background: #ffffff;
        border-radius: 6px;
        border: none;
        .span {
          float: left;
          width: 75px;
          font-size: 12px;
          line-height: 32px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
        img {
          position: absolute;
          float: right;
          margin-top: 15px;
          right: 6px;
          width: 8px;
          height: 4px;
        }
      }
    }
    .el-input {
      transform: translate(0px, -11px);
      width: 239px;
      height: 32px;
      border-radius: 6px;
      margin-right: 12px;
      .el-input__inner {
        width: 239px;
        height: 32px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
    }
    .button {
      position: relative;
      top: -11px;
      width: 100px;
      height: 32px;
      border-radius: 6px;
      padding: 8px 20px;
    }
  }
  .el-card {
    .el-table {
      div {
        text-align: center;
      }
    }
    .el-pagination {
      margin-top: 10px;
      text-align: center;
    }
  }
}
.dropdown12,
.el-dropdown-menu__item:not(.is-disabled) {
  box-shadow: none;
  font-size: 12px;
  margin: 0;
  width: 75px;
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
  .el-dropdown-menu__item {
    padding: 0px 9px;
  }
}

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
