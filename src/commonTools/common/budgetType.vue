<template>
  <div>
    <el-option v-for="(val,key) in budgetTypeList"
      :key="key"
      :value="val.dictCode"
      :label="val.dictName"
    ></el-option>
  </div>
</template>
<script>
export default {
  name: 'budgetType',
  data () {
    return {
      budgetTypeList: []// 收支类型一级
    }
  },
  props: {
    dictCodeOne: {
      type: Number,
      default: 0
    },
    isTwoLayers: {
      type: Boolean,
      default: true
    }
  },
  created () {
    if (this.isTwoLayers) {
      this.budgetTypeOne()
    } else {
      this.budgetSubject()
    }
  },
  methods: {
    // 收支类型一级
    budgetTypeOne () {
      this.$axios({
        method: 'get',
        url: '/api/order/dict/dictbytype?dictType=budgetType'
      }).then(data => {
        if (data.data.statusCode === 200) {
          data.data.data.filter(item => {
            if (item.dictCode - 0 === this.dictCodeOne - 0) {
              this.budgetTypeTwo(item.id)// 收支类型二级
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 收支类型二级
    budgetTypeTwo (id) {
      this.$axios({
        method: 'get',
        url: `/api/order/dict/dictbyparentid?parentId=${id}`
      }).then(data => {
        if (data.data.statusCode === 200) {
          this.budgetTypeList = data.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 收支类型一级
    budgetSubject () {
      this.$axios({
        method: 'get',
        url: '/api/order/dict/dictbytype?dictType=budgetSubject'
      }).then(data => {
        if (data.data.statusCode === 200) {
          this.budgetTypeList = data.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
</style>
