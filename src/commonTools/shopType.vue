<template>
  <span class='thressType'>
    <el-select class="sle1" @change="oneChange" v-model="one" placeholder="请选择一级类目" clearable :disabled='isDisabled' style='width:150px'>
      <el-option v-for="item in oneBox" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select class="sle1" v-model="two" @change="twoChange" placeholder="请选择二级类目" clearable
    :disabled='isDisabled' style='width:150px'>
      <el-option v-for="item in twoBox" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select class="sle1" v-model="three" @change="threeChange" placeholder="请选择三级类目" :disabled='isDisabled' clearable style='width:150px'>
      <el-option v-for="item in threeBox" :key="item.id" :label="item.name" :value="item"></el-option>
    </el-select>
    <el-button v-if="isShow" @click="addType">添加</el-button>
  </span>
</template>

<script>
export default {
  data () {
    return {
      typeTree: [],
      one: null,
      oneName: '',
      oneBox: [],
      two: null,
      twoName: '',
      twoBox: [],
      three: null,
      threeName: '',
      result: null,
      threeBox: []
    }
  },
  props: {
    categoryId3: {
      type: String,
      default () {
        return ''
      }
    },
    deviceIndex: {
      type: Number,
      default () {
        return 0
      }
    },
    isShow: {
      type: Boolean,
      default () {
        return true
      }
    },
    idBox: {
      type: Array,
      default () {
        return []
      }
    },
    isSB: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.getTypeTree()
    if (this.categoryId3) {
      this._setThree(this.categoryId3)
    }
  },
  methods: {
    // 父组件点击--清空类目
    clear (transmit) {
      if (transmit == null) {
        this.one = null
        this.two = null
        this.three = null
      }
    },
    // 设置类目
    _setThree (three) {
      setTimeout(() => {
        this.oneBox.forEach(val => {
          val.child.forEach(valTwo => {
            valTwo.child.forEach(valThree => {
              if (valThree.id === three - 0) {
                this.one = val.id - 0
                this.oneChange()
                this.two = valTwo.id - 0
                this.twoChange()
                this.three = valThree
                this.threeChange()
              }
            })
          })
        })
      }, 1000)
    },
    // 添加类目
    addType () {
      if (this.result !== null) {
        this.$emit('typeChange', this.result)
      }
    },
    sumbit () {
      this.$emit('ThreeChange', {
        one: this.one,
        oneName: this.oneName,
        two: this.two,
        twoName: this.oneName === '' ? this.twoName = '' : this.twoName,
        three: this.result ? this.result.id : null,
        threeName: this.three,
        oneBox: this.oneBox,
        twoBox: this.twoBox,
        threeBox: this.threeBox,
        deviceIndex: this.deviceIndex
      })
    },
    oneChange () {
      this.three = null
      this.two = null
      this.twoBox = []
      this.result = null
      this.threeBox = []
      this.three = null
      this.oneName = ''
      this.oneBox.forEach(val => {
        if (val.id === this.one) {
          this.twoBox = val.child
          this.oneName = val.name
        } else {
        }
      })
      this.sumbit()
    },
    twoChange () {
      // this.three = null
      this.result = null
      this.threeBox = []
      this.three = null
      this.twoName = ''
      this.twoBox.forEach(val => {
        if (val.id === this.two) {
          this.threeBox = val.child
          this.twoName = val.name
        }
      })
      this.sumbit()
    },
    threeChange (val) {
      this.result = this.three
      this.three = this.three.name
      this.sumbit()
      this.$emit('getData')
    },
    _setType () {
      this.getTypeTree()
    },
    // 获取目录树
    getTypeTree () {
      var url = 'api/product/product/category/queryCategoriesTree'
      var data = {
        bizParam: {
          enable: 1,
          isProduct: null,
          parentId: 0
        }
      }
      if (this.isSB) {
        url = this.sb + '/product/categoryTree'
        data = {
          banner: null,
          contentDesc: null,
          createTime: null,
          creator: null,
          enable: null,
          id: null,
          image: null,
          isParent: null,
          isProduct: null,
          modifier: null,
          modifyTime: null,
          name: null,
          parentId: 0,
          reminderCycle: null,
          sort: null
        }
      }
      this.$axios({
        method: 'post',
        url: url,
        data: data
      }).then(data => {
        if (data.data.statusCode === 200) {
          this.oneBox = data.data.data
          // 筛选一级数据
          let result = data.data.data
          if (this.idBox.length > 0) {
            let obj = {}
            result = []
            for (let i = 0; i < this.oneBox.length; i++) {
              for (let j = 0; j < this.oneBox[i].child.length; j++) {
                for (let z = 0; z < this.oneBox[i].child[j].child.length; z++) {
                  for (let k = 0; k < this.idBox.length; k++) {
                    if (
                      this.oneBox[i].child[j].child[z].id === this.idBox[k] - 0
                    ) {
                      if (!obj[this.oneBox[i].id]) {
                        result.push(this.oneBox[i])
                        obj[this.oneBox[i].id] = []
                        obj[this.oneBox[i].id].push(
                          this.oneBox[i].child[j].child[z]
                        )
                      } else {
                        obj[this.oneBox[i].id].push(
                          this.oneBox[i].child[j].child[z]
                        )
                      }
                    }
                  }
                }
              }
            }
          }
          this.oneBox = result
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
.thressType
  display: inline-block
  >>>.el-select
    margin-right 10px
</style>
