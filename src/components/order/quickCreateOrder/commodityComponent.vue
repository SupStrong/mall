<template>
  <div class="page">
    <el-dialog top="10vh" :visible.sync="istemplate" width="50%" :before-close="close" title="选择商品">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已关联的商品" name="first">
          <el-form label-width="120px" class="course-info">
            <el-row>
              <el-col :span="9">
                <el-form-item label="商品类目：">
                  <el-select v-model="existingSearch.categoryId3" placeholder="商品类目">
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
                <el-form-item label="品牌名称">
                  <el-input v-model="existingSearch.brandName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="text-align:right;padding-right:10px;">
                <el-button type="primary" size="small" @click="existingGetBrandList()">查 询</el-button>
                <el-button @click="existingReset()" size="small" plain>重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-row>
            <v-table
              ref="table"
              :data="existingOptions.data"
              :columns="existingOptions.columns"
              v-on:buttonClick="allAandleButtonClick"
              :loading="existingOptions.loading"
              :isBackPage="true"
              :totalCount="existingOptions.totalCount"
              :defaultPageSize="5"
              :defaultcurrentPage="1"
              :operatable="false"
              @handleCurrentChange="handleCurrentChange($event, existingGetBrandList)"
              @handleSizeChange="handleSizeChange($event, existingGetBrandList,'startPage')"
            ></v-table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品库的商品" name="second">
          <el-form label-width="120px" class="course-info">
            <shopType :isShow="false" @ThreeChange="ThreeChange" :isEqt="true" />
            <el-row>
              <el-col :span="9">
                <el-form-item label="品牌名称">
                  <el-input v-model="search.searchFields.brandName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="15" style="text-align:right;padding-right:10px;">
                <el-button type="primary" size="small" @click="getBrandList()">查 询</el-button>
                <el-button @click="reset()" size="small" plain>重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-row>
            <v-table
              ref="table"
              :data="options.data"
              :columns="options.columns"
              v-on:buttonClick="allAandleButtonClick"
              :loading="options.loading"
              :isBackPage="true"
              :totalCount="options.totalCount"
              :defaultPageSize="5"
              :defaultcurrentPage="1"
              :operatable="false"
              @handleCurrentChange="handleCurrentChange($event, getBrandList)"
              @handleSizeChange="handleSizeChange($event, getBrandList)"
            ></v-table>
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
        </el-tab-pane>
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              style="margin: 20px auto 0;display:block;"
              @click="addGoods"
            >新增商品</el-button>
          </el-col>
        </el-row>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { orderApi } from '@/api';
import vTable from '@/components/tools/vtable';
import shopType from '@/components/tools/shopType';
import models from '@/libs/models';
import backPagingMixin from '@/mixins/backPagingMixin';
export default {
  mixins: [backPagingMixin],
  data() {
    return {
      istemplate: false, // 弹框
      activeName: 'first', // 默认显示
      category: [], // 商品三级类目
      // 查询所有的商品
      existingOptions: {
        data: [],
        columns: [
          {
            label: '商品名称',
            key: 'name'
          },
          {
            label: '商品分类',
            key: 'categoryName'
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
          }
        ],
        totalCount: 0,
        loading: false
      },
      existingSearch: Object.assign({}, models.getRelationMerchantDevice),
      // 查询所有的商品
      options: {
        data: [],
        columns: [
          {
            label: '商品名称',
            key: 'name'
          },
          {
            label: '商品分类',
            key: 'categoryName'
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
          }
        ],
        totalCount: 0,
        loading: false
      },
      search: {
        searchFields: Object.assign({}, models.searchBrand)
      }
    };
  },
  mounted() {
    this.existingGetBrandList();
    this.getThirdDeviceCategory();
  },
  methods: {
    // 新增商品
    addGoods() {
      this.istemplate = false;
      this.$router.push({
        path: '/goods/goodsInfo',
        query: {
          isAdd: 0
        }
      });
    },
    // ///////////////////////////////////////////////////////////
    // 已关联操作
    // 获取服务三级类目
    async getThirdDeviceCategory() {
      this.existingOptions.loading = true;
      try {
        let data = (await orderApi.getThirdDeviceCategory()).data;
        if (data.statusCode === 200) {
          this.category = data.data;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.existingOptions.loading = false;
      }
    },
    // 获取数据
    async existingGetBrandList(index) {
      this.existingOptions.loading = true;
      try {
        this.existingSearch.relation = true;
        let data = (await orderApi.getRelationMerchantDevice(
          this.existingSearch
        )).data;
        if (data.list) {
          this.existingOptions.data = data.list.map(item => {
            item.btnList = ['choose'];
            return item;
          });
          this.existingOptions.totalCount = data.total - 0;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.existingOptions.loading = false;
      }
    },
    // 选择设备
    existingHandleButtonClick(data) {
      let goodsItem = {
        deviceId: data.data.id,
        deviceName: data.data.name,
        deviceNums: 1,
        deviceCategoryId: data.data.categoryId || 0,
        model: data.data.model || '',
        deviceBrandName: data.data.brandName || '',
        deviceBrandId: data.data.brandId || 0,
        goodsAdd: true,
        homeDeviceId: 0
      };
      this.$emit('getGoodsData', goodsItem);
      this.istemplate = false;
    },
    // 重置
    existingReset() {
      this.existingSearch = Object.assign({}, models.getRelationMerchantDevice);
    },
    // //////////////////////////////////////////////////////////////////////////////////////////////////////
    // 服务商品库的服务
    // 获取数据
    async getBrandList(index) {
      this.options.loading = true;
      try {
        let data = (await orderApi.getEqtList(this.search.searchFields)).data;
        if (data.statusCode === 200) {
          this.options.data = data.data.list.map(item => {
            item.btnList = ['choose'];
            return item;
          });
          this.options.totalCount = data.data.total - 0;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.options.loading = false;
      }
    },
    // 选择
    allAandleButtonClick(data) {
      let goodsItem = {
        deviceId: data.data.id,
        deviceName: data.data.name,
        deviceNums: 1,
        deviceCategoryId: data.data.categoryId || 0,
        model: data.data.model || '',
        deviceBrandName: data.data.brandName || '',
        deviceBrandId: data.data.brandId || 0,
        goodsAdd: true,
        homeDeviceId: 0
      };
      this.$emit('getGoodsData', goodsItem);
      this.istemplate = false;
    },
    // 获取三级类目
    ThreeChange(obj) {
      this.search.searchFields.categoryId3 = obj.three;
      this.search.searchFields.categoryId2 = obj.two;
      this.search.searchFields.categoryId1 = obj.one;
    },
    // 重置
    reset() {
      this.search.searchFields = Object.assign({}, models.searchBrand);
    },
    // ////////////////////////////////////////
    // tab切换
    handleClick(tab, event) {
      if (tab.name === 'first') {
        this.existingGetBrandList();
      } else if (tab.name === 'second') {
        this.getBrandList();
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
    shopType,
    vTable
  }
};
</script>

<style scoped lang="less">
</style>
