<template>
  <span class="selectDemo">
    <el-select
      @change="updateSheng"
      v-model="shengId"
      clearable
      :disabled="isDisabled && disabledGrade > 0"
      placeholder="请选择省"
    >
      <el-option
        v-for="sheng in jsonList"
        :key="sheng.code"
        :value="sheng.code"
        :label="sheng.name"
      ></el-option>
    </el-select>
    <el-select
      @change="updateShi"
      v-model="shiId"
      clearable
      :disabled="isDisabled && disabledGrade > 1"
      placeholder="请选择市"
    >
      <el-option v-for="shi in shiData" :value="shi.code" :key="shi.code" :label="shi.name"></el-option>
    </el-select>
    <span v-if="isXian">
      <el-select
        @change="updateXian"
        v-model="xianId"
        clearable
        :disabled="isDisabled && disabledGrade > 2"
        placeholder="请选择区/县"
      >
        <el-option :value="xian.code" v-for="xian in xianData" :key="xian.code" :label="xian.name"></el-option>
      </el-select>
    </span>

    <span v-if="isStreet">
      <el-select
        @change="updateStreet"
        v-model="streetId"
        clearable
        placeholder="请选择街道"
      >
        <el-option :value="xian.code" v-for="xian in streetData" :key="xian.code" :label="xian.name"></el-option>
      </el-select>
    </span>
  </span>
</template>

<script>
import AllCity from '@/assets/js/json.js'
import axios from 'axios'
export default {
  data () {
    return {
      shiData: [],
      xianData: [],
      streetData: [],
      shengId: null,
      shiId: null,
      xianId: null,
      shengName: null,
      shiName: null,
      xianName: null,
      streetId: null,
      jsonList: []
    }
  },
  props: {
    isXian: {
      type: Boolean,
      default: false
    },
    isStreet: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    disabledGrade: {
      type: Number,
      default: 3
    },
    cityBox: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    shengId: {
      handler (newVal, oldVal) {
        for (let i = 0; i < this.jsonList.length; i++) {
          if (this.jsonList[i].code === newVal) {
            this.shiData = this.jsonList[i].cityList
            this.shengName = this.jsonList[i].name
            this.shiName = null
            this.xianName = null
            return newVal
          }
        }
        this.shengName = null
        return null
      }
    },
    deep: true,
    shiId: {
      handler (newVal, oldVal) {
        for (let i = 0; i < this.shiData.length; i++) {
          if (this.shiData[i].code === newVal) {
            this.xianData = this.shiData[i].areaList
            this.shiName = this.shiData[i].name
            this.xianName = null
            return newVal
          }
        }
        this.shiName = null
        return null
      }
    },
    xianId: {
      handler (newVal, oldVal) {
        if (this.isStreet) {
          this.getStreet(newVal)
        }
        for (let i = 0; i < this.xianData.length; i++) {
          if (this.xianData[i].code === newVal) {
            this.xianName = this.xianData[i].name
            return newVal
          }
        }
        this.xianName = null
        return null
      }
    }
  },
  methods: {
    clear () {
      this.shengId = null
      this.shiId = null
      this.xianId = null
    },
    // 设置城市县
    setCity (obj) {
      console.log(obj)
      this.shengId = obj.sheng - 0
      this.shiId = obj.shi - 0
      this.xianId = obj.xian - 0
      this.streetId = obj.street || ''
    },
    updateSheng (e) {
      this.shiId = null
      this.xianId = null
      setTimeout(() => {
        this.sumbit()
      }, 50)
    },
    updateShi (e) {
      this.xianId = null
      setTimeout(() => {
        this.sumbit()
      }, 50)
    },
    updateXian (e) {
      setTimeout(() => {
        this.sumbit()
      }, 50)
    },
    updateStreet (e) {
      this.$emit('Citychange', {
        sheng: {
          name: this.shengName,
          code: this.shengId
        },
        shi: {
          name: this.shiName,
          code: this.shiId
        },
        xian: {
          name: this.xianName,
          code: this.xianId
        },
        street: {
          name: this.streetName,
          code: this.streetId
        }
      })
    },

    // 获取街道数据
    async getStreet (streetId) {
      try {
        let data = await (axios.get(`https://jms.bearhome.cn/papi/sso/area/${streetId}/street`))
        if (data.data.code === 200) {
          this.streetData = data.data.data
        }
      } catch (err) {
        console.error(err)
      }
    },
    sumbit () {
      if (this.cityBox.length === 0) {
        this.$emit('Citychange', {
          sheng: {
            name: this.shengName,
            code: this.shengId
          },
          shi: {
            name: this.shiName,
            code: this.shiId
          },
          xian: {
            name: this.xianName,
            code: this.xianId
          }
        })
        this.$emit('input', this.shiId)
      } else {
        let cityId = null
        if (this.shengId && !this.shiId) {
          cityId = []
          for (let i = 0; i < AllCity.length; i++) {
            if (AllCity[i].code - 0 === this.shengId - 0) {
              AllCity[i].cityList.forEach(twoVal => {
                for (let j = 0; j < this.cityBox.length; j++) {
                  if (this.cityBox[j] - 0 === twoVal.code - 0) {
                    cityId.push(twoVal.code)
                  }
                }
              })
              break
            }
          }
          cityId = cityId.join(',')
        } else {
          cityId = this.shiId
        }
        this.$emit('Citychange', {
          sheng: {
            name: this.shengName,
            code: this.shengId
          },
          shi: {
            name: this.shiName,
            code: cityId
          },
          xian: {
            name: this.xianName,
            code: this.xianId
          }
        })
        this.$emit('input', this.shiId)
      }
    },
    // 筛选城市
    screen (all) {
      var box = []
      if (this.cityBox.length > 0) {
        for (let i = 0; i < all.length; i++) {
          let step = false
          let demo = []
          for (let j = 0; j < all[i].cityList.length; j++) {
            for (let z = 0; z < this.cityBox.length; z++) {
              if (all[i].cityList[j].code - 0 === this.cityBox[z] - 0) {
                step = true
                demo.push(all[i].cityList[j])
              }
            }
          }
          if (step) {
            all[i].cityList = demo
            box.push(all[i])
          }
        }
        this.jsonList = box
      } else {
        this.jsonList = all
      }
    }
  },
  created () {
    this.screen(this.lk.deepCopy(AllCity))
  }
}
</script>

<style lang='stylus' scoped>
.selectDemo
  display inline-block
  >>>.el-select
      margin-right 10px
      width 150px
</style>
