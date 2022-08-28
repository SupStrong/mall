import { routerMap } from '@/router/index'

export default {
  state: routerMap,
  getters: {
    routerMap: state => {
      return state
    }
  }
}
