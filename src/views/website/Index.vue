<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="100" :right="50" v-if="!isMobile()">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="24" :sm="18" :md="15" :lg="10" :xl="10">
        <!-- 走马灯 -->
        <el-carousel
          height="200px"
          arrow="always"
          :interval="9000"
          :indicator-position="isMobile() ? 'none' : ''"
        >
          <el-carousel-item v-for="item in carousel" :key="item.id">
            <div style="text-align: center; width: inherit; height: inherit;">
              <a :href="item.url" target="_blank">
                <img class="carousel-img" :src="item.cover" />
              </a>
            </div>
          </el-carousel-item>
        </el-carousel>
        <Dynamic></Dynamic>
      </el-col>
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <!-- 关于 -->
        <div class="card">
          <UserInfo></UserInfo>
        </div>
        <!-- 导航 -->
        <div class="card">
          <h4>导航</h4>
          <a class="link-card" href="/link#博客">
            <div class="link-card-content color-gradient-NewLife">
              <i class="icon-blog iconsize-large"></i>
              <span>博客</span>
            </div>
          </a>
          <a class="link-card" href="/link#平台">
            <div class="link-card-content color-gradient-MalibuBeach">
              <i class="icon-platform iconsize-large"></i>
              <span>平台</span>
            </div>
          </a>
          <a class="link-card" href="/link#教程">
            <div class="link-card-content color-gradient-TrueSunset">
              <i class="icon-course iconsize-large"></i>
              <span>教程</span>
            </div>
          </a>
        </div>
        <!-- 推荐 -->
        <div class="card">
          <Recommend></Recommend>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 动态组件
import Dynamic from '@/components/index/Dynamic.vue'
// 关于组件
import UserInfo from '@/components/index/UserInfo.vue'
// 推荐组件
import Recommend from '@/components/common/Recommend.vue'
// 固钉
// import affix from '@/components/common/affix.vue'
export default {
  name: 'Index',
  components: {
    UserInfo,
    Recommend,
    Dynamic
  },
  inject: ['isMobile'],
  data () {
    return {
      carousel: []
    }
  },
  created () {
    this.getCarouselList()
  },
  methods: {
    async getCarouselList () {
      const { data: result } = await this.$http.get('/carousel')
      this.carousel = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: inherit;
  padding: 15px;
}
.nav-right {
  margin-top: 10px;
}
.el-carousel {
  margin-bottom: 10px;
  .carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.link-card {
  text-decoration: none;
  cursor: pointer;
  color: #fff;
}
.link-card-content {
  padding: 10px;
  margin: 0 0 10px 0;
  border-radius: 10px;
  // 阴影
  box-shadow: 0px 0px 8px #dcdfe6;
  display: flex;
  align-items: center;
  span {
    margin: 0 0 0 10px;
    font-weight: bold;
  }
}
</style>
