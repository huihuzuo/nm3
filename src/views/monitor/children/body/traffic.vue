<template>
  <div class="traffic-index">
    <div class="traffic-header">
      <statistical-button :btnArray="btnArray" :isDefaultLook="true" @click-item="clickItem"></statistical-button>
    </div>
    <div class="traffic-content">
      <div class="Baidu-traffic-wrap" v-if="currentItem === '百度'">
        <div class="Baidu-traffic-static-wrap">
          <mini-panel :className="'Baidu-traffic-wrap-mini-panel'">
            <baidu-traffic-static></baidu-traffic-static>
          </mini-panel>
        </div>
        <mini-panel :className="'Baidu-traffic-wrap-mini-panel'">
          <baidu-traffic-list class="Baidu-traffic-list" :height="height"></baidu-traffic-list>
        </mini-panel>
      </div>
      <div class="Gaode-traffic-wrap" v-if="currentItem === '高德'">
        <mini-panel :className="'Gaode-traffic-wrap-mini-panel'">
          <gaode-traffic-list class="Gaode-traffic-list" :height="height"></gaode-traffic-list>
        </mini-panel>
      </div>
      <div class="Jiaodiaozhan-traffic-wrap" v-if="currentItem === '交调站'">
        <mini-panel :className="'Jiaodiaozhan-traffic-wrap-mini-panel-statistic'">
          <jiaodiaozhan-traffic-statistic class="Jiaodiaozhan-traffic-statistic"></jiaodiaozhan-traffic-statistic>
        </mini-panel>
        <mini-panel :className="'Jiaodiaozhan-traffic-wrap-mini-panel-list'">
          <jiaodiaozhan-traffic-list class="Jiaodiaozhan-traffic-list" :height="height"></jiaodiaozhan-traffic-list>
        </mini-panel>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .traffic-index {
    width: 100%;
    height: 100%;
    .traffic-header {
      width: calc(100% - 2px);
      height: 30px;
      margin-top:10px;
      border-radius:2px;
    }
    .traffic-content {
      width: 100%;
      height: calc(100% - 38px);
      .Baidu-traffic-wrap, .Gaode-traffic-wrap, .Jiaodiaozhan-traffic-wrap {
        width: 100%;
        height: 100%;
      }
      .Baidu-traffic-wrap {
        .Baidu-traffic-static-wrap{
          width: 100%;
        }
        .Baidu-traffic-list {
          width: 100%;
          height: 100%;
        }
      }
      .Gaode-traffic-wrap {
        .Gaode-traffic-list {
          width: 100%;
          height: 100%;
        }
      }
      .Jiaodiaozhan-traffic-wrap {
        .Jiaodiaozhan-traffic-list {
          width: 100%;
          height: calc(100% - 142px);
        }
      }
    }
  }
</style>
<script>
  import statisticalButton from '@/components/common/statisticalButton'
  import miniPanel from '@/components/panels/miniPanel'
  import BaiduTrafficList from './children/list/BaiduTrafficList'
  import BaiduTrafficStatic from './children/statistics/BaiduTrafficStatic'
  import GaodeTrafficList from './children/list/GaodeTrafficList'
  import JiaodiaozhanTrafficList from './children/list/JiaodiaozhanTrafficList'
  import JiaodiaozhanTrafficStatistic from './children/statistics/JiaodiaozhanTrafficStatistic'
  export default {
    props: {},
    data () {
      return {
        btnArray: [],
        currentItem: null
      }
    },
    mounted () {
      this.trafficHead()
    },
    watch: {},
    methods: {
      clickItem: function (item) {
        this.currentItem = item.label
        this.$store.dispatch('isShow', false)
        switch (this.currentItem) {
          case '百度':
            this.height = document.querySelector('.traffic-content').offsetHeight - 56 - 103 + 35
            break
          case '高德':
            this.height = document.querySelector('.traffic-content').offsetHeight - 56 + 24 + 15
            break
           case '交调站':
             this.height = document.querySelector('.traffic-content').offsetHeight - 56 - 142 + 86
             break
        }
      },
      trafficHead () {
        this.$fetch.trafficHead().then(res => {
          this.btnArray = res
        }).catch(error => {
          console.warn(error)
        })
      }
    },
    components: {
      statisticalButton,
      miniPanel,
      BaiduTrafficList,
      BaiduTrafficStatic,
      GaodeTrafficList,
      JiaodiaozhanTrafficList,
      JiaodiaozhanTrafficStatistic
    }
  }
</script>
