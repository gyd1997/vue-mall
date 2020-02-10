<template>
  <div id="app">
    <router-view></router-view>
    <main-tabbar class="main-tabbar"></main-tabbar>
  </div>
</template>

<script>
  import MainTabbar from './components/content/MainTabbar/MainTabbar.vue'

  export default {
    name: 'app',
    components: {
      MainTabbar
    }
  }
</script>

<style>
  @import './assets/css/base.css';
  .main-tabbar {
    z-index: 10;
  }
</style>
