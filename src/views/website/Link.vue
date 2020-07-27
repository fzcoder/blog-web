<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="100" :right="50" v-if="!isMobile()">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="18" :md="15" :lg="10" :xl="10">
        <div class="board">
          <h1 class="title"><i class="el-icon-link"></i> 导航区</h1>
          <p class="introduction">这里整理收藏了一些实用的网站。博客平台、代码托管平台、主流技术框架的官方文档、各种计算机技术的教程网站...</p>
          <div class="btn-group">
            <el-button type="primary" size="small" icon="el-icon-s-home">首页</el-button>
            <el-button type="success" size="small" icon="el-icon-edit">博客</el-button>
            <el-button type="warning" size="small" icon="el-icon-info">关于</el-button>
          </div>
        </div>
        <!-- 列表区 -->
        <div class="link-group" v-for="item in category" :key="item.category_id">
          <h4 :id="item.category_name"># {{ item.category_name }}</h4>
          <LinkList :list="item.links"></LinkList>
        </div>
      </el-col>
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <!-- 目录导航 -->
        <CategoryNav></CategoryNav>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 目录导航
import CategoryNav from '@/components/link/CategoryNav.vue'
import LinkList from '@/components/common/LinkList.vue'
export default {
  name: 'Link',
  components: {
    CategoryNav,
    LinkList
  },
  inject: ['isMobile'],
  data () {
    return {
      category: []
    }
  },
  created () {
    this.getLinkList()
  },
  methods: {
    async getLinkList () {
      const {
        data: result
      } = await this.$http.get('/link', {
        params: {
          group: true
        }
      })
      this.category = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.board {
  background-color: #FFF;
  border-radius: 10px;
  padding: 10px;
  .introduction {
    color: #909399;
  }
  .btn-group {
    margin-bottom: 10px;
  }
}
</style>
