<template>
  <div class="article">
    <h3 class="article-title">{{ article.title }}</h3>
    <!-- 基本信息 -->
    <div class="info">
      <div class="info-header">
        <el-avatar :size="50" :src="author.avatar"></el-avatar>
        <div class="info-header-author">
          <h3 class="info-header-author-name">{{ author.nickname }}</h3>
          <p class="info-header-author-date">{{ author.motto }}</p>
        </div>
      </div>
    </div>
    <!-- 正文 -->
    <div class="markdown-body">
      <div id="article-content-html" v-html="article.content_html"></div>
    </div>
    <!-- 页底 -->
    <div style="display: flex; justify-content: space-between;">
      <p style="font-size: small; color: grey;">
        <i class="el-icon-time"></i>
        发布于：{{ article.date }}
      </p>
      <p style="font-size: small; color: grey;">
        <i class="el-icon-view"></i>
        阅读量：{{ view }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    article: {
      type: Object,
      default: () => ({})
    },
    author: {
      type: Object,
      default: () => ({})
    },
    view: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 样式信息
      style: {
        tags: ['primary', 'success', 'warning', 'danger', 'info']
      }
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  margin: 20px 0px 20px 0px;
}
.info-title {
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
}
.info-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.info-header-author {
  margin-left: 15px;
}
.info-header-author-name {
  margin: 0px;
}
.info-header-author-date {
  margin: 1px;
  color: gray;
  font-size: small;
}
.info-tags {
  margin: 5px 0 5px 0;
  .el-tag {
    margin-right: 5px;
  }
}
</style>
