<template>
  <div class="page-layout">
    <div class="page-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped>
.tabs{
  margin-bottom: 20px;
}
</style>
