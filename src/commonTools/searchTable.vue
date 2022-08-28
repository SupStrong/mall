<template>
  <el-dialog :title="'查看' + searchType" :before-close="close" :visible.sync="isShowSearch">
    <div class="j_center" @click.stop>
      <el-form labelWidth="120px">
        <el-row v-if="searchType !== '供应商'">
          <el-col :span="12">
            <el-form-item :label="searchType === '用户' ? '手机号': (searchType +'名称:')">
              <el-input
                type="text"
                v-model="userName"
                maxlength="11"
                :placeholder="(searchType === '用户' ? '请输入用户手机号': ('请输入'+ searchType +'名称'))"
                @keyup.enter.native="getData"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="8">
            <el-form-item label="供应商名称："  v-if="searchType === '供应商'">
               <el-input
                type="text"
                v-model="oneName"
                placeholder="请输入供应商名称"
                style='width:300px'
                @keyup.enter.native="getData"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
         </el-row>
        <el-row v-if="searchType !== '用户'">
          <el-col :span="24">
            <el-form-item label="选择地区：" >
              <testCity  @Citychange="Citychange" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="button-box">
          <el-button type='primary' @click="getData">查询</el-button>
          <el-button type='primary' v-if="searchType === '供应商' && isShowAddSupply" @click="gotoAddSupplier">新增供应商</el-button>
        </el-row>
      </el-form>
      <elCopyTable
        ref="table"
        :keyIndex="3"
        :tableHeader="tableHead"
        :tableData="serverBox"
        @sumbitData="sumbitData"
        :ajaxObj="ajaxObjItem"
        @commitMethod="commitMethod"
        @selectChange="selectChange"
        :isShowPage="isShowPage"
      />
      <div slot="footer" class="button-box-center" v-if="!singleChose">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="sumbit()">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import elCopyTable from '@tool/elTable'
import testCity from '@tool/testCity'
export default {
  data () {
    return {
      ajaxObjItem: {},
      currenRow: [],
      tableHead: [],
      isShowPage: true,
      obj: {},
      cityId: null,
      userName: '',
      oneName: null,
      twoName: null,
      threeName: null,
      table: [],
      serverBox: [],
      hasCustomer: true,
      isShowSearch: false
    }
  },
  props: {
    searchType: {
      type: String,
      default: ''
    },
    searchName: {
      type: String,
      default: ''
    },
    isShowAddSupply: {
      type: Boolean,
      default: false
    },
    supplier: {
      type: Array,
      default () {
        return []
      }
    },
    singleChose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    commitMethod (type, row) {
      if (type === '选择') {
        this.currenRow = row
        this.sumbit()
      }
    },
    // 城市改变
    Citychange (city) {
      this.cityId = city.shi.code
    },
    selectChange (row) {
      this.currenRow = row
    },
    // 获取数据
    sumbitData (data) {
      if (this.searchType === '用户') {
        this.serverBox = data
        this.hasCustomer = !!data.length
        this.$emit('hasMobile', this.hasCustomer)
      } else {
        this.serverBox = data.list
      }
    },
    // 去创建供应商
    gotoAddSupplier () {
      this.$router.push({
        path: '/SupplierAdmin/addSupplier',
        query: {
          backPage: '/downOrder'
        }
      })
    },
    // 查询历史
    getData () {
      if (this.searchType === '用户') {
        this.ajaxObjItem.data.mobile = this.userName
      } else if (this.searchType === '供应商') {
        this.ajaxObjItem.data.bizParam.oneName = this.oneName
        this.ajaxObjItem.data.bizParam.twoName = this.twoName
        this.ajaxObjItem.data.bizParam.threeName = this.threeName
      } else {
        this.ajaxObjItem.data.bizParam.name = this.userName
        this.ajaxObjItem.data.bizParam.cityId = this.cityId
        // this.ajaxObjItem.data.bizParam.one = 123
      }
      if (this.$refs.table) {
        this.$refs.table.getData(1)
      } else {
        setTimeout(() => {
          this.$refs.table.getData(1)
        }, 200)
      }
    },
    clear () {
      this.id = null
      this.userName = ''
    },
    close () {
      this.isShowSearch = false
    },
    open () {
      this.isShowSearch = true
      this.$nextTick(() => {
        this.init()
      })
    },
    // 提交
    sumbit () {
      if (this.currenRow === null) {
        this.$message.error('请选择' + this.searchType)
        return
      }
      this.$emit('sumbit', this.currenRow, this.searchType)
      this.close()
    },
    // 初始化
    init () {
      this.userName = this.searchName
      if (this.userName === null) {
        this.userName = ''
      }
      if (this.searchType === '供应商') {
        this.isShowPage = true
        this.ajaxObjItem.methods = 'post'
        this.ajaxObjItem.url = this.yh + '/merchant/list'
        this.ajaxObjItem.data = {
          bizParam: {
            category: 1,
            endDate: null,
            mobile: null,
            name: this.userName,
            pageIndex: 1,
            pageSize: 5,
            ids: this.supplier.join(','),
            startDate: null,
            oneName: null,
            twoName: null,
            threeName: null
          }
        }
        this.tableHead = [
          {
            type: 'selection'
          },
          {
            label: '供应商名称',
            value: 'name'
          },
          {
            label: '供应商联系方式',
            value: 'mobile'
          },
          {
            label: '级别',
            value: 'merchantLevel',
            width: '120px'
          },
          {
            label: '余额',
            value: 'availableBalance'
          },
          {
            label: '结算方式',
            value: 'assetsType',
            type: 'code',
            statusObj: {
              1: '单结',
              2: '月结',
              3: '单结'
            }
          },
          {
            label: '操作',
            type: 'button',
            width: '90px',
            btnList: [
              {
                label: '选择',
                value: '选择'
              }
            ]
          }
        ]
        if (this.singleChose) {
          this.tableHead.splice(0, 1)
        }
      } else if (this.searchType === '服务商') {
        this.ajaxObjItem.methods = 'post'
        this.ajaxObjItem.url = this.yh + '/merchant/queryList'
        this.ajaxObjItem.data = {
          bizParam: {
            category: 0,
            endDate: null,
            mobile: null,
            name: this.userName,
            pageIndex: 1,
            pageSize: 5,
            startDate: null
          }
        }
        this.tableHead = [
          {
            type: 'selection'
          },
          {
            label: '服务商名称',
            value: 'name'
          },
          {
            label: '服务商联系方式',
            value: 'mobile'
          },
          {
            label: '操作',
            type: 'button',
            width: '90px',
            btnList: [
              {
                label: '选择',
                value: '选择'
              }
            ]
          }
        ]
        if (this.singleChose) {
          this.tableHead.splice(0, 1)
        }
      } else if (this.searchType === '管家平台') {
        this.ajaxObjItem.methods = 'post'
        this.ajaxObjItem.url = this.yh + '/merchant/queryList'
        this.ajaxObjItem.data = {
          bizParam: {
            category: 0,
            endDate: null,
            mobile: null,
            name: this.userName,
            pageIndex: 1,
            pageSize: 5,
            startDate: null
          }
        }
        this.tableHead = [
          {
            label: '商户名称',
            value: 'name'
          },
          {
            label: '商户联系方式',
            value: 'mobile'
          }
        ]
      } else {
        this.isShowPage = false
        this.ajaxObjItem.methods = 'get'
        this.ajaxObjItem.url = this.yh + '/user/bs/info'
        this.ajaxObjItem.data = {
          mobile: this.userName
        }
        this.tableHead = [
          {
            label: '会员姓名',
            value: 'userName'
          },
          {
            label: '联系人姓名',
            value: 'receiverName'
          },
          {
            label: '联系人手机号',
            value: 'receiverMobile'
          },
          {
            label: '联系人详细地址',
            value: 'receiverAddress'
          },
          {
            label: '操作',
            type: 'button',
            width: '90px',
            btnList: [
              {
                label: '选择',
                value: '选择'
              }
            ]
          }
        ]
      }
      this.getData()
    }
  },
  components: {
    elCopyTable,
    testCity
  }
}
</script>
<style scoped lang="stylus">
.button-box
  text-align right
.button-box-center
  text-align center
</style>
