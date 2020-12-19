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
              <i class="el-icon-check" v-if="item.state"></i>
            </span>
            <span
              class="cascaderItemTxt"
              @click="clickCascaderHeaderItem(item, i)"
              >{{ item.name }}</span
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
                :class="
                  item.state === 0 ? 'cascaderBodyTop' : 'cascaderBodyTop1'
                "
                v-for="(item, i) in secondKnowledgeList"
                :key="i"
              >
                <span @click="secondBoxClick(item, i)">{{ item.name }}</span>
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
                      v-for="(item2, index2) in item1.child"
                      :key="index2"
                    >
                      <span
                        :class="item2.state === 0 ? '' : 'blue'"
                        @click="thirdBoxClick(item2, index2)"
                        >{{ item2.name }}</span
                      >
                      <i class="el-icon-check" v-if="item2.state === 1"></i>
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

      // 选择数据数组
      checked_cid: [],
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
  watch: {
    changeRadioVal() {
      this.removeFilter()
    },
    radioDefault() {
      this.removeFilter()
    },
  },
  methods: {
    clickCascaderHeaderItem(item, i) {
      console.log(item.child)
      this.secondKnowledgeList = item.child
      this.flag = i
      var arr = []
      item.child.forEach((ele) => {
        arr.push(ele.child.length)
      })
      arr.sort(function(a, b) {
        return a - b
      })
      this.heightLength = arr[arr.length - 1]
    },
    iconBoxClick(item, i) {
      // console.log(item)
      // 点击全选添加数据
      if (item.state) {
        item.state = 0
        // 删除checked_cid数组中多个元素
        var arr = []
        arr.push(item.cid)
        item.child.forEach((element) => {
          element.state = 0
          arr.push(element.cid)
          element.child.forEach((ele) => {
            ele.state = 0
            arr.push(ele.cid)
          })
        })
        // this.newArr(arr)
        // console.log(arr.join(','))
        this.removeArrayElements(this.checked_cid, arr.join(','))
        // console.log(this.checked_cid)
      } else {
        item.state = 1
        this.checked_cid.push(item.cid)
        item.child.forEach((element) => {
          element.state = 1
          this.checked_cid.push(element.cid)
          element.child.forEach((ele) => {
            ele.state = 1
            this.checked_cid.push(ele.cid)
          })
        })
        this.newArr(this.checked_cid)
        console.log(this.checked_cid)
      }
    },
    secondBoxClick(item, i) {
      // console.log(item, i)
      if (item.state) {
        item.state = 0
        var arr = []
        arr.push(item.cid)
        item.child.forEach((element) => {
          // console.log(element.name)
          element.state = 0
          arr.push(element.cid)
        })
        // this.newArr(arr)
        // console.log(arr.join(','))
        this.removeArrayElements(this.checked_cid, arr.join(','))
        // console.log(this.checked_cid)
      } else {
        item.state = 1
        this.checked_cid.push(item.cid)
        item.child.forEach((element) => {
          // console.log(element.name)
          element.state = 1
          this.checked_cid.push(element.cid)
        })
        this.newArr(this.checked_cid)
        console.log(this.checked_cid)
      }
      this.invertedSelectionMethod(item.cid)
    },
    thirdBoxClick(item, i) {
      // console.log(item, i)
      if (item.state) {
        // console.log(item.name)
        item.state = 0
        this.removeArrayElements(this.checked_cid, item.name)
        // console.log(this.checked_cid)
      } else {
        item.state = 1
        this.checked_cid.push(item.cid)
        this.newArr(this.checked_cid)
        // console.log(this.checked_cid)
      }

      this.invertedSelectionMethod(item.cid)
    },
    // 反选方法
    invertedSelectionMethod(value) {
      // console.log(value)
      this.knowledgeList.forEach((element, i, arr) => {
        // console.log(arr, i)
        // console.log(element, 1, i)
        var flag = true
        if (element.state === 1) {
          // console.log(element)
          element.child.forEach((ele, idx) => {
            // console.log(ele)
            if (ele.state === 0) {
              return (flag = false)
            }
            ele.child.forEach((ele1, index) => {
              if (ele1.state === 0) {
                return (flag = false)
              }
            })
          })
          // console.log(flag)
          if (!flag) {
            element.state = 0
            flag = true
          } else {
            element.state = 1
            flag = false
          }
        } else {
          // console.log(element, i, 13333)
          // console.log(value)
          // console.log(element, '11111sss')
          var nameArr = []

          element.child.forEach((ele, idx, arr) => {
            // console.log(ele)
            if (ele.cid === value) {
              // console.log(ele)
              // console.log(arr)
              nameArr = arr
            } else {
              // console.log(ele)
              ele.child.forEach((element1, index1, arr1) => {
                // console.log(element1)
                if (element1.cid === value) {
                  nameArr = arr1
                }
              })
              var secendFlog = false
              if (nameArr !== [] && ele.child === nameArr) {
                // console.log(ele)
                nameArr = ele
                ele.child.forEach((ele2) => {
                  // console.log(ele2.name)
                  if (ele2.state === 1) {
                    secendFlog = true
                  }
                })
                // console.log(secendFlog)
                if (!secendFlog) {
                  ele.state = 0
                  secendFlog = true
                } else {
                  ele.state = 1
                  secendFlog = false
                }
              }
              // console.log(nameArr)
              if (nameArr !== [] && ele.name === nameArr.name) {
                // console.log(element)
                nameArr = element
              }
            }
          })
          // console.log(nameArr)
          if (
            (nameArr !== [] && element.child === nameArr) ||
            nameArr.name === element.name
          ) {
            // console.log(element)
            var flag1 = true
            element.child.forEach((ele3, idx) => {
              // console.log(ele.state)
              if (ele3.state === 0) {
                flag1 = false
              }
              // console.log(ele3)
              ele3.child.forEach((ele7) => {
                // console.log(ele7.state)
                if (ele7.state === 0) {
                  flag1 = false
                }
              })
            })
            // console.log(flag1)
            if (!flag1) {
              element.state = 0
              flag1 = true
            } else {
              element.state = 1
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
    confirmButton() {
      console.log(this.checked_cid)
      this.$store.commit('makeTestquestion/set_checked_cid', this.checked_cid)
    },
    removeFilter() {
      // 清空数组
      this.checked_cid = []
      this.secondKnowledgeList = []
      this.flag = null
      this.heightLength = 0
      // 遍历一级数组，所有的勾选为0
      this.knowledgeList.forEach((element) => {
        element.state = 0
        element.child.forEach((ele) => {
          ele.state = 0
          ele.child.forEach((ele1) => {
            ele1.state = 0
          })
        })
      })
      // 若已经点了确定，清空对象里这个数组
      this.$store.commit('makeTestquestion/set_checked_cid', [])
    },
  },
  computed: {
    scrollerHeight() {
      const num = this.heightLength ? 1 : 0
      return `${num ? 30 * this.heightLength + 90 : 0}` + 'px'
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
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }

  .cascader {
    display: inline-block;
    position: relative;
    width: 85.5rem;
    height: 32px;
    background: #ffffff;
    border-radius: 6px;
    margin-left: 61px;
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
      max-width: 1368px;

      border-radius: 6px;
      .cascaderBodyCander {
        width: 1368px;
      }
      .cascaderBodyHeader {
        height: 35px;
        max-width: 85.5rem;
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
        width: 1368px;
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
      border-radius: 6px;
    }
  }
}
</style>
