import Vue from 'vue'
import Show from '@/components/Show'

describe('Show.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Show)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
