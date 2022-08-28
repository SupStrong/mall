import {
  formatDate
} from '@/libs/utils'
import store from '../store'
import cityJson from '@/assets/js/json.js'
const filters = {
  filter: (value, key, props) => {
    let propList = props ? [value, ...props] : [value]
    if (key && (value || value === 0)) return filters[key].apply(this, propList)
    else if (value === 0) return value
    else return value || '-'
  },

  config: (value, type) => {
    let configList = store.state.Config.config
    console.log(value, type, configList)
    let name = null
    configList[type].map(item => {
      if (item.dictCode === value) {
        name = item.dictName
      }
      return item
    })
    return name
  },

  formatDate: (date = '2018-08-08 00:00:00', format = 'yyyy-MM-dd hh:mm:ss') => {
    if (date > 1000000000000) {
      date = date / 1000
    }
    return formatDate(date, format)
  },
  // 获取时间
  dateInfo: (date, formats) => { // 获取时间
    let Info = dateFormat(date, formats)
    return Info
  },
  mobile: mobile => {
    mobile = mobile + ''
    return `${mobile.substr(0, 3)}****${mobile.substring(7)}`
  },

  week: value => {
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return week[value]
  },

  thousand: value => {
    return `${value / 1000}k`
  },

  whether: value => {
    return parseInt(value) ? '是' : '否'
  },

  is_enable: value => {
    return parseInt(value) ? '正常' : '已停用'
  },

  gender: value => {
    switch (parseInt(value)) {
      case 1:
        return '男'
      case 2:
        return '女'
      case 3:
        return '保密'
      default:
        break
    }
  },
  settle_type: value => {
    switch (parseInt(value)) {
      case 0:
        return '其它'
      case 1:
        return '单结'
      case 2:
        return '周结'
      case 3:
        return '月结'
      default:
        break
    }
  },
  order_status: value => {
    switch (parseInt(value)) {
      case 0:
        return '未付款'
      case 1:
        return '已付款,未发货'
      case 2:
        return '已发货,未确认'
      case 3:
        return '已确认(交易成功)'
      case 4:
        return '手动取消'
      case 5:
        return '交易失败 '
      case 11:
        return '待服务'
      case 12:
        return '服务中'
      case 13:
        return '服务完成待确认 '
      case 14:
        return '订单完成'
      case 15:
        return '订单完成'
      case 16:
        return '订单完成'
      case 17:
        return '订单完成'
      case 18:
        return '订单完成'
      case 19:
        return '订单完成'
      case 29:
        return '订单交易关闭'
      case 30:
        return '订单取消'
      default:
        break
    }
  },
  pay_status: value => {
    switch (parseInt(value)) {
      case 0:
        return '等待支付'
      case 1:
        return '已支付'
      case 12:
        return '无需支付'
      default:
        break
    }
  },
  isSub: value => {
    return parseInt(value) === 1 ? '主观' : '客观'
  },
  hidePhone: value => {
    return value.substr(0, 3) + '****' + value.substr(7)
  },
  productStatus: value => {
    switch (parseInt(value)) {
      case 1:
        return '待上架'
      case 2:
        return '已上架'
      case 3:
        return '已下架'
      default:
        break
    }
  },

  auditStatus: value => {
    switch (parseInt(value)) {
      case 1:
        return '待审核'
      case 2:
        return '已结算'
      case 3:
        return '审核拒绝'
      case 4:
        return '异常'
      case 5:
        return '待结帐'
      default:
        break
    }
  },

  settleAccountsStatus: value => {
    switch (parseInt(value)) {
      case 1:
        return '待结账'
      case 2:
        return '已结账'
      default:
        break
    }
  },

  // 来源渠道
  channelSource: value => {
    switch (parseInt(value)) {
      case 0:
        return '官网'
      case 1:
        return '微信管家小程序'
      case 2:
        return '支付宝管家小程序'
      case 3:
        return 'H5'
      case 4:
        return '熊洞智家APP'
      case 5:
        return '微信保洁小程序'
      case 6:
        return '居然积分商城'
      case 7:
        return '居然关系'
      case 8:
        return '亿家净水天猫旗舰店'
      case 9:
        return '供应商下单'
      case 10:
        return '管家Android APP'
      case 11:
        return '管家iOS APP'
      case 12:
        return '散单客户'
      case 13:
        return '京东旗舰店'
      case 14:
        return '熊洞智家美团点评 '
      case 15:
        return '熊洞智家官方旗舰店'
      case 16:
        return '居然之家建材旗舰店'
      case 17:
        return '京东JOS平台'
      case 18:
        return '到位'
      case 20:
        return '京东JOS汉斯希尔'
      default:
        break
    }
  },
  // 供应商状态
  merchantCheckStatus: value => {
    switch (parseInt(value)) {
      case 0:
        return '未确认'
      case 1:
        return '已确认'
      case 2:
        return '异常'
      default:
        break
    }
  },
  // jms状态
  platformCheckStatus: value => {
    switch (parseInt(value)) {
      case 0:
        return '未确认'
      case 1:
        return '已确认'
      case 2:
        return '异常'
      default:
        break
    }
  },
  // 详情服务类目
  serviceType: value => {
    switch (parseInt(value)) {
      case 1:
        return '安装'
      case 2:
        return '维修'
      case 3:
        return '耗材更换(滤芯等)'
      case 4:
        return '其他'
      case 5:
        return '免费移机'
      case 6:
        return '免费换芯'
      case 7:
        return '收费换芯'
      case 8:
        return '收费拆装'
      case 9:
        return '上门保养'
      default:
        break
    }
  },
  // 阅读状态
  readingState: value => {
    switch (parseInt(value)) {
      case 0:
        return '未读'
      case 1:
        return '已读'
      default:
        break
    }
  },
  // 供应商账户管理
  // 入账状态
  accounting: value => {
    switch (parseInt(value)) {
      case 2:
        return '已结账'
      case 1:
        return '未结账'
      default:
        break
    }
  },
  // 收款状态
  receivables: value => {
    switch (parseInt(value)) {
      case 2:
        return '已收款'
      case 1:
        return '未收款'
      default:
        break
    }
  },
  // 开票状态
  invoice: value => {
    switch (parseInt(value)) {
      case 2:
        return '已开票'
      case 1:
        return '未开票'
      default:
        break
    }
  },
  // 收支类型
  inAndOut: value => {
    switch (parseInt(value)) {
      case 1:
        return '收入'
      case 2:
        return '支出'
      default:
        break
    }
  },
  // 确认状态
  examineStatus: value => {
    switch (parseInt(value)) {
      case 0:
        return '未审核'
      case 1:
        return '已审核'
      case 2:
        return '有异议'
      default:
        break
    }
  },
  // 入账状态
  settleStatus: value => {
    switch (parseInt(value)) {
      case 0:
        return '未入账'
      case 1:
        return '已入账'
      default:
        break
    }
  },
  // 账单确认状态
  confirmStatusSupply: value => {
    switch (parseInt(value)) {
      case 0:
        return '待对账'
      case 1:
        return '对账中'
      case 2:
        return '对账完成'
      default:
        break
    }
  },
  // 账单收款状态
  receivablesMonthlyAccount: value => {
    switch (parseInt(value)) {
      case 0:
        return '未收款'
      case 1:
        return '已收款'
      case 2:
        return '无需付款'
      default:
        break
    }
  },
  // 账单开票状态
  invoiceStatus: value => {
    switch (parseInt(value)) {
      case 0:
        return '已开票'
      case 1:
        return '未开票'
      default:
        break
    }
  },
  // 发票类型
  invoiceType: value => {
    switch (parseInt(value)) {
      case 0:
        return '增值税电子普通发票'
      case 1:
        return '增值税普通发票'
      case 2:
        return '增值税专用发票'
      default:
        return ''
    }
  },
  city: value => {
    let name = loop(cityJson, value)
    return name
  },
  cityId: (province, city, county) => {
    let name = loopReverse(cityJson, province, city, county)
    return name
  },

  cityName: (provinceId, cityId, areaId) => {
    let name = loopReverseName(cityJson, provinceId, cityId, areaId)
    return name
  },

}

function loop(tree, value) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i]['code'] === value) {
      return tree[i].name
    } else {
      let children = tree[i].areaList || tree[i].cityList
      if (children) {
        if (loop(children, value)) {
          return loop(children, value)
        }
      }
    }
  }
}

function loopReverseName(tree, provinceId, cityId, areaId) {
  let provinceName = null
  let cityName = null
  let areaName = null
  for (let a = 0; a < tree.length; a++) {
    if (tree[a]['code'] === provinceId) {
      provinceName = tree[a].name
      for (let b = 0; b < tree[a].cityList.length; b++) {
        if (tree[a].cityList[b]['code'] === cityId) {
          cityName = tree[a].cityList[b].name
          for (let c = 0; c < tree[a].cityList[b].areaList.length; c++) {
            if (tree[a].cityList[b].areaList[c]['code'] === areaId) {
              areaName = tree[a].cityList[b].areaList[c].name
              return {
                provinceName,
                cityName,
                areaName
              }
            }
          }
        }
      }
    }
  }
}

function dateFormat(timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d'

  let zero = function (value) {
    if (value < 10) {
      return '0' + value
    }
    return value
  }

  let myDate = timestamp ? new Date(timestamp) : new Date()

  let year = myDate.getFullYear()
  let month = zero(myDate.getMonth() + 1)
  let day = zero(myDate.getDate())

  let hour = zero(myDate.getHours())
  let minite = zero(myDate.getMinutes())
  let second = zero(myDate.getSeconds())

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
    return ({
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    })[matches]
  })
}

function loopReverse(tree, province, city, county) {
  let provinceId = null
  let cityId = null
  let countyId = null
  if (province === '北京市') {
    province = '北京'
  }
  if (province === '天津市') {
    province = '天津'
  }
  for (let a = 0; a < tree.length; a++) {
    if (tree[a]['name'] === province) {
      provinceId = tree[a].code
      for (let b = 0; b < tree[a].cityList.length; b++) {
        if (tree[a].cityList[b]['name'] === city) {
          cityId = tree[a].cityList[b].code
          for (let c = 0; c < tree[a].cityList[b].areaList.length; c++) {
            if (tree[a].cityList[b].areaList[c]['name'] === county) {
              countyId = tree[a].cityList[b].areaList[c].code
              return {
                provinceId,
                cityId,
                countyId
              }
            }
          }
        }
      }
    }
  }
}

export default filters