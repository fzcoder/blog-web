<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <div class="article-item" v-for="item in list" :key="item.id">
      <el-image class="item-cover" :src="item.cover" fit="fill" v-if="!isMobile()"></el-image>
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
/* .el-link {
  h3 {
    margin: 0px;
    border-bottom: 2px solid transparent;
  }
}
.el-link :hover {
  h3 {
    color: #5fb878;
    border-bottom: 2px solid #5fb878;
  }
} */
.article-item {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  .item-title {
    margin: 0px;
  }
  .item-content-pc {
    width: 60%;
    padding: 10px;
  }
  .item-content-mobile {
    width: 100%;
    padding: 10px;
  }
  .item-cover {
    width: 40%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>
