<template>
  <div class="upload-image-container">
    <div class="leftTitle">{{ changeRadioVal }}图片 :</div>
    <div class="rightBox">
      <div class="rightBoxItem">
        <avatar-uploader
          v-show="changeRadioVal === '音乐' && !textList.imgText"
          class="avatar-uploader"
          id="staff"
          :text="text"
          @getImgUrl="getImgUrl"
        ></avatar-uploader>
        <!-- v-if="textList.imgText" -->
        <div
          class="textBox rightFooterBoxItem"
          v-if="changeRadioVal === '音乐' && textList.imgText"
          @click="showMessageBox(text)"
        >
          <img :src="textList.pictureEchoAddress" alt="" />
          <!-- <img src="@/assets/15555.png" alt="" /> -->
        </div>
      </div>
      <div class="rightBoxItem">
        <avatar-uploader
          @getImgUrl="getImgUrl"
          class="avatar-uploader"
          id="notation"
          :text="text1"
          v-show="changeRadioVal === '音乐' && !textList1.imgText"
        ></avatar-uploader>
        <!-- v-if="textList.imgText" -->
        <div
          class="textBox rightFooterBoxItem"
          v-if="changeRadioVal === '音乐' && textList1.imgText"
          @click="showMessageBox(text1)"
        >
          <img :src="textList1.pictureEchoAddress" alt="" />
          <!-- <img src="@/assets/15555.png" alt="" /> -->
        </div>
      </div>
      <div class="rightBoxItem">
        <avatar-uploader
          @getImgUrl="getImgUrl"
          class="avatar-uploader"
          id="images"
          :text="text2"
          v-show="changeRadioVal === '美术' && !textList2.imgText"
        ></avatar-uploader>
        <!-- v-if="textList2.imgText" -->
        <div
          class="text2Box rightFooterBoxItem"
          v-if="changeRadioVal === '美术' && textList2.imgText"
          @click="showMessageBox(text2)"
        >
          <img :src="textList2.pictureEchoAddress" alt="" />
          <!-- <img src="@/assets/15555.png" alt="" /> -->
        </div>
      </div>

      <div class="rightButtonBox">
        <el-button type="primary">查看图例</el-button>
        <span>请上传简谱图片，图片限宽670px，高度根据实际题目需要</span>
      </div>
    </div>
    <!-- 弹出框 -->
    <message-box
      class="message-box"
      :showMessageBoxText="showMessageBoxText"
      :messageBoxStatus="messageBoxStatus"
      @closeMessage="closeMessage"
      @close="messageBoxStatus = false"
      @removeMessage="removeMessage"
    ></message-box>
  </div>
</template>

<script>
import avatarUploader from './avatarUploader'
import messageBox from './messageBox'
export default {
  name: 'uploadImage',
  data() {
    return {
      showMessageBoxText: '',
      messageBoxStatus: false,
      text: '上传五线谱',
      textList: {},
      text1: '上传简谱',
      textList1: {},
      text2: '上传图片',
      textList2: {},
    }
  },
  watch: {
    changeRadioVal() {
      return (this.textList = this.textList1 = this.textList2 = {})
    },
  },
  mounted() {
    // console.log(
    //   document.getElementById('staff').querySelector('.boxBox')
    //   // .click()
    // )
  },
  methods: {
    showMessageBox(val) {
      this.messageBoxStatus = true
      if (val === this.text) {
        this.showMessageBoxText = '五线谱图片'
      } else if (val === this.text1) {
        this.showMessageBoxText = '简谱图片'
      } else {
        this.showMessageBoxText = '图片'
      }
    },
    closeMessage(val) {
      console.log(val)
      if (val === '五线谱图片') {
        this.textList = {}
        this.$store.commit('makeTestquestion/set_wx_music_pic', null)
      } else if (val === '简谱图片') {
        this.textList1 = {}
        this.$store.commit('makeTestquestion/set_jp_music_pic', null)
      } else {
        this.textList2 = {}
        this.$store.commit('makeTestquestion/set_art_pic', null)
      }
      this.messageBoxStatus = false

      // document
      //   .querySelector('.avatar-uploader')
      //   .querySelector('.boxBox')
      //   .click()
    },
    removeMessage(val) {
      console.log(val)
      if (val === '五线谱图片') {
        document
          .getElementById('staff')
          .querySelector('.boxBox')
          .click()

        this.textList = {}
      } else if (val === '简谱图片') {
        this.textList1 = {}

        document
          .getElementById('notation')
          .querySelector('.boxBox')
          .click()
      } else {
        this.textList2 = {}

        document
          .getElementById('images')
          .querySelector('.boxBox')
          .click()
      }
      this.messageBoxStatus = false
    },
    getImgUrl(val) {
      console.log(val)
      if (val.imgText === this.text) {
        this.textList = val
        this.$store.commit('makeTestquestion/set_wx_music_pic', val.imageUrl)
      } else if (val.imgText === this.text1) {
        this.textList1 = val
        this.$store.commit('makeTestquestion/set_jp_music_pic', val.imageUrl)
      } else {
        this.textList2 = val
        this.$store.commit('makeTestquestion/set_art_pic', val.imageUrl)
      }
    },
  },
  props: {
    // 题型选择值
    radioDefault: {
      type: String,
    },
    // 类型选择值
    changeRadioVal: {
      type: String,
    },
    // 试题list
    testQuestionlists: {
      type: Object,
    },
  },
  components: {
    avatarUploader,
    messageBox,
  },
}
</script>

<style lang="scss" scoped>
.upload-image-container {
  position: relative;
  .message-box {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .leftTitle {
    position: absolute;
    left: 0;
    top: 13px;
  }

  .rightBox {
    position: relative;
    margin-left: 60px;
    margin-top: 50px;

    .rightBoxItem {
      display: inline-block;
      margin-right: 15px;
      .avatar-uploader {
        float: left;
      }
      .rightFooterBoxItem:hover {
        border: 1px solid #409eff;
      }
      .rightFooterBoxItem {
        position: relative;
        height: 100px;
        width: 100px;
        float: left;
        background-color: #fff;
        img {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 100px;
          max-height: 100px;
        }
      }
    }
    .rightButtonBox {
      position: absolute;
      bottom: 0;
      display: inline-block;

      span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
      .el-button {
        margin-right: 11px;
      }
    }
  }
}
</style>
