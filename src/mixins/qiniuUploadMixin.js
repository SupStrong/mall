import { authApi } from '@/api'

export default {
  data: () => ({
    qiniuDomain: '',
    fileFolder: '',
    qiniuUrl: 'https://upload.qiniup.com',
    uploadData: {
      key: '',
      token: ''
    },
    imageUrl: '',
    imageUrlLists: [],
    // 为七牛创建的文件夹标识
    imageFolders: {
      '0': 'course_module', // 产品-课程单元
      '1': 'good_package', // 产品-产品包
      '2': 'schedule_detail', // 课次管理-课次详情
      '3': 'product_list', // 产品-产品管理
      '4': 'teacher_head' // 教务中心-老师管理
    },
    // 当前标识，在created或mounted里面设置
    thisImageFolder: '',
    qiniuReturnKey: '',
    quniuReturnHash: '',
    // 当多文件时会有limit num，在created或mounted里面设置
    fileLimit: 0,
    // word文件的accept列表
    wordAccept: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    imgAccept: 'image/jpeg,image/jpg,application/x-jpg,application/x-png,image/png,image/gif,application/x-gif,'
  }),

  methods: {
    // 在minxin页面的加载开始时请求这个接口
    async getQiniuDomain(app_id) {
      // app_id为项目id，1是熊猫(陪练) 2是松鼠(主课)
      try {
        let data = (await authApi.getQiniuDomain({
          app_id
        })).data
        if (data.code === 0) {
          this.uploadData.token = data.data.uptoken
          this.qiniuDomain = data.data.domain
          this.fileFolder = data.data.file_folder
        } else {
          this.$error(data)
        }
      } catch (err) {
        console.error(err)
      }
    },

    // 上传前handler
    beforeUpload(file) {
      const stamp = +new Date()
      let [fileName, fileType] = file.name.split('.')
      this.uploadData.key = `${this.fileFolder}/${this.imageFolders[this.thisImageFolder]}/${fileName}_${stamp}.${fileType}`
    },

    // 上传img前handler
    beforeImgUpload(file) {
      const stamp = +new Date()
      let [fileName, fileType] = file.name.split('.')
      let isImg = new Set(['jpg', 'jpeg', 'png', 'JPEG', 'JPG', 'PNG', 'gif', 'GIF']).has(fileType)
      let isLt1M = file.size / 1024 / 1024 < 1;
      if (!isImg) this.$message.error('只能上传.jpg/.jpeg/.png/.gif文件')
      if (!isLt1M) this.$message.error('文件大小不能超过1M')
      this.uploadData.key = `${this.fileFolder}/${this.imageFolders[this.thisImageFolder]}/${fileName}_${stamp}.${fileType}`
      return isImg && isLt1M
    },

    // 上传word的handler
    beforeWordUpload(file) {
      const stamp = +new Date()
      let [fileName, fileType] = file.name.split('.')
      let isDoc = new Set(['doc', 'docx', 'DOC', 'DOCX']).has(fileType)
      if (!isDoc) this.$message.error('购买协议只能上传.doc/.docx文件')
      else this.uploadData.key = `${this.fileFolder}/${this.imageFolders[this.thisImageFolder]}/${fileName}_${stamp}.${fileType}`
      return isDoc
    },

    // 上传图片成功handler
    handleUploadSuccess(res, file) {
      this.qiniuReturnKey = res.key.substring(res.key.indexOf('/') + 1)
      this.qiniuReturnHash = res.hash
      if (file.raw) {
        this.imageUrl = URL.createObjectURL(file.raw)
      } else {
        this.$message({
          message: '浏览器限制，无法预览图片',
          type: 'error'
        })
      }
    },

    handleUploadError() {
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择${this.fileLimit}个文件，请去掉现有文件再上传`)
    }
  }
}
