<template>
  <div id="detail">
    <detail-navbar class="detail-navbar"/>
    <b-scroll class="detail-content" ref="scroll">
      <detail-swiper :topImgs="topImgs"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @goodsInfoLoad="goodsInfoLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goodslist="recommendList"/>
    </b-scroll>
  </div>
</template>

<script>
  import GoodsList from 'components/content/Goods/GoodsList'
  import BScroll from 'components/common/scroll/BScroll'
  import DetailSwiper from './chidCpn/DetailSwiper'
  import DetailNavbar from './chidCpn/DetailNavbar'
  import DetailBaseInfo from './chidCpn/DetailBaseInfo'
  import DetailShopInfo from './chidCpn/DetailShopInfo'
  import DetailGoodsInfo from './chidCpn/DetailGoodsInfo'
  import DetailParamInfo from './chidCpn/DetailParamInfo'
  import DetailCommentInfo from './chidCpn/DetailCommentInfo'
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
  import { itemListenerMixin } from "common/mixin"

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImgs: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: []
      }
    },
    mixins: [itemListenerMixin],
    created() {
      this.iid = this.$route.params.iid
      this.getDetail(this.iid)
      this.getRecommend()
    },
    destroyed() {
      this.$bus.$off('imgLoad', this.itemImgListener)
    },
    components: {
      GoodsList,
      BScroll,
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo
    },
    methods: {
      goodsInfoLoad() {
        this.$refs.scroll.refresh()
      },
      // 网络请求
      getDetail(iid) {
        getDetail(iid).then(res => {
          const data = res.result
          // 轮播图
          this.topImgs = data.itemInfo.topImages
          // 商品数据
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          // 店铺信息
          this.shop = new Shop(data.shopInfo)
          // 商品详细信息
          this.detailInfo = data.detailInfo
          // 商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          // 评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      getRecommend(){
        getRecommend().then(res => {
          this.recommendList = res.data.list
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
