<template>
  <b-container>
    <b-table
      stacked="false"
      :fields="fields"
      :items="quizes"
      :current-page="currentPage"
      :per-page="perPage"
       bordered responsive
    >
      <template slot="answer" slot-scope="data">
        <a :href="`/show/${data.item.key}`">
        {{data.item.answers[0].answer}}
        </a>
      </template>
      <template slot="question" slot-scope="data">
        {{data.value ? data.value.substr(0, 30) : '-'}}
      </template>
    </b-table>
    <b-col cols="6">
      <b-pagination
        :total-rows="store.state.quizes.length"
        :per-page="perPage" v-model="currentPage" />
    </b-col>

    <b-row>
      <p v-if="message && message.length > 0">
        {{ message }}
      </p>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import store from '@/store'
import { getQuizes } from '@/store/actions'

export default {
  computed: {
    ...mapGetters({
      quizes: 'quizes',
      message: 'message',
      error: 'error'
    })
  },
  data () {
    return {
      store: store,
      fields: {
        answer: {
          label: '正解',
          md: '7',
          class: 'text-left'
        },
        question: {
          label: '問題',
          md: '5',
          class: 'text-left text-truncate'
        }
      },
      currentPage: 1,
      perPage: 10
    }
  },
  created: () => {
    getQuizes(store)
  },
  methods: {
    ...mapMutations([
      'setMessage',
      'addQuiz'
    ]),
    dummy () {
    }
  }
}
</script>
<style lang="scss">
.container {
}
</style>
