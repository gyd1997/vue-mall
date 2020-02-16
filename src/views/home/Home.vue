<template>
  <div id="home">
      <navbar class="navbar"><div slot="center">购物街</div></navbar>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   v-show="showTab"
      ></tab-control>
      <b-scroll class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                @scroll="contentScroll"
                @pullingUp="getMore">
        <home-swiper :banners="banners"/>
        <home-recommend :recommends="recommends"></home-recommend>
        <home-feature></home-feature>
        <tab-control :titles="['流行', '新款', '精选']"
                      @tabClick="tabClick"
                     ref="tabControl1"
        ></tab-control>
        <goods-list :goodslist="showGoods"></goods-list>
      </b-scroll>
      <back-top @click.native="backClick" v-show="showBackTop"/>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar'
  import BScroll from 'components/common/scroll/BScroll'

  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/Goods/GoodsList'
  import BackTop from 'components/content/BackTop/BackTop'

  import HomeSwiper from './childCpn/HomeSwiper'
  import HomeRecommend from './childCpn/HomeRecommend'
  import HomeFeature from './childCpn/HomeFeature'

  import { getHomeMultiData, getHomeGoodsData } from 'network/home'
  import { itemListenerMixin } from "common/mixin"

  export default {
    name: 'Home',
    components: {
      Navbar,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      BScroll
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        showBackTop: false,
        tabOffsetTop: 0,
        showTab: false,
        saveY: 0
      }
    },
    mixins: [itemListenerMixin],
    created () {
      this.getHomeMultiData()
      this.getHomeGoodsData('pop')
      this.getHomeGoodsData('new')
      this.getHomeGoodsData('sell')
    },
    updated() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
      this.$bus.$off('imgLoad', this.itemImgListener)
    },
    methods: {
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.showBackTop = (-position.y) > 1000
        this.showTab = (-position.y) > this.tabOffsetTop
      },
      getMore() {
        this.getHomeGoodsData(this.currentType)
      },
      // 网络请求
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoodsData(type) {
        const page = this.goods[type].page + 1
        getHomeGoodsData(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
  }
  .navbar {
    background-color: var(--color-tint);
    color: var(--color-background);
    z-index: 9;
  }
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 1;
  }
</style>
