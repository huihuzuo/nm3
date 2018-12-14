<template>
  <div class="main-panel-wrap BanXianZhanBi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
      <div id="BanXianZhanBi_charts"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '班线占比情况分析',
        pieColor: ['#78e138', '#ffab52', '#60fce8', '#fc5401', '#f6f072']
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'planproperty'})
      },
      switchClick (type) {
        this.type = type
        this.initChart()
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('BanXianZhanBi_charts'))
        let xAxisData = ['省级线路', '市级线路', '县级线路', '县内线路']
        let seriesDataBan = [20, 12, 31, 34]
        let seriesDataBao = [10, 20, 5, 9]
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
          legend: {
            data: ['班车', '包车'],
            align: 'auto',
            top: 0,
            textStyle: {
              color: '#50afff'
            }
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
              name: '辆       ',
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
              name: '班车',
              type: 'bar',
              barWidth: '8px',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00d484'
                  }, {
                    offset: 1,
                    color: '#81fffa'
                  }], false),
                  barBorderRadius: [10, 10, 0, 0]
                }
              },
              data: seriesDataBan
            },
            {
              name: '包车',
              type: 'bar',
              barWidth: '8px',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#ff9d4b'
                  }, {
                    offset: 1,
                    color: '#ffc99c'
                  }], false),
                  barBorderRadius: [10, 10, 0, 0]
                }
              },
              data: seriesDataBao
            }
          ]
        }
        myChart.setOption(option)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .BanXianZhanBi-wrap {
    #BanXianZhanBi_charts {
      margin-top: 30px;
      margin-bottom: 20px;
      height: 150px;
      width: 330px;
    }
    .jsxz-wrap {
      ul {
        position: absolute;
        top: 130px;
        right: 20px;
        width: 180px;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 90px;
          line-height: 30px;
          span {
            display: inline-block;
            float: left;
            width: 12px;
            height: 12px;
            margin-top: 9px;
            border-radius: 3px;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
