<template>
  <div class="nav">
    <h4 class="nav-title">
      <i class="icon-write-24px"></i>博客随笔
    </h4>
    <div class="category-item" v-for="category in category.list" :key="category.id">
      <div class="category-item-title">
        <i class="el-icon-s-unfold"></i>
        <span>{{ category.name }}</span>
      </div>
      <a
        class="tag-item"
        v-for="tag in category.children"
        :key="tag.id"
        :href=" '/blog?categoryId=' + tag.id "
      >
        <div class="tag-item-content">
          <i class="el-icon-folder"></i>
          <span>{{ tag.name }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryNav',
  inject: ['reload'],
  data () {
    return {
      // 目录
      category: {
        list: []
      }
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category/menu', {
        params: { type: '文章' }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.category.list = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.nav-title {
  align-items: center;
  display: flex;
  margin: 0px 0px 10px 0px;
  i {
    margin-right: 5px;
  }
}
.category-item-title {
  display: flex;
  align-items: center;
  color: #303133;
  margin: 10px 0px 10px 0px;
  span {
    font-weight: bold;
    font-size: small;
    margin-left: 2px;
  }
}
.tag-item {
  text-decoration: none;
  color: #606266;
}
.tag-item-content {
  padding: 8px;
  span {
    margin-left: 5px;
  }
}
.tag-item-content:hover {
  background-color: #f2f6fc;
}
</style>
