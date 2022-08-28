<template>
  <el-card class="search-card" :body-style="{ padding: 0 }">
    <div slot="header" class="clearfix search-header" @click="handleClick">
      <span>{{ title }}</span>
      <i class="icon el-icon-minus" v-if="showMyField"></i>
      <i class="icon el-icon-plus" v-else></i>
    </div>
    <slot name="nohide"></slot>
    <el-collapse-transition>
      <div v-show="showMyField">
        <div class="body"> <!-- To fix element collapse transition bug. -->
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
      default: true
    }
  },

  methods: {
    handleClick() {
      this.showMyField = !this.showMyField
    }
  },
  mounted() {
    this.showMyField = this.showField
  }
}
</script>
<style lang="less" scoped>
.search-card /deep/ .el-input,.el-select {
    margin-right: 10px;
  }
</style>
