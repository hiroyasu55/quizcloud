<template>
  <b-container fluid>
    <b-row class="justify-content-md-center">
      <b-col sm="8">
        <b-card class="search-panel">
          <b-row>
            <b-col sm="6">
              <b-form-group horizontal label="タグ">
                <b-input-group>
                  <input-tag class="filter-tags" :tags="filter.tags"></input-tag>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="buttons-row">
            <b-col>
              <b-button variant="primary" @click="search(filter)">
                検索
              </b-button>
              <router-link :to="{ name: 'master.quiz.new'}">
                <b-button variant="success">
                  新規
                </b-button>
              </router-link>
            </b-col>
          </b-row>
        </b-card>

        <b-row class="loading" v-if="status === 'loading'">
          Loading...
        </b-row>
        <b-row id="error" class="error" v-if="status === 'error'">
          Error occured.
        </b-row>

        <b-row v-if="status === 'done' && list.quizes.length === 0">
          No data.
        </b-row>
        <b-row v-if="status === 'done' && list.quizes.length > 0">
          <b-col sm="12">
            <b-row class="quizes quizes-header">
              <b-col sm="4">正解</b-col>
              <b-col sm="6">問題</b-col>
              <b-col sm="2">状態</b-col>
            </b-row>
            <b-row
              v-for="quiz in list.quizes.slice(offset(curPage), offset(curPage) + perPage)"
              :key="quiz.id"
              class="quizes quizes-body">
              <b-col sm="4">
                <router-link :to="{ name: 'master.quiz.detail', params: { id: quiz.id }}"
                  v-text="quiz.answer.length > 0 ? quiz.answer : '-'" />
              </b-col>
              <b-col sm="6" class="text-truncate">
                {{ quiz.question }}
              </b-col>
              <b-col sm="2">
                <b-badge v-if="quiz.checkStatus === 'valid'" variant="primary">有効</b-badge>
                <b-badge v-if="quiz.checkStatus === 'draft'" variant="secondary">下書き</b-badge>
              </b-col>
            </b-row>

            <b-row class="pagination">
              <b-col sm="12" class="text-left">
                <b-pagination
                  :total-rows="list.count"
                  v-model="curPage"
                  :per-page="perPage" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'
import InputTag from 'vue-input-tag'

const PER_PAGE = 10

export default {
  computed: {
    ...mapGetters('quiz', {
      mode: 'mode',
      status: 'status',
      list: 'list'
    })
  },
  methods: {
    ...mapActions('quiz', {
      getList: 'getList'
    }),
    search (filter) {
      store.dispatch('quiz/getList', filter)
    },
    offset (curPage) {
      return (curPage - 1) * PER_PAGE
    }
  },
  beforeRouteEnter (route, redirect, next) {
    /*
    const params = {
      lastId: null
    }
    store.dispatch('quiz/getList', params)
    */
    next()
  },
  data () {
    return {
      filter: {
        tags: []
      },
      curPage: 1,
      perPage: PER_PAGE
    }
  },
  components: {
    InputTag
  }
}
</script>

<style lang="scss">
.search-panel {
  text-align: left;
  margin-bottom: 1rem;
  .buttons-row {
    float: right;
  }
}
.quizes {
  text-align: left;
  [class*="col-"] {
    padding-left: 0.8rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    padding-right: 0.8rem;
    border-top: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
  }
}
.quizes-header {
  background-color: #f0f0f0;
}
.quizes-body {
}

.vue-input-tag-wrapper {
}
.list-row {
  .list-col {
    text-align: left;
    padding-top: .75rem;
    padding-bottom: .75rem;
    background-color: white;
    border: 1px solid rgba(86,61,124,.2);
  }
}
.pagination {
  margin-top: 1rem;
}
.error {
  color: red
}
</style>
