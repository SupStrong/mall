<template>
  <section class="main">
    <!-- 查询品牌 -->
    <el-card>
      <div class="search">
        <div>
          <shopType :isShow="false" @ThreeChange="ThreeChange" :isEqt="true"/>
          <el-form label-width="120px">
            <el-col :span="8">
              <el-form-item label="商品名称：">
                <el-input v-model.trim="search.searchFields.spuName" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品型号：">
                <el-input v-model.trim="search.searchFields.name" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button  @click="reset" style="margin-left: 20px">重置</el-button>
              <el-button type="primary" @click="getBrandList()" style="margin-left: 20px">查询商品</el-button>
            </el-col>
          </el-form>
        </div>
        <div></div>
      </div>
    </el-card>
    <div class="page-content">
      <v-table
        ref="table"
        :data="options.data"
        :columns="options.columns"
        v-on:buttonClick="handleButtonClick"
        :loading="options.loading"
        :isBackPage="true"
        :totalCount="options.totalCount"
        :defaultPageSize="5"
        :defaultcurrentPage="1"
        :operatable="false"
        :selection="multiple"
        @handleCurrentChange="handleCurrentChange($event, getBrandList,search.searchFields,'pageNum')"
        @handleSizeChange="handleSizeChange($event, getBrandList,search.searchFields,'pageSize')"
        @selected="handleSelectionChange"
      ></v-table>
    </div>
    <div class="none" v-if="multiple">
      <el-button @click="selectAll" type="primary" size="small">确定</el-button>
    </div>
  </section>
</template>

<script>
import backPagingMixin from '@/mixins/backPagingMixin';
import shopType from '@/components/tools/shopType';
import vTable from '@/components/tools/vtable'
import models from '@/libs/models'
import { orderApi } from '@/api';
export default {
  mixins: [backPagingMixin],
  data() {
    return {
      rows: [],
      options: {
        data: [],
        columns: [
          {
            label: '商品名称',
            key: 'spuName'
          },
          {
            label: '商品型号',
            key: 'name'
          },
          {
            label: '操作',
            type: 'action',
            multiActions: true,
            selectButton: true,
            width: 150,
            buttonInfos: [
              {
                name: 'choose',
                label: '选择',
                type: 'text'
              }
            ]
          }],
        totalCount: 0,
        loading: false
      },
      search: {
        searchFields: Object.assign({}, models.searchBrand)
      }
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // this.getBrandList();
  },
  methods: {
    // 选择品牌
    handleButtonClick(data) {
      let row = data.data
      let result = {
        deviceId: row.id,
        deviceCategoryId: row.categoryId,
        cateName: row.categoryName,
        model: row.model,
        deviceBrandId: row.brandId,
        deviceBrandName: row.brandName,
        brandName: row.name
      };
      this.$emit('brandSumbit', result);
    },
    selectAll() {
      let row = this.rows.map(item => {
        return {
          deviceId: item.id,
          deviceCategoryId: item.categoryId,
          cateName: item.categoryName,
          model: item.model,
          deviceBrandId: item.brandId,
          deviceBrandName: item.brandName,
          brandName: item.name
        }
      })
      this.$emit('brandSumbit', row);
    },
    // 类目改变
    ThreeChange(obj) {
      this.search.searchFields.categoryId3 = obj.three;
      this.search.searchFields.categoryId2 = obj.two;
      this.search.searchFields.categoryId1 = obj.one;
    },
    // 获取数据
    async getBrandList(item) {
      this.options.loading = true
      this.tableData = [];
      if (item) {
        this.item = item
      }
      this.search.searchFields.serviceSkuId = this.item.skuId
      this.search.searchFields.associated = 1
      try {
        let data = (await orderApi.getEqtList(this.search.searchFields)).data;
        if (data.statusCode === 200) {
          this.options.data = data.data.list.map(item => {
            item.btnList = ['choose']
            return item
          })
          this.options.totalCount = data.data.total - 0
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.options.loading = false
      }
    },
    reset() {
      this.search.searchFields = Object.assign({}, models.searchBrand)
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align: center';
    },
    rowClass({ row, rowIndex }) {
      return 'text-align: center; background-color: #eaeefb';
    },
    handleSelectionChange(data) {
      this.rows = data
    }
  },
  components: {
    shopType,
    vTable
  }
};
</script>
<style lang="less">
.main{
  .el-table{
    max-height: 400px;
    overflow: scroll;
  }
}
</style>
