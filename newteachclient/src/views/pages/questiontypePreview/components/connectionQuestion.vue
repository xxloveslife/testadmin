<template>
  <div class="connection-question-container">
    <div
      class="connection-question-box"
      v-for="(item, i) in questionAnalyzeList.content[0]"
      :key="i"
    >
      <div class="connection-question-left">
        <div class="connection-question-leftbox">
          <div class="box-imgbox">
            <div v-if="item.audio" class="box-audiobox">
              <audio-partitem
                class="audio-part"
                :id="'box-audiopartleft' + i"
                :audioUrl="item.audio"
              ></audio-partitem>
            </div>
            <div v-if="item.text" class="box-textbox">{{ item.text }}</div>
            <div
              v-if="item.image"
              class="box-imagebox"
              :style="{
                backgroundImage: 'url(' + item.image + ')',
              }"
            ></div>
          </div>
          <img
            v-if="i === 0"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/one.png"
            alt=""
          />
          <img
            v-if="i === 1"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/two.png"
            alt=""
          />
          <img
            v-if="i === 2"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/three.png"
            alt=""
          />
          <img
            v-if="i === 3"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/four.png"
            alt=""
          />
          <img
            v-if="i === 4"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/five.png"
            alt=""
          />
        </div>
      </div>
      <div class="connection-question-right">
        <div class="connection-question-rightbox">
          <img
            v-if="i === 0"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/one.png"
            alt=""
          />
          <img
            v-if="i === 1"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/two.png"
            alt=""
          />
          <img
            v-if="i === 2"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/three.png"
            alt=""
          />
          <img
            v-if="i === 3"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/four.png"
            alt=""
          />
          <img
            v-if="i === 4"
            class="connection-question-img"
            src="@/assets/imgs/testquestlibrary/five.png"
            alt=""
          />
          <div class="box-imgbox">
            <div
              v-if="questionAnalyzeList.content[1][i].audio"
              class="box-audiobox"
            >
              <audio-partitem
                class="audio-part"
                :id="'box-audiopart' + i"
                :audioUrl="questionAnalyzeList.content[1][i].audio"
              ></audio-partitem>
            </div>
            <div
              class="box-textbox"
              v-if="questionAnalyzeList.content[1][i].text"
            >
              {{ questionAnalyzeList.content[1][i].text
              }}{{ questionAnalyzeList.cate_name.length }}
            </div>
            <div
              v-if="questionAnalyzeList.content[1][i].image"
              class="box-imagebox"
              :style="{
                backgroundImage:
                  'url(' + questionAnalyzeList.content[1][i].image + ')',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import audioPartitem from './audioPartitem'
export default {
  name: 'connectionQuestion',
  data() {
    return {}
  },
  props: {
    questionAnalyzeList: {
      type: Object,
    },
  },
  components: { audioPartitem },
}
</script>

<style lang="scss" scoped>
.connection-question-container {
  .connection-question-box {
    width: 900px;
    margin: auto;
    display: flex;
    .connection-question-left {
      width: 350px;
      margin-right: 300px;
      .connection-question-leftbox {
        position: relative;
        margin-bottom: 20px;
        .box-imgbox {
          overflow: hidden;
          width: 242px;
          height: 152px;
          border: 1px solid #ebeef5;
          .box-audiobox {
            width: 100%;
            position: relative;
            top: 54px;
          }
          .box-imagebox {
            height: 100%;
            width: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
          .box-textbox {
            position: relative;
            top: 64px;
            text-align: center;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333032;
          }
        }
        .connection-question-img {
          position: absolute;
          right: 0;
          top: 64px;
          height: 26px;
          width: 26px;
        }
      }
    }
    .connection-question-right {
      width: 350px;
      .connection-question-rightbox {
        position: relative;
        margin-bottom: 20px;
        .connection-question-img {
          position: absolute;
          left: 0;
          top: 64px;
          height: 26px;
          width: 26px;
        }
        .box-imgbox {
          overflow: hidden;
          width: 242px;
          height: 152px;
          margin-left: 59px;
          border: 1px solid #ebeef5;
          .box-audiobox {
            width: 100%;
            position: relative;
            top: 54px;
          }
          .box-imagebox {
            height: 100%;
            width: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
          .box-textbox {
            position: relative;
            top: 64px;
            text-align: center;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333032;
          }
        }
      }
    }
  }
}
</style>
