<template>
  <div v-if="remarkType">
    <el-dialog :title="remarkType" :visible.sync="getDialog.remarkDialog" @close="closeDialog('remarkDialog')" width="40%" :modal="false">
      <!-- 提醒、反馈、预约、报修、费用、其他 -->
      <div v-if="remarkType === '客服备注'">
        <div style='margin-bottom: 10px;' v-if="remarkType === '客服备注'">
          客服备注类型：
          <el-select v-model="kfRemarkType"  placeholder="请选择客服备注类型" @change="remark = ''">
            <el-option v-for="(val,key) in this.lk.girlType" :key="key" :label="val" :value="val"></el-option>
          </el-select>
        </div>
        <el-input type="textarea" v-model="remark" :rows="5"></el-input>
      </div>
      <div v-if="remarkType === '工单标签'">
        <div class="tagsList">
          <el-checkbox-group v-model="tagsList" size="mini">
            <el-checkbox
              :label="val.dictCode"
              :key="key"
              v-for="(val,key) in getConfig['workOrderTag']" border>
              {{val.dictName}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <el-input type="textarea" v-model="remark" :rows="5"></el-input>
      </div>
      <div v-if="remarkType === '工单备注'">
        <el-input type="textarea" v-model="remark" :rows="5"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('remarkDialog')">取 消</el-button>
        <el-button type="primary" @click="sumbitRemark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      kfRemarkType: '反馈',
      remark: '',
      tagsList: []
    }
  },
  props: {
    remarkType: {
      type: String,
      default: '客服备注'
    },
    msg: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    workOrderCode: {
      type: String,
      default: ''
    }
  },
  watch: {
    'getDialog.remarkDialog' (val) {
      if (val) {
        this.remark = this.resolveRemark(this.msg)
      }
    }
  },
  computed: {
    ...mapGetters(['getConfig', 'getDialog'])
  },
  methods: {
    ...mapMutations({
      closeDialog: '关闭弹框'
    }),
    // 提交备注
    sumbitRemark () {
      var obj = {}
      if (this.remarkType === '客服备注') {
        let message = JSON.stringify({
          type: this.kfRemarkType,
          message: this.remark.replace(/\s+|\t|\r|\n/g, '')
        })
        obj = {
          detail: message,
          id: this.id,
          workOrderCode: this.workOrderCode
        }
      } else if (this.remarkType === '工单标签') {
        if (!this.tagsList.length) {
          this.$message.error('添加备注失败，请先选择标签')
          return
        }
        let message = JSON.stringify({
          type: '标签',
          message: this.tagsList.join(','),
          remark: this.remark.toString().replace(/\s+|\t|\r|\n/g, '')
        })
        obj = {
          detail: message,
          id: this.id
        }
      } else {
        obj = {
          workRemark: this.remark.toString().replace(/\s+|\t|\r|\n/g, ''),
          id: this.id,
          workOrderCode: this.workOrderCode
        }
      }
      this.$axios({
        method: 'post',
        url: '/api/order/order/detail',
        data: obj
      }).then(res => {
        if (res.data.statusCode === 200) {
          this.$message.success('修改' + this.remarkType + '成功')
          this.$emit('success')
          this.closeDialog('remarkDialog')
        }
      })
      this.dialogFormVisible = false
    },
    // 解析备注
    resolveRemark (detail) {
      try {
        let obj = JSON.parse(detail)
        if (typeof (obj) === 'object') {
          if (obj.type && obj.type === '标签') {
            this.tagsList = obj.message.split(',').map(item => {
              return item - 0
            })
          }
          return obj.type === '标签' ? obj.remark : obj.message
        } else {
          return obj
        }
      } catch (error) {
        return detail
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.tagsList
 >>>.el-checkbox
  margin 0 10px 10px 0
  width 140px
  margin-left 0 !important
</style>
