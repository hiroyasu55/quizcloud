export default {
  mounted () {
    console.log(this.$options)
    let { title } = this.$options
    if (title) {
      title = typeof title === 'function' ? title.call(this) : title
      document.title = `__Quiz Cloud  - ${title}`
    }
  }
}
