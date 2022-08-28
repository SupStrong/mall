<template>
  <!-- 查询商品 -->
  <el-dialog
    title="查询商品"
    top="10vh"
    :visible.sync="dialogFormVisible"
    width="70%"
    :before-close="close"
  >
    <div class="page-content">
      <div class="page-title">
        搜索条件
      </div>
      <el-form label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="商品类目：">
                <shopType :isShow="false" @ThreeChange="ThreeChange" :isSB="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品名称：">
                <el-input v-model="search.brandName" placeholder></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="none">
          <el-button type="primary" @click="hasMerchant = false; search.startPage = 1; getData()">查询全部商品</el-button>
          <el-button type="primary" v-if="merchantId" @click="hasMerchant = true; search.pageNum = 1; getData()">查询关联商品</el-button>
        </div>
    </div>

    <div class="page-content">
      <v-table
        ref="table"
        :selection="multiple"
        :data="options.data"
        :columns="options.columns"
        v-on:buttonClick="handleButtonClick"
        :loading="options.loading"
        :isBackPage="true"
        :totalCount="options.total"
        :defaultPageSize="10"
        :defaultcurrentPage="1"
        @selected="handleSelected"
        @handleCurrentChange="handleCurrentChange($event, getData, search, 'startPage')"
        @handleSizeChange="handleSizeChange($event, getData, search, 'pageSize')"></v-table>
        <div class="none" v-if="multiple">
          <el-button @click="submitAll" type="primary">确定</el-button>
        </div>
    </div>
  </el-dialog>
</template>

<script>
import vTable from '@tool/vtable'
import backPage from '@/mixins/common/backPagingMixin'
import shopType from '@tool/shopType'
export default {
  mixins: [backPage],
  data () {
    return {
      dialogFormVisible: false,
      search: {
        brandName: null,
        categoryId1: null,
        cycleNum: null,
        pageSize: 5,
        startPage: 1,
        categoryId2: null,
        categoryId3: null
      },
      options: {
        data: [],
        total: 0,
        columns: [
          {
            label: '商品ID',
            key: 'id'
          },
          {
            label: '商品类目',
            key: 'categoryName'
          },
          {
            label: '商品名称',
            type: 'render',
            render: (h, params) => {
              let row = params.row
              return (<div>
                <p>{row.spuName}({row.name})</p>
              </div>)
            }
          },
          {
            label: '操作',
            type: 'action',
            multiActions: true,
            selectButton: true,
            buttonInfos: [
              {
                name: 'choose',
                label: '选择',
                type: 'text'
              }
            ]
          }
        ]
      },
      rows: [],
      hasMerchant: true
    }
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    serviceSkuId: {
      default: ''
    },
    merchantId: {
      default: ''
    }
  },
  watch: {
    serviceSkuId (val) {
      if (val) {
        this.getData(val)
      }
    }
  },
  methods: {
    handleButtonClick (data) {
      let row = data.data
      let result = {
        deviceId: row.id,
        deviceCategoryId: row.categoryId,
        model: row.model,
        deviceBrandId: row.brandId,
        deviceBrandName: row.name,
        spuName: row.spuName,
        name: row.name,
        categoryName: row.categoryName
      }
      this.$emit('brankSumbit', result)
    },
    handleSelected (data) {
      this.rows = data.map(item => {
        return {
          deviceId: item.id,
          deviceCategoryId: item.categoryId,
          model: item.model,
          deviceBrandId: item.brandId,
          deviceBrandName: item.name
        }
      })
    },
    submitAll () {
      if (this.rows.length) {
        this.$emit('brankSumbit', this.rows)
      } else {
        this.$message.error('请至少选择一个商品')
      }
    },
    // 关闭
    close () {
      this.dialogFormVisible = false
    },
    // 打开
    open () {
      this.dialogFormVisible = true
      this.pageNumber = 10
      this.getData(this.serviceSkuId)
    },
    // 类目改变
    ThreeChange (obj) {
      this.search.categoryId3 = obj.three
      this.search.categoryId2 = obj.two
      this.search.categoryId1 = obj.one
    },
    // 获取数据
    getData () {
      let url = this.hasMerchant ? 'api/device/query/jms/tom_corder_device' : '/api/device/reminderCycle/searchSku'
      let data = this.hasMerchant ? Object.assign({}, this.search, {
        _merchantId: this.hasMerchant ? this.merchantId : null,
        serviceSkuId: this.serviceSkuId,
        associated: true,
        pageNum: this.search.startPage,
        name: this.search.brandName
      }) : this.search
      this.$axios({
        method: 'POST',
        url: url,
        data: data
      }).then(result => {
        if (result.data.statusCode === 200) {
          this.options.data = result.data.data.list.map(item => {
            if (this.hasMerchant) {
              item.categoryId = item.categoryId3
            }
            item.btnList = ['choose']
            return item
          })
          this.options.total = result.data.data.total
        }
      })
    }
  },
  components: {
    shopType,
    vTable
  }
}
</script>
