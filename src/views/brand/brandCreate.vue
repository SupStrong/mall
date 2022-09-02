<template>
  <div class="page">
    <el-form label-width="120px" class="course-info page-content">
      <!--客户信息-->
      <info-field title="创建品牌" class="content-item">
        <el-row>
          <el-col :span="8">
            <el-form-item label="品牌名:" required>
              <el-input
                v-model="form.receiverName"
                placeholder="品牌名"
                v-validate="'required'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="别称:" required>
              <el-input
                v-model="form.receiverName"
                placeholder="别称"
                v-validate="'required'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="英文名:" required>
              <el-input
                v-model="form.receiverName"
                placeholder="英文名"
                v-validate="'required'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="标签:" required>
              <el-select
                v-model="form.abc"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in listTag"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="国籍:" required>
              <el-input
                v-model="form.receiverName"
                placeholder="国籍"
                v-validate="'required'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="生产厂家/产地:" required>
              <el-input
                v-model="form.receiverName"
                placeholder="生产厂家"
                v-validate="'required'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="创立时间:" required>
              <el-date-picker
                v-model="form.a"
                type="year"
                placeholder="选择品牌创立时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="品牌Logo:" required>
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
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="品牌视频:" required>
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
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="详细简介:">
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
      form: {},
      listData: [
        {
          image: 'https://juran-vue.oss-cn-beijing.aliyuncs.com/file/image/smartSpc/titleImage.png',
          name: '测试商品',
          price: '12',
          nums: '1'
        }
      ],
      listTag: [
        {
          value: '1',
          label: '品牌一'
        }, {
          value: '2',
          label: '幽默二'
        }
      ]
    };
  },
  components: {
    infoField,
    testCity,
  },
  computed: {
    getId() {
      let id = this.$route.query && this.$route.query.id;
      return id;
    },
  },
  mounted() {
    if (this.getId) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {},
    headerStyle() {
      return 'text-align: center; background-color: #F7F8FA; fontWeight: normal;';
    },
    submitForm() {
      try {
        let data = null;
        if (this.getId) {
          // data = (await cmsAdminApi.article.addArticle(this.form)).data
        } else {
          this.form.id = this.getId;
          // data = (await cmsAdminApi.article.updateArticle(this.form)).data
        }
        if (data.code === 200) {
          this.$message.info('操作成功');
          this.$router.push({
            path: '/brand/brandList',
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    clearForm() {
      alert('清空');
    },
    handleAvatarSuccess(res, file, red, imgkey) {
      var reads = new FileReader();
      reads.readAsDataURL(file.raw);
      this.$message.success('上传成功');
    },
  },
};
</script>
<style lang="stylus" scoped>
  .button-field{
  text-align: center;
}
</style>
