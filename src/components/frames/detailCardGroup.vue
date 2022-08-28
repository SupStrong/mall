<template>
  <div class="detail-block">
    <h2 class="detail-block-title">
      {{ title }}
      <slot name="button"></slot>
    </h2>
    <el-row class="detail-card-group" type="flex" justify="space-between">
      <slot></slot>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    title: { // detail title
      type: String,
      required: false,
      default: '详细信息'
    }
  }
}
</script>
