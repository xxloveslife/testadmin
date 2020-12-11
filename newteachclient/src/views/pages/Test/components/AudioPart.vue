<template>
  <div class="audio-part-wrap">
    <div class="audio-content">
      <audio :src="audioUrl" :id="id" @timeupdate="timeUpdate" controls></audio>
      <div class="audio-div">
        <div class="play-btn">
          <!-- 开始暂停控件 -->
          <img
            src="@/assets/imgs/audioPart/Start.png"
            @click.stop="playClick"
            title="开始"
            v-show="!isPlayFlag"
            style="cursor: pointer;"
          />
          <img
            src="@/assets/imgs/audioPart/pause.png"
            @click.stop="pauseClick"
            title="暂停"
            v-show="isPlayFlag"
            style="cursor: pointer;"
          />
        </div>
        <div class="play-progress">
          <div class="time-slider">
            <el-slider
              v-model="playProcess"
              @change="changePlayProcess"
              :tooltipVisible="false"
            />
          </div>
          <div class="time-info">
            <span class="current-time">{{ currentTime }}</span>
            <!-- <span class="total-time">{{ duration }}</span> -->
          </div>
        </div>
        <!-- <div class="play-volume"> -->
        <!-- <div class="volume-icon-item">
            <img
              src="@/assets/imgs/computer.png"
              v-show="isVolumeFlag"
              @click.stop="volumeClick"
            />
            <img
              src="@/assets/imgs/computer.png"
              v-show="!isVolumeFlag"
              @click.stop="volumeClick"
            />
          </div> -->
        <!-- <div class="volume-slider">
            <el-slider
              vertical
              v-model="volumeSize"
              @change="changeVolumeSize"
              :tooltipVisible="false"
            />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AudioPart',
  components: {},
  props: {
    id: String,
    audioUrl: String,
  },
  data() {
    return {
      audioDom: null,
      currentTime: '00:00',
      duration: 0,
      isVolumeFlag: true,
      playProcess: 0, // 播放进度
      volumeSize: 0, // 音量大小
      volumeHistory: 0, // 记录音量
      isPlayFlag: false,
    }
  },
  computed: {},
  mounted() {
    let that = this
    setTimeout(() => {
      that.initAudio()
    }, 1000)
  },
  watch: {
    audioUrl(newValue, oldValue) {
      let that = this
      setTimeout(() => {
        that.initAudio()
      }, 1000)
    },
  },
  methods: {
    // 初始化音频
    initAudio() {
      const self = this
      this.audioDom = document.getElementById(this.id)
      this.audioDom.loop = false // 循环播放false
      // 有时音频会特别大，所以等音频都加载完了以后，再赋值
      self.audioDom.load()
      self.audioDom.addEventListener('loadedmetadata', function() {
        console.log(self.computeTime(self.audioDom.duration))

        self.duration = self.computeTime(self.audioDom.duration) // 计算时间
        self.volumeSize = self.audioDom.volume * 100 // 音量大小
        self.volumeHistory = self.audioDom.volume * 100 // 音量大小
      })
      this.playProcess = 0
      // 监听语音已经播放完了
      this.audioDom.addEventListener(
        'ended',
        function() {
          self.pauseClick()
        },
        false
      )
    },

    timeUpdate(value) {
      this.currentTime = this.computeTime(this.audioDom.currentTime)
      // this.changeTime(this.computeTime(this.audioDom.currentTime))
      // console.log(this.computeTime(this.audioDom.currentTime))
      this.playProcess =
        (this.audioDom.currentTime / this.audioDom.duration) * 100
    },

    // 开始
    playClick() {
      this.audioDom.play()
      this.isPlayFlag = true
    },
    // 暂停
    pauseClick() {
      this.audioDom.pause()
      this.isPlayFlag = false
    },
    // 拖拉时间进度条
    changePlayProcess(value, a) {
      // debugger
      if (this.playProcess === 0) {
        this.audioDom.currentTime = 0
        this.currentTime = 0
      }
      // 如果拉到100
      if (this.playProcess < 100 && this.playProcess > 0) {
        this.audioDom.currentTime =
          (this.audioDom.duration * this.playProcess) / 100 // 音频的当前播放时间
        this.currentTime = this.computeTime(
          (this.audioDom.duration * this.playProcess) / 100
        ) // 当前播放时间
      }
      if (this.playProcess === 100) {
        console.log('低')
        this.audioDom.currentTime = this.audioDom.duration
        this.currentTime = this.duration
        console.log(this.duration)
      }
    },
    // 拖拉音量进度
    changeVolumeSize() {
      this.volumeHistory = this.volumeSize // 记录音量
      console.log(this.volumeSize)
      if (this.volumeSize === 0) {
        this.audioDom.volume = 0
        this.isVolumeFlag = false // 当音量为0时静音
      }
      if (this.volumeSize < 100 && this.volumeSize > 0) {
        this.audioDom.volume = this.volumeSize / 100
        this.isVolumeFlag = true // 当音量有时，不静音
      }
      if (this.volumeSize === 100) {
        this.audioDom.volume = 1
        this.isVolumeFlag = true // 当音量有时，不静音
      }
    },
    // 点击静音
    volumeClick() {
      this.isVolumeFlag = !this.isVolumeFlag
      if (!this.isVolumeFlag) {
        this.audioDom.volume = 0
        this.volumeSize = 0
      } else {
        this.audioDom.volume = this.volumeHistory / 100
        this.volumeSize = this.volumeHistory
      }
    },
    // 计算音频时间，转化成时分秒
    computeTime(value) {
      var timeStr = ''
      timeStr =
        //   Math.floor(value / 3600) > 9
        //     ? Math.floor(value / 3600)
        //     : '0' + Math.floor(value / 3600)
        // timeStr +=
        //   ':' +
        Math.floor((value % 3600) / 60) > 9
          ? Math.floor((value % 3600) / 60)
          : '0' + Math.floor((value % 3600) / 60)
      timeStr +=
        ':' +
        (Math.floor(((value % 3600) % 60) / 1) > 9
          ? Math.floor(((value % 3600) % 60) / 1)
          : '0' + Math.floor(((value % 3600) % 60) / 1))
      return timeStr
    },
  },
  beforeDestroy() {
    // this.pauseClick();
  },
  destroyed() {},
}
</script>
<style lang="less">
.audio-part-wrap {
  margin-top: 8px;
  width: 316px;
  height: 28px;
  background: #ffffff;
  border-radius: 6px;
  .audio-content {
    height: 32px;
    audio {
      display: none;
    }
    .audio-div {
      width: inherit;
      height: inherit;
      .play-btn {
        float: left;
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        i {
          margin-top: 6px;
        }
        img {
          height: 12px;
          width: 12px;
          position: relative;
          left: 7px;
          top: -3px;
        }
      }
      .play-progress {
        float: left;
        // width: 630px;
        width: 92%;
        margin-right: 10px;
        margin-left: 10px;
        .time-info {
          font-size: 12px;
          color: #242a30;
          // .current-time {
          // }
          .current-time {
            font-size: 10px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #909399;
            position: relative;
            top: -62px;
            left: 265px;
          }
        }
        // .time-slider {
        //   margin-top: 11px;
        //   .ant-slider {
        //     margin: 0;
        //     .ant-slider-rail {
        //       background-color: #dfe0e1;
        //       height: 6px;
        //     }
        //     .ant-slider-track {
        //       height: 6px;
        //       background-color: #67c23a;
        //     }
        //     .ant-slider-step {
        //       height: 6px;
        //     }
        //     .ant-slider-handle {
        //       height: 16px;
        //       width: 16px;
        //       border: solid 2px #dddfe1;
        //     }
        //   }
        // }
      }
      .play-volume {
        float: left;
        position: relative;
        cursor: pointer;
        width: 19px;
        height: 17px;
        margin-top: 7px;
        .volume-icon-item {
          height: 17px;
          width: 19px;
          & > img {
            float: left;
          }
          // & > svg {
          //   margin-top: 6px;
          // }
          &:hover {
            + div.volume-div-item {
              display: block;
            }
          }
        }
        .volume-slider {
          top: -80px;
          position: absolute;
          left: 0px;
          width: 20px;
          padding-left: 2px;
          display: none;
          height: 83px;
          // .ant-slider {
          //   margin: 0;
          //   height: 70px;
          //   .ant-slider-rail {
          //     background-color: #dfe0e1;
          //   }
          //   .ant-slider-track {
          //     background-color: #3293f0;
          //   }
          // }
        }
        &:hover {
          .volume-slider {
            display: block;
          }
        }
        .volume-div-item {
          // display: none;
          position: absolute;
          height: 105px;
          width: 20px;
          border: 1px solid #e8e8e8;
          border-radius: 5px;
          top: -110px;
          background: #e8e8e8;
          padding: 5px 6px 10px 6px;
          transform: rotateX(180deg);
          &:hover {
            display: block;
          }
        }
      }
    }
  }
}
.audio-part-wrap {
  .time-slider {
    .el-slider {
      position: relative;
      top: -35px;
      left: 16px;
      .el-slider__runway {
        width: 243px;
        height: 2px;
        background: #ebeef5;
        .el-slider__button-wrapper {
          height: 2px;
          width: 2px;
          top: -4px;
        }
      }
      .el-slider__bar {
        width: 243px;
        height: 2px;
        background: #e6a23c;
      }
      .el-slider__button {
        width: 5px;
        height: 5px;

        border: 2px solid #e6a23c;
        border-radius: 50%;
        position: relative;
        top: -3px;
      }
    }
  }
  .volume-slider {
    // top: -70px;
    // position: absolute;
    // left: 0px;
    // width: 20px;
    // padding-left: 2px;
    .ant-slider {
      margin: 0;
      height: 70px;
      .ant-slider-rail {
        background-color: #dfe0e1;
      }
      .ant-slider-track {
        background-color: #3293f0;
      }
      .ant-slider-handle {
        width: 10px;
        height: 10px;
        margin-left: -3px;
        background-color: rgb(50, 147, 240);
        border: 0;
        -webkit-box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.2);
        box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.2);
      }
    }
  }
}
</style>
