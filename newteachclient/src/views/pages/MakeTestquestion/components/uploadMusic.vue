<template>
  <div class="upload-music-container">
    <div class="leftTitle">音乐文件 :</div>
    <div class="rightBox">
      <avatar-uploader
        v-show="!musicUrl"
        class="avatar-uploader"
        id="music"
        :text="text"
        @getMusicUrl="getMusicUrl"
      ></avatar-uploader>
      <div class="audio-part-show" v-if="musicUrl">
        <audio-part
          class="audio-part"
          id="transferAudiopart"
          :audioUrl="musicUrl"
        ></audio-part>
        <i class="el-icon-delete" @click="messageBoxStatus = true"></i>
      </div>
      <span>根据题目需求上传乐曲文件</span>
    </div>
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
import audioPart from './audioPart'
import messageBox from './messageBox'

export default {
  name: 'uploadMusic',
  data() {
    return {
      showMessageBoxText: '文件',
      messageBoxStatus: false,
      text: '上传文件',
      musicUrl: null,
      answer: {},
    }
  },
  props: {
    // 试题list,给后台
    testQuestionlists: {
      type: Object,
    },
  },
  methods: {
    getMusicUrl(val) {
      console.log(val)
      this.musicUrl = val
      this.testQuestionlists.background_file_url = val
    },
    closeMessage() {
      this.musicUrl = null
      this.testQuestionlists.background_file_url = null
      this.messageBoxStatus = false
    },
    removeMessage() {
      this.musicUrl = null
      this.testQuestionlists.background_file_url = null
      document
        .getElementById('music')
        .querySelector('.boxBox')
        .click()
      this.messageBoxStatus = false
    },
  },
  components: {
    avatarUploader,
    audioPart,
    messageBox,
  },
}
</script>

<style lang="scss" scoped>
.upload-music-container {
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
    margin-left: 60px;
    margin-top: 10px;
    .audio-part-show {
      .audio-part {
        float: left;
        z-index: 999;
      }
      i {
        float: left;
        height: 28px;
        width: 28px;
        z-index: 555;
        text-align: center;
        line-height: 28px;
        margin-left: 10px;
        margin-right: 10px;
        position: relative;
        top: 5px;
      }
    }
  }
  .avatar-uploader {
    margin-right: 10px;
  }
  span {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #909399;
    position: relative;
    top: 11px;
  }
}
</style>
