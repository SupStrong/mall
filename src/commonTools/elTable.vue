<!-- 封装table组件 -->
<template>
  <div ref="eTable" class="el-tables">
    <el-table
      ref="elTable"
      style="width: 100%"
      :data="tableData"
      :border="border"
      :key="keyIndex"
      :cell-style="cellStyle"
      :header-cell-style="rowClass"
      @row-dblclick="dblclick"
      highlight-current-row
      stripe
      @current-change="handleCurrentChange"
      @selection-change="selectChange"
    >
      <template v-for="(val,index) in filterTableHeader">
        <!-- 索引 -->
        <el-table-column v-if="val.type === 'index'" type="index" :key="index"></el-table-column>

        <!-- 索引 -->
        <el-table-column
          v-else-if="val.type === 'selection'"
          type="selection"
          :key="index"
          width="50"
          :align="val.align?val.align:'center'"
        ></el-table-column>

        <!-- render 函数渲染 -->
        <el-table-column
          v-else-if="val.type === 'render'"
          :key="index"
          :label="val.label"
          :width="val.width"
          :align="val.align?val.align:'center'"
        >
          <my-render  slot-scope="scope" :row="scope.row" :render="val.render"></my-render>
        </el-table-column>

        <!-- 按钮 -->
        <el-table-column
          v-else-if="val.type === 'button'"
          :key="index"
          :label="val.label"
          :width="val.width"
          fixed="right"
          :align="val.align?val.align:'center'"
        >
          <template slot-scope="scope">
            <el-popover placement="right" width="200" trigger="hover" v-if="getScreenWidth < 1400 && val.btnList.length > 1">
              <span v-for="(btnVal,btnKey) in val.btnList" :key="btnKey">
              <el-button
                type="text"
                @click="commitMethod(btnVal.value, scope.row, scope)"
                v-show="typeof(btnVal.getShow) ==='function' ? btnVal.getShow(scope.row, scope) : true"
                :disabled="typeof(btnVal.getDisabled) ==='function' ? btnVal.getDisabled(scope.row,scope) : false"
                class="multi-actions"
              >{{ getBtnName(btnVal,scope.row) }}</el-button>
            </span>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">操作</el-tag>
              </div>
            </el-popover>
            <div v-else>
              <span v-for="(btnVal,btnKey) in val.btnList" :key="btnKey">
                <el-button
                  type="text"
                  @click="commitMethod(btnVal.value, scope.row, scope)"
                  v-show="typeof(btnVal.getShow) ==='function' ? btnVal.getShow(scope.row, scope) : true"
                  :disabled="typeof(btnVal.getDisabled) ==='function' ? btnVal.getDisabled(scope.row,scope) : false"
                  class="multi-actions"
                >{{ getBtnName(btnVal,scope.row) }}</el-button>
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="val.type === 'time'"
          :label="val.label"
          :prop="val.value"
          :key="index"
          :width="val.width"
          :align="val.align?val.align:'center'"
        >
          <template slot-scope="scope">{{ lk.getAllTime(scope.row[val.value]) }}</template>
        </el-table-column>

        <!-- 图片 -->
        <el-table-column v-else-if="val.type === 'image'" :label="val.label" :key="index" :width="val.width" :align="val.align?val.align:'center'">
          <template slot-scope="scope">
            <img
              :src="lk.computedImgUrl(scope.row[val.value])"
              :style="{width:'50px',height: '50px'}"
            />
          </template>
        </el-table-column>

        <!-- 文本 -->
        <el-table-column v-else-if="val.type === 'text'" :label="val.label" :key="index" :align="val.align?val.align:'center'">
          <template slot-scope="scope">{{ scope.row[computedValue(val.value, scope.row)] }}</template>
        </el-table-column>

        <!-- 状态 -->
        <el-table-column v-else-if="val.type === 'code'" :label="val.label" :key="index" :width="val.width" :align="val.align?val.align:'center'">
          <template slot-scope="scope">
            {{computedCode(val, scope.row)}}
          </template>
        </el-table-column>

        <!-- 数组状态 -->
        <el-table-column v-else-if="val.type === 'arrayCode'" :label="val.label" :key="index" :align="val.align?val.align:'center'">
          <template slot-scope="scope">
            <span
              style="margin-right: 10px;"
              v-for="(Twoval, key) in (Array.isArray(scope.row[val.value])? scope.row[val.value] : scope.row[val.value].split(','))"
              :key="key"
            >{{ arrayComputedCode(val, Twoval) }}</span>
          </template>
        </el-table-column>

        <!-- 复杂状态 -->
        <el-table-column v-else-if="val.type === 'hardCode'" :label="val.label" :key="index" :align="val.align?val.align:'center'">
          <template slot-scope="scope">{{ getStatus(scope.row,val) }}</template>
        </el-table-column>

        <!-- 复杂属性 -->
        <el-table-column v-else-if="val.type === 'attr'" :label="val.label" :key="index" :align="val.align?val.align:'center'">
          <template slot-scope="scope">{{ getAttr(val.value, scope.row) }}</template>
        </el-table-column>

        <!--  子任务专属图片列表 -->
        <el-table-column v-else-if="val.type === 'taskImg'" :label="val.label" :key="index">
          <template slot-scope="scope">
            <div v-if="scope.row['imgType']">
              <el-popover trigger="click" placement="top">
                <el-form>
                  <el-form-item
                    v-for="(imgVal,key) in scope.row[val.value]"
                    :key="key"
                    label-width="100px"
                    :label="scope.row.labelBox[key] + ':'"
                  >
                    <p v-for="(val,key) in imgVal"
                      :key="key">
                        <el-image
                        style="width: 100px; height: 100px"
                        :src="val"
                        @click="reload(imgVal, val)"
                        :preview-src-list="imgVal">
                      </el-image>
                      <el-button @click="downloadImg(val)" type="text">下载</el-button>
                    </p>
                  </el-form-item>
                </el-form>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ val.title }}</el-tag>
                </div>
              </el-popover>
            </div>
            <div v-else>
              <el-popover trigger="click" placement="top">
                <div v-for="(val,key) in scope.row[val.value]" :key="key">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="val"
                    :preview-src-list="srcList">
                  </el-image>
                  <el-button @click="downloadImg(val)" type="primary">下载2</el-button>
                </div>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" @click="reload(scope.row[val.value])">{{ val.title }}</el-tag>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>

        <!--  图片列表 -->
        <el-table-column
          v-else-if="val.type === 'imageList'"
          :label="val.label"
          :prop="val.value"
          :key="index"
          :align="val.align?val.align:'center'"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div>
                <el-image
                  style="width: 100px; height: 100px"
                  v-for="(val,key) in scope.row[val.value]"
                  :key="key"
                  :src="val"
                  :preview-src-list="scope.row[val.value]">
                </el-image>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ val.title }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column v-else-if="val.type === 'layoutHtml'" :label="val.label" :key="index" :width="val.width" :align="val.align?val.align:'center'">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <el-row style="max-width: 500px;min-width: 500px;">
                <el-col
                  :span="val.span ? val.span : 10"
                  v-for="(Twoval,key) in getAttr(val.value, scope.row)"
                  :key="key"
                >{{ getAttr(val.attr, Twoval) }}</el-col>
              </el-row>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ val.title ? val.title : '查看'+ val.label }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <!--  popHtml 列表 -->
        <el-table-column
          v-else-if="val.type === 'popHtml'"
          :label="val.label"
          :prop="val.value"
          :align="val.align?val.align:'center'"
          :key="index"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div v-if="val.template">
                <div
                  v-for="(Hval,Hkey) in (Array.isArray(scope.row[val.value]) ? Array.isArray(scope.row[val.value]) : JSON.parse(scope.row[val.value]))"
                  :key="Hkey"
                >
                  <p v-for="(pVal, pKey) in val.template" :key="pKey">
                    <span>{{ pVal }}:</span>
                    <span>{{ Hval[pKey] }}</span>
                  </p>
                </div>
              </div>
              <div v-if="!val.template">{{ scope.row[val.value] }}</div>
              <div
                slot="reference"
                class="name-wrapper"
                v-if="val.template || (!val.template && scope.row[val.value])"
              >
                <el-tag size="medium">{{ val.title ? val.title : '查看'+ val.label }}</el-tag>
              </div>
              <div slot="reference" class="name-wrapper" v-else>无</div>
            </el-popover>
          </template>
        </el-table-column>

        <!-- 完美的多属性显示 -->
        <!-- 传入数组，是多属性。数组里面s是数组是属性值递归。对象type为code是状态值得key -->
        <el-table-column
          v-else
          :label="val.label"
          :key="index"
          :width="val.width"
          :align="val.align ? val.align : 'center'"
        >
          <template slot-scope="scope">
            <!-- 数组为多属性 -->
            <div
              v-if="Object.prototype.toString.call(val.value) === '[object Array]' && typeof(val.value[0]) === 'object'"
            >
              <el-popover placement="right" width="400" trigger="hover" v-if="val.type === 'Popover'">
                <p
                  v-for="(twoVal,twoKey) in  val.value"
                  v-if="typeof(twoVal.getShow) ==='function' ? twoVal.getShow(scope.row) : true"
                  :key="twoKey"
                  :style="typeof(twoVal.style) ==='function' ? twoVal.style(scope.row) : ''"
                  class="multiple-span"
                >
                  <span v-html='twoVal.label' class="popover-label"></span>
                  <span v-html='computedPerfect(twoVal, scope.row, scope)' :class="{ 'text-special': twoVal.special }"></span>
                </p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ val.title ? val.title : '查看'+ val.label }}</el-tag>
                </div>
              </el-popover>
              <div v-else>
                <p
                  v-for="(twoVal,twoKey) in  val.value"
                  v-if="typeof(twoVal.getShow) ==='function' ? twoVal.getShow(scope.row) : true"
                  :key="twoKey"
                  :style="typeof(twoVal.style) ==='function' ? twoVal.style(scope.row) : ''"
                  class="multiple-span"
                >
                  <span v-if="twoVal.label" v-html='twoVal.label' class="popover-label"></span>
                  <span v-html='computedPerfect(twoVal, scope.row, scope)' :class="{ 'text-special': twoVal.special }"></span>
                </p>
              </div>
            </div>
            <!-- 对象为属性 -->
            <div
              v-else-if="Object.prototype.toString.call(val.value) === '[object Object]'"
              v-html='computedPerfect(twoVal, scope.row, scope)'></div>
            <!-- 字符串为单属性 -->
            <div
              v-else-if="val.type === 'Popover' && (typeof(val.getShow) ==='function' ? val.getShow(scope.row,scope) : true)"
            >
              <div v-if="computedPerfect(val, scope.row, scope) && computedPerfect(val, scope.row, scope).length > 30">
                <el-popover placement="right" width="400" trigger="hover">
                  <div v-html='computedPerfect(val, scope.row, scope)'></div>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ val.title ? val.title : '查看'+ val.label }}</el-tag>
                  </div>
                </el-popover>
              </div>
              <div v-else v-html='computedPerfect(val, scope.row, scope)'></div>
            </div>
            <div
              v-else-if="typeof(val.getShow) ==='function' ? val.getShow(scope.row,scope) : true"
              v-html='computedPerfect(val, scope.row, scope)'
            ></div>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="pagination" v-if="isShowPage && isShowPagination">
      <el-pagination
        ref="pagination"
        @size-change="sizeChange"
        :page-sizes="[5, 10, 20, 30, 50, 100, 200, 500]"
        :current-page.sync="currentPage"
        :page-size="number"
        layout="total, prev, pager, next, sizes"
        @current-change="currentChange"
        :total="allPage"
      ></el-pagination>
    </div>

    <p id="imgBox"></p>
  </div>
</template>

<script>
import myRender from './my-render'
import filters from '@/libs/filters'
import { test } from '@/libs/utils.js'
import { mapGetters, mapMutations } from 'vuex'
// 没有消息展示
const errMessage = '暂无数据'
export default {
  data () {
    return {
      currentPage: 1,
      allPage: 0,
      number: 5,
      isShowPagination: true,
      url: '',
      srcList: []
    }
  },
  props: {
    // table数据
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    // table头
    tableHeader: {
      type: Array,
      default () {
        return []
      }
    },

    border: {
      type: Boolean,
      required: false,
      default: true
    },
    // 当前索引
    keyIndex: {
      type: Number,
      default: 0
    },
    // 是否展示分页
    isShowPage: {
      type: Boolean,
      default: true
    },
    // 分页条数
    pageSize: {
      type: String,
      default: 'pageSize'
    },
    // 分页页数
    pageIndex: {
      type: String,
      default: 'pageIndex'
    },
    ajaxObj: {
      type: Object,
      default: null
    }
    //
  },
  watch: {
    tableHeader: {
      handler() {
        this.doLayout()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['getScreenWidth']),
    filterTableHeader: function () {
      let headerList = this.tableHeader.filter(item => {
        return item.isShow ? item.isShow() : true
      })
      return headerList
    }
  },
  methods: {
    ...mapMutations({
      savePage: '存储页码'
    }),
    reload (data, val) {
      if (data && data.indexOf(val) > -1) {
        data.splice(data.indexOf(val), 1)
      }
      if (val) {
        data.unshift(val)
      }
      this.srcList = data ? data.slice() : []
    },
    downloadImg (src) {
      test(src)
    },
    // obj的
    computedObj (obj, row) {
      var result = errMessage
      if (obj.type === 'code') {
        result = obj.statusObj[row]
      }
      return result
    },
    // 最后处理
    userFilter (obj, value, row, scope) {
      var result = errMessage
      if (value) {
        // 有没有拦截器
        result = value
        if (obj.filter) {
          result = obj.filterType ? filters[obj.filter](obj.filterType, value) : filters[obj.filter](value)
        }
        // 有没有处理方法
        if (Array.isArray(obj.func)) {
          for (let i = 0; i < obj.func.length; i++) {
            result = obj.func[i](result, row, scope)
          }
        }
        return result
      } else {
        return result
      }
    },
    // 最完美的封装
    computedPerfect (copyValue, row, scope, type) {
      var val = this.lk.deepCopy(copyValue)
      if (!val.value) {
        return errMessage
      }
      // 数组为子数组属性递归
      if (Object.prototype.toString.call(val.value) === '[object Array]') {
        for (let i = 0; i < val.value.length; i++) {
          if (row[val.value[i]]) {
            return this.userFilter(val, row[val.value[i]], row, scope)
          }
        }
        return errMessage
        //  对象保留扩展
      } else if (Object.prototype.toString.call(val.value) === '[object Object]') {
      } else {
        if (val.type === 'code') {
          return this.userFilter(
            val,
            this.computedObj(val, row[val.value]),
            row,
            scope
          )
        } else if (val.value.indexOf('.') !== -1) {
          val.value = val.value.split('.')
          let result = this.dealArray(val, row)
          return result
        } else if (val.filter || val.func) {
          return this.userFilter(val, row[val.value], row, scope)
        } else {
          return row[val.value] || '-'
        }
      }
    },
    // 数组处理
    dealArray (copyValue, row) {
      var val = this.lk.deepCopy(copyValue)
      if (!val.value) {
        return errMessage
      }
      let result = row
      for (let i = 0; i < val.value.length; i++) {
        if (typeof val[i] === 'object') {
          // 如果数组有对象采用对象判断
          return this.computedObj(val[i], result)
        } else {
          result = result[val.value[i]]
        }
        if (!result) {
          return errMessage
        }
      }
      return this.userFilter(val, result, row)
    },
    // 数组或者对象计算属性
    arrayComputedCode (val, twoVal) {
      if (val.array) {
        for (let i of val.array) {
          if (i.id - 0 === twoVal - 0) {
            return i[val.key]
          }
        }
      }
    },
    // 计算状态
    getStatus (row, arr) {
      for (let i = 0; i < arr.value.length; i++) {
        if (row[arr.value[i]] === arr.active[i]) {
          return arr.obj[i][row[arr.value[i]]]
        } else {
          if (!arr.active[i]) {
            return arr.obj[i][row[arr.value[i]]]
          }
        }
      }
    },
    // 获取属性
    getAttr (arr, row) {
      let result = {}
      if (Array.isArray(arr)) {
        result = row
        for (let i = 0; i < arr.length; i++) {
          result = result[[arr[i]]]
        }
      } else {
        result = row[arr]
      }
      return result
    },
    // 值为空的时候
    getText (a, b) {
      if (a) {
        return a
      } else {
        return b.default
      }
    },
    // 计算属性
    computedCode (val, row) {
      if (Array.isArray(val.value)) {
        for (let i = 0; i < val.value.length; i++) {
          if (Array.isArray(val.value[i])) {
            let demo = row
            for (let j = 0; j < val.value[i].length; j++) {
              demo = demo[val.value[i][j]]
            }
            return val.statusObj[i][demo]
          } else {
            if (val.statusObj[i][row[val.value[i]]]) {
              return val.statusObj[i][row[val.value[i]]]
            }
          }
        }
      } else {
        if (row[val.value] !== undefined) {
          return val.statusObj[row[val.value]]
        } else {
          return '无'
        }
      }
    },
    // 多个属性并列的情况
    computedValue (value, row) {
      if (Array.isArray(value)) {
        if (row[value[0]]) {
          return value[0]
        } else if (row[value[1]]) {
          return value[1]
        } else {
          return value[2]
        }
      } else {
        return value
      }
    },
    // 请求数据
    getData (index) {
      if (typeof index === 'object') {
        index = false
      }
      this.isShowPagination = false
      setTimeout(() => {
        this.isShowPagination = true
      }, 20)
      this.currentPage = index || this.currentPage
      if (this.isShowPage) {
        if (this.ajaxObj.data.bizParam) {
          this.ajaxObj.data.bizParam[this.pageIndex] = this.currentPage
          this.number = this.ajaxObj.data.bizParam[this.pageSize]
        } else {
          this.ajaxObj.data[this.pageIndex] = this.currentPage
          this.number = this.ajaxObj.data[this.pageSize]
        }
      }
      this.$axios({
        method: this.ajaxObj.methods || this.ajaxObj.method || 'post',
        url: this.ajaxObj.url,
        data: this.ajaxObj.data,
        params: this.ajaxObj.methods === 'get' ? this.ajaxObj.data : null
      }).then(result => {
        if (result.data.statusCode === 200) {
          // 初始化分页器 每个分页请求都要写上
          if (this.isShowPage) {
            this.allPage = result.data.data.total - 0
          }
          if (result.data.data) {
            if (this.ajaxObj.data && this.ajaxObj.data.isLongTerm === 1) {
              result.data.data.list.map(item => {
                item.isLongTerm = 1
              })
            }
            this.$emit('sumbitData', result.data.data)
          } else {
            if (this.ajaxObj.data && this.ajaxObj.data.isLongTerm === 1) {
              result.data.list.map(item => {
                item.isLongTerm = 1
              })
            }
            this.$emit('sumbitData', result.data)
          }
          return
        } else {
          this.$emit('noData')
        }
        if (result.data.returnType.resultCode === 100) {
          this.$emit('sumbitData', result.data.returnType)
        } else {
          this.$message.error(result.data.returnType.errMsg)
        }
      })
    },
    // 重新绘制table
    doLayout () {
      this.$refs.elTable.doLayout()
    },
    // 单选改变
    handleCurrentChange (row) {
      this.$emit('currentChange', row)
    },
    // 多选改变
    selectChange (row) {
      this.$emit('selectChange', row)
    },
    // 页数改变
    sizeChange (size) {
      if (this.ajaxObj.data.bizParam) {
        this.ajaxObj.data.bizParam[this.pageSize] = size
      } else {
        this.ajaxObj.data[this.pageSize] = size
      }
      this.getData(1)
    },
    // 翻页动作
    currentChange (index) {
      this.savePage(index)
      this.getData(index)
    },
    // 得到按钮名字
    getBtnName (val, row) {
      if (val.type === 'code') {
        if (val.statusObj[row[val.value]]) {
          return val.statusObj[row[val.value]]
        } else {
          return ''
        }
      } else {
        return val.label
      }
    },
    // 得到按钮类别
    getBtnClass (val, row) {
      if (val.class) {
        return val.class[row[val.value]]
      } else {
        return null
      }
    },
    // 双击
    dblclick (row, column, event) {
      event.location = window.location.href
      this.$store.commit('存储事件', event)
      this.$emit('dblclick', row, column, event)
    },
    // 按钮点击
    commitMethod (type, row, key) {
      this.$store.commit('存储列表数据', row)
      this.$emit('commitMethod', type, row, key)
    },
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      return 'text-align: center'
    },
    rowClass ({ row, rowIndex }) {
      return 'text-align: center; background-color: #eaeefb'
    }
  },
  components: {
    myRender
  }
}
</script>

<style scoped lang='stylus'>
body.el-tables th.gutter
    display: table-cell!important
.el-tables
  .pagination
    padding: 20px 0 0
    text-align: right
  >>>.el-dialog
    .imgCenter
      text-align center !important
  .el-dialog--center
    .imgCenter
      text-align center !important
.multi-actions
  margin: 0 0 5px 10px
.multiple-span
  overflow hidden
  // text-overflow ellipsis
  white-space nowrap
  span
    display inline-block
  .popover-label
    text-align right
    min-width 60px
  .text-special
    color: red
</style>
