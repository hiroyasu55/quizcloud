<template>
  <b-container class="quiz text-left">
    mode = {{mode}}
    <b-form v-if="quiz !== null">
      <b-form-row v-show="quiz.key && quiz.key.length > 0">
        <b-col sm="2">
          <label class="mr-sm-2" for="question">KEY</label>
        </b-col>
        <b-col sm="10">
          <span v-text="quiz.key"></span>
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
          <b-form-textarea v-show="mode === 'add' || mode === 'update'"
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
          <b-form-input v-show="mode === 'add' || mode === 'update'"
            id="standard_answer"
            v-model="quiz.standard_answer" />
        </b-col>
        <b-col sm="2">
          <label class="mr-sm-2" for="standard_answer">かな</label>
        </b-col>
        <b-col sm="4">
          <span v-show="mode === 'show'" v-text="quiz.standard_answer_kana" />
          <b-form-input v-show="mode === 'add' || mode === 'update'"
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
          <b-form-textarea v-show="mode === 'add' || mode === 'update'"
            id="note"
            rows="5"
            v-model="quiz.note"
          />
        </b-col>
      </b-form-row>
    </b-form>
  </b-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import store from '@/store/quiz'
import { getQuiz } from '@/store/quiz/actions'
import * as types from '@/store/quiz/mutation-types'

export default {
  props: {
    _key: {
      type: String,
      default: ''
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('to ' + to)
    this.fetchItems(to.params.key)
    next()
  },
  computed: {
    ...mapGetters({
      quiz: 'quiz',
      mode: 'mode'
    })
  },
  data () {
    return {
      store
    }
  },
  created: () => {
    // key: '6WW7qzBirlju1N8F5EF1',
    getQuiz(store, '5PaVwm1ElcMhPRJxCoXk')
    /*
        store.commit('setQuiz', quiz)
        store.commit('setMode', 'show')
      },
      error: (err) => {
        console.error(err)
        store.commit('setMessage', 'ERROR')
      }
    */
  },
  methods: {
    ...mapMutations([
      types.SET_QUIZ,
      types.SET_MODE
    ]),
    fetchItems (key) {
      console.log(key)
    }
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
</style>
