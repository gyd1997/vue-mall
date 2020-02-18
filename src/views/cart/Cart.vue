<template>
  <div class="cart">
    <navbar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </navbar>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar'

  export default {
    name: 'Cart',
    components: {
      Navbar
    },
    computed: {
      ...mapGetters(['cartLength'])
      // ...mapGetters({length: 'cartLength'})改名写法
    }
  }
</script>

<style scoped>
  .navbar {
    background-color: var(--color-high-text);
    color: #fff;
  }
</style>
