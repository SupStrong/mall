export default {
  data: () => ({
    currentSize: localStorage.pageSize ? localStorage.pageSize - 0 : 5
  }),

  methods: {
    // 传入的是callback的方法本身，如this.getCourseList
    handleSizeChange(count, callBack, fields, pageSize, pageIndex) {
      localStorage.pageSize = count
      if (fields) {
        fields[pageSize] = count
        fields[pageIndex || 'pageIndex'] = 1
      } else {
        this.search.searchFields.count = count
      }
      this.currentSize = count
      callBack()
    },
    handleCurrentChange(page, callBack, fields, pageIndex) {
      if (fields) fields[pageIndex] = page
      else this.search.searchFields.startPage = page
      callBack()
    }
  }
}
