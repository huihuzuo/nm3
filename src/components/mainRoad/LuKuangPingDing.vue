<template>
  <div class="main-panel-wrap LuKuangPingDing-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：2017年）</span>
      <span class="main-panel-more titafont tita-gengduo"  @click="detailgoto()"></span>
    </div>
    <div class="main-panel-body">
      <div id="LuKuangPingDing_charts"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '路况评定'
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'lukuangpingding'})
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('LuKuangPingDing_charts'))
        let xAxisData = ['优', '良', '中', '次', '差']
        let seriesData = [
          {value: 10052, name: '优'},
          {value: 2750, name: '良'},
          {value: 697, name: '中'},
          {value: 305, name: '次'},
          {value: 143, name: '差'}
        ]
        let option = {
          title: {
            text: '13947',
            textStyle: {
              fontSize: 30,
              color: '#fff'
            },
            subtext: '总里程(公里)',
            subtextStyle: {
              fontSize: 14,
              color: '#50afff'
            },
            x: 'center',
            y: '43%'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          color: ['#78e138', '#60fce8', '#f6f072', '#ffab52', '#fc5401'],
          legend: {
            bottom: 0,
            textStyle: {
              color: '#50afff',
              fontSize: 14
            },
            data: xAxisData
          },
          series: [
            {
              type: 'pie',
              radius: ['70%', '80%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: seriesData
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

  .LuKuangPingDing-wrap {
    width: 320px !important;
    #LuKuangPingDing_charts {
      height: 330px;
      width: 280px;
    }
  }
</style>
