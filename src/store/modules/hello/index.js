const hello = {
  namespaced: true,
  state: {
    hello: 'none'
  },
  getters: {
    hello (state) {
      return state.hello
    }
  },
  actions: {
    sayHello ({ commit }, text) {
      return Promise.resolve()
        .then(() => {
          const result = `sayHello:${text}`
          commit('setHello', result)
        })
    }
  },
  mutations: {
    setHello (state, text) {
      state.hello = `hello:${text}`
    }
  }
}

export default hello
