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
  }
}
</script>

<style lang="scss">
$baseFontSize: 1.5rem;
html {
  font-size: 62.5%;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI","Noto Sans Japanese","ヒラギノ角ゴ ProN W3", Meiryo, sans-serif;
  font-size: $baseFontSize;
  padding-top: 70px;
}
.form-control {
  font-size: $baseFontSize;
}
.btn {
  font-size: $baseFontSize;
}
.col-form-legend {
  font-size: $baseFontSize;
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
