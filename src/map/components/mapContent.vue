<template>
  <div class="sf-map-content">
    <div :id="id" class="sf-map-content-map" oncontextmenu="return false"></div>
    <usr-tool></usr-tool>
    <top-tool v-if="toolBoxType === 'warning'"></top-tool>
    <layer-switcher></layer-switcher>
    <layer-control v-if="showLayerControl.state" :item="showLayerControl.item"></layer-control>
    <timer :style="getStyle"></timer>
  </div>
</template>
<style lang="scss">
  @import url(../../assets/scss/common/aniPoint.scss);
  @import "../../assets/variables.scss";

  .sf-map-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .sf-map-content-map {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .hmap-scale-line-control {
        position: absolute;
        bottom: 10px;
        left: auto;
        right: 90px;
        border-radius: 4px;
        padding: 2px;
        transition: .3s;
      }
      .hmap-control-zoom {
        bottom: 0.6rem;
        height: 160px !important;
        right: 10px;
        span {
          line-height: 20px !important;
          background: $panel-bg-color;
          color: #437FA0;
          cursor: pointer;
          &:hover {
            color: #5ED0FA !important;
          }
        }
        .zoom-in {
          border-bottom: 1px solid $panel-border-color !important;
        }
      }
      .ol-overlay-container {
        .overlay-point-content {
          .icon-dingwei1 {
            span {
              position: absolute;
              font-size: 13px;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 32px;
              color: #ffffff;
            }
          }
        }
      }
      .hmap-js-popup {
        padding: 0;
        border-radius: 3px;
        border: none;
        box-sizing: border-box;
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
        pointer-events: auto;
        background: $panel-bg-color;
        &:before {
          display: none;
          position: absolute;
          bottom: -26px;
          left: 35%;
          content: '';
          border-left: 0 solid transparent;
          border-right: 22px solid transparent;
          border-top: 26px solid $panel-bg-color;
          transform: translate(-50%, 0)
        }
        &:after {
          display: none;
          position: absolute;
          bottom: -25px;
          left: 35%;
          content: '';
          border-left: 0px solid transparent;
          border-right: 22px solid transparent;
          border-top: 26px solid $panel-bg-color;
        }
      }
      .hmap-context-menu-content {
        padding: 0;
        box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
        overflow: hidden;
        &-content-ul-inner {
          li {
            background-color: rgba(0, 0, 0, 0) !important;
            color: #b8deff !important;
            box-shadow: inset 0 0 12px 0 #50afff!important;
          }
        }
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import layers from './layers'
  import usrTool from './usrTool'
  import topTool from './topTool'
  import contextMenu from '../mixin/contextMenu'
  import popover from '../mixin/popover'
  import layerSwitcher from './controls/layerSwitcher'
  import layerControl from './controls/layerControl'
  import timer from './timer'
  import PerimeterSearch from '@/mixin/perimeterSearch'
  export default {
    data () {
      return {
        menu: null,
        measureTool: null,
        plotFeature: null,
        eventFeature: null,
        sort: 0,
        toolBoxType: ''
      }
    },
    props: {
      showLeft: {
        type: Boolean
      },
      mapConfig: {
        type: Object,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    watch: {
      mapConfig (v) {
        this.initMap()
      }
    },
    mixins: [contextMenu, popover, PerimeterSearch],
    mounted () {
      this.$store.dispatch('actionMapState', false)
      this.$fetch.getMapParams(config.mapconfig).then(_config => {
        this.initMap(_config)
      }).catch(error => {
        console.error(error)
      })
      if (this.$route) {
        this.switchToolBox(this.$route.name)
      }
    },
    computed: {
      ...mapState({
        toolPanel: state => state.map.toolPanel,
        showLayerControl: state => state.map.showLayerControl
      }),
      getStyle () {
        return this.$refs.indexLeft
      }
    },
    methods: {
      getBaseLayers () {
        if (!this.baseLayers) {
          this.baseLayers = this.$Maps.getBaseLayers()
        }
        return this.baseLayers
      },
      initMap (config) {
        const Maps = new HMap(this.id, config)
        Maps.on('loadMapSuccess', event => {
          if (event) {
            this.$store.dispatch('actionMapState', true)
            config.Maps = Maps
            Vue.prototype.$Maps = Maps
            Maps.on('overlay:onmouseleft', this.featureSelectHandle, this)
            this.addPointEvents()
            this.addContextMenu()
            this.onEvent()
          } else {
            this.$store.dispatch('actionMapState', false)
            throw new Error('地图加载失败！')
          }
        })
      },
      addPointEvents () {
        let sel = new ol.interaction.PointerEvents()
        this.$Maps.addInteraction(sel)
        this.removeSelectInteraction()
      },
      featureSelectHandle (event) {
        if (event.type === 'overlay:onmouseleft') {
          this.showPopover(event.type, event.value)
        }
      },
      removeSelectInteraction () {
        if (this.$Maps.selectInteraction) {
          this.$Maps.removeInteraction(this.$Maps.selectInteraction)
          this.$Maps.selectInteraction = null
        }
      },
      switchToolBox (type) {
        this.toolBoxType = type
      }
    },
    components: {
      timer,
      layers,
      topTool,
      usrTool,
      layerSwitcher,
      layerControl
    }
  }
</script>
