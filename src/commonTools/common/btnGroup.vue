<template>
  <span class="btnGroup">
    <el-button
      v-if="anyWhere"
      @click.stop="func(anyButton)"
      :type="getBtnType(anyButton, 'type')"
      :disabled="getDisabledBtn(anyButton,$parent)"
      :size="getBtnType(anyButton, 'size')">
      {{anyButton.title}}
    </el-button>
    <div v-else>
      <el-button
        v-for="(val,key) in buttons.detail"
        :disabled="getDisabledBtn(val,$parent)"
        :type="getBtnType(val, 'type')"
        :size="getBtnType(val, 'size')"
        :key="key"
        @click="func(val)"
      >{{ val.name }}</el-button>
    </div>
    <!-- 列表通用按钮组件 -->
  </span>
</template>

<script>
import { getShowbtn, getDisabledBtn } from '@/assets/js/power'
import { mapGetters } from 'vuex'
export default {
  name: 'btnGroup',
  data () {
    return {
      btnGroup: [],
      flag: false
    }
  },
  computed: {
    ...mapGetters(['getPowerBox', 'authButton']),
    buttons () {
      let btnGroup = this.authButton
      let newGroup = {}
      for (let i in btnGroup) {
        newGroup[i] = btnGroup[i].filter(item => {
          return getShowbtn(item, this.$parent)
        })
      }
      return newGroup
    },
    anyButton () {
      let buttons = this.authButton.other.filter(item => {
        return getShowbtn(item, this.$parent)
      })
      let button = buttons.find(item => {
        return item.jumpUrl === this.buttonName
      })
      return button
    }
  },
  props: {
    index: {
      type: Number,
      default: 1
    },
    isShowObj: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: String,
      default: 'detail'
    },
    buttonName: {
      type: String,
      default: ''
    },
    anyWhere: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getShowbtn,
    getDisabledBtn,
    // 详情的按钮方法传1
    func (row) {
      var obj = JSON.parse(row.menuExtend).method || row.jumpUrl
      var fatherCompent = this.$parent
      var menuExtend = JSON.parse(row.menuExtend)
      var i = 0
      while (i < 10) {
        i++
        if (fatherCompent[obj]) {
          fatherCompent[obj]({
            type: 1,
            parameter: menuExtend.parameter
          })
          return
        } else {
          fatherCompent = fatherCompent.$parent
        }
      }
    },
    // 获取type
    getBtnType (row, str) {
      var result
      try {
        result = JSON.parse(row.menuExtend)[str]
      } catch (error) {
        if (str === 'type') {
          result = 'primary'
        } else {
          result = 'small'
        }
      }
      return result
    }
  }
}
</script>

<style>
.btnGroup {
  overflow: hidden;
  float: left;
  margin: 10px 0;
}
.btnGroup .el-button {
  float: left;
}
</style>
