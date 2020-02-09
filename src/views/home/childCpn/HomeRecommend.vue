<template>
  <div class="recommend">
    <div class="rcmd-item" v-for="item in recommends" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommend',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 14px;
    padding: 12px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .rcmd-item {
    flex: 1;
  }
  .rcmd-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 6px;
  }
</style>
