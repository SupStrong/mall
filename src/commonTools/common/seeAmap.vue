<template>
  <div>
    <div class="amap-page-container" v-if="isDialog">
      <!-- 工单地图 -->
      <el-amap vid="amapDemo1" mapStyle="fresh" :zoom="zoom" :center="center" :amap-manager="amapManager" :events="events" ref="map" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :icon="marker.icon" :key="index" :events="marker.events" :vid="index1"></el-amap-marker>
        <el-amap-info-window v-if="window" :events="window.events" :position="window.position" :content="window.content" :visible="window.visible"></el-amap-info-window>
        <el-amap-text v-for="(text, index) in markers" :key="index" :text="text.text" :offset="text.offset" :position="text.position" :events="text.events"></el-amap-text>
      </el-amap>
    </div>
    <div v-else>
      <el-dialog :visible.sync="getDialog.seeAmap" title="地图" :before-close="handleClose" :modal-append-to-body='false'>
        <div class="amap-page-container">
          <el-amap v-if="isEvents" mapStyle="fresh" vid="amapDemo2" :zoom="zoom" :center="center" :amap-manager="amapManager" :events="events" ref="map" class="amap-demo">
            <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" :events="marker.events" :vid="index2"></el-amap-marker>
            <el-amap-info-window v-if="window" :events="window.events" :position="window.position" :content="window.content" :visible="window.visible"></el-amap-info-window>
            <el-amap-text v-for="(text, index) in markers" :key="index" :text="text.text" :offset="text.offset" :position="text.position" :events="text.events"></el-amap-text>
          </el-amap>
          <el-amap v-else vid="amapDemo2" mapStyle="fresh" :zoom="zoom" :center="center" :amap-manager="amapManager" ref="map" class="amap-demo">
            <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :icon="marker.icon" :key="index" :vid="index5"></el-amap-marker>
            <el-amap-text v-for="(text, index) in markers" :key="index" :text="text.text" :offset="text.offset" :position="text.position"></el-amap-text>
          </el-amap>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="mapOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import filters from '@/libs/filters'
import { mapGetters } from 'vuex'
import AMap from 'AMap'
import VueAMap from 'vue-amap'
import redMap from '@/assets/img/redMap.png'
import greenMap from '@/assets/img/greenMap.png'
import blueMap from '@/assets/img/blueMap.png'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'b8ae7dde965b98c5ebd583745e434940', // your amap key
  plugin: ['AMap.GeometryUtil', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geocoder', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MouseTool'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
let amapManager = new VueAMap.AMapManager()
export default {
  name: 'seeAmap',
  data () {
    return {
      marker: '',
      lineArr: [[116.478935, 39.997761], [116.478939, 39.997825], [116.478912, 39.998549], [116.478912, 39.998549], [116.478998, 39.998555], [116.478998, 39.998555], [116.479282, 39.99856], [116.479658, 39.998528], [116.480151, 39.998453], [116.480784, 39.998302], [116.480784, 39.998302], [116.481149, 39.998184], [116.481573, 39.997997], [116.481863, 39.997846], [116.482072, 39.997718], [116.482362, 39.997718], [116.483633, 39.998935], [116.48367, 39.998968], [116.484648, 39.999861]],
      coordinates: [],
      window: {
        position: [0, 0],
        content: '',
        visible: false,
        events: {}
      },
      events: {
        click: (e) => {
          const { lng, lat } = e.lnglat
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                // 点标记数组
                this.markers.push(
                  {
                    position: [result.regeocode.pois[0].location.lng, result.regeocode.pois[0].location.lat],
                    text: result.regeocode.formattedAddress,
                    offset: [60, -55]
                  }
                )
              }
            }
          })
        },
        init: (o) => {
        }
      },
      center: [116, 39],
      markers: [], // 点坐标
      amapManager // 加弹窗
    }
  },
  watch: {
    mapWorkorderlist (val) {
      this.getMapWorkorderlist()
    },
    'getDialog.seeAmap': function (val) {
      if (val) {
        var geocoder = new AMap.Geocoder()
        // 订单详情>查看地图
        if (this.customInfo.address) {
          geocoder.getLocation(this.customInfo.address, (status, result) => {
            if (status === 'complete' && result.geocodes.length) {
              this.center = this.customInfo.center && this.customInfo.center.length && this.customInfo.center[0] ? this.customInfo.center : [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
              this.markers.push(
                {
                  position: this.center,
                  text: `客户：${this.customInfo.receiver}\n地址：${this.customInfo.address}`,
                  offset: [60, -55],
                  icon: new AMap.Icon({
                    image: greenMap,
                    size: new AMap.Size(50, 72), // 图标大小
                    imageSize: new AMap.Size(25, 36)
                  })
                }
              )
            } else {
              this.$message.error('根据地址查询位置失败')
              this.center = [116, 39]
            }
          })
        }
        // 管理工单>分配>查看地图
        if (this.jsInfo.address) {
          geocoder.getLocation(this.jsInfo.address, (status, result) => {
            if (status === 'complete' && result.geocodes.length) {
              this.markers.push(
                {
                  position: [result.geocodes[0].location.lng, result.geocodes[0].location.lat],
                  text: `工程师：${this.jsInfo.receiver}\n地址：${this.jsInfo.address}`,
                  offset: [60, -55]
                }
              )
              if (!this.customInfo.address) {
                this.center = [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
              }
            } else {
              this.$message.error('根据地址查询位置失败')
            }
          })
        }
      }
    },
    mapLocationList: {
      handler (newVal) {
        // 工程师位置信息数据
        this.markers = []
        if (this.mapLocationList.length) {
          this.center = [this.mapLocationList[0].longitude, this.mapLocationList[0].latitude]
          const that = this
          this.mapLocationList.map((item, index) => {
            this.markers.push({
              position: [item.longitude, item.latitude],
              offset: [0, -30],
              text: index + 1,
              size: '20',
              events: {
                mouseover (e) {
                  that.window = {
                    position: [e.lnglat.lng, e.lnglat.lat],
                    content: `<p>${item.createTime ? filters.formatDate(item.createTime) : ''}</p><p>${item.address}</p>`,
                    visible: true,
                    events: {
                      close () {
                        that.window.visible = false
                      }
                    }
                  }
                }
              }
            })
          })
        }
      },
      immediate: true
    }
  },
  props: {
    zoom: {
      type: Number,
      default: 14
    },
    customInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    jsInfo: {
      type: Object,
      default () {
        return {}
      }
    }, // 工程师位置信息
    mapWorkorderlist: {
      type: Array,
      default () {
        return []
      }
    }, // 工单地图数据
    mapLocationList: {
      type: Array,
      default () {
        return []
      }
    }, // 工程师位置信息数据
    isDialog: {
      type: Boolean,
      default: false
    }, // 是否以弹框形式展示
    isEvents: {
      type: Boolean,
      default: true
    } // 是否触发事件
  },
  computed: {
    ...mapGetters(['getDialog'])
  },
  mounted () {
    var geocoder = new AMap.Geocoder()
    // 订单详情>查看地图
    if (this.customInfo.address) {
      geocoder.getLocation(this.customInfo.address, (status, result) => {
        if (status === 'complete' && result.geocodes.length) {
          this.center = this.customInfo.center && this.customInfo.center.length && this.customInfo.center[0] ? this.customInfo.center : [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
          this.markers.push(
            {
              position: this.center,
              text: `客户：${this.customInfo.receiver}\n地址：${this.customInfo.address}`,
              offset: [60, -55],
              icon: new AMap.Icon({
                image: greenMap,
                size: new AMap.Size(50, 72), // 图标大小
                imageSize: new AMap.Size(25, 36)
              })
            }
          )
        } else {
          this.$message.error('根据地址查询位置失败')
          this.center = [116, 39]
        }
      })
    }
    // 管理工单>分配>查看地图
    if (this.jsInfo.address) {
      geocoder.getLocation(this.jsInfo.address, (status, result) => {
        if (status === 'complete' && result.geocodes.length) {
          this.markers.push(
            {
              position: [result.geocodes[0].location.lng - 0, result.geocodes[0].location.lat - 0],
              text: `工程师：${this.jsInfo.receiver}\n地址：${this.jsInfo.address}`,
              offset: [60, -55]
            }
          )
          if (!this.customInfo.address) {
            this.center = [result.geocodes[0].location.lng - 0, result.geocodes[0].location.lat - 0]
          }
        } else {
          this.$message.error('根据地址查询位置失败')
        }
      })
    }
    // 工单地图数据
    if (this.mapWorkorderlist.length) {
      this.getMapWorkorderlist()
    }
  },
  methods: {
    getMapWorkorderlist () {
      this.center = [this.mapWorkorderlist[0].serviceLng - 0, this.mapWorkorderlist[0].serviceLat - 0]
      const that = this
      this.mapWorkorderlist.map((item, index) => {
        let data = {
          position: [item.serviceLng - 0, item.serviceLat - 0],
          offset: [60, -55],
          events: {
            mouseover (e) {
              that.window = {
                position: [e.lnglat.lng - 0, e.lnglat.lat - 0],
                content: `<p>工单号：<a href="${location.origin}/#/workOrder/workOrderDetail?id=${item.workOrderId}" style="color:blue;">${item.workOrderCode}</a></p><p>工程师姓名：${item.technicianName}</p><p>工程师电话：${item.technicianMobile}</p><p>预约时间：${filters.formatDate(item.changeReservationTime, 'yyyy-MM-dd')}</p>`,
                visible: true,
                events: {
                  close () {
                    that.window.visible = false
                  }
                }
              }
            }
          }
        }
        if (item.status === 0) {
          data.icon = new AMap.Icon({
            image: redMap,
            size: new AMap.Size(50, 72), // 图标大小
            imageSize: new AMap.Size(25, 36)
          })
        } else if (item.status === 1) {
          data.icon = new AMap.Icon({
            image: greenMap,
            size: new AMap.Size(50, 72), // 图标大小
            imageSize: new AMap.Size(25, 36)
          })
        } else if (item.status === 2) {
          data.icon = new AMap.Icon({
            image: blueMap,
            size: new AMap.Size(50, 72), // 图标大小
            imageSize: new AMap.Size(25, 36)
          })
        }
        this.markers.push(data)
        console.log(this.center)
        console.log(this.markers)
      })
    },
    // 获取实际经纬度
    mapOk () {
      this.markers = []
      this.center = [116, 39]
      this.$closeDialog('seeAmap')
    },
    // 关闭窗口，清除数据
    handleClose () {
      this.markers = []
      this.center = [116, 39]
      this.$closeDialog('seeAmap')
    }
  }
}
</script>
<style lang="stylus" scoped>
.amap-demo {
  height: 100%;
}
>>>.amap-overlay-text-container{
  white-space: pre;
}
>>>.el-dialog__footer{
  padding:0 10px 10px;
}
>>>.amap-page-container {
  position: relative;
  // height 80%
  height 600px
}
>>>.el-dialog__body{
  padding: 0 10px;
  height 100%
}
>>>.el-dialog{
  width 100%
  height 100%
  margin-top 0!important
}
</style>
