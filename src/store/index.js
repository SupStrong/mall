import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'
import Table from './tableActions'
import Bread from './bread'
import RouterMap from './menu'
import Tabs from './tabs'
import Auth from './auth'
import Config from './config'
import Dialog from './dialog'
import Data from './data'
import order from './order'
import row from './row'
import common from './common'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    User,
    Table,
    Bread,
    RouterMap,
    Tabs,
    Auth,
    Config,
    Dialog,
    Data,
    order,
    row,
    common },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        config: val.Config.config
      }
    }
  })]
})

export default store
