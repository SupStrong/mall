<script>
export default {
  data () {
    return {
      formParams: [
        {
          type: 'input',
          value: 'userName',
          label: '用户名'
        }
      ]
    }
  },
  render: function (createElement) {
    return createElement('el-form', this.formParams.map(function (item) {
      return createElement('el-form-item', {
        props: {
          label: item.label
        }
      }, 'xxxx')
    }))
  }
}
</script>
