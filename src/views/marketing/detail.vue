<template>
  <div class="page">
    <div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>订单信息</span>
        </div>
        <div>
          <el-form label-width="160px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="订单号：">
                  <span>{{ info.name }}</span>
                </el-form-item>
                <el-form-item label="商品总价">
                  <span>{{ info.provinceId | city }}</span>
                  <span>{{ info.cityId | city }}</span>
                  <span>{{ info.areaId | city }}</span>
                </el-form-item>
                <el-form-item label="物流编号">
                  <span>{{ info.provinceId | city }}</span>
                  <span>{{ info.cityId | city }}</span>
                  <span>{{ info.areaId | city }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col>
                    <el-form-item label="购买人：">
                      <span>{{ info.name }}</span>
                    </el-form-item>
                    <el-form-item label="优惠价：">
                      <span>{{ info.name }}</span>
                    </el-form-item>
                    <el-form-item label="物流状态">
                  <span>{{ info.provinceId | city }}</span>
                  <span>{{ info.cityId | city }}</span>
                  <span>{{ info.areaId | city }}</span>
                </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col>
                    <el-form-item label="联系电话：">
                      <span>{{ info.mainPerson }}</span>
                    </el-form-item>
                    <el-form-item label="购买商品总数：">
                      <span>{{ info.mobile }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card style="margin-top: 15px">
        <div slot="header" class="clearfix">
          <span>收获信息</span>
          <el-button size="mini" type="primary" style="margin-left:10px">一键复制</el-button>
        </div>
        <div>
          <el-form label-width="160px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="收货人：">
                  <span>{{ info.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col>
                    <el-form-item label="收获手机号：">
                      <span>{{ info.name }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col>
                    <el-form-item label="详细地址：">
                      <span>{{ info.mainPerson }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card style="margin-top: 15px">
        <div slot="header" class="clearfix">
          <span>商品信息</span>
        </div>
        <div>
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
                      prop="name"
                      align="center"
                      label="商品名称"
                    >
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
                      label="商品金额"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      align="center"
                      label="商品数量"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      align="center"
                      label="活动类型"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="优惠金额"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="最终支付价"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="nums"
                      align="center"
                      label="商品状态"
                    >
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card style="margin-top: 15px">
        <div slot="header" class="clearfix">
          <span>博主信息</span>
        </div>
        <div>
          <el-form label-width="160px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="博主名：">
                  <span>{{ info.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col>
                    <el-form-item label="联系方式：">
                      <span>{{ info.name }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col>
                    <el-form-item label="活动ID：">
                      <span>{{ info.mainPerson }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="佣金：">
                  <span>{{ info.name }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        name: '他们的',
        provinceId: '他们的',
        cityId: '他们的',
        areaId: '他们的',
        mainPerson: '他们的',
        mobile: '他们的',
      },
      listData: [
        {
          image:
            'https://juran-vue.oss-cn-beijing.aliyuncs.com/file/image/smartSpc/titleImage.png',
          name: '测试商品',
          price: '12',
          nums: '1',
        },
      ],
    };
  },
  methods: {
    headerStyle() {
      return 'text-align: center; background-color: #F7F8FA; fontWeight: normal;';
    },
  },
};
</script>
