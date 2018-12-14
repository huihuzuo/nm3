<template>
  <div class="main-panel-wrap ZhouZaiTongJi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:05）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goToDetail"></span>
    </div>
    <div class="main-panel-body">
      <div id="ZhouZaiTongJi_charts"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '轴载统计'
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('ZhouZaiTongJi_charts'))
        let xAxisData = ['二轴车', '三轴车', '四轴车', '五轴车', '六轴车']
        let seriesData = [3.2077, 18.5080, 55.5660, 36.1403, 1.4846]
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '0',
            top: '30px',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#003d70'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(0, 61, 112, 0.3)'
                }
              },
              axisLabel: {
                color: '#50afff',
                fontSize: 14
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '万辆      ',
              nameLocation: 'end',
              nameTextStyle: {
                fontSize: 14
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#003d70'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(0, 61, 112, 0.3)'
                }
              },
              axisLabel: {
                color: '#50afff',
                fontSize: 14
              }
            }
          ],
          series: [
            {
              name: '轴载统计',
              type: 'bar',
              barWidth: '8px',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#fc5401'
                  }, {
                    offset: 1,
                    color: '#eec22d'
                  }], false),
                  barBorderRadius: [10, 10, 0, 0]
                }
              },
              data: seriesData
            }
          ]
        }
        myChart.setOption(option)
      },
      goToDetail () {
        this.$router.push({
          name: 'enterprise'
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .ZhouZaiTongJi-wrap {
    #ZhouZaiTongJi_charts {
      margin-top: 30px;
      height: 150px;
      width: 360px;
    }
  }
</style>
