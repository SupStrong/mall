<template>
  <div class="tab-box">
    <div class="tab-icon">
      <i class="el-icon-arrow-left"></i>
    </div>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabs.tabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <div class="tab-icon"><i class="el-icon-arrow-right"></i></div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      editableTabsValue: '',
    }
  },
  watch: {
    $route(to, from) {
      this.editableTabsValue = to.path
    }
  },
  computed: {
    ...mapGetters(['tabs'])
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs2.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
    },
    ...mapMutations({
      'deleteTabs': 'DELETE_TABS'
    }),
    removeTab(targetName) {
      let tabs = this.tabs.tabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push({
                path: nextTab.name
              })
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.deleteTabs(targetName)
    },
    handleClick(data) {
      this.$router.push({
        path: data.name
      })
      this.editableTabsValue = data.name
    }
  }
}
</script>
<style scoped lang="less">
.tab-box {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  .tab-icon {
    flex: 0 0 50px;
    height: 60px;
    color: #333333;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
  }
  .el-tabs {
    flex-grow:  1;
  }
}
</style>
