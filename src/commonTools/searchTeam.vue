<template>
  <div class="item">
    <!-- 查询组织 -->
    <el-select clearable v-model="result.oneId" @change="oneChange" placeholder="请选择一级组织">
      <el-option v-for="(val,key) in oneItem" :label="val.name" :value="val.id" :key="key"></el-option>
    </el-select>
    <el-autocomplete
      v-model="searchName"
      :fetch-suggestions="querySearchAsync"
      value-key='name'
      placeholder="请输入二级组织名"
      @select="twoChange"
      clearable
      style="margin-left:10px"
    ></el-autocomplete>
    <span v-if="isSelectJs" style="margin-left:20px;color:#606266">
      <!-- 结算工程师： -->
      <span>{{ jsName }}</span>
    </span>
      <el-dialog title="直营工程师" :visible.sync="dialogTableVisible">
        <el-input placeholder="请输入工程师姓名" v-model="technicianName" @input="getData" style="width: 40%;"></el-input>
        <el-input placeholder="请输入工程师手机号" v-model="mobile" @input="getData" style="width: 40%;"></el-input>
        <el-table :data="tableData" highlight-current-row @current-change="handleCurrentChange">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="id" label="ID" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="mobile" label="手机号"></el-table-column>
          <el-table-column property="provinceName" label="服务省份"></el-table-column>
          <el-table-column property="cityName" label="服务城市"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="sumbitJs">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { throttel } from '@/assets/js/cookie'
export default {
  data () {
    return {
      tableData: [],
      oneItem: [],
      twoItem: [],
      searchName: '',
      result: {
        oneId: null,
        oneName: null,
        twoId: null,
        twoName: null
      },
      jsObj: {},
      jsName: '',
      technicianName: '',
      mobile: '',
      technicianPhone: null,
      dialogTableVisible: false
    }
  },
  props: {
    isSelectJs: {
      type: Boolean,
      default: false
    },
    isAllotJs: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 获取数据
    getData: throttel(function () {
      if (!this.result.twoId) {
        return
      }
      this.$axios({
        method: 'get',
        url: this.yh + '/serviceorganize/technicians',
        params: {
          serviceOrganizeId: this.result.twoId,
          technicianName: this.technicianName,
          mobile: this.mobile
        }
      }).then(result => {
        if (result.data.statusCode === 200) {
          this.tableData = result.data.data
        }
      })
    }, 1000),
    // 清除组织
    clear () {
      this.result = {
        oneId: null,
        oneName: null,
        twoId: null,
        twoName: null
      }
    },
    // 优化二级组织
    querySearchAsync (queryString, cb) {
      // 请求数据
      this.jsObj = {}
      this.jsName = this.jsObj.name
      this.$emit('sumbitJs', this.jsObj, this.result)
      if (queryString) {
        this.searchName = queryString
        this.getItem(this.result.oneId, cb)
      } else {
        cb()
        this.result.twoId = null
        this.$emit('selectItem', this.result)
      }
    },
    // 获取组织
    getItem (id, close) {
      this.$axios({
        method: 'post',
        url: this.yh + '/serviceorganize/list',
        data: {
          level: id ? 2 : 1,
          page: 1,
          rows: 1000,
          parentId: id || null,
          name: this.searchName
        }
      }).then(result => {
        // if (id) {
        //   this.twoItem = result.data.data;
        // } else {
        //   this.oneItem = result.data.data;
        // }
        if (close) {
          close(result.data.data)
        } else {
          this.oneItem = result.data.data
        }
      })
    },
    // 一级组织改变
    oneChange () {
      this.oneItem.forEach(val => {
        if (val.id === this.result.oneId) {
          this.result.oneName = val.name
        }
      })
    },
    // 二级组织改变
    twoChange (row) {
      this.jsObj = {}
      this.jsName = this.jsObj.name
      this.$emit('sumbitJs', this.jsObj, this.result)
      this.result.twoName = row.name
      this.result.twoId = row.id
      // this.twoItem.forEach(val => {
      //   if (val.id === this.result.twoId) {
      //     this.result.twoName = val.name;
      //   }
      // });
      if (this.isSelectJs || this.isAllotJs) {
        this.dialogTableVisible = true
        this.getData()
      } else {
        this.$emit('selectItem', this.result)
      }
    },
    // 提交工程师id
    sumbitJs () {
      if (this.jsObj.id === undefined) {
        this.$message.error('请选择工程师')
        return
      }
      this.jsName = this.jsObj.name
      this.$emit('sumbitJs', this.jsObj, this.result)
      this.dialogTableVisible = false
    },
    // 选择工程师
    handleCurrentChange (row) {
      this.jsObj = row
    }
  },
  created () {
    this.getItem()
  }
}
</script>
