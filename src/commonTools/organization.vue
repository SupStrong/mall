<template>
  <span class="selectDemo">
    <el-select  @change="getData(2)" v-model="one" placeholder="请选择一级服务组织" clearable>
      <el-option v-for="item in oneBox" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select  v-model="two" @change="setOrg" placeholder="请选择二级服务组织" clearable style="margin-left:10px">
      <el-option v-for="item in twoBox" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-button @click="addOrg" type="primary" v-if="isShow">添加</el-button>
  </span>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      one: null,
      oneBox: [],
      two: null,
      twoBox: [],
      localOneBox: [],
      localTwoBox: [],
      result: {},
      parentId: null
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  computed: {
    ...mapGetters(['getConfig'])
  },
  watch: {
    one () {
      if (!this.one) {
        this.$emit('twoOrgChange', {})
      }
    }
  },
  methods: {
    clear () {
      this.one = null
      this.two = null
    },
    getData (level) {
      var params = {
        level: level,
        page: 1,
        rows: 1000,
        parentId: level === 1 ? 0 : this.one,
        showType: 4
      }
      this.result = {}
      this.$axios({
        method: 'post',
        data: params,
        url: this.yh + '/organization/getUserServiceOrganizationTree'
      }).then(result => {
        if (result.data.statusCode === 200) {
          // 初始化分页器 每个分页请求都要写上
          if (level === 1) {
            this.one = null
            if (this.localOneBox.length) {
              this.oneBox = this.localOneBox.filter(item => {
                if (result.data.data.some(value => {
                  return value.id === item.id
                })) {
                  return item
                }
              })
            } else {
              this.oneBox = result.data.data
            }
          } else {
            this.two = null
            if (this.localTwoBox.length) {
              this.twoBox = this.localTwoBox.filter(item => {
                if (result.data.data.some(value => {
                  return value.id === item.id
                })) {
                  return item
                }
              })
            } else {
              this.twoBox = result.data.data
            }
            this.$emit('oneOrgChange', {
              one: this.one,
              twoBox: this.twoBox.map(item => {
                return item.id
              })
            })
          }
        }
      })
    },
    addOrg () {
      if (this.two) {
        this.$emit('addOrganization', this.result)
      } else {
        this.$message.error('请选择二级服务组织')
      }
    },
    setOrg (e) {
      this.result = {}
      this.oneBox.map(item => {
        if (item.id === this.one) {
          this.result.one = {
            id: item.id,
            name: item.name
          }
        }
      })
      this.twoBox.map(item => {
        if (item.id === this.two) {
          this.result.two = {
            id: item.id,
            name: item.name
          }
        }
      })
      this.$emit('twoOrgChange', this.result)
    },
    init () {
      if (this.getConfig.dataPower && this.getConfig.dataPower.organization && this.getConfig.dataPower.organization.length) {
        this.localOneBox = []
        this.localTwoBox = []
        this.getConfig.dataPower.organization.map(item => {
          this.localOneBox.push(item.one)
          this.localTwoBox.push(item.two)
          return item
        })
        this.getData(1)
      } else {
        this.getData(1)
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
