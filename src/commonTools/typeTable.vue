<template>
  <span>
    <el-select class="sle1" @change="oneChange" v-model="one" placeholder="请选择一级类目" clearable>
      <el-option v-for="item in oneBox" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select class="sle1" v-model="two" @change="twoChange" placeholder="请选择二级类目" clearable style="margin-left:10px">
      <el-option v-for="item in twoBox" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </span>
</template>

<script>
export default {
  data () {
    return {
      typeTree: [],
      one: null,
      oneBox: [],
      two: null,
      twoBox: [],
      three: null,
      threeBox: []
    }
  },
  created () {
    this.getTypeTree()
  },
  methods: {
    // 添加类目
    oneChange () {
      this.three = null
      this.two = null
      this.oneBox.forEach(val => {
        if (val.id === this.one) {
          this.twoBox = val.child
        }
      })
    },
    twoChange () {
      this.three = null
      this.twoBox.forEach(val => {
        if (val.id === this.two) {
          this.threeBox = val.child
        }
      })
      this.$emit('threeChange', this.threeBox, this.two, this.one)
    },
    // 获取目录树
    getTypeTree () {
      this.$axios({
        method: 'post',
        url: 'api/product/product/category/queryCategoriesTree',
        data: {
          bizParam: {
            enable: 1,
            isProduct: null,
            parentId: 0
          },
          id: 0,
          ip: 'string'
        }
      }).then(result => {
        if (result.data.statusCode === 200) {
          this.oneBox = result.data.data
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
</style>
