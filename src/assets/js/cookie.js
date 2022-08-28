import {
  Message
} from 'element-ui'
import deImg from '@/assets/images/indexBg.png'
import router from '@/router/index'
import Qs from 'qs'
export function setCookie(name, value, expiredays) {
  var date = new Date()
  date.setDate(date.getDate() + expiredays)
  document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + date.toGMTString())
}
export function getCookie(name) {
  var cookieBox = document.cookie.split('; ')
  var result = ''
  cookieBox.forEach(val => {
    var box = val.split('=')
    if (box[0] === name) {
      result = box[1]
      return false
    }
  })
  return result
}

// 转化时间（时分秒）
export function getAllTime(time) {
  if (!time) {
    return ''
  }
  if (isNaN(time - 0)) {
    return time
  }
  let result = new Date(time - 0)
  let year = result.getFullYear()
  let month = result.getMonth() + 1
  let day = result.getDate()
  let hours = result.getHours()
  let minuter = result.getMinutes()
  let s = result.getSeconds()
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minuter < 10 ? '0' + minuter : minuter}:${s < 10 ? '0' + s : s}`
}
// 转化时间（年月日）
export function getTime(time) {
  if (!time) {
    return ''
  }
  if (isNaN(time - 0)) {
    return time
  }
  let result = new Date(time - 0)
  let year = result.getFullYear()
  let month = result.getMonth() + 1
  let day = result.getDate()
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}
// 校验手机号
export function checkPhone(phone, title) {
  var rex = /^1\d{10}$/
  if (!rex.test(phone - 0)) {
    Message({
      type: 'error',
      message: title + '不是正确手机号！'
    })
    return true
  }
  return false
}
// 检验数字
export function checkNumber(number, title) {
  if (isNaN(number - 0)) {
    Message({
      type: 'error',
      message: title + '不是数字！'
    })
    return true
  }
  return false
}
// 去掉参数中的空串
export function trim(obj) {
  for (let i in obj) {
    if (obj[i] === '') {
      obj[i] = null
    }
  }
}
// 全局回退
export function back() {
  router.back()
}
// 深度克隆
export function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (let i in obj) {
    if (Object.prototype.toString.call(obj[i]) === '[object Object]' || Object.prototype.toString.call(obj[i]) === '[object Array]') {
      result[i] = deepCopy(obj[i])
    } else {
      result[i] = obj[i]
    }
  }
  return result
}

// 服务商合作类型
export const serverType = {
  '': '',
  0: '服务商',
  1: '管家平台'
}
// 工程师状态
export const jsStatus1 = {
  '': '全部',
  0: '其他',
  1: '单结',
  2: '周结',
  3: '月结'
}
// 对账单状态
export const billStatus = {
  '': '全部',
  '0': '待对账',
  '1': '对账中',
  '2': '对账完成',
  '3': '待付款',
  '4': '已付款'
}
// 账单生成审核状态
export const examineStatus = {
  '': '全部',
  '1': '结算审核通过'

}
//
export const reconcStatus = {
  '1': '待确认',
  '2': '已确认'
}
// 结算单-审核状态
export const audStatus = {
  '0': '待审核',
  '1': '已通过',
  '2': '未通过'
}
// 结算对象
export const settleObj = {
  '0': '供应商',
  '1': '服务商',
  '2': '工程师'
}
// 匹配修改状态
export const matchingStatus = {
  '-1': '全部',
  '0': '未确认',
  '1': '已确认',
  '2': '异常'
}
export const jsStatus = {
  '': '全部',
  0: '工作中',
  1: '在职',
  2: '已离职',
  3: '兼职',
  4: '停用',
  5: '正常'
}
// 直营工程师状态
export const selfJsStatus = {
  0: '全部',
  1: '直营',
  2: '加盟'
}
// 审核状态
export const jsExamineStatus = {
  0: '待审核',
  1: '审核未通过',
  2: '审核已通过'
}
// 认证状态
export const reasonStatus = {
  0: '待认证',
  1: '认证未通过',
  2: '认证已通过'
}

// 认证历史，操作状态
export const accountStatus = {
  0: '待审核',
  1: '审核未通过',
  2: '审核已通过',
  3: '修改',
  4: '认证未通过',
  5: '认证通过'
}

// 服务商状态
export const serverStaus = {
  '': '',
  0: '',
  1: ''
}
// 服务商的状态
export const serverStaus1 = {
  0: '服务商',
  1: '管家平台'
}
// 回执状态
export const called = {
  0: '等待回执',
  1: '完成',
  2: '空跑，客户不在家',
  3: '服务商拒绝',
  4: '关单',
  5: '联系不上客户',
  6: '客户有事，服务搁置',
  7: '装备未带齐',
  8: '其他'
}
// 退款状态
export const refundStatus = {
  0: '无需退款',
  1: '退款,审核中',
  3: '审核通过，退款中',
  2: '退款被驳回',
  4: '退款完成'
}
// '付款类型
export const payType = {
  1: '用户支付',
  2: '用户退款',
  3: '附加费用',
  4: '长期订单费用',
  5: '充值费用'
}
// 定工单入账记录
export const importType = {
  0: '微信',
  1: '支付宝',
  2: '现金'
}
// 支付方式
export const payAction = {
  0: '支付宝小程序',
  1: '支付宝app',
  2: '支付宝网页支付',
  3: '微信app支付',
  4: '微信网页扫码支付',
  5: '微信公众号支付',
  6: '微信h5网页支付',
  8: '支付宝面对面支付'
}
// 订单状态
export const status = {
  0: '未付款',
  1: '已付款,未发货',
  2: '已发货,未确认',
  3: '已确认(交易成功)',
  4: '手动取消',
  5: '交易失败',
  11: '等待派工',
  12: '服务中',
  13: '服务完成待确认',
  14: '订单完成',
  15: '默认完成',
  16: '确认完成余款未付',
  17: '确认完成余款已付',
  18: '默认完成余款未付',
  19: '默认完成余款已付',
  29: '订单交易关闭',
  30: '自动取消'
}

export const searchOrderStatus = {
  0: '未付款',
  1: '已付款,未发货',
  2: '已发货,未确认',
  3: '已确认(交易成功)',
  4: '手动取消',
  5: '交易失败',
  11: '等待派工',
  12: '服务中',
  13: '服务完成待确认',
  14: '订单完成',
  15: '默认完成',
  16: '确认完成余款未付',
  17: '确认完成余款已付',
  18: '默认完成余款未付',
  19: '默认完成余款已付',
  29: '订单交易关闭',
  30: '自动取消'
}
export const payTime = { // 支付方式
  0: '后付款',
  1: '预付款',
  2: '已付款'
}
export const settlementType = { // 支付方式
  1: '单结',
  2: '周结',
  3: '月结'
}
// 支付状态
export const payStatus = {
  0: '支付中',
  1: '已支付',
  2: '已退款',
  3: '支付错误',
  4: '已关闭'
}
// 订单来源
export const orderStatus = {
  0: '官网',
  1: '微信小程序',
  2: '支付宝小程序',
  3: 'H5',
  4: '熊洞智家APP',
  5: '微信保洁小程序',
  6: '居然积分商城',
  7: '居然关系',
  8: '亿家净水天猫旗舰店',
  9: '供应商下单',
  10: '管家Android APP',
  11: '管家iOS APP',
  12: '散单客户',
  13: '京东旗舰店',
  14: '熊洞智家美团点评',
  15: '熊洞智家官方旗舰店',
  16: '居然之家建材旗舰店',
  17: '京东JOS平台',
  18: '到位',
  20: '京东JOS汉斯希尔',
  21: '九阳',
  22: '京东JOS阿诗丹顿',
  23: '平台下单',
  24: 'api',
  25: '京东JOS平台api',
  26: '亿家净水(yws)',
  27: '京东JOS352',
  28: '微信我的家小程序',
  29: 'IOS我的家',
  30: 'Android我的家',
  31: '平台代供应商下单'
}

// 审核状态
export const checkStatus = {
  0: '全部',
  1: '待审核',
  2: '审核通过',
  3: '审核拒绝',
  4: '异常'
}
// 工单状态
export const workStatus = {
  11: '待分配服务商',
  12: '服务商待接单',
  13: '待分配工程师',
  14: '工程师待接单',
  15: '工程师已接单,待服务',
  16: '工程师服务中',
  17: '工单回执',
  18: '服务完成',
  19: '工单完成',
  20: '工单完成',
  21: '工单完成',
  22: '工单完成',
  23: '工单关闭'
}
// 查询工单
export const searchStatus = {
  11: '待分配服务商',
  12: '服务商待接单',
  13: '待分配工程师',
  14: '工程师待接单',
  15: '工程师已接单,待服务',
  16: '工程师服务中',
  18: '服务完成',
  '19,20,21,22': '工单完成',
  23: '工单关闭'
}
// 服务类型
// 工单类型
export const workType = {
  2: '安装',
  5: '维修',
  6: '耗材',
  8: '业务',
  0: '其他'
}
// 财务类型
export const category = {
  '': '全部',
  0: '入款',
  1: '退款'
}
// 收支类型
export const budgetType = {
  '': '全部',
  1: '订单服务费',
  2: '代收货款',
  3: '服务充值/提现',
  4: '保证金',
  5: '其他'
}
// 收支方式
export const budgetModel = {
  '': '全部',
  1: '线上支付',
  2: '银行转账',
  3: '线下支付'
}
// 收支账号
export const budgetAccount0 = {
  0: '微信1518503871',
  1: '微信1525936631',
  2: ' 支付宝：jrwy@shui.cn',
  3: '支付宝：pay@4001555151.com',
  4: '居然无忧-工行北京海运仓支行-3592'
}
// 收支账号之线上支付
export const budgetAccount1 = {
  1: '微信1525936631',
  2: ' 支付宝：jrwy@shui.cn'

}
// 收支帐号之线下支付
export const budgetAccount2 = {
  0: '微信1518503871',
  3: '支付宝：pay@4001555151.com'

}
// 收支账号之银行转账
export const budgetAccount3 = {
  4: '居然无忧-工行北京海运仓支行-3592'
}
// 确认状态
export const State = {
  '': '全部',
  0: '未确认',
  1: '已确认'
}
// 类目类型
export const typeStatus = {
  '': '全部',
  0: '服务类目',
  1: '实物类目',
  2: '套餐类目'
}
// 客服备注类型
export const girlType = ['反馈', '提醒', '预约', '报修', '费用', '远程费备注', '标签', '其他']
export const shopStatus = {
  1: '待上架',
  2: '已上架',
  3: '已下架',
  null: '全部商品'
}
// 结账状态
export const settleAccountsStatus = {
  1: '待结账',
  2: '已结账'
}
// 工程师结算类型
export const jsSumbit = {
  0: '其他',
  1: '单结',
  2: '周结',
  3: '月结'
}
// 消息部分的状态
export const mesgStatus = {
  1: '短信',
  2: '站内信',
  3: '公告',
  4: '推送消息',
  5: '电子邮件'
}
export const mesguser = {
  0: '全部',
  1: '普通会员',
  2: '工程师',
  3: '管理员',
  4: '服务商',
  5: '供应商'
}
// 京东结算类型
// 1审批中，3审核通过，4审核不通过，5已提交收付款，6收付款成功，7出纳驳回，失败，23开电子收据成功
export const jDStatus = {
  100: '未提交审核',
  1: '审批中',
  3: '审核通过',
  4: '审核不通过',
  5: '已提交收付款',
  6: '收付款成功',
  7: '出纳驳回，失败',
  23: '开电子收据成功'
}
// 审核结果
export const auditStatus = {
  1: '待审核',
  2: '审核通过',
  3: '审核拒绝',
  4: '异常'
}
export const audit = {
  1: '待结算',
  2: '已结算',
  3: '已结算',
  4: '已结算'
}
// 商品展示
export const shopShow = {
  0: '全部显示',
  1: 'c端显示',
  2: 'b端显示',
  3: 'jms显示'
}

export const activationStatus = {
  0: '未激活',
  1: '待激活',
  2: '已激活'
}
// 显示规则
export const showType = {
  0: '全部显示',
  1: 'c端显示',
  2: 'b端显示',
  3: 'jms显示'
}
export const JRWY = 1001
// 获取配置
export function getAsynConfig(attr) {
  return window.asynConfig[attr]
}
// 保存两位小数，去掉后面的0
export function getPrice(a) {
  return parseFloat(a.toFixed(2))
}
// 兼容老数据 显示图片
export function computedImgUrl(imgUrl) {
  let url
  if (imgUrl) {
    url = imgUrl.replace(/data/g, 'https://file.bearhome.cn/data')
  }
  try {
    if (imgUrl && imgUrl.indexOf('http') !== -1) {
      return imgUrl
    }
  } catch (error) {
    return deImg
  }
  if (url && url.length > 5) {
    return url
  } else {
    return deImg
  }
}
// 节流
export function throttel(func, day) {
  var timer = false
  var argu = Array.prototype.splice.call(arguments, 2)
  return function () {
    if (timer) {
      return
    }
    func.apply(this, argu)
    timer = true
    setTimeout(function () {
      timer = false
    }, day)
  }
}
// 防抖
export function shake(func, day) {
  var timer
  var argu = Array.prototype.splice.call(arguments, 2)
  return function () {
    if (timer) {
      window.clearTimeout(timer)
    }
    timer = setTimeout(function () {
      func.apply(this, argu)
    }, day)
  }
}
// 导出表格
export const excelDown = function (data, title) {
  let url = window.URL.createObjectURL(new Blob([data]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', title)
  document.body.appendChild(link)
  link.click()
}

// 打开新地址
export function openExcelDown(url, obj) {
  window.open(url + '?' + Qs.stringify(obj))
}

export function handleNull(value) {
  if (value === undefined) {
    return '--'
  } else {
    return value.replace(/null/g, '--')
  }
}