<script>
import { mapMutations } from 'vuex'
export default {
  render: function (createElement) {
    return createElement('el-button', {
      on: {
        click: this.handleClick
      }
    }, '我是标题一')
  },
  methods: {
    ...mapMutations({
      setDialog: '设置对话框'
    }),
    handleClick () {
      this.setDialog({
        test: true
      })
    }
  }
}
</script>
