<template>
  <div :class="{ 'affix': true, 'affix-active': isScroll }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'affix',
  props: {
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isScroll: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 监听滚动事件
    handleScroll () {
      // 滚动条高度
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop >= this.top && scrollTop <= document.body.scrollHeight - this.bottom) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.affix-active {
  position: fixed;
  z-index: 10;
  top: 60px;
}
</style>
