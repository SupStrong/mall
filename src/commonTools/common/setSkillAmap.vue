<template>
  <el-dialog title="设置坐标" :visible.sync="getDialog.setSkillAmap" :before-close="handleClose">
    <div class="toolbar">
      <p><el-button type="success" @click="clickOn" size="small">开始编辑</el-button></p>
      <p><el-button type="warning" @click="clickclose" size="small">结束编辑</el-button></p>
      <p><el-button type="danger" @click="mapNo" size="small">清 空</el-button></p>
      <p><el-button type="info" @click="handleClose" size="small">取 消</el-button></p>
      <p><el-button type="primary" @click="mapOk" size="small">确 定</el-button></p>
    </div>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" mapStyle="fresh" :plugin="plugin" :center="mapCenter" :zoom="zoom" ref="map" :events="events" :amap-manager="amapManager" class="amap-demo">
        <el-amap-polygon v-for="(polygon, index) in polygons" :key="index" :vid="`idPolygon${index}`" :ref="`polygon_${index}`" :path="polygon.path" :events="polygon.events" :strokeColor="polygon.strokeColor" :strokeWeight="polygon.strokeWeight" :fillColor="polygon.fillColor" :fillOpacity="polygon.fillOpacity" :strokeStyle="polygon.strokeStyle" :editable="polygon.editable" :draggable="polygon.draggable"></el-amap-polygon>
      </el-amap>
    </div>
  </el-dialog>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import AMap from 'AMap'
import VueAMap from 'vue-amap'
import filters from '@/libs/filters'
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: 'b8ae7dde965b98c5ebd583745e434940', // your amap key
  plugin: ['AMap.GeometryUtil', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geocoder', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MouseTool'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
let amapManager = new VueAMap.AMapManager()
export default {
  name: 'setSkillAmap',
  data () {
    return {
      areaIdArray: [], // 区id集合
      polygonModel: {
        bubble: true,
        clickable: true,
        draggable: false,
        events: {
          click: (e) => {
          }
        },
        fillColor: '#fff',
        fillOpacity: 0.4,
        innerOverlay: true,
        lineCap: 'butt',
        lineJoin: 'miter',
        path: [],
        strokeColor: '#FF33FF',
        strokeDasharray: [],
        strokeOpacity: 0.2,
        strokeStyle: 'solid',
        strokeWeight: 4,
        visible: true,
        zIndex: 10
      },
      editor: {},
      isClick: true, // 是否可点击省市区生成多边形
      polygonEditor: null, // 多边形编辑
      cityPolygons: [], // 省市区的数组，展示
      regionList: [], // 省市区的数组，判断
      currentPolygon: null, // 当前省市区的id
      mouseTool: null, // 鼠标绘制工具
      polygons: [], // 多边形
      areaRangeVoList: [], // 多边形传后台
      amapManager,
      mapCenter: [116, 39],
      events: {
        click: (e) => {
          const { lng, lat } = e.lnglat
          this.mapCenter = [lng, lat]
          if (e.target.CLASS_NAME === 'AMap.Map' && this.CityArray.length) {
            let maps = this.regionList.filter((item, index) => {
              return AMap.GeometryUtil.isPointInRing([lng, lat], item)
            })
            if (maps.length === 0) {
              this.$message.error('超出边界')
              if (this.mouseTool) {
                this.mouseTool.close(true)
                this.currentPolygon = null
              }
            }
          }
        },
        init: (o) => {
          this.vueGeocoder()
        }
      }
    }
  },
  ...mapMutations({
    closeDialog: '关闭弹框'
  }),
  computed: {
    ...mapGetters(['getDialog'])
  },
  props: {
    zoom: {
      type: Number,
      default: 14
    },
    serviceCoordinates: {
      type: Array,
      default () {
        return []
      }
    }, // 多边形范围
    CityArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    districtLevel: {
      type: String,
      default: 'district'
    }
  },
  mounted () {
    this.areaIdArray = []
    if (this.CityArray.length) {
      this.CityArray.map(item => {
        this.areaIdArray.push(filters.areaId(item))
      })
    }
    if (this.serviceCoordinates.length) {
      this.mapCenter = [this.serviceCoordinates[0][0].lng, this.serviceCoordinates[0][0].lat]
    }
    let pathArr = this.serviceCoordinates.map(item => {
      item = item.map(obj => {
        delete obj.Q
        delete obj.R
        obj = Object.values(obj)
        return obj
      })
      return item
    })
    pathArr.map(item => {
      let polygon = this.lk.deepCopy(this.polygonModel)
      polygon.path = item
      polygon.events = {
        click: () => {
          this.clickPolyEditor(new AMap.Polygon(polygon))
        }
      }
      this.polygons.push(polygon)
    })
  },
  methods: {
    // 开始绘制多边形
    clickOn () {
      var o = amapManager.getMap()
      this.mouseTool = new AMap.MouseTool(o)
      this.mouseTool.polygon({
        strokeColor: '#FF33FF',
        strokeWeight: 4,
        strokeOpacity: 0.2,
        fillColor: '#fff',
        fillOpacity: 0.4,
        strokeStyle: 'solid'
      })
      this.mouseTool.on('draw', (event) => {
        event.obj.w.events = {
          click: () => {
            this.clickPolyEditor(event.obj)// 编辑多边形
          }
        }
        this.polygons.push(event.obj.w)
        this.currentPolygon = null
      })
    },
    // 编辑多边形
    clickPolyEditor (obj) {
      let o = amapManager.getMap()
      o.add(obj)// 缩放地图到合适的视野级别
      o.setFitView([ obj ])// 缩放地图到合适的视野级别
      this.polygonEditor = new AMap.PolyEditor(o, obj)
      this.polygonEditor.open()
      this.polygonEditor.on('adjust', (event) => {
        let maps = this.regionList.filter((item, index) => {
          return AMap.GeometryUtil.isPointInRing([event.lnglat.lng, event.lnglat.lat], item)
        })
        if (maps.length === 0) {
          this.$message.error('超出边界')
          o.remove(obj)
          this.polygons = []
          if (this.mouseTool) {
            this.mouseTool.close(true)
            this.currentPolygon = null
          }
        }
      })
    },
    // 结束编辑
    clickclose () {
      this.polygonEditor.close()
    },
    // 根据地址名称获取实际经纬度方法
    vueGeocoder () {
      var o = amapManager.getMap()
      var geocoder = new AMap.Geocoder()
      if (this.CityArray.length) {
        geocoder.getLocation(this.CityArray[0], (status, result) => {
          if (status === 'complete' && result.geocodes.length) {
            this.mapCenter = [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
          } else {
            this.$message.error('根据地址查询位置失败')
            this.mapCenter = [116, 39]
          }
        })
        var district = new AMap.DistrictSearch({
          level: this.districtLevel, //  关键字对应的行政区级别
          subdistrict: 3, // 显示下级行政区级数，1表示返回下一级行政区
          extensions: 'all', // 返回行政区边界坐标组等具体信息
          showbiz: false // 最后一级返回街道信息
        })
        this.regionList = []
        this.cityPolygons = []
        this.CityArray.map((item, index) => {
          district.search(item, (status, result) => {
            if (result.districtList) {
              var bounds = result.districtList[0].boundaries
            }
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                this.regionList.push(bounds[i])
                // 生成行政区划polygon
                let cityPolygon = new AMap.Polygon({
                  zIndex: 1,
                  strokeWeight: 1,
                  path: bounds[i],
                  fillOpacity: 0.4,
                  fillColor: '#80d8ff',
                  strokeColor: '#0091ea',
                  extData: index + 1
                })
                cityPolygon.on('click', (e) => {
                  let currentPolygon = cityPolygon.getOptions().extData
                  if (this.currentPolygon) {
                    if (this.currentPolygon !== currentPolygon) {
                      this.$message.error('跨区域')
                      if (this.mouseTool) {
                        this.mouseTool.close(true)
                        this.currentPolygon = null
                      }
                    }
                  } else {
                    this.currentPolygon = cityPolygon.getOptions().extData
                  }
                })
                this.cityPolygons.push(cityPolygon)
              }
              o.add(this.cityPolygons)
              o.setFitView(this.cityPolygons)// 视口自适应
            }
          })
        })
      }
    },
    // 清空多边形
    mapNo () {
      if (this.mouseTool) {
        this.mouseTool.close(true)
        this.currentPolygon = null
      }
      this.polygons = []
      this.serviceCoordinates = []
    },
    getAddress (item, lnglat) {
      return new Promise((resolve, reject) => {
        var geocoder = new AMap.Geocoder()
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              resolve({
                coordinates: JSON.stringify(item.path),
                areaId: result.regeocode.addressComponent.adcode
              })
            }
          } else {
            reject(result)
          }
        })
      })
    },
    // 获取实际经纬度
    async mapOk () {
      let array = []
      let promiseArray = []
      this.polygons.map(item => {
        let lnglat = [item.path[item.path.length - 1].lng, item.path[item.path.length - 1].lat]
        promiseArray.push(this.getAddress(item, lnglat))
      })
      await Promise.all(promiseArray).then(result => {
        /// 一个区有多个多边形，多个多边形拼接成一个字符串///////
        let afterData = []
        let tempArr = []
        result.map(item => {
          if (tempArr.indexOf(item.areaId) === -1) {
            afterData.push({
              areaId: item.areaId,
              coordinates: ''
            })
            tempArr.push(item.areaId)
          }
        })
        afterData.map(item => {
          result.map(items => {
            if (item.areaId === items.areaId) {
              item.coordinates = `${items.coordinates},${item.coordinates}`
            }
          })
        })
        /// 区id去重////////
        let sumArr = [...tempArr, ...this.areaIdArray]
        let d = new Set(sumArr)
        let e = Array.from(d)
        let emptyArr = [...e.filter(_ => !tempArr.includes(_)), ...e.filter(_ => !this.areaIdArray.includes(_))]
        emptyArr.map(item => {
          afterData.push({
            areaId: item,
            coordinates: ''
          })
        })
        /// ////////
        array = afterData
      })
      this.$emit('polygonsPath', array)
      if (this.mouseTool) {
        this.mouseTool.close(true)
        this.currentPolygon = null
      }
      this.polygons = []
      this.serviceCoordinates = []
      this.mapCenter = [116, 39]
      this.CityArray = []
      this.$closeDialog('setSkillAmap')
    },
    // 关闭窗口，清除数据
    handleClose () {
      if (this.mouseTool) {
        this.mouseTool.close(true)
        this.currentPolygon = null
      }
      this.areaRangeVoList = []
      this.serviceCoordinates = []
      this.polygons = []
      this.CityArray = []
      this.mapCenter = [116, 39]
      this.$closeDialog('setSkillAmap')
    }
  }
}
</script>
<style lang="stylus" scoped>
.toolbar p{
  display: inline-block;
  margin-bottom: 15px;
  margin-right: 20px;
}
.toolbar span{
  font-weight: 600;
}
.amap-demo {
  height: 100%;
}
.amap-page-container {
  position: relative;
  height 80%
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
