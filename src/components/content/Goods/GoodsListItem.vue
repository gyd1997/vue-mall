<template>
  <div class="goods-item" @click="toDetail">
    <img v-lazy="itemImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">￥{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      itemImg() {
        return this.item.image || this.item.show.img
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit('imgLoad')
      },
      toDetail() {
        this.$router.push('/detail/' + this.item.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .price {
    color: var(--color-tint);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
