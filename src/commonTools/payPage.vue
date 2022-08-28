<template>
  <div>
    <el-dialog title="发送支付链接" :visible.sync="dialogFormVisible" :before-close="close">
      <el-form :model="form">
          <el-form-item v-if="form.phone || show" label="发送手机号：" :label-width="formLabelWidth">
            <el-input v-model="form.phone" @change="show = true" class="phoneWidth"></el-input>
          </el-form-item>
        <!-- <el-form-item label="供应商支付：" :label-width="formLabelWidth" v-if='status === 6'>
          <el-input v-model="supplyPay"></el-input>
        </el-form-item> -->
          <el-form-item label="收支类型：" :label-width="formLabelWidth">
            <el-select v-model="importMoney.budgetType">
              <budgetType :dictCodeOne=1></budgetType>
            </el-select>
          </el-form-item>
        <el-form-item label="用户支付：" :label-width="formLabelWidth" v-if='status === 6'>
          <el-input v-model="importMoney.money" class="phoneWidth"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" v-if="(importMoney.money != actualPay) && importMoney.money != 0">
          <span style="color:red;">请注意，填写金额与订单金额不相等！</span>
        </el-form-item>
        <el-form-item label="订单编号：" :label-width="formLabelWidth">
          <span>{{ form.order }}</span>
        </el-form-item>
        <el-form-item v-if="dialogQR"  class='QR'>
            <div>
              <qriously :value="qrCode" :size="size"/>
            </div>
          </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close(true)">返回列表</el-button>
        <el-button type="primary" @click="showQR">生成二维码</el-button>
        <el-button type="primary" v-if="form.phone || show" @click="sendSms">发送支付链接</el-button>
        <el-button @click="close(false)">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import model from '@/libs/models'
// import { orderApi } from '@/api'
import budgetType from '@tool/common/budgetType'
export default {
  data () {
    return {
      formLabelWidth: '150px',
      inputWidth: '300px',
      dialogFormVisible: true,
      dialogQR: false,
      dialogQr: false,
      show: false,
      supplyPay: 0,
      code: process.env.VUE_APP_PAY_URL,
      supplyCode: process.env.VUE_APP_SUPPLY_URL,
      qrCode: '',
      size: 150,
      importMoney: this.lk.deepCopy(model.sendSms),
      importShowQR: this.lk.deepCopy(model.showQR)
    }
  },
  props: {
    form: {
      type: Object,
      default () {
        return {}
      }
    },
    isImportant: {
      type: Boolean,
      default: false
    },
    status: {
      type: Number,
      default: 1
    },
    actualPay: {
      type: Number,
      default: null
    }
  },
  components: {
    budgetType
  },
  mounted () {
  },
  methods: {
    close (step) {
      this.$emit('payClose', step)
    },
    closeQr (step) {
      this.$emit('payClose', step)
    },
    // async sendSms () {
    //   this.importMoney.budgetTypeCode = this.form.order
    //   this.importMoney.budgetTypeId = this.form.orderId
    //   let addRecord = (await orderApi.addOrderImportPayLog(this.importMoney)).data
    //   if (addRecord.statusCode === 200) {
    //     this.sumbitRecord(addRecord.data.businessCode)
    //   }
    // },
    sendSms () {
      if (this.lk.checkNumber(this.importMoney.money, '用户支付')) {
        return
      }
      if (this.importMoney.money - 0 <= 0) {
        this.$message({
          type: 'error',
          message: '请输入正确金额！'
        })
        return
      }
      this.importMoney = Object.assign({}, this.importMoney, {
        budgetTypeCode: this.form.order,
        budgetTypeId: this.form.orderId,
        mobile: this.form.phone,
        orderCode: this.form.order,
        state: this.status,
        price: this.importMoney.money
      })
      this.$axios({
        method: 'post',
        url: this.dd + '/fuwu/sendSms',
        data: this.importMoney
      }).then(result => {
        if (result.data.statusCode === 200) {
          this.$message.success('发送短信成功')
          this.close()
        }
      })
    },
    async showQR () {
      if (this.status === 6) {
        if (this.lk.checkNumber(this.importMoney.money, '用户支付')) {
          return
        }
        if (this.importMoney.money - 0 <= 0) {
          this.$message({
            type: 'error',
            message: '请输入正确金额！'
          })
          return
        }
        this.importShowQR = Object.assign({}, this.importShowQR, {
          budgetTypeCode: this.form.order,
          budgetTypeId: this.form.orderId,
          orderCode: this.form.order,
          state: this.status,
          price: this.importMoney.money
        })
        this.$axios({
          method: 'post',
          url: this.dd + '/fuwu/modifypriceforqrcode',
          data: this.importShowQR
        }).then(result => {
          if (result.data.statusCode === 200) {
            this.qrCode = this.supplyCode + 'actualPay=' + this.importMoney.money + '&orderCode=' + result.data.data
            this.dialogQR = true
          }
        })
      } else {
        this.qrCode = this.code + 'actualPay=' + this.actualPay + '&orderCode=' + this.form.order
        this.dialogQR = true
      }
    }
  }
}
</script>

<style lang="stylus">
.phoneWidth
  width 210px
.QR
  float right
  margin -140px 100px 40px -100px
</style>
