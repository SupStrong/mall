export const SET_ROW = '存储列表数据'
export const ROW_SELECT = '选中列表'
export const SAVE_EVENT = '存储事件'
export const SELECTED_ROWS = '所有选中列表'
export const DELETE_ROW = '删除行'
export const SAVE_PAGE_NUM = '存储页码'
export default {
  state: {
    rowData: localStorage.rowData ? JSON.parse(localStorage.rowData) : {},
    rowSelect: [{ id: 234 }],
    eventObj: {},
    selectedRows: [],
    pageNum: 1
  },
  getters: {
    getRow: state => state.rowData,
    getRows: state => state.selectedRows,
    getRowSelect: state => state.rowSelect,
    getEvent: state => state.eventObj,
    getPage: state => state.pageNum
  },
  mutations: {
    [SET_ROW] (state, obj) {
      localStorage.setItem('rowData', JSON.stringify(obj))
      state.rowData = Object.assign({}, obj)
    },
    [ROW_SELECT] (state, data) {
      state.rowSelect = data.slice()
    },
    [SAVE_EVENT] (state, data) {
      state.eventObj = data
    },
    [SELECTED_ROWS] (state, data) {
      let box = []
      if (Object.prototype.toString.call(data) !== '[object Array]') {
        box = [data]
      } else {
        box = data
      }
      if (state.selectedRows.length) {
        box.map((item) => {
          let result = state.selectedRows.find(select => select.id === item.id)
          if (!result) {
            state.selectedRows.push(item)
          }
        })
      } else {
        state.selectedRows = box
      }
    },
    [DELETE_ROW] (state, data) {
      state.selectedRows.splice(data, 1)
    },
    [SAVE_PAGE_NUM] (state, data) {
      state.pageNum = data || 1
    }
  }
}
