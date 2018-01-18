<template>
  <div id="app">
    <header-view></header-view>
    <router-view></router-view>
  </div>
</template>

<script>
import headerView from '@/components/master/HeaderView'

export default {
  title: 'no-title',
  name: 'master',
  data () {
    return {
      tags: [ 'Vue.js', 'Feed', 'News', 'Tutorials' ]
    }
  },
  components: {
    headerView
  }
}
</script>

<style lang="scss">
body {
  padding-top: 70px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.pre-wrap {
  white-space: pre-wrap ;
}
</style>
