<template>
  <div style="z-index=1">
    <!-- 任务模板 -->
    <el-dialog :title="isUpdate ? '修改子任务模板' : '新增子任务模板'" :visible.sync="show" width="60%" @close='close' style="z-index=1">
      <el-form>
        <el-form-item label="子任务名称：" label-width="120px">
          <el-input style="width: 140px;" v-model.trim="taskName" placeholder="请输入任务名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="子任务类目：" label-width="120px">
          <el-button
            type="primary"
            @click="$refs.primary.open();$refs.primary.copySelect = selectBox"
          >{{ selectBox.length > 0 ? '请查看类目': '请选择类目'}}</el-button>
        </el-form-item>
        <el-form-item label="子任务模板：" label-width="120px">
          <el-tag
            v-for="(val, key) in taskList"
            :key="val.id"
            @close="deleteTask(key)"
            effect="dark"
            :closable="true"
          >{{ val.templateName }} {{ val.name }}</el-tag>
          <el-button type="primary" @click="$setDialog('addSubTask')">添加子任务</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addModule">确 定</el-button>
      </span>
    </el-dialog>

    <primary
      @sumbitPrimary="sumbitPrimary"
      ref="primary"
      style="z-index:9999"
    />

    <searchTask
      ref="Task"
      :isAdd="2"
      @taskCommit="taskCommit"
    />
  </div>
</template>

<script>
import searchTask from '@/components/page/orderAdmin/components/searchTask'
import primary from '@/components/page/serviceAdmin/components/primary'
export default {
  data () {
    return {
      show: true,
      taskList: [],
      selectBox: [],
      nameBox: [],
      id: null,
      taskName: '',
      isUpdate: false
    }
  },
  props: {
    updateObj: {
      type: Object,
      default () {
        return null
      }
    }
  },
  created () {
    if (this.updateObj !== null) {
      this.isUpdate = true
      this.selectBox = this.updateObj.categoryIds.split(',')
      this.taskName = this.updateObj.taskName
      this.nameBox = this.updateObj.categoryNames.split(',')
      this.id = this.updateObj.id
      this.taskList = JSON.parse(this.updateObj.templateExtend)
      this.taskList.forEach(val => {
        val.templateRule = JSON.parse(val.templateRule)
      })
    } else {
      this.isUpdate = false
    }
  },
  methods: {
    // 删除子任务
    deleteTask (key) {
      this.taskList.splice(key, 1)
    },
    // 类目提交
    sumbitPrimary (result, two, three, box) {
      this.nameBox = []
      this.selectBox = result
      this.$refs.primary.close()
      box.forEach(val => {
        this.nameBox.push(val.name)
      })
    },
    // 子任务提交
    taskCommit (result) {
      this.taskList = result
      this.$closeDialog('addSubTask')
    },
    // 关闭
    close () {
      this.$emit('closeTask')
    },
    // 添加模板
    addModule () {
      if (this.selectBox.length === 0 || this.taskList.length === 0) {
        this.$message.warning('三级类目或者任务不能为空')
        return
      }
      if (this.taskName.length < 2) {
        this.$message.warning('任务名字长度不小于2')
        return
      }
      this.$emit('addModule', {
        id: this.id,
        taskList: this.taskList,
        tastName: this.taskName,
        selectBox: this.selectBox,
        nameBox: this.nameBox
      })
    }
  },
  components: {
    primary,
    searchTask
  }
}
</script>
