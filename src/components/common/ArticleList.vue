<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <div class="article-item" v-for="item in list" :key="item.id">
      <div class="article-item-content">
        <div :class="{ 'item-content-pc': !isMobile(), 'item-content-mobile': isMobile() }">
          <el-link :underline="false" :href=" '/article/' + item.id ">
            <h3 class="item-title">{{ item.title }}</h3>
          </el-link>
          <p style="font-size: small; color: grey;">简介: {{ item.introduction }}</p>
          <div>
            <el-tag
              size="small"
              effect="dark"
              v-for="(tag, i) in item.tags"
              :key="tag"
              :type="style.tags[i%5]"
              style="margin-right: 8px;"
            >{{ tag }}</el-tag>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <p style="font-size: small; color: grey;">
              <i class="el-icon-time"></i>
              {{ item.date }}
            </p>
            <div style="display: flex; justify-content: flex-end;">
              <p style="font-size: small; color: grey;margin-right: 5px;">
                <i class="el-icon-view"></i>
                {{ item.view }}
              </p>
              <p style="font-size: small; color: grey;">
                <i class="el-icon-star-off"></i>
                {{ item.like }}
              </p>
            </div>
          </div>
        </div>
        <el-image class="item-cover" :src="item.cover" fit="fill" v-if="!isMobile()"></el-image>
      </div>
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
  border-bottom: 1px solid #EBEEF5;
  margin-bottom: 10px;
}
.article-item-content {
  background-color: #fff;
  // border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  .item-title {
    margin: 0px;
  }
  .item-content-pc {
    width: 65%;
    padding: 0 10px 0 0;
  }
  .item-content-mobile {
    width: 100%;
    padding: 10px;
  }
  .item-cover {
    width: 35%;
    // border-top-left-radius: 10px;
    // border-bottom-left-radius: 10px;
  }
}
</style>
