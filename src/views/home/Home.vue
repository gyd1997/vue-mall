<template>
  <div id="home">
    <navbar class="navbar"><div slot="center">购物街</div></navbar>
    <b-scroll class="content"
              ref="scroll"
              :probe-type="3"
              :pull-up-load="true"
              @scroll="contentScroll"
              @pullingUp="getMore">
      <home-swiper :banners="banners"/>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control class="tab-control"
                    :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"
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
        showBackTop: false
      }
    },
    created () {
      this.getHomeMultiData()
      this.getHomeGoodsData('pop')
      this.getHomeGoodsData('new')
      this.getHomeGoodsData('sell')
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
      },
      backClick() {
        this.$refs.scroll.backTop(0, 0)
      },
      contentScroll(position) {
        this.showBackTop = (-position.y) > 1000
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
    padding-top: 44px;
  }
  .navbar {
    background-color: var(--color-tint);
    color: var(--color-background);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>
