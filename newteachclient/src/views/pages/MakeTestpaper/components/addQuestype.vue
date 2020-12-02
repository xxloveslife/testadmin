<template>
  <div class="questType">
    <div class="wrap_flex_normal">
      <span class="title_style">音乐题型:</span>
      <div class="addOne">
        <!-- title -->
        <div class="c_title wrap_flex_normal">
          <span class="span11">题型</span>
          <span>数量</span>
          <span>分值</span>
          <span>合计</span>
          <span class="span5">操作</span>
        </div>
        <!-- 选择框 第一个下拉-->
        <div class="second_row">
          <div class="m_dropdown">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <!-- 添加按钮 -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.questType {
  .title_style {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }
  .addOne {
    width: 97.5rem;
    height: 8.875rem;
    background-color: #ffffff;
    margin-left: 0.6875rem;

    .c_title {
      align-items: center;
      border-bottom: 1px solid #eaeef9;
      height: 2.0625rem;
      span {
        margin-left: 20.5625rem;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      .span11 {
        margin-left: 12.5625rem;
        // vertical-align: baseline;
      }
      .span5 {
        margin-left: 11.8125rem;
      }
    }
  }
  .second_row {
    margin-top: 1rem;
  }
}
// .el-dropdown-link {
//   cursor: pointer;
//   color: #409eff;
// }
// .el-icon-arrow-down {
//   font-size: 12px;
//   // color: red;
// }

.m_dropdown {
  width: 18.75rem;
  height: 2rem;
  border-radius: 0.375rem;
  border: 1px solid #dcdfe6;
  margin-left: 3.9375rem;
  .el-dropdown {
    width: 18.75rem;
    height: 2rem;
    display: flex;
    align-items: center;
    span {
      margin-left: 0.75rem;

      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }
    i {
      margin-left: 13rem;
    }
  }

  .el-icon-arrow-down:before {
    color: gray;
  }
}
</style>