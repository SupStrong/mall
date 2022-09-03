<template>
  <div>
    <infoField
      title="用户数据"
      icon="el-icon-s-data"
      style="margin-top: 15px"
      noTime
    >
      <div>
        <el-row>
          <div class="data_box">
            <div class="data_box_item">
              <div class="data_box_icon">
                <i class=""></i>
              </div>
              <div class="data_box_content">
                <p class="data_box_title">
                  入驻博主数
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="今天0点至更新时间下单数"
                    placement="top"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </p>
                <p class="data_box_num">{{ dayreal.a }}</p>
                <p class="data_box_numLast">昨天：{{ dayreal.b }}</p>
              </div>
            </div>
            <div class="data_box_item">
              <div class="data_box_icon">
                <i class=""></i>
              </div>
              <div class="data_box_content">
                <p class="data_box_title">
                  总用户数
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="今天0点至更新时间完成数"
                    placement="top"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </p>
                <p class="data_box_num">{{ dayreal.a }}</p>
                <p class="data_box_numLast">昨天：{{ dayreal.b }}</p>
              </div>
            </div>
          </div>
        </el-row>
      </div>
    </infoField>
    <infoField
      title="订单数据"
      icon="el-icon-s-data"
      noTime
      style="margin-top: 15px"
    >
      <div>
        <el-row>
          <div class="data_box">
            <div class="data_box_item">
              <div class="data_box_icon">
                <i class=""></i>
              </div>
              <div class="data_box_content">
                <p class="data_box_title">
                  今日订单数
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="今天0点至更新时间下单数"
                    placement="top"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </p>
                <p class="data_box_num">{{ dayreal.a }}</p>
                <p class="data_box_numLast">昨天：{{ dayreal.b }}</p>
              </div>
            </div>
            <div class="data_box_item">
              <div class="data_box_icon">
                <i class=""></i>
              </div>
              <div class="data_box_content">
                <p class="data_box_title">
                  订单完成数
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="今天0点至更新时间完成数"
                    placement="top"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </p>
                <p class="data_box_num">{{ dayreal.a }}</p>
                <p class="data_box_numLast">昨天：{{ dayreal.b }}</p>
              </div>
            </div>
            <div class="data_box_item">
              <div class="data_box_icon">
                <i class=""></i>
              </div>
              <div class="data_box_content">
                <p class="data_box_title">
                  总订单数
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="今天0点至更新时间完成数"
                    placement="top"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </p>
                <p class="data_box_num">{{ dayreal.a }}</p>
                <p class="data_box_numLast">昨天：{{ dayreal.b }}</p>
              </div>
            </div>
          </div>
        </el-row>
      </div>
    </infoField>
    <infoField title="商品数据"
      style="margin-top: 15px" icon="el-icon-s-data" noTime>
      <div>
        <el-row>
          <div class="data_box">
            <div class="data_box_item">
              <div class="data_box_icon">
                <i class=""></i>
              </div>
              <div class="data_box_content">
                <p class="data_box_title">
                  单品数
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="今天0点至更新时间下单数"
                    placement="top"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </p>
                <p class="data_box_num">{{ dayreal.a }}</p>
                <p class="data_box_numLast">昨天：{{ dayreal.b }}</p>
              </div>
            </div>
            <div class="data_box_item">
              <div class="data_box_icon">
                <i class=""></i>
              </div>
              <div class="data_box_content">
                <p class="data_box_title">
                  品牌数
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="今天0点至更新时间完成数"
                    placement="top"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </p>
                <p class="data_box_num">{{ dayreal.a }}</p>
                <p class="data_box_numLast">昨天：{{ dayreal.b }}</p>
              </div>
            </div>
            <div class="data_box_item">
              <div class="data_box_icon">
                <i class=""></i>
              </div>
              <div class="data_box_content">
                <p class="data_box_title">
                  分类数
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="今天0点至更新时间注册数"
                    placement="top"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </p>
                <p class="data_box_num">{{ dayreal.a }}</p>
                <p class="data_box_numLast">昨天：{{ dayreal.b }}</p>
              </div>
            </div>
          </div>
        </el-row>
      </div>
    </infoField>
  </div>
</template>
<script>
import infoField from '@/components/schedule/infoField';
export default {
  data() {
    return {
      dayreal: {
        a: 1,
        b: 2,
      },
    };
  },
  components: {
    infoField,
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
.data_box
  display flex
  margin-bottom 10px
  .data_box_item
    width 25%
    text-align center
    i
      color #409eff
    .data_box_num
      font-size 40px
      font-weight bolder
      color #606266
      margin 0
    .data_box_numLast
      font-size 16px
      margin 0
.charts_box
  position relative
  .charts_time
    position absolute
    right 20%
    top 0
</style>
