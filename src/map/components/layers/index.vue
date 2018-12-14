<template>
  <div class="sf-layers">
    <div class="sf-layers-header">
      <span class="iconfont icon-tuceng"></span>
      <span class="title">图层叠加</span>
      <span @click="onClose" class="titafont tita-guanbi icon-icon16"></span>
    </div>
    <div class="sf-layers-content">
      <ul class="sf-layers-scroll">
        <li class="sf-layers-scroll-li" v-for="item in layers">
          <layer-item v-if="item.className !== 'base-layer-content'" :item="item"></layer-item>
          <base-layer v-else :item="item"></base-layer>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import layerItem from './layerItem'
  import baseLayer from './baseLayer'
  export default {
    name: 'layers',
    data () {
      return {
        title: '图层叠加',
        layers: [],
        selected: '',
        showClose: true,
        currentBaseLayer: 'province',
        showSlider: false,
        showControl: false,
        opacity: 100,
        currentLayer: null,
        showCharts: false,
        charts: [],
        chartsType: '',
        chartsTypeUnit: ''
      }
    },
    mounted () {
      this.$api.getLayers().then(res => {
        if (res.data.success) {
          this.layers = res.data.data
        }
      }).catch(error => {
        console.warn(error)
      })
    },
    watch: {
      selected: function (v, ov) {
        this.currentLayer = null
        if (v && v !== ov) {
          this.showCharts = false
          this.$Maps.removeLayerByLayerName(ov['code'])
          this.addLayer(v)
        } else if (v === ov) {
          this.showCharts = false
          this.$Maps.removeLayerByLayerName(v['code'])
        } else {
          this.showCharts = false
          this.$Maps.removeLayerByLayerName(ov['code'])
        }
      },
      opacity: function (v, ov) {
        if (v && v !== ov) {
          if (this.currentLayer) {
            this.currentLayer.setOpacity(v / 100)
          } else {
            this.currentLayer = this.$Maps.getLayerByLayerName(this.selected['code'])
            if (this.currentLayer) {
              this.currentLayer.setOpacity(v / 100)
            }
          }
        }
      },
      showControl: function (v) {
        if (v && v['value']) {
          this.getLengthForLayer()
        }
      },
      toolPanel: function (v) {
        if (v.event !== '图层叠加' || !v.value) {
          if (this.selected && this.selected['code']) {
            this.$Maps.removeLayerByLayerName(this.selected['code'])
          }
        }
      }
    },
    methods: {
      // 关闭方法
      onClose () {
        this.$store.dispatch('layersState', false)
      }
    },
    components: {
      layerItem,
      baseLayer
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/variables.scss";
  $font-color: #747474;
  $blue-color: #20A1FF;
  .sf-layers {
    position: absolute;
    top: 77px;
    bottom: 20px;
    right: 20px;
    width: 360px;
    padding: 12px;
    background-color: $panel-bg-color;
    border: 1px $panel-border-color solid;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    color: $panel-text-color;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
    z-index: 3;
    &-header {
      height: 22px;
      line-height: 22px;
      color: $panel-text-color;
      .icon-tuceng {
        font-size: 18px;
      }
      .title {
        display: inline-block;
        font-size: 14px;
        margin-left: 5px;
      }
      .icon-icon16 {
        float: right;
        font-size: 14px;
        &:hover {
          cursor: pointer;
          color: $blue-color;
        }
      }
    }
    &-content {
      height: calc(100% - 30px);
      overflow: hidden;
      .sf-layers-scroll {
        height: 100%;
        width: calc(100% + 30px);
        overflow-y: auto;
        overflow-x: hidden;
        &-li {
          position: relative;
          width: calc(100% + 30px);
        }
      }
    }
  }
</style>
