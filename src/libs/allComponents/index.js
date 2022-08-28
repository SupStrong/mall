import button from '@/components/tools/handleButtons'
import time from '@/components/tools/timePicker'
import search from '@/components/tools/searchField'
// 全局按钮组件
const jmsComponents = {
  components: [
    button,
    time,
    search
  ],
  install: function (Vue, opts = {}) {
    this.components.map(component => {
      Vue.component(component.name, component)
    })
  }
}

export default jmsComponents
