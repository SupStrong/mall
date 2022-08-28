<template>
  <div class="cropperContainer">
    <div class="cropperBox">
      <img :src="defaultImg" alt="" class="defaultImg" v-if="defaultImg">
      <vue-cropper ref="cropper"
        :img="cropperOptions.img"
        :output-size="cropperOptions.size"
        :output-type="cropperOptions.outputType"
        :info="true"
        :full="cropperOptions.full"
        :fixed="fixed"
        :fixed-number="fixedNumber"
        :can-move="cropperOptions.canMove"
        :can-move-box="cropperOptions.canMoveBox"
        :fixed-box="cropperOptions.fixedBox"
        :original="cropperOptions.original"
        :auto-crop="cropperOptions.autoCrop"
        :auto-crop-width="cropperOptions.autoCropWidth" :auto-crop-height="cropperOptions.autoCropHeight" :center-box="cropperOptions.centerBox"
        :high="cropperOptions.high"
        @real-time="realTime"
        @img-load="imgLoad"
        v-else
        mode="cover">
      </vue-cropper>
    </div>
    <div class="operateBox">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="宽比例：">
              <el-input-number v-model="aspectRatio.width"  :min="1" :max="wideRatio"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高比例：">
              <el-input-number v-model="aspectRatio.height"  :min="1" :max="highRatio"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图片左转：">
              <el-button @click="rotateLeft" size="small" type="primary">左转90</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片右转：">
              <el-button @click="rotateRight" size="small" type="primary">右转90</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择图片：">
              <el-button size="small" type="primary">选择图片</el-button>
              <input type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event)">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生成图片：">
              <el-button @click="down('blob')" size="small" type="primary">确定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  data () {
    return {
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      show: true,
      fixed: true,
      downImg: '',
      aspectRatio: {
        width: 2,
        height: 1
      },
      defaultImg: '',
      cropperOptions: {
        img: '',
        size: 1,
        full: true,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 270,
        autoCropHeight: 135,
        centerBox: false,
        high: true
      }
    }
  },
  props: {
    wideRatio: {
      type: Number,
      default: 10
    },
    highRatio: {
      type: Number,
      default: 10
    }
  },
  computed: {
    fixedNumber () {
      return [this.aspectRatio.width, this.aspectRatio.height]
    }
  },
  methods: {

    // changeImg() {
    //   this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
    // },
    startCrop () {
      // start
      this.crap = true
      this.$refs.cropper.startCrop()
    },
    stopCrop () {
      //  stop
      this.crap = false
      this.$refs.cropper.stopCrop()
    },
    clearCrop () {
      // clear
      this.$refs.cropper.clearCrop()
    },
    refreshCrop () {
      // clear
      this.$refs.cropper.refresh()
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    finish (type) {
      this.$refs.cropper.getCropBlob((data) => {
        let _this = this
        let reader = new FileReader()
        reader.onload = function (e) {
          var params = new FormData()
          params.append('file', data)
          params.append('fileName', 'test')
          _this.$axios({
            url: '/api/file/upload',
            method: 'post',
            data: params
          }).then(result => {
          })
        }
        reader.readAsBinaryString(data)
      })
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    setDefault (data) {
      this.defaultImg = data
    },

    finish2 (type) {
      this.$refs.cropper2.getCropData((data) => {
        this.model = true
        this.modelSrc = data
      })
    },
    finish3 (type) {
      this.$refs.cropper3.getCropData((data) => {
        this.model = true
        this.modelSrc = data
      })
    },
    down (type) {
      // event.preventDefault()

      // 输出
      this.$refs.cropper.getCropData((data) => {
        this.downImg = data
        let params = new FormData()
        data = window.atob(data.split(',')[1])
        let ia = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i)
        }
        let blob = new Blob([ia], {
          type: 'image/png'
        })
        let date = new Date().getTime()
        params.append('file', blob, date + '.png')
        this.$axios({
          url: '/api/file/upload',
          method: 'post',
          data: params
        }).then(result => {
          if (result.data.statusCode === 200) {
            this.$message.success('图片上传成功！')
            this.$emit('cropperImg', result.data.data)
          }
        })
      })
    },

    uploadImg (e, num) {
      // 上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.defaultImg = ''
        this.cropperOptions.img = data
      }
      reader.readAsDataURL(file)
    },
    imgLoad (msg) {
    }
  },
  components: {
    VueCropper
  }
}
</script>
<style lang="stylus" scoped>
.cropperContainer
  height 135px
  padding 30px
  width 800px
  .cropperBox
    width 270px
    height 100%
    float left
    .defaultImg
      width 100%
      height 100%
  .operateBox
    float left
    height 100%
    width 450px
    margin-left 20px
    .el-button
      margin: 0

#uploads
  position absolute
  left 0
  top 10px
  z-index 10000
  display block
  width 100px
  height 50px
  opacity 0
</style>
