<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <div class="article-item" v-for="item in list" :key="item.id">
      <el-row :gutter="10" class="article-item-content">
        <el-col :xs="24" :sm="18" :md="18" :lg="16" :xl="16">
          <a class="item-title" :href=" '/article/' + item.id ">
            <span>{{ item.title }}</span>
          </a>
          <p style="font-size: small; color: grey;">简介: {{ item.introduction }}</p>
          <div class="item-tag">
            <el-tag
              size="small"
              effect="dark"
              v-for="(tag, i) in item.tags"
              :key="tag"
              :type="style.tags[i%5]"
              style="margin-right: 8px;"
            >{{ tag }}</el-tag>
          </div>
          <div class="item-status">
            <p class="item-date">
              <i class="el-icon-time"></i>
              {{ item.date }}
            </p>
            <div class="item-status-right">
              <p style="margin-right: 5px;">
                <i class="el-icon-view"></i>
                {{ item.view }}
              </p>
              <p>
                <i class="el-icon-star-off"></i>
                {{ item.like }}
              </p>
            </div>
          </div>
        </el-col>
        <el-col :xs="0" :sm="6" :md="6" :lg="8" :xl="8">
          <img class="item-cover" :src="item.cover" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  inject: ['isMobile'],
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 样式信息
      style: {
        // 标签
        tags: ['primary', 'success', 'warning', 'danger', 'info']
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 10px;
}
.article-item-content {
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  // 标题
  .item-title {
    text-decoration: none;
    color: #303133;
    span {
      font-weight: bold;
    }
  }
  .item-title:hover {
    color: #409eff;
  }
  // 封面
  .item-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  // 状态栏
  .item-status {
    p {
      margin-bottom: 0px;
      font-size: small;
      color: grey;
    }
    display: flex;
    justify-content: space-between;
    .item-status-right {
      display: flex;
      justify-content: flex-start;
      float: right;
    }
  }
}
</style>
