<template>
  <div class="recommend-list">
    <a
      class="item-link"
      v-for="item in recommend.list"
      :key="item.id"
      :href=" '/article/' + item.id "
    >
      <div class="item-content">
        <i class="el-icon-document"></i>
        <span class="title-content">{{ item.title }}</span>
      </div>
    </a>
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
}
.item-link {
  text-decoration: none;
  color: #606266;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
}
.item-content {
  padding: 10px 0px 10px 0px;
  span {
    margin-left: 5px;
  }
}
.item-content:hover {
  background-color: #F2F6FC;
}
</style>
