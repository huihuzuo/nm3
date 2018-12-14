<template>
  <div :id="id" class="circle-wrap-main"></div>
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
      },
      id: {
        type: String,
        required: true
      }
    },
    data () {
      return {}
    },
    watch: {
      obj (val) {
        console.log(val)
        this.init(val)
      }
    },
    mounted () {
      this.init(this.obj)
    },
    methods: {
      init (val) {
        let self = this
        let myChart = this.$echarts.init(document.getElementById(val.id))
        let option = {}
        if (this.obj.title) {
          option['title'] = this.obj.title
        }
        if (this.obj.tooltip) {
          option['tooltip'] = this.obj.tooltip
        }
        if (this.obj.color) {
          option['color'] = this.obj.color
        }
        if (this.obj.legend) {
          option['legend'] = this.obj.legend
        }
        if (this.obj.title) {
          option['title'] = this.obj.title
        }
        if (this.obj.series) {
          option['series'] = this.obj.series
        }
        myChart.setOption(option)
        myChart.on('legendselectchanged', function (params) {
          let legends = []
          for (let item in params.selected) {
            if (params.selected[item]) {
              legends.push(item)
            }
          }
          self.$emit('legendEvent', legends)
        })
      }
    }
  }
</script>
