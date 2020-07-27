<template>
  <div class="nav">
    <div class="nav-title">
      <h4>
        <i class="icon-write-24px"></i>博客随笔
      </h4>
    </div>
    <div class="nav-item" v-for="category in category.list" :key="category.id">
      <div v-for="tag in category.children" :key="tag.id" :class="{ 'item-children' : true, 'item-children-active' : isActive(tag.id) }">
        <el-link :underline="false" icon="el-icon-paperclip" :href=" '/blog?categoryId=' + tag.id ">
          <span>{{ tag.name }}</span>
        </el-link>
      </div>
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
      },
      // 样式
      style: {
        tags: [
          'icon-tag2-primary-24px',
          'icon-tag2-success-24px',
          'icon-tag2-warning-24px',
          'icon-tag2-danger-24px',
          'icon-tag2-info-24px'
        ]
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
    },
    // 根据标签查找文章列表
    isActive (id) {
      return id === this.$route.query.categoryId
    }
  }
}
</script>

<style lang="less" scoped>
.nav-title {
  margin-left: 5px;
  h4 {
    align-items: center;
    display: flex;
    margin: 10px;
    i {
      margin-right: 5px;
    }
  }
}
.item-title {
  display: flex;
  align-content: center;
}
.item-children {
  span {
    font-weight: bold;
    font-size: medium;
  }
  padding: 10px;
}
.item-children-active {
  background-color: #FFF;
  border-radius: 5px;
}
</style>
