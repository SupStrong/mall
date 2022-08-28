<template>
  <div>
    <el-tabs
      v-model="taskType"
      v-if="taskTypeList.length"
      @tab-click="handleClick"
      >
      <el-tab-pane
        v-for="(item, index) in taskTypeList"
        :key="index"
        :label="item.label"
        :name="item.value">
        <el-table
        border
        :data="tableData"
        v-if="tableData.length"
          style="width: 100%">
          <el-table-column
            v-for="(v, i) in labelList"
            :key="i"
            :prop="v.prop"
            :label="v.label"
            width="180">
              <template slot-scope="scope">
                <div v-if="v.prop === 'picList' && scope.row.newPicList">
                  <img
                    class="preview"
                    v-for="(img, index) in scope.row.newPicList"
                    :src="img"
                    @click="imgPreview(img)"
                    :key="index"
                  />
                </div>
                <div v-else-if="v.prop === 'picList' && scope.row.picList">
                 <img
                    class="preview"
                    :src="url"
                    alt=""
                    v-for="(url, index) in scope.row.picList"
                    :key="index"
                  >
                </div>
                <span v-else>{{ scope.row[v.prop] }}</span>
                <!-- <el-popover trigger="hover" placement="top" >
                  <div v-for="(picObj, picIndex) in scope.row.newPicList" :key="picIndex" class="picList">
                    <span>{{picObj.name}}</span>

                  </div>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">图片预览</el-tag>
                  </div>
                </el-popover> -->
                <!-- <el-popover trigger="hover" placement="top" v-else-if="v.prop === 'picList' && scope.row.picList">
 
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">图片预览</el-tag>
                  </div>
                </el-popover> -->
              </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div v-else>
      暂无信息
    </div>
    <el-dialog
      title="图片预览"
      class="perviewBox"
      :visible.sync="showImg"
      width="50%"
      :append-to-body="true"
      :before-close="handleClose">
      <img :src="imgPreviewUrl" alt="图片预览" class="perview">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showImg = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from '@/libs/utils'
import { orderApi } from '@/api'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      taskType: '1',
      taskTypeList: [],
      subTaskList: [],
      tableData: [],
      curTaskList: [],
      labelList: [{
        label: '时间',
        prop: 'time'
      }, {
        label: '状态',
        prop: 'status'
      }],
      showImg: false,
      imgPreviewUrl: ''
    }
  },
  props: {
    orderCode: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['rowData'])
  },
  created() {
    let orderCode = this.orderCode
    this.getSubtaskList(orderCode).then(() => {
      if (this.taskTypeList.length) {
        this.handleClick({
          label: this.taskTypeList[0].label
        })
        this.taskType = this.taskTypeList[0].value
      }
    })
  },
  methods: {
    async getSubtaskList(orderCode) {
      this.$loading()
      try {
        let params = {
          page: 1,
          rows: 10000,
          orderCode: orderCode
        }
        let data = (await orderApi.getSubtaskList(params)).data
        if (data.statusCode === 200) {
          this.taskTypeList = []
          this.subTaskList = data.data.list
          data.data.list.map(item => {
            let obj = {}
            obj.label = item.taskTypeName
            obj.value = item.taskType.toString()
            if (!this.taskTypeList.some(task => {
              return task.label === item.taskTypeName
            })) {
              this.taskTypeList.push(obj)
            }
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.$loading().close()
      }
    },
    handleClick(data) {
      this.tableData = []
      this.labelList = [{
        label: '时间',
        prop: 'time'
      }, {
        label: '状态',
        prop: 'status'
      }]
      this.subTaskList.map((item, index) => {
        let time = item.createTime
        let status = item.finishStatus
        let tableCell = {}
        tableCell.time = formatDate(String(time / 1000), 'yyyy-MM-dd hh:mm:ss')
        let jsonStr = ''
        if (status === 0) {
          tableCell.status = '未完成'
          jsonStr = item.taskExtend
        } else {
          tableCell.status = '已完成'
          jsonStr = item.recordExtend
        }
        if (item.taskTypeName === data.label) {
          if (JSON.parse(jsonStr)) {
            let fields = JSON.parse(jsonStr).fields
            this.curTaskList = fields
            for (let i of fields) {
              if (i.type === 'select') {
                tableCell[i.name] = i.label
              } else if (i.type === 'comboBox') {
                tableCell[i.name] = i.options.filter((item, index) => {
                  let newItem = ''
                  i.value.map(i => {
                    if (index === (i - 0)) {
                      newItem = item
                    }
                  })
                  return newItem
                }).join(',')
              } else {
                tableCell[i.name] = i.value
              }
              tableCell.label = i.desc
              if (i.type === 'picList') {
                if (i.valueFieldIndex !== undefined) {
                  let picList = []
                  // let imgList = []
                  if (i.value) {
                    console.log(fields)
                    fields.map(task => {
                      if (task.desc === '上传图片：') {
                        picList = task.value.flat()
                      }
                      return task
                    })
                  }
                  tableCell.newPicList = picList
                } else {
                  if (typeof i.value === 'string') {
                    tableCell.picList = i.value.split(',')
                    let length = tableCell.picList.length
                    tableCell.picList[0] = tableCell.picList[0].substring(1)
                    let strLenght = tableCell.picList[length - 1].length
                    tableCell.picList[length - 1] = tableCell.picList[length - 1].substring(0, strLenght - 1)
                  } else if (typeof i.value === 'object') {
                    tableCell.picList = i.value
                  }
                }

              }
            }
            this.tableData.push(tableCell)
          }
        }
      })
      for (let i of this.curTaskList) {
        let obj = {
          label: i.desc,
          prop: i.name
        }
        this.labelList.push(obj)
      }
    },
    imgPreview(url) {
      this.imgPreviewUrl = url
      console.log(url)
      this.showImg = true
    },
    handleClose() {
      this.showImg = false
    }
  }
}
</script>
<style lang="less" scoped>
.preview{
  max-width: 60px;
  margin-left: 15px;
}
.picList{
  height: 100px;
  margin-bottom: 15px;
  span{
    display: block;
    height: 100px;
    width: 100px;
    line-height: 100px;
    float: left;
    text-align: center;
  }
  img{
    float: left;
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
}
.perviewBox{
  .perview{
    width: 100%;
  }
}
</style>

