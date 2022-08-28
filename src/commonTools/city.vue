<template>
  <el-dialog class="cityMode" @click="close" :visible.sync="isShowCity" title="选择城市信息">
    <el-form label-width="120px" @click.stop>
      <el-row>
        <el-form-item label="已选城市列表：">
          <el-tag v-for="(val,key) in cityBox" :key="key" closable @close="deleteType(key)" size="medium">
            {{ val }}
          </el-tag>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="查询城市：">
          <searchCity @citySelect="citySelect"/>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="热门城市：">
          <el-tag v-for="(val,key) in searchBox" :key="key" @click="addCity(val)" size="medium">{{ val.name }}</el-tag>
        </el-form-item>
        <el-form-item label="部分城市：">
          <el-tag v-for="(val,key) in cityList" :key="key" @click="addCity(val)">{{ val.name }}</el-tag>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="sumbit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import CityJson from '@/assets/js/json.js'
import searchCity from '@tool/searchCity.vue'
export default {
  data () {
    return {
      cityList: [], // 全部省份
      cityBox: [], // 城市名字数组
      cityId: [], // 城市id数组
      query: '', // 查询城市参数
      priceSystems: [],
      searchBox: [
        {
          code: '110100',
          name: '北京市'
        },
        {
          code: '120100',
          name: '天津市'
        },
        {
          code: '310100',
          name: '上海市'
        },
        {
          code: '320100',
          name: '南京市'
        },
        {
          code: '330100',
          name: '杭州市'
        },
        {
          code: '500100',
          name: '重庆市'
        },
        {
          code: '510100',
          name: '成都市'
        },
        {
          code: '330200',
          name: '宁波市'
        },
        {
          code: '430100',
          name: '长沙市'
        },
        {
          code: '441900',
          name: '东莞市'
        }
      ]
    }
  },
  props: {
    city: {
      type: Object,
      default () {
        return {}
      }
    },
    addCityBox: {
      type: Object,
      default () {
        return {}
      }
    },
    isShowCity: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    citySelect (val) {
      val.code = val.id
      this.addCity(val)
    },
    // 提交城市信息
    sumbit () {
      this.$emit('sumbitCity', this.cityBox, this.cityId, this.priceSystems)
      this.close()
    },
    // 删除城市
    deleteType (key) {
      this.cityId.splice(key, 1)
      this.cityBox.splice(key, 1)
      let city, id
      if (this.cityId.length === 0) {
        id = ''
        city = ''
      } else {
        id = this.cityId.join(',')
        city = this.cityBox.join(',')
      }
      if (this.city.id) {
        this.$axios({
          method: 'post',
          url: this.sp + '/productPriceSystem/groupUpdate',
          data: {
            id: this.city.id,
            cityIds: id,
            cityName: city,
            groupDesc: null,
            groupName: null,
            isDelete: 0,
            priceSystems: this.priceSystems
          }
        }).then(result => {
          if (result.data.statusCode === 200) {
          }
        })
      }
    },
    // 添加城市
    addCity (val) {
      for (let i = 0; i < this.cityId.length; i++) {
        if (this.cityId[i] - 0 === val.code - 0) {
          return
        }
      }
      // 判断其他模板是否有此城市
      this.$axios({
        method: 'post',
        url: this.sp + '/productPriceSystem/listGroup',
        data: {
          cityIds: val.code,
          groupName: null,
          pageSize: 100,
          startPage: 0
        }
      }).then(result => {
        if (result.data.statusCode === 200) {
          // for(var i = 0; i < result.data.data.list.length; i++) {
          //   result.data.data.list[i].value = result.data.data.list[i].name
          // }
          if (result.data.data.list.length > 0) {
            this.$message({
              type: 'error',
              message: '此城市已经存在于其他模板'
            })
          } else {
            this.cityId.push(val.code)
            this.cityBox.push(val.name)
          }
        }
      })
    },
    // 关闭组件
    close () {
      this.$emit('closeCity')
    },
    // 初始化城市
    init () {
      if (this.city.id) {
        if (this.city.cityName.length < 1) {
          this.cityBox = []
          this.cityId = []
        } else {
          this.cityBox = this.city.cityName.split(',')
          this.cityId = this.city.cityIds.split(',')
          this.searchDetail()
        }
      }
      if (this.addCityBox.cityName !== undefined) {
        if (this.addCityBox.cityName.length < 1) {
          this.cityBox = []
          this.cityId = []
        } else {
          this.cityBox = this.addCityBox.cityName.concat([])
          this.cityId = this.addCityBox.cityIds.concat([])
        }
      }
    },
    // 获取模板详情
    searchDetail () {
      this.$axios({
        method: 'get',
        url: this.sp + '/productPriceSystem/groupInfo?groupId=' + this.city.id
      }).then(result => {
        if (result.data.statusCode === 200) {
          this.priceSystems = result.data.data.priceSystems
        }
      })
    }
  },
  components: {
    searchCity
  },
  created () {
    this.cityList = CityJson[2].cityList.concat(CityJson[16].cityList)
    this.init()
  }
}
</script>
