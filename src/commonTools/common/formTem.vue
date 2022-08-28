<template>
  <div>
    <el-form :label-width="labelWidth">
      <el-form-item v-for="(item, key) in formItems" :key="key" :label="item.label">
        <el-select v-model="searchObj[item.name]" v-if="item.type === 'select'">
          <el-option v-for="(opt, index) in item.dict" :key="index" :value="opt.dictCode" :label="opt.dictName"></el-option>
        </el-select>
        <el-radio-group v-model="searchObj[item.name]" v-else-if="item.type === 'radio'">
          <el-radio v-for="(opt, index) in item.dict" :key="index" :value="opt.dictCode" :label="opt.dictName"></el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="searchObj[item.name]" v-else-if="item.type === 'checkbox'">
          <el-checkbox v-for="(opt, index) in item.dict" :key="index" :value="opt.dictCode" :label="opt.dictName"></el-checkbox>
        </el-checkbox-group>
        <el-upload v-if="item.type === 'file'"></el-upload>
        <el-input :type="item.type" v-model="searchObj[item.name]" v-else></el-input>
      </el-form-item>
    </el-form>
    <div class="submitBox" v-if="needSubmit">
      <el-button @click="submit">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {

  },
  props: {
    api: {
      type: String,
      default: '',
      required: false
    },
    methods: {
      type: String,
      default: 'post'
    },
    labelWidth: {
      type: String,
      default: '120px',
      required: false
    },
    searchObj: {
      type: Object,
      default: () => {
        return {}
      },
      required: false
    },
    needSubmit: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['getConfig'])
  },
  methods: {
    submit () {
      if (this.api) {
        this.$axios({
          methods: this.methods,
          url: this.api,
          data: this.searchObj
        }).then(data => {
          if (data.statusCode === 200) {
            this.$message.success('提交成功')
            this.$emit('handleResponse', data.data)
          } else {
            this.$message.error('提交失败')
          }
        })
      } else {
        this.$emit('handleSubmit', this.searchObj)
      }
    },
    cancel () {
      this.emit('handleCancel')
    }
  }
}
</script>
