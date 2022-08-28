<template class="page">
  <el-dialog title="关联商品" :visible.sync="$store.state.Dialog.dialog.connectProduct" @before-close="setDialog({connectProduct: false})">
    <div>
      <search-field :showField="true">

        <el-form label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="商品类目：">
                <shopType @ThreeChange="ThreeChange" :isSB="true" :isShow="false"></shopType>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品名称：">
                <el-input v-model="searchObj.spuName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品品牌：">
                <el-input v-model="searchObj.brandName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
          @selected="handleSelection"
          @handleCurrentChange="handleCurrentChange($event,getData,searchObj,'pageNum')"
          @handleSizeChange="handleSizeChange($event,getData,searchObj,'pageSize')"
        />
        <div class="search-button-container">
          <el-button @click="setDialog({connectProduct: false})">取 消</el-button>
          <el-button type="primary" @click="connectDevice()">确 定</el-button>
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
        columns: [ {
          label: '商品ID',
          key: 'deviceSpuId'
        }, {
          label: '商品名称',
          key: 'spuName'
        }, {
          label: '商品类目',
          key: 'categoryName'
        }, {
          label: '商品品牌',
          key: 'brandName'
        }],
        total: 0
      },
      searchObj: Object.assign({}, models.supplyDevice, {
        have: false
      }),
      spus: []
    }
  },
  props: {
    merchantId: {
      default: '',
      required: true
    }
  },
  watch: {
    '$store.state.Dialog.dialog.connectProduct': function (val) {
      this.options.data = []
      this.options.total = 0
    }
  },
  methods: {
    ...mapMutations({
      setDialog: '设置对话框'
    }),
    ThreeChange (data) {
      this.searchObj.categoryId = data.three
    },
    handleSelection (data) {
      this.spus = data
    },
    async getData (page) {
      this.searchObj._merchantId = this.merchantId
      if (page) {
        this.searchObj.pageNum = page
      }
      try {
        let data = (await supplyApi.queryDevice(this.searchObj)).data
        this.options.data = data.data.list
        this.options.total = data.data.total
        if (data.data.total === 0) {
          this.$message.error('没有查到未关联商品')
        }
      } catch (err) {
        console.error(err)
      } finally {

      }
    },
    async connectDevice () {
      if (!this.spus.length) {
        this.$message.error('请先选择要关联的商品')
      }
      let spu = {}
      spu.deviceSpuIds = this.spus.map(item => {
        return item.deviceSpuId
      })
      spu.merchantId = this.merchantId
      spu.isDelete = 0
      try {
        let data = (await supplyApi.addMerchantDevice(spu)).data
        if (data.statusCode === 200) {
          this.$message.success('关联成功！')
          this.$emit('success')
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    vtable,
    shopType
  }
}
</script>
