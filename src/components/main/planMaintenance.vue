<template>
  <panel-mini position="right" :show-switch="true" :show-close="false" class="plan-wrap">
    <div slot="head">
      <div>
        养护里程：<span><countTo :startVal="0" :endVal='Math.round(350)' :duration='3000'></countTo></span> 公里
      </div>
    </div>
    <div class="plan-body" slot="body">
      <div class="yhfg">
        <div class="yhfgCon" v-for="(i, index) in yhfgData">
          <div class="yhfgLeft" v-if="(index + 1) % 2 !== 0">
            <div class="yhfgLeft-img iconfont" :class="'iconfont icon-' + i.icon">
              <img :src="i.src">
            </div>
            <div class="yhfgLeftInfo" :class="{true:'yhfgLeftInfo-zh', false:'yhfgLeftInfo-normal'}[i.alias == 'zh']">
              <p>
                <span class="yhfgLeftInfo-title">{{i.title}}</span>
                <span class="yhfgLeftInfo-count">{{i.count}}</span>
                <span class="yhfgLeftInfo-unit">起</span>
              </p>
              <p>
                <span class="yhfgLeftInfo-mileage">{{i.mileage}}</span>
                <span class="yhfgLeftInfo-unit">公里</span>
              </p>
            </div>
          </div>
          <div class="yhfgRight" v-if="(index + 1) % 2 === 0">
            <div class="yhfgRight-img iconfont" :class="'iconfont icon-' + i.icon">
              <img :src="i.src">
            </div>
            <div class="yhfgLeftInfo" :class="{true:'yhfgLeftInfo-zh', false:'yhfgLeftInfo-normal'}[i.alias == 'zh']">
              <p>
                <span class="yhfgLeftInfo-title">{{i.title}}</span>
                <span class="yhfgLeftInfo-count">{{i.count}}</span>
                <span class="yhfgLeftInfo-unit">起</span>
              </p>
              <p>
                <span class="yhfgLeftInfo-mileage">{{i.mileage}}</span>
                <span class="yhfgLeftInfo-unit">公里</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </panel-mini>

</template>
<script>
  import panelMini from '../panels/panelMini'
  export default {
    data () {
      return {
        yhfgData: [
          {
            alias: 'zh',
            icon: 'zaihui',
            src: 'static/images/syzh.png',
            title: '灾毁',
            count: 24,
            mileage: 20
          },
          {
            alias: 'dx',
            icon: 'daxiu',
            src: 'static/images/sydx.png',
            title: '大修',
            count: 24,
            mileage: 20
          },
          {
            alias: 'zx',
            icon: 'zhongxiu',
            src: 'static/images/syzx.png',
            title: '中修',
            count: 24,
            mileage: 20
          },
          {
            alias: 'gj',
            icon: 'gaijian',
            src: 'static/images/sygj.png',
            title: '改建',
            count: 24,
            mileage: 20
          },
          {
            alias: 'yfx',
            icon: 'yufangxing',
            src: 'static/images/syyfx.png',
            title: '预防性',
            count: 24,
            mileage: 20
          }
        ]
      }
    },
    computed: {
    },
    watch: {
    },
    mounted () {
    },
    methods: {
    },
    components: {
      panelMini
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";
  .plan-wrap {
    .yhfg{
      margin: 10px auto;
      overflow: hidden;
      .yhfgCon{
        overflow: hidden;
        width: 100%;
        margin: 5px 0;
        .yhfgLeft{
          .yhfgLeft-img{
            float: left;
            width: 40px;
            height: 40px;
            margin: 0 20px;
            font-size: 28px;
            color: #1c8de0;
            line-height: 50px;
            text-align: center;
            background: #143358;
            border-radius: 50px;
          }
          .yhfgLeftInfo{
            float: left;
            p{
              font-size: 14px;
              text-align: right;
              line-height: 20px;
              height: 20px;
              span{
                display: inline-block;
              }
              .yhfgLeftInfo-title{
                color: $panel-text-color;
                font-size: 14px;
              }
              .yhfgLeftInfo-unit{
                color: $panel-text-color;
                font-size: 12px;
              }
            }
            p:nth-child(2){
              float: left;
            }
          }
          .yhfgLeftInfo-zh{
            .yhfgLeftInfo-count{
              color: #ff0402;
              font-size: 18px;
            }
            .yhfgLeftInfo-mileage{
              color: #ff0402;
              font-size: 18px;
            }
          }
          .yhfgLeftInfo-normal{
            .yhfgLeftInfo-count{
              color: #fff;
              font-size: 16px;
            }
            .yhfgLeftInfo-mileage{
              color: #fff;
              font-size: 16px;
            }
          }
        }
        .yhfgRight{
          .yhfgRight-img{
            float: right;
            width: 40px;
            height: 40px;
            margin: 0 20px;
            font-size: 28px;
            color: #1c8de0;
            line-height: 50px;
            text-align: center;
            background: #143358;
            border-radius: 50px;
          }
          .yhfgLeftInfo{
            float: right;
            p{
              font-size: 14px;
              text-align: right;
              line-height: 20px;
              height: 20px;
              span{
                display: inline-block;
              }
              .yhfgLeftInfo-title{
                color: $panel-text-color;
                font-size: 14px;
              }
              .yhfgLeftInfo-unit{
                color: $panel-text-color;
                font-size: 12px;
              }
            }
            p:nth-child(2){
              float: right;
            }
          }
          .yhfgLeftInfo-zh{
            .yhfgLeftInfo-count{
              color: #ff0402;
              font-size: 16px;
            }
            .yhfgLeftInfo-mileage{
              color: #ff0402;
              font-size: 18px;
            }
          }
          .yhfgLeftInfo-normal{
            .yhfgLeftInfo-count{
              color: #fff;
              font-size: 16px;
            }
            .yhfgLeftInfo-mileage{
              color: #fff;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
