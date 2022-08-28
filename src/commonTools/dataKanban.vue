<template>
  <div :class="isScroll ? 'kanbanListScroll' : 'kanbanList'">
  <div id="kanbanId" class="kanban" :class="isChoice?val.check?'kanbanOn':'kanbanNo':{kanbanOn:key == ins}" v-for="(val,key) in kanbanList" :key="key" @click="isChoice?choiceKanban(val,key):changeKanban(val,key)">
    <el-tooltip class="item" effect="dark" placement="right"  v-if='isShow'>
      <div slot="content">{{val.content}}</div>
      <span>{{val.name}} <i class="el-icon-info"></i></span>
    </el-tooltip>
     <p  v-if='!isShow'>{{val.name}}</p>
      <p  v-if='is' >{{val.params}}</p>
     <p  v-if='is' >{{val.url}}</p>
     <div style='display:flex;   justify-content: center'>
    <p :class ="['numbers',val.url? '':'num_color']">{{val.numbers}}</p>
    <p :class ="['numbers',val.url? '':'num_color']" v-if='isS' style='font-size:14px !important'>{{'('+val.money+')'}}</p>
     </div>
    <p :class ="['numbers',val.url? '':'num_color']" style='font-size:14px'>{{val.percentage}}</p>
    <p class="compare" v-if="val.dayCompare">前一日: {{val.dayCompare}}</p>
    <p class="compare" v-if="val.weekCompare">上周同期: {{val.weekCompare}}</p>
    <p class="compare" v-if="val.money">金额: {{val.money}}</p>
    <p class="compare" v-if="val.total">总金额: {{val.total}}</p>
    <p class="compare" v-if="val.yesterday">昨天: {{val.yesterday}}</p>
    <p class="compare" v-if="val.quantityUnit-0>=0">数量: {{val.quantityUnit}}（笔）</p>
    <p class="compare" v-if="val.quant-0>=0">数量: {{val.quant}}</p>
  </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      ins: 0,
      is: false
      // isS: false
    }
  },
  props: {
    kanbanList: {
      type: Array,
      default () {
        return {}
      }
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isS: {
      type: Boolean,
      default: false
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    isChoice: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeKanban (val, key) {
      this.ins = key
      this.$emit('getKanban', val)
    },
    choiceKanban (val, key) {
      let kanbanObj = []
      val.check = !val.check
      this.kanbanList.filter(item => {
        if (item.check) {
          kanbanObj.push(item)
        }
      })
      this.$emit('getKanban', kanbanObj)
    }
  }
}
</script>

<style lang="stylus" scoped>
.kanbanList{
  width 100%
  height auto
  display flex
  flex-wrap wrap
  margin-left -2%
}
.kanbanListScroll{
  width 100%
  height auto
  display -o-box
  display -moz-box
  display -webkit-box
  overflow hidden
  overflow-x scroll
}
.num_color{
  color:#909399  !important
}
.kanban{
  width 23%
  height auto
  background-color #eaeefb
  border-radius 4px
  text-align center
  font-size 16px
  cursor pointer
  line-height 30px
  padding 15px 0
  margin-left 2%
  margin-bottom 15px
}
.kanbanOn{
  background-color #409eff
  color #fff
  .numbers{
    color #fff
  }

}
.kanbanNo{
  .numbers{
    color #fff
  }

}
.numbers{
  color #409eff
  font-weight bold
  font-size 24px
}
.compare{
   font-size 12px
}
</style>
