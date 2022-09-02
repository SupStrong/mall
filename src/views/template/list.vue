<template>
  <div class="page">
    <el-form>
      <searchField>
        <el-row>
          <el-col :span="6">
            <el-form-item label="ID：">
              <el-select v-model="search.billObject" clearable>
                <el-option
                  v-for="(item, index) in $store.state.Config.config[
                    'tradeEvidence'
                  ]"
                  :value="item.dictCode"
                  :label="item.dictName"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人：">
              <el-input v-model="search.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收时间：">
              <el-date-picker
                v-model="search.receivingTime"
                type="daterange"
                :default-time="['00:00:00', '23:59:59']"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="search-button-container">
          <el-button @click="clearSearch" size="small">清空</el-button>
          <el-button @click="getTransaction(1)" size="small" type="primary"
            >查询</el-button
          >
        </div>
      </searchField>
    </el-form>
    <div class="page-content">
      <div class="button-box">
        <div class="button-field">
          <el-button type="primary" @click="handleClick(item)"
            >创建测试</el-button
          >
        </div>
      </div>
      <el-card>
        <v-table
          ref="table"
          :data="list.data"
          :columns="list.columns"
          :loading="list.loading"
          :isBackPage="true"
          :totalCount="list.total"
          :defaultPageSize="10"
          :defaultcurrentPage="1"
          v-on:buttonClick="handleButtonClick"
          @handleCurrentChange="
            handleCurrentChange($event, getTransaction, search, 'pageNo')
          "
          @handleSizeChange="
            handleSizeChange($event, getTransaction, search, 'pageSize')
          "
        ></v-table>
      </el-card>
    </div>
  </div>
</template>
<script>
import vTable from '@tool/vtable';
import backPage from '@/mixins/backPagingMixin';
export default {
  mixins: [backPage],
  data() {
    return {
      search: {},
      list: {
        data: [
          {
            orderCode: '1',
            nickName: '知秋',
            mobile: '17338132745',
            type: true,
            del: 0,
          },
        ],
        columns: [
          {
            label: 'ID',
            key: 'orderCode',
            width: '180px',
          },
          {
            label: 'code',
            key: 'nickName',
          },
          {
            label: 'title',
            key: '标题',
          },
          {
            label: '使用页面',
            key: 'mobile',
          },
          {
            label: '创建时间',
            key: 'orderCode',
          },
          {
            label: '操作',
            type: 'action',
            multiActions: true,
            selectButton: true,
            buttonInfos: [
              {
                name: 'edit',
                label: '编辑',
                type: 'text',
              }
            ],
          },
        ],
        // loading: false,
        total: 12,
      },
    };
  },
  components: {
    vTable,
  },
  methods: {
    handleButtonClick(data) {
      if (data.button === 'edit') {
        alert('编辑');
      }
    },
    clearSearch() {
      alert('清空');
    },
    getTransaction() {
      alert('查询');
    },
    handleClick() {
      this.$router.push({
        path: '/user/detail',
        query: {},
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-input{
  width 220px
}
</style>
