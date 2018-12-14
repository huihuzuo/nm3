<template>
  <div class="Baidu-traffic-static" v-loading="loading">
    <div class="Baidu-traffic-static-span" v-for="(item, index) in legends">
      <div class="static-num">
        <span>{{item.ydlc}}</span>
        <span>km</span>
      </div>
      <div class="static-title" :style="classObject(item)">{{item.lable}}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .Baidu-traffic-static{
    padding: 0 10px;
    display: flex;
    .Baidu-traffic-static-span{
      //flex: 1;
      .static-num{
        text-align: center;
        span:nth-child(1){
          font-size: 22px;
          font-family: 'MicrosoftYaHei';
        }
        span:nth-child(2){
          font-size: 14px;
          font-family: 'MicrosoftYaHei';
          color:rgb(43,43,43);
        }
        span:nth-child(3){
          font-size: 12px;
          font-family: 'PingFang-SC-Regular';
          color: #7adaff;
        }
      }
      .static-title{
        width: 70px;
        height: 23px;
        margin: 8px 8px;
        border-radius: 2px;
        line-height: 23px;
        text-align: center;
        color: #fff;
        font-size:12px
      }
    }
  }
</style>
<script>
  import { mapState } from 'vuex'
  import pager from '@/components/common/pager'
  import noData from '@/components/common/noData'
  import miniPanel from '@/components/panels/miniPanel'
  const layerName = 'BaiduTrafficPoint'
  export default {
    data () {
      return {
        legends: [],
        lxlx: '1,2',
        loading: true
      }
    },
    mounted () {
      if (this.$store.getters.lxType.value) {
        this.lxlx = this.$store.getters.lxType.value
      }
      this.loadStatic()
    },
    computed: {
      ...mapState({
        roadType: state => state.roadWatch.lxType,
        loadMapSuccess: state => state.map.loadMapSuccess,
        refreshTimer: state => state.map.refreshTimer
      })
    },
    watch: {
      refreshTimer (value) {
        if (value && value.state) {
          this.loadStatic()
        }
      },
      roadType (val) {
        this.lxlx = val.value
        this.loadStatic()
      }
    },
    methods: {
      loadStatic () {
        this.loading = true
        this.$fetch.loadBaiduTrafficStatic({
          lxlx: this.lxlx
        }).then(res => {
          this.loading = false
          if (res.data.length > 3) {
            this.legends = res.data.slice(0, 3)
          } else {
            this.legends = res.data
          }
        }).catch(error => {
          console.warn(error)
        })
      },
      classObject (item) {
        switch (item.status) {
          case 4:
            return {
              // 'border': '2px #b40000 solid',
              'background-color': 'rgb(187,0,0)'
            }
          case 3:
            return {
              // 'border': '2px #e80e0e solid',
              'background-color': 'rgb(241,43,43)'
            }
          case 2:
            return {
              // 'border': '2px #ffd045 solid',
              'background-color': 'rgb(255,157,21)'
            }
        }
      }
    },
    destroyed () {
      if (!this.$Maps) return
      let layer = this.$Maps.getLayerByLayerName(layerName)
      if (layer) {
        this.$Maps.removeFeatureByLayerName(layerName)
      }
    },
    components: {
      pager,
      noData,
      miniPanel
    }
  }
</script>
