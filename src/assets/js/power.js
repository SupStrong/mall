// 权限js
import store from '@/store/index.js'
import models from '@/libs/models'
import { deepCopy } from '@/assets/js/cookie'
import { Message } from 'element-ui'
import router from '@/router/index.js'
export function Logout () {
  router.push('/login')
  setTimeout(() => {
    store.commit('设置user', null)
    store.commit('设置权限', [])
    store.commit('设置路由', null)
    store.commit('清空标签', [])
  }, 500)
}
// 按钮显示逻辑
export function getShowbtn (val, that) {
  var step = val.jumpUrl || JSON.parse(val.menuExtend).method
  if (step === 'openCode') {
    if (store.state.Order.orderDetail && store.state.Order.orderDetail.workOrderInfoVo && store.state.Order.orderDetail.workOrderInfoVo.externalStatus === 2) {
      return true
    }
    return false
  }
  // 已确认
  if (step === 'confirmed') {
    for (let i = 0; i < that.RecordTableData; i++) {
      if (that.RecordTableData[i].budgetMode !== 0) {
        return false
      }
    }
  }
  // 未确认
  if (step === 'completeRecord') {
    for (let i = 0; i < that.RecordTableData; i++) {
      if (that.RecordTableData[i].budgetMode !== 1) {
        return false
      }
    }
  }
  // 分配按钮隐藏
  if (step === 'allottedWorkOrder') {
    if (window.location.href.indexOf('workOrderDetail') > 0) {
      if (store.state.Order.orderDetail.workOrderStatusInfoVo && store.state.Config.config.dispatch_work_statuss.includes(store.state.Order.orderDetail.workOrderStatusInfoVo.workStatus)) {
        return true
      }
    } else {
      return true
    }
    return false
  }

  // 麦田短信
  if (step === 'sendtWheatlandMessage') {
    if (store.state.Order.orderDetail && store.state.Order.orderDetail && store.state.Order.orderDetail.channel && store.state.Order.orderDetail.channel.id - 0 === 33) {
      return true
    }
    return false
  }

  // 麦田短信工单
  if (step === 'sendtWheatlandWork') {
    if (store.state.Order.orderDetail && store.state.Order.orderDetail && store.state.Order.orderDetail.workOrderInfoVo.channelId - 0 === 33) {
      return true
    }
    return false
  }

  if (step === 'JdOrderFeedback') {
    if (store.state.Order.orderDetail && store.state.Order.orderDetail.workOrderInfoVo && store.state.Order.orderDetail.workOrderInfoVo.externalStatus === 2) {
      return true
    }
    return false
  }
  return true
}
// 按钮禁用逻辑
export function getDisabledBtn (val, that) {
  var step = val.jumpUrl
  if (step === 'openCode') {
    if (store.state.Config.config.disable_called_work_statuss.includes(store.state.Order.orderDetail.workOrderStatusInfoVo.workStatus)) {
      return false
    }
    return true
  }
  return false
}

// 获取table按钮
export function getTableBtn () {
  return store.state.Auth.authButton.list
}

// 解析数据权限
export function resolvePowerData (data) {
  var box = null
  if (!data) {
    return box
  }
  try {
    box = JSON.parse(data.dataExtend)
  } catch (error) {
    box = null
  }
  if (box && box.order) {
    box.order.Ordercity = box.order.Ordercity.map(val => {
      return val.code
    })
    box.work.WorkCity = box.work.WorkCity.map(val => {
      return val.code
    })
    box.supplier = box.supplier.map(val => {
      return val.id
    })
  }
  if (box === null) {
    return deepCopy(models.dataPower)
  }
  return box
}

export function diffRouter (localRoutes = [], remoteRoutes) {
  let diffRoutes = []
  if (remoteRoutes.length === 0) {
    Message({
      type: 'error',
      message: '暂无权限，请联系相关人员添加权限'
    })
    localRoutes.children = localRoutes.children.splice(0, 1)
    return localRoutes
  }
  remoteRoutes.map(item => {
    localRoutes.map(item2 => {
      if (item2.path === item.jumpUrl) {
        item2.meta = {
          title: JSON.parse(item.menuExtend).title,
          keepAlive: JSON.parse(item.menuExtend).keepAlive,
          icon: item.icon
        }
        if (JSON.parse(item.menuExtend).keepAlive) {
          store.commit('设置缓存列表', item.name)
        }
        item2.path = item.jumpUrl
        item2.name = item.name
        item2.noShow = item.isHidden
        let children = Object.assign({}, item2)
        if (item.childs.length && item.level === 1) {
          children.children = diffRouter(item2.children, item.childs)
        } else if (item.level === 2) {
          children.meta.buttons = item.childs
        }
        diffRoutes.push(children)
      }
    })
  })
  return diffRoutes
}
