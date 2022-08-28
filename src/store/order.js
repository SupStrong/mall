
export const SET_ORDER_DETAIL = '设置订单详情'
export const SET_PARAMS = '设置参数'
export default {
  state: {
    orderDetail: JSON.parse(localStorage.getItem('orderDetail')) || {},
    params: {}
  },
  getters: {
    orderDetail: state => state.orderDetail,
    params: state => state.params
  },
  mutations: {
    [SET_ORDER_DETAIL] (state, data) {
      localStorage.setItem('orderDetail', JSON.stringify(data))
      Object.assign(state.orderDetail, data)
    },
    [SET_PARAMS] (state, data) {
      state.params = data
    }
  }
}
