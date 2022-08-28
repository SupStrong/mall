<template>
<el-container>
  <el-header>
    <head-bar v-on:sidebar="handleSidebar"></head-bar>
  </el-header>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '190px'">
      <side-bar :is-collapse="isCollapse"></side-bar>
    </el-aside>
    <el-container>
      <el-header>
        <Tabs class="tabs"></Tabs>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</el-container>

</template>

<script>
import headBar from './headbar'
import sideBar from './sidebar'
import Tabs from '@/components/tools/tabs'
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    isCollapse: false
  }),
  methods: {
    handleSidebar(isCollapse) {
      this.isCollapse = isCollapse
    }
  },
  computed: {
    ...mapGetters(['bread']),
  },
  components: {
    headBar, sideBar, Tabs
  }
}
</script>

<style scoped>
.el-main {
  scrollbar-width: thin;
  scrollbar-color: #c7d1da transparent;
}
.el-main::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
.el-main::-webkit-scrollbar-thumb {
  border-radius: 3.5px;
  background: #c7d1da;
}
.el-main::-webkit-scrollbar-track-piece {
  background: #efefef;
}
.el-main-el-menu:not(.el-menu--collapse) {
  width: 210px;
}
.el-main > ul {
  height: 100%;
}
</style>
