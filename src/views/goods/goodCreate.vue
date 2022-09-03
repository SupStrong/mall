<template>
  <div class="page">
    <el-form label-width="120px" class="course-info page-content">
      <!--客户信息-->
      <info-field title="商品信息" class="content-item">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品标题:">
              <el-input v-model="form.reserveMobile" name="商品标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="副标题:">
              <el-input v-model="form.reserveMobile" name="副标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="关联分类:" required>
              <el-select>
                <el-option>12131</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="关联品牌:" required>
              <el-select>
                <el-option>12131</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="关联标签:" required>
              <el-select>
                <el-option>12131</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="商品Logo:" required>
              <el-upload
                class="avatar-uploader"
                action="/api/file/upload"
                :show-file-list="false"
                :on-success="
                  (res, file, filelist) => {
                    return handleAvatarSuccess(
                      res,
                      file,
                      filelist,
                      'certificateImg'
                    );
                  }
                "
              >
                <img v-if="form.a" src="" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="上传视频:" required>
              <el-upload
                class="avatar-uploader"
                action="/api/file/upload"
                :show-file-list="false"
                :on-success="
                  (res, file, filelist) => {
                    return handleAvatarSuccess(
                      res,
                      file,
                      filelist,
                      'certificateImg'
                    );
                  }
                "
              >
                <img v-if="form.a" src="" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
        </el-row>
        <el-row>
            <el-col :span="24">
              <el-form>
                <el-form-item label="商品数据:" required>
                  <el-table
                    :data="listData"
                    :header-cell-style="headerStyle"
                    border
                    style="width: 100%"
                  >
                    <el-table-column label="商品图" align="center">
                      <template slot-scope="goodsScope">
                        <img :src="goodsScope.row.image" style="width: 80px" />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="商品规格"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="商品进价"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      align="center"
                      label="销售价"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      align="center"
                      label="博主分佣比例"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="博主分佣价"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="营销活动比例"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="重量(ML)"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="商品状态"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="操作"
                    >
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        <el-row>

          <el-form-item label="商品详情:" required>
            <wangeditor ref="editor"></wangeditor>
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
import wangeditor from '@/components/wangeditor';
export default {
  data() {
    return {
      form: {},
    };
  },
  components: {
    infoField,
    testCity,
    wangeditor
  },
  methods: {
    submitForm() {
      alert('提交');
    },
    clearForm() {
      alert('清空');
    },
  },
};
</script>
<style lang="stylus" scoped>
  .button-field{
  text-align: center;
}
</style>
