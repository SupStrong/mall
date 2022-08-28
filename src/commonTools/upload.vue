<template>
<!-- 修改： 上传图片类：autoUpload（默认立即上传true,如需要不立即上传改为false即可），如果autoUpload=false,需要clickCpload控制上传（默认false，改为true即可）,如果获取不到返回值就加延时器 左 -->
  <div class='upload'>
      <span class='u_name' v-if='name !== ""' >{{name}}: </span>
      <el-upload
        ref='upload'
        class="avatar-uploader"
        action="/api/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error='handleAvatarError'
        :on-change='fileChange'
        :before-upload="beforeAvatarUpload"
        :auto-upload='autoUpload'
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i  class="el-icon-plus avatar-uploader-icon" v-if="!showText"></i>
        <div v-else class="showText">{{showText}}</div>
      </el-upload>
    </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      isShow: true
    }
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'image'
    },
    title: {
      type: String,
      default: '图片'
    },
    uTitle: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    showText: {
      type: String,
      default: ''
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    clickCpload: {
      type: Boolean,
      default: false
    }
  },
  activated () {
    setTimeout(() => {
      this.imageUrl = this.img
    }, 1000)
  },

  watch: {
    img (val) {
      this.imageUrl = val
    },
    clickCpload (val) {
      if (val === true) {
        this.$refs.upload.submit()
      }
    }
  },
  mounted () {

  },
  methods: {
    // 回显图片
    _setImg () {
      this.imageUrl = this.img
    },
    // 清空图片
    _clearImg () {
      this.imageUrl = null
    },
    handleAvatarError () {
      this.$message({
        type: 'error',
        message: '上传失败，稍等一下再试试哦'
      })
      this.$refs.upload.clearFiles()
      this.isShow = false
      this.$emit('clearImg', this.uTitle)
      this.imageUrl = ''
    },
    fileChange (file) {
      if (!this.isShow) {
        this.isShow = true
        return
      }
      if (file.raw.type.indexOf(this.type) !== -1) {
        let _this = this
        let reads = new FileReader()
        reads.readAsDataURL(file.raw)
        reads.onload = function (src) {
          _this.imageUrl = src.target.result
        }
      }
    },
    handleAvatarSuccess (a) {
      if (this.autoUpload === true) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      }
      this.$emit('Uploadsuccess', {
        key: this.uTitle,
        val: a.data,
        index: this.index
      })
    },
    beforeAvatarUpload (file) {
      if (file.type.indexOf(this.type) === -1) {
        this.$message({
          type: 'error',
          message: '只能上传' + this.title
        })
      }
      return true
    },
    upload (val) {
      // console.log(val)
    }
  }
}
</script>

<style lang='stylus'>
.upload
  text-align center
  .u_name
    font-size rem(16)
    float left
    width rem(130)
    text-align right
    margin-right rem(5)
    line-height rem(90)
  .avatar-uploader
    display inline-block
    vertical-align rem(-10)
    width rem(88)
    height rem(88)
    .el-upload
      position relative
      width rem(88)
      height rem(88)
      line-height rem(108)
      i
        font-size rem(44)
        color rgba(0,0,0, 0.3)
    .showText{
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
    }
  .avatar
    position absolute
    top 0
    left 0
    width 100%
    height 100%
  .u_div
    width rem(150)
    float right
    .el-button
      float right
      margin-top rem(60)
      width rem(100)
      height rem(32)
      line-height rem(0)
      text-align center
      padding 0
      background-color #207DF1
      color white
</style>
