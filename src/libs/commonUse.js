import Vue from 'vue'

// 公共报错
const errorAlert = (data) => {
  let ua = navigator.userAgent

  let errorLog = `USERAGENT: [${ua}]`
  if (data.data && data.data.errors) {
    let errKey = Object.keys(data.data.errors)[0],
      errMsg = data.data.errors[errKey][0].err_msg
    if (errMsg === '') errMsg = data.data.errors[errKey][0].err_no
    Vue.prototype.$message.error(errMsg)
    console.error(`${errorLog}, ERRKEY: ${errKey}, ERRMSG: ${errMsg}`)
  }
}
Object.defineProperty(Vue.prototype, '$error', { value: errorAlert })

// isArray函数
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// 去掉为空的项
const generateParams = (result = {}, before = {}, isEdit = false) => {
  let temp = {}
  if (isEdit) { // 如果是编辑，则判断是否改过
    for (let i in result) {
      if (result[i] !== before[i]) {
        temp[i] = result[i]
      } else if (before[i] !== '' && before[i] !== null) {
        temp[i] = before[i]
      }
    }
  } else {
    for (let i in result) {
      if (result[i] !== '' && result[i] !== null) {
        temp[i] = result[i]
      }
    }
  }
  return temp
}
Object.defineProperty(Vue.prototype, '$generateParams', { value: generateParams })

// 数组对象去重
const unique = (arr) => {
  if (!arr) return arr
  let temp = new Set(arr.map(item => JSON.stringify(item)))
  return Array.from(temp).map(item => JSON.parse(item))
}
Object.defineProperty(Vue.prototype, '$unique', { value: unique })
