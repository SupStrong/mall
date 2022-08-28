<template>
  <div>
    <el-form>
      <el-table
        :data="tableBox"
        @selection-change="handleSelectionChange"
        border
        ref="selectionTable"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          property="templateName"
          label="任务名称">
        </el-table-column>
        <el-table-column
          label="任务类型">
          <template slot-scope="scope">
            <el-checkbox-group v-model="comBox" v-if="scope.row.templateName === '图像采集'">
              <el-checkbox :label="index" v-for="(val, index) in scope.row.options" :key="index">{{val}}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-model="payType" v-else-if="scope.row.templateName === '增加收款'">
              <el-radio :label="index" v-for="(val, index) in scope.row.options" :key="index">{{val}}</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column
          label="要求说明">
          <template slot-scope="scope">
            <el-input type="text" v-model="prompt[scope.$index]" />
          </template>
        </el-table-column>
        <el-table-column
          label="其他设置">
          <template slot-scope="scope" v-if="scope.row.templateName === '增加收款'">
            <el-form-item label="金额" label-width="50px">
              <el-input type="text" v-model="amount" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:30px">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="sumbit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { orderApi } from '@/api';
export default {
  data() {
    return {
      type: 0,
      prompt: [],
      formLabelWidth: '120px',
      comBox: [],
      payType: '',
      amount: '',
      tableBox: [],
      multipleSelection: []
    };
  },
  props: {
    tasks: { // detail title
      type: Object,
      required: false,
      default: () => {
        return {
          multipleSelection: [],
          tableBox: [],
          amount: '',
          payType: '',
          comBox: []
        }
      }
    }
  },
  methods: {
    // 提交
    sumbit() {
      let flag = false
      let emitObj = {}
      if (this.multipleSelection.length) {
        this.multipleSelection.map((item, index) => {
          item.templateRule = typeof item.templateRule === 'string' ? JSON.parse(item.templateRule) : item.templateRule
          if (item.templateName === '增加收款') {
            if (this.payType !== '' && this.amount) {
              item.templateRule.fields[0].value = this.payType.toString()
              item.templateRule.fields[0].label = item.templateRule.fields[0].options[this.payType - 0]
              item.templateRule.fields[1].value = this.amount
            } else {
              flag = true
              return
            }
          } else if (item.templateName === '图像采集') {
            if (this.comBox.length) {
              item.templateRule.fields[0].value = this.comBox
            } else {
              flag = true
              return
            }
          }
          item.prompt = this.prompt[item.index - 1]
          return item
        })
        if (flag) {
          this.$message.error('请选填必要信息')
        } else {
          emitObj.multipleSelection = this.multipleSelection
          emitObj.prompt = this.prompt
          emitObj.comBox = this.comBox
          emitObj.amount = this.amount
          emitObj.payType = this.payType
          this.$emit('taskCommit', emitObj);
          this.clearTable()
        }
      } else {
        this.$message.error('请选择至少一项子任务')
      }
    },
    clearTable() {
      this.prompt = []
      this.amount = ''
      this.comBox = []
      this.payType = ''
      this.$refs.selectionTable.clearSelection()
    },
    // 初始化 获取模板列表
    async init() {
      this.$loading();
      try {
        let params = {
          page: 1,
          rows: 100
        };
        let data = (await orderApi.getTempleteList(params)).data;
        if (data.statusCode === 200) {
          let box = data.data.list;
          this.tableBox = box.filter((item, index) => {
            item.templateRule = JSON.parse(item.templateRule);
            item.index = index
            let fields = item.templateRule.fields
            fields.map((value, index) => {
              if (value.options) {
                item.options = value.options
              }
            })
            return item.templateName !== '增加收款'
          })
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.$loading().close();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    close() {
      this.$emit('close');
    },
    initTable() {
      if (this.tasks.multipleSelection && this.tasks.multipleSelection.length) {
        this.tasks.multipleSelection.map(item => {
          this.$refs.selectionTable.toggleRowSelection(this.tableBox[item.index - 1])
          this.prompt = this.tasks.prompt
          this.comBox = this.tasks.comBox
          this.payType = this.tasks.payType
          this.amount = this.tasks.amount
        })
      }
    }
  },
  created() {
    this.init()
  }
};
</script>
