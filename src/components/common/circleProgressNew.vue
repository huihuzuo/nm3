<template>
  <div :id="obj.id" class="circle-wrap-main"></div>
</template>
<style lang="scss">
  .circle-wrap-main{
    width: 100%;
    height: 100%;
    text-align: center;
  }
</style>
<script>
  export default{
    props: {
      obj: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    },
    mounted () {
      this.init()
    },
    watch: {
      obj: function (val) {
        this.init()
      }
    },
    methods: {
      init () {
        var myChart = this.$echarts.init(document.getElementById(this.obj.id))
        var option = {
          title: this.obj.title,
          tooltip: this.obj.tooltip,
          series: this.obj.series
        }
        myChart.setOption(option)
        myChart.on('click', function (a, b) {
          console.log(a)
        })
      }
    }
  }
</script>
