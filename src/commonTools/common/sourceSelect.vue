<template>
  <span>
    <el-select v-model="one" @change="handleChange" clearable>
      <el-option v-for="(val, key) in getConfig['orderInfoSourceTypeOne']"
        :key="key"
        :label="val.dictName"
        :value="val.id">
      </el-option>
    </el-select>
    <el-select v-model="two" @change="handleChange2" style="margin-left:10px" clearable>
      <el-option v-for="(val, key) in sourceTwo"
        :key="key"
        :label="val.dictName"
        :value="val.dictCode">
      </el-option>
    </el-select>
  </span>
</template>
<script>
import { orderApi } from '@/api'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      sourceOne: [],
      sourceTwo: [],
      one: null,
      two: null,
      oneCode: null
    }
  },
  computed: {
    ...mapGetters(['getConfig'])
  },
  methods: {
    // 父组件点击--清空类目
    clear () {
      this.one = null
      this.two = null
    },
    handleChange () {
      this.getSource(this.one)
      this.getConfig['orderInfoSourceTypeOne'].map(item => {
        if (item.id === this.one) {
          this.oneCode = item.dictCode
        }
        return item
      })
    },
    handleChange2 (data) {
      this.$emit('sourceChange', {
        one: this.one ? this.oneCode : null,
        two: this.two,
        twoBox: this.two ? this.sourceTwo : []
      })
    },
    async getSource (id) {
      try {
        let data = (await orderApi.getSource(id)).data
        this.sourceTwo = data.data
        this.$emit('sourceChange', {
          one: this.one ? this.oneCode : null,
          two: this.two,
          twoBox: this.sourceTwo
        })
      } catch (err) {
        console.error(err)
      } finally {

      }
    }
  }
}
</script>
