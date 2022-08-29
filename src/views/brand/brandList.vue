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
            <el-form-item label="品牌名：">
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
          <el-button
          type="primary"
            @click="handleClick(item)"
          >创建</el-button>
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
            handleCurrentChange(
              $event,
              getTransaction,
              search,
              'pageNo'
            )
          "
          @handleSizeChange="
            handleSizeChange(
              $event,
              getTransaction,
              search,
              'pageSize'
            )
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
            del: 0
          }
        ],
        columns: [
          {
            label: 'ID',
            key: 'orderCode',
            width: '180px'
          },
          {
            label: '品牌名',
            key: 'nickName'
          },
          {
            label: '别名',
            key: 'mobile'
          },
          {
            label: '英文名称',
            key: 'mobile'
          },
          {
            label: '标签',
            key: 'status',
            width: '200',
            type: 'render',
            render: (h, params) => {
              return (<div>
                <el-button type="warning" size='mini'>少女风</el-button>
                <el-button type="success" size='mini'>10~20岁</el-button>
              </div>)
            }
          },
          {
            label: '国籍',
            key: 'mobile'
          },
          {
            label: '创立时间',
            key: 'mobile'
          },
          {
            label: '生产厂家/场地',
            key: 'mobile'
          },
          {
            label: '成立时间',
            key: 'mobile'
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
                type: 'text'
              },
              {
                name: 'delete',
                label: '删除',
                type: 'text'
              }
            ]
          }
        ],
        // loading: false,
        total: 12
      }
    }
  },
  components: {
    vTable
  },
  methods: {
    handleButtonClick(data) {
      if (data.button === 'edit') {
        this.$router.push({
          path: '/brand/brandCreate',
          query: {
            id: data.data.id
          }
        });
      } else if (data.button === 'delete') {
        this.$confirm('此操作将删除《' + data.data.nickName + '》品牌删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
          })
          .catch(() => {});
      }
    },
    clearSearch() {
      alert('清空')
    },
    getTransaction() {
      alert('查询')
    },
    handleClick() {
      this.$router.push({
        path: '/brand/brandCreate',
        query: {
        }
      });
    }
  }
}
</script>
<style lang='stylus' scoped>
.el-input{
  width 220px
}
</style>
