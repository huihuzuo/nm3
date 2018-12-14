<template>
  <div class="Luwan-event-statistics" v-loading="loading">
    <div class="statistics-item" v-for="item in statistics">
      <span>{{item.label}}</span><span>{{item.amount}}</span><span>{{item.unit}}</span>
    </div>
    <div class="line"></div>
  </div>
</template>
<style lang="scss">
  .Luwan-event-statistics {
    width: 100%;
    height: 120px;
    margin-left:10px;
    .line{
      margin-top:-30px;
      float:left;
      width:260px;
      //height:1px;
      border:0.5px dashed rgb(229,229,229);
    }
    .statistics-item {
      float: left;
      width: 50%;
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-family: PingFang-SC-Regular;
      //padding-right: 10px;
      span:nth-child(1), span:nth-child(3) {
        font-size: 13px;
        color: rgb(45,47,51);
      }
      span:nth-child(2) {
        font-size: 13px;
        margin: 0 5px;
      }
    }
    .el-loading-mask {
      background-color: rgba(2, 24, 34, 0.73)!important;
    }
  }
</style>
<script>
  import { mapState } from 'vuex'
  export default {
    props: {},
    data () {
      return {
        loading: true,
        statistics: [],
        lxlx: '1,2'
      }
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
    methods: {
      getStatic () {
        this.loading = true
        this.$fetch.getRoadEventsStatistic({
          lxlx: this.lxlx
        }).then(res => {
          this.loading = false
          if (res && res.result) {
            this.statistics = res.result.map(item => {
              item.unit = '起'
              return item
            })
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

