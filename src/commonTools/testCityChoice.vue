<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="服务城市：">
        <el-input v-model="filterText" placeholder="请输入服务城市名称" clearable></el-input>
      </el-form-item>
    </el-form>
    <el-tree
      :data="data"
      show-checkbox
      accordion
      node-key="id"
      :default-checked-keys="defaultCheckedKeysList"
      :props="defaultProps"
      :render-content="renderContent"
      ref="tree"
      :filter-node-method="filterNode"
      @check-change="handleCheckChange"
      @node-click="nodeClick">
    </el-tree>
  </div>
</template>

<script>
import AllCity from '@/assets/js/json2.js'
export default {
  data () {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  props: {
    defaultCheckedKeysList: {
      type: Array
    }, // 默认展示
    layer: {
      type: Number,
      required: false,
      default: 0
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
    if (this.layer - 0 === 2) {
      AllCity.map((item, index) => {
        item.type = 1
        item.provinceId = item.id
        item.index = index
        if (item.children) {
          item.children.map((item2, index2) => {
            item2.type = 2
            item2.provinceId = item.id
            item2.cityId = item2.id
            item2.provinceIndex = index
            item2.index = index2
            if (item2.children) {
              delete item2.children
            }
          })
        }
      })
    } else {
      AllCity.map((item, index) => {
        item.type = 1
        item.provinceId = item.id
        item.index = index
        if (item.children) {
          item.children.map((item2, index2) => {
            item2.type = 2
            item2.provinceId = item.id
            item2.cityId = item2.id
            item2.provinceIndex = index
            item2.index = index2
            if (item2.children) {
              item2.children.map(item3 => {
                item3.type = 3
                item3.provinceId = item.id
                item3.provinceIndex = index
                item3.cityId = item2.id
                item3.cityIndex = index2
                item3.areaId = item3.id
              })
            }
          })
        }
      })
    }

    this.data = AllCity
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 选中
    handleCheckChange (data, checked, indeterminate) {
      this.$emit('testCityChoice', {
        data: this.$refs.tree.getCheckedNodes(),
        checked: checked
      })
    },
    // 点击节点
    nodeClick (data, checked, indeterminate) {
      if (checked.level === 2 && checked.childNodes.some(item => item.checked)) {
        let checkedObj = []
        checked.childNodes.map(item => {
          if (item.checked) {
            checkedObj.push(item.data)
          }
        })
        this.$emit('nodeClick', checkedObj)
      }
    },
    // 设置三级icon
    renderContent: function (h, { node, data, store }) {
      if (data.type === 2 && node.childNodes.some(item => item.checked)) {
        return (
          <span class="custom-tree-node">
            <span style="color:#409EFF">{data.label}</span>  <i class="el-icon-setting"></i>
          </span>)
      } else {
        return (
          <span class="custom-tree-node">
            <span>{data.label}</span>
          </span>)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.el-input{
  width 300px
}
</style>
