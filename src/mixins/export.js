import QS from 'qs'
import { mapGetters } from 'vuex'
import { deepCopy } from '@/assets/js/cookie'
export default {
  data() {
    return {
      time: null,
      checkList: [],
      configList: [],
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // 获取配置
    getConfigList(url) {
      this.$axios({
        method: 'get',
        url: this.dd + '/config/' + url
      }).then(result => {
        if (result.data.statusCode === 200) {
          this.configList = JSON.parse(result.data.data)
        }
      });
    },
    // 全选
    allSelect(Source) {
      this.checkList = Source.concat([])
    },
    // 全不选
    noAllSelect() {
      this.checkList = []
    },
    // 筛选数组
    screenArray(big, small) {
      var result = [],
        step = true;
      for (let i = 0; i < big.length; i++) {
        step = true;
        for (let j = 0; j < small.length; j++) {
          if (big[i] === small[j]) {
            step = false;
          }
        }
        if (step) {
          result.push(big[i]);
        }
      }
      return result;
    },

    exportOrder() {
      let params = deepCopy(this.search.searchFields)
      for (let i in params) {
        if (!params[i]) {
          delete params[i]
        }
      }
      delete params.pageSize
      delete params.startPage
      delete params.orderShowType
      let url = `${this.order}/config/tob/excel/supplier_service_order_export?${QS.stringify(params)}`
      window.open(url)
    }
  }
}
