import { Message } from 'element-ui'
import Qs from 'qs'
import store from '@/store'

export const isWeiXin = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  return /microMessenger/ig.test(ua)
}

export const isQQ = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  /* eslint eqeqeq: off */
  let isqq = ua.match(/ qq/i) == ' qq'
  /* eslint eqeqeq: off */
  if (ua.match(/mqqbrowser/i) == 'mqqbrowser') {
    isqq = false
  }
  return isqq
}

export const isIos = () => {
  return /iPad|iPhone|iPod/g.test(navigator.userAgent)
}

export const isAndroid = () => {
  return /android/gi.test(navigator.userAgent)
}

export const isTel = (phone = '') => {
  return /^1[3-9]\d{9}$/g.test(phone)
}

export const isUrl = (str = '') => {
  return /^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/.test(str)
}

export function isFunction(value) {
  return ({}).toString.call(value) === '[object Function]'
}

export const formatDate = (date, fmt) => {
  if (date === 0 || date === null) {
    return '-'
  }
  if (isNaN(date)) {
    date = date.replace(/-/g, '/')
  }
  if (parseInt(date).toString().length > 9) {
    date = parseInt(date) * 1000
  }
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 节流函数
export const throttle = (callback, threshold) => {
  if (!isFunction(callback)) return
  let last, timer
  threshold = threshold || 250
  return function () {
    const context = this
    let args = arguments
    let now = +new Date()
    if (last && now < last + threshold) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        callback.apply(context, args)
      }, threshold)
    } else {
      last = now
      callback.apply(context, args)
    }
  }
}

export const inArray = (str = '', array = [], key) => {
  let length = array.length
  for (let i = 0; i < length; i++) {
    if (key) {
      if (str === array[i][key]) {
        return true
      }
    } else {
      if (str === array[i]) {
        return true
      }
    }
  }
  return false
}

// simulate mouth event
export const fakeMouthEvent = (target, eventName) => {
  const event = document.createEvent('MouseEvents')
  event.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  target.dispatchEvent(event)
}

export function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

// 校验手机号
export function checkPhone(phone, title) {
  var rex = /^1\d{10}$/;
  if (!rex.test(phone - 0)) {
    Message({
      type: 'error',
      message: title + '不是正确手机号！'
    });
    return true
  }
  return false
}

// 打开新地址
export function openExcelDown(url, obj) {
  window.open(url + '?' + Qs.stringify(obj))
}

export function resize () {
  window.addEventListener('resize', throttle(function () {
    store.commit('设置屏幕宽度', window.innerWidth)
  }), 500)
}
