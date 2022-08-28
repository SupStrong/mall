<template>
  <div class="login">
    <div class="main">
      <div class="middle" ref="middle">
        <div class="form-box">
          <div class="login-form" @keyup.enter="login">
            <p class="form-title">JMS-供应商</p>
            <el-form>
              <el-form-item :error="errorBags.collect('用户名')[0]">
                <input
                  type="username"
                  name="用户名"
                  v-model="form.mobile"
                  placeholder="用户名"
                  v-validate="'required'"
                  maxlength="11"
                />
              </el-form-item>
              <el-form-item :error="errorBags.collect('密码')[0]">
                <input
                  type="password"
                  name="密码"
                  v-model="form.password"
                  placeholder="密码"
                  v-validate="'required'"
                />
              </el-form-item>
              <el-form-item :error="errorBags.collect('图形验证码')[0]">
                <div class="captchaBox">
                  <input
                    name="图形验证码"
                    v-model="form.captchaText"
                    placeholder="图形验证码"
                    v-validate="'required'"
                    class="graphicVal"
                  />
                  <img
                    :src="serialImg"
                    alt=""
                    class="graphicVer"
                    @click="graphicCode"
                  />
                </div>
              </el-form-item>
              <a
                href="https://id.bearhome.cn/form/retrievePassword"
                target="_blank"
                >忘记密码</a
              >
            </el-form>

            <button @click="checkFrom">登录</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p class="">
        <a href="">关于我们</a>
        <span>|</span>
        <a href="">联系我们</a>
        <span>|</span>
        <a href="">公司新闻</a>
        <span>|</span>
        <a href="">用户服务</a>
        <span>|</span>
        <a href="">订单服务</a>
        <span>|</span>
        <a href="">熊洞智家APP</a>
      </p>
      <p class="copyright">©2009-2018 无忧服务·智能家居服务平台 版权所有</p>
    </div>
  </div>
</template>
<script>
import { authApi } from "@/api";
import { mapActions } from "vuex";
import { USER_SIGNIN, USER_SIGNOUT, SET_PHP_TOKEN } from "@/store/user";
import getPhPToken from "@/api/common/phpToken";

export default {
  data: () => ({
    form: {
      mobile: "",
      password: "",
      userType: 5,
      loginType: 3,
      serialNumber: "",
      captchaSerialNum: "",
      captchaText: "",
    },
    serialImg: "",
  }),

  methods: {
    ...mapActions([USER_SIGNIN, USER_SIGNOUT, SET_PHP_TOKEN]),

    checkFrom() {
      this.$validator.validate().then((status) => {
        if (status) {
          this.login();
        } else {
          this.$message.error("请确保信息填写完整");
        }
      });
    },

    async login() {
      let loading = this.$loading();
      try {
        let data = (await authApi.login(this.form)).data;
        if (data.statusCode === 200) {
          this.USER_SIGNIN(data.data);
          getPhPToken().then((data) => {
            this.SET_PHP_TOKEN(data.data.data);
          });
          this.$message.success("登录成功");
          this.$router.push({
            path: "/",
          });
        } else {
          this.$error(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        loading.close();
      }
    },

    // 图形码序列号
    async getCaptcha() {
      try {
        let params = {};
        let data = (await authApi.serialNumber(params)).data;
        if (data.statusCode === 200) {
          this.form.captchaSerialNum = data.data;
          this.graphicCode();
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    },

    // 图形码
    async graphicCode() {
      try {
        let params = {
          captchaSerialNum: this.form.captchaSerialNum,
        };
        let data = (await authApi.graphicCode(params)).data;
        let blob = new Blob([data], {
          type: "image/*",
        });
        this.serialImg = URL.createObjectURL(blob);
      } catch (err) {
        console.error(err);
      } finally {
      }
    },
  },

  mounted() {
    this.USER_SIGNOUT();
    this.getCaptcha();
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .main {
    height: 100%;
    background: #e3e1e8;
    position: relative;
    .middle {
      width: 100%;
      height: 32rem;
      position: absolute;
      top: 50%;
      margin-top: -18rem;
      background: url("../../assets/images/indexBg.png") no-repeat right white;
      background-size: auto 100%;
      overflow: hidden;
      .form-box {
        width: 19rem;
        height: 12rem;
        margin-top: 10rem;
        margin-left: 11rem;
        float: left;
        .login-form {
          width: 13rem;
          margin: 0 auto;
          .form-title {
            font-size: 1.2rem;
            font-weight: 500;
            margin-bottom: 2.5rem;
            text-align: center;
          }
          .captchaBox {
            height: 1.5rem;
            display: block;
            margin: 0 auto;
            width: 12rem;
            input {
              width: 60%;
              float: left;
            }
            img {
              width: 30%;
              float: right;
              height: 1.5rem;
            }
          }
          input {
            width: 12rem;
            height: 1.5rem;
            border: 1px solid rgba(230, 230, 230, 1) !important;
            border-radius: 1rem;
            background: white;
            display: block;
            margin: 0 auto;
            text-indent: 1rem;
          }
          button {
            width: 12rem;
            height: 1.5rem;
            background: rgba(61, 124, 255, 1);
            border-radius: 1rem;
            border: none;
            box-shadow: 0 0 0.3rem rgba(61, 124, 255, 1);
            color: white;
            margin: 0 auto;
            display: block;
            margin-top: 1.7rem;
          }
        }
      }
    }
  }
  .bottom {
    height: 6rem;
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 100%;
    padding-top: 1rem;
    p {
      text-align: center;
      font-size: 0.65rem;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      height: 1.5rem;
      line-height: 1.5rem;
      a {
        color: rgba(102, 102, 102, 1);
        font-style: normal;
      }
      span {
        padding: 0 0.5rem;
      }
    }
  }
}
</style>
