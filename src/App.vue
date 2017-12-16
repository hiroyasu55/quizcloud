<template>
  <div id="app">
    <header-view></header-view>
    <router-view></router-view>
  </div>
</template>

<script>
import headerView from '@/components/HeaderView'

export default {
  title: 'no-title',
  name: 'app',
  components: {
    headerView
  },
  data () {
    return {
      welcome: 'welcome.app'
    }
  },
  created: () => {
    this.welcome = 'welcome.app.created'
    console.log('app.created')
  }
}
</script>

<style lang="scss">
body {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Hiragino Kaku Gothic ProN,"ãƒ¡ã‚¤ãƒªã‚ª",meiryo,sans-serif;
  padding-top: 70px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
