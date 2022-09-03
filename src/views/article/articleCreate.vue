<template>
  <div class="page">
    <el-form label-width="120px" class="course-info page-content">
      <!--客户信息-->
      <info-field title="创建品牌" class="content-item">
        <el-row>
          <el-col :span="8">
            <el-form-item label="文章类型:" required>
              <el-radio-group v-model="radio">
                <el-radio :label="3">文章</el-radio>
                <el-radio :label="6">视频</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="文章标签:" required>
              <el-select>
                <el-optiton>12</el-optiton>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="文章标题:" required>
              <el-input
                v-model="form.receiverName"
                placeholder="别称"
                v-validate="'required'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="封面图:" required>
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
          <el-form-item label="文章详情:" required>
            <wangeditor ref="editor"></wangeditor>
          </el-form-item>
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
      listData: [
        {
          image:
            'https://juran-vue.oss-cn-beijing.aliyuncs.com/file/image/smartSpc/titleImage.png',
          name: '测试商品',
          price: '12',
          nums: '1',
        },
      ],
      listTag: [
        {
          value: '1',
          label: '品牌一',
        },
        {
          value: '2',
          label: '幽默二',
        },
      ],
    };
  },
  components: {
    infoField,
    testCity,
    wangeditor
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
