<template>
  <b-container>
    {{ $route.params.key }}
  </b-container>
</template>

<script>
import store from '@/store'
export default {
  computed: {
  },
  data () {
    return {
      store: store
    }
  },
  created: () => {
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    next()
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>
