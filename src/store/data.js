import { api } from '../api/axios'
export const GET_DATA = '获取图表数据'
export const SET_DATA = '存储图表数据'
export default {
  state: {
    echartsData: JSON.parse(sessionStorage.getItem('echartsData')) || {},
    nowDate: ''
  },
  getters: {
    getEchars: state => {
      return state.echartsData
    },
    getNowDate: state => {
      return state.nowDate
    }
  },
  mutations: {
    // 将获取到的值赋值给state里面的值
    [SET_DATA] (state, data) {
      let obj = {}
      obj[data.key] = data.value
      state.echartsData = Object.assign(state.echartsData, obj)
      state.nowDate = new Date().getTime()
    }
  },
  actions: {
    // 获取数据，然后传给mutations里面操作
    [GET_DATA] ({ commit }, obj) {
      obj.data = {}
      if (obj.timeOptions) {
        obj.data[obj.timeOptions.startTime] = obj.timeOptions.startTimeVal
        obj.data[obj.timeOptions.endTime] = obj.timeOptions.endTimeVal
        obj.data.page = obj.timeOptions.page
        obj.data.size = obj.timeOptions.size
        obj.data.merchant_id = obj.timeOptions.merchant_id
      }
      if (obj.url.indexOf('/data') !== -1) {
        obj.data.url = obj.url.split('/data')[1]
      } else {
        obj.data.url = obj.url
      }
      api.defaults.headers.common['TOKEN'] = window.localStorage.PhPToken ? window.localStorage.PhPToken : ''
      return new Promise((resolve, reject) => {
        api({
          method: obj.method,
          url: obj.url,
          data: obj.timeOptions,
          params: obj.params
        }).then(data => {
          if (data.data.code === 200) {
            commit('存储图表数据', {
              key: obj.title,
              value: data.data.data
            })
            resolve(data.data.data)
          } else {
            reject(data)
          }
        })
      })
    }
  }
}
