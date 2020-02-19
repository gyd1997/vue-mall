<template>
  <div class="cart">
    <navbar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </navbar>
    <cart-list/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Navbar from 'components/common/navbar/Navbar'
  import CartList from './childCpn/CartList'

  export default {
    name: 'Cart',
    components: {
      Navbar,
      CartList
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
