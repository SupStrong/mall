<template>
  <div class="info-container">
      <el-card class="search-card" v-if="!noCard" :body-style="{ padding: 0 }">
        <div slot="header" class="clearfix search-header" @click="handleClick" v-if="!notitle">
          <span class="info-title"><i :class="icon"></i> {{title}}</span>
          <span style='margin-left:20px;font-size:12px' v-if="noTime">更新时间:{{time}}</span>
          <i class="icon el-icon-minus" v-if="showMyField"></i>
          <i class="icon el-icon-plus" v-else></i>
          <el-button v-for="(key,index) in buttons" :key="index" @click.stop="$emit('titleButtonClick', key)" :type="key.type || 'primary'" size="mini" style="float:right">{{key.name}}</el-button>
          <slot name="buttons" style="float: right"></slot>
        </div>
        <div slot="header" class="clearfix search-header">
          <slot name="content"></slot>
        </div>

        <slot name="nohide"></slot>
        <el-collapse-transition>
          <div v-show="showMyField">
            <div class="body info-field"> <!-- To fix element collapse transition bug. -->
              <slot>
                <el-form :label-width="labelWidth" :inline="inline">
                    <!--如果是html文本 -->
                    <el-form-item
                      v-for="(item, index) in realData" :key="index"
                      :label="item.label"
                      v-if="(data[item.prop]!== null && data[item.prop]!== undefined )|| item.type"
                      :label-width="item.labelWidth"
                      :style="'min-width:' + item.width"
                    >
                      <p v-if="item.type === 'html'" v-html="data[item.prop]">
                        {{data[item.prop]}}
                      </p>
                      <my-render v-else-if="item.type === 'render'" :row="item" :render="item.render"></my-render>
                      <img v-else-if="item.type === 'img'" :src="data[item.prop] || deImg" alt="" :style="item.style">
                      <span v-else-if="item.type === 'func'"><span>{{item.computed}}</span></span>
                      <span v-else-if="item.type === 'button'"><el-button @click="handleButtonClick($event,item)" :style="item.style" type="text">{{item.buttonName}}</el-button></span>
                      <span v-else-if="item.type ==='link'"><el-link type="primary" @click="handleButtonClick($event,item)" :underline="false">{{item.id}}</el-link></span>
                      <span v-else :style="item.style">{{data[item.prop] | filter(item.filter, item.filterProps)}}</span>
                    </el-form-item>
                </el-form>
              </slot>
              <slot name="assembly"></slot>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>
      <slot name="onlyContainer"></slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MyRender from './my-render'
export default {
  name: 'infoField',
  data: () => ({
    showMyField: true,
    editableTabsValue: '0'
  }),
  props: {
    title: {
      type: String,
      default: '详情信息'
    },
    time: {
      type: String,
      required: false,
      default: () => {
        return ''
      }
    },
    noTime: {
      type: Boolean,
      required: false,
      default: false
    },
    notitle: {
      type: Boolean,
      default: false
    },
    timeShow: {
      type: Boolean,
      default: false
    },
    equipartition: {
      type: Number,
      required: false,
      default: 0
    },
    data: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    content: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    noCard: {
      type: Boolean,
      required: false,
      default: false
    },
    buttons: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    inline: {
      type: Boolean,
      required: false,
      default: true
    },
    labelWidth: {
      type: String,
      required: false,
      default: '120px'
    }
  },
  computed: {
    ...mapGetters(['getScreenWidth']),
    realData () {
      return this.content.filter(item => {
        return typeof (item.show) === 'function' ? item.show() : true
      })
    }
  },
  methods: {
    handleClick () {
      this.showMyField = !this.showMyField
    },
    handleButtonClick (event, data) {
      this.$emit('handleInfoClick', {
        event: event,
        data: data
      })
    }
  },
  components: {
    MyRender
  }
}
</script>

<style lang="stylus" scoped>
.info-container
  margin-bottom 10px
  >>>.el-card
    padding 5px 0
    color #606266
  >>>.el-form-item__label
      color #99a9bf
.tabs
  margin-top 30px
.info-field
  img
    width 150px
    height 150px
    margin-right 20px
    float left
  >>>.el-form-item--small,.el-form-item
    margin-right 0
.preview
  max-width 300px
  margin-left 15px
</style>
