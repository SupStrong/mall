<template>
    <!-- 客服备注操作日志 -->
    <elCopyTable
      ref="remarktable"
      :keyIndex="3"
      :tableHeader="remarkTableHead"
      :tableData="remarkTableData"
      @commitMethod="remarkCommitMethod"
      @sumbitData="remarkSumbitData"
      :ajaxObj="remarkObj"
      pageIndex="page"
      pageSize="rows"
    />
</template>

<script>
import elCopyTable from '@tool/elTable'
import filters from '@/libs/filters'

export default {
  data () {
    return {
      remarkObj: {},
      remarkTableData: [],
      remarkTableHead: [
        {
          label: '时间',
          type: 'time',
          value: 'modifyTime',
          width: '150'
        },
        {
          label: '备注类型',
          value: 'remarkType',
          width: '100'
        },
        {
          label: '备注',
          value: 'remark',
          type: 'Popover',
          func: [filters.remark]
        },
        {
          label: '操作人',
          value: ['modifierName', 'modifier']
        }
      ]
    }
  },
  methods: {
    // 数据
    remarkSumbitData (data) {
      this.remarkTableData = data.list.filter(item => {
        let detail = JSON.parse(item.logExtend).detail
        if (detail && detail.indexOf('message') > -1) {
          item.remark = JSON.parse(item.logExtend).detail
          item.remarkType = JSON.parse(JSON.parse(item.logExtend).detail).type
        } else {
          item.remark = JSON.parse(item.logExtend).detail
          item.remarkType = '下单客服备注'
        }
        return item.remark !== undefined
      })
    },
    // 方法
    remarkCommitMethod (type, row) {},
    // 获取备注
    getRemark (orderId) {
      this.remarkObj.methods = 'post'
      this.remarkObj.url = this.dd + '/order/orderRemarkLogs'
      this.remarkObj.data = {
        orderId: orderId,
        page: 1,
        rows: 30
      }
      if (this.$refs.remarktable) {
        this.$refs.remarktable.getData(1)
      } else {
        setTimeout(() => {
          this.$refs.remarktable.getData(1)
        }, 50)
      }
    }
  },
  props: ['orderId'],
  components: {
    elCopyTable
  }
}
</script>
