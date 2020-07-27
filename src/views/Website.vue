<template>
  <el-container>
    <el-header :class="{ 'el-header-active': isActive }">
      <el-row type="flex" justify="center" style="height: inherit;">
        <el-col :xs="24" :sm="22" :md="22" :lg="14" :xl="14">
          <Header :brand="websiteInfo.brand"></Header>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!-- 路由占位符 -->
      <router-view v-if="isRouterAlive"></router-view>
    </el-main>
    <el-footer>
      <Footer :copyright="websiteInfo.copyright" :beianInfo="websiteInfo.beianInfo"></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  provide () {
    return {
      reload: this.reload,
      isMobile: this.isMobile
    }
  },
  created () {
    this.getWebsiteInfo()
  },
  data () {
    return {
      // 是否开启顶部固定效果
      isActive: false,
      isRouterAlive: true,
      websiteInfo: {}
    }
  },
  mounted () {
    // const that = this
    window.addEventListener('scroll', this.handleScroll)
    /* window.onresize = () => {
      return that.isMobile()
    } */
    this.isMobile()
  },
  methods: {
    // 获取网站信息
    async getWebsiteInfo () {
      const { data: result } = await this.$http.get('/setting')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.websiteInfo = result.data
    },
    // 统计网站访问量
    hasNewVisitor () {
      return this.$http.post('/count/website')
    },
    // 重新加载页面
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // 处理滚动事件
    handleScroll () {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 0) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    isMobile () {
      // /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      const flag = navigator.userAgent.match(/(phone|pod|iPhone|iPod|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if (flag) {
        return true
      } else {
        return false
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0px;
  // background-color: #393d49;
  background: rgba(255, 255, 255, 0.3);
  background-color: #ffffff;
  position: relative;
  width: 100%;
  z-index: 100;
}
.el-footer {
  padding: 0px;
  height: 100%;
  text-align: center;
}

.el-header-active {
  position: fixed;
  top: 0;
  background: rgba(255, 255, 255, 0.85);
}

.el-main {
  background-color: #f2f6fc;
  padding: 10px;
}
</style>
