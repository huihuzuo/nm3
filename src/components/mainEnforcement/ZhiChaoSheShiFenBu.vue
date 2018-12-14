<template>
  <div class="main-panel-wrap ZhiChaoSheShiFenBu-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:30）</span>
      <span class="main-panel-more titafont tita-gengduo" @click="detailgoto"></span>
    </div>
    <div class="main-panel-body">
      <div id="ZhiChaoSheShiFenBu_charts"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '治超设施分布'
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
        let myChart = this.$echarts.init(document.getElementById('ZhiChaoSheShiFenBu_charts'))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#78e138', '#a1e8d8', '#737afc', '#f1a923', '#21a5f7', '#f6f072'],
          legend: {
            x: 'center',
            y: 'bottom',
            itemWidth: 12,
            itemHeight: 12,
            textStyle: {
              color: '#50afff',
              fontSize: 14
            },
            data: ['国定治超站', '流动治超站', '记重收费站', '入口检测站', '源头治超站', '非现场站']
          },
          series: [
            {
              name: '治超设施分布',
              type: 'pie',
              radius: [20, 80],
              center: ['50%', '40%'],
              roseType: 'radius',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: [
                {value: 10, name: '国定治超站'},
                {value: 5, name: '流动治超站'},
                {value: 15, name: '记重收费站'},
                {value: 25, name: '入口检测站'},
                {value: 20, name: '源头治超站'},
                {value: 35, name: '非现场站'}
              ]
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

  .ZhiChaoSheShiFenBu-wrap {
    #ZhiChaoSheShiFenBu_charts {
      margin-top: 30px;
      height: 230px;
      width: 330px;
    }
  }
</style>
