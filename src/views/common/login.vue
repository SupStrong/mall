<template>
  <div class="create-wrapper login-wrapper">
    <div class="top-nav">
      <img src="@/assets/images/indexBg.png" alt="" />
    </div>
    <div class="container ctn_container">
      <div class="ctn_left">
        <img src="@/assets/images/login_left.jpg" alt="" />
      </div>
      <div class="ctn_right">
        <div class="login-main-content">
          <div class="logo-box">
            {{ titleMap[activeCom] }}
          </div>
          <login-info></login-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      usePwd: true,
      activeCom: 'LoginByPwd',
      showRegistNextStep: false,
      companyList: [],
      titleMap: {
        LoginByPwd: '欢迎登录',
        LoginByCode: '欢迎登录',
        CreateNewCompany: '创建新企业',
        MultipleCompany: '选择企业',
        ForgetPwd: '忘记密码',
      },

      smsType: null,
      phone: '', // 串联 密码登录 验证码登录 创建 页面的 手机号
    };
  },
  watch: {
    activeCom(val) {
      this.showRegistNextStep = false;
    },
  },
  created() {},
  methods: {},
  components: {
  },
};
</script>

<style scoped lang="less">
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .top-nav {
    width: 100%;
    padding: 23px 2.8% 0;
    position: absolute;
    display: flex;
    img {
      height: 50px;
    }
    span {
      color: #000;
      line-height: 80px;
      font-size: 32px;
    }
  }

  .container {
    // width: 100%;
    width: 50%;
    min-width: 850px;
    // flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    overflow: hidden;
    border-radius: 20px;
    // margin-top: -42px;
    margin: auto;
    .ctn_left {
      width: 60%;
      img {
        width: 100%;
        border-radius: 20px 0 0 20px;
        display: block;
      }
    }
    .ctn_right {
      width: 40%;
      .login-main-content {
        position: relative;
        width: 100%;
        background-color: white;
        border-radius: 6px;
        overflow: hidden;
        .logo-box {
          position: relative;
          font-weight: bold;
          font-size: 20px;
          color: #4c4c4c;
          letter-spacing: 2px;
          padding: 0 40px;
          margin: 15px 0 70px;
          &:before {
            position: absolute;
            top: 180%;
            // left: 24px;
            // transform: translateY(-50%);
            content: "";
            width: 35px;
            height: 4px;
            background-color: #439361;
            border-radius: 2px;
            display: block;
          }
        }
      }
    }
  }
}

.download-popover {
  .popover-box {
    width: 126px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .qrcode {
      width: 126px;
      height: 126px;
    }
    .down-text {
      width: 126px;
      font-size: 12px;
      text-align: center;
      color: #666;
      margin-top: 5px;
    }
  }
}

.create-wrapper {
  .container {
    .left {
      .activity-list {
        width: 700px;
        display: flex;
        flex-wrap: wrap;
        margin-left: 34px;
        margin-top: 26px;
        .activity-list-item {
          width: 350px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin: 15px 0;
          .icon {
            font-size: 26px;
            color: white;
            margin-right: 10px;
            display: flex;
          }
          .box {
            .activity-title {
              font-size: 18px;
              color: white;
              margin-bottom: 5px;
            }
            .text {
              color: white;
              font-size: 14px;
            }
          }
        }
      }
    }
    .right {
      .login-main-content {
        height: 490px;
      }
    }
  }
}
</style>
