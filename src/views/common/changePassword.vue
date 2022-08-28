<template>
  <div class="page">
    <el-breadcrumb separator="/" style="margin: 15px 0 25px;">
      <el-breadcrumb-item>
        用户
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        修改密码
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page-content">
      <el-form class="normal-form" label-width="100px" @submit.native.prevent>
        <el-form-item label="新密码" :error="errorBags.collect('新密码')[0]">
          <el-input
            type="password"
            v-model="addFields.pwd"
            data-vv-name="新密码"
            ref="新密码"
            v-validate="'required|alpha_dash|max:16|min:8'"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePassword">保存</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userApi } from '@/api'
import gobackMixin from '@/mixins/goback'

export default {
  mixins: [gobackMixin],

  data: () => ({
    addFields: {
      pwd: ''
    }
  }),

  methods: {
    changePassword() {
      this.$validator.validate().then(status => {
        if (status) {
          userApi.changeOwnPassword(this.addFields).then(res => {
            let data = res.data
            if (data.code === 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.goBack()
            } else {
              this.$error(data)
            }
          })
        } else {
          this.$message({
            message: '请正确填写数据',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
