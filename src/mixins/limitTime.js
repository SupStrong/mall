import { formatDate } from '@/libs/utils'
export default {
  data: () => ({
    timeStart: '08:00',
    pickerOptions0: {
      disabledDate(time) {
        let date = new Date()
        let h = date.getHours()
        if (h < 22) {
          return time.getTime() < Date.now() - 8.64e7
        } else {
          return time.getTime() < Date.now()
        }
      },
    }
  }),
  methods: {
    judageDate(start_time, end_time) {
      if (end_time < start_time) {
        this.$message.error('结束时间不能早于起始时间')
      }
    },
    selectBooked() {
      const t = formatDate(Date.now() / 1000, 'yyyy-MM-dd')
      this.start_time_time = ''
      if (this.start_time_date === t) {
        this.limittime()
      } else {
        this.timeStart = '08:00'
      }
    },
    limittime() {
      const now = new Date()
      let h = now.getHours()
      let m = now.getMinutes()
      let mm = 0
      let hh = 0
      if (m >= 30) {
        mm = 0
        hh = h + 1
      } else {
        mm = 30
        hh = h
      }

      if (hh < 8) {
        hh = 8
        mm = 0
      }

      if (hh < 10) {
        hh = '0' + hh
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      this.timeStart = hh + ':' + mm
    },
  }
}
