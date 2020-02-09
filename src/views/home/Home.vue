<template>
  <div>
    <navbar class="navbar"><div slot="center">购物街</div></navbar>
    <home-swiper :banners="banners"/>
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar'
  import HomeSwiper from './childCpn/HomeSwiper'
  import HomeRecommend from './childCpn/HomeRecommend'

  import {getHomeMultiData} from 'network/home'

  export default {
    name: 'Home',
    components: {
      Navbar,
      HomeSwiper,
      HomeRecommend
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created () {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
  }
</script>

<style scoped>
  .navbar {
    background-color: var(--color-tint);
    color: var(--color-background);
  }
</style>
