<template>
  <div class='selectCity'>
    <el-autocomplete
      v-model="result"
      :fetch-suggestions="querySearchAsync"
      value-key='name'
      placeholder="请输入城市"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  data () {
    return {
      result: ''
    }
  },
  methods: {
    clear () {
      this.result = ''
    },
    querySearchAsync (queryString, cb) {
      this.$emit('closeQuery')
      // 请求数据
      if (queryString) {
        this.$axios({
          method: 'post',
          url: this.sp + '/area/search',
          data: {
            name: queryString,
            level_type: 2
          }
        }).then(result => {
          if (result.data.statusCode === 200) {
            cb(result.data.data.list)
          }
        })
      } else {
        cb()
      }
    },
    // 选择触发事件
    handleSelect (item) {
      this.$emit('citySelect', item)
    }
  }
}
</script>

<style>
.selectCity {
  display:inline-block;
}

</style>
