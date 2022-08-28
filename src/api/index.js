import { api } from './axios'
import Vue from 'vue'

export const authApi = {
  // 登录
  login({
    mobile,
    password,
    userType,
    loginType,
    captchaText,
    captchaSerialNum
  } = {}) {
    return api.post(Vue.prototype.auth + '/singlesignon', {
      mobile,
      password,
      userType,
      loginType,
      captchaText,
      captchaSerialNum
    })
  },
  regist({
    mobile,
    password,
    userType
  } = {}) {
    return api.post(Vue.prototype.auth + '/admin/add', {
      mobile,
      password,
      userType
    })
  },

  // 统一登录认证
  sso({
    jrwyToken,
    userType
  } = {}) {
    return api.post(Vue.prototype.auth + '/ssoauthentication', {
      jrwyToken,
      userType
    })
  },

  ssoLogout({
    jrwyToken,
    userType
  }) {
    return api.post(Vue.prototype.auth + '/ssologout', {
      jrwyToken,
      userType
    })
  },

  // 获取序列号
  serialNumber() {
    return api.get(Vue.prototype.web + '/captcha/captchaserialnum')
  },
  // 获取图形验证码
  graphicCode({
    captchaSerialNum
  } = {}) {
    return api.get(Vue.prototype.user + '/captcha/create', {
      params: {
        captchaSerialNum
      },
      responseType: 'blob'
    })
  },
  // 验证图形验证码
  VGraphicCode({
    captchaSerialNum,
    inputText
  } = {}) {
    return api.get(Vue.prototype.web + '/captcha/checkcaptcha', {
      params: {
        captchaSerialNum,
        inputText
      }
    })
  }
}
