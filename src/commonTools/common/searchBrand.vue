<template>
  <!--  -->
  <el-autocomplete
    v-model="state"
    @select="handleSelect"
    :fetch-suggestions="getbrand"
    placeholder="请输入品牌名称"
    value-key='name'
    clearable
  ></el-autocomplete>
</template>

<script>
export default {
  data () {
    return {
      state: null,
      oldName: null
    }
  },
  methods: {
    // 选择改变
    handleSelect (row) {
      this.oldName = row.name
      this.$emit('input', row.id)
    },
    // 获取品牌
    getbrand (query, cd) {
      if (this.oldName !== this.state) {
        this.$emit('input', null)
      }
      this.$axios({
        method: 'post',
        url: this.sp + '/product/brand/list',
        data: {
          bizParam: {
            pageIndex: 1,
            pageSize: 1000,
            name: query,
            display: '1'
          }
        }
      })
        .then(result => {
          if (result.data.statusCode === 200) {
            cd(result.data.data.list)
          } else {
            cd([])
          }
        })
        .catch(err => {
          console.error(err)
          cd([])
        })
    }
  }
}
</script>

<style>
</style>
