<template>
  <div class="tabbar-item" @click="handleClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabbarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'pink'
    }
  },
  methods: {
    handleClick() {
      this.$router.push(this.path)
    }
  },
  computed: {
    isActive() {
      return this.$route.path == this.path
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor}: {}
    }
  }
}
</script>

<style>
  .tabbar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tabbar-item img {
    height: 24px;
    width: 24px;
    vertical-align: middle;
    margin-top: 3px;
    margin-bottom: 2px;
  }
</style>