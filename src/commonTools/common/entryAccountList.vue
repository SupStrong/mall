<template>
  <div>
    <el-option
      v-for="(val, key) in entryAccountList"
      :key="key"
      :value="val.code"
      :label="val.name"
    ></el-option>
  </div>
</template>
<script>
export default {
  name: 'entryAccountList',
  data () {
    return {
      entryAccountList: []// 收支账户
    }
  },
  props: {
    accountTypes: {
      type: Array,
      default () {
        return []
      }
    },
    paymentTypes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.entryaccount()
  },
  methods: {
    // 收支账户
    entryaccount () {
      this.$axios({
        method: 'post',
        url: '/api/order/entryaccount/list',
        data: {
          accountTypes: this.accountTypes, // 账户类型，1：在线支付；2：银行转帐：3：其它支付
          paymentTypes: this.paymentTypes // 支付类型，1：收款；2：付款；3：通用；4：内部
        }
      }).then(data => {
        if (data.data.statusCode === 200) {
          this.entryAccountList = data.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
</style>
