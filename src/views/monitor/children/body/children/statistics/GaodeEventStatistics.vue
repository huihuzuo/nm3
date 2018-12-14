<template>
  <div class="Gaode-event-statistics clearfix" v-loading="loading">
    <div class="statistics-item" v-for="item in statistics">
      <span>{{item.label}}</span><span>{{item.count}}</span><span>起</span>
    </div>
  </div>
</template>
<style lang="scss">
  .Gaode-event-statistics {
    width: 100%;
    height: 86px;
    margin-left:19px;
    .statistics-item {
      float: left;
      width: 50%;
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-family: PingFang-SC-Regular;
      //padding-left: 25px;
      span:nth-child(1), span:nth-child(3) {
        font-size: 13px;
        color: rgb(45,47,51);
      }
      span:nth-child(2) {
        font-size: 13px;
        margin: 0 10px;
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
        statistics: [],
        loading: true,
        lxlx: '1,2'
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
      this.GaodeTypeList()
    },
    watch: {
      roadType (val) {
        this.lxlx = val.value
        this.GaodeTypeList()
      },
      refreshTimer (value) {
        if (value && value.state) {
          this.GaodeTypeList()
        }
      }
    },
    methods: {
      GaodeTypeList: function () {
        this.loading = true
        this.$fetch.getGaodeEventList({
          lxlx: this.lxlx,
          currentPageNum: this.current,
          perPageSize: this.limit
        }).then(res => {
          this.loading = false
          this.statistics = res.data.type
        }).catch(error => {
          this.loading = false
          console.error(error)
        })
      }
    },
    components: {}
  }
</script>
