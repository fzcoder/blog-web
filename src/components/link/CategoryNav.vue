<template>
  <div class="nav">
    <div class="nav-title">
      <h4>
        <i class="el-icon-s-promotion"></i>导航链接
      </h4>
    </div>
    <div class="nav-item" v-for="item in category" :key="item.id">
      <el-link class="item-children" :underline="false" :href=" '#' + item.name ">
        <span># {{ item.name }}</span>
      </el-link>
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
      category: []
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category/menu', {
        params: { type: '链接' }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.category = result.data
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
  background-color: #fff;
  border-radius: 5px;
}
</style>
