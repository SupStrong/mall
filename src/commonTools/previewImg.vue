<template>
  <div>
    <p @click="centerDialogVisible = true">{{title}}</p>
    <el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
      <img :src="src" class="previewImg" :style="styleImg">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      centerDialogVisible: false
    }
  },
  props: ['src', 'title', 'styleImg']
}
</script>
<style scoped>
.el-dialog__body .previewImg{
  width:100%;
}
</style>
