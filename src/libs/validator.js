import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Validator.localize('zh_CN', zh_CN)
const config = {
  errorBagName: 'errorBags',
  fieldsBagName: 'fieldBags',
  locale: 'zh_CN'
}
Validator.extend('phone', {
  messages: {
    zh_CN: field => field + '必须是11位手机号码',
  },
  validate: value => {
    return value.length === 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value)
  }
});

Vue.use(VeeValidate, config)
