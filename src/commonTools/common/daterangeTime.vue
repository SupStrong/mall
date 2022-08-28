<template>
<!-- 获取以后的时间：添加默认时间：通过mounted 如果timeArr数组有值则赋给time，用法：父组件中:timeArr="" 左 -->
  <el-date-picker
    v-model="time"
    :type="type"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-time="defaultTime"
    :format="format"
    :disabled="isDisabled"
    value-format="yyyy-MM-dd HH:mm:ss"
    :align="align"
    :unlink-panels="panels"
    :picker-options="pickerOptions"
    @change="handleChange"
  ></el-date-picker>
</template>
<script>
export default {
  name: 'timePicker',
  data () {
    return {
      time: ''
    }
  },
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    },
    align: {
      type: String,
      required: true,
      default: 'right'
    },
    panels: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    defaultTime: {
      type: Array,
      required: false,
      default () {
        return ['00:00:00', '23:59:59']
      }
    },
    format: {
      type: String,
      required: false,
      default: 'yyyy-MM-dd'
    },
    initialTime: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    pickerOptions: {
      type: Object,
      required: false,
      default () {
        return {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              end.setHours(23, 59, 59)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const start = new Date()
              start.setHours(24, 0, 0, 0)
              start.setTime(start.getTime() - 24 * 60 * 60 * 1000 * 2)
              const end = new Date()
              end.setHours(23, 59, 59)
              end.setTime(end.getTime() - 24 * 60 * 60 * 1000)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '明天',
            onClick (picker) {
              const start = new Date()
              start.setHours(24, 0, 0, 0)
              start.setTime(start.getTime())
              const end = new Date()
              end.setHours(23, 59, 59)
              end.setTime(end.getTime() + 24 * 60 * 60 * 1000)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '后天',
            onClick (picker) {
              const start = new Date()
              start.setHours(24, 0, 0, 0)
              start.setTime(start.getTime() + 24 * 60 * 60 * 1000)
              const end = new Date()
              end.setHours(23, 59, 59)
              end.setTime(end.getTime() + 24 * 60 * 60 * 1000 * 2)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '后一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              end.setHours(23, 59, 59)
              end.setTime(end.getTime() + 24 * 60 * 60 * 1000 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '后一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              end.setHours(23, 59, 59)
              end.setTime(end.getTime() + 24 * 60 * 60 * 1000 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '后三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              end.setHours(23, 59, 59)
              end.setTime(end.getTime() + 24 * 60 * 60 * 1000 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    timeArr: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },
  watch: {
    'timeArr': {
      handler (newVal) {
        this.time = this.timeArr
      }
    }
  },
  mounted () {
    this.time = this.timeArr
  },
  methods: {
    handleChange (time) {
      this.$emit('handleChange', time)
    },
    clear () {
      this.time = ''
    }
  }

}
</script>
