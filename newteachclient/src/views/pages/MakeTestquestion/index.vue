<template>
  <div class="makeTestquestion-header">
    <multiple-choice :list="list" :radio="list[0].name"></multiple-choice>
  </div>
</template>

<script>
import multipleChoice from './components/multipleChoice'
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: '音乐',
          questionType: [
            {
              questionTypeName: '单项选择题',
            },
            { questionTypeName: '多项选择题' },
            { questionTypeName: '判断题' },
            { questionTypeName: '连线题' },
          ],
        },
        {
          id: 2,
          name: '美术',
          questionType: [
            { questionTypeName: '单项选择题' },
            { questionTypeName: '多项选择题' },
            { questionTypeName: '判断题' },
            { questionTypeName: '连线题' },
            { questionTypeName: '表现题' },
          ],
        },
      ],
    }
  },
  components: {
    multipleChoice,
  },
}
</script>

<style>
.makeTestquestion-header {
  height: 2000px;
}
</style>
