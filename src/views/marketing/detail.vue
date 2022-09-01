<template>
  <div class="page">
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>活动信息</span>
      </div>
      <div>
        <el-form label-width="160px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="活动名称：">
                <span>{{info.name}}</span>
              </el-form-item>
              <el-form-item label="活动类型：">
                <span>{{info.provinceId | city}}</span>
                <span>{{info.cityId | city}}</span>
                <span>{{info.areaId | city}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col>
                  <el-form-item label="活动创建时间：">
                    <span>{{info.mainPerson}}</span>
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    <span>{{info.mobile}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col>
                  <el-form-item label="联系人：">
                    <span>{{info.mainPerson}}</span>
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    <span>{{info.mobile}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin-top:15px">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div>
        <el-form label-width="160px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="供应商名称：">
                <span>{{info.name}}</span>
              </el-form-item>
              <el-form-item label="所在地：">
                <span>{{info.provinceId | city}}</span>
                <span>{{info.cityId | city}}</span>
                <span>{{info.areaId | city}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col>
                  <el-form-item label="联系人：">
                    <span>{{info.mainPerson}}</span>
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    <span>{{info.mobile}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col>
                  <el-form-item label="联系人：">
                    <span>{{info.mainPerson}}</span>
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    <span>{{info.mobile}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin-top:15px">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div>
        <el-form label-width="160px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="供应商名称：">
                <span>{{info.name}}</span>
              </el-form-item>
              <el-form-item label="所在地：">
                <span>{{info.provinceId | city}}</span>
                <span>{{info.cityId | city}}</span>
                <span>{{info.areaId | city}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col>
                  <el-form-item label="联系人：">
                    <span>{{info.mainPerson}}</span>
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    <span>{{info.mobile}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col>
                  <el-form-item label="联系人：">
                    <span>{{info.mainPerson}}</span>
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    <span>{{info.mobile}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        name: '他们的',
        provinceId: '他们的',
        cityId: '他们的',
        areaId: '他们的',
        mainPerson: '他们的',
        mobile: '他们的'
      }
    }
  }
}
</script>
