<template>
  <!-- dashboard -->

  <div class="dashboard">
    <!-- dashboard 上面内容 -->
    <div class="dash_t_pad">
      <!-- dashboard 左上内容 -->
      <div class="dash_lf_t_pad">
        <el-row
          class="cus_elrow"
          type="flex"
          align="top"
          v-for="(item, i) in items"
          :key="i"
        >
          <el-col :span="24"
            ><div class="showInfo">
              <span class="baseinfo">授课学生</span>
              <div class="row_rt">
                <span class="des">几个</span>
                <i class="arrow">箭头</i>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- dashboard 右上内容 -->
      <div class="dash_rt_t_pad">
        <el-row class="first_row diff_first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>

        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
        <el-row class="first_row">
          <el-col :span="24"
            ><div class="shortcuts">
              <span>name</span>
              <i>arrow</i>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <!-- dashboard 下面内容 -->
    <div class="dash_d_pad">dash下内容</div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
</style>