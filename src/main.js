import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './libs/filters'
import ElementUI from 'element-ui'
import jmsComponents from '@/libs/allComponents'
import axios from 'axios'
import VueQriously from 'vue-qriously'
import qs from 'qs'
import defaultImage from '@/assets/default_head.png'
import './libs/validator'
import './libs/commonUse'
import '@/assets/styles/reset.css'
import '@/assets/styles/frame.less'
import '@/assets/styles/detail.less'
import '@/assets/styles/color.styl'
// import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import {
  resize
} from '@/libs/utils'
import _ from 'lodash';

console.log(_.join(['Hello', 'webpack'], ' '));
resize()
Vue.use(jmsComponents)
Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(VueQriously)
Vue.config.productionTip = false

Object.keys(filters).forEach((item) => {
  Vue.filter(item, filters[item])
})

Vue.prototype.axios = axios
Vue.prototype.$qs = qs
Vue.prototype.defaultImage = defaultImage
Vue.prototype.$setDialog = function (dialog) {
  store.commit('设置对话框', dialog)
}
Vue.prototype.$closeDialog = function (dialog) {
  store.commit('关闭弹框', dialog)
}
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.auth = '/ac'
  Vue.prototype.user = '/uc'
  Vue.prototype.order = '/od'
  Vue.prototype.product = '/prd'
  Vue.prototype.sb = '/sb'
  Vue.prototype.web = '/we'
  Vue.prototype.message = '/msg'
  Vue.prototype.phpTok = '/index.php/api'
  Vue.prototype.cms = '/cms'
} else {
  Vue.prototype.auth = '/api/auth'
  Vue.prototype.user = '/api/user'
  Vue.prototype.order = '/api/order'
  Vue.prototype.product = '/api/product'
  Vue.prototype.sb = '/api/device'
  Vue.prototype.web = '/api/web'
  Vue.prototype.message = '/api/message'
  Vue.prototype.phpTok = '/index.php/api'
  Vue.prototype.cms = '/cms'

  window._hmt = window._hmt || [];
  (function () {
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?fa6d955330fdb43e99a7ebd03ad0ee30';
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();
}
console.log(router, 'router12424')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
