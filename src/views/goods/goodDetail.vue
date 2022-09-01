<template>
  <div class="page ">
    <el-form label-width="120px" class="course-info page-content">
      <!--客户信息-->
      <info-field title="客户信息" class="content-item">
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="联系人:"
              required
              :error="errorBags.collect('联系人')[0]"
            >
              <el-input
                v-model="form.receiverName"
                name="联系人"
                v-validate="'required'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="space"></el-col>
          <el-col :span="8">
            <el-form-item
              label="联系电话:"
              required
            >
              <el-input
                v-model="form.receiverMobile"
                v-validate="'required|phone'"
                name="联系电话"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="备用电话:">
              <el-input v-model="form.reserveMobile" name="备用电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="space"></el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <el-form-item label="服务地址:" required>
          <testCity ref="city" @Citychange="chooseCity" :isXian="true" />
        </el-form-item>
        <el-row>
          <el-form-item label="备注:">
            <el-col :span="12">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </info-field>
    </el-form>
    <div class="button-field">
      <el-button @click="clearForm">清空</el-button>
      <el-button @click="submitForm" type="primary">提交</el-button>
    </div>
  </div>
</template>
<script>
import infoField from '@/components/schedule/infoField';
import testCity from '@/commonTools/testCity';
import vTable from '@tool/vtable';
import backPage from '@/mixins/backPagingMixin';
export default {
  data() {
    return {
      form: {}
    }
  },
  components: {
    infoField,
    testCity
  },
  methods: {
    submitForm() {
      alert('提交')
    },
    clearForm() {
      alert('清空')
    }
  }
};
</script>
<style lang="stylus" scoped>
  .button-field{
  text-align: center;
}
</style>
