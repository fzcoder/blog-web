<template>
  <div class="container">
    <el-backtop :bottom="100" :right="50" v-if="!isMobile()">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="24" :sm="17" :md="16" :lg="10" :xl="10">
        <div class="result-area">
          <!-- 文章 -->
          <h4 style="margin-top: 0px;">
            <i class="el-icon-s-unfold"></i> 文章
          </h4>
          <div style="text-align: center;" class="result-empty" v-if="article.isEmpty">
            <img src="../../assets/image/empty.png" />
            <h5 style="color: #909399">
              <i class="el-icon-search"></i> 搜索结果为空
            </h5>
          </div>
          <div class="result-article">
            <ArticleList :list="article.list"></ArticleList>
          </div>
          <el-pagination
            background
            :small="false"
            layout="prev, pager, next"
            :total="article.total"
            @size-change="handleArticleSizeChange"
            @current-change="handleArticleCurrentChange"
            :current-page="article.query.pageNum"
            :page-size="article.query.pageSize"
            :hide-on-single-page="true"
          ></el-pagination>
          <!-- 链接 -->
          <h4>
            <i class="el-icon-s-unfold"></i> 链接
          </h4>
          <div style="text-align: center;" class="result-empty" v-if="link.isEmpty">
            <img src="../../assets/image/empty.png" />
            <h5 style="color: #909399">
              <i class="el-icon-search"></i> 搜索结果为空
            </h5>
          </div>
          <div class="result-link">
            <LinkList :list="link.list"></LinkList>
          </div>
          <el-pagination
            background
            :small="false"
            layout="prev, pager, next"
            :total="link.total"
            @size-change="handleLinkSizeChange"
            @current-change="handleLinkCurrentChange"
            :current-page="link.query.pageNum"
            :page-size="link.query.pageSize"
            :hide-on-single-page="true"
          ></el-pagination>
        </div>
      </el-col>
      <el-col :xs="0" :sm="7" :md="6" :lg="4" :xl="4">
        <div class="nav-card">
          <div class="nav-title">
            <h4>导航</h4>
          </div>
          <Shortcut></Shortcut>
        </div>
        <div class="nav-card">
          <div class="nav-title">
            <h4>推荐</h4>
          </div>
          <Recommend></Recommend>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 推荐组件
import Recommend from '@/components/common/Recommend.vue'
// 快速导航组件
import Shortcut from '@/components/common/Shortcut.vue'
// 文章列表
import ArticleList from '@/components/common/ArticleList.vue'
// 文章列表
import LinkList from '@/components/common/LinkList.vue'
export default {
  name: 'Search',
  components: {
    Recommend,
    Shortcut,
    ArticleList,
    LinkList
  },
  inject: ['reload', 'isMobile'],
  data () {
    return {
      article: {
        total: 0,
        isEmpty: false,
        query: {
          key: this.$route.query.key,
          pageNum: 1,
          pageSize: 10,
          orderBy: ['title'],
          reverse: false
        },
        list: []
      },
      link: {
        total: 0,
        isEmpty: false,
        query: {
          key: this.$route.query.key,
          pageNum: 1,
          pageSize: 10,
          orderBy: ['name'],
          reverse: false
        },
        list: []
      },
      style: {
        tag: ['primary', 'success', 'warning', 'danger']
      }
    }
  },
  created () {
    this.getArticleList()
    this.getLinkList()
  },
  methods: {
    getArticleList () {
      this.$http.post('/article', this.article.query).then(res => {
        const result = res.data.data
        /* if (result.status !== 200) {
          return this.$message({
            message: result.message,
            type: 'error'
          })
        } */
        this.article.list = result.records
        this.article.total = result.total
        this.article.query.pageNum = result.current
        this.article.query.pageSize = result.size
        if (result.total === 0) {
          this.article.isEmpty = true
        }
      })
    },
    getLinkList () {
      this.$http.post('/link', this.link.query).then(res => {
        const result = res.data.data
        /* if (result.status !== 200) {
          return this.$message({
            message: result.message,
            type: 'error'
          })
        } */
        this.link.list = result.records
        this.link.total = result.total
        this.link.query.pageNum = result.current
        this.link.query.pageSize = result.size
        if (result.total === 0) {
          this.link.isEmpty = true
        }
      })
    },
    // 监听pageSize改变的事件
    handleArticleSizeChange (newSize) {
      this.article.query.pageSize = newSize
      this.getArticleList()
    },
    // 监听页码值改变的事件
    handleArticleCurrentChange (newPage) {
      this.article.query.pageNum = newPage
      this.getArticleList()
    },
    // 监听pageSize改变的事件
    handleLinkSizeChange (newSize) {
      this.link.query.pageSize = newSize
      this.getLinkList()
    },
    // 监听页码值改变的事件
    handleLinkCurrentChange (newPage) {
      this.link.query.pageNum = newPage
      this.getLinkList()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: inherit;
  padding: 20px;
  // background-color: #F2F6FC;
}
.nav-card {
  margin-bottom: 20px;
}
.nav-title {
  h4 {
    margin: 0px 0px 5px 0px;
  }
}
</style>
