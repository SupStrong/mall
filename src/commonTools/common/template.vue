<template>
  <div class="page">
    <el-form label-width="120px">
      <searchField>
        <el-row>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
        </el-row>
        <div class="search-button-container">
          <el-button @click="clearSearch" size="small">清空</el-button>
          <el-button @click="getData(1)" size="small" type="primary">查询</el-button>
        </div>
      </searchField>

      <div class="page-content">
        <div class="button-box"></div>
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
          @handleSizeChange="handleSizeChange($event, getData, search, 'pageSize')"></v-table>
      </div>
      <div class="page-content">
        <div class="page-title"></div>
        <el-row>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=""></el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import vTable from '@tool/vtable'
import backPage from '@/mixins/common/backPagingMixin'
export default {
  mixins: [backPage],
  data () {
    // return {
    //   search: models.,
    // }
    return {
      options: {
        data: [],
        columns: [{
          label: '品牌logo',
          key: 'image',
          type: 'image'
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
          label: '排序',
          key: 'sort'
        },
        {
          label: '是否显示',
          key: 'display'
        },
        {
          label: '操作',
          type: 'action',
          multiActions: true,
          selectButton: true,
          buttonInfos: [
            {
              name: 'check',
              label: '查看',
              type: 'text'
            },
            {
              name: 'edit',
              label: '编辑',
              type: 'text'
            },
            {
              name: 'delete',
              label: '删除',
              type: 'text'
            }
          ]
        }],
        total: 0
      }
    }
  },
  mounted () {

  },
  methods: {
    handleButtonClick () {

    }
  },
  components: {
    vTable
  }
}
</script>
