<template>
  <el-dialog title="设置坐标" :visible.sync="getDialog.setAmap" :before-close="handleClose">
    <div class="toolbar">
      <p v-if="!isPolygon && lng"><span>取得坐标: </span>[{{ lng }}, {{ lat }}]</p>
      <p v-if="!isPolygon && address"><span>地址: </span>{{ address }}</p>
      <p v-if="isPolygon"><el-button type="success" @click="clickDraw('polygon')" size="small">多边形编辑</el-button></p>
      <p v-if="isPolygon"><el-button type="success" @click="clickDraw('circle')" size="small">圆编辑</el-button></p>
      <!-- <p v-if="isPolygon"><el-button type="warning" @click="clickclose" size="small">结束编辑</el-button></p> -->
      <p v-if="isPolygon"><el-button type="danger" @click="mapNo" size="small">清 空</el-button></p>
      <p><el-button type="info" @click="handleClose" size="small">取 消</el-button></p>
      <p><el-button type="primary" @click="mapOk" size="small">确 定</el-button></p>
      <!-- <div class="deleteMap">
        <p v-if="polygons.length" v-for="(item,index) in polygons" :key="index"><span>多边形{{index+1}}</span><span @click="deleteMap(index,item,'polygon')">删除</span></p>
        <p v-if="circles.length" v-for="(item,index) in circles" :key="index"><span>圆形{{index+1}}</span><span @click="deleteMap(index,item,'circle')">删除</span></p>
      </div> -->
    </div>
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" :default="CityArray.lenght ? CityArray[0] : myCity"/>
      <el-amap vid="amapPolygon" mapStyle="fresh" :center="mapCenter" :zoom="zoom" ref="map" :events="events" :amap-manager="amapManager" class="amap-demo">
        <el-amap-polygon v-if="isPolygon" v-for="(polygon, index) in polygons" :key="index" :vid="`idPolygon${index}`" :ref="`polygon_${index}`" :path="polygon.path" :events="polygon.events" :strokeColor="polygon.strokeColor" :strokeWeight="polygon.strokeWeight" :fillColor="polygon.fillColor" :fillOpacity="polygon.fillOpacity" :strokeStyle="polygon.strokeStyle" :editable="polygon.editable" :draggable="polygon.draggable"></el-amap-polygon>
        <el-amap-circle v-if="isPolygon" v-for="(circle,index) in circles" :key="index" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" :events="circle.events"></el-amap-circle>
        <el-amap-marker :position="markers" vid="idMarker"></el-amap-marker>
      </el-amap>
    </div>
  </el-dialog>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import AMap from 'AMap'
import VueAMap from 'vue-amap'
// import filters from '@/libs/filters'
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: 'b8ae7dde965b98c5ebd583745e434940', // your amap key
  plugin: ['AMap.GeometryUtil', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geocoder', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MouseTool'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
let amapManager = new VueAMap.AMapManager()
export default {
  name: 'setAmap',
  data () {
    return {
      // areaIdArray: [], // 区id集合
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
        zIndex: 10,
        extData: 0
      },
      circlesModel: {
        center: [116.433322, 39.900255],
        radius: 100, // 半径
        borderWeight: 3,
        strokeColor: '#FF33FF',
        strokeOpacity: 0.2,
        strokeWeight: 4,
        fillOpacity: 0.4,
        strokeStyle: 'solid',
        strokeDasharray: [10, 10],
        fillColor: '#fff',
        zIndex: 10,
        extData: 0
      },
      editor: {},
      isClick: true, // 是否可点击省市区生成多边形
      polygonEditor: null, // 多边形编辑
      circlesEditor: null,
      cityPolygons: [], // 省市区的数组，展示
      regionList: [], // 省市区的数组，判断
      mouseTool: null, // 鼠标绘制工具
      coordinates: [],
      polygons: [], // 多边形
      circles: [], // 多边形
      address: '',
      amapManager,
      markers: [116, 39],
      searchOption: {
        city: '北京',
        citylimit: false
      },
      mapCenter: [116, 39],
      events: {
        click: (e) => {
          const { lng, lat } = e.lnglat
          this.lng = lng
          this.lat = lat
          this.mapCenter = [lng, lat]
          this.markers = [lng, lat] // 点标记数组
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder()
          geocoder.getAddress([lng, lat], (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                this.address = result.regeocode.formattedAddress
              }
            }
          })
        },
        init: (o) => {
          if (this.makerPosition.length <= 0) {
            this.vueGeocoder()
          }
        }
      },
      lng: 0,
      lat: 0
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
      default: 20
    },
    isPolygon: {
      type: Boolean,
      default: false
    }, // 是否展示多边形遮盖物
    serviceCoordinates: {
      type: Array,
      default () {
        return []
      }
    }, // 多边形范围
    myCity: {
      type: String,
      default: ''
    },
    CityArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    makerPosition: {
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
    if (this.makerPosition.length && this.makerPosition[0] !== 0) {
      this.lng = this.makerPosition[0]
      this.lat = this.makerPosition[1]
      this.markers = this.makerPosition
      this.mapCenter = this.makerPosition
      this.getAddress(this.makerPosition).then(res => {
        this.address = res.address
      })
    }
    if (this.myCity && this.isPolygon === false) {
      this.vueGeocoder()
    }
    if (this.serviceCoordinates.length) {
      var map = amapManager.getMap()
      this.mouseTool = new AMap.MouseTool(map)
      this.serviceCoordinates.map(item => {
        if (item.coordinates.radius) {
          if (Array.isArray(item.coordinates.center)) {
            this.mapCenter = item.coordinates.center
          } else {
            this.mapCenter = [item.coordinates.center.lng, item.coordinates.center.lat]
          }
          /// //
          this.mouseTool.on('draw', (event) => {
            this.clickEditor(event.obj, 'circle')// 编辑多边形
          })
        } else {
          this.mapCenter = [item.coordinates[0].lng, item.coordinates[0].lat]
          /// //
          this.mouseTool.on('draw', (event) => {
            this.clickEditor(event.obj, 'polygon')// 编辑多边形
          })
        }
      })
    }
    let pathArr = this.serviceCoordinates.map(item => {
      if (item.coordinates.radius) {
        if (Array.isArray(item.coordinates.center)) {
          item = {
            center: item.coordinates.center,
            radius: item.coordinates.radius, // 半径
            extData: item.areaRangeId
          }
        } else {
          item = {
            center: [item.coordinates.center.lng, item.coordinates.center.lat],
            radius: item.coordinates.radius, // 半径
            extData: item.areaRangeId
          }
        }
      } else {
        item = {
          path: item.coordinates.map(obj => {
            delete obj.Q
            delete obj.R
            obj = Object.values(obj)
            return obj
          }),
          extData: item.areaRangeId
        }
      }
      return item
    })
    pathArr.map(item => {
      if (item.radius) {
        let circle = this.lk.deepCopy(this.circlesModel)
        circle.radius = item.radius
        if (Array.isArray(item.center)) {
          circle.center = item.center
        } else {
          circle.center = [item.center.lng, item.center.lat]
        }
        circle.extData = item.extData
        circle.events = {
          click: () => {
            this.clickEditor(new AMap.Circle(this.lk.deepCopy(circle)), 'circle')
          }
        }
        this.circles.push(circle)
      } else {
        let polygon = this.lk.deepCopy(this.polygonModel)
        polygon.path = item.path
        polygon.extData = item.extData
        polygon.events = {
          click: () => {
            this.clickEditor(new AMap.Polygon(polygon), 'polygon')
          }
        }
        this.polygons.push(polygon)
      }
    })
  },
  methods: {
    // deleteMap (index, item, type) {
    //   var o = amapManager.getMap()
    //   // this.mouseTool = new AMap.MouseTool(o)// mouseTool是鼠标工具实例
    //   o.remove(item)
    //   // item = []
    //   // this.mouseTool.close(true)
    //   // o.setFitView()
    //   if (type === 'polygon') {
    //     this.polygons.splice(index, 1)
    //   } else {
    //     this.circles.splice(index, 1)
    //   }
    // },
    clickDraw (type) {
      var map = amapManager.getMap()
      this.mouseTool = new AMap.MouseTool(map)// mouseTool是鼠标工具实例
      switch (type) {
        case 'polygon': { // 画多边形
          this.mouseTool.polygon({
            strokeColor: '#f7797d',
            strokeOpacity: 1,
            strokeWeight: 2,
            strokeStyle: 'solid',
            fillOpacity: 0.5,
            fillColor: '#69AC8F',
            zIndex: 100,
            bubble: true,
            clickable: true,
            draggable: false,
            innerOverlay: true,
            lineCap: 'butt',
            lineJoin: 'miter',
            path: [], // 多边形菱点集合
            strokeDasharray: [],
            visible: true,
            extData: 0,
            events: {
              click: (e) => {}
            }
          })
          break
        }
        case 'circle': { // 画圆
          this.mouseTool.circle({
            strokeColor: '#f7797d',
            strokeOpacity: 1,
            strokeWeight: 2,
            strokeStyle: 'solid',
            fillOpacity: 0.5,
            fillColor: '#69AC8F',
            zIndex: 100,
            extData: 0,
            events: {
              click: (e) => {}
            },
            center: [116.433322, 39.900255], // 中心点
            radius: 100, // 半径
            borderWeight: 3,
            strokeDasharray: [10, 10]
          })
          break
        }
      }
      this.mouseTool.on('draw', (event) => {
        this.clickEditor(event.obj, type)// 编辑多边形
        if (type === 'polygon') {
          this.polygons.push(event.obj.Ce)
        } else if (type === 'circle') {
          this.circles.push(event.obj.Ce)
        }
      })
    },
    // 编辑多边形
    clickEditor (obj, type) {
      let map = amapManager.getMap()
      if (type === 'polygon') {
        map.add(obj)// 添加
        // obj.setMap(map)
        map.setFitView([ obj ])// 缩放地图到合适的视野级别
        this.polygonEditor = new AMap.PolyEditor(map, obj)
        this.polygonEditor.open()
      } else if (type === 'circle') {
        map.add(obj)// 添加
        // obj.setMap(map)
        map.setFitView([ obj ])// 缩放地图到合适的视野级别
        this.circlesEditor = new AMap.CircleEditor(map, obj)
        this.circlesEditor.open()
        this.circlesEditor.on('adjust', (e) => {
          this.circles.map(item => {
            if (typeof item.extData === 'number' && item.extData === e.target.Ce.extData) {
              item.center = [e.target.Ce.center.lng, e.target.Ce.center.lat]
              if (Array.isArray(e.target.Ce.center)) {
                item.center = e.target.Ce.center
              } else {
                item.center = [e.target.Ce.center.lng, e.target.Ce.center.lat]
              }
              item.radius = e.target.Ce.radius
            }
          })
        })
      }
    },
    getLocation (city) {
      return new Promise((resolve, reject) => {
        var geocoder = new AMap.Geocoder()
        geocoder.getLocation(city, (status, result) => {
          if (status === 'complete' && result.geocodes.length) {
            resolve({
              geocodes: result.geocodes[0]
            })
          } else {
            reject(result)
          }
        })
      })
    },
    // 根据地址名称获取实际经纬度方法
    vueGeocoder () {
      var o = amapManager.getMap()
      if ((this.makerPosition.length <= 0 || (this.makerPosition.length > 0 && this.makerPosition[0] === 0)) && this.myCity && this.myCity !== null) {
        this.getLocation(this.myCity).then(res => {
          this.mapCenter = [res.geocodes.location.lng, res.geocodes.location.lat]
          this.markers = [res.geocodes.location.lng, res.geocodes.location.lat]
          this.lng = res.geocodes.location.lng
          this.lat = res.geocodes.location.lat
          this.address = res.geocodes.formattedAddress
        })
      } else if ((this.makerPosition.length <= 0 || (this.makerPosition.length > 0 && this.makerPosition[0] === 0)) && this.CityArray.length && this.isPolygon) {
        this.getLocation(this.CityArray[0]).then(res => {
          this.mapCenter = [res.geocodes.location.lng, res.geocodes.location.lat]
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
                  this.cityPolygons.push(cityPolygon)
                }
                o.add(this.cityPolygons)
                o.setFitView(this.cityPolygons)// 视口自适应
              }
            }
          })
        })
      }
    },
    // 获取搜索地址的坐标
    onSearchResult (pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.lng = poi.lng
          this.lat = poi.lat
          this.markers = [poi.lng, poi.lat]
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder()
          geocoder.getAddress([poi.lng, poi.lat], (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                this.address = result.regeocode.formattedAddress
              }
            }
          })
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    },
    getAddress (lnglat) {
      return new Promise((resolve, reject) => {
        var geocoder = new AMap.Geocoder()
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              resolve({
                address: result.regeocode.formattedAddress
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
      if (this.isPolygon) {
        let concatMap = this.polygons.concat(this.circles)
        concatMap.map(item => {
          if (item.radius) {
            array.push({
              coordinates: JSON.stringify({
                radius: item.radius,
                center: item.center
              }),
              areaRangeId: typeof item.extData === 'object' ? null : item.extData
            })
          } else {
            array.push({
              coordinates: JSON.stringify(item.path),
              areaRangeId: typeof item.extData === 'object' ? null : item.extData
            })
          }
        })
        this.$emit('polygonsPath', array)
      } else {
        this.$emit('mapCenter', {
          lng: this.lng,
          lat: this.lat,
          address: this.address
        })
      }
      this.$closeDialog('setAmap')
    },
    // 清空多边形
    mapNo () {
      var map = amapManager.getMap()
      map.clearMap()
      this.polygons = []
      this.circles = []
      this.coordinates = []
      this.serviceCoordinates = []
    },
    // 关闭窗口，清除数据
    handleClose () {
      // this.coordinates = []
      // this.serviceCoordinates = []
      // this.polygons = []
      // this.circles = []
      // this.markers = []
      // this.CityArray = []
      // this.isPolygon = false
      // this.address = ''
      // this.lng = 0
      // this.lat = 0
      // this.$parent.children = false
      this.$closeDialog('setAmap')
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
.search-box {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 999;
  margin-bottom: 20px;
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
.deleteMap{
  width 100%
}
.deleteMap p{
  box-shadow 0px 2px 15px 0px #ccc
  border-radius 6px
  padding 10px
}
.deleteMap span{
  padding 0 10px
}
.deleteMap span:last-child{
  color #F17B20
  border-left 1px solid #ccc
  cursor pointer
}
</style>
