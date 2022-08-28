<template>
  <!-- 列表通用菜单组件 -->
  <el-radio-group v-model="obj[params]" @change="radioChange">
    <el-radio-button
      v-for="(val, key) in  menuGroup"
      :key="key"
      :label="val.jumpUrl"
    >{{ val.name }}</el-radio-button>
  </el-radio-group>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'menuGroup',
  data () {
    return {
      menuGroup: []
    }
  },
  props: {
    index: {
      type: Number,
      default: 1
    },
    params: [String],
    obj: [Object],
    type: {
      type: String,
      default: 'btnField'
    }
  },
  created () {
    this.getMenuList()
  },
  computed: {
    ...mapGetters(['getPowerBox'])
  },
  methods: {
    // 清空
    // clear(){
    //   index=0
    // },
    // 菜单改变
    radioChange () {
      this.$emit('radioChange', this.obj[this.params])
    },
    // 详情的按钮方法传1
    func (row) {
      var obj = JSON.parse(row.menuExtend)
      var fatherCompent = this.$parent
      var i = 0
      while (i < 10) {
        i++
        if (fatherCompent[obj.method]) {
          fatherCompent[obj.method]({
            type: 1,
            parameter: obj.parameter
          })
          return
        } else {
          fatherCompent = fatherCompent.$parent
        }
      }
    },
    // 获取菜单按钮
    getMenuList () {
      var box = this.getPowerBox
      for (let i = 0; i < box.length; i++) {
        for (let j = 0; j < box[i].childs.length; j++) {
          if (box[i].childs[j].jumpUrl === this.$router.currentRoute.path) {
            let result = box[i].childs[j].childs.filter(val => {
              try {
                if (JSON.parse(val.menuExtend).position === this.type) {
                  return val
                } else {
                  return false
                }
              } catch (error) {
                if (val.menuExtend.position === this.type) {
                  return val
                } else {
                  return false
                }
              }
            })
            this.menuGroup = result
            return
          }
        }
      }
    }
  }
}
</script>

<style>
</style>
