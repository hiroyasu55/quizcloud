// axios mixin
import axios from 'axios'

export default {
  methods: {
    request (url) {
      axios.get(url)
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
