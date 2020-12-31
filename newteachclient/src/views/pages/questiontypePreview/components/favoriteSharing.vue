<template>
  <div class="favorite-sharing-container">
    <i
      class="star"
      v-if="
        (is_sys === 1 && questiontypeList.is_mine !== '1') ||
          (is_sys === 2 && questiontypeList.is_share !== 1) ||
          is_sys === 0
      "
      @click="isfavorite()"
      :class="changeStar == questiontypeList.is_favorite ? 'changeStar' : ''"
      :title="(questiontypeList.is_favorite == 1 && '取消收藏') || '点击收藏'"
    ></i>
    <i
      class="share"
      v-if="is_sys === 1 && questiontypeList.is_share !== 2"
      @click="isshare()"
      :class="changeShare == questiontypeList.is_share ? 'changeShare' : ''"
      :title="(questiontypeList.is_share == 1 && '已分享') || '点击分享'"
    ></i>
    <i
      class="cancleshared"
      v-if="is_sys === 2 && questiontypeList.is_share === 1"
      :title="questiontypeList.is_share == 1 && '点击取消分享'"
      :class="
        changeCancleShare == questiontypeList.is_share
          ? 'changeCancleShared'
          : ''
      "
      @click="open"
    >
      <el-button type="text">
        <i class="cancleshared"></i>
      </el-button>
    </i>
  </div>
</template>

<script>
export default {
  name: 'favoriteSharing',
  data() {
    return {
      changeStar: 1,
      changeShare: 1,
      changeCancleShare: 1,
    }
  },
  props: {
    // 列表
    questiontypeList: {
      type: Object,
    },
    // 题库类型
    currentLib: {
      type: String,
    },
    is_sys: {
      type: Number,
    },
    question_index: {
      type: Number,
    },
  },
  methods: {
    isfavorite() {
      console.log(this.questiontypeList.is_favorite)
      console.log(this.questiontypeList.id)
      this.$emit('isfavorite', this.questiontypeList, this.question_index)
    },
    isshare() {
      this.$emit('isshare', this.questiontypeList, this.question_index)
    },
    open() {},
  },
}
</script>

<style lang="scss" scoped>
.favorite-sharing-container {
  display: inline-block;
  i {
    margin-left: 8px;
  }
  // 收藏
  .star {
    display: inline-block;
    // z-index: 1;
    // position: relative;
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
    background-image: url('../../../../assets/imgs/testquestlibrary/stardefault.png');
    background-size: 1.125rem;
    background-repeat: no-repeat;
  }
  .star:hover {
    background-image: url('../../../../assets/imgs/testquestlibrary/starhover.png');
  }

  .changeStar {
    background-image: url('../../../../assets/imgs/testquestlibrary/starsc.png');
    &:hover {
      background-image: url('../../../../assets/imgs/testquestlibrary/starhover.png');
    }
  }
  // 分享
  .share {
    display: inline-block;
    // z-index: 1;
    // position: relative;
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
    background-image: url('../../../../assets/imgs/testquestlibrary/sharedefault.png');
    background-size: 1.125rem;
    background-repeat: no-repeat;
  }
  .share:hover {
    background-image: url('../../../../assets/imgs/testquestlibrary/sharedhover.png');
  }

  .changeShare {
    background-image: url('../../../../assets/imgs/testquestlibrary/cancleSharedhover.png');
    &:hover {
      background-image: url('../../../../assets/imgs/testquestlibrary/cancleShareddefault.png');
    }
  }
  .cancleshared {
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
    // background-image: url("../../../assets/imgs/testquestlibrary/cancleSharedhover.png");
    // background-size: 1.125rem;
    // background-repeat: no-repeat;
    margin-left: 1.4375rem;
    .el-button--text {
      margin-top: -15px;
    }
    &:hover {
      background-image: url('../../../../assets/imgs/testquestlibrary/cancleShareddefault.png');
      background-size: 1.125rem;
      background-repeat: no-repeat;
    }
  }
  .changeCancleShared {
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
    background-image: url('../../../../assets/imgs/testquestlibrary/cancleSharedhover.png');
    background-size: 1.125rem;
    background-repeat: no-repeat;
    margin-left: 1.4375rem;
    .el-button--text {
      margin-top: -15px;
    }
    &:hover {
      background-image: url('../../../../assets/imgs/testquestlibrary/cancleShareddefault.png');
      background-size: 1.125rem;
      background-repeat: no-repeat;
    }
  }
}
</style>
