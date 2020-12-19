<template>
  <div class="music-radio-container">
    <div class="title-music-box" v-if="questiontypeList.answer.background_file">
      <audio-part
        id="title-music"
        class="audio-part"
        :audioUrl="questiontypeList.answer.background_file"
      ></audio-part>
    </div>
    <div class="music-radio-box">
      <div
        class="single-option"
        v-for="(item, i) in questiontypeList.answer.options"
        :key="i"
      >
        <span class="options">{{ options[i] }}.</span>
        <span class="options-text" v-if="item.text">{{ item.text }}</span>
        <div class="optionsAudioBox">
          <div class="options-audio-box" v-if="item.audio">
            <audio-part
              v-if="item.audio"
              id="title-music"
              class="audio-part"
              :audioUrl="questiontypeList.answer.background_file"
            ></audio-part>
          </div>
        </div>
        <div class="options-img-box" v-if="item.image">
          <div
            class="options-img"
            :style="{ backgroundImage: 'url(' + item.image + ')' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import audioPart from '../../MakeTestquestion/components/audioPart'
export default {
  name: 'musicRadio',
  data() {
    return {
      options: ['A', 'B', 'C', 'D', 'E'],
    }
  },
  props: {
    questiontypeList: {
      type: Object,
    },
  },
  components: {
    audioPart,
  },
}
</script>

<style lang="scss" scoped>
.music-radio-container {
  .title-music-box {
    overflow: hidden;
    width: 19.75rem;
    height: 1.75rem;
    background: #ffffff;
    border-radius: 0.375rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 0 auto 1.25rem;
    .audio-part {
      margin-top: 0;
    }
  }
  .music-radio-box {
    margin: auto;
    width: 44.375rem;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto 0.625rem;
    .single-option {
      width: 21.875rem;
      margin-bottom: 0.625rem;
      .options {
        font-size: 0.875rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #64666a;
      }
      .options-text {
        margin-left: 0.3125rem;
        font-size: 0.875rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #64666a;
      }
      .optionsAudioBox {
        padding-left: 1.4375rem;
        .options-audio-box {
          transform: translateY(-25px);
          overflow: hidden;
          width: 19.75rem;
          height: 1.75rem;
          background: #ffffff;
          border-radius: 0.375rem;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          .audio-part {
            margin-top: 0;
          }
        }
      }

      .options-img-box {
        padding-left: 23px;
        .options-img {
          transform: translateY(-25px);
          width: 15.125rem;
          height: 9.5rem;
          border: 1px solid #ebeef5;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
    }
  }
}
</style>
