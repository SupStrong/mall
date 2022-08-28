<template>
  <div id="app">
    <keep-alive :include="openTabs">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['tabs', 'aliveBox']),
    openTabs: {
      get () {
        console.log(this.$store.state.Auth.aliveBox)
        return this.$store.state.Auth.aliveBox
      },
      set (aliveBox) {
        console.log(aliveBox)
        this.$store.commit('设置缓存列表', aliveBox)
      }
    }
  },
  watch: {
    $route: {
      handler: function (to, from) {
        let openTabs = this.tabs.tabs.filter(item => {
          return item.keepAlive === true
        }).map(item => item.tagName)
        this.openTabs = openTabs
      }
    }
  }
}
</script>
<style>
html, body{
  height: 100%;
  overflow-y: hidden;
}
#app {
  width: 100%;
  height:100%;
}
</style>
