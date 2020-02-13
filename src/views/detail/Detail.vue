<template>
  <div id="detail">
    <detail-navbar class="detail-navbar"/>
    <b-scroll class="detail-content">
      <detail-swiper :topImgs="topImgs"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
    </b-scroll>
  </div>
</template>

<script>
  import BScroll from 'components/common/scroll/BScroll'
  import DetailSwiper from './chidCpn/DetailSwiper'
  import DetailNavbar from './chidCpn/DetailNavbar'
  import DetailBaseInfo from './chidCpn/DetailBaseInfo'
  import DetailShopInfo from './chidCpn/DetailShopInfo'
  import { getDetail, Goods, Shop } from "network/detail"

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImgs: [],
        goods: {},
        shop: {}
      }
    },
    created() {
      this.iid = this.$route.params.iid
      this.getDetail(this.iid)
    },
    components: {
      BScroll,
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    methods: {
      // 网络请求
      getDetail(iid) {
        getDetail(iid).then(res => {
          const data = res.result
          this.topImgs = data.itemInfo.topImages
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          this.shop = new Shop(data.shopInfo)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 20;
    background-color: #fff;
  }
  .detail-navbar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-content {
    height: calc(100vh - 44px);
  }
</style>
