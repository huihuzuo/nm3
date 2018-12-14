<template>
  <div class="sf-weather-player">
    <span class="timer-content" v-if="false">
      <span class="timer-text">
        <p class="date">{{startTime | dateFormat('YYYY-MM-DD')}}</p>
        <p class="time">{{startTime | dateFormat('HH:mm:ss')}}</p>
      </span>
      <span class="data-picker-content">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择日期"
          @focus="dataPickerFocus"
          :align="'center'"
          :clearable="false"
          :format="'yyyy-MM-dd-HH-mm-ss'">
            </el-date-picker>
      </span>
    </span>
    <span class="player-control">
      <span class="iconfont icon-kuaitui" @click="backClick()"></span>
      <span class="iconfont play" :class="{'icon-bofang': !isPlay, 'icon-zanting': isPlay}"
            @click="playClick()"></span>
      <span class="iconfont icon-kuaijin" @click="nextClick()"></span>
    </span>
    <span class="player-slider">
      <vue-slider
        v-bind="options"
        ref="slider"
        @drag-end="dragEnd"
        v-model="playerState"></vue-slider>
    </span>
    <span class="player-setup">
      <span class="iconfont icon-shezhi" @click.stop="showStateClick()"></span>
      <div class="play-state" v-show="showState" v-clickoutside="handleClickOut">
          <span class="state" :class="{'border-top': index !== 0, 'select': statesSelect === item.value}"
                v-for="(item, index) in states" @click.stop="stateClick(item)">{{item.name}}</span>
        </div>
    </span>
    <span class="player-timers">
      <el-select v-model="playerState" placeholder="请选择" @change="handleChange">
        <el-option
          v-for="item in dates"
          :key="item.dataTime"
          :label="item.dataTime"
          :value="item.dataTime">
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component'
  import moment from 'moment'
  export default {
    name: 'weather-player',
    props: {
      item: Object
    },
    data () {
      return {
        startTime: new Date(),
        isPlay: false,
        playerState: 0,
        showState: false,
        statesSelect: '',
        states: [
          {
            name: '慢速',
            value: 2000
          },
          {
            name: '中速',
            value: 1000
          },
          {
            name: '快速',
            value: 500
          }
        ],
        options: {
          data: [],
          value: '',
          width: '100%',
          disabled: false,
          piecewise: false,
          piecewiseLabel: true,
          style: {
            marginLeft: '0%'
          },
          processStyle: {
            backgroundColor: '#20A1FF'
          },
          piecewiseStyle: {
            backgroundColor: '#FFFFFF',
            visibility: 'visible',
            width: '12px',
            height: '12px'
          },
          piecewiseActiveStyle: {
            backgroundColor: 'rgba(2, 49, 66, 1)'
          },
          tooltip: 'hover',
          tooltipStyle: {
            backgroundColor: 'rgba(2, 49, 66, 0.9)',
            color: '#7adaff',
            border: '1px solid rgba(2, 49, 66, 0.9)',
            padding: '6px 10px',
            boxShadow: 'inset 0 0 10px 2px rgba(80, 175, 255, 0.6)',
            display: 'initial',
            position: 'relative',
            top: '15px'
          },
          labelStyle: {
            color: 'transparent'
          },
          labelActiveStyle: {
            color: 'transparent'
          }
        },
        dates: [],
        timer: null,
        currentImage: {
          index: 0,
          data: {}
        },
        currentLayer: null,
        legendData: [],
        selectTimer: ''
      }
    },
    mounted () {
      if (this.$store.getters.showLayerControl.item) {
        this.getImagesList()
      }
    },
    watch: {
      item: function (v) {
        if (v && this.startTime) {
          this.getImagesList()
        }
      },
      dates: function (v) {
        if (v && v.length > 0) {
          let list = []
          v.forEach(item => {
            if (item && item['dataTime']) {
              list.push(item['dataTime'])
            }
          })
          this.options['data'] = list
        }
      },
      startTime: function (v) {
        if (v && this.item.code) {
          this.getImagesList()
        }
      },
      currentImage: function (v, ov) {
        if (v && typeof v['index'] === 'number' && v['data']) {
          this.playerState = v['data']['dataTime']
        }
      }
    },
    methods: {
      resetData () {
        this.currentImage = {
          index: 0,
          data: {}
        }
        if (this.currentLayer) {
          this.$Maps.removeLayer(this.currentLayer)
          this.currentLayer = null
        }
        this.playerState = ''
        this.statesSelect = 1000
        this.setTimer(false)
      },
      dataPickerFocus (event) {
        console.log(event)
      },
      backClick () {
        let vm = this
        if (vm.dates && vm.dates.length > 0) {
          let index = ((vm.currentImage['index'] - 1) > 0 ? (vm.currentImage['index'] - 1) : 0)
          this.currentImage = {
            index: index,
            data: vm.dates[index]
          }
          this.addStaticLayer(vm.currentImage['data'])
        }
      },
      nextClick () {
        let vm = this
        if (vm.dates && vm.dates.length > 0) {
          let index = ((vm.currentImage['index'] + 1) < vm.dates.length - 1 ? (vm.currentImage['index'] + 1) : (vm.dates.length - 1))
          this.currentImage = {
            index: index,
            data: vm.dates[index]
          }
          this.addStaticLayer(vm.currentImage['data'])
        }
      },
      playClick () {
        if (this.dates.length > 0) {
          this.isPlay = !this.isPlay
          if (this.isPlay) {
            this.$set(this.options, 'tooltip', 'always')
            if (!this.currentImage || !this.currentImage['data']) {
              this.addStaticLayer(this.dates[0])
            } else {
              this.addStaticLayer(this.currentImage['data'])
            }
            this.setTimer(true)
          } else {
            this.$set(this.options, 'tooltip', 'hover')
            this.setTimer(false)
          }
        } else {
          console.warn('无数据！')
        }
      },
      showStateClick () {
        this.showState = !this.showState
      },
      stateClick (item) {
        if (item && item['value']) {
          this.statesSelect = item['value']
          if (this.isPlay) {
            this.setTimer(false)
            this.setTimer(true)
          }
        }
        this.showState = false
      },
      dragEnd (event) {
        let value = event.getValue()
        if (this.dates && Array.isArray(this.dates) && this.dates.length > 0) {
          this.dates.every((item, index) => {
            if (item && item['dataTime'] && value === item['dataTime']) {
              this.timerSelect = item['dataTime']
              this.currentImage = {
                index: index,
                data: item
              }
              this.addStaticLayer(item)
              this.setTimer(false)
              return false
            } else {
              return true
            }
          })
        }
      },
      getImagesList () {
        const loading = this.$loading({
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(2, 24, 34, 0.73)'
        })
        const _item = this.$store.getters.showLayerControl.item
        this.$fetch.getLayerImages({
          url: _item && _item.url,
          fullDay: moment(this.startTime).format('YYYY-MM-DD')
        }).then(res => {
          if (res && res.length > 0) {
            this.resetData()
            this.dates = res
            this.timerSelect = this.dates[0]['dataTime']
            this.currentImage = {
              index: 0,
              data: this.dates[0]
            }
            console.log(this.currentImage)
            this.addStaticLayer(this.currentImage['data'])
            this.setTimer(false)
          }
          loading.close()
        }).catch(error => {
          console.log(error)
          loading.close()
        })
      },
      setTimer (flag) {
        let vm = this
        if (flag) {
          this.timer = window.setTimeout(() => {
            let index = vm.currentImage['index'] + 1
            if (index <= vm.dates.length - 1) {
              vm.currentImage = {
                index: index,
                data: vm.dates[index]
              }
              vm.addStaticLayer(vm.currentImage['data'])
              vm.setTimer(true)
            } else {
              window.clearTimeout(vm.timer)
              vm.isPlay = false
              vm.timer = null
            }
          }, vm.statesSelect)
        } else {
          window.clearTimeout(vm.timer)
          vm.timer = null
        }
      },
      addStaticLayer (_config) {
        const _item = this.$store.getters.showLayerControl.item
        if (_config && _config['url']) {
          if (!this.currentLayer) {
            this.currentLayer = this.$Maps.createImageLayer(_item.id, {
              isWeather: true,
              opacity: 1,
              addLayer: true,
              create: true,
              sourceType: 'ImageStatic',
              projection: 'EPSG:4326',
              imageExtent: this._getExtent(_item.id),
              layerUrl: _config['url']
            })
          } else {
            let source = this.$Maps.getImagesSource({
              opacity: 1,
              sourceType: 'ImageStatic',
              projection: 'EPSG:4326',
              imageExtent: this._getExtent(_item.id),
              layerUrl: _config['url']
            })
            this.currentLayer.setSource(source)
          }
        } else {
          console.log('数据无图片地址！')
        }
      },
      _getExtent (id) {
        const _extents = {
          '003002006': [62.71544531707846, 2.557514005255576, 148.79917203263904, 62.18093383113857],
          '003002004': [67.37364844207846, -2.979595369744424, 143.96518765763904, 54.35866820613857],
          'x': [66.93419531707846, 1.5028265052555756, 136.75815640763904, 54.79812133113857]
        }
        return _extents.hasOwnProperty(id) ? _extents[id] : _extents['x']
      },
      handleClickOut () {
        this.showState = false
      },
      handleChange (event) {
        if (this.dates && this.dates.length > 0) {
          this.dates.every((item, index) => {
            if (item.dataTime === event) {
              this.currentImage = {
                index: index,
                data: item
              }
              return false
            } else {
              return true
            }
          })
          this.addStaticLayer(this.currentImage.data)
          this.setTimer(false)
        }
      }
    },
    components: {
      vueSlider
    },
    destroyed () {
      this.$set(this.options, 'tooltip', 'hover')
      this.setTimer(false)
      if (this.currentLayer) {
        this.$Maps.removeLayer(this.currentLayer)
        this.currentLayer = null
      }
    }
  }
</script>

<style lang="scss">
  .sf-weather-player {
    position: absolute;
    bottom: 20px;
    left: 50%;
    width: 670px;
    height: 52px;
    line-height: 58px;
    border-radius: 5px;
    background: rgba(2, 49, 66, 0.9);
    box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
    transform: translate(-50%, 0px);
    .timer-content {
      display: inline-block;
      height: 38px;
      margin: 10px 16px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      .timer-text {
        display: inline-block;
        text-align: center;
        line-height: 14px;
        padding: 5px 7px;
        font-size: 12px;
        color: #5A5F65;
        border-right: 1px solid #dcdfe6;
      }
      .data-picker-content {
        display: inline-block;
        height: 38px;
        .el-date-editor.el-input {
          width: 40px;
          height: 100%;
        }
        .el-input--prefix .el-input__inner {
          opacity: 0;
        }
        .el-input__prefix, .el-input__suffix {
          top: -6px;
          font-size: 18px;
          pointer-events: none;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .player-control {
      position: relative;
      top: -5px;
      margin-left: 20px;
      span {
        display: inline-block;
        font-size: 16px;
        color: #5c5c5c;
        padding: 0 5px;
        &:hover {
          cursor: pointer;
          color: #1B9DE8;
        }
      }
    }
    .player-slider {
      display: inline-block;
      width: 330px;
      height: 20px;
      margin-left: 20px;
    }
    .player-setup {
      position: relative;
      top: -3px;
      display: inline-block;
      width: 30px;
      height: 20px;
      margin-left: 10px;
      .icon-shezhi {
        font-size: 18px;
        color: #5c5c5c;
        &:hover {
          cursor: pointer;
          color: #1B9DE8;
        }
      }
      .play-state {
        width: 80px;
        height: 95px;
        border-radius: 6px;
        font-size: 22px;
        line-height: 23px;
        color: #7adaff;
        box-sizing: border-box;
        position: absolute;
        top: -80px;
        left: -30px;
        background: rgba(2, 49, 66, 0.9);
        box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
        span {
          width: 100%;
          display: inline-block;
          text-align: center;
          line-height: 30px;
          font-size: 14px;
          &:hover {
            cursor: pointer;
            box-shadow: inset 0 0 12px 0 #50afff;
          }
        }
      }
    }
    .player-timers {
      display: inline-block;
      width: 150px;
      height: 100%;
      .el-input {
        height: 100%;
        top: -5px;
        .el-input__inner {
          height: 28px;
          line-height: 28px;
        }
      }
    }
  }
</style>
