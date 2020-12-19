<template>
  <div class="course_list">
    <m-cascader
      :radio="infos[0].title"
      :infos="infos"
      @getItemfromCondition="getItems"
      @changeOperationStyle="changeOpstyle"
      :pageSize="pagesize"
      :totalNum="parseInt(allNum)"
      :currentPage="currentP"
    >
      <div class="show_list">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="68"> </el-table-column>
          <el-table-column label="序号" width="58">
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>

          <el-table-column
            prop="name"
            label="课件名称"
            show-overflow-tooltip
            width="250"
          >
          </el-table-column>
          <el-table-column
            prop="stype"
            label="课件类型"
            show-overflow-tooltip
            width="289"
          >
          </el-table-column>

          <el-table-column
            prop="paper_range"
            label="教材"
            show-overflow-tooltip
            width="171"
          >
          </el-table-column>
          <el-table-column
            prop="grade"
            label="年级"
            show-overflow-tooltip
            width="185"
          >
          </el-table-column>
          <el-table-column
            prop="semester"
            label="学期"
            show-overflow-tooltip
            width="185"
          >
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            show-overflow-tooltip
            width="187"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="list_operation wrap_flex_center">
                <!-- 预览 -->
                <i
                  title="预览"
                  class="preview"
                  @click="handlePreview(scope.$index, scope.row)"
                ></i>
                <!-- 编辑 -->
                <i
                  class="edit"
                  title="编辑"
                  @click="handleEdit(scope.$index, scope.row)"
                ></i>
                <!-- 删除 -->
                <i
                  class="delete"
                  title="删除"
                  @click="handleDelete(scope.$index, scope.row)"
                ></i>
                <!-- 开始教学 -->
                <div
                  class="start_teach wrap_flex_allcenter"
                  title="开始教学"
                  @click="handleStartTeach(scope.$index, scope.row)"
                >
                  <!-- <i></i> -->
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </m-cascader>

    <!-- 弹窗 -->
    <div class="m_dialog">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="20%"
        :before-close="handleClose"
      >
        <span>确定删除</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mCascader from "../../../components/common/Mcascader";
import $axios from "../../../api/index";
export default {
  data() {
    return {
      tableData: [],
      infos: [
        {
          title: "类别",
          attr: "category",
          category: [
            { label: "全部", mark: 0 },
            {
              label: "音乐类",
              mark: 1,
            },
            { label: "美术类", mark: 2 },
            {
              label: "综合类",
              mark: 3,
            },
          ],
        },
        {
          title: "教材",
          attr: "paper_range",
          category: [
            { label: "全部", mark: 0 },
            { label: "苏少版", mark: 1 },
            { label: "人教版", mark: 2 },
            { label: "人音版", mark: 3 },
            { label: "人美版", mark: 4 },
            { label: "岭南版", mark: 5 },
            { label: "湘艺版", mark: 6 },
            { label: "苏科版", mark: 7 },
            { label: "鲁教版", mark: 8 },
            { label: "湘美版", mark: 9 },
            { label: "上教版", mark: 10 },
          ],
        },
        {
          title: "年级",
          attr: "grade",
          category: [
            { label: "全部", mark: -1 },
            { label: "一年级", mark: 4 },
            { label: "二年级", mark: 5 },
            { label: "三年级", mark: 6 },
            { label: "四年级", mark: 7 },
            { label: "五年级", mark: 8 },
            { label: "六年级", mark: 9 },
            { label: "七年级", mark: 1 },
            { label: "八年级", mark: 2 },
            { label: "九年级", mark: 3 },
            { label: "高一", mark: 10 },
            { label: "高二", mark: 11 },
            { label: "高三", mark: 12 },
          ],
        },
        {
          title: "学期",
          attr: "semester",
          category: [
            { label: "全部", mark: -1 },
            { label: "上学期", mark: 1 },
            { label: "下学期", mark: 2 },
          ],
        },
        {
          title: "单元",
          attr: "unit",
          category: [
            { label: "全部", mark: 0 },
            { label: "1单元", mark: 1 },
            { label: "2单元", mark: 2 },
            { label: "3单元", mark: 3 },
            { label: "4单元", mark: 4 },
            { label: "5单元", mark: 5 },
            { label: "6单元", mark: 6 },
            { label: "7单元", mark: 7 },
            { label: "8单元", mark: 8 },
            { label: "9单元", mark: 9 },
            { label: "10单元", mark: 10 },
            { label: "11单元", mark: 11 },
            { label: "12单元", mark: 12 },
            { label: "13单元", mark: 13 },
            { label: "14单元", mark: 14 },
            { label: "15单元", mark: 15 },
            { label: "16单元", mark: 16 },
            { label: "17单元", mark: 17 },
            { label: "18单元", mark: 18 },
            { label: "19单元", mark: 19 },
            { label: "20单元", mark: 20 },
            { label: "21单元", mark: 21 },
            { label: "22单元", mark: 22 },
            { label: "23单元", mark: 23 },
            { label: "24单元", mark: 24 },
            { label: "25单元", mark: 25 },
          ],
        },
      ],
      requestObj: {},
      pagesize: 20,
      templibDatas: {},
      // 弹窗
      dialogVisible: false,

      tempIndex: "",
      tempRowData: {},
    };
  },
  methods: {
    getItems(val) {
      this.requestObj.keyword = (val.keyword && val.keyword) || "";
      this.requestObj.page = val.currentPage && val.currentPage;
      //   // console.log("requestObjfirst", this.requestObj);
      this.requestObj = {
        ...this.requestObj,
        ...this.reformVal(val, this.infos),
      };
      let { _from, ...param } = { ...this.requestObj };
      this.requestObj = param;

      $axios.post("/teaching/getList", this.requestObj).then((res) => {
        if (res.code == 0) {
          this.templibDatas = res.data;
          res.data.list.forEach((item) => {
            // grade map值
            this.infos[2].category.forEach((m_item) => {
              if (m_item.mark == item.grade) {
                item.grade = m_item.label;
              }
            });
            // semester map值
            this.infos[3].category.forEach((m_item) => {
              if (m_item.mark == item.semester) {
                item.semester = m_item.label;
              }
            });

            // source  map值
            item.source =
              (item.source == 1 && "系统") ||
              (item.source == 2 && "手动") ||
              "未知";
          });

          this.tableData = res.data.list;
        }
      });
    },
    reformVal(val, infos) {
      // 三个必传字段
      let tempSave = { _from: "", category: "", paper_range: "" };
      // 根据val对象,找到对应的attr 和 传参value
      Object.keys(val).forEach((key) => {
        //题库类型  :   校本题库

        infos.forEach((itemsub, i) => {
          if (itemsub.title == key) {
            itemsub.category.forEach((item, i) => {
              if (item.label == val[key]) {
                tempSave[itemsub.attr] = item.mark;
              }
            });
          }
        });
      });

      // console.log("tempSave", tempSave);
      return tempSave;
    },

    // 预览
    handlePreview(index, rowData) {
      // console.log(index, "&", rowData);
      // this.$router.push()
      this.$router.push({
        name: "coursePreviewLink",
        params: { courseData: rowData },
      });
    },
    // 编辑
    handleEdit(index, rowData) {
      // console.log(index, "&", rowData);
      this.$router.push({
        name: "courseEditLink",
        params: { courseData: rowData },
      });
    },
    // 删除
    handleDelete(index, rowData) {
      this.tempIndex = index;
      this.tempRowData = rowData;
      console.log(rowData);
      this.dialogVisible = true;
    },
    // 开始教学
    handleStartTeach(index, rowData) {},

    // dialog 确定
    confirmDialog() {
      // 请求网络
      $axios
        .post("/teaching/deleteTeach", { teach_id: this.tempRowData.id })
        .then((res) => {
          if (res.code == 0) {
            this.dialogVisible = false;

            //改变样式
            this.tableData.splice(this.tempIndex, 1);
          }
        });
    },
  },
  components: {
    mCascader,
  },
  created() {
    let resDate = {};
    // 请求数据
    $axios.post("/teaching/getList", this.requestObj).then((res) => {
      this.templibDatas = res.data;
      if (res.code == 0) {
        // console.log("res", res);
        res.data.list.forEach((item) => {
          // grade map值
          this.infos[2].category.forEach((m_item) => {
            if (m_item.mark == item.grade) {
              item.grade = m_item.label;
            }
          });
          // semester map值
          this.infos[3].category.forEach((m_item) => {
            if (m_item.mark == item.semester) {
              item.semester = m_item.label;
            }
          });

          // source  map值
          item.source =
            (item.source == 1 && "系统") ||
            (item.source == 2 && "手动") ||
            "未知";
        });

        this.tableData = res.data.list;
        // console.log(this.tableData);
      }
    });
  },
  computed: {
    allNum: function () {
      return (this.templibDatas.total && this.templibDatas.total) || 0;
    },
    currentP: function () {
      return (this.templibDatas.page && this.templibDatas.page) || 0;
    },
  },
};
</script>
<style lang="scss" >
.show_list {
  .el-table th > .cell {
    padding: 0;
    // margin-left: 2.75rem;
  }
  .el-table .cell {
    padding: 0;
  }

  .el-table th > .cell {
    // margin-left: 1.75rem;
  }
  .el-checkbox__inner {
    width: 1rem;
    height: 1rem;
  }

  .el-checkbox {
    padding-left: 2.75rem;
  }
  .el-table-column--selection .cell {
    padding: 0;
  }
  .el-table tr th:nth-child(2) > .cell {
    padding-left: 1.75rem;
  }
  .el-table tr td:nth-child(2) > .cell {
    padding-left: 2.5rem;
  }

  // 课件名称
  .el-table tr th:nth-child(3) > .cell {
    padding-left: 12.0625rem;
  }

  .el-table tr td:nth-child(3) > .cell {
    position: relative;
    padding-left: 4.8125rem;
    z-index: 1111;
  }

  .el-table tr td:nth-child(3) > div {
    width: 22.25rem;
  }
  .el-table tr td:nth-child(3) {
    text-align: center;
  }

  // 课件类型
  .el-table tr th:nth-child(4) > .cell {
    padding-left: 14.5625rem;
  }

  .el-table tr td:nth-child(4) {
    // padding-left: 9.0625rem;
    // 居右对齐
    text-align: right;
  }
  // .el-table tr td:nth-child(4) > .cell {
  //   padding-left: 14.5625rem;
  // }
  // 教材
  .el-table tr th:nth-child(5) > .cell {
    padding-left: 8.9375rem;
  }

  .el-table tr td:nth-child(5) {
    text-align: right;
  }

  // 年级
  .el-table tr th:nth-child(6) > .cell {
    padding-left: 9.8125rem;
  }
  .el-table tr td:nth-child(6) {
    text-align: right;
  }
  // 学期
  .el-table tr th:nth-child(7) > .cell {
    padding-left: 9.6875rem;
  }
  .el-table tr td:nth-child(7) {
    text-align: right;
  }
  // 来源
  .el-table tr th:nth-child(8) > .cell {
    padding-left: 9.9375rem;
  }
  .el-table tr td:nth-child(8) {
    text-align: right;
  }
  .el-table tr td:nth-child(8) > div {
    width: 11.6875rem !important;
  }
  // 操作
  .el-table tr th:nth-child(9) > .cell {
    padding-left: 8rem;
  }
  // .el-table tr td:nth-child(9) {
  //   text-align: right;
  // }
}

// 操作
.course_list {
  .el-table tr th > div {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }
  .list_operation {
    // padding-left: 6.25rem;
    margin-left: 4.25rem;
    width: 10.8125rem;
    justify-content: space-between;
  }
  .preview {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("../../../assets/imgs/courseList/preview.png");
    background-size: 1.5rem 1.5rem;
    background-repeat: no-repeat;
  }
  .preview:hover {
    background-image: url("../../../assets/imgs/courseList/previewhover.png");
  }
  .edit {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("../../../assets/imgs/courseList/edit.png");
    background-size: 1.5rem 1.5rem;
    background-repeat: no-repeat;
  }
  .edit:hover {
    background-image: url("../../../assets/imgs/courseList/edithover.png");
  }
  .delete {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("../../../assets/imgs/courseList/delete.png");
    background-size: 1.5rem 1.5rem;
    background-repeat: no-repeat;
  }
  .delete:hover {
    background-image: url("../../../assets/imgs/courseList/deletehover.png");
  }
  .start_teach {
    width: 1.9375rem;
    height: 1.625rem;
    border-radius: 0.25rem;
    background: #409eff url(../../../assets/imgs/courseList/startteach.png)
      center;
    background-size: 1.5rem;
    background-repeat: no-repeat;

    // i {
    //   background-image: url("../../../assets/imgs/courseList/startteach.png");
    //   background-size: 1.5rem 1.5rem;
    //   background-repeat: no-repeat;
    // }
  }
}
</style>