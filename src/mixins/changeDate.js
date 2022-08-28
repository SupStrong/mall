import { formatDate } from '@/libs/utils'

export default {
  methods: {
    changeFirstDate(firstDay, type) {
      if (firstDay) {
        let cur_date = new Date(firstDay)
        let last_date = new Date(cur_date.getTime() + (86400 - 1) * 1000)
        let res_date = formatDate(last_date, 'yyyy-MM-dd hh:mm:ss')
        switch (type) {
          case 'normal':
            this.search.searchFields.end_time = res_date
            break
          case 'payed':
            this.search.searchFields.payed_date_end = res_date
            break
          case 'booked':
            this.search.searchFields.last_book_date_end = res_date
            break
          case 'inClass':
            this.search.searchFields.last_in_class_date_end = res_date
            break
          case 'remark':
            this.search.searchFields.last_remark_date_end = res_date
            break
          case 'schedule_s_time_start':
            this.search.searchFields.s_time_end = res_date
            break
          case 'schedule_s_time_end':
            if (+new Date(this.search.searchFields.s_time_end) <= +new Date(this.search.searchFields.s_time_start)) {
              this.$message.error('结束时间不能早于起始时间');
              this.search.searchFields.s_time_end = '';
            }
            break
          case 'schedule_s_create_time_start':
            this.search.searchFields.s_create_time_end = res_date
            break
          case 's_create_time_end':
            if (+new Date(this.search.searchFields.s_create_time_end) <= +new Date(this.search.searchFields.s_create_time_start)) {
              this.$message.error('结束时间不能早于起始时间');
              this.search.searchFields.s_create_time_end = '';
            }
            break
          case 'create':
            this.search.searchFields.create_time_end = res_date
            break
          case 'entry':
            this.search.searchFields.first_entry_time_end = res_date
            break
          case 'last_class':
            this.search.searchFields.last_class_time_end = res_date
            break
          default:
            break
        }
      } else {
        switch (type) {
          case 'schedule_s_time_end':
            this.$message.error('请选择起始时间');
            this.search.searchFields.s_time_end = ''
            break
          case 's_create_time_end':
            this.$message.error('请选择起始时间');
            this.search.searchFields.s_create_time_end = ''
            break
          default:
            break
        }
      }
    }
  }
}
