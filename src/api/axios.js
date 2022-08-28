/* eslint-disable */ //Disable for process
import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import {
  Logout
} from '../assets/js/power'
import {
  fakeMouthEvent
} from '@/libs/utils'
import crypto from '@/libs/crypto.js'

function setInterceptors(axiosInstance) {
  // request interceptor
  axiosInstance.interceptors.request.use(req => {
    // let token = store.state.User.jrwyToken || ''
    // req.headers['token-admin'] = token
    if (process.env.NODE_ENV !== 'production') {
      // console.time(`${req.method.toUpperCase()} /api${req.url}`)
    }
    return req
  }, error => {
    console.error(error)
    return Promise.reject(error)
  })

  // response interceptor
  axiosInstance.interceptors.response.use(res => {
    if (process.env.NODE_ENV !== 'production') {
      // console.timeEnd(`${res.config.method.toUpperCase()} ${res.config.url}`)
    }
    if (res.headers['content-disposition']) {
      let fileName = /filename=\"(.*)\"/.exec(res.headers['content-disposition'])[1]
      downLoadFileRow(res.data, fileName)
      return {
        data: {
          code: 0
        }
      }
    }
    if (res.data.statusCode && res.data.statusCode !== 200) {
      if (res.data.statusCode === 403) {
        Vue.prototype.$message.error('登录信息已失效，请重新登录')
        router.push('/login')
      } else {
        Vue.prototype.$message.error(res.data.errorInfo ? res.data.errorInfo : '网络错误')

      }
    }
    if (res.data.errorInfo === '统一登录认证TOKEN不存在') {
      window.location.href = `${process.env.VUE_APP_AUTH_URL}?backurl=${crypto.jiami(window.location.origin)}&userType=5`
    }
    return res
  }, error => {
    console.dir(error)
    if (error.response.status === 403 || error.response.status === 401) {
      Vue.prototype.$message.error('登录信息已失效，请重新登录')
      router.push('/login')
    }
    if (error.code === 'ECONNABORTED') {
      Vue.prototype.$message.error('网络错误，请检查网络连接刷新后重试')
    } else {
      Vue.prototype.$message.error('没有该权限')
    }
    return Promise.reject(error)
  })
}

// use simulate click a href to download file
function downLoadFileRow(data, fileName) {
  let blob = new Blob([data])
  let aDom = document.createElement('a')
  aDom.href = window.URL.createObjectURL(blob)
  aDom.download = fileName
  fakeMouthEvent(aDom, 'click')
}

// create axios instance
function getAxios(settings, timeout = 10000) {
  const axiosInstance = axios.create(settings)
  axios.defaults.timeout = timeout
  setInterceptors(axiosInstance)
  return axiosInstance
}

export const api = getAxios({
  baseURL: '/',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})