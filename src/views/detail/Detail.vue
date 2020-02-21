<template>
  <div id="detail">
    <detail-navbar class="detail-navbar"
                   @navbarClick="navbarClick"
                   ref="nav"/>
    <b-scroll class="detail-content"
              ref="scroll"
              :probeType="3"
              @scroll="contentScroll">
      <detail-swiper :topImgs="topImgs"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @goodsInfoLoad="goodsInfoLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goodslist="recommendList"/>
    </b-scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="showBackTop"/>
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
  import DetailBottomBar from './chidCpn/DetailBottomBar'
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
  import { itemListenerMixin, backTopMixin } from "common/mixin"
  import { debounce } from "common/utils"
  import { mapActions } from 'vuex'

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
        recommendList: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      this.iid = this.$route.params.iid
      this.getDetail(this.iid)
      this.getRecommend()
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop + 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop + 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop + 44)
        this.themeTopYs.push(9000000)
      }, 100)
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
      DetailCommentInfo,
      DetailBottomBar
    },
    methods: {
      ...mapActions(['addCart']),
      // 商品信息加载完成后刷新
      goodsInfoLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      navbarClick(index) {
        this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.showBackTop = (-position.y) > 1000
      },
      addToCart() {
        // 1.保存需要的商品信息
        const product = {}
        product.image = this.topImgs[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        this.addCart(product).then(res => {
          this.$toast.show(res)
        })
        /*this.$store.dispatch('addCart', product).then(res => {
          console.log(res)
        })*/
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
      getRecommend() {
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
    height: calc(100vh - 44px - 58px);
  }
</style>
