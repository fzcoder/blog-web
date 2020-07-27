<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="100" :right="50" v-if="!isMobile()">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="18" :md="15" :lg="10" :xl="10">
        <!-- 文章列表 -->
        <ArticleList :list="article.list"></ArticleList>
        <!-- 分页区 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="article.query.pageInfo.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="article.query.pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="article.total"
          background
          v-if="!isMobile()"
        ></el-pagination>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="article.query.pageInfo.pageNum"
          :page-size="article.query.pageInfo.pageSize"
          layout="total, prev, pager, next"
          :total="article.total"
          background small
          v-if="isMobile()"
        ></el-pagination>
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
import CategoryNav from '@/components/blog/CategoryNav.vue'
// 文章列表
import ArticleList from '@/components/common/ArticleList.vue'
export default {
  name: 'Blog',
  components: {
    CategoryNav,
    ArticleList
  },
  inject: ['reload', 'isMobile'],
  data () {
    return {
      // 文章信息
      article: {
        // 列表
        list: [],
        // 总数
        total: 0,
        // 请求参数
        query: {
          // 路径参数
          params: { category_id: this.$route.query.categoryId },
          // 分页信息
          pageInfo: {
            key: '',
            pageNum: 1,
            pageSize: 10,
            orderBy: ['date'],
            reverse: false
          }
        }
      }
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.article.query.pageInfo.pageSize = newSize
      this.getArticleList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.article.query.pageInfo.pageNum = newPage
      this.getArticleList()
    },
    // 获取文章列表
    async getArticleList () {
      const { data: result } = await this.$http.post(
        '/article',
        this.article.query.pageInfo,
        { params: this.article.query.params }
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.article.list = result.data.records
      this.article.query.pageInfo.pageNum = result.data.current
      this.article.query.pageInfo.pageSize = result.data.size
      this.article.total = result.data.total
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.el-pagination {
  margin-top: 10px;
}
</style>
