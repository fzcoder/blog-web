<template>
  <div class="footer-content">
    <p>{{ copyright }}</p>
    <el-link :underline="false" href="http://beian.miit.gov.cn/" target="_blank">
      <p>{{ beianInfo }}</p>
    </el-link>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    copyright: {
      type: String,
      default: ''
    },
    beianInfo: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.footer-content {
  margin-top: 10px;
  p {
    color: grey; font-size: small; margin: 0px; margin-bottom: 5px;
  }
}
</style>
