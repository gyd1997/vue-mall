<template>
  <div>
    <detail-navbar/>
    <detail-swiper :topImgs="topImgs"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailSwiper from './chidCpn/DetailSwiper'
  import DetailNavbar from './chidCpn/DetailNavbar'
  import DetailBaseInfo from './chidCpn/DetailBaseInfo'
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
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo
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

</style>
