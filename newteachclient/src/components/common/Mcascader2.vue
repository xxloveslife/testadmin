<template>
  <div class="m_cascader">
    <!-- top_row -->
    <div class="wrap_flex top_row">
      <div class="search wrap_flex">
        <input type="text" v-model="input" placeholder="请输入关键词和ID" />

        <button>搜索</button>
      </div>
      <!-- cascader_result & reset button -->
      <div class="wrap_flex top_row_rt">
        <span class="span1">默认选择全部/已选择我的</span>
        <span class="span2">重置筛选</span>
      </div>
    </div>
    <!-- second_row -->
    <div class="second_row">
      <el-radio-group class="m_radio_group" v-model="radio" @change="changeVal">
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
    <div class="third_row">
      <el-radio-group v-model="third_radio_default" @change="changeCate">
        <el-radio-button class="_all" label="全部">全部</el-radio-button>

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
    <div class="m_slot"></div>
  </div>
</template>

<script>
export default {
  props: {
    infos: {
      type: Array,
    },
    // radio 父组件给的值,绑定radio group v-model  , 当前默认被选中   ,监听radio的值,发生变化下级类目发生变化
    radio: {
      type: String,
    },
  },
  data() {
    return {
      // 当前radio是父级传进来的,第一个选项,拿到该选项所在位置的category

      // third_row list
      third_radio: [],
      c_radio: this.radio,
      third_radio_default: "全部",
    };
  },
  watch: {
    c_radio: function (newV, oldV) {
      //   发生变化了,更新third_row的内容对象
      //  利用newV 找到,新的内容
      this.infos.forEach((item, i) => {
        // console.log(oldV);
        if (this.infos) {
          if (item.title == newV) {
            this.third_radio = this.infos[i].category;
          }
        }

        // console.log(this.third_radio);
      });
    },
  },

  methods: {
    changeVal() {
      //change的时候给c_radio
      // console.log("radio", this.radio);
      this.c_radio = this.radio;
      //   console.log("c_radio", this.c_radio);
    },
    changeCate(val) {
      // console.log("cate", val);
    },
    getCurrentCate(radio) {
      //'题库'
      if (this.infos) {
        this.infos.forEach((item, i) => {
          if (item.title === radio) {
            // console.log("index", this.infos[i].category);
            this.third_radio = this.infos[i].category;
          }
        });
      }
      // console.log(this.third_radio);
    },
  },
  mounted() {
    this.getCurrentCate(this.radio);
  },
};
</script>
<style lang="scss" >
@import "../../style/variable.scss";
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

      font-size: 0.875rem;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #c0c4cc;
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
  margin-top: 1.125rem;
  .m_radio_group {
    display: flex;
    .m_radio {
      flex: 1;
      .el-radio-button__inner {
        width: 100%;
        height: 2.8125rem;
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
  margin-top: 18px;
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;

    span {
      width: 6.25rem;
      height: 2rem;
      line-height: 8px;
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
</style>