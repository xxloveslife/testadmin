<template>
  <div class="messag-center-container">
    <div class="titleBar">
      <span
        class="spanItem1"
        :class="tabstatus ? 'spanItem' : ''"
        @click="changeTabstatus"
        >系统消息<i>({{ list.length }}条)</i></span
      >
      <span
        class="spanItem2"
        :class="tabstatus ? '' : 'spanItem'"
        @click="changeTabstatus"
        >个人消息<i>({{ list1.length }}条)</i></span
      >
    </div>
    <div class="myProfile">
      <el-card>
        <el-table
          class="tableStyle"
          ref="myProfileFromRef"
          :data="tabstatus ? list : list1"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column label="发送人">
            <template slot-scope="scope">
              <div
                :class="scope.row.status === '0' ? 'poperClass' : 'blobClass'"
                @click="titleContentsBox(scope.row)"
              >
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="标题内容">
            <template slot-scope="scope">
              <div
                :class="scope.row.status === '0' ? 'poperClass' : 'blobClass'"
                @click="titleContentsBox(scope.row)"
              >
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <div
                :class="scope.row.status === '0' ? 'poperClass' : 'blobClass'"
                @click="titleContentsBox(scope.row)"
              >
                {{ scope.row.time }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="iconBox">
          <i class="el-icon-delete" @click="messageBoxStatus = true"></i>
          <span class="markAsRead" @click="markMessageRead"></span>
        </div>
      </el-card>
    </div>
    <message-box
      class="message-box"
      @closeMessage="messageBoxStatus = false"
      :messageBoxStatus="messageBoxStatus"
      @removeMessage="removeMessage"
    ></message-box>
    <row-messagebox
      class="message-box"
      @closeMessage="rowMessageBoxStatus = false"
      :rowMessageBoxStatus="rowMessageBoxStatus"
      :rowObj="rowObj"
    ></row-messagebox>
  </div>
</template>

<script>
import messageBox from './components/messageBox'
import rowMessagebox from './components/rowMessagebox'
export default {
  data() {
    return {
      rowMessageBoxStatus: false,
      messageBoxStatus: false,
      tabstatus: true,
      list: [
        {
          id: '0',
          system_id: '',
          name: '校方',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '1',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、高精度的文字检测与识别服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。',
          time: '2020-11-23 16:00',
        },
        {
          id: '1',
          system_id: '',
          name: '校方',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、高精度的文字检测与识别服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。111',
          time: '2020-11-23 16:00',
        },
        {
          id: '2',
          system_id: '',
          name: '校方',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '1',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、高精度的文字检测与识别服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。222',
          time: '2020-11-23 16:00',
        },
        {
          id: '3',
          system_id: '',
          name: '校方',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、高精度的文字检测与识别服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。333',
          time: '2020-11-23 16:00',
        },
        {
          id: '4',
          system_id: '',
          name: '校方',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、高精度的文字检测与识别服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。3444',
          time: '2020-11-23 16:00',
        },
      ],
      list1: [
        {
          id: '00',
          system_id: '',
          name: '校方1',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、高精度的文字检测与识别asssssssssssssssssss服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。',
          time: '2020-11-23 16:00',
        },
        {
          id: '100',
          system_id: '',
          name: '校方1',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、高精度的文字检测2ewsadsadasssssssssssssssssss与识别服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。',
          time: '2020-11-23 16:00',
        },
        {
          id: '200',
          system_id: '',
          name: '校方1',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '1',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、高精度的文字111111111111111111111111111111111111检测与识别服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。',
          time: '2020-11-23 16:00',
        },
        {
          id: '300',
          system_id: '',
          name: '校方1',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents: 'asdadsadfasdasdasdsadasd',
          time: '2020-11-23 16:00',
        },
        {
          id: '400',
          system_id: '',
          name: '校方1',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents:
            '多场景、多语种、12121212高精度的文字检测与识别服务，多项ICDAR指标居世界第一；广泛适用于远程身份认证、财税报销、文档电子化等场景，为企业降本增效；提供稳定易用的在线API、离线SDK、软件部署包多种服务形式，适配各种应用场景。',
          time: '2020-11-23 16:00',
        },
        {
          id: '500',
          system_id: '',
          name: '校方1',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents: 's',
          time: '2020-11-23 16:00',
        },
        {
          id: '600',
          system_id: '',
          name: '校方1',
          school_id: '',
          admin_id: '',
          urgency: '',
          status: '0',
          title: '添加作业：（2020-2021）第一学年期中测试卷',
          contents: 'sddddewq',
          time: '2020-11-23 16:00',
        },
      ],
      ids: [],
      rowObj: {},
    }
  },
  components: { messageBox, rowMessagebox },
  created() {
    this.getSystemInformationList()
    this.getSystemInformationList1()
  },
  methods: {
    getSystemInformationList() {
      this.$store
        .dispatch('manageAccount/makeSystemInformation', { type: 1 })
        .then((res) => {
          console.log(res)
          // if (res || res.code == 0) {
          //   console.log(res)
          //   // this.list=res.data.list
          // }
        })
    },
    getSystemInformationList1() {
      this.$store
        .dispatch('manageAccount/makeSystemInformation', { type: 2 })
        .then((res) => {
          console.log(res)
          //   if (res || res.code == 0) {
          //     console.log(res)
          //     // this.list1=res.data.list
          //   }
        })
    },
    changeTabstatus() {
      if (this.tabstatus) {
        this.tabstatus = false
      } else {
        this.tabstatus = true
      }
    },
    handleSelectionChange(val) {
      this.ids = []
      console.log(val)
      val.forEach((ele) => {
        this.ids.push(ele.id)
      })
    },
    // 删除消息
    removeMessage() {
      this.messageBoxStatus = false
      this.$store
        .dispatch('manageAccount/makeUpdateSystemMsgStatus', {
          ids: this.ids.join(','),
          status: 2,
        })
        .then((res) => {
          if (res || res.code == 0) {
            console.log(res)
            // this.list=res.data.list
            if (this.tabstatus) {
              this.getSystemInformationList()
            } else {
              this.getSystemInformationList1()
            }
          }
        })
    },
    // 标为已读
    markMessageRead() {
      this.$store
        .dispatch('manageAccount/makeUpdateSystemMsgStatus', {
          ids: this.ids.join(','),
          status: 1,
        })
        .then((res) => {
          if (res || res.code == 0) {
            console.log(res)
            // this.list=res.data.list
            if (this.tabstatus) {
              this.getSystemInformationList()
            } else {
              this.getSystemInformationList1()
            }
          }
        })
    },
    titleContentsBox(row) {
      this.rowObj = row
      this.rowMessageBoxStatus = true
    },
  },
}
</script>

<style lang="scss">
.messag-center-container {
  position: relative;
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
      i {
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
      }
    }
    .spanItem {
      background: #409eff;
      color: #ffffff;
    }
  }
  .el-card {
    .tableStyle {
      .el-table__header-wrapper {
        thead {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #303133;
        }
      }
    }
  }
  .blobClass {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }
  .poperClass {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #303133;
  }
  .iconBox {
    margin-top: 10px;
    margin-left: 10px;
    i {
      font-size: 19px;
      color: #c0c4cc;
    }
    i:hover {
      color: #409eff;
    }
    span {
      position: relative;
      left: 30px;
      top: 3px;
      display: inline-block;
      height: 20px;
      width: 20px;
      background-image: url('../../../assets/imgs/MessageCenter/markAsRead.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    span:hover {
      background-image: url('../../../assets/imgs/MessageCenter/markAsReadHover.png');
    }
  }

  .message-box {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
