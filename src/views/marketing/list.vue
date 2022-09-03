<template>
  <div class="page">
    <el-form>
      <searchField>
        <el-row>
          <el-col :span="6">
            <el-form-item label="活动创建人：">
              <el-input v-model="search.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人手机号：">
              <el-input v-model="search.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动类型：">
              <el-input v-model="search.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动状态：">
              <el-input v-model="search.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="创建时间：">
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
      <!-- <div class="button-box">
        <div class="button-field">
          <el-button type="primary" @click="handleClick(item)">创建</el-button>
        </div>
      </div> -->
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
            id: 1,
            orderCode: '1',
            nickName: '知秋',
            mobile: '17338132745',
            type: true,
            del: 0,
          },
        ],
        columns: [
          {
            label: '创建人',
            key: 'orderCode',
            width: '180px',
          },
          {
            label: '联系方式',
            key: 'nickName',
          },
          {
            label: '活动创建时间',
            key: 'mobile',
          },
          {
            label: '活动类型',
            key: 'mobile',
          },
          {
            label: '活动状态',
            key: 'mobile',
          },
          {
            label: '关联商品个数',
            key: 'mobile',
          },
          {
            label: '活动（开始时间-结束时间）',
            key: 'mobile',
          },
          {
            label: '邀请人数',
            key: 'mobile',
          },
          {
            label: '带货单数',
            key: 'mobile',
          },
          {
            label: '操作',
            type: 'action',
            multiActions: true,
            selectButton: true,
            buttonInfos: [
              {
                name: 'show',
                label: '查看',
                type: 'text',
              },
            ],
          },
        ],
        total: 12,
      },
    };
  },
  components: {
    vTable,
  },
  methods: {
    handleButtonClick(data) {
      if (data.button === 'show') {
        this.$router.push({
          path: '/marketing/detail',
          query: {
            id: data.data.id,
          },
        });
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
        path: '/marketing/detail',
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
