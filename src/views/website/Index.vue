<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="100" :right="50" v-if="!isMobile()">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="10" type="flex" justify="center">
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
              <a :href="item.url">
                <el-image :src="item.cover" fit="contain"></el-image>
              </a>
            </div>
          </el-carousel-item>
        </el-carousel>
        <Dynamic></Dynamic>
      </el-col>
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <!-- 关于 -->
        <el-card shadow="never" body-style="padding: 12px;">
          <UserInfo></UserInfo>
        </el-card>
        <!-- 统计 -->
        <el-card shadow="never" body-style="padding: 12px;" class="nav-right">
          <Count></Count>
        </el-card>
        <!-- 导航 -->
        <el-card shadow="never" body-style="padding: 12px;" class="nav-right">
          <Shortcut></Shortcut>
        </el-card>
        <!-- 推荐 -->
          <el-card shadow="never" body-style="padding: 12px;" class="nav-right">
            <Recommend></Recommend>
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 动态组件
import Dynamic from '@/components/index/Dynamic.vue'
// 快速导航组件
import Shortcut from '@/components/common/Shortcut.vue'
// 统计组件
import Count from '@/components/index/Count.vue'
// 关于组件
import UserInfo from '@/components/index/UserInfo.vue'
// 推荐组件
import Recommend from '@/components/common/Recommend.vue'
// 固钉
// import affix from '@/components/common/affix.vue'
export default {
  name: 'Index',
  components: {
    Shortcut,
    Count,
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
  width: 100%;
  // width: 60%;
  // margin-left: 20%;
}
.nav-right {
  margin-top: 10px;
}
.el-carousel {
  margin-bottom: 10px;
}
</style>
