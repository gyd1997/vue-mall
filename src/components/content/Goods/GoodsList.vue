<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) of goodslist" :key="index" :item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name: 'GoodsList',
    props: {
      goodslist: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
