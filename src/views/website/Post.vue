<template>
  <div class="container">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="0" :sm="2" :md="2" :lg="1" :xl="1">
        <!-- ToolBar -->
        <affix :top="0" :bottom="400">
          <ToolBar :like="count.like" :disabled="isToolDisable"></ToolBar>
        </affix>
      </el-col>
      <el-col :xs="24" :sm="16" :md="14" :lg="10" :xl="10">
        <div class="card">
          <!-- 页头 -->
          <el-page-header @back="goBack" content="文章" />
          <Article
            v-if="!isNotFound"
            :article="article"
            :author="user"
            :view="count.view"
          ></Article>
          <div v-if="isNotFound" class="NotFound">
            <h3 style="color: #909399">(´⊙ω⊙`)! 文章不存在...</h3>
            <img src="../../assets/image/404.png" />
            <div>
              <el-button
                size="small"
                type="primary"
                round
                @click="
                  () => {
                    return $router.push('/blog');
                  }
                "
                >博客</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="nav-right">
          <!-- 导航 -->
          <div class="nav-card card-margin-bottom">
            <div class="nav-title">
              <h4>目录</h4>
            </div>
            <div id="table-of-content"></div>
          </div>
          <!-- 推荐 -->
          <div class="nav-card">
            <div class="nav-title">
              <h4>推荐</h4>
            </div>
            <Recommend></Recommend>
          </div>
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
// 推荐组件
import Recommend from '@/components/common/Recommend.vue'
import affix from '@/components/common/affix.vue'
export default {
  name: 'Post',
  components: {
    Article,
    ToolBar,
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
      },
      tableOfContent: {
        nodes: []
      },
      // 文章是否不存在
      isNotFound: false,
      // 工具栏是否不可用
      isToolDisable: true
    }
  },
  created () {
    this.getArticle()
  },
  mounted () {
    /* this.$nextTick(function () {
      this.createContentTree()
    }) */
    setTimeout(() => {
      this.createContentTree()
    }, 200)
  },
  methods: {
    // 获取文章信息
    async getArticle () {
      const { data: result } = await this.$http.get(
        '/article/' + this.$route.params.id
      )
      // 显示错误信息
      if (result.status !== 200) {
        this.isNotFound = true
        return this.$message.error(result.message)
      }
      this.isToolDisable = false
      this.article = result.data
      this.hasNewReader()
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
        .then((response) => {
          this.count.view = response.data.data + 1
        })
      this.$http
        .get('/count/like', {
          params: { object_name: 'article', object_id: articleId }
        })
        .then((response) => {
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
    },
    createContentTree () {
      var dom = document.getElementById('article-content-html')
      // console.log(dom)
      var nodes = dom.getElementsByTagName('*')
      // 创建博客目录的div容器
      var contentElem = document.getElementById('table-of-content')
      var articleContentNum = 0
      for (var i = 0; i < nodes.length; i++) {
        var foundElem = false
        var divElemClassName = ''
        switch (nodes[i].nodeName) {
          case 'H1':
            foundElem = true
            divElemClassName = 'toc-content toc-h1'
            break
          case 'H2':
            foundElem = true
            divElemClassName = 'toc-content toc-h2'
            break
          case 'H3':
            foundElem = true
            divElemClassName = 'toc-content toc-h3'
            break
          case 'H4':
            foundElem = true
            divElemClassName = 'toc-content toc-h4'
            break
          case 'H5':
            foundElem = true
            divElemClassName = 'toc-content toc-h5'
            break
          default:
            break
        }
        if (foundElem === true) {
          // 创建<a>标签
          var aElem = document.createElement('A')
          // 设置<a>标签 class
          aElem.className = 'toc-link'
          // console.log(aElem)
          // 设置<a>标签的 id
          nodes[i].setAttribute('id', 'article_content_' + articleContentNum)
          // 设置<a>标签的链接
          aElem.setAttribute('href', 'javascript:;')
          const offsetTop = nodes[i].offsetTop
          // 实现滚动定位
          aElem.onclick = function () {
            let top = document.documentElement.scrollTop || document.body.scrollTop
            // 实现滚动效果
            var timeTop = setInterval(() => {
              if (offsetTop > top) {
                document.body.scrollTop = document.documentElement.scrollTop = top += 10
                if (top >= offsetTop) {
                  clearInterval(timeTop)
                }
              } else {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 10
                if (top <= offsetTop) {
                  clearInterval(timeTop)
                }
              }
            }, 3)
          }
          articleContentNum++
          // 创建<div>标签
          var divElem = document.createElement('DIV')
          // 设置<div>标签 class
          divElem.className = divElemClassName
          // 创建<span>标签
          var spanElem = document.createElement('SPAN')
          // 设置<span>标签 class
          spanElem.className = 'toc-title'
          // 创建文本节点
          var textNode = document.createTextNode(nodes[i].innerText)
          // 将文本节点添加到<span>标签里
          spanElem.appendChild(textNode)
          // 将<span>标签添加到<a>标签中
          divElem.appendChild(spanElem)
          // 将<a>标签添加到<div>标签中
          aElem.appendChild(divElem)
          // console.log(aElem)
          // 将创建的DOM元素添加到容器中
          contentElem.appendChild(aElem)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: inherit;
  padding: 10px;
  background-color: #f2f6fc;
}
.card {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
}
.card-margin-bottom {
  margin-bottom: 10px;
}
.nav-right {
  position: fixed;
  // z-index: 10px;
  width: inherit;
}
.nav-card {
  background-color: #fff;
  border-radius: 5px;
  padding: 12px;
}
.nav-title {
  border-left: 5px solid #409eff;
  h4 {
    margin: 0px 0px 0px 5px;
  }
}
.NotFound {
  text-align: center;
  img {
    margin-bottom: 15px;
  }
}
#table-of-content {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>

<style>
.toc-link {
  text-decoration: none;
  color: #303030;
}
.toc-link:hover {
  color: #409eff;
}
.toc-content {
  padding: 3px;
}
.toc-content:hover {
  background-color: #f2f6fc;
}
.toc-h1 {
  padding-left: 0px;
}
.toc-h2 {
  padding-left: 0px;
}
.toc-h3 {
  padding-left: 0px;
}
.toc-h4 {
  padding-left: 10px;
}
.toc-h5 {
  padding-left: 20px;
}
</style>
