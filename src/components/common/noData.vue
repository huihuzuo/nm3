<!--无数据统一效果样式-->
<template>
  <div class="no-data">
    <span>
        <img src="static/images/zwsj2.png"/></span>
  </div>
</template>
<style lang="scss">
  .no-data {
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;
    span {
      display: table-cell;
      vertical-align: middle;
      img {
        display: inline-block;
      }
    }
  }
</style>
<script>
  export default {
    props: {},
    data () {
      return {}
    },
    mounted () {
    },
    watch: {},
    methods: {},
    components: {}
  }
</script>
