<template>
  <div class="knowledge-related-container">
    <div class="leftTitle">知识相关 :</div>
    <div class="rightBoxs">
      <div class="cascader">
        <ul class="cascaderHeader">
          <li
            class="cascaderHeaderItem"
            :class="{ chooseCascaderHeaderItem: flag === i }"
            v-for="(item, i) in knowledgeList"
            :key="i"
          >
            <span class="iconBox" @click="iconBoxClick(item, i)">
              <i class="el-icon-check" v-if="item.a"></i>
            </span>
            <span
              class="cascaderItemTxt"
              @click="clickCascaderHeaderItem(item, i)"
              >{{ item.parents }}</span
            >
          </li>
        </ul>
      </div>
      <div class="positionRight">
        <el-button type="primary" class="primary" @click="confirmButton"
          >确定</el-button
        >
        <el-button type="text" @click="removeFilter">重置筛选</el-button>
      </div>
      <div class="cascaderBodyBox" :style="{ height: scrollerHeight }">
        <div class="cascaderBody">
          <div class="cascaderBodyCander">
            <ul class="cascaderBodyHeader">
              <li
                :class="item.a === 0 ? 'cascaderBodyTop' : 'cascaderBodyTop1'"
                v-for="(item, i) in secondKnowledgeList"
                :key="i"
              >
                <span @click="secondBoxClick(item, i)">{{ item.parents }}</span>
              </li>
              <div class="cascaderBodyBt ">
                <div
                  class="cascaderfooterBody"
                  v-for="(item1, index) in secondKnowledgeList"
                  :key="index"
                >
                  <ul class="cascaderfooterBodyItem">
                    <li
                      class="cascaderfooterBodyItemList"
                      v-for="(item2, index2) in item1.children"
                      :key="index2"
                    >
                      <span
                        :class="item2.a === 0 ? '' : 'blue'"
                        @click="thirdBoxClick(item2, index2)"
                        >{{ item2.parents }}</span
                      >
                      <i class="el-icon-check" v-if="item2.a === 1"></i>
                    </li>
                  </ul>
                  <div class="borderBox">
                    <span></span>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'knowledgeRelated',
  data() {
    return {
      // 第一级全选
      chooseCascaderHeaderItem: 'chooseCascaderHeaderItem',
      flag: null,
      cascaderHeaderRadio: false,
      value: [],
      // 二级数据
      secondKnowledgeList: [],
      prop: {
        expandTrigger: 'click',
        multiple: true,
        emitPath: false,
        value: 'parents',
        label: 'parents',
        children: 'children',
      },
      // 选择数据数组
      iconBoxchooseList: [],
      heightLength: 0,
    }
  },
  props: {
    // 类型选择值
    changeRadioVal: {
      type: String,
    },
    // 题型选择值
    radioDefault: {
      type: String,
    },
    // 试题list
    testQuestionlists: {
      type: Object,
    },
    // 一级数据
    knowledgeList: {
      type: Array,
    },
  },
  methods: {
    clickCascaderHeaderItem(item, i) {
      console.log(item.children)
      this.secondKnowledgeList = item.children
      this.flag = i
      var arr = []
      item.children.forEach((ele) => {
        arr.push(ele.children.length)
      })
      arr.sort(function(a, b) {
        return a - b
      })
      this.heightLength = arr[arr.length - 1]
    },
    iconBoxClick(item, i) {
      // console.log(item)
      // 点击全选添加数据
      if (item.a) {
        item.a = 0
        // 删除iconBoxchooseList数组中多个元素
        var arr = []
        item.children.forEach((element) => {
          element.a = 0
          element.children.forEach((ele) => {
            ele.a = 0
            arr.push(ele.parents)
          })
        })
        // this.newArr(arr)
        // console.log(arr.join(','))
        this.removeArrayElements(this.iconBoxchooseList, arr.join(','))
        // console.log(this.iconBoxchooseList)
      } else {
        item.a = 1
        item.children.forEach((element) => {
          element.a = 1
          element.children.forEach((ele) => {
            ele.a = 1
            this.iconBoxchooseList.push(ele.parents)
          })
        })
        this.newArr(this.iconBoxchooseList)
        // console.log(this.iconBoxchooseList)
      }
    },
    secondBoxClick(item, i) {
      // console.log(item, i)
      if (item.a) {
        item.a = 0
        var arr = []
        item.children.forEach((element) => {
          // console.log(element.parents)
          element.a = 0
          arr.push(element.parents)
        })
        // this.newArr(arr)
        // console.log(arr.join(','))
        this.removeArrayElements(this.iconBoxchooseList, arr.join(','))
        // console.log(this.iconBoxchooseList)
      } else {
        item.a = 1
        item.children.forEach((element) => {
          // console.log(element.parents)
          element.a = 1
          this.iconBoxchooseList.push(element.parents)
        })
        this.newArr(this.iconBoxchooseList)
        // console.log(this.iconBoxchooseList)
      }
      this.invertedSelectionMethod(item.parents)
    },
    thirdBoxClick(item, i) {
      // console.log(item, i)
      if (item.a) {
        // console.log(item.parents)
        item.a = 0
        this.removeArrayElements(this.iconBoxchooseList, item.parents)
        // console.log(this.iconBoxchooseList)
      } else {
        item.a = 1
        this.iconBoxchooseList.push(item.parents)
        this.newArr(this.iconBoxchooseList)
        // console.log(this.iconBoxchooseList)
      }

      this.invertedSelectionMethod(item.parents)
    },
    // 反选方法
    invertedSelectionMethod(value) {
      // console.log(value)
      this.knowledgeList.forEach((element, i, arr) => {
        // console.log(arr, i)
        // console.log(element, 1, i)
        var flag = true
        if (element.a === 1) {
          // console.log(element)
          element.children.forEach((ele, idx) => {
            // console.log(ele)
            if (ele.a === 0) {
              return (flag = false)
            }
            ele.children.forEach((ele1, index) => {
              if (ele1.a === 0) {
                return (flag = false)
              }
            })
          })
          // console.log(flag)
          if (!flag) {
            element.a = 0
            flag = true
          } else {
            element.a = 1
            flag = false
          }
        } else {
          // console.log(element, i, 13333)
          // console.log(value)
          // console.log(element, '11111sss')
          var parentsArr = []

          element.children.forEach((ele, idx, arr) => {
            // console.log(ele)
            if (ele.parents === value) {
              // console.log(ele)
              // console.log(arr)
              parentsArr = arr
            } else {
              // console.log(ele)
              ele.children.forEach((element1, index1, arr1) => {
                // console.log(element1)
                if (element1.parents === value) {
                  parentsArr = arr1
                }
              })
              var secendFlog = false
              if (parentsArr !== [] && ele.children === parentsArr) {
                // console.log(ele)
                parentsArr = ele
                ele.children.forEach((ele2) => {
                  // console.log(ele2.parents)
                  if (ele2.a === 1) {
                    secendFlog = true
                  }
                })
                // console.log(secendFlog)
                if (!secendFlog) {
                  ele.a = 0
                  secendFlog = true
                } else {
                  ele.a = 1
                  secendFlog = false
                }
              }
              // console.log(parentsArr)
              if (parentsArr !== [] && ele.parents === parentsArr.parents) {
                // console.log(element)
                parentsArr = element
              }
            }
          })
          // console.log(parentsArr)
          if (
            (parentsArr !== [] && element.children === parentsArr) ||
            parentsArr.parents === element.parents
          ) {
            // console.log(element)
            var flag1 = true
            element.children.forEach((ele3, idx) => {
              // console.log(ele.a)
              if (ele3.a === 0) {
                flag1 = false
              }
              // console.log(ele3)
              ele3.children.forEach((ele7) => {
                // console.log(ele7.a)
                if (ele7.a === 0) {
                  flag1 = false
                }
              })
            })
            // console.log(flag1)
            if (!flag1) {
              element.a = 0
              flag1 = true
            } else {
              element.a = 1
              flag1 = false
            }
          }
        }
      })
    },

    // 去重
    newArr(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) {
            //如果第一个等于第二个，splice方法删除第二个
            arr.splice(j, 1)
            j--
          }
        }
      }
      return arr
    },
    // 删除数组中的多个元素
    removeArrayElements(originalArr, elements) {
      if (Object.prototype.toString.call(originalArr) != '[object Array]') {
        throw 'originalArr is not Array'
      }
      var ele
      var excludeElementsArr = elements ? elements.split(',') : []
      for (var i = originalArr.length - 1; i >= 0; i--) {
        ele = originalArr[i] + ''
        if (excludeElementsArr.indexOf(ele) > -1) {
          originalArr.splice(i, 1)
        }
      }
      return originalArr
    },
    // 点击确定将选择的数组存入对象中
    confirmButton() {},
    removeFilter() {
      // 清空数组
      this.iconBoxchooseList = []
      this.secondKnowledgeList = []
      this.flag = null
      this.heightLength = 0
      // 遍历一级数组，所有的勾选为0
      this.knowledgeList.forEach((element) => {
        element.a = 0
        element.children.forEach((ele) => {
          ele.a = 0
          ele.children.forEach((ele1) => {
            ele1.a = 0
          })
        })
      })
      // 若已经点了确定，清空对象里这个数组
    },
  },
  computed: {
    scrollerHeight() {
      console.log(this.heightLength ? 1 : 0)
      return (
        40 * (this.heightLength + Number(`${this.heightLength ? 1 : 0}`)) + 'px'
      )
    },
  },
}
</script>

<style lang="scss">
.knowledge-related-container {
  position: relative;
  .leftTitle {
    position: absolute;
    left: 0;
    top: 20px;
  }

  .cascader {
    display: inline-block;
    position: relative;
    width: 1358px;
    height: 32px;
    background: #ffffff;
    border-radius: 6px;
    margin-left: 56px;
    margin-top: 15px;
    margin-right: 10px;
  }
  .cascaderHeader {
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
    .cascaderHeaderItem {
      height: 100%;
      line-height: 32px;
      text-align: center;
      flex: 1;
      border-radius: 6px;
      .iconBox {
        margin-top: 8px;
        display: inline-block;
        margin-right: 7px;
        width: 16px;
        height: 16px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        i {
          float: left;
          top: -8px;
          color: #409eff;
        }
      }
      .cascaderItemTxt {
        position: relative;
        top: -5px;
      }
    }
    .chooseCascaderHeaderItem {
      background: #409eff;
      color: #ffffff;
      .iconBox {
        .el-icon-check {
          color: #ffffff;
        }
      }
    }
  }
  .cascaderBodyBox {
    .cascaderBody {
      position: relative;
      margin-left: 62px;
      margin-top: 11px;
      max-width: 1358px;

      border-radius: 6px;
      .cascaderBodyCander {
        width: 1358px;
      }
      .cascaderBodyHeader {
        height: 35px;
        max-width: 1358px;
        display: flex;
        text-align: center;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        .cascadermax {
          max-width: 1920px;
        }
        .cascaderBodyTop {
          background: #ffffff;
          max-width: 298px;
          height: 35px;
          border-bottom: 1px solid #eaeef9;
          line-height: 35px;
          height: 100%;
          flex: 1;
          font-size: 14px;
        }
        .cascaderBodyTop1 {
          background: #ffffff;
          max-width: 298px;
          height: 35px;
          border-bottom: 1px solid #eaeef9;
          line-height: 35px;
          height: 100%;
          flex: 1;
          font-size: 14px;
          color: #409eff;
        }
      }
      .cascaderBodyBt {
        width: 1358px;
        position: absolute;
        margin-top: 36px;
        display: flex;
        border-radius: 6px;
        .cascaderfooterBody {
          position: relative;
          flex: 1;
          padding-bottom: 30px;
          max-width: 298px;
          background: #ffffff;
          .cascaderfooterBodyItemList {
            margin-top: 12px;
            position: relative;
            i {
              position: absolute;
              right: 60px;
              font-size: 14px;
              color: #409eff;
            }
            .blue {
              color: #409eff;
            }
          }
          .borderBox {
            position: absolute;
            right: 0;
            top: 0;
            padding: 5px 0;
            height: 100%;
            span {
              display: inline-block;
              background-color: #eaeef9;
              height: 100%;
              width: 1px;
            }
          }
        }
        .cascaderfooterBody:last-child {
          .borderBox {
            span {
              width: 0;
            }
          }
        }
      }
    }
  }
  .positionRight {
    display: inline-block;
    position: relative;
    top: -5px;
    .primary {
      width: 75px;
      height: 32px;
      line-height: 7px;
      background: #409eff;
      border-radius: 6px;
    }
  }
}
</style>
