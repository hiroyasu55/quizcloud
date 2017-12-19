export const getDummy = ({ commit }, text) => {
  return Promise.resolve()
    .then(() => {
      const result = `dummyAction:${text}`
      commit('setDummy', result)
    })
}
