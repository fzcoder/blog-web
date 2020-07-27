<template>
  <el-container>
    <el-main>
      <div class="container">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :xs="24" :sm="18" :md="15" :lg="10" :xl="10">
            <div>
              <h3 style="color: #909399;">(´⊙ω⊙`)! 页面走丢了...</h3>
              <img src="../assets/image/404.png" />
            </div>
            <div style="margin-top: 20px;">
              <el-button type="primary" size="small" round @click="gotoHomePage()">返回首页</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    gotoHomePage () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  text-align: center;
}
img {
  object-fit: fill;
}
</style>
