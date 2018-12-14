<template>
  <div class="sf-plot clearfix">
    <ul class="sf-plot-tools">
      <li class="iconfont icon-jichusheshijiance save-button" @click="getFeatures"></li>
      <li style="font-size: 14px" class="titafont tita-icon16" @click="onClose"></li>
    </ul>
    <div class="sf-plot-content">
      <plot-header
        :tools="tools"
        @selected="selectPlot"></plot-header>
      <div
        class="sf-plot-edit"
        v-show="selected.alias && selected.alias !== 'Popover' && selected.alias !== 'Point'">
        <h4 class="sf-plot-edit-header">{{selected.name}}</h4>
        <div class="sf-plot-edit-content">
          <div class="plot-edit-color">
            <span class="stration span-background">背景色</span>
            <el-color-picker v-model="backgroundColor"></el-color-picker>
            <span class="stration span-border">边框色</span>
            <el-color-picker v-model="borderColor"></el-color-picker>
          </div>
          <div class="plot-edit-title">边框线宽</div>
          <div class="plot-edit-line">
            <el-slider v-model="borderWidth" :min=0 :max=10 :step=1></el-slider>
          </div>

          <div class="plot-edit-title">透明度</div>
          <div class="plot-edit-line">
            <el-slider v-model="opacity" :min=0 :max=1 :step=0.1></el-slider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import plotHeader from './header'
  export default {
    name: 'plot',
    data () {
      return {
        tools: [],
        selected: {},
        backgroundColor: '#20a0ff',
        borderColor: '#20a0ff',
        borderWidth: 1,
        opacity: 1,
        plot: null
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      borderWidth (newVal) {
        this.plot.plotUtils.setBorderWidth(this.plot.plotEdit.activePlot, newVal)
      },
      opacity (newVal) {
        this.plot.plotUtils.setOpacity(this.plot.plotEdit.activePlot, newVal)
      },
      backgroundColor (v) {
        this.plot.plotUtils.setBackgroundColor(this.plot.plotEdit.activePlot, v)
      },
      borderColor (v) {
        this.plot.plotUtils.setBorderColor(this.plot.plotEdit.activePlot, v)
      }
    },
    methods: {
      init () {
        this.$api.getListPolt().then(res => {
          this.tools = res.data
          this.initPlot()
        })
      },
      selectPlot (item) {
        this.selected = item
        this.plot.plotEdit.deactivate()
        this.plot.plotDraw.active(item['alias'])
      },
      initPlot () {
        /* eslint-disable no-undef */
        /* eslint-disable new-cap */
        this.plot = new olPlot(this.$Maps.getMap())
        Vue.prototype.$Plot = this.plot
        this.plot.plotDraw.drawLayer.setStyle(new ol.style.Factory({
          fill: {
            fillColor: '#8BA2E4'
          },
          stroke: {
            strokeColor: '#1B9DE8',
            strokeWidth: 2.5
          },
          image: {
            type: 'icon',
            image: {
              imageAnchor: [0.5, 0.5],
              imageAnchorXUnits: 'fraction',
              imageAnchorYUnits: 'fraction',
              imageOpacity: 0.75,
              imageSrc: './static/images/plot/a.png'
            }
          }
        }))
        this.plot.plotDraw.on('drawEnd', this.onDrawEnd_, this)
        this.$Maps.on('click', this.handleClick_, this)
      },
      onDrawEnd_ (event) {
        let feature = event.feature
        // 开始编辑
        if (feature && feature instanceof ol.Feature) {
          this.plot.plotEdit.activate(feature)
        }
      },
      changeSelectedItem (item) {
        this.selected = item['alias']
        if (item['alias']) {
          this.plot.plotEdit.deactivate()
          this.plot.plotDraw.active(item['alias'])
        } else {
          console.warn('不存在的标绘类型！')
        }
      },
      handleClick_ (event) {
        let feature = this.$Maps.forEachFeatureAtPixel(event.pixel, function (feature) {
          return feature
        })
        if (feature && feature.get('isPlot') && !this.plot.plotDraw.isDrawing()) {
          this.plot.plotEdit.activate(feature)
          this.activeToolPanel(feature)
          let style = this.plot.plotUtils.getStyleCode(feature)
          this.refreshe(style)
        } else {
          this.plot.plotEdit.deactivate()
        }
      },
      // 激活对应的编辑面板
      activeToolPanel (feature) {
        if (feature && feature.getProperties() && feature.getProperties().hasOwnProperty('plotType')) {
          let type = feature.getProperties()['plotType']
          if (type) {
            let _type = this.tools.filter(item => {
              return item.alias === type
            })
            if (_type && _type.length > 0) {
              this.selected = _type[0]
            }
          }
        }
      },
      // 刷新对应数据
      refreshe (style) {
        if (style) {
          if (style['fill']) {
            this.opacity = style['fill']['opacity'] || this.opacity
            this.backgroundColor = style['fill']['fillColor'] || this.backgroundColor
          }
          if (style['stroke']) {
            this.borderWidth = style['stroke']['strokeWidth'] || this.borderWidth
            this.borderColor = style['stroke']['strokeColor'] || this.borderColor
          }
        }
      },
      getFeatures () {
        const features = this.plot.plotUtils.getFeatures()
        console.log(features)
      },
      onClose () {
        this.$Maps.un('click', this.handleClick_, this)
        this.$store.dispatch('actionToolPanel', {
          type: '',
          params: ''
        })
      }
    },
    components: {
      plotHeader
    }
  }
</script>

<style lang="scss">
  $plot-blue: #20A1FF;
  $blue: #a8d3fc;
  $font-color: #90949F;
  .sf-plot {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
    &-tools {
      margin-left: 10px;
      float: right;
      border-radius: 5px;
      background-color: #FFFFFF;
      box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
      li {
        padding: 5px;
        width: 32px;
        height: 32px;
        float: left;
        color: $font-color;
        text-align: center;
        line-height: 22px;
        background-repeat: no-repeat;
        &:hover {
          cursor: pointer;
          color: $plot-blue;
        }
      }
    }
    &-content {
      float: left;
    }
    .sf-plot-edit {
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      background-color: #FFFFFF;
      box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
      &-header {
        height: 28px;
        line-height: 28px;
      }
      &-content {
        margin-top: 15px;
        .plot-edit-color {
          text-align: left;
          padding: 0 0 0 15px;
          color: #3a3a3a;
          .stration {
            display: inline-block;
            position: relative;
            top: -12px;
          }
          .demonstration {
            position: relative;
            top: 4px;
          }
          .span-border {
            margin-left: 60px;
          }
          label {
            display: inline-block;
            margin: 0 15px;
            &[for="plotBorderColor"] {
              margin-left: 70px;
            }
          }
          .el-color-picker {
            display: inline-block;
            position: relative;
            line-height: normal;
            left: 20px;
            height: 40px;
          }
        }
        .min-input {
          width: 30px;
          height: 30px;
          margin: 0;
          padding: 0;
          text-align: center;
          border: 1px solid #e3e3e3;
        }

        .plot-edit-title {
          margin: 20px 0 10px;
          padding: 0 15px;
          color: #3a3a3a;
        }

        .plot-edit-line {
          padding: 0 32px 0 27px;
        }
        .plot-view-wrap {
          .plot-view-title {
            font-family: 'SimSun', Arial, sans-serif;
            font-weight: bold;
            margin-bottom: 10px;
            display: block;
            padding: 0 20px;
          }
          .plot-view-box {
            border: 1px dashed #E3E3E3;
            padding: 20px;
            text-align: center;
            width: 280px;
            margin: auto;
            background-image: linear-gradient(45deg, #E3E3E3 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0)),
            linear-gradient(-45deg, #E3E3E3 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0)),
            linear-gradient(45deg, rgba(0, 0, 0, 0) 75%, #E3E3E3 75%),
            linear-gradient(-45deg, rgba(0, 0, 0, 0) 75%, #E3E3E3 75%);
            background-size: 10px 10px;

            .iconfont {
              display: table;
              margin: auto;
              text-align: center;
              &:before {
                display: table-cell;
                vertical-align: middle;
              }
            }
          }
        }

        // 滑块
        .rzslider {
          margin: 0;
          height: 2px;
          .rz-bar-wrapper {
            height: 2px;
            padding: 0;
            margin: 0;
            .rz-bar {
              height: 2px;
            }
          }

          .rz-pointer {
            top: -5px;
            width: 12px;
            height: 12px;
            &:after {
              top: 4px;
              left: 4px;
              width: 4px;
              height: 4px;
            }
          }

          .rz-bubble {
            display: none;
          }
        }
        .el-color-picker__trigger, .el-color-picker__color {
          border: 1px solid $blue !important;
          border-radius: 0 !important;
        }
        .el-color-picker__icon {
          color: $blue !important;
        }
        .el-color-svpanel {
          width: 274px !important;
        }
        .el-slider__runway {
          height: 2px;
          .el-slider__bar {
            height: 2px;
          }
          .el-slider__button-wrapper {
            width: 32px;
            height: 32px;
            .el-slider__button {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }
</style>
