<template>
  <el-card class="search-card" :body-style="{ padding: 0 }">
    <div slot="header" class="clearfix search-header" @click="handleClick">
      <span>{{ title }}</span>
      <i class="icon el-icon-minus" v-if="showMyField"></i>
      <i class="icon el-icon-plus" v-else></i>
    </div>
    <slot name="both"></slot>
    <slot name="nohide" v-if="!showMyField"></slot>
    <el-collapse-transition>
      <div v-if="showMyField">
        <div class="body">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
    <slot name="button"></slot>

  </el-card>
</template>

<script>
export default {
  name: 'searchField',
  data: () => ({
    showMyField: true
  }),

  props: {
    title: {
      type: String,
      required: false,
      default: '条件检索'
    },
    showField: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    handleClick () {
      this.showMyField = !this.showMyField
      this.$emit('a', this.showMyField)
      // console.log(this.showField)
    }
  },
  mounted () {
    this.showMyField = this.showField
  }
}
</script>
<style lang="stylus" scoped>
.search-card
  >>> .el-row
        [class*=el-col-]
          height 40px
</style>
