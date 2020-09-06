<template>
  <div class="recommend">
    <h4>
      推荐
    </h4>
    <div class="recommend-list" style="margin-top: 15px;">
      <div class="recommend-item" v-for="(item, index) in recommend.list" :key="item.id">
        <a class="item-link" :href=" '/article/' + item.id ">
          <div style="background-color: #F2F6FC; padding: 1px 5px 1px 5px; margin-right: 5px;">{{ index + 1 }}</div>
          <span class="title-content">{{ item.title }}</span>
        </a>
        <p class="item-date">
          <i class="el-icon-time"></i>
          {{ item.date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  data () {
    return {
      // 推荐
      recommend: {
        // 列表
        list: []
      }
    }
  },
  created () {
    this.getRecommend()
  },
  methods: {
    // 获取推荐列表
    async getRecommend () {
      const { data: result } = await this.$http.get('/recommend/article')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.recommend.list = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.title-content {
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
}
.title-content :hover {
  color: #5fb878;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 2px solid #5fb878;
}
.item-link {
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #606266;
}
.item-date {
  font-size: small;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
