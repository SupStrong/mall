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
                <el-form-item label="最终支付价格：">
                  <span>{{ info.name }}</span>
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
                    <el-form-item label="订单状态：">
                      <span>{{ info.name }}</span>
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
                    <el-form-item label="商品总数：">
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
          <span>收货信息</span>
          <el-button
            size="mini"
            type="primary"
            style="margin-left: 10px"
            @click="handleClick"
            >一键复制</el-button
          >
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
                    <el-form-item label="收货手机号：">
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
              <v-table
                ref="table"
                :data="list.data"
                :columns="list.columns"
                :loading="list.loading"
                :isBackPage="true"
                :totalCount="list.total"
                :defaultPageSize="10"
                :defaultcurrentPage="1"
                v-on:buttonClick="handleButtonClick"
                @handleCurrentChange="
                  handleCurrentChange($event, getTransaction, search, 'pageNo')
                "
                @handleSizeChange="
                  handleSizeChange($event, getTransaction, search, 'pageSize')
                "
              ></v-table>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-dialog title="添加物流" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="物流公司" :label-width="formLabelWidth">
            <el-select v-model="info.region" placeholder="请选择物流公司">
              <el-option label="中通" value="shanghai"></el-option>
              <el-option label="韵达" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单号" :label-width="formLabelWidth">
            <el-input v-model="info.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import vTable from '@tool/vtable';
export default {
  data() {
    return {
      dialogFormVisible: false,
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
      list: {
        data: [
          {
            mobile: '123',
          },
        ],
        columns: [
          {
            label: '商品名称',
            key: 'mobile',
          },
          {
            label: '品牌名',
            key: 'nickName',
          },
          {
            label: '商品规格',
            key: 'mobile',
          },
          {
            label: '单价',
            key: 'nickName',
          },
          {
            label: '数量',
            key: 'nickName',
          },
          {
            label: '总金额',
            key: 'nickName',
          },
          {
            label: '优惠价',
            key: 'nickName',
          },
          {
            label: '最终支付价',
            key: 'nickName',
          },
          {
            label: '推广活动ID',
            key: 'mobile',
          },
          {
            label: '博主ID',
            key: 'mobile',
          },
          {
            label: '博主分佣价',
            key: 'mobile',
          },
          {
            label: '营销优惠价',
            key: 'mobile',
          },
          {
            label: '物流单号',
            key: 'status',
          },
          {
            label: '物流状态',
            key: 'status',
          },
          {
            label: '操作',
            type: 'action',
            multiActions: true,
            selectButton: true,
            buttonInfos: [
              {
                name: 'delete',
                label: '添加物流',
                type: 'text',
              },
            ],
          },
        ],
      },
    };
  },
  components: {
    vTable,
  },
  methods: {
    handleClick() {
      alert('复制');
    },
    headerStyle() {
      return 'text-align: center; background-color: #F7F8FA; fontWeight: normal;';
    },
  },
};
</script>
