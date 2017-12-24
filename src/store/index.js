import Vue from 'vue'
import Vuex from 'vuex'
// import db from './modules/db'
import quiz from './modules/quiz'
import hello from './modules/hello'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hello,
    quiz
  }
})
