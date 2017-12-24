<template>
  <b-container>
    <span id="hello">{{ hello }}</span>
    <button id="hellobutton" @click="sayHello('ahaha')">Click</button>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

export default {
  name: 'Test',
  computed: {
    ...mapGetters('hello', {
      hello: 'hello'
    })
  },
  beforeRouteEnter (route, redirect, next) {
    const value = route.params.value || '???'
    store.commit('hello/setHello', `[${value}]`)
    next()
  },
  data () {
    return {
      store: store
    }
  },
  created: () => {
  },
  methods: {
    ...mapActions('hello', {
      sayHello: 'sayHello'
    })
  }
}
</script>
<style lang="scss">
.container {
}
</style>
