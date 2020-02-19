<template>
  <div class="cart-list">
    <b-scroll class="content">
      <cart-list-item
        v-for="(item, index) of cartList"
        :key="index"
        :product="item"
      />
    </b-scroll>
  </div>
</template>

<script>
  import BScroll from 'components/common/scroll/BScroll'
  import CartListItem from './CartListItem'
  import { mapGetters } from 'vuex'
  export default {
    name: "CartList",
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      BScroll,
      CartListItem
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
