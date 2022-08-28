<template>
  <el-input :type="type" v-model="query" @input='inputChange'>
    <i @click="changeLook" slot="suffix" class="el-icon-view"></i>
  </el-input>
</template>

<script>
export default {
  data () {
    return {
      type: 'text',
      query: ''
    }
  },
  props: ['value'],
  watch: {
    value (newVal, oldVal) {
      this.query = newVal
    }
  },
  methods: {
    inputChange () {
      this.$emit('input', this.query)
    },
    changeLook () {
      if (this.type === 'text') {
        this.type = 'password'
      } else {
        this.type = 'text'
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
// >>>.el-input__suffix
//   position absolute
//   top 50%
</style>
