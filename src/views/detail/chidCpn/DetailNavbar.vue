<template>
  <navbar class="navbar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item"
           v-for="(item, index) of titles"
           :key="index"
           @click="titleClick(index)"
           :class="{active: currentIndex == index}">
        {{item}}
      </div>
    </div>
  </navbar>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar.vue'
  export default {
    name: "DetailNavbar",
    components: {
      Navbar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('navbarClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .navbar {
    border-bottom: 1px solid #eee;
  }
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    margin-top: 5px;
  }
</style>
