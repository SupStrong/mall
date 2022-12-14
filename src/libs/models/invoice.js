export default {
  queryInvoiceList: {
    size: 10,
    page: 1,
    trade_type: 1,
    title: '',
    recon_code: '',
    translate: '',
    start_time: '',
    end_time: '',
    open_start_time: '',
    open_end_time: '',
    type: ''
  },
  updateForm: {
    id: '',
    opened: '',
    open_code: '',
    express_name: '',
    express_num: '',
    status: '',
    translate: '',
    operation: '',
    update_user_id: '',
    merchant_id: '',
    reason: '',
    red_code: '',
    code_num: '',
    checked: '',
    open_time: ''
  },
  addForm: {
    merchant_id: '',
    title: '',
    license: '',
    bank_name: '',
    bank_no: '',
    corp_address: '',
    checked: '',
    corp_tel: '',
    create_time: '',
    create_user_id: '',
    type: ''
  },
  addAddress: {
    merchant_id: '',
    phone: '',
    name: '',
    address: '',
    province_id: '',
    city_id: '',
    area_id: '',
    email: '',
    is_only: 0,
    other_number: ''
  },
  updateAddress: {
    id: '',
    phone: '',
    name: '',
    address: '',
    province_id: '',
    city_id: '',
    area_id: '',
    email: '',
    is_only: 0,
    other_number: ''
  },
  logSearch: {
    page_size: 10,
    page_no: 1,
    merchant_id: '',
    start_time: '',
    end_time: ''
  },
  // 申请开票
  applyBillObj: {
    trade_id: '',
    merchant_id: '',
    trade_type: '',
    amount: '',
    title: '',
    type: '',
    license: '',
    bank_name: '',
    bank_no: '',
    corp_address: '',
    corp_tel: '',
    detail: '',
    is_receive: '',
    receive_name: '',
    receive_phone: '',
    receive_address: '',
    create_time: '',
    create_user_id: '',
    update_time: '',
    update_user_id: '',
    order_code: ''
  },

  applyOrderObj: {
    create_user_id: '',
    order_code: '',
    trade_id: '',
    merchant_id: '',
    trade_type: '',
    amount: '',
    title_type: '',
    title: '',
    type: '',
    is_receive: '',
    bank_name: '',
    bank_no: '',
    license: '',
    corp_address: '',
    corp_tel: '',
    detail: '',
    receive_name: '',
    receive_phone: '',
    receive_address: ''
  }

}
