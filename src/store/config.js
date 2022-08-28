import { api } from '../api/axios'
import Vue from 'vue'

export const CONFIG = 'CONFIG'
export const GET_CONFIG = 'GET_CONFIG'
export const SET_SCREEN_WIDTH = '设置屏幕宽度'

export default {
  state: {
    config: {},
    screenWidth: window.innerWidth

  },
  getters: {
    config: state => state.config
  },
  mutations: {
    [CONFIG](state, data) {
      state.config[data.key] = data.value
    },
    [SET_SCREEN_WIDTH] (state, width) {
      state.screenWidth = width
    }
  },
  actions: {
    [GET_CONFIG]({ commit }, data) {
      api.get(`${Vue.prototype[data.service]}/dict/dictbytype?dictType=${data.name}`).then(result => {
        if (result.data.statusCode === 200) {
          commit('CONFIG', {
            key: data.name,
            value: result.data.data
          })
        }
      })
    }
  }
}
