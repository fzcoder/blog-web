<template>
  <div class="footer-content">
    <p class="info-copyright">{{ copyright }}</p>
    <a href="http://beian.miit.gov.cn/" target="_blank">
      <span class="info-beian">{{ beianInfo }}</span>
    </a>
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
  margin-bottom: 10px;
}
.info-copyright {
  color: grey; font-size: small; margin: 0px; margin-bottom: 5px;
}
.info-beian {
  color: grey; font-size: small;
}
a {
  text-decoration: none;
}
</style>
