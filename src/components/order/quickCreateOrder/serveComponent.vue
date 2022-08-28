<template>
  <div class="page">
    <el-dialog top="10vh" :visible.sync="istemplate" width="50%" :before-close="close" title="选择服务">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已关联的服务" name="first">
          <el-form label-width="120px" class="course-info">
            <el-row>
              <el-col :span="9">
                <el-form-item label="服务类目：">
                  <el-select v-model="existingSearchFileds.categoryId3" placeholder="服务类目">
                    <el-option
                      v-for="(item, index) in category"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="服务名称：">
                  <el-input v-model="existingSearchFileds.name" placeholder="请输入服务名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="text-align:right;padding-right:10px;">
                <el-button type="primary" size="small" @click="existingGetAllProductList()">查 询</el-button>
                <el-button @click="existingClearSearch()" size="small" plain>重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-row>
            <el-table :data="existingTableData" :cell-style="existingCellStyle" :header-cell-style="existingRowClass">
              <el-table-column label="服务名称" prop="name"></el-table-column>
              <el-table-column label="服务分类" prop="categoryName"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="existingChoice(scope.row)" type="text" size="small">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              layout="prev, pager, next"
              background
              style="text-align:center;margin-top:20px"
              @current-change="existingHandleChange"
              :total="existingTotal"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="服务商品库的服务" name="second">
          <el-form label-width="120px" class="course-info">
            <categories-tree
              :isShow="false"
              ref="categories"
              :isEqt="false"
              @ThreeChange="getCategories"
            ></categories-tree>
            <el-row>
              <el-col :span="9">
                <el-form-item label="服务名称：">
                  <el-input v-model="AllSearchFileds.search.productName" placeholder="请输入服务商品名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="15" style="text-align:right;padding-right:10px;">
                <el-button type="primary" size="small" @click="getAllProductList()">查 询</el-button>
                <el-button @click="clearSearch()" size="small" plain>重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-row>
            <el-table :data="tableData" :cell-style="cellStyle" :header-cell-style="rowClass">
              <el-table-column label="服务名称" prop="name"></el-table-column>
              <el-table-column label="服务分类" prop="categoryName"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="choice(scope.row)" type="text" size="small">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              layout="prev, pager, next"
              background
              style="text-align:center;margin-top:20px"
              @current-change="handleChange"
              :total="total"
            ></el-pagination>
          </el-row>
          <!-- <el-form label-width="107px" class="course-info">
            <el-row>
              <el-form-item label="已选服务"></el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="8">超滤净水机安装服务</el-col>
                <el-col :span="6">净水器安维</el-col>
                <el-col :span="6"><el-input v-model="aaaa" placeholder="请输入服务商品名称" style="width:50px;"></el-input>数量</el-col>
                <el-col :span="4">
                  <el-button type="danger">删除</el-button>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>-->
          <!-- <el-row>
            <el-col :span="24">
              <el-button type="primary" style="margin: 20px auto 0;display:block;">确定下单</el-button>
            </el-col>
          </el-row>-->
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { orderApi, productApi } from '@/api';
import vTable from '@/components/tools/vtable';
import categoriesTree from '@/components/tools/shopType.vue';
import models from '@/libs/models';
export default {
  data() {
    return {
      istemplate: false, // 弹框
      activeName: 'first', // 默认显示
      existingTableData: [], // 服务商品库的服务列表
      category: [], // 服务三级类目
      existingSearchFileds: Object.assign({}, models.getRelationProduct), // 已关联的服务查询条件
      existingTotal: 0,
      tableData: [], // 服务商品库的服务列表
      AllSearchFileds: {
        search: Object.assign({}, models.searchProudct)
      },
      total: 0
    };
  },
  mounted() {
    this.existingGetAllProductList()
    this.getThirdProductCategory()
  },
  methods: {
    // 已关联操作
    // 获取商品三级类目
    async getThirdProductCategory() {
      this.$loading();
      try {
        this.existingSearchFileds.relation = true
        let data = (await orderApi.getThirdProductCategory()).data;
        if (data.statusCode === 200) {
          this.category = data.data
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.$loading().close();
      }
    },
    // 获取已关联列表
    async existingGetAllProductList() {
      this.$loading();
      try {
        this.existingSearchFileds.relation = true
        let data = (await orderApi.getRelationProduct(this.existingSearchFileds)).data;
        if (data.list.length) {
          this.existingTableData = data.list
          this.existingTotal = data.total;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.$loading().close();
      }
    },
    existingCellStyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align: center';
    },
    existingRowClass({ row, rowIndex }) {
      return 'text-align: center; background-color: #eaeefb';
    },
    // 选择
    existingChoice(data) {
      let serveItem = {
        id: data.id,
        nums: 1,
        name: data.name,
        price: data.price || '',
        categoryName: data.categoryName,
        serveAdd: false
      };
      this.$emit('getServeData', serveItem);
      this.istemplate = false;
    },
    // 分页
    existingHandleChange(index) {
      this.existingSearchFileds.startPage = index;
      this.existingGetAllProductList();
    },
    // 清空列表上的选项
    existingClearSearch() {
      this.existingSearchFileds = Object.assign({}, models.getRelationProduct);
    },
    // //////////////////////////////////
    // 服务商品库的服务
    async getAllProductList() {
      this.$loading();
      let params = {
        bizParam: this.AllSearchFileds.search,
        id: 0,
        ip: 'String'
      };
      try {
        let data = (await productApi.getProductList(params)).data;
        if (data.statusCode === 200) {
          this.tableData = data.data.list.map(item => {
            item.categoryId3Name = item.categoryName;
            item.nums = 1;
            return item;
          });
          this.total = data.data.total;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.$loading().close();
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align: center';
    },
    rowClass({ row, rowIndex }) {
      return 'text-align: center; background-color: #eaeefb';
    },
    // 选择
    choice(data) {
      let serveItem = {
        id: data.id,
        nums: 1,
        name: data.name,
        price: data.price || '',
        categoryName: data.categoryName,
        serveAdd: true
      };
      this.$emit('getServeData', serveItem);
      this.istemplate = false;
    },
    // 分页
    handleChange(index) {
      this.AllSearchFileds.search.pageIndex = index;
      this.getAllProductList();
    },
    // 获取三级类目
    getCategories(data) {
      this.AllSearchFileds.search.categoryIdLevelOne = data.one;
      this.AllSearchFileds.search.categoryIdLevelTwo = data.two;
      this.AllSearchFileds.search.categoryIdLevelThree = data.three;
    },
    // 清空列表上的选项
    clearSearch() {
      this.AllSearchFileds.search = Object.assign({}, models.searchProudct);
      this.$refs.categories.clearSearch();
    },
    // ////////////////////////////////////////
    // tab切换
    handleClick(tab, event) {
      if (tab.name === 'first') {
        this.existingGetAllProductList()
      } else if (tab.name === 'second') {
        this.getAllProductList();
      }
    },
    // 打开组件
    open() {
      this.istemplate = true;
    },
    // 关闭组件
    close() {
      this.istemplate = false;
    }
  },
  components: {
    vTable,
    categoriesTree
  }
};
</script>

<style scoped lang="less">
</style>
