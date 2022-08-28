<template>
  <div>
    <el-tree
      :data="getPowerBox"
      show-checkbox
      ref="tree"
      @check-change="handleChange"
      node-key="id"
      :accordion="true"
      :expand-on-click-node="true"
      :props="defaultProps"
      :render-content="renderContent"
    ></el-tree>
    <!--   :check-strictly="true" -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      defaultProps: {
        children: 'childs',
        label: 'title'
      },
      selectedNodes: [], // 选择的所有菜单 按钮id集合
      buttons: [] // 按钮 id集合
    }
  },
  computed: {
    ...mapGetters(['getPowerBox'])
  },
  activated () {
    setTimeout(() => {
      this.$refs.tree.setCheckedKeys(this.defaultKeys)
    }, 20)
  },
  props: {
    // 默认选中的id集合
    defaultKeys: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleChange (data, checked, node) {
      this.selectedNodes = this.$refs.tree.getCheckedNodes().map(item => {
        return (item = item.id)
      })
      this.buttons = this.$refs.tree.getCheckedNodes(false, true).map(item => {
        return (item = item.id)
      })
      let obj = {
        buttons: this.buttons,
        nodes: this.selectedNodes
      }
      this.$emit('getAuthNodes', obj)
    },
    renderContent (h, { node, data, store }) {
      if (data.level === 1) {
        return (
          <span class="custom-tree-node">
            <span style="color:#409EFF">{node.label}（一级菜单资源）</span>
          </span>)
      } else if (data.level === 2) {
        return (
          <span class="custom-tree-node">
            <span style="color:#67C23A">{node.label}（二级菜单资源）</span>
          </span>)
      } else {
        return (
          <span class="custom-tree-node">
            <span style="color:#F56C6C">{node.label}（操作按钮）</span>
          </span>)
      }
    }
  }
}
</script>
