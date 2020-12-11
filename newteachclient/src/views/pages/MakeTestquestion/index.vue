<template>
  <div class="makeTestquestion-header">
    <multiple-choice :list="list" :radioItem="list[0].name"></multiple-choice>
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
            { question_type: 1, questionTypeName: '单项选择题' },
            { question_type: 2, questionTypeName: '多项选择题' },
            { question_type: 10, questionTypeName: '判断题' },
            { question_type: 11, questionTypeName: '连线题' },
          ],
        },
        {
          id: 2,
          name: '美术',
          questionType: [
            { question_type: 1, questionTypeName: '单项选择题' },
            { question_type: 2, questionTypeName: '多项选择题' },
            { question_type: 3, questionTypeName: '判断题' },
            { question_type: 4, questionTypeName: '连线题' },
            { question_type: 5, questionTypeName: '表现题' },
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

<style></style>
