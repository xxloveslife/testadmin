<template>
  <div class="course_list">
    <m-cascader>
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
          <el-table-column prop="name" label="课件名称" width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="课件类型"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="适用年级"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="address" label="来源" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="address" label="教材" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="address" label="年级" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="address" label="学期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="address" label="来源" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </m-cascader>
  </div>
</template>

<script>
import mCascader from "../../../components/common/Mcascader";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  components: {
    mCascader,
  },
};
</script>
<style lang="scss" >
.show_list {
  .el-table th > .cell {
    padding: 0;
    // margin-left: 2.75rem;
  }

  .el-table th > .cell {
    // margin-left: 1.75rem;
  }
  .el-checkbox__inner {
    width: 1rem;
    height: 1rem;
  }
  .el-table th {
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
}
</style>