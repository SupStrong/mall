<template>
  <el-dialog title="选择品牌" :visible.sync="showBrandList">
    <div class="page">
      <search-field>
        <el-form>
          <el-form-item label="品牌名称：">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="search-button-container">
          <el-button @click="getData" type="primary" size="small">查询</el-button>
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
          @handleCurrentChange="handleCurrentChange($event, getData, search, 'pageIndex')"
          @handleSizeChange="handleSizeChange($event, getData, search, 'pageSize')"
        ></v-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import searchField from '@/components/tools/searchField'
import vTable from '@/components/tools/vtable'
import backPage from '@/mixins/backPagingMixin'
import { goodsApi } from '@/api'
import models from '@/libs/models'
export default {
  mixins: [backPage],
  data() {
    return {
      search: {
        name: '',
        display: 1,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        data: [],
        columns: [{
          label: '品牌logo',
          key: 'image',
          type: 'image'
        },
        {
          label: '品牌ID',
          key: 'id'
        },
        {
          label: '品牌名称',
          key: 'name'
        },
        {
          label: '品牌描述',
          key: 'describtion'
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
      showBrandList: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        let params = models.brandList
        let brandList = (await goodsApi.brandList(params)).data;
        if (brandList.statusCode === 200) {
          this.options.data = brandList.data.list.map(item => {
            item.btnList = ['choose']
            return item
          });
          this.options.total = brandList.data.total
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.$loading().close();
      }
    },
    handleButtonClick(data) {
      this.$emit('addBrandItem', data)
    },
    showDialog() {
      this.showBrandList = true
    },
    closeDialog() {
      this.showBrandList = false
    }
  },
  components: {
    vTable,
    searchField
  }
}
</script>
