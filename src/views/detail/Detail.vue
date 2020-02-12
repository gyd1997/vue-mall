<template>
  <div>
    <detail-navbar></detail-navbar>
  </div>
</template>

<script>
  import DetailNavbar from './chidCpn/DetailNavbar'
  export default {
    name: "Detail",
    data() {
      return {
        iid: null
      }
    },
    created() {
      this.iid = this.$route.params.iid
    },
    components: {
      DetailNavbar
    }
  }
</script>

<style scoped>

</style>
