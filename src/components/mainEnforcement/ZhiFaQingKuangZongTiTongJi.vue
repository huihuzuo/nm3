<template>
  <div class="main-panel-wrap ZhiFaQingKuangZongTiTongJi-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">

      <ul class="ZhiFaQingKuangZongTiTongJi-total">
        <li @click="clickEvent('all')">
          <div>129 <span>个</span></div>
          <div>公安处罚数</div>
        </li>
        <li @click="clickEvent('1')">
          <div>37 <span>个</span></div>
          <div>扣分数</div>
        </li>
        <li @click="clickEvent('2')">
          <div>29 <span>个</span></div>
          <div>路政处罚数</div>
        </li>
      </ul>

      <div id="ZhiFaQingKuangZongTiTongJi_charts"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '执法情况总体统计'
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'planproperty'})
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('ZhiFaQingKuangZongTiTongJi_charts'))
        let xAxisData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        let seriesData = [20, 52, 125, 89, 28, 93, 47, 63, 52, 75, 92, 49]
        let option = {
          tooltip: {
            trigger: 'axis',
            formatter: '{b}月: {c}个'
          },
          grid: {
            left: 0,
            right: 0,
            top: 30,
            bottom: 0,
            containLabel: true
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
          series: [{
            data: seriesData,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(48, 208, 114, 0.35)'
              }
            }
          }]
        }
        myChart.setOption(option)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";

  .ZhiFaQingKuangZongTiTongJi-wrap {

    .ZhiFaQingKuangZongTiTongJi-total {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      li {
        width: 100px;
        height: 92px;
        background: url('../../../static/images/main/qubj.png') center no-repeat;
        div {
          font-size: 28px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          color: $panel-text-highlight-color;
          span {
            font-size: 14px;
            color: $panel-text-color
          }
          &:last-child {
            color: $panel-text-color;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }

    #ZhiFaQingKuangZongTiTongJi_charts {
      margin-bottom: 20px;
      height: 150px;
      width: 330px;
    }
  }
</style>
