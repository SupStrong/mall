<template>
  <el-dialog title="关联服务商品" :visible.sync="$store.state.Dialog.dialog.connectService" @before-close="setDialog({connectService: false})">
    <div>
      <search-field :showField="true">
        <el-form label-width="120px">
          <el-form-item label="服务类目：">
            <shopType @ThreeChange="ThreeChange" :isShow="false"></shopType>
          </el-form-item>
          <el-form-item label="服务商品名称：">
            <el-input v-model="searchObj.skuName"></el-input>
          </el-form-item>
        </el-form>
        <div class="search-button-container">
          <el-button @click="getData(1)" type="primary">查询</el-button>
        </div>
      </search-field>
      <div class="page-content">
        <vtable
          ref="Table"
          :data="options.data"
          :columns="options.columns"
          :loading="options.loading"
          :isBackPage="true"
          :totalCount="options.total"
          :defaultPageSize="10"
          :defaultcurrentPage="1"
          :selection='true'
          @selected="handelSelection"
          @inputChange="handleInput"
          @handleCurrentChange="handleCurrentChange($event,getData,searchObj,'pageNum')"
          @handleSizeChange="handleSizeChange($event,getData,searchObj,'pageSize')"
        />
        <div class="search-button-container">
          <el-button type="primary" @click="setDialog({connectService: false})">取 消</el-button>
          <el-button type="primary" @click="connectService()">关 联</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import vtable from '@tool/vtable'
import shopType from '@tool/shopType.vue'
import { supplyApi } from '@/api'
import models from '@/libs/models'
import backPage from '@/mixins/common/backPagingMixin'
import { mapMutations } from 'vuex'
export default {
  mixins: [backPage],
  data () {
    return {
      options: {
        data: [],
        columns: [{
          label: '服务商品SKUID',
          key: 'skuId'
        }, {
          label: '服务商品SKU名称',
          key: 'skuName'
        }, {
          label: '服务类目',
          key: 'categoryName'
        }, {
          label: '服务标准价',
          key: 'price'
        }, {
          label: '供应商合同价',
          key: 'coefficient',
          type: 'input'
        } ],
        total: 0
      },
      searchObj: Object.assign({}, models.supplyProduct, {
        have: false
      }),
      skus: []
    }
  },
  watch: {
    '$store.state.Dialog.dialog.connectService': function (val) {
      this.options.data = []
      this.options.total = 0
    }
  },
  props: {
    merchantId: {
      default: '',
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setDialog: '设置对话框'
    }),
    ThreeChange (data) {
      console.log(data)
      this.searchObj.categoryId = data.three
    },
    handelSelection (data) {
      this.skus = data
    },
    handleInput (data) {
      this.$set(this.options.data[data.index], data.column, data.val)
    },
    async getData (page) {
      this.searchObj._merchantId = this.merchantId
      if (page) {
        this.searchObj.pageNum = page
      }
      try {
        let data = (await supplyApi.queryProduct(this.searchObj)).data
        this.options.data = data.data.list.slice(0)
        this.options.total = data.data.total
        if (data.data.total === 0) {
          this.$message.error('没有查到未关联服务商品')
        }
      } catch (err) {
        console.error(err)
      } finally {

      }
    },
    async connectService () {
      if (!this.skus.length) {
        this.$message.error('请先选择要关联的服务')
      }
      let params = {
        skus: this.skus,
        merchantId: this.merchantId
      }
      try {
        let data = (await supplyApi.addMerchantProduct(params)).data
        if (data.statusCode === 200) {
          this.$message.success('关联成功！')
          this.$emit('success')
        }
      } catch (err) {
        this.$message.error('关联失败！')
      }
    }
  },
  components: {
    vtable,
    shopType
  }
}
</script>
