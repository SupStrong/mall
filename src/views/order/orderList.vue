<template>
  <div class="page">
    <el-form>
      <searchField>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单号：">
              <el-input v-model="search.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户手机号：">
              <el-input v-model="search.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户：">
              <el-input v-model="search.title"></el-input>
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
          <el-button type="primary" @click="handleClick(item)">创建</el-button>
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
            id: 1,
            orderCode: '1',
            nickName: '知秋',
            mobile: '17338132745',
            type: true,
            del: 0,
            a: '规格 * 价格 * 数量'
          },
        ],
        columns: [
          {
            label: '订单号',
            key: 'nickName',
          },
          {
            label: '联系方式',
            key: 'mobile',
          },
          {
            label: '收货人',
            key: 'mobile',
          },
          {
            label: '品牌',
            key: 'mobile',
          }, {
            label: '商品名称',
            key: 'a',
          },
          {
            label: '下单时间',
            key: 'mobile',
          }, {
            label: '商品信息',
            key: 'a',
          }, {
            label: '商品总价',
            key: 'mobile',
          },
          {
            label: '优惠价',
            key: 'mobile',
          }, {
            label: '最终支付价',
            key: 'mobile',
          },
          {
            label: '订单状态',
            key: 'mobile',
          },
          {
            label: '物流状态',
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
              {
                name: 'logistics',
                label: '物流',
                type: 'logistics',
              },
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
      if (data.button === 'show') {
        this.$router.push({
          path: '/order/orderDetail',
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
        path: '/goods/goodDetail',
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
