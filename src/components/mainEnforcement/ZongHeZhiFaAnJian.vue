<template>
  <div class="main-panel-wrap ZongHeZhiFaAnJian-wrap">
    <div class="main-panel-header">
      <span>{{title}}</span>
      <span class="main-panel-timer">（更新：17:50）</span>
      <!--<span class="main-panel-more iconfont icon-yuntaikongzhi-you"  @click="detailgoto()"></span>-->
    </div>
    <div class="main-panel-body">
      <div class="ZongHeZhiFaAnJian-wrap-pie">
        <div id="ZongHeZhiFaAnJian_charts"></div>
      </div>
      <div class="ZongHeZhiFaAnJian-wrap-statistic">
        <div><span>1044</span><span>个</span></div>
        <div>超限执法总数</div>
      </div>
      <div class="ZongHeZhiFaAnJian-wrap-legend">
        <ul>
          <li><span style="background-color: #76E842;"></span><span>水路综合</span><span>574</span>个</li>
          <li><span style="background-color: #6EFEFF;"></span><span>运政合计</span><span>362</span>个</li>
          <li><span style="background-color: #FAF277;"></span><span>路政违法</span><span>58</span>个</li>
          <li><span style="background-color: #F0B14B;"></span><span>路政超限超载</span><span>3</span>个</li>
          <li><span style="background-color: #FE5700;"></span><span>其他</span><span>1</span>个</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '综合执法案件'
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      detailgoto () {
        this.$router.push({name: 'ZongHeZhiFaAnJian'})
      },
      initChart () {
        let myChart = this.$echarts.init(document.getElementById('ZongHeZhiFaAnJian_charts'))
        let seriesData = [
          {value: 574.509, name: '优'},
          {value: 362.575, name: '良'},
          {value: 58.033, name: '中'},
          {value: 3.678, name: '次'},
          {value: 1.205, name: '差'}
        ]
        let option = {
          title: {
            textStyle: {
              fontSize: 30,
              color: '#fff'
            },
            subtext: '62%',
            subtextStyle: {
              fontSize: 14,
              color: '#50afff'
            },
            x: '36%',
            y: '37%'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          color: ['#78e138', '#60fce8', '#f6f072', '#ffab52', '#fc5401'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '60%'],
              center: ['50%', '50%'],
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
  .ZongHeZhiFaAnJian-wrap {
    width: 320px !important;
    .ZongHeZhiFaAnJian-wrap-pie{
      width: 50%;
      height: 135px;
      float: left;
      #ZongHeZhiFaAnJian_charts {
        height: 100%;
        width: 100%;
      }
    }
    .ZongHeZhiFaAnJian-wrap-statistic{
      width: 50%;
      height: 135px;
      float: left;
      div:nth-child(1){
        text-align: left;
        margin-top: 30px;
        span{
          display: inline-block;
        }
        span:nth-child(1){
          font-size: 48px;
        }
        span:nth-child(2){
          margin-left: 5px;
          color: #E3E3E3;
        }
      }
      div:nth-child(2){
        text-align: center;
        font-size: 18px;
      }
    }
    .ZongHeZhiFaAnJian-wrap-legend{
      ul{
        li{
          float: left;
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          span{
            display: inline-block;
          }
          span:nth-child(1){
            width: 10px;
            height: 10px;
            background-color: red;
            margin-right: 5px;
          }
          span:nth-child(2){
            margin-right: 5px;
          }
          span:nth-child(3){
            padding: 0 5px 0 0;
            height: 40px;
            font-size:16px;
          }
        }
      }
    }
  }
</style>
