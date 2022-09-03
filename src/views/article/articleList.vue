<template>
  <div class="page">
    <el-form>
      <searchField>
        <el-row>
          <el-col :span="6">
            <el-form-item label="标识：">
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
            <el-form-item label="类型：">
              <el-input v-model="search.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态：">
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
          >创建测试</el-button>
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
            orderCode: '1',
            nickName: '知秋',
            mobile: '17338132745',
            type: true,
            del: 0
          }
        ],
        columns: [
          {
            label: '标识',
            key: 'orderCode',
            width: '180px'
          },
          {
            label: '文章标题',
            key: 'nickName'
          },
          {
            label: '文章类型',
            key: 'mobile'
          }, {
            label: '创建时间',
            key: 'mobile'
          }, {
            label: '发布状态',
            key: 'status',
            type: 'render',
            render: (h, params) => {
              let type = params.row.type
              return (<div>
                <el-switch
                  value="type"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </div>)
            }
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
                type: 'text',
                isShow (row) {
                  return row.del !== 0
                }
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
      if (data.button === 'check') {
        alert('查看')
      } else if (data.button === 'edit') {
        alert('编辑')
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
        path: '/article/articleCreate',
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
