<template>
  <nav class="header el-tag--medium el-tag--dark">
    <div class="collapse-btn" @click="handleSidebar">
      <i class="el-icon-s-fold"></i>
    </div>
    <!-- <div class="logo">JMS-供应商</div> -->
    <div class="logo">
      <div>
        <img src="../../assets/images/indexBg.png" alt="" width="35px" />
      </div>
      <div>薯YoYo</div>
    </div>
    <div class="header-right">
      <!-- 主题颜色 -->
      <div class="bgColor">
        <updateSkin />
      </div>
      <!-- <img :src="user.avatarUrl || defaultImg" alt /> -->
      <!-- 消息提醒 -->
      <!-- 个人信息 -->
      <el-dropdown size="medium" trigger="click" @command="handleCommand">
        <div class="el-dropdown-link">
          <div class="avatar_img_box">
            <img
              v-if="user && user.avatarUrl"
              :src="user.avatarUrl"
              alt=""
              width="100%"
            />
            <span class="spandome" v-else-if="user && user.nickName">{{
              user.nickName.substring(user.nickName.length - 2)
            }}</span>
            <img v-else :src="defaultImg" alt="" width="100%" />
          </div>
          <div class="avatar_img_icon">
            <i class="el-icon-caret-bottom icon_item"></i>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit"
            ><i class="icondome el-icon-s-unfold"></i>
            退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import updateSkin from '@tool/updateSkin';
import { USER_SIGNOUT } from '@/store/user';
import { messageApi } from '@/api';
import models from '@/libs/models';
import cryptoPhp from '@/libs/cryptoPhp';
export default {
  data: () => ({
    isCollapse: false,
    isDot: false, // 点
    // showLink: false,
    defaultImg: require('../../assets/images/indexBg.png')
  }),
  mounted() {
  },
  methods: {
    ...mapActions([USER_SIGNOUT]),
    handleCommand(command) {
      switch (command) {
        case 'exit':
          this.$message.success('退出登录');
          this.logout();
          break;
        case 'user':
          window.location.href = `${process.env.VUE_APP_AUTH_URL}/signUp?jrwyToken=${this.user.jrwyToken}&userType=5`;
          break;
        case 'toservice':
          window.location.href = `${process.env.VUE_APP_MERCHANT_URL}/signUp?jrwyToken=${this.user.jrwyToken}`;
          break;
        case 'home':
          // window.location.href = `${
          //   process.env.VUE_APP_HOME_URL
          // }/signUp?jrwyToken=${crypto.jiami(this.user.jrwyToken)}`;

          let jrwyToken = cryptoPhp.Encrypt(this.user.jrwyToken);
          let backUrl = `${
            process.env.VUE_APP_HOME_URL
          }/optIdentity?jrwyToken=${encodeURIComponent(jrwyToken)}`;
          window.location.href = encodeURI(backUrl);
          break;
        default:
          '你是咋跳到这儿来的。。';
      }
    },

    handleSidebar() {
      this.isCollapse = !this.isCollapse;
      this.$emit('sidebar', this.isCollapse);
    },

    checkMessage() {
      this.$router.push({
        path: '/system/message',
      });
    },

    async logout() {
      window.location.href = 'https://supply.bearhome.cn/login';
    },
  },
  computed: {
    ...mapGetters(['user']),
    showLink() {
      let flag = false;
      for (let i in this.user.identityList) {
        if (
          this.user.identityList[i].userType === 4
          && this.user.identityList[i].auditStatus === 1
        ) {
          flag = true;
          break;
        }
      }
      return flag;
    },
  },
  components: {
    updateSkin,
  },
};
</script>

<style lang="less" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  z-index: 999;
  .collapse-btn {
    float: left;
    padding: 2px 20px 0;
    cursor: pointer;
    height: 60px;
    box-sizing: border-box;
    // &:hover {
    //   background-color: #283446;
    // }
    i {
      font-size: 22px;
    }
  }
  .logo {
    float: left;
    font-size: 20px;
  }
  .header-right {
    height: 100%;
    float: right;
    display: flex;
    align-items: center;
    div {
      float: left;
    }
    img {
      height: 40px;
      width: 40px;
      border-radius: 25px;
      margin-right: 10px;
    }
    padding-right: 30px;
    .item {
      // margin-right: 25px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      i {
        font-size: 20px;
      }
    }
    .el-dropdown {
      color: #fff;
      .el-dropdown-link {
        cursor: pointer;
        padding-top: 10px;
        overflow: hidden;
      }
    }
  }
}
.icondome {
  font-size: 16px;
}
.el-dropdown-link > div {
  float: left;
}
.avatar_img_box {
  height: 35px;
  width: 35px;
  border-radius: 25px;
  margin-right: 10px;
  background-color: #386893;
  overflow: hidden;
  margin-left: 20px;
  img {
    vertical-align: baseline;
  }
}
.avatar_img_icon {
  line-height: 35px;
}
.spandome {
  margin-left: 0;
  line-height: 35px;
  color: #636365;
  font-weight: bold;
  display: block;
  text-align: center;
  letter-spacing: 2px;
}
.bgColor {
  margin-top: 15px;
  margin-right: 15px;
}

.header .logo {
  height: 60px;
  float: left;
  /* width: 250px; */
  line-height: 60px;
}
.logo > div img {
  vertical-align: middle;
}
.logo > div {
  float: left;
  margin-right: 3px;
}
</style>
