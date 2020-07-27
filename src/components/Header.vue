<template>
  <div class="header-content">
    <!-- PC端 -->
    <div class="header-content-pc" v-if="!isMobile()">
      <div class="header-brand">
        <el-link :underline="false" href="/">
          <span>{{ brand }}</span>
        </el-link>
      </div>
      <el-menu mode="horizontal" :router="true" menu-trigger="hover" active-text-color="#409EFF">
        <el-input placeholder="请输入内容" size="small" v-model="input">
          <el-button slot="append" icon="el-icon-search" size="small" @click="search"></el-button>
        </el-input>
        <el-menu-item index="/" class="menu-item">
          <template slot="title">
            <i class="el-icon-s-home" style="border-bottom: 0px;"></i>
            <span style="font-weight: bold;">首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/blog" class="menu-item">
          <template slot="title">
            <i class="el-icon-edit" style="border-bottom: 0px;"></i>
            <span style="font-weight: bold;">博客</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/link" class="menu-item">
          <template slot="title">
            <i class="el-icon-s-promotion" style="border-bottom: 0px;"></i>
            <span style="font-weight: bold;">导航</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/about" class="menu-item">
          <i class="el-icon-info" style="border-bottom: 0px;"></i>
          <span style="font-weight: bold;">关于</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 移动端 -->
    <div class="header-content-mobile"  v-if="isMobile()">
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
      }
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
  justify-content: space-between;
}
.header-content-mobile {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-around;
}
.el-menu {
  border-bottom: 0px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  .el-input {
    width: 200px;
    margin-right: 15px;
  }
}
.header-brand {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  .el-link {
    span {
      margin: 0px;
      // color: #fff;
      color: #606266;
      font-weight: bold;
      font-size: 18pt;
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
</style>
