<template>
  <div>
    <detail-navbar/>
    <detail-swiper :topImgs="topImgs"/>
  </div>
</template>

<script>
  import DetailSwiper from './chidCpn/DetailSwiper'
  import DetailNavbar from './chidCpn/DetailNavbar'
  import { getDetail } from "network/detail"

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImgs: []
      }
    },
    created() {
      this.iid = this.$route.params.iid
      this.getDetail(this.iid)
    },
    components: {
      DetailNavbar,
      DetailSwiper
    },
    methods: {
      // 网络请求
      getDetail(iid) {
        getDetail(iid).then(res => {
          this.topImgs = res.result.itemInfo.topImages
        })
      }
    }
  }
</script>

<style scoped>

</style>
