<template>
  <div class="Jiaodiaozhan-traffic-statistic">
    <div class="Jiaodiaozhan-traffic-statistic-left">
      <div class="first">
        <span>{{statistics.GCLC | keepDecimal(0)}}</span>
        <span>公里</span>
      </div>
      <div class="second">
        <span class="span-left">观测总里程</span>
      </div>
    </div>
    <div class="Jiaodiaozhan-traffic-statistic-right">
      <div class="first">
        <span>{{statistics.YZGCLC | keepDecimal(0)}}</span>
        <span>公里</span>
        <!--<span class="waring-color">{{(statistics.YZGCLC / statistics.GCLC * 100) | keepDecimal(0)}}%</span>-->
      </div>
      <div class="second">
        <span class="span-right">超过最大适应量</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .Jiaodiaozhan-traffic-statistic {
    width: 100%;
    display: flex;
    .Jiaodiaozhan-traffic-statistic-left, .Jiaodiaozhan-traffic-statistic-right {
      height: 100%;
      flex: 1;
      text-align: center;
      .first {
        font-family: MicrosoftYaHei;
        line-height: 30px;
        span:nth-child(1) {
          font-size: 22px;
          font-weight: normal;
        }
        span:nth-child(2) {
          font-size: 14px;
        }
        span:nth-child(3) {
          font-size: 20px;
          font-weight: normal;
        }
      }
      .second {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        line-height: 30px;
        .span-left {
          color: rgb(64, 158, 255)
        }
        .span-right {
          color: rgb(241, 43, 43)
        }
      }
    }
  }
</style>
<script>
  import { mapState } from 'vuex'
  export default {
    props: {},
    data () {
      return {
        loading: false,
        lxlx: '1,2',
        statistics: {
          GCLC: 0,
          YZGCLC: 0
        }
      }
    },
    computed: {
      ...mapState({
        roadType: state => state.roadWatch.lxType,
        loadMapSuccess: state => state.map.loadMapSuccess,
        refreshTimer: state => state.map.refreshTimer
      })
    },
    mounted () {
      if (this.$store.getters.lxType.value) {
        this.lxlx = this.$store.getters.lxType.value
      }
      this.getStatic()
    },
    watch: {
      roadType (val) {
        this.lxlx = val.value
        this.getStatic()
      },
      refreshTimer (value) {
        if (value && value.state) {
          this.getStatic()
        }
      }
    },
    methods: {
      getStatic () {
        this.loading = true
        this.$fetch.getStationStatistic({
          lxlx: this.lxlx
        }).then(res => {
          this.loading = false
          if (res && res.result) {
            this.statistics = res.result
          } else {
            this.statistics = {
              GCLC: 0,
              YZGCLC: 0
            }
          }
        }).catch(error => {
          this.loading = false
          console.error(error)
        })
      }
    },
    components: {}
  }
</script>
