import { userApi } from '../api/index'
export const SET_AUTH_ROUTER = 'SET_AUTH_ROUTER'
export const GET_AUTH_ROUTER = 'GET_AUTH_ROUTER'
export const SET_AUTH_BUTTON = 'SET_AUTH_BUTTON'
export const CLEAR_AUTH_ROUTER = 'CLEAR_AUTH_ROUTER'
export const SET_ROW = '存储列表数据'
export const SET_CACHE_BOX = '设置缓存列表'

export default {
  state: {
    authRouter: [],
    authButton: {
      list: [],
      detail: [],
      btnField: []
    },
    aliveBox: []
  },
  getters: {
    authRouter: state => {
      return state.authRouter || []
    },
    authButton: state => {
      return state.authButton || []
    },
    aliveBox: state => state.aliveBox
  },
  mutations: {
    [SET_ROW] (state, obj) {
      localStorage.setItem('rowData', JSON.stringify(obj))
      state.rowData = Object.assign({}, obj)
    },
    [CLEAR_AUTH_ROUTER](state) {
      state.authRouter = []
    },
    [SET_AUTH_ROUTER](state, authTree) {
      state.authRouter = authTree
    },
    [SET_AUTH_BUTTON](state, buttons) {
      state.authButton = {
        list: [],
        detail: [],
        btnField: []
      }
      buttons.map(item => {
        let info = JSON.parse(item.menuExtend)
        item = Object.assign(item, info)
        item.label = item.title
        if (item.position) {
          state.authButton[item.position].push(item)
        }
        return item
      })
    },
    [SET_CACHE_BOX] (state, name) {
      if (Object.prototype.toString.call(name) === '[object Array]') {
        state.aliveBox = name
      } else {
        if (!state.aliveBox.find(item =>
          item === name
        )) {
          state.aliveBox.push(name)
        }
      }
    },
  },
  actions: {
    [GET_AUTH_ROUTER]({ commit }) {
      // return userApi.getAuthMap()
    }
  }
}
