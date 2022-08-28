<template>
  <div class="page">
    <search-field title="服务商品查询"  :showField="false">
      <el-form  size="medium" ref="searchForm" label-width="120px">
        <categories-tree
          :isShow = 'false'
          ref="categories"
          :isEqt="false"
          @ThreeChange="getCategories"
        ></categories-tree>
        <el-row>
          <el-col :span="7">
            <el-form-item label="服务名称：">
              <el-input v-model="searchFileds.search.skuName" placeholder="请输入服务商品名称" style="width:100%;" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="search-button-container">
        <el-button type="primary" @click="getProductList" size="small">查询</el-button>
        <el-button @click="clearSearch()" size="small" plain>重置</el-button>
      </div>
    </search-field>

    <el-table
      :data="tableData"
      :cell-style="cellStyle"
      :header-cell-style="rowClass"
    >
      <el-table-column
        label="序号"
        prop="skuId">
      </el-table-column>
      <el-table-column
        label="服务商品名称"
        prop="skuName">
      </el-table-column>
      <el-table-column
        label="服务类目"
        prop="categoryName">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      background
      style="text-align:center;margin-top:20px"
      @current-change="handleChange"
      :total="total">
    </el-pagination>
  </div>

</template>

<style lang="less" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import categoriesTree from '@/components/tools/shopType.vue'
import searchField from '@/components/tools/searchField'
import vTable from '@/components/tools/vtable'
import models from '@/libs/models'
import { productApi } from '@/api'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      searchFileds: {
        search: Object.assign({}, models.newSearchProudct)
      },
      total: 0,
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    for (let i in this.user.identityList) {
      if (this.user.identityList[i].userType === 5) {
        this.merchantId = this.user.identityList[i].merchantId
        break
      }
    }
    this.getProductList()
  },
  props: ['index'],
  methods: {
    handleClick(scope) {
      let productInfo = {
        scope: scope,
        index: this.index
      }
      this.$emit('addProuctInfo', productInfo)
      this.searchFileds.search.pageNum = 1
    },

    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align: center'
    },
    rowClass({ row, rowIndex }) {
      return 'text-align: center; background-color: #eaeefb'
    },
    // 清空列表上的选项
    clearSearch() {
      this.searchFileds.search = Object.assign({}, models.newSearchProudct)
      this.$refs.categories.clearSearch()
    },
    getCategories(data) {
      this.searchFileds.search.categoryIdLevelOne = data.one
      this.searchFileds.search.categoryIdLevelTwo = data.two
      this.searchFileds.search.categoryIdLevelThree = data.three
      this.searchFileds.search.categoryId = data.three
    },
    async getProductList() {
      this.$loading()
      try {
        this.searchFileds.search._merchantId = this.merchantId
        this.searchFileds.search.have = true
        let data = (await productApi.newGetProductList(this.searchFileds.search)).data
        if (data.statusCode === 200) {
          this.tableData = data.data.list.map(item => {
            item.categoryId3Name = item.categoryName
            item.nums = 1
            return item
          })
          this.total = data.data.total
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.$loading().close()
      }
    },
    handleChange(index) {
      this.searchFileds.search.pageNum = index
      this.getProductList()
    }
  },
  components: {
    categoriesTree,
    searchField,
    vTable
  }
}
</script>
