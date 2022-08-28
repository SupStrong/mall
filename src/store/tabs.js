import router from '../router/index'

export const ADD_TABS = 'ADD_TABS'
export const DELETE_TABS = 'DELETE_TABS'
export default {
  state: {
    tabs: []
  },
  getters: {
    tabs: state => {
      return state
    }
  },
  mutations: {
    [ADD_TABS](state, data) {
      state.tabs.push(data)
    },
    [DELETE_TABS](state, data) {
      for (let i in state.tabs) {
        if (data === state.tabs[i].name) {
          state.tabs.splice(i, 1)
        }
      }
      if (state.tabs.length === 0) {
        router.push('/')
      }
    }
  }
}
