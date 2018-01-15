<template>
  <b-container fluid>
    <b-row class="justify-content-md-center" v-if="status === 'done' && quiz">
      <b-col sm="8" class="quiz">
        <b-row class="loading" v-if="status === 'loading'">
          Loading...
        </b-row>
        <b-row id="error" class="error" v-if="status === 'error'">
          Error occured.
        </b-row>
        <b-row v-if="status === 'done' && !quiz">
          No data.
        </b-row>

        <b-form>
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
              <b-form-input
                v-if="['add', 'update'].includes(mode) && newQuiz"
                id="answer"
                v-model="newQuiz.answer" />
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col sm="2" class="header">
              <label for="answerKana">かな</label>
            </b-col>
            <b-col sm="10">
              <span v-if="mode === 'show'" v-text="quiz.answerKana" />
              <b-form-input
                v-if="['add', 'update'].includes(mode) && newQuiz"
                id="answerKana"
                v-model="newQuiz.answerKana" />
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
        </b-form>

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
              v-if="['stop', 'pause'].includes(speaker.status)"
              variant="primary"
              :disabled="!['stop', 'pause'].includes(speaker.status)"
              @click="speakQuestion(speaker, quiz)">
              再生
            </b-button>
            <b-button
              variant="primary"
              :disabled="!['stop', 'pause'].includes(speaker.status)"
              @click="speakQuestion(speaker, quiz)">
              再生
            </b-button>
            <b-button
              variant="primary"
              :disabled="!['play'].includes(speaker.status)"
              @click="stopSpeaker(speaker)">
              停止
            </b-button>
            <span v-text="quiz.voice.latest" />
            <p>
              <span v-text="speaker.status" />
            </p>
          </b-col>
        </b-form-row>

        <b-row class="buttons-row" v-if="mode === 'show'">
          <b-button variant="primary" @click="updateMode(quiz)">
            編集
          </b-button>
          <b-button variant="success">
            新規
          </b-button>
        </b-row>
        <b-row class="buttons-row" v-if="mode === 'update'">
          <b-button variant="primary" @click="update(newQuiz)">
            更新
          </b-button>
          <b-button variant="secondary" @click="abondon()">
            破棄
          </b-button>
        </b-row>
        <b-row>
          <b-col>
            <span v-text="message" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Quiz from '@/models/Quiz'
import InputTag from 'vue-input-tag'

const CHECK_STATUSES = {
  'valid': '有効',
  'draft': '下書き'
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
    const id = route.params.id || null
    if (!id) {
      store.commit('quiz/setMode', 'add')
      return next()
    }
    store.commit('quiz/setMode', 'show')
    store.dispatch('quiz/getQuiz', id)
    next()
  },
  created: () => {
    store.commit('quiz/setMessage', 'start')
  },
  methods: {
    checkStatusText (value) {
      return CHECK_STATUSES[value] || '不明'
    },
    updateMode (quiz) {
      const newQuiz = new Quiz(quiz)
      store.commit('quiz/setNewQuiz', newQuiz)
      store.commit('quiz/setMode', 'update')
    },
    speakQuestion (speaker, quiz) {
      store.dispatch('quiz/speakQuestion', {speaker, quiz})
    },
    stopSpeaker (speaker) {
      store.dispatch('quiz/stopSpeaker', speaker)
    },
    update (newQuiz) {
      store.dispatch('quiz/updateQuiz', newQuiz)
      store.commit('quiz/setMode', 'show')
    },
    abondon () {
      store.commit('quiz/setNewQuiz', null)
      store.commit('quiz/setMode', 'show')
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
  .buttons-row {
    margin-top: 2.0rem;
    float: right;
    button {
      width: 100px;
      margin-left: 1.0rem;
    }
  }
}
.error {
  color: red
}
</style>
