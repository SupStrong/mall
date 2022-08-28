// export const SET_SKIN = '设置主题色'
// export default {
//   state: {
//     skinType: localStorage.getItem('skinType') ? '#F17B20' : '#000000',
//   },
//   getters: {
//     getSkinType: state => state.skinType,
//   },
//   mutations: {
//     [SET_SKIN] (state, type) {
//       localStorage.setItem('skinType', type)
//       state.skinType = type
//     }
//   }
// }
export const SET_CLEAR = '设置是否清除'
export const SET_SKIN = '设置主题色'
export const SET_SCREEN_WIDTH = '设置屏幕宽度'
export const SET_SCREEN_HEIGHT = '设置屏幕高度'
export default {
  state: {
    isClear: false,
    skinType: localStorage.getItem('skinType') === null ? '#409EFF' : localStorage.getItem('skinType'),
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  },
  getters: {
    getSkinType: state => state.skinType,
    getClearState: state => state.isClear,
    getScreenWidth: state => state.screenWidth,
    getScreenHeight: state => state.screenHeight
  },
  mutations: {
    [SET_CLEAR] (state, status) {
      state.isClear = status
      setTimeout(() => {
        state.isClear = false
      }, 50)
    },
    [SET_SKIN] (state, type) {
      if (type) {
        localStorage.setItem('skinType', type)
        state.skinType = type
      }
    },
    [SET_SCREEN_WIDTH] (state, width) {
      state.screenWidth = width
    },
    [SET_SCREEN_HEIGHT] (state, height) {
      state.screenHeight = height
    }
  }
}

