export default {
  methods: {
    goBack() {
      if (this.previousRoute.name) {
        this.$router.push({
          name: this.previousRoute.name
        })
      } else {
        if (this.previousPage) {
          this.$router.push({
            name: this.previousPage
          })
        } else {
          this.$router.push({
            path: '/'
          })
        }
      }
    }
  },

  computed: {
    previousRoute() {
      return this.$store.state.previousRoute
    }
  }
}
