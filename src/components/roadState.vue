<template>
  <div class="road-state-wrap">
    <div class="road-state-title">
      <span :class="{true: 'selected', false: 'normal'}[source === 'amap']" @click="changeSource('amap')">高德</span>
      <span :class="{true: 'selected', false: 'normal'}[source === 'baidu']" @click="changeSource('baidu')">百度</span>
      <!--<span :class="{true: 'selected', false: 'normal'}[source === 'station']" @click="changeSource('station')">交调站</span>-->
      <span class="iconfont icon-guanbi" @click="clickEvent('roadStateclose')"></span>
    </div>
    <div class="road-state-type">
      <div class="road-state-type-item" v-for="item in types">
        <span class="road-state-type-item-span"
          :key="item.alias"
          :class="item.selected ? 'typeSelected' : 'normal'"
          @click="changeType(item)">
        {{item.label}}</span>
        <div :class="item.selected ? 'road-state-type-item-img-select' : ''" class="road-state-type-item-img"></div>
      </div>
    </div>
    <div class="road-state-legend">
      <span>严重拥堵</span>
      <span>拥挤</span>
      <span>缓行</span>
      <span>缓行</span>
    </div>
  </div>
</template>

<script >
  import { mapState } from 'vuex'
  import moment from 'moment'
  export default {
    data () {
      return {
        source: 'amap',
        types: [
          {
            alias: 'gs',
            label: '高速',
            type: 0,
            filed: 'traffic_gs',
            selected: false
          },
          {
            alias: 'ptgd',
            label: '普通国道',
            type: 1,
            filed: 'traffic_gd',
            selected: true
          },
          {
            alias: 'ptsd',
            label: '普通省道',
            type: 2,
            filed: 'traffic_sd',
            selected: true
          }
        ],
        selectType: '',
        layerNames: [],
        timer: null,
        isShow: false
      }
    },
    watch: {
      loadMapSuccess: function (value) {
        if (value) {
          this.loadRoadState(value)
        }
      },
      refreshTimer (value) {
        if (value && value.state) {
          this.loadRoadState(value.state)
        }
      }
    },
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess,
        refreshTimer: state => state.map.refreshTimer
      })
    },
    created () {
      this.isShow = true
    },
    mounted () {
      if (this.$store.getters.loadMapSuccess) {
        this.loadRoadState(true)
      }
    },
    methods: {
      createTimer (flag) {
        let vm = this
        if (flag) {
          vm.time = moment().format('H:mm')
          vm.loadRoadState(true)
          vm.timer = setInterval(() => {
            let now = new Date()
            let min = now.getMinutes()
            if (min % 5 === 0) {
              vm.time = moment().format('H:mm')
              vm.loadRoadState(flag)
            }
          }, 5 * 60 * 1000)
        } else {
          vm.loadRoadState(flag)
          window.clearInterval(vm.timer)
        }
      },
      changeSource (alias) {
        this.source = alias
        this.loadRoadState(true)
      },
      changeType (item) {
        item.selected = !item.selected
        this.loadRoadState(true)
      },
      loadRoadState (flag) {
        let layer = config.layerConfig.getLayerConfigByLayerName(this.source, 'roadStateLayers')
        this.clearLayers()
        if (!layer || !flag || !this.isShow) return
        console.log(layer)
        if (layer['layerType'] === 'TileArcGISRest') {
          layer.layerParams['layerDefs'] = this.getLayerParams(layer)
          if (!layer.layerParams['layerDefs']) {
            this.clearLayers()
          } else {
            if (this.layerNames.indexOf(layer['layerName']) < 0) {
              this.layerNames.push(layer['layerName'])
            }
            this.$Maps.createTitleLayer(layer['layerName'], layer)
          }
        } else if (layer['layerType'] === 'TileXYZ') {
          const _layers = this.getLayersConfig(layer)
          if (_layers.length > 0) {
            _layers.forEach(_item => {
              if (_item.layerUrl) {
                if (this.layerNames.indexOf(_item['layerName']) < 0) {
                  this.layerNames.push(_item['layerName'])
                }
                this.$Maps.createGaoDeLayer(_item['layerName'], _item)
              }
            })
          } else {
            this.clearLayers()
          }
        }
      },
      getLayersConfig (layer) {
        const _layers = []
        for (let i = 0; i < this.types.length; i++) {
          if (this.types[i]['selected']) {
            _layers.push({
              layerName: layer.layerName + '_' + this.types[i]['filed'],
              layerUrl: `${layer.layerUrl}&lid=${this.types[i]['filed']}`,
              layerType: layer.layerType,
              visible: true,
              create: true
            })
          }
        }
        return _layers
      },
      getLayerParams (layer) {
        const select = this.types.filter(_item => _item.selected)
        if (select.length > 0) {
          const _types = select.map(_item => _item.type)
          let _params = ''
          if (_types.length > 0) {
            for (let i = 0; i < layer.value.length; i++) {
              _params += layer.value[i] + ' IN (' + _types.join(',') + ');'
            }
          }
          return _params
        }
        return false
      },
      clearLayers (deep) {
        if (deep && this.timer) {
          window.clearInterval(this.timer)
        }
        if (!this.$Maps) return
        this.$Maps.removeLayerByLayerNames(this.layerNames)
      },
      clickEvent (alias) {
        this.$Maps.removeLayerByLayerName('roadstate')
        this.$emit('clickEvent', alias)
      }
    },
    components: {},
    beforeDestroy () {
      this.clearLayers(true)
      this.isShow = false
    }
  }
</script>

<style lang="scss">
  .road-state-wrap{
    width: 240px;
    height: 124px;
    position: absolute;
    bottom: 161px;
    right: 48px;
    z-index: 3;
    background: rgba(2, 49, 66, 0.9);
    box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
    font-family: SimSun;
    pointer-events: auto;
    .normal{
      color: #5bb0d1;
    }
    .road-state-title{
      width: 100%;
      height: auto;
      overflow: hidden;
      font-size: 12px;
      border-bottom: 1px #1D5D78 solid;
      .selected{
        color: #b8deff;
      }
      span{
        display: inline-block;
        margin: 12px;
        cursor: pointer;
        &:hover{
          color: #B8DEFF;
        }
      }
      .icon-guanbi {
        font-size: 12px;
        float: right;
        margin-right: 14px;
        margin-top: 14px;
        color: #2487bb;
        &:hover {
          cursor: pointer;
          color: #ff9c9c;
        }
      }
    }
    .road-state-type {
      width: 100%;
      height: auto;
      overflow: hidden;
      font-size: 12px;
      margin-top: 10px;
      .typeSelected{
        color: #7adaff;
      }
      .road-state-type-item{
        width: 66px;
        height: 24px;
        display: inline-block;
        margin-left: 10px;
        line-height: 24px;
        &:hover{
          color: #7adaff;
        }
        .road-state-type-item-img-select{
          display: block !important;
        }
        .road-state-type-item-span{
          font-size: 12px;
          width: 66px;
          height: 24px;
          display: inline-block;
          border: 1px #297290 solid;
          text-align: center;
          color: #589fba;
          cursor: pointer;
        }
        .road-state-type-item-img{
          width: 14px;
          height: 14px;
          position: relative;
          top: -24px;
          right: -52px;
          display: none;
          background: url('../../static/images/lkxz.png') no-repeat;
        }
      }
    }
    .road-state-legend{
      height: auto;
      padding: 10px;
      margin-top: 5px;
      display: flex;
      span{
        flex: 1;
        height: 18px;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        display: inline-block;
        margin-left: 5px;
      }
      span:nth-child(1){
        /*width: 70px;*/
        margin-left: 0;
        flex: 2;
        background-color: #B40000;
      }
      span:nth-child(2){
        background-color: #E80E0E;
      }
      span:nth-child(3){
        background-color: #FFD045;
      }
      span:nth-child(4){
        background-color: #4FD27D;
      }
    }
  }
</style>
