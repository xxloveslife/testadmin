<template>
  <!-- 各种题型列表组件 -->
  <div class="draggbleList">
    <!-- title -->
    <div class="inner_title wrap_flex">
      <div class="inner_left wrap_flex_center">
        <span>单项选择题</span>
        <span class="tenpx">(每小题5分, 共8题, 共40分)</span>
      </div>
      <div class="right_newadd">
        <el-button type="primary">新增一题</el-button>
      </div>
    </div>
    <!-- allcontent -->
    <div class="allcontent">
      <!-- header -->
      <div class="content_header wrap_flex_center">
        <span>序号</span>
        <span>题目</span>
        <span>操作</span>
      </div>

      <!-- contentlist -->
      <div class="contentlist">
        <!--使用draggable组件-->
        <draggable
          v-model="myArray"
          chosenClass="chosen"
          forceFallback="true"
          :group="onlyGroup"
          animation="500"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div
              class="item wrap_flex_center"
              v-for="element in myArray"
              :key="element.id"
            >
              <div class="test_id">
                <span>{{ element.id }}</span>
              </div>

              <div class="testName wrap_flex_allcenter">
                <span>提供的图形属于()</span>
              </div>
              <div class="testOperation wrap_flex_center">
                <i class="auto" @click="autoClick" title="自动换题"></i>
                <i class="manual" title="手动换题" @click="handleManual"></i>
                <i class="fav" title="收藏"></i>
                <i class="del" title="删除"></i>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>

    <!-- 手动换题dialog -->
    <div class="manual_dialog">
      <el-dialog title="手动换题" :visible.sync="dialogVisible" width="56.67%">
        <!-- 手动换题内容 -->
        <div>
          <manual-change></manual-change>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import onlyStr from "../../../../api/utils/onlyString";
import manualChange from "./manualChange";

export default {
  data() {
    return {
      // 唯一group
      onlyGroup: "",
      myArray: [
        { name: "1", id: 1 },
        { name: "2", id: 2 },
        { name: "3", id: 3 },
        { name: "4", id: 4 },
        { name: "5", id: 5 },
      ],
      dialogVisible: false,
    };
  },
  components: {
    draggable,
    manualChange,
  },
  methods: {
    onEnd() {
      console.log(this.myArray);
    },
    autoClick() {
      //   console.log("dianjile");
    },

    // 手动换题
    handleManual() {
      this.dialogVisible = true;
      //
    },
  },
  created() {
    this.onlyGroup = onlyStr();
    console.log("onlygroup", this.onlyGroup);
  },
};
</script>
<style lang="scss" >
.draggbleList {
  margin-top: 1.1875rem;
  .item {
    width: 100%;
    height: 2.875rem;
    justify-content: space-between;

    .test_id > span {
      margin-left: 2.5rem;
    }
    .testOperation {
      //   width: 10.9375rem;
      padding-right: 1.375rem;
      justify-content: flex-end;
      i {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 1.1875rem;
      }
      .auto {
        background-image: url("../../../../assets/imgs/paperSysMatch/auto.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/paperSysMatch/autohover.png");
        }
      }
      .manual {
        background-image: url("../../../../assets/imgs/paperSysMatch/manual.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/paperSysMatch/manualhover.png");
        }
      }
      .fav {
        background-image: url("../../../../assets/imgs/paperSysMatch/favorite.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/paperSysMatch/favoritehover.png");
        }
      }
      .del {
        background-image: url("../../../../assets/imgs/paperSysMatch/delete.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/paperSysMatch/deletehover.png");
        }
      }
    }
  }
  .inner_left > span:nth-child(1) {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }
  .inner_left > span:nth-child(2) {
    // align-self: flex-end;
    font-family: Microsoft YaHei;
    font-weight: 400;

    color: #303133;
  }

  .right_newadd {
    border: none;
    .el-button {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      width: 6.25rem;
      height: 2rem;
      line-height: 0;
      border-radius: 0.375rem;
      background-color: #409eff;
    }
  }

  .allcontent {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 0.5rem;
    margin-top: 1.125rem;
    .content_header {
      height: 3.75rem;
      border-bottom: 1px solid #dcdfe6;
      span:nth-child(1) {
        margin-left: 1.75rem;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      span:nth-child(2) {
        margin-left: 48.375rem;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      span:nth-child(3) {
        margin-left: 44rem;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
    }
  }
  // dialog
  .manual_dialog {
    .el-dialog {
      border-radius: 0.5rem;
    }
    .el-dialog__header {
      display: flex;
      padding: 0;
      height: 3.75rem;
      border-bottom: 1px solid #dcdfe6;
      .el-dialog__title {
        line-height: 3.75rem;
        margin-left: 1.625rem;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }

      .el-dialog__headerbtn {
        top: 0.4375rem;
        right: 0.4375rem;
        i {
          width: 1.5rem;
          height: 1.5rem;
          background-image: url("../../../../assets/imgs/paperSysMatch/close.png");
          background-repeat: no-repeat;
          background-size: cover;
          &::before {
            content: "";
          }
        }
      }
    }

    .el-dialog__body {
      padding: 0;
    }

    .el-dialog__footer {
      display: flex;
      height: 3.125rem;
      padding: 0;
      .dialog-footer {
        display: flex;
        border-top: 1px solid #dcdfe6;
        .el-button--primary {
          background-color: transparent;
          border: none;
          border-right: 1px solid #dcdfe6;
          //   flex: 1;
          width: 34rem;
          border-radius: 0;

          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #409eff;
        }
        .el-button--default {
          background-color: transparent;
          border: none;

          width: 34rem;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #303133;
        }
      }
    }
  }
}
.inner_title {
  height: 2rem;
}
</style>