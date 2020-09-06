<template>
  <div>
    <h4 style="margin: 0px;">关于</h4>
    <div style="margin-top: 15px;">
      <div style="text-align: center;">
        <el-avatar :size="50" :src="user.avatar"></el-avatar>
        <h3 style="margin: 0px; font-family: '微软雅黑';">{{ user.nickname }}</h3>
        <p style="font-size: small; color: grey;">{{ user.motto }}</p>
      </div>
    </div>
    <h4 style="margin: 0px 0px 10px 0px;">仓库</h4>
    <div class="user-repo">
      <a class="repo-link" :href="user.github" target="_blank">
        <div class="repo-link-item">
          <el-avatar
            :size="30"
            src="https://www.github.com/favicon.ico"
            style="background-color: #FFFFFF; margin-right: 8px;"
          ></el-avatar>
          <span style="font-weight: bold;">Github</span>
        </div>
      </a>
      <a class="repo-link" :href="user.gitee" target="_blank">
        <div class="repo-link-item">
          <el-avatar
            :size="30"
            src="https://www.gitee.com/favicon.ico"
            style="background-color: #FFFFFF; margin-right: 8px;"
          ></el-avatar>
          <span style="font-weight: bold;">码云</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      // 用户信息
      user: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const { data: result } = await this.$http.get('/user/1')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.user = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.repo-link {
  text-decoration: none;
  color: #000;
}
.repo-link-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 16px;
  // box-shadow: 0px 0px 8px #dcdfe6;
  margin: 0px 0 10px 0;
  background-color: #F2F6FC;
}
</style>
