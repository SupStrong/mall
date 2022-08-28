import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import data from './modules/data'
const Frame = () => import('@/components/frames/frame')
const Login = () => import('@/views/common/login')
Vue.use(Router)

export const routerMap = [{
  path: '/',
  name: 'frame',
  component: Frame,
  children: [
    ...data
  ],
  redirect: '/index'
}]

const router = new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'is-active',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      notab: true
    }
  }
  ].concat(routerMap)
})
router.beforeEach((to, from, next) => {
  // if (!window.localStorage.user) {
  //   if (to.path !== '/login' && to.path !== '/signUp' && to.path !== '/signUpPhp') {
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
  next()
  if (to.meta.buttons) {
  }
})
router.afterEach((to, from) => {
  if (!to.meta.notab) {
    console.log(to)
    let hasTab = false
    for (let i of store.state.Tabs.tabs) {
      if (to.fullPath === i.name) {
        hasTab = true
      }
    }
    if (!hasTab && to.meta.title) {
      store.commit('ADD_TABS', {
        title: to.meta.title,
        name: to.fullPath,
        keepAlive: to.meta.keepAlive,
        tagName: to.name
      })
    }
  }
})
store.commit('SET_AUTH_ROUTER', routerMap)
export default router
