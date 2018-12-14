<template>
  <panel-mini title="路况统计" :show-switch="true" :show-close="false" class="total-road-wrap">
    <div slot="body">
      <div id="total_road_chart"></div>
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
        this.$api.getTotalRoad({
          year: '2014'
        }).then(res => {
          this.data = res.data.data
        })
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('total_road_chart'))

        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          color: ['#3aeaa7', '#299eff', '#ffc573'],
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['国道', '省道', '县道'],
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
                {'code': 'G', 'name': '国道', 'value': 7483},
                {'code': 'S', 'name': '省道', 'value': 6234},
                {'code': 'X', 'name': '县道', 'value': 17591}
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
  .total-road-wrap {
    #total_road_chart {
      height: 200px;
    }
  }
</style>
