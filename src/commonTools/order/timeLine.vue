<template>
  <div class="timeLine">
    <el-steps :active="activities.length" v-if="size === 'horizon'" align-center>
      <el-step
        v-for="(activity, index) in activities"
        :description="activity.content"
        :key="index"
      ></el-step>
    </el-steps>
    <div v-else>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.content">
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    data: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    size: {
      type: String,
      required: false,
      default: 'horizon'
    },
    type: {
      type: String,
      required: false,
      default: 'orderTimeScroll'
    }
  },
  computed: {
    activities () {
      let data = []
      for (let i in this.data) {
        data.push({
          key: this.lk[this.type][i],
          value: this.data[i],
          content: this.lk[this.type][i] + '' + this.data[i]
        })
      }
      data[data.length - 1].color = '#409EFF'
      return data
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.timeLine
  padding-bottom 10px
  >>>.el-step__description
    margin-top 5px
</style>
