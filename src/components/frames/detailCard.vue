<template>
  <el-col :sm="23" :lg="fullPage ? 23 : 12" class="detail-card img-card">
    <el-row
      v-if="hasImg"
      type="flex"
      justify="space-between"
    >
      <el-col class="img" :span="6">
        <img v-if="imgSrc && !imgErr" @error="imgErr = true" :src="imgSrc">
        <span v-else class="img-placeholder"></span>
      </el-col>
      <el-col class="list" :span="17">
        <el-row
          v-for="(item, index) in data"
          :key="index"
          type="flex"
          justify="space-between"
          class="detail-card-row"
        >
          <el-col :span="7">
            <span>{{ item.label }}</span>
          </el-col>
          <el-col :span="16">
            <span>{{ item.value }}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="inner-list" v-else>
      <el-row
        v-for="(item, index) in data"
        :key="index"
        type="flex"
        justify="space-between"
        class="detail-card-row"
      >
        <el-col :span="8">
          <span>{{ item.label }}</span>
        </el-col>
        <el-col :span="15" v-if="item.type === 'tag'">
          <el-tag
            v-for="(tag, i) in item.value"
            :key="i"
            style="margin-right: 5px; margin-bottom: 5px;"
          >
            {{tag}}
          </el-tag>
        </el-col>
        <el-col :span="15" v-else>
          <span>{{ item.value }}</span>
        </el-col>
      </el-row>
    </div>
    <slot></slot>
  </el-col>
</template>

<script>
export default {
  data: () => ({
    imgErr: false
  }),

  props: {
    hasImg: { // 若有图片展示则为true，一个card有一张
      type: Boolean,
      required: false,
      default: false
    },
    imgSrc: { // hasImg为true时传src进来
      type: String,
      required: false,
      default: ''
    },
    data: { // 数据为Array，单元为key, label, value
      type: Array,
      required: false,
      default: () => []
    },
    fullPage: { // 是否需要宽度是100%
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
