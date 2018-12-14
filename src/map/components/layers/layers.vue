<template>
  <tool-panel
    class="layers-wrap"
    id="perimeter-search-panel"
    :header-height="34"
    :header-name="title"
    @close="onClose">
    <div slot="header" class="layers-header"></div>
    <div slot="body" class="layers-panel-content">
      <div class="layers-type" v-for="(l, index) in layers">
        <div class="layers-type-line" v-if="index > 0"></div>
        <span class="layers-type-title-soure"></span>
        <span class="layers-type-title">{{l.name}}</span>
        <ul class="clearfix" :class="l.className" v-if="l.className === 'qx-layer-content'">
          <li v-for="c in l.child" @click="layerClick(c)">
            <span class="name-content" :class="selected === c ? 'layer-selected' : ''">{{c.name}}</span>
          </li>
          <li class="layers-wrap-control">
            <div class="layers-type-line"></div>
            <div class="layers-wrap-slider clearfix" v-show="showSlider">
              <span>透明度</span>
              <el-slider
                :max="100"
                :min="0"
                v-model="opacity"
                :step="1">
              </el-slider>
              <span class="slider-num">{{opacity + '%'}}</span>
            </div>
            <div class="layers-wrap-charts" v-show="showCharts">
              <span class="title">{{chartsType}}</span>
              <span class="title-danwei">{{chartsTypeUnit}}</span>
              <ul class="charts-panel clearfix">
                <li class="chart" v-for="item in charts">
                  <span class="block" :style="{background: 'rgb(' + item.color + ')'}"></span>
                  <span class="value">{{item.value}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="clearfix" :class="l.className" v-else-if="l.className === 'base-layer-content'">
          <li v-for="c in l.child"
              :class="currentBaseLayer === c.code ? 'base-layer-selected' : ''"
              @click="switchLayer(c.code)"
              :style="{background: 'url(static/images/integratedQuery/layers/' + c.code + '.png) no-repeat center'}">
            <span class="name-content">{{c.name}}</span>
          </li>
        </ul>
        <ul class="clearfix" :class="l.className" v-else>
          <li v-for="c in l.child" @click="layerClick(c)">
            <span
              class="name-content"
              :class="selected === c ? 'layer-selected' : ''">{{c.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </tool-panel>
</template>
<script>
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
      this.$http.$Layers.getLayers().then(res => {
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
        this.$Maps.removeLayerByLayerName(this.selected)
        this.$store.dispatch('actionToolPanel', {
          type: '',
          params: ''
        })
      },
      // 图层点击处理
      layerClick (c) {
        this.selected = this.selected === c ? '' : c
      },
      addLayer (item) {
        this.$Maps.removeLayerByLayerName(item['code'])
        if (item && item['parent'] === 'qx-layer-content') {
          let _config = config.overlayLayers['trafficWeather']
          _config['viewparams'] = 'lx:' + item['taskId']
          _config['style'] = 'hnway_trafficWeather_' + item['code']
          if (item['taskId'] !== '10010201') {
            _config['layers'] = 'hnway:trafficWeather_rt'
          } else {
            _config['layers'] = 'hnway:trafficWeather_fcb'
          }
          this.$Maps.createTileWMSLayer(item['code'], _config)
          this.getLengthForLayer(item)
        } else if (item['parent'] === 'feature-layer-content') {
          let featureLayers = config.layerConfig.overlayLayers
          featureLayers.every(_item => {
            if (_item['layerName'] === item['code']) {
              _item['layerParams'] = {
                layers: 'show:' + _item['layerId']
              }
              _item['create'] = true
              _item['addLayer'] = true
              this.$Maps.createTitleLayer(item['code'], _item)
              return false
            } else {
              return true
            }
          })
        }
      },
      getStyle (layerName) {
        if (layerName !== 'GL_GAOS' && layerName !== 'GL_GUOS') {
          let iconSrc = config.layerConfig.getLayerConfigByLayerName(layerName)['showIcon']
          let zoom = this.$Maps.map.getView().getZoom()
          return new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 0.5],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              opacity: 0.75,
              scale: zoom / 23 + 0.1,
              src: iconSrc
            })
          })
        } else {
          return new ol.style.Style({
            stroke: new ol.style.Stroke({
              width: 4,
              color: '#0000EE'
            })
          })
        }
      },
      // 获取图例
      getLengthForLayer (item) {
        if (item['taskId']) {
          this.chartsType = item['name']
          this.chartsTypeUnit = item['unit']
          this.$http.$Layers.getLegendsLayer({
            taskId: item['taskId']
          }).then(res => {
            if (res['data']['successed'] && res['data']['data'].length > 0) {
              this.showCharts = true
              this.charts = res['data']['data']
            }
          })
        }
      },
      // 切换底图
      switchLayer (layerName) {
        if (layerName) {
          this.currentBaseLayer = layerName
          let layers = this.$Maps.getLayersArrayByKeyValue('isBaseLayer', true)
          if (layers_) {
            layers_.forEach(layer => {
              if (layer.get('layerName') === layerName) {
                layer.setVisible(true)
              } else {
                layer.setVisible(false)
              }
            })
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .layers-wrap {
    position: absolute !important;
    top: 20px;
    right: 20px;
    bottom: 20px;
    width: 390px;
    background: #ffffff;
    .layers-header {
      height: 64px;
      margin-top: 0px;
      padding: 0 20px;
      background: url('../../../../static/images/integratedQuery/zhoubian_topbg.png') #1b9de8;
    }
    .layers-panel-content {
      min-height: 100px;
      overflow: hidden;
      padding: 10px 20px;
      .layers-type {
        font-size: 16px;
        ul {
          margin-left: 20px;
          li {
            font-size: 14px;
            .name-content {
              display: inline-block;
              background-color: transparent;
              height: 26px;
              line-height: 26px;
              border-radius: 16px;
              padding: 0px 8px;
              color: #2e2e2e;
            }
          }
        }
        .layers-type-title-soure {
          position: relative;
          top: 2px;
          display: inline-block;
          width: 3px;
          height: 16px;
          background-color: #1b9de8;
        }
        .layers-type-title {
          margin-left: 5px;
          color: #1b9de8;
          text-indent: 30px;
          line-height: 40px;
        }
        .base-layer-content {
          margin-top: -10px;
          li {
            float: left;
            color: #343A42;
            width: 74px;
            height: 74px;
            border: 2px solid #E0D6C3;
            border-radius: 4px;
            margin: 20px 10px 30px 10px;
            text-align: center;
            position: relative;
            span {
              position: absolute;
              width: 100%;
              bottom: -30px;
              font-size: 12px;
              left: 0;
              transition: .3s;
            }
            &:hover {
              cursor: pointer;
            }
          }
        }
        .qx-layer-content {
          li {
            float: left;
            color: #343A42;
            width: 110px;
            line-height: 36px;
            span {
              transition: .3s;
              &:hover {
                cursor: pointer;
                color: #00b8ec;
              }
            }
          }
          .layers-wrap-control {
            width: 100%;
            .layers-wrap-slider {
              .el-slider__button-wrapper {
                top: -18px;
              }
              span {
                margin-left: -10px;
                margin-right: 25px;
                float: left;
                color: #00a2e6;
              }
              .el-slider {
                float: left;
                width: 195px;
              }
              .slider-num {
                margin: 0 0 0 15px;
              }
            }
            .layers-wrap-charts {
              .title {
                margin-left: -10px;
                margin-right: 25px;
                color: #00a2e6;
              }
              .title-danwei {
                color: #3a3a3a;
              }
              .charts-panel {
                margin-bottom: 10px;
                .chart {
                  float: left;
                  color: #3a3a3a;
                  width: 100px;
                  height: 22px;
                  line-height: 22px;
                  .block {
                    display: inline-block;
                    width: 25px;
                    height: 20px;
                  }
                  .value {
                    display: inline-block;
                    width: 25px;
                    height: 20px;
                    line-height: 20px;
                  }
                }
              }
            }
          }
        }
        .feature-layer-content {
          li {
            float: left;
            color: #343A42;
            width: 110px;
            line-height: 36px;
            span {
              transition: .3s;
              &:hover {
                cursor: pointer;
                color: #00b8ec;
              }
            }
          }
        }
        .layer-selected {
          color: #ffffff !important;
          background-color: #1b9de8 !important;
        }
        .base-layer-selected {
          border: 2px solid #1b9de8 !important;
        }
      }
    }
  }
</style>
