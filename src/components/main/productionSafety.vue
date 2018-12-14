<template>
  <panel-mini position="right" :show-switch="true" :show-close="false" class="product-wrap">
    <div slot="head">
      <div>
        交通管制共：<span>6</span> 起
      </div>
    </div>
    <div class="product-body" slot="body">
      <div class="product-top">
        <ul class="clearfix">
          <li>
            <div class="top-num"><span>278</span> 座</div>
            <div class="top-title">收费站</div>
          </li>
          <li>
            <div class="top-num"><span>24</span> 公里</div>
            <div class="top-title">道路</div>
          </li>
          <li>
            <div class="top-num"><span>54</span> 条</div>
            <div class="top-title">邻省</div>
          </li>
        </ul>
      </div>
      <div id="jtgzId"></div>
    </div>
  </panel-mini>

</template>
<script>
  import panelMini from '../panels/panelMini'

  export default {
    data () {
      return {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        let myChart = this.$echarts.init(document.getElementById('jtgzId'))

        let colors = ['#4ca8f6', '#00d484']

        let option = {
          color: colors,
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            bottom: '30px'
          },
          legend: {
            data: ['收费站', '道路'],
            textStyle: {
              color: '#50afff'
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              data: ['正常', '禁止', '七座以上'],
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
              name: '公里',
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
              name: '收费站',
              type: 'bar',
              barWidth: 6,
              itemStyle: {
                normal: {
                  show: true,
                  barBorderRadius: [50, 50, 0, 0],
                  width: 10
                }
              },
              barGap: 5,
              data: [38, 74, 22]
            },
            {
              name: '道路',
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
              data: [128, 12, 76]
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
  @import "../../assets/variables";

  .product-wrap {
    .product-body {
      .product-top {
        ul {
          border-bottom: 1px solid $panel-border-color;
          li {
            float: left;
            width: 33.33%;
            color: $panel-text-color;
            text-align: center;
            margin: 10px 0;
            .top-title {
              line-height: 30px;
              font-size: 14px;
            }
            .top-num {
              line-height: 30px;
              font-size: 14px;
              span {
                color: #ffff;
                font-size: 16px;
              }
            }
          }
        }
      }
    }

    #jtgzId {
      width: 330px;
      height: 200px;
      margin: 10px auto 0;
    }
  }
</style>
