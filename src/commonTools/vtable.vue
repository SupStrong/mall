<template>
<!-- 如果不需要后台分页，则由 isDefaultPage 控制是否将页数恢复为1。场景：父组件点击查询时页码不是第一页，防止查出数据无法展示 -->
  <div class="table-container">
    <el-table
      ref="table"
      :data="paginationData"
      :border="border"
      stripe
      style="width: 100%"
      :show-header="showHeader"
      v-loading="loading"
      :cell-style="cellStyle"
      :header-cell-style="cellClass"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @expand-change="handleExpandChange"
      @clearSelection="clearSelection"
      @row-dblclick='dblclick'
      highlight-current-row
      :row-key="getRowKey"
      :expand-row-keys="expands"
      :class="noSelectAll ? 'no-select-all' : ''"
      :span-method="objectSpanMethod"
    >
      <el-table-column type="expand" :key="slotKey" v-if="innerTable" :label="expandData.label" :width="expandData.width">
        <slot name="innerTable"></slot>
      </el-table-column>
      <el-table-column v-if="selection" type="selection" width="55" align="center"></el-table-column>
      <el-table-column v-if="SingleChoose" label="选择" width="70" align="center" class="radioChoose">
        <template slot-scope="scope">
          <el-radio :label="scope.$index" v-model="chooseList" @change.native="getCurrentRow(scope.row)"></el-radio>
        </template>
      </el-table-column>
        <!-- column.isRenderHeader控制是否有提示，column.info控制提示文字 -->
      <el-table-column
        v-for="(column, index) in reallyColumns"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :max-width="column.maxWidth"
        :sortable="column.sortable"
        :key="index"
        :fixed="column.fixed"
        :align="column.align || 'center'"
        :show-overflow-tooltip="column.showOverflowTooltip"
        :render-header="column.isRenderHeader?renderHeader:''"
      >
        <el-table-column
          v-if="column.type === 'multi_header'"
          v-for="(item, index) in column.children"
          :prop="item.key"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :key="index"
          :align="item.align || 'center'"
        >
          <template slot-scope="scope">
            <span>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
        <template slot-scope="scope">
          <img style="cursor: pointer;" title="点击预览" v-if="column.type === 'image'" :src="scope.row[column.key]" :alt="scope.row[column.key]" @click="previewImg(scope.row[column.key])">
          <div class="action-con" v-else-if="column.type === 'action'">
            <el-popover placement="right" width="200" trigger="hover" v-if="getScreenWidth < 1400 && column.buttonInfos.length > 1">
              <el-button
              v-for="button in column.buttonInfos"
              v-if="button.isShow ? button.isShow(scope.row) : true"
              :key="button.name"
              size="small"
              type="text"
              :class="[column.multiActions ? 'multi-actions' : '']"
              @click="handleButtonClick(button.name, scope.row, scope.$index)">{{ button.label }}</el-button>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">操作</el-tag>
              </div>
            </el-popover>
            <span v-else>
              <span>
                <el-button
                v-for="button in column.buttonInfos"
                v-if="button.isShow ? button.isShow(scope.row) : true"
                :key="button.name"
                size="small"
                type="text"
                :class="[column.multiActions ? 'multi-actions' : '']"
                @click="handleButtonClick(button.name, scope.row, scope.$index)">{{ button.label }}</el-button>
              </span>
            </span>
          </div>
          <my-render v-else-if="column.type === 'render'" :row="scope.row" :render="column.render"></my-render>
          <div v-else-if="column.type === 'url'">
            <span v-if="!scope.row[column.key]">无</span>
            <router-link class="url-a"  v-else :to="{path: column.link, query: {bill_id: scope.row[column.link_name]} }">{{scope.row[column.link_name] || '跳转链接'}}</router-link>
          </div>
          <div v-else-if="column.type === 'edit'">
            <el-input-number
              class="input-num"
              :controls="false"
              size="mini"
              v-model="scope.row[column.key]"
              :disabled="scope.row.status === 1"
            ></el-input-number>
          </div>
          <span v-else-if="column.type === 'html'" v-html="scope.row[column.key]"></span>
          <el-input
            v-else-if="column.type === 'input'"
            :readonly="false"
            :type="column.inputType ? column.inputType : 'text'"
            @input="inputHandler($event, scope.row, column.key, scope.$index)"
            :value="scope.row[column.key]"></el-input>
          <div v-else-if="column.type === 'radio'">
            <el-radio @change.native="getTemplateRow(scope.row)" :label="scope.row.package_id || scope.row.rise_package_id" v-model="radio" class="textRadio">&nbsp;</el-radio>
          </div>
          <div v-else-if="column.type === 'poppover'">
            <el-popover
              v-if="scope.row[column.main_key]"
              placement="top-start"
              :title="column.label"
              width="400"
              trigger="hover"
              :content="scope.row[column.main_key]"
              >
              <el-tag size="medium" slot="reference">{{column.label}}</el-tag>
            </el-popover>
            <span v-else>-</span>
          </div>
          <div v-else-if="column.type === 'poppoverOther'">
            <div v-if="scope.row[column.key]">
              <el-popover
                v-if="scope.row[column.main_key]"
                placement="top-start"
                :title="column.label"
                width="300"
                trigger="hover"
                :content="scope.row[column.main_key]"
                >
                <el-button slot="reference" type="primary">{{scope.row[column.key]}}</el-button>
              </el-popover>
              <span v-else>{{scope.row[column.key]}}</span>
            </div>
            <span v-else>-</span>
          </div>
          <div v-else-if="column.type === 'poppoverRemarks'">
            <div v-if="scope.row[column.key].length > 10">
              <el-popover
                placement="top-start"
                :title="column.label"
                width="300"
                trigger="hover"
                :content="scope.row[column.key]">
                <el-button slot="reference" type="primary">{{column.text_key}}</el-button>
              </el-popover>
            </div>
            <span v-else>{{scope.row[column.key]}}</span>
          </div>
          <span v-else-if="column.type === 'line_through'" :class="scope.row.isElide ? 'elide' : ''">{{ scope.row[column.key]}}</span>
          <span v-else :style="column.style">{{ scope.row[column.key] | filter(column.filter, column.filterProps) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="showPagination">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, sizes"
        :page-sizes="[5, 10, 20, 50, 100, 500, 1000]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="图片预览" width="40%" :visible.sync="showImgPreview" class="img-preview">
      <div class="image">
        <img :src="imgSrc">
      </div>
        <div slot="footer" class="search-button-container">
          <el-button type="primary" @click="showImgPreview = false">关闭</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import MyRender from './my-render'
import { getTableBtn } from '@/assets/js/power.js'

export default {
  props: {
    // 新的内容
    // 表头
    colConfigs: {
      type: Array,
      default: () => []
    },
    isBackPage: {
      type: Boolean,
      required: false,
      default: false
    },

    totalCount: {
      type: Number,
      required: false,
      default: 0
    },

    showHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      required: false,
      default: false
    },

    selection: {
      type: Boolean,
      required: false,
      default: false
    },
    SingleChoose: {
      type: Boolean,
      required: false,
      default: false
    },

    selectionRow: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },

    noSelectAll: {
      type: Boolean,
      required: false,
      default: false
    },

    data: {
      type: Array,
      required: true,
      default: () => ([])
    },

    columns: {
      type: Array,
      required: true,
      default: () => ([])
    },

    border: {
      type: Boolean,
      required: false,
      default: true
    },

    stripe: {
      type: Boolean,
      required: false,
      default: true
    },

    defaultPageSize: {
      type: Number,
      required: false,
      default: 20
    },

    loading: {
      type: Boolean,
      required: false,
      default: false
    },

    showPagination: {
      type: Boolean,
      required: false,
      default: true
    },

    innerTable: {
      type: Boolean,
      required: false,
      default: false
    },

    expands: {
      type: Array,
      required: false,
      default: () => ([])
    },

    getRowKey: {
      type: Function,
      required: false,
      default: function () {}
    },

    expandData: {
      type: Object,
      required: false,
      default: () => ({})
    },

    isElide: {
      type: Boolean,
      required: false,
      default: false
    },

    slotKey: {
      type: Number,
      required: false
    },

    auth: {
      type: Boolean,
      default: false,
      required: false
    },
    cellStyle: {
      type: Function,
      required: false,
      default: function () {}
    },
    objectSpanMethod: {
      type: Function,
      required: false,
      default: function () {}
    },
    single: {
      type: Boolean,
      required: false,
      default: false
    },
    headerIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    isDefaultPage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    MyRender
  },
  data () {
    return {
      chooseList: null,
      currentPage: 1,
      pageSize: this.defaultPageSize,
      showImgPreview: false,
      imgSrc: '',
      radio: ''
    }
  },
  watch: {
    columns (val) {
      this.$refs.table.doLayout()
      // this.columns = val.slice(0)
    },
    isDefaultPage: {
      handler (val) {
        if (val) {
          this.currentPage = 1
          this.isDefaultPage = false
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['getRows', 'getScreenWidth']),
    paginationData () {
      let tempData = []
      if (this.isBackPage) {
        tempData = this.data
      } else {
        let pageTotal = this.data.length
        let pageFirstCount = this.pageSize * (this.currentPage - 1)
        let maxCount = pageTotal - pageFirstCount < this.pageSize ? pageTotal : (pageFirstCount + this.pageSize)

        for (let i = pageFirstCount; i < maxCount; i++) {
          tempData.push(this.data[i])
        }
      }
      return tempData
    },

    total: function () {
      return this.isBackPage ? this.totalCount : this.data.length
    },

    reallyColumns () {
      let btnArray = getTableBtn(this).map(item => {
        return {
          name: item.value,
          label: item.showName,
          type: 'text',
          isShow: (data) => {
            return item.showColumn ? item.showValue.includes(data[item.showColumn] + '') : true
          }
          // + '' === item.showValue + ''
        }
      })

      let realColums = this.auth ? this.columns.map(item => {
        if (item.type === 'action') {
          item.buttonInfos = btnArray
        }
        return item
      }) : this.columns
      return realColums
    }
  },
  methods: {
    ...mapMutations({
      SET_ROW: '存储列表数据',
      ROW_SELECT: '选中列表'
    }),
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      if (this.isBackPage) {
        this.$emit('handleCurrentChange', currentPage)
      }
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      if (this.isBackPage) {
        this.$emit('handleSizeChange', pageSize)
      }
    },

    dblclick (row, column, event) {
      this.$emit('dblclick', row, column, event)
    },

    handleButtonClick (button, row, index) {
      this.SET_ROW(row)
      this.$emit('buttonClick', {
        button: button,
        data: Object.assign({}, row),
        rowIndex: index
      })
    },

    handleSelectionChange (val) {
      this.ROW_SELECT(val) // save row info in an Array into vuex.state called `rowAction`
      this.$emit('selected', val, this.currentPage)
    },

    handleSelect (selection, row) {
      this.ROW_SELECT(selection)
      this.$emit('select', {
        selection,
        row
      })
      if (this.single) {
        this.$refs.table.clearSelection()
        if (selection.length === 0) { // 判断selection是否有值存在
          return
        };
        this.$refs.table.toggleRowSelection(row, true)
      }
    },

    handleSelectAll (selection) {
      this.$emit('selectAll', selection)
    },

    getTemplateRow (row) {
      this.ROW_SELECT([row])
    },
    // 清空选择
    clearSelection () {
      this.$refs.table.clearSelection()
    },

    handleExpandChange (row) {
      this.$emit('expandChange', row)
    },

    // 切换选择
    toggleRowSelection (row, status) {
      this.$refs.table.toggleRowSelection(row, status)
    },

    inputHandler (val, row, column, index) {
      this.$emit('inputChange', {
        val,
        row,
        column,
        index
      })
    },

    previewImg (src) {
      this.imgSrc = src
      this.showImgPreview = true
    },
    // cellStyle ({ row, column, rowIndex, columnIndex }) {
    //   return 'text-align: center'
    // },
    cellClass ({ row, column, rowIndex, columnIndex }) {
      return 'text-align: center; background-color: #eaeefb;'
    },
    getCurrentRow (row) {
      this.$emit('radioSelect', row)
    },

    renderHeader (h, { column, $index }) {
      return (
        <el-tooltip class="item" effect="dark" placement="top-end">
          <div slot="content"> {this.columns[$index].info} </div>
          <div>
            {column.label}
            <i class="el-icon-question"></i>
          </div>
        </el-tooltip>
      )
    }
  }
}

</script>
<style lang="stylus">
.table-container
  .pagination
    padding: 20px 0 0
    text-align: right
  .action-con
    text-align: center
  .multi-actions
    margin: 0 0 5px 10px
  .image
    text-align: center
  .url-a
    color: #409EFF
    text-decoration: underline
  .input-num
    text-align: center
    width: 50px
  .elide
    text-decoration: line-through
  img
    max-width 100px
    table
      width:100%!important
  .el-table__header-wrapper
    .el-table__header
      width:100%!important
      background-color: #eaeefb;
.el-table__row .cell .el-radio .el-radio__label{
  visibility: hidden;
}
.el-table__row .cell .el-radio .el-radio__input{
  margin-left 15px
}
</style>
