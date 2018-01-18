<template>
  <b-container fluid>
    <b-row class="justify-content-md-center">
      <b-col sm="8" class="quiz">
        <b-row>
          <span v-if="status === 'loading'" class="loading">
            Loading...
          </span>
          <span v-if="status === 'error'" class="error">
            Error occured.
          </span>
        </b-row>

        <b-form v-if="status === 'done'" id="quiz-form">
          <b-row class="buttons-row" v-if="status === 'done'">
            <b-col sm="12">
              <b-button v-if="mode === 'show'" class="float-right"
                variant="primary" @click="changeMode('update', quiz)">
                編集
              </b-button>
              <b-button v-if="mode === 'show'" class="float-right"
                variant="success" @click="changeMode('add')">
                新規
              </b-button>

              <b-button v-if="mode === 'add'" class="float-right"
                type="submit" variant="primary"
                @click="add(newQuiz)">
                登録
              </b-button>
              <b-button v-if="mode === 'update'" class="float-right"
                type="submit" variant="primary"
                @click="update(newQuiz)">
                更新
              </b-button>
              <b-button v-if="mode === 'add' || mode === 'update'"
                class="float-right"
                variant="danger" @click="abondon(mode)">
                破棄
              </b-button>
            </b-col>
          </b-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label for="question">ID</label>
            </b-col>
            <b-col sm="10">
              <span v-if="mode === 'show'" v-text="quiz.id" />
              <span v-if="['add', 'update'].includes(mode) && newQuiz"
                v-text="newQuiz.id || ''" />
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label for="question">問題</label>
            </b-col>
            <b-col sm="10">
              <span v-if="mode === 'show'"
                v-text="quiz.question"
                class="pre-wrap" />
              <b-form-textarea
                v-if="['add', 'update'].includes(mode) && newQuiz"
                id="question"
                rows="5"
                v-model="newQuiz.question"
              />
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label for="answer">正解</label>
            </b-col>
            <b-col sm="10">
              <span v-if="mode === 'show'" v-text="quiz.answer" />
              <b-form-input id="answer"
                v-if="['add', 'update'].includes(mode) && newQuiz"
                v-model="newQuiz.answer" required />
              <p class="invalid-feedback">invalid</p>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label for="answerKana">かな</label>
            </b-col>
            <b-col sm="10">
              <span v-if="mode === 'show'" v-text="quiz.answerKana" />
              <b-form-input id="answerKana"
                v-if="['add', 'update'].includes(mode) && newQuiz"
                v-model="newQuiz.answerKana" required />
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label>正解例</label>
            </b-col>
            <b-col sm="10">
              <b-form-row>
                <b-col sm="6" class="header">
                  <label>解答</label>
                </b-col>
                <b-col sm="6" class="header">
                  <label>かな</label>
                </b-col>
              </b-form-row>
              <div v-if="mode === 'show'">
                <b-form-row v-for="a in quiz.answers"
                  :key="`${quiz.id}_${a.answer}`">
                  <b-col sm="6">
                    <span v-text="a.answer" />
                  </b-col>
                  <b-col sm="6">
                    <span v-text="a.kana" />
                  </b-col>
                </b-form-row>
              </div>
              <div v-if="['add', 'update'].includes(mode) && newQuiz">
                <b-form-row v-for="a in newQuiz.answers"
                  :key="`${newQuiz.id}_${a.answer}`">
                  <b-col sm="6">
                    <b-form-input id="answers.answer"
                      v-model="a.answer" />
                  </b-col>
                  <b-col sm="6">
                    <b-form-input id="answers.kana"
                      v-model="a.kana" />
                  </b-col>
                </b-form-row>
              </div>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label class="mr-sm-2" for="node">タグ</label>
            </b-col>
            <b-col sm="10">
              <div v-if="mode === 'show'">
                <span v-for="tag in quiz.tags" :key="tag"
                  v-text="tag" class="tag" />
              </div>
              <div v-if="['add', 'update'].includes(mode) && newQuiz">
                <input-tag class="filter-tags" :tags="newQuiz.tags"></input-tag>
              </div>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label for="node">備考</label>
            </b-col>
            <b-col sm="10">
              <span v-if="mode === 'show'"
                v-text="quiz.note" class="pre-wrap" />
              <b-form-textarea
                v-if="['add', 'update'].includes(mode) && newQuiz"
                id="note"
                rows="5"
                v-model="newQuiz.note"
              />
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label for="checkStatus">状態</label>
            </b-col>
            <b-col sm="10">
              <div v-if="mode === 'show'">
                <b-badge variant="primary"
                  v-text="checkStatusText(quiz.checkStatus)" />
              </div>
              <b-form-group v-if="['add', 'update'].includes(mode) && newQuiz">
                <b-form-radio-group
                  v-model="newQuiz.checkStatus"
                  :options="checkStatusOptions"
                  plain
                  name="checkStatus" />
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label for="checkStatus">音声</label>
            </b-col>
            <b-col sm="10">
              <b-button
                variant="success"
                :disabled="!(mode === 'show' && ['stopped'].includes(speaker.status))"
                @click="speakQuestion(speaker, quiz)">
                再生
              </b-button>
              <b-button
                variant="primary"
                :disabled="!(mode === 'show' && ['running'].includes(speaker.status))"
                @click="stopSpeaker(speaker)">
                停止
              </b-button>
              <p>
                <span v-text="speaker.status" />
              </p>
            </b-col>
          </b-form-row>
        </b-form>

        <b-row>
          <b-col>
            <span v-text="message" />
            status={{status}}
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
// import router from '@/router'
import Quiz from '@/models/Quiz'
import InputTag from 'vue-input-tag'

const CHECK_STATUSES = {
  'valid': '有効',
  'draft': '下書き'
}

const validateQuiz = (quiz) => {
  if (!quiz.answer || quiz.answer.trim().length === 0) {
    alert(`Question is needed`)
    return false
  }

  return true
}

export default {
  name: 'Quiz',
  computed: {
    ...mapGetters('quiz', {
      status: 'status',
      mode: 'mode',
      quiz: 'quiz',
      newQuiz: 'newQuiz',
      speaker: 'speaker',
      message: 'message'
    }),
    checkStatusOptions () {
      return Object.keys(CHECK_STATUSES).map(value => {
        return { value: value, text: CHECK_STATUSES[value] }
      })
    }
  },
  data () {
    return {
    }
  },
  beforeRouteEnter (route, redirect, next) {
    const params = route.params || {}
    const query = route.query || {}
    let mode = query.mode || 'show'

    if (!params.id || params.id.length === 0) {
      mode = 'add'
    }
    if (mode === 'show') {
      console.log('id=' + params.id)
      if (!params.id || params.id.length === 0) {
        store.commit('quiz/setStatus', 'error')
        store.commit('quiz/setMessage', 'id not defined.')
        return next()
      }
      store.dispatch('quiz/getQuiz', params.id)
    } else if (mode === 'add') {
      store.commit('quiz/setNewQuiz', new Quiz())
      store.commit('quiz/setStatus', 'done')
    } else if (mode === 'update') {
      if (!params.id || params.id.length === 0) {
        store.commit('quiz/setStatus', 'error')
        store.commit('quiz/setMessage', 'id not defined.')
        return next()
      }
      store.dispatch('quiz/getQuiz', params.id)
    } else {
      store.commit('quiz/setStatus', 'error')
      store.commit('quiz/setMessage', `invalid mode ${mode}`)
      return next()
    }
    store.commit('quiz/setMode', mode)
    next()
  },
  created: () => {
    console.log('master')
  },
  methods: {
    checkStatusText (value) {
      return CHECK_STATUSES[value] || '不明'
    },
    changeMode (mode, quiz) {
      if (mode === 'add') {
        const newQuiz = new Quiz()
        store.commit('quiz/setNewQuiz', newQuiz)
      } else if (mode === 'update') {
        const newQuiz = new Quiz(quiz)
        store.commit('quiz/setNewQuiz', newQuiz)
      }
      store.commit('quiz/setMode', mode)
    },
    onSubmit (event) {
      alert(JSON.stringify(event))
      event.preventDefault()
      // console.log(event)
      // console.log(mode)
    },
    add (newQuiz) {
      if (!validateQuiz(newQuiz)) {
        return
      }
      store.dispatch('quiz/addQuiz', newQuiz)
    },
    update (newQuiz) {
      const form = document.getElementById('quiz-form')
      const result = form.checkValidity()
      form.classList.add('was-validated')
      console.log(result)
      /*
      if (!validateQuiz(newQuiz)) {
        return
      }
      store.dispatch('quiz/updateQuiz', newQuiz)
      */
    },
    abondon (mode) {
      // if (mode === 'add')
      store.commit('quiz/setNewQuiz', null)
      store.commit('quiz/setMode', 'show')
    },
    speakQuestion (speaker, quiz) {
      store.dispatch('quiz/speakQuestion', {speaker, quiz})
    },
    stopSpeaker (speaker) {
      store.dispatch('quiz/stopSpeaker', speaker)
    },
    suspendSpeaker (speaker) {
      store.dispatch('quiz/suspendSpeaker', speaker)
    },
    resumeSpeaker (speaker) {
      store.dispatch('quiz/resumeSpeaker', speaker)
    }
  },
  components: {
    InputTag
  }
}
</script>

<style lang="scss">
.quiz {
  text-align: left;
  .buttons-row {
    margin-bottom: 2.0rem;
    button {
      width: 100px;
      margin-left: 1.0rem;
    }
  }
  .form-row {
    [class*="col-"] {
      padding-left: 0.8rem;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-right: 0.8rem;
      border-top: 1px solid #e0e0e0;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      .tag {
        background-color: lightgreen;
        padding-left: 0.4rem;
        padding-right: 0.4rem;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        border-radius: 0.25rem;
        margin-right: 0.4rem;
      }
    }
    .header {
      background-color: #f0f0f0;
    }
  }
}
.error {
  color: red
}
</style>
