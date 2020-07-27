<template>
  <div class="container">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="0" :sm="2" :md="2" :lg="1" :xl="1">
        <!-- ToolBar -->
        <affix :top="60" :bottom="400">
          <ToolBar :like="count.like"></ToolBar>
        </affix>
      </el-col>
      <el-col :xs="24" :sm="16" :md="14" :lg="10" :xl="10">
        <div class="card">
          <!-- 页头 -->
          <el-page-header @back="goBack" content="文章" />
          <Article :article="article" :author="user" :view="count.view"></Article>
        </div>
      </el-col>
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <!-- 导航 -->
        <div class="card card-margin-bottom">
          <Shortcut></Shortcut>
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
// 快速导航组件
import Article from '@/components/post/Article.vue'
// 工具栏组件
import ToolBar from '@/components/post/ToolBar.vue'
// 快速导航组件
import Shortcut from '@/components/common/Shortcut.vue'
// 推荐组件
import Recommend from '@/components/common/Recommend.vue'
import affix from '@/components/common/affix.vue'
export default {
  name: 'Post',
  components: {
    Article,
    ToolBar,
    Shortcut,
    Recommend,
    affix
  },
  data () {
    return {
      // 文章信息
      article: {},
      // 用户信息
      user: {},
      // 统计信息
      count: {
        view: 0,
        like: 0
      }
    }
  },
  created () {
    this.getArticle()
    this.hasNewReader()
  },
  methods: {
    // 获取文章信息
    async getArticle () {
      const { data: result } = await this.$http.get(
        '/article/' + this.$route.params.id
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.article = result.data
      this.getUserInfo(this.article.author_id)
      this.getCountInfo(this.article.id)
    },
    // 获取用户信息
    async getUserInfo (id) {
      const { data: result } = await this.$http.get('/user/' + id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.user = result.data
    },
    // 获取统计信息
    getCountInfo (articleId) {
      this.$http
        .get('/count/article', {
          params: { details: 'view', article_id: articleId }
        })
        .then(response => {
          this.count.view = response.data.data + 1
        })
      this.$http
        .get('/count/like', {
          params: { object_name: 'article', object_id: articleId }
        })
        .then(response => {
          this.count.like = response.data.data.total
        })
    },
    // 统计阅读量
    hasNewReader () {
      return this.$http.post('/count/article', null, {
        params: { id: this.$route.params.id }
      })
    },
    // 返回到上一页面
    goBack () {
      this.$router.back(-1)
    },
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    beforeRouteUpdate (to, from, next) {
      this.getArticle()
      next()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.card {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
}
.card-margin-bottom {
  margin-bottom: 10px;
}
.nav-title {
  margin-left: 5px;
  h4 {
    align-items: center;
    display: flex;
    margin: 10px;
    i {
      margin-right: 5px;
    }
  }
}
</style>
