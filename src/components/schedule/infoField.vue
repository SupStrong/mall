<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  props: [
    'title'
  ]
}
</script>
