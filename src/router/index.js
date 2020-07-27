import Vue from 'vue'
import Router from 'vue-router'
// 网站主体视图区
// import Frame from '@/view/Website.vue'
const Frame = () => import(/* webpackChunkName: "website" */ '@/views/Website.vue')
// import Index from '@/view/website/Index.vue'
const Index = () => import(/* webpackChunkName: "index" */ '@/views/website/Index.vue')
// import Posts from '@/view/website/Post.vue'
const Posts = () => import(/* webpackChunkName: "post" */ '@/views/website/Post.vue')
// import Search from '@/view/website/Search.vue'
const Search = () => import(/* webpackChunkName: "search" */ '@/views/website/Search.vue')
// import About from '@/view/website/About.vue'
const About = () => import(/* webpackChunkName: "about" */ '@/views/website/About.vue')
// import Blog from '@/view/website/Blog.vue'
const Blog = () => import(/* webpackChunkName: "blog" */ '@/views/website/Blog.vue')
const Link = () => import(/* webpackChunkName: "link" */ '@/views/website/Link.vue')
// import NotFound from '@/view/404.vue'
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/404.vue')

Vue.use(Router)

const router = new Router({
  // 开启历史模式
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Frame,
      meta: { title: '首页 - Frank\'s Blog ' },
      children: [
        { path: '', component: Index, meta: { title: '首页 - Frank\'s Blog ' } },
        { path: '/article/:id', component: Posts, meta: { title: '文章 - Frank\'s Blog ' } },
        { path: '/search', component: Search, meta: { title: '搜索 - Frank\'s Blog ' } },
        { path: '/blog', component: Blog, meta: { title: '博客 - Frank\'s Blog ' } },
        { path: '/link', component: Link, meta: { title: '导航 - Frank\'s Blog ' } },
        { path: '/about', component: About, meta: { title: '关于 - Frank\'s Blog ' } }
      ]
    },
    { path: '*', component: NotFound, meta: { title: '404 - Frank\'s Blog ' } }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, _from, next) => {
  // to 将要跳转的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数, 表示放行
  // next() 放行 next('/login') 强制跳转
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
