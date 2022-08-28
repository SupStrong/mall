export const ROW_SELECT = 'ROW_SELECT'
export const ROW_DATA = 'ROW_DATA'

export default {
  state: {
    rowAction: [],
    rowData: JSON.parse(localStorage.getItem('rowData')) || {},
  },
  getters: {
    rowData: state => {
      return state.rowData
    }
  },
  mutations: {
    [ROW_SELECT](state, data) {
      state.rowAction = data.slice()
    },
    [ROW_DATA](state, data) {
      localStorage.setItem('rowData', JSON.stringify(data))
      Object.assign(state, data)
      state.rowData = data
    }
  },
  actions: {
    [ROW_SELECT]({ commit }, data) {
      commit(ROW_SELECT, data)
    },
    [ROW_DATA]({ commit }, data) {
      commit(ROW_DATA, data)
    }
  }
}
