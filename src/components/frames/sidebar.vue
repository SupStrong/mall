<template>
  <aside class="aside">
    <el-menu
      unique-opened
      :default-active="currentRouter"
      class="el-menu-vertical-demo"
      id="el_menu_demo"
      :collapse="isCollapse"
      @open="open">
      <div v-for='(oneV,oneK) in authRouter[0].children' :key='oneK'>
        <el-submenu v-if='!oneV.meta.notMenu' :index='oneV.path'>
          <template slot="title">
            <i :class="oneV.meta.icon"></i>
            <span v-if="!isCollapse">{{ oneV.meta.title }}</span>
          </template>
          <router-link
            v-for="subItem in oneV.children"
            v-if="!subItem.meta.onlyPage"
            :to="{ path: subItem.path }"
            :key="subItem.path">
            <el-menu-item
              :index="subItem.path">
              {{ subItem.meta.title }}
            </el-menu-item>
          </router-link>
        </el-submenu>
        <router-link
          v-else-if="oneV.meta.notMenu && !oneV.meta.onlyPage"
          :to="{ path: oneV.path }"
          :key="oneK">
          <el-menu-item  :index="oneV.path" @click="clickAlonePage(oneV)">
            <i :class="oneV.meta.icon"></i>
            <span slot="title">{{ oneV.meta.title }}</span>
          </el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </aside>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  props: {
    isCollapse: {
      type: Boolean,
      require: false,
      default: false
    }
  },

  data: () => {
    return {
      currentRouter: ''
    }
  },

  computed: {
    ...mapGetters(['authRouter'])
  },

  watch: {
    $route(to, from) {
      this.currentRouter = to.fullPath
      let url = this.$route.path
      this.firstIndex = `/${url.split('/')[1]}`
    }
  },

  methods: {
    open(i) {
      this.firstIndex = i
    },
    clickAlonePage(item) {
      this.firstIndex = ''
    },
  },
  mounted() {
    console.log(this.authRouter, 'authRouterauthRouter')
    this.currentRouter = this.$route.fullPath
  }
}
</script>

<style lang="less">
.el-aside{
  height: 100%;
  overflow: hidden;
  padding-top: 10px;
  .el-menu{
    height: 100%;
    .el-menu-item {
      height: 60px;
    }
    .iconfont{
      vertical-align: middle;
      margin-right: 10px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
.el-aside {
  scrollbar-width: thin;
  scrollbar-color: #c7d1da transparent;
}
.el-aside::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
.el-aside::-webkit-scrollbar-thumb {
  border-radius: 3.5px;
  background: #c7d1da;
}
.el-aside::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
</style>
