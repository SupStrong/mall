<template>
  <el-card>
    <div slot="header">
      <span>菜单资源</span>
    </div>
    <template v-for="(item, index) in data">
      <div
        v-if="item.childs.length"
        :key="index"
        style="margin-bottom:30px"
      >
        <div>
          <span class="card-title">{{ item.title }}</span>
        </div>
        <div>
          <div class="menu-list">
            <div class="menu-item" v-for="(menu, key) in item.childs" :key="key">
              <el-button
                style="margin-right:20px"
                :type="selectedNodes.includes(menu.id) ? 'primary' : ''"
                :icon="
                  selectedNodes.includes(menu.id)
                    ? 'el-icon-check'
                    : 'el-icon-full-screen'
                "
                @click="handleButtonClick(menu, item)"
              >
                {{ menu.title }}
              </el-button>
              <div>
                <el-button
                  v-for="(button, buttonKey) in menu.childs"
                  size="mini"
                  class="childs-button"
                  :key="buttonKey"
                  :icon="selectedNodes.includes(button.id) ? 'el-icon-check' : 'el-icon-full-screen'"
                  :type="selectedNodes.includes(button.id) ? 'primary' : ''"
                  @click="handleChange(menu, button.id)"
                >
                  {{ button.title }}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { userApi } from '@/api'
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'childs',
        label: 'title'
      },
      selectedNodes: [], // 选择的所有菜单 按钮id集合
      buttons: [], // 按钮 id集合
      defaultKeys: [],
      defaultButtons: []
    }
  },
  computed: {
    ...mapGetters(['rowData'])
  },
  mounted() {
    this.getTree()
    if (this.$route.query.id) {
      let rowData = Object.assign({}, this.rowData);
      this.selectedNodes = typeof rowData.roleExtend === 'string' ? JSON.parse(rowData.roleExtend).nodes : rowData.roleExtend.nodes
      this.defaultButtons = rowData.buttonAuthorizationList.split(',')
    }
    this.$nextTick(() => {
      this.buttons = this.defaultButtons
    })
  },
  methods: {
    async getTree() {
      try {
        let data = (await userApi.getMenuList({
          isEnabled: true,
          category: 2
        }))
        if (data.data.statusCode === 200) {
          this.data = this.getTitle(data.data.data)
        }
      } catch (err) {
        console.error(err)
      } finally {

      }
    },

    getTitle(data) {
      data.map(item => {
        item.title = JSON.parse(item.menuExtend).title
        if (item.childs) {
          this.getTitle(item.childs)
        }
        return item
      })
      return data
    },

    handleButtonClick(data, parent) {
      console.log(parent)
      if (this.selectedNodes.includes(data.id)) {
        this.spliceId(data.id);
        if (data.childs) {
          data.childs.map((item) => {
            this.spliceId(item.id);
          });
        }
      } else {
        this.selectedNodes.push(data.id);
      }
      parent.childs.map(item => {
        if (this.selectedNodes.includes(item.id)) {
          if (!this.selectedNodes.includes(parent.id)) {
            this.selectedNodes.push(parent.id);
          }
        }
      })
      let obj = {
        buttons: this.buttons,
        nodes: this.selectedNodes
      }
      this.$emit('getAuthNodes', obj)
      this.$forceUpdate();
    },
    handleChange(data, currentId) {
      if (!this.selectedNodes.includes(currentId)) {
        if (!this.selectedNodes.includes(data.id)) {
          this.selectedNodes.push(data.id);
        }
        this.selectedNodes.push(currentId);
        this.buttons.push(currentId)
      } else {
        this.spliceId(currentId);
      }
      let obj = {
        buttons: this.buttons,
        nodes: this.selectedNodes
      }
      this.$emit('getAuthNodes', obj)
      this.$forceUpdate();
    },
    spliceId(id) {
      let index = this.selectedNodes.indexOf(id);
      let buttonIndex = this.buttons.indexOf(id);
      if (index >= 0) {
        this.selectedNodes.splice(index, 1);
      }
      if (buttonIndex >= 0) {
        this.buttons.splice(buttonIndex, 1)
      }
    },
  }
}
</script>
<style scoped lang="less">
.card-title {
  color: #409EFF;
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  border-left: 3px solid #409EFF;
  display: block;
  margin-bottom: 20px;
}
.menu-item {
  display: flex;
  margin-bottom: 20px;
}
.childs-button {
  margin-left: 10px;
  margin-top: 2px;
}
</style>