<template>
  <div id="home">
    <navbar class="navbar"><div slot="center">购物街</div></navbar>
    <home-swiper :banners="banners"/>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-feature></home-feature>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"></tab-control>
    <goods-list :goodslist="goods['pop'].list"></goods-list>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar'
  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/Goods/GoodsList'

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
      HomeSwiper,
      HomeRecommend,
      HomeFeature
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }
      }
    },
    created () {
      this.getHomeMultiData()
      this.getHomeGoodsData('pop')
      this.getHomeGoodsData('new')
      this.getHomeGoodsData('sell')
    },
    methods: {
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
        })
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
</style>
