<template>
  <div class='bl_page'>
    <el-pagination
      ref="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page='currentPage'
      :page-sizes="[5, 10, 20, 30, 50, 100, 200]"
      @size-change="sizeChange"
      :page-size='pageNumber'
      @current-change='currentChange'
      :total="AllPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    AllPage: {
      type: Number,
      default: 30
    },
    pageNumber: {
      type: Number,
      default: 5
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    currentChange (a) {
      this.$emit('currentIndexChange', a)
    },
    setCurrentPage (index) {
    },
    sizeChange (index) {
      this.$emit('sizeChange', index)
    }
  }
}
</script>

<style lang='stylus'>
@import '../assets/style/common.styl';
.bl_page
  height 50px
  width 100%
  text-align center
  .el-pagination
    button,li
      background-color #F0F0F0
</style>
