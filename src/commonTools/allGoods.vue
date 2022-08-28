<template>
  <el-dialog
    title="选择服务"
    top="10vh"
    :visible.sync="dialogVisible"
    class="orderSearch"
    width="70%"
    :before-close="close"
  >
    <div class="page">
      <search-field>
        <el-form label-width="120px">
          <el-row>
            <el-form-item label="服务类目：">
              <shopType :isShow="false" @ThreeChange="ThreeChange" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="服务名称：">
              <el-input v-model="bizParam.productName" clearable @keyup.enter.native="getData(1)"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div class="search-button-container">
          <el-button @click="getData(1)" type="primary" size="small">查询商品</el-button>
        </div>
      </search-field>
      <div class="page-content">
        <v-table
          ref="table"
          :data="options.data"
          :columns="options.columns"
          v-on:buttonClick="handleButtonClick"
          :loading="options.loading"
          :isBackPage="true"
          :totalCount="options.total"
          :defaultPageSize="10"
          :defaultcurrentPage="1"
          :selection="selection"
          :selectionRow = "selectionBox"
          @selected="handleSelect"
          @handleCurrentChange="handleCurrentChange($event, getData,  bizParam, 'pageIndex')"
          @handleSizeChange="handleSizeChange($event, getData, bizParam, 'pageSize')"
        ></v-table>
        <div class="button-field-bottom" v-if="selection">
          <el-button @click="selectedAll" type="primary">确认选择勾选商品</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import shopType from '@tool/shopType.vue'
import backPage from '@/mixins/common/backPagingMixin'
import models from '@/libs/models'
import vTable from '@tool/vtable'
export default {
  mixins: [backPage],
  data () {
    return {
      dialogVisible: false,
      bizParam: this.lk.deepCopy(models.goodsSearchObj),
      skus: [],
      options: {
        data: [],
        columns: [{
          label: '服务ID',
          key: 'id'
        },
        {
          label: '服务名称(spu)',
          key: 'spuName'
        },
        {
          label: '服务名称(sku)',
          key: 'name'
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
        }],
        total: 0
      },
      hasMerchant: true
    }
  },
  props: {
    selection: {
      type: Boolean,
      default: false
    },
    selectionBox: {
      type: Array,
      default () {
        return []
      }
    },
    merchantId: {
      default: ''
    }
  },
  methods: {
    // 打开组件
    open () {
      this.dialogVisible = true
      this.getData()
    },
    // 关闭组件
    close () {
      this.dialogVisible = false
    },
    // 返回
    back () {
      this.$router.back()
    },
    // 选择商品
    selectShop (val) {
      var result = this.lk.deepCopy(val)
      this.$emit('addShop', result)
    },
    handleSelect (data) {
      this.skus = data
    },
    selectedAll () {
      this.$emit('addShop', this.skus)
    },
    // 类目改变
    ThreeChange (result) {
      this.bizParam.categoryIdLevelOne = result.one
      this.bizParam.categoryIdLevelTwo = result.two
      this.bizParam.categoryIdLevelThree = result.three
    },
    // 获取列表
    getData () {
      let url = '/api/product/product/spu/skuList'
      let data = {
        bizParam: this.bizParam
      }
      this.$axios
        .post(url, data)
        .then(result => {
          if (result.data.statusCode === 200) {
            this.options.data = result.data.data.list.map(item => {
              item.btnList = ['choose']
              return item
            })
            this.options.total = result.data.data.total
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    handleButtonClick (data) {
      this.selectShop(data.data)
      this.close()
    }
  },
  components: {
    shopType,
    vTable
  }
}
</script>
