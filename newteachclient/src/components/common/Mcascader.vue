<template>
  <div class="m_cascader">
    <!-- top_row -->
    <div class="wrap_flex top_row">
      <div class="search wrap_flex">
        <input
          type="text"
          v-model="searchInput"
          placeholder="请输入关键词和ID"
        />

        <button @click="searchButtons">搜索</button>
      </div>
      <!-- cascader_result & reset button -->
      <div class="wrap_flex top_row_rt">
        <span class="span1">{{ default_select }}</span>
        <span class="span2" @click="resetSelect">重置筛选</span>
      </div>
    </div>
    <!-- second_row -->
    <div class="second_row no_copy">
      <el-radio-group
        class="m_radio_group"
        v-model="second_radio_default"
        @change="changeCate"
      >
        <el-radio-button
          class="m_radio"
          v-for="(item, i) in infos"
          :key="i"
          :label="item.title"
          >{{ item.title }}</el-radio-button
        >
      </el-radio-group>
    </div>

    <!-- third_row -->
    <div class="third_row no_copy">
      <el-radio-group v-model="third_radio_default" @change="changeSubCate">
        <!-- <el-radio-button class="_all" label="全部">全部</el-radio-button> -->

        <el-radio-button
          v-for="(item, i) in third_radio"
          :key="i"
          :label="item"
        >
          {{ item }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- slot  -->
    <slot></slot>
    <!-- Pagination  -->
    <div class="m_pagination wrap_flex_allcenter">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getTestLibraryCategory } from '../../api/testLibrary'
export default {
  props: {
    infos: {
      type: Array,
    },
    // radio 父组件给的值,绑定radio group v-model  , 当前默认被选中的值   ,监听radio的值,发生变化下级类目发生变化
    radio: {
      type: String,
    },

    // 分页
    pageSize: {
      type: Number,
    },
    totalNum: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  data() {
    return {
      // 当前radio是父级传进来的,第一个选项,拿到该选项所在位置的category

      // third_row list  label 集合
      third_radio: [],

      //current Radio   label
      c_radio: '',
      second_radio_default: '',
      //current SubRadio label
      third_radio_default: '全部',
      //默认选择全部

      //后台接口必传字段,题库,类别,教材,默认选择全部
      m_select: {},

      default_select: '默认选择全部',

      // 搜索框
      searchInput: '',

      // 当前所在位置
      m_val: '全部',
    }
  },
  watch: {
    c_radio: function(newV, oldV) {
      //   发生变化了,更新third_row的内容对象
      //  利用newV 找到,新的内容
      this.infos.forEach((item, i) => {
        if (this.infos) {
          if (item.title == newV) {
            const savelabel = []
            // 全都剃出来
            this.infos[i].category.forEach((item, i) => {
              savelabel.push(item.label)
            })
            this.third_radio = savelabel
          }
        }
      })
    },
  },

  methods: {
    // 第一层的单项回调
    changeCate(val) {
      //change的时候给c_radio
      this.c_radio = val
    },
    // 第二层的单选回调
    changeSubCate(val) {
      //当变化时设置subCate的label到m_select里面  ,
      this.m_val = val
      this.m_select[this.c_radio] = this.m_val
      // 修改已选择的详细显示
      this.changeMyselecting()

      // 切换的时候改回分页
      this.m_select.currentPage = 1

      //通知父组件发送请求
      this.$emit('getItemfromCondition', this.m_select)

      // 父组件判断如果是题库里面子内容,调整star 和shared 的展示
      this.$emit('changeOperationStyle', this.m_val, this.c_radio)
    },
    //修改右上角选择样式
    changeMyselecting() {
      //拼接m_select里面的值, 更换 default_select,
      let selectedInfos = []
      this.infos.forEach((item, i) => {
        if (
          this.m_select[item.title] === '' ||
          this.m_select[item.title] === '全部'
        ) {
          // 等于空字符串,或者全部,就不push,不加顿号
          return
        }
        selectedInfos.push(this.m_select[item.title])
      })

      const str_selected = selectedInfos.join('、')
      // console.log(str_selected);
      this.default_select = '已选择 ' + str_selected
    },
    getCurrentCate(radio) {
      //'题库'
      if (this.infos) {
        this.infos.forEach((item, i) => {
          if (item.title === radio) {
            // console.log("index", this.infos[i].category);
            this.third_radio = this.infos[i].category
          }
        })
      }
    },

    // 分页methods

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);

      this.m_select.currentPage = val

      // console.log("fenye ", this.m_select);

      // 通知父组件
      this.$emit('getItemfromCondition', this.m_select)
    },
    //重置选择
    resetSelect() {
      // this.default_select = "默认选择全部";
      // this.second_radio_default = this.radio;
      // this.third_radio_default = "全部";

      // this.c_radio = this.radio;

      // // 清空
      // this.selectedInfos = [];
      // //通知父组件发送请求
      // this.$emit("resetSelect");

      location.reload()
    },

    // 搜索框搜索
    searchButtons() {
      this.m_select.keyword = this.searchInput
      // 通知父组件
      this.$emit('getItemfromCondition', this.m_select)
    },
  },
  mounted() {
    this.second_radio_default = this.radio
    this.c_radio = this.radio
    //设置v-model的第一个默认值
    this.getCurrentCate(this.radio)

    // infos 设置m_selectd的key值;
    if (this.infos) {
      this.infos.forEach((item, i) => {
        // infos当前title作key值
        this.m_select[item.title && item.title] = ''
      })
    }
    // console.log("my_", this.m_select);
  },
  created() {
    this.m_select.currentPage = 1
    // console.log("fenyeinfos", this.pageSize, this.totalNum, this.currentPage);

    // 重新加载的时候也通知一次 ,当前currentLib为全部
    this.$emit('changeOperationStyle', this.m_val)
  },
}
</script>
<style lang="scss">
@import '../../style/variable.scss';
.top_row {
  width: 100%;
  height: 2rem;
  .search {
    width: 23.375rem;
    input {
      width: 16.25rem;
      text-indent: 1.6875rem;
      border-radius: 0.25rem;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框

      &::placeholder {
        font-size: 0.875rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #c0c4cc;
      }
    }
    button {
      width: 6.25rem;
      //   background-color: $sky-blue;
      background-color: #409eff;
      border-radius: 0.1875rem;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      font-size: 0.875rem;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.top_row_rt {
  margin-right: 1.0625rem;
  .span1 {
    font-size: 0.875rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #909399;
    margin-right: 1rem;
  }
  .span2 {
    cursor: pointer;
    font-size: 0.875rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #409eff;
  }
}

// .second_row {
//   width: 100%;
//   height: 2.8125rem;
//   border-radius: 0.25rem;
//   margin-top: 1.125rem;
//   background-color: $white;

//   .category:focus {
//     background-color: $sky-blue;
//     outline: none;
//     border-radius: 0.25rem;
//   }
//   div {
//     flex: 1;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     // background-color: blue;
//     span {
//       font-size: 0.875rem;
//       font-family: Microsoft YaHei;
//       font-weight: bold;
//       color: #303133;
//     }
//   }
// }

// .third_row {
//   margin-top: 1.125rem;
//   height: 2rem;

//   & > div {
//     width: 6.25rem;
//     border-radius: 0.25rem;
//     background-color: $white;
//   }
//   & > div:focus {
//     @extend %div-focus-one;
//   }
// }
.second_row {
  // -moz-user-select: none; /* Firefox私有属性 */
  // -webkit-user-select: none; /* WebKit内核私有属性 */
  // -ms-user-select: none; /* IE私有属性(IE10及以后) */
  // -khtml-user-select: none; /* KHTML内核私有属性 */
  // -o-user-select: none; /* Opera私有属性 */
  // user-select: none; /* CSS3属性 */
  margin-top: 1.125rem;
  .m_radio_group {
    display: flex;
    .m_radio {
      flex: 1;
      .el-radio-button__inner {
        width: 100%;
        height: 2.8125rem;

        font-size: 0.875rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
    }
    .is-active {
      span {
        font-size: 0.875rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff !important;
      }
    }
  }
}
.m_radio_group {
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: $sky-blue;
  }
}
.third_row {
  margin-top: 1.125rem;
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;

    .el-radio-button__inner {
      border-radius: 0.375rem;
    }

    span {
      width: 6.25rem;
      height: 2rem;
      line-height: 0.5rem;
      border-radius: 0.25rem;
      border: none;
      margin-right: 0.9375rem;
      margin-bottom: 1.125rem;
    }
    // span:nth-child(1) {
    //   margin-left: 0px;
    // }
  }
  ._all {
    .el-radio-button__inner {
      margin-left: 0;
    }
  }
}
.m_slot {
  height: 12.4375rem;
  background-color: olive;
}
.m_pagination {
  background: #ffffff;
  // border-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  // width: 105.25rem;
  height: 2.75rem;
}

.m_cascader {
  .second_row .m_radio_group .m_radio .el-radio-button__inner:hover {
    color: #409eff;
  }
}
</style>
