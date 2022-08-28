<template>
  <el-upload
    action="/api/file/upload"
    list-type="picture-card"
    :limit="limit"
    :file-list="comImageList"
    v-if="uploadType === 'picture-card'"
    :on-preview="handlePictureCardPreview"
    :on-success="handleCardSuccess"
    :on-exceed="handleLimit"
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-upload
    v-else
    ref='upload'
    class="avatar-uploader brandListIcon"
    action="/api/file/upload"
    :show-file-list="false"
    :on-success="handleSuccess"
    :on-change='handleChange'
    :auto-upload='true'
    >
    <img v-if="currentObj[imgName] && isTableImg" :src="currentObj.image || currentObj[imgName] " class="avatar">
    <img v-else-if="imgObj[imgName] && !isTableImg" :src="imgObj[imgName]" alt="" class="avatar">
    <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
export default {
  props: {
    currentObj: {
      type: Object,
      default () {
        return {

        }
      }
    },

    imgObj: {
      type: Object,
      default () {
        return {

        }
      }
    },

    imgName: {
      type: String,
      default: ''
    },

    isTableImg: {
      type: Boolean,
      default: true
    },

    uploadType: {
      type: String,
      default: ''
    },

    limit: {
      type: Number,
      default: 6
    },

    imageList: {
      type: Array,
      default () {
        return []
      }
    },

    tableIndex: {
      type: Number,
      default: 0
    }

  },
  watch: {
    currentObj (data) {
    }
  },
  computed: {
    comImageList () {
      return this.imageList.map((item, index) => {
        return {
          name: index,
          url: item
        }
      })
    }
  },
  methods: {
    handleChange (file) {
      var _this = this
      var reads = new FileReader()
      reads.readAsDataURL(file.raw)
      reads.onload = function (src) {
        _this.imageUrl = src.target.result
      }
    },
    handleSuccess (a) {
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.$emit('brandSuccess', {
        val: a.data,
        index: this.currentObj.id,
        row: this.tableIndex,
        name: this.imgName,
        currentObj: this.currentObj
      })
    },
    handlePictureCardPreview () {

    },
    handleRemove (file, fileList) {
    },
    handleCardSuccess (res, file, fileList) {
      let imageList = fileList.map(item => {
        item.path = item.response.data
        return item
      })
      this.$emit('getImageList', imageList)
    },
    handleLimit () {
      this.$message.error(`最大上传数量为${this.limit}张`)
    }
  }
}
</script>

<style scoped>
.el-upload--text{
  width: 148px;
  height: 148px;
}
.el-upload--text .avatar{
  width: 100%;
  height: 100%;
}
</style>
