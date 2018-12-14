<template>
  <panel-mini title="路况状态监测" position="right" :show-switch="true" :show-close="false" class="monit-road-wrap">
    <div slot="body">
      <div id="monit_road_chart"></div>
    </div>
  </panel-mini>
</template>
<script>
  import panelMini from '../panels/panelMini'
  export default {
    data () {
      return {
        data: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.getData()
      },
      getData () {
        this.initChart()
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('monit_road_chart'))

        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          color: ['#3aeaa7', '#299eff', '#ffc573'],
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['优', '良', '中', '次', '差'],
            textStyle: {
              color: '#50afff'
            },
            itemHeight: 10,
            itemWidth: 15
          },
          series: [
            {
              name: '路况统计',
              type: 'pie',
              center: ['50%', '40%'],
              radius: ['50%', '60%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  formatter: '{c}公里'
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: [
                {'code': 'G', 'name': '优', 'value': 7483},
                {'code': 'S', 'name': '良', 'value': 6234},
                {'code': 'X', 'name': '中', 'value': 17591},
                {'code': 'X', 'name': '次', 'value': 17591},
                {'code': 'X', 'name': '差', 'value': 17591}
              ]
            }
          ]
        }

        myChart.setOption(option)
      }
    },
    components: {
      panelMini
    }
  }
</script>
<style lang="scss">
  .monit-road-wrap {
    #monit_road_chart {
      height: 200px;
    }
  }
</style>
