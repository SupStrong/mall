import store from '../store'
export default function getDictConfig(params) {
  let localConfig = Object.keys(store.state.Config.config)
  if (params.length) {
    params.map(item => {
      if (!localConfig.some(key => {
        return key === item.name
      })) {
        store.dispatch('GET_CONFIG', item)
      }
      return item
    })
  }
}
