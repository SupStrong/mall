export default {
  // 老数据
  chargeSearch: {
    merchantCode: null,
    pageNo: 1,
    pageSize: 10,
    billListBillChannel: null,
    billListBillType: null,
    orderCode: null,
    startBillTime: null,
    endBillTime: null
  },
  billListSearch: {
    pageSize: 10,
    startPage: 1,
    merchReconStatus: null,
    settlementCode: null,
    orderCode: null,
    maxAmount: null,
    startBillTime: null,
    endBillTime: null,
    minAmount: null,
    startCreateTime: null,
    endCreateTime: null,
    startSettlementTime: null,
    endSettlementTime: null,
    merchantCode: null,
    settlDetailMinCount: null,
    settlDetailMaxCount: null,
  },
  billListSearchDetail: {
    pageSize: 10,
    pageNo: 1,
    reconciliationId: null,
    settlementType: null,
    orderCode: null,
    merchantName: null,
    merchantCode: null,
    checkStatus: null,
    mobile: null,
    customerName: null,
    startCreateTime: null,
    endCreateTime: null,
    startReconciliationDate: null,
    endReconciliationDate: null,
  },

  // 新交易流水列表
  searchTransaction: {
    merchantCode: null,
    pageNo: 1,
    pageSize: 10,
    billType: null,
    billObject: null,
    billObjectCode: null,
    startBillTime: null,
    endBillTime: null
  },
  // 入库按扣款
  searchMoney: {
    purseId: null,
    merchantCode: null,
    entryAccountId: null,
    outTransCode: null,
    tradeType: null,
    amount: null,
    inOut: null,
    remark: ''
  },
  // 结算记录
  accountTable: {
    settleStatus: null,
    pageNo: 1,
    pageSize: 10,
    settlePartyId: null,
    settlePartyType: null
  },
  // 账单列表
  MonthlyAccount: {
    _merchantId: null,
    settlePartyType: 1
  }
}
