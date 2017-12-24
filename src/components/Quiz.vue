<template>
  <b-container class="quiz text-left">
    <h2>Quiz</h2>
    <div class="loading" v-if="status === 'loading'">
      Loading...
    </div>
    <div id="error" class="error" v-if="status === 'error'">
      Error!
    </div>
    <p>Mode:{{ mode }} Status:{{ status }}</p>
    <b-form v-if="status === 'done' && quiz">
      <b-form-row v-if="['show', 'update'].includes(mode)">
        <b-col sm="2">
          <label class="mr-sm-2" for="question">ID</label>
        </b-col>
        <b-col sm="10">
          <span v-text="quiz._id"></span>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col sm="2">
          <label class="mr-sm-2" for="question">問題</label>
        </b-col>
        <b-col sm="10">
          <span v-show="mode === 'show'"
            v-text="quiz.question"
            class="pre-wrap" />
          <b-form-textarea v-show="['add', 'update'].includes(mode)"
            id="question"
            rows="5"
            v-model="quiz.question"
          />
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col sm="2">
          <label class="mr-sm-2" for="standard_answer">標準正解</label>
        </b-col>
        <b-col sm="4">
          <span v-show="mode === 'show'" v-text="quiz.standard_answer" />
          <b-form-input v-show="['add', 'update'].includes(mode)"
            id="standard_answer"
            v-model="quiz.standard_answer" />
        </b-col>
        <b-col sm="2">
          <label class="mr-sm-2" for="standard_answer">かな</label>
        </b-col>
        <b-col sm="4">
          <span v-show="mode === 'show'" v-text="quiz.standard_answer_kana" />
          <b-form-input v-show="['add', 'update'].includes(mode)"
            id="standard_answer_kana"
            v-model="quiz.standard_answer_kana" />
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col sm="2">
          <label class="mr-sm-2">正解例</label>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col sm="10">
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col sm="2">
          <label class="mr-sm-2" for="node">備考</label>
        </b-col>
        <b-col sm="10">
          <span v-show="mode === 'show'"
            v-text="quiz.note" class="pre-wrap" />
          <b-form-textarea v-show="['add', 'update'].includes(mode)"
            id="note"
            rows="5"
            v-model="quiz.note"
          />
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col sm="2">
          <label class="mr-sm-2" for="node">タグ</label>
        </b-col>
        <b-col sm="10">
          <span v-show="mode === 'show'"
            v-text="quiz.tags" class="pre-wrap" />
          <b-form-input v-show="['add', 'update'].includes(mode)"
            id="tags"
            v-model="quiz.tags" />
        </b-col>
      </b-form-row>
    </b-form>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'
// import MongoDB from '@/models/MongoDB'
import Quiz from '@/models/Quiz'

export default {
  name: 'Quiz',
  computed: {
    ...mapGetters('quiz', {
      status: 'status',
      mode: 'mode',
      quiz: 'quiz'
    })
  },
  beforeRouteEnter (route, redirect, next) {
    console.log(`[router]beforeEnter to=${route.name}`)
    const id = route.params.id || null
    if (!id) {
      store.commit('quiz/setMode', 'add')
      return next()
    }
    store.commit('quiz/setMode', 'show')
    store.commit('quiz/setStatus', 'loading')
    const task = () => {
      console.log(`getQuiz _id=${id}`)
      const quiz = Quiz.findOne({_id: id})
        .then(result => {
          if (!result) {
            store.commit('quiz/setStatus', 'error')
            store.commit('quiz/setQuiz', null)
          } else {
            store.commit('quiz/setStatus', 'done')
            store.commit('quiz/setQuiz', quiz)
          }
        })
    }
    next(vm => {
      console.log(vm)
      task()
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log(`[vue]beforeRouteUpdate to=${to.name}`)
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log(`[vue]beforeRouteUpdate to=${to.name}`)
    next()
  },
  data () {
    return {
      store
    }
  },
  created: () => {
    console.log(`[vue]created`)
  },
  methods: {
    ...mapActions('quiz', {
    })
  }
}
</script>
<style lang="scss">
.quiz {
  padding-left: 2rem;
  padding-right: 2rem;
  .form-row {
    border-bottom: 1px solid #e0e0e0;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    margin-bottom: 0.2rem;
  }
}
.error {
  color: red
}
</style>
