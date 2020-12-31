<template>
  <div class="option-components-container">
    <div class="rightBox">
      <div class="rightBoxItem" v-for="(item, i) in singleChoiceList" :key="i">
        <div class="rightBox-header">
          <span
            v-if="
              radioDefault === '单项选择题' || radioDefault === '多项选择题'
            "
            >{{ optionsList[i].options }}.</span
          >
          <span v-else>{{ optionsList[i].options1 }}.</span>
          <el-input
            class="elInput"
            type="text"
            placeholder="请输入题目内容"
            v-model="item.op_text"
          />
          <i class="el-icon-delete" @click="removeAnswer(i)"></i>
        </div>
        <div class="rightBox-body">
          <el-button
            v-if="changeRadioVal === '音乐'"
            type="primary"
            @click="elButtonClick(item, i)"
            >图片/音频</el-button
          >
          <el-button v-else type="primary" @click="elButtonClick(item, i)"
            >上传图片</el-button
          >
          <el-radio-group
            v-model="radio"
            @change="singleSelectionChange"
            v-if="radioDefault !== '连线题' && radioDefault !== '多项选择题'"
          >
            <el-radio :label="i" :key="item.content">{{
              item.checked
            }}</el-radio>
          </el-radio-group>
          <!-- 111   item.content-->
          <el-checkbox-group
            v-model="multipleRadio"
            v-if="radioDefault == '多项选择题'"
            @change="multipleSelectionChanges"
          >
            <el-checkbox :label="i" :key="item.content">{{
              item.checked
            }}</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="rightBox-footer">
          <audio-part
            v-if="item.audioState === 'mp3' || item.audioState === 'wav'"
            :id="'transferAudio' + i"
            :audioUrl="item.op_file"
          ></audio-part>
          <div v-else class="imgShow">
            <img :src="item.imgfile" alt="" />
          </div>
        </div>
      </div>
    </div>
    <input
      type="file"
      ref="file"
      hidden
      @change="fileChange($event)"
      v-if="changeRadioVal === '音乐'"
      accept="image/png,image/jpeg,audio/mpeg,.wav,image/gif"
    />
    <input
      type="file"
      ref="file"
      hidden
      @change="fileChange"
      v-else
      accept="image/png,image/jpeg,image/gif"
    />
    <div class="footerBox">
      <div class="boxLeft">
        <el-button type="primary" @click="addAnswer">新增答案选项</el-button>
        <span class="span" v-if="radioDefault === '连线题'">最多五个选项</span>
      </div>
      <div class="boxRight">
        <span v-if="changeRadioVal === '音乐'"
          >可以点击图片/音频上传答案元素，图片尺寸不超过260*158px,图片格式支持jpg、png&nbsp;
        </span>
        <span v-else
          >可以点击上传图片上传答案元素，图片尺寸不超过260*158px,图片格式支持jpg、png&nbsp;
        </span>
        <span class="spanItemer">查看图例</span>
      </div>
    </div>
  </div>
</template>

<script>
import audioPart from './audioPart'
export default {
  name: 'optionComponents',
  data() {
    return {
      chooseindex: null,
      radio: 0,
      multipleRadio: [0],
      optionsList: [
        { options: 'A', options1: '1' },
        { options: 'B', options1: '2' },
        { options: 'C', options1: '3' },
        { options: 'D', options1: '4' },
        { options: 'E', options1: '5' },
      ],
    }
  },
  watch: {
    changeRadioVal() {
      this.clearData()
      this.$store.commit('makeTestquestion/set_singleSelectionVal', null)
      this.$store.commit('makeTestquestion/set_multipleSelectionVal', [])
    },
    radioDefault() {
      this.clearData()
      this.$store.commit('makeTestquestion/set_singleSelectionVal', null)
      this.$store.commit('makeTestquestion/set_multipleSelectionVal', [])
    },
  },
  props: {
    singleChoiceList: {
      type: Array,
    },
    // 类型选择值
    changeRadioVal: {
      type: String,
    },
    // 试题list
    testQuestionlists: {
      type: Object,
    },
    // 题型选择值
    radioDefault: {
      type: String,
    },
  },
  components: {
    audioPart,
  },
  methods: {
    // 清空数据
    clearData() {
      this.chooseindex = null
      this.radio = 0
      this.multipleRadio = [0]
      this.singleChoiceList.forEach((element) => {
        element.op_text = ''
        element.op_file = ''
        element.audioState = ''
        element.imgfile = ''
      })
    },
    // 单选
    singleSelectionChange(val) {
      console.log(val)
      this.$store.commit('makeTestquestion/set_singleSelectionVal', val)
    },
    // 多选
    multipleSelectionChanges(val) {
      console.log(val)
      console.log(this.multipleRadio)
      this.$store.commit('makeTestquestion/set_multipleSelectionVal', val)
    },
    addAnswer() {
      let num = this.singleChoiceList.length
      console.log(num)
      let num1 = this.singleChoiceList[num - 1].content
      let obj = {
        // 选项
        checked: '设置为正确答案',
        content: num1 + 1,
        op_text: '',
        op_file: '',
        audioState: '',
        imgfile: '',
      }
      if (num >= 5) {
        this.$message.error('最多添加5个选项')
      } else {
        console.log(obj)
        this.singleChoiceList.push(obj)
      }
    },
    removeAnswer(i) {
      this.singleChoiceList.splice(i, 1)
      this.radio = ''
      this.multipleRadio = []
      this.$store.commit('makeTestquestion/set_singleSelectionVal', null)
      this.$store.commit('makeTestquestion/set_multipleSelectionVal', [])
    },
    // 上传文件变化时
    fileChange() {
      const localFile = this.$refs.file.files[0]
      var paths = this.$refs.file.value //源文件路径
      // console.log(paths)
      console.log(localFile)

      const reader = new FileReader() // 创建读取文件对象
      reader.readAsDataURL(localFile) // 发起异步请求，读取文件
      const that = this
      reader.onload = function() {
        // 文件读取完成后
        // 读取完成后，将结果赋值给img的src
        // console.log(this.result)

        that.singleChoiceList[that.chooseindex].imgfile = this.result
      }
      // var reader = new FileReader()
      // reader.readAsDataURL(localFile)
      // var url = ''
      // reader.onload = function() {
      //   console.log(reader.result) //获取到base64格式图片
      //   url = reader.result
      // }
      // this.singleChoiceList[this.chooseindex].imgfile = paths

      const formData = new window.FormData()
      formData.append('file_name', localFile)
      this.$http.post('/makeExercises/uploadFile', formData).then((res) => {
        if (res || res.code == 0) {
          // console.log(res.data.file_path)
          this.singleChoiceList[this.chooseindex].op_file = res.data.file_path
          var stringlength = res.data.file_path.length
          var newstring = res.data.file_path.substring(
            stringlength - 3,
            stringlength
          )
          this.singleChoiceList[this.chooseindex].audioState = newstring
        }
      })
    },
    elButtonClick(item, i) {
      this.$refs.file.click()
      console.log(item, i)
      this.chooseindex = i
    },
  },
  mounted() {
    // console.log(this.testQuestionlists)
  },
}
</script>

<style lang="scss">
.option-components-container {
  position: relative;

  .leftTitle {
    position: absolute;
    left: 0;
    top: 13px;
  }
  .rightBox {
    display: flex;
    flex-wrap: wrap;
    margin-left: 56px;
    overflow: hidden;
    .rightBoxItem {
      width: 360px;
      margin-right: 16px;
      .rightBox-header {
        display: flex;
        span {
          width: 11px;
          height: 10px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #409eff;
          line-height: 41px;
          margin-right: 12px;
        }
        .el-input {
          width: 316px;
          height: 32px;
          background: #ffffff;
          border-radius: 6px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
          margin-right: 5px;
          .el-input__inner {
            width: 316px;
            height: 32px;
          }
        }

        i {
          width: 16px;
          height: 16px;
          font-size: 16px;
          color: #c0c4cc;
          margin-top: 8px;
        }
        i:hover {
          color: #f56c6c;
        }
      }
      .rightBox-body {
        position: relative;
        left: 25px;
        width: 316px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .el-button {
          width: 104px;
          height: 32px;
          border-radius: 6px;
          padding: 7px 20px;
        }
      }
      .rightBox-footer {
        .audio-part-wrap {
          margin-left: 25px;
        }
        .imgShow {
          max-width: 260px;
          max-height: 158px;
          margin: 0 0 10px 24px;
          img {
            margin-top: 15px;
            max-height: 138px;
            max-width: 260px;
          }
        }
      }
    }
  }
  .footerBox {
    padding: 0 115px 0 80px;
    display: flex;
    justify-content: space-between;
    .boxLeft {
      .el-button {
        width: 104px;
        height: 32px;
        border-radius: 6px;
        padding: 7px 4px;
      }
      .span {
        margin-left: 11px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
    }
    .boxRight {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
      .spanItemer {
        color: #409eff;
      }
    }
  }
}
</style>
