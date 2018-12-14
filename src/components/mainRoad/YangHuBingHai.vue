<template>
  <div class="main-panel-wrap YangHuBingHai-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：2017年12月）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto()"></span>
    </div>
    <div class="main-panel-body">
      <div id="YangHuBingHai_charts"></div>
      <ul>
        <li>维修</li>
        <li>发现</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '养护病害'
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('YangHuBingHai_charts'))
        let option = {
          color: ['#00d484', '#EEC02C'],
          angleAxis: {
            type: 'category',
            boundaryGap: [40, 40],
            axisLine: {
              lineStyle: {
                color: '#003d70'
              }
            },
            axisLabel: {
              color: '#50afff'
            },
            data: ['标识损害', '沿线设施', '路基损害', '涵洞损害', '防护损害', '路面破损', '桥梁坍塌', '隧道损害'],
            z: 10
          },
          radiusAxis: {
            axisLine: {
              lineStyle: {
                color: '#003d70'
              }
            },
            axisLabel: {
              color: '#50afff'
            },
            splitLine: {
              lineStyle: {
                color: '#003d70'
              }
            }
          },
          polar: {
          },
          series: [{
            type: 'bar',
            data: [1, 2, 3, 4, 3, 5, 1, 3],
            coordinateSystem: 'polar',
            name: '维修',
            stack: 'a'
          }, {
            type: 'bar',
            data: [2, 4, 6, 1, 3, 2, 1, 2],
            coordinateSystem: 'polar',
            name: '发现',
            stack: 'a'
          }]
        }
        myChart.setOption(option)
      },
      detailgoto () {
        this.$router.push({name: 'yanghubinghai'})
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";

  .YangHuBingHai-wrap {
    width: auto !important;
    #YangHuBingHai_charts {
      margin-top: 30px;
      height: 250px;
      width: 360px;
    }
    ul {
      text-align: center;
      margin-top: 20px;
      li {
        color: $panel-text-color;
        margin-right: 20px;
        display: inline-block;
        &:before {
          content: ' ';
          display: inline-block;
          width: 20px;
          height: 10px;
          background: #00d484;
          margin-right: 10px;
        }
        &:first-child {
          &:before {
            background: #EEC02C;
          }
        }
      }
    }
  }
</style>
