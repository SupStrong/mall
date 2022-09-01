<template>
  <div>
    <div ref="wangeditorMenu"></div>
    <div ref="wangeditor" class="wangeditor"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.editor = new this.Wangeditor(
      this.$refs.wangeditorMenu,
      this.$refs.wangeditor
    );
    this.editor.customConfig.pasteFilterStyle = false;
    // 忽略粘贴内容中的图片
    this.editor.customConfig.pasteIgnoreImg = true;
    // 使用 base64 保存图片
    // editor.customConfig.uploadImgShowBase64 = true
    // 上传图片到服务器
    let _this = this;
    // this.editor.customConfig.debug = true;
    this.editor.customConfig.uploadFileName = 'file'; // 设置文件上传的参数名称
    this.editor.customConfig.uploadImgServer = '/api/file/upload'; // 设置上传文件的服务器路径
    this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
    // 自定义上传图片事件
    this.editor.customConfig.debug = true;
    this.editor.customConfig.uploadImgHooks = {
      success: function (xhr, editor, result) {
        console.log(result, 'success');
      },
      fail: function (xhr, editor, result) {
        result.errno = 0;
        _this.editor.cmd.do(
          'insertHTML',
          '<img src="'
            + result.data
            + '" style="width:100%;margin: -0.2em 0;max-width:100%;"/>'
        );
      }
    };
    this.editor.customConfig.uploadVideoServer = ''; // 上传接口 /api/file/upload
    this.editor.customConfig.maxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
    this.editor.customConfig.uploadVideoHooks = { // 上传完成处理方法
      customInsert: function (insertVideo, result) {
        console.log(result);
        if (result.errno === 0) {

          // insertVideo(value);
        } else {
          alert('上传失败');
        }
      }
    };

    this.editor.customConfig.zIndex = 10;
    this.editor.create();
  },
  methods: {
    getEditorHtml() {
      return this.editor.txt.html();
    },
    setEditorHtml(data) {
      this.editor.txt.html(data);
    }
  }
};
</script>
<style scoped>
.wangeditor {
  border: 1px solid #ccc;
  height: 400px;
}
</style>
