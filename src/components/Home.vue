<template>
  <b-container>
    <b-table
      stacked="false"
      :fields="fields"
      :items="quizes"
      :current-page="currentPage"
      :per-page="perPage"
       bordered responsive="sm"
    >
      <template slot="answer" slot-scope="data">
        <router-link :to="{ name: 'Show', params: { key: data.item.key }}">
          {{data.item.standard_answer}}
        </router-link>
      </template>
      <template slot="question" slot-scope="data">
        {{data.value ? data.value.substr(0, 30) : '-'}}
      </template>
      <template slot="status" slot-scope="data">
        <b-badge v-if="data.value" variant="primary">有効</b-badge>
        <b-badge v-if="!data.value" variant="secondary">無効</b-badge>
      </template>
    </b-table>
    <b-col cols="6">
      <b-pagination
        :total-rows="quizes.length"
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
// import store from '@/store/quiz'
// import { getQuizes } from '@/store/quiz/actions'

export default {
  computed: {
    ...mapGetters({
      // quizes: 'quizes'
    })
  },
  data () {
    return {
      // store: store,
      fields: {
        answer: {
          label: '正解',
          class: 'text-left'
        },
        question: {
          label: '問題',
          class: 'text-left text-truncate'
        },
        tags: {
          label: 'タグ',
          class: 'text-left text-truncate'
        },
        status: {
          label: '状態',
          class: 'text-left'
        }
      },
      currentPage: 1,
      perPage: 10
    }
  },
  created: () => {
    // getQuizes(store)
  },
  mounted: () => {
  },
  methods: {
    ...mapMutations([
    ])
  }
}
</script>
<style lang="scss">
.container {
}
</style>
