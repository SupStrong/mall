import dialogs from './models/dialogs'
export const SET_DIALOG = '设置对话框'
export const SET_LOADING = '设置loading'
export const CLOSE_DIALOG = '关闭弹框'
export const CLOSE_DIALOG_ALL = '关闭所有弹框'

export default {
  state: {
    dialog: dialogs,
    loading: false
  },
  getters: {
    getDialog: state => state.dialog,
    getLoading: state => state.loading
  },
  mutations: {
    [SET_DIALOG] (state, data) {
      if (typeof data === 'object') {
        state.dialog = Object.assign(state.dialog, data)
      } else {
        let dialogMap = new Map()
        dialogMap.set(data, true)
        let dialogObj = Object.fromEntries(dialogMap)
        state.dialog = Object.assign(state.dialog, dialogObj)
      }
    },
    [SET_LOADING] (state, loading) {
      state.loading = loading
    },
    [CLOSE_DIALOG] (state, dialog) {
      state.dialog[dialog] = false
    },
    [CLOSE_DIALOG_ALL] (state) {
      for (let i in state.dialog) {
        state.dialog[i] = false
      }
    }
  }
}
