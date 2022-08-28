import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN'
export const USER_SIGNOUT = 'USER_SIGNOUT'
export const SET_PHP_TOKEN = 'SET_PHP_TOKEN'
export const SET_MERCHANT_ID = 'SET_MERCHANT'
export const SET_MERCHANT_INFO = 'SET_MERCHANT_INFO'

export default {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {},
    phpToken: localStorage.getItem('phpToken') || '',
    merchantId: localStorage.getItem('merchantId') || '',
    merchantInfo: JSON.parse(localStorage.getItem('merchantInfo')) || {},
  },
  getters: {
    user: state => state.user,
    getPhpToken: state => state.phpToken,
    merchantInfo: state => state.merchantInfo,
    merchantId: state => state.merchantId
  },
  mutations: {
    [USER_SIGNIN](state, user) {
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
      Object.assign(state, user)
    },
    [USER_SIGNOUT](state) {
      localStorage.removeItem('user')
      localStorage.clear()
      Object.keys(state).forEach(k => Vue.delete(state, k))
    },
    [SET_PHP_TOKEN] (state, token) {
      state.phpToken = token
      localStorage.setItem('phpToken', token)
    },
    [SET_MERCHANT_ID] (state, id) {
      localStorage.setItem('merchantId', id)
      state.merchantId = id
    },
    [SET_MERCHANT_INFO] (state, info) {
      localStorage.setItem('merchantInfo', JSON.stringify(info))
      state.merchantInfo = info
    }
  },
  actions: {
    [USER_SIGNIN]({ commit }, user) {
      commit(USER_SIGNIN, user)
      user.identityList.map(item => {
        if (item.userType === 5) {
          commit(SET_MERCHANT_ID, item.merchantId)
        }
      })
    },
    [USER_SIGNOUT]({ commit }) {
      commit(USER_SIGNOUT)
    },
    [SET_PHP_TOKEN]({ commit }, token) {
      commit(SET_PHP_TOKEN, token)
    }
  }
}
