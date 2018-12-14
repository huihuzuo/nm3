<template>
  <div :id="id" class="line-wrap-main"></div>
</template>
<style lang="scss">
  .line-wrap-main {
    width: 100%;
    height: 100%;
    text-align: center;
  }
</style>
<script>
  export default {
    props: {
      obj: {
        type: Object,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      countArr: Array,
      miterArr: Array
    },
    data () {
      return {
        option: {}
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      obj () {
        this.init()
      },
      countArr: function (val) {
        this.option['series'][0].data = val
        this.init()
      },
      miterArr: function (val) {
        this.option['series'][1].data = val
        this.init()
      }
    },
    methods: {
      init () {
        if (Object.keys(this.obj).length !== 0) {
          var myChart = this.$echarts.init(document.getElementById(this.obj.id))
          // let option = {}
          if (this.obj.title) {
            this.option['title'] = this.obj.title
          }
          if (this.obj.tooltip) {
            this.option['tooltip'] = this.obj.tooltip
          }
          if (this.obj.legend) {
            this.option['legend'] = this.obj.legend
          }
          if (this.obj.grid) {
            this.option['grid'] = this.obj.grid
          }
          if (this.obj.color) {
            this.option['color'] = this.obj.color
          }
          if (this.obj.xAxis) {
            this.option['xAxis'] = this.obj.xAxis
          }
          if (this.obj.yAxis) {
            this.option['yAxis'] = this.obj.yAxis
          }
          if (this.obj.series) {
            this.option['series'] = this.obj.series
          }
          myChart.setOption(this.option)
          myChart.on('click', function (a, b) {
            console.log(a)
          })
        }
      }
    },
    components: {}
  }
</script>
