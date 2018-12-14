<template>
  <panel-mini title="桥梁统计" :show-switch="true" :show-close="false" class="total-bridge-wrap">
    <div slot="body">
      <div id="total_bridge_chart"></div>
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
        let myChart = this.$echarts.init(document.getElementById('total_bridge_chart'))

        let colors = ['#4ca8f6', '#00d484']

        let option = {
          color: colors,
          tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{c0} {a0}<br/>{c1} {a1}'
          },
          grid: {
            bottom: '30px'
          },
          legend: {
            data: ['座', '万延米'],
            textStyle: {
              color: '#50afff'
            },
            itemHeight: 10,
            itemWidth: 15
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              data: ['特大桥', '大桥', '中桥', '小桥'],
              axisLine: {
                lineStyle: {
                  color: '#003d70'
                }
              },
              axisPointer: {
                type: 'shadow',
                shadowStyle: {
                  color: 'rgba(0, 61, 112, 0.6)'
                }
              },
              axisLabel: {
                fontSize: 14,
                color: '#50afff'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '座',
              nameTextStyle: {
                color: '#50afff',
                fontSize: 14
              },
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: '#003d70'
                }
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                fontSize: 14,
                color: '#50afff'
              }
            },
            {
              type: 'value',
              name: '万延米',
              nameTextStyle: {
                color: '#50afff',
                fontSize: 14
              },
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: '#003d70'
                }
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                fontSize: 14,
                color: '#50afff'
              }
            }
          ],
          series: [
            {
              name: '座',
              type: 'bar',
              barWidth: 6,
              itemStyle: {
                normal: {
                  show: true,
                  barBorderRadius: [50, 50, 0, 0],
                  width: 10
                }
              },
              barGap: 1,
              data: [38, 74, 22, 18]
            },
            {
              name: '万延米',
              type: 'bar',
              yAxisIndex: 1,
              barWidth: 6,
              itemStyle: {
                normal: {
                  show: true,
                  barBorderRadius: [50, 50, 0, 0],
                  width: 10
                }
              },
              data: [128, 12, 76, 49]
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
  .total-bridge-wrap {
    #total_bridge_chart {
      height: 200px;
    }
  }
</style>
