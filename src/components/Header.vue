<template>
  <div class="header-content">
    <!-- PC端 -->
    <div class="header-content-pc" v-if="!isMobile()">
      <div class="nav-content">
        <div class="header-brand">
          <el-link :underline="false" href="/">
            <span>{{ brand }}</span>
          </el-link>
        </div>
        <!-- 导航 -->
        <ul class="nav">
          <li class="nav-item" v-for="item in nav" :key="item.name">
            <a class="nav-link" :href="item.url">
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <el-input placeholder="请输入内容" size="small" v-model="input" style="width: 200px;">
        <el-button slot="append" icon="el-icon-search" size="small" @click="search"></el-button>
      </el-input>
    </div>
    <!-- 移动端 -->
    <div class="header-content-mobile" v-if="isMobile()">
      <a href="/">
        <i class="icon-logo-primary-64px"></i>
      </a>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        size="small"
        v-model="input"
        clearable
        @change="search"
        @clear="() => { this.$router.push('/') }"
        style="width: 60%;"
      ></el-input>
      <el-button size="small" type="primary" @click="gotoPath('/blog')">博客</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    brand: {
      type: String,
      default: "Frank's Blog"
    }
  },
  inject: ['isMobile', 'reload'],
  data () {
    return {
      input: '',
      // 菜单
      menu: {
        link: []
      },
      nav: [
        { name: '首页', url: '/', icon: 'el-icon-s-home' },
        { name: '博客', url: '/blog', icon: 'el-icon-edit' },
        { name: '导航', url: '/link', icon: 'el-icon-s-promotion' },
        { name: '关于', url: '/about', icon: 'el-icon-info' }
      ]
    }
  },
  methods: {
    // 搜索文章
    search () {
      if (this.input !== '') {
        this.$router.push({
          path: '/search',
          query: {
            key: this.input
          }
        })
      } else {
        this.$router.push('/')
      }
      this.reload()
    },
    gotoPath (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.header-content {
  align-items: center;
  height: 100%;
}
.header-content-pc {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-content-mobile {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-around;
  background-color: #F2F6FC;
  box-shadow: 0px 0px 3px #F2F6FC !important;
}
.header-brand {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  .el-link {
    span {
      margin: 0px;
      color: #fff;
      font-weight: bold;
      font-size: 21px;
    }
  }
}
.link-bottom {
  span {
    margin: 0px;
    border-bottom: 2px solid transparent;
  }
}
.link-bottom :hover {
  span {
    color: #5fb878;
    border-bottom: 2px solid #5fb878;
  }
}

.nav-content {
  display: flex;
  align-items: center;
  height: 50px;
}
// 水平导航栏
.nav {
  list-style: none;
  display: flex;
  padding: 0px;
  margin: 0px;
  align-items: center;
}
.nav-item {
  display: inline-block;
  margin: 0 10px 0 10px;
}
.nav-link {
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  height: 100%;
  span {
    margin-left: 5px;
  }
}
.nav-link:hover {
  border-bottom: solid 3px #409eff;
}
</style>
