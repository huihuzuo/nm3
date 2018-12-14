<template>
  <div class="main-panel-wrap GongGongJiaoTongQuShi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
      <ul class="main-panel-switch">
        <li v-for="item in switchs"><span :class="{true: 'selected'}[item.name == type]" @click="switchClick(item.name)">{{item.name}}</span></li>
      </ul>
      <div id="GongGongJiaoTongQuShi_charts"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '公共交通趋势统计',
        type: '时',
        switchs: [
          {
            name: '时'
          },
          {
            name: '日'
          },
          {
            name: '周'
          },
          {
            name: '月'
          },
          {
            name: '季'
          },
          {
            name: '年'
          }
        ],
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
        let myChart = this.$echarts.init(document.getElementById('GongGongJiaoTongQuShi_charts'))
        let xAxisData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        let seriesData = [20, 52, 125, 89, 20, 52, 125, 89, 20, 52, 125, 89, 28]
        let seriesData2 = [15, 33, 38, 122, 30, 22, 173, 84, 52, 85, 89, 71, 14]
        let option = {
          grid: {
            left: '0',
            right: '0',
            top: '30px',
            bottom: '30px',
            containLabel: true
          },
          legend: {
            data: ['公交', '地铁'],
            align: 'auto',
            bottom: 0,
            textStyle: {
              color: '#50afff'
            }
          },
          xAxis: {
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
          },
          yAxis: {
            type: 'value',
            name: '个      ',
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
          },
          series: [
            {
              name: '公交',
              data: seriesData,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#43dfe3'
                }
              }
            },
            {
              name: '地铁',
              data: seriesData2,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#50afff'
                }
              }
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
  .GongGongJiaoTongQuShi-wrap {
    width: 700px !important;
    #GongGongJiaoTongQuShi_charts {
      margin-top: 30px;
      margin-bottom: 20px;
      height: 210px;
      width: 660px;
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
