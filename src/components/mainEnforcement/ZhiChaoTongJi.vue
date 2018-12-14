<template>
  <div class="main-panel-wrap ZhiChaoTongJi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="goToDetail"></span>
    </div>
    <div class="main-panel-body">

      <div id="ZhiChaoTongJi_charts"></div>

      <div class="ZhiChaoTongJi-right">
        <div>
          <div class="ZhiChaoTongJi-number">
            <span>61%</span>
            <span>检测率</span>
          </div>
          <div class="ZhiChaoTongJi-value">
            <span>+1.24</span><span class="titafont tita-shangsheng"></span>
          </div>
        </div>
        <div>
          <div class="ZhiChaoTongJi-number">
            <span>90%</span>
            <span>处罚率</span>
          </div>
          <div class="ZhiChaoTongJi-value">
            <span>-1.14</span><span class="titafont tita-xiajiang"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '治超统计'
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('ZhiChaoTongJi_charts'))
        let option = {
          title: {
            text: '超限率',
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            left: 116,
            bottom: 50
          },
          series: [
            {
              type: 'gauge',
              axisLine: {
                lineStyle: {
                  width: 5,
                  color: [[0.2, '#43e3e3'], [0.8, '#f6f072'], [1, '#ff4b4b']]
                }
              },
              axisTick: {
                length: 0
              },
              splitLine: {
                length: 5,
                lineStyle: {
                  color: '#000'
                }
              },
              detail: {formatter: '{value}%'},
              data: [{value: 20}]
            }
          ]
        }
        myChart.setOption(option)
      },
      goToDetail () {
        this.$router.push({
          name: 'ally'
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";

  .ZhiChaoTongJi-wrap {
    width: 463px !important;
    .main-panel-body {
      position: relative;
    }

    #ZhiChaoTongJi_charts {
      width: 290px;
      height: 260px;
      float: left;
    }
    .ZhiChaoTongJi-right {
      position: absolute;
      right: 0;
      > div {
        width: 150px;
        height: 130px;
        .ZhiChaoTongJi-number {
          margin-top: 20px;
          float: left;
          span {
            &:first-child {
              font-size: 36px;
            }
            &:last-child {
              display: block;
              margin-top: 20px;
              color: $panel-text-highlight-color;
            }
          }
        }
        .ZhiChaoTongJi-value {
          float: right;
          margin-left: 20px;
          height: 100px;
          line-height: 100px;
          color: $panel-text-highlight-color;
          .tita-shangsheng {
            color: #43e3e3;
          }
          .tita-xiajiang {
            color: #ff4c4b;
          }
        }
      }
    }
  }
</style>
