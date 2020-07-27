<template>
  <div class="link-list">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" v-for="item in list" :key="item.id">
        <div class="link-item">
          <el-avatar
            :size="30"
            :src="item.iconUrl"
            style="background-color: #FFFFFF; margin-right: 8px;"
          ></el-avatar>
          <el-link :underline="false" :href="item.linkUrl" target="_blank">
            <span style="font-weight: bold;">{{ item.name }}</span>
          </el-link>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8"></el-col>
      <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LinkList',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.link-item {
  // background-color: #f2f6fc;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-content: center;
  margin-bottom: 10px;
}
</style>
