export default {
  data () {
    return {
      globleVue: ''
    }
  },
  render (createElement) {
    if (this.globleVue) {
      return createElement(this.globleVue.vueObj, {
        props: this.globleVue.attr,
        on: this.globleVue.event
      })
    } else {
      return createElement('div')
    }
  }
}
