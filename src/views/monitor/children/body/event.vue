<template>
  <div class="event-index">
    <div class="event-header">
      <statistical-button :btnArray="btnArray" :isDefaultLook="true" @click-item="clickItem"></statistical-button>
    </div>
    <div class="event-content">
      <div class="Luwan-event-wrap" v-if="currentItem === '路网事件'">
        <mini-panel :className="'Luwan-event-wrap-mini-panel-statistic'">
          <luwan-event-statistic></luwan-event-statistic>
        </mini-panel>
        <mini-panel class="mini-panel-list" :className="'Luwan-event-wrap-mini-panel-list'">
          <luwan-event-list :height="height"></luwan-event-list>
        </mini-panel>
      </div>
      <div class="Gaode-event-wrap" v-if="currentItem === '互联网事件'">
        <mini-panel :className="'Gaode-event-wrap-mini-panel-statistic'">
          <gaode-event-statistics></gaode-event-statistics>
        </mini-panel>
        <mini-panel class="mini-panel-list" :className="'Gaode-event-wrap-mini-panel-list'">
          <gaode-event-list :height="height"></gaode-event-list>
        </mini-panel>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .event-index {
    width: 100%;
    height: 100%;
    .event-header {
      width: 100%;
      height: 30px;
    }
    .event-content {
      width: 100%;
      height: calc(100% - 30px);
      .Luwan-event-wrap {
        width: 100%;
        height: 100%;
        .mini-panel-list {
          width: 100%;
          height: calc(100% - 190px);
        }
      }
      .Gaode-event-wrap {
        width: 100%;
        height: 100%;
        .mini-panel-list {
          width: 100%;
          height: calc(100% - 190px);
        }
      }
    }
  }
</style>
<script>
  import statisticalButton from '@/components/common/statisticalButton'
  import miniPanel from '@/components/panels/miniPanel'
  import LuwanEventList from './children/list/LuwanEventList'
  import GaodeEventList from './children/list/GaodeEventList'
  import LuwanEventStatistic from './children/statistics/LuwanEventStatistic'
  import GaodeEventStatistics from './children/statistics/GaodeEventStatistics'

  /*import JiaodiaozhanStatistics from './children/statistics/JiaodiaozhanTrafficStatistic'
  import JiaodiaozhanEventList from './children/list/JiaodiaozhanTrafficList'*/
  export default {
    props: {},
    data () {
      return {
        btnArray: [],
        currentItem: null
      }
    },
    mounted () {
      this.eventHead()
    },
    watch: {},
    methods: {
      clickItem: function (item) {
        this.currentItem = item.label
        this.$store.dispatch('isShow', false)
        switch (this.currentItem) {
          case '路网事件':
            this.height = document.querySelector('.event-content').offsetHeight - 190 - 56 + 24 + 41
            break
          case '互联网事件':
            this.height = document.querySelector('.event-content').offsetHeight - 190 - 56 + 24 + 75
            break
        }
      },
      eventHead () {
        this.$fetch.eventHead().then(res => {
          this.btnArray = res
        }).catch(error => {
          console.warn(error)
        })
      }
    },
    components: {
      statisticalButton,
      miniPanel,
      LuwanEventList,
      GaodeEventList,
      LuwanEventStatistic,
      GaodeEventStatistics,

      /*JiaodiaozhanTrafficStatistic,
      JiaodiaozhanTrafficList*/
    }
  }
</script>
