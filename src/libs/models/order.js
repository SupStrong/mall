export default {
  form: {
    products: [{
      name: '',
      type: '',
      price: '',
      insurance: '',
      num: '',
      total: ''
    }]
  },
  // 查询订单
  searchOrder: {
    code: '',
    startTime: '',
    endTime: '',
    pageSize: 5,
    startPage: 1,
    status: '',
    orderShowType: 1,
    categoryId: '',
    cityId: '',
    receiver: '',
    receiverAddress: '',
    receiverMobile: '',
    sourceType: null,
    provinceId: '',
    areaId: '',
    supplierMerchantId: '',
    completeStartTime: '',
    completeEndTime: '',
    saleOrderNo: '',
    contractNo: ''
  },
  // 纯查询服务
  newSearchProudct: {
    categoryId: '',
    skuName: '',
    have: null,
    pageNum: 1,
    pageSize: 10,
    categoryIdLevelOne: null,
    categoryIdLevelTwo: null,
    categoryIdLevelThree: null,
  },
  // 纯查询商品
  newSearchGoods: {
    categoryId: '',
    spuName: '',
    have: null,
    pageNum: 1,
    pageSize: 10,
  },
  // 商品查询关联服务
  GoodsRelationService: {
    deviceSpuId: null,
    contains: true,
    categoryId: null,
    skuName: null,
    brandName: null,
    pageNum: 1,
    pageSize: 10,
  },
  //  查询关联商品
  searchBrand: {
    brandName: null,
    catetoryId1: null,
    cycleNum: null,
    pageSize: 5,
    startPage: 1,
    categoryId1: null,
    categoryId2: null,
    spuName: null,
    name: null
  },

  // 获取供应商商品服务
  getProductService: {
    brandName: null,
    categoryId1: null,
    categoryId2: null,
    categoryId3: null,
    merchantId: null,
    name: null,
    relation: null,
    pageSize: 10,
    startPage: 1,
    platformType: 2
  },
  // 获取关联/未关联服务
  getRelationProduct: {
    brandName: null,
    categoryId1: null,
    categoryId2: null,
    categoryId3: null,
    merchantId: null,
    name: null,
    relation: null,
    pageSize: 10,
    startPage: 1,
    platformType: 2
  },
  // 获取供应商服务商品
  getServiceProduct: {
    brandName: null,
    categoryId1: null,
    categoryId2: null,
    categoryId3: null,
    merchantId: null,
    name: null,
    pageSize: 10,
    relation: null,
    startPage: 1,
  },
  // 获取关联/未关联商品
  getRelationMerchantDevice: {
    brandName: null,
    categoryId1: null,
    categoryId2: null,
    categoryId3: null,
    merchantId: null,
    name: null,
    pageSize: 10,
    relation: null,
    startPage: 1,
    platformType: 2,
    serviceSkuId: null,
    associated: null,
    categoryId: null,
    skuName: null,
    pageNum: 1
  },
  // 查询预约单
  appointSearch: {
    contactNumber: null,
    contacts: null,
    status: null,
    pageSize: 10,
    pageNum: 1,
    merchantName: '研发测试'
  }
}