<template>
  <div class="dynamic-container">
    <!-- 文章列表 -->
    <ArticleList :list="article.list"></ArticleList>
    <div style="text-align: center;">
      <el-button
        type="primary"
        :size="isMobile() ? 'small' : 'medium'"
        round
        icon="el-icon-caret-bottom"
        v-show="!isLoadBtnDisabled"
        @click="loadMoreArticle()"
      >查看更多</el-button>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/common/ArticleList.vue'
export default {
  name: 'Dynamic',
  components: {
    ArticleList
  },
  inject: ['isMobile'],
  data () {
    return {
      // 文章信息
      article: {
        // 列表
        list: [],
        // 请求
        query: {
          // 路径参数
          params: {},
          // 分页信息
          pageInfo: {
            // 关键字
            key: '',
            // 当前页面数
            pageNum: 1,
            // 每页的数据量
            pageSize: 10,
            // 排序字段
            orderBy: ['date'],
            // 是否为倒序
            reverse: true
          }
        },
        // 总数
        total: 0
      },
      // 页底按钮状态
      isLoadBtnDisabled: false,
      // 样式信息
      style: {
        // 标签
        tags: ['primary', 'success', 'warning', 'danger', 'info']
      }
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
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
    },
    // 查看更多动态
    loadMoreArticle () {
      this.article.query.pageInfo.pageSize += 10
      this.getArticleList()
      if (this.article.query.pageInfo.pageSize >= this.article.total) {
        this.isLoadBtnDisabled = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
