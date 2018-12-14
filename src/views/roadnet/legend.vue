<template>
  <div class="map-legend">
    <span class="map-legend-title">
      <span class="map-legend-title-label" @click="addLayer()">图例</span>
      <!--<span class="map-legend-title-close titafont tita-icon16" @click="close()"></span>-->
    </span>
    <ul>
      <li>
        <span class="map-legend-item"><span class="map-legend-item-img zctx"></span><label>正常通行</label></span>
        <span class="map-legend-item"><img src="static/images/control/icon_zcsz.png"><label :class="actionzcsz === 'zcsz' ? 'actionChoosed' : 'actionCancel'" @click="addStations(1, 'zcsz')">正常上站</label></span>
      </li>
      <li>
        <span class="map-legend-item"><span class="map-legend-item-img jztx"></span><label>禁止通行</label></span>
        <span class="map-legend-item"><img src="static/images/control/icon_szhx.png"><label :class="actionszhx=== 'szhx' ? 'actionChoosed' : 'actionCancel'" @click="addStations(2, 'szhx')">上站缓行</label></span>
      </li>
      <li>
        <span class="map-legend-item"><span class="map-legend-item-img qzjys"></span><label class="qzjys-label">七座及七座以上限行</label></span>
        <span class="map-legend-item"><img src="static/images/control/icon_jzsz.png"><label :class="actionjzsz=== 'jzsz' ? 'actionChoosed' : 'actionCancel'" @click="addStations(3, 'jzsz')">禁止上站</label></span>
      </li>
      <li>
          <span class="map-legend-item"><img class="xzqzsz" src="static/images/control/icon_jzqz.png">
            <label class="xzqzsz-label" @click="addStations(4, 'xzsz')" :class="actionxzsz=== 'xzsz' ? 'actionChoosed' : 'actionCancel'" >七座及七座以上限制上站</label></span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  @import "../../assets/variables.scss";
  .map-legend{
    width: 260px;
    height: auto;
    background-color: $panel-bg-color;
    border: 1px $panel-border-color solid;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    .map-legend-title{
      color: $panel-text-color;
      height: 40px;
      width: 100%;
      line-height: 40px;
      display: inline-block;
      font-size: 16px;
      padding: 0 10px;
      border-bottom: 1px $panel-border-color solid;
      .map-legend-title-label{
        float: left;
      }
      .map-legend-title-close{
        float: right;
        cursor: pointer;
        &:hover{
          color: $panel-text-highlight-color;
        }
      }
    }
    ul {
      width: 258px;
      height: 150px;
      border-radius: 4px;
      padding: 10px;
      li{
        width: 100%;
        height: auto;
        line-height: 30px;
        font-family: '微软雅黑';
        .map-legend-item{
          display: inline-block;
          height: 100%;
          height: auto;
          float: left;
          width: 50%;
          .map-legend-item-img{
            width: 12px;
            height: 12px;
            display: inline-block;
            margin: 0 5px;
            border-radius: 3px;
          }
          img{
            position: relative;
            top: 5px;
            margin-right: 5px;
          }
          .zctx{
            background-color: #48da00;
          }
          .jztx{
            background-color: #e30101;
          }
          .qzjys{
            float: left;
            background-color: #fbef01;
            position: relative;
            top: 7px;
          }
          .xzqzsz{
            float: left;
            width: 20px;
            position: relative;
            top: 7px;
          }
          .qzjys-label{
            float: left;
            line-height: 17px;
            width: calc(100% - 25px);
          }
          .xzqzsz-label{
            float: left;
            line-height: 17px;
            width: calc(100% - 25px);
          }
          label{
            color: $panel-text-color;
            word-wrap: break-word;
            cursor: pointer;
            font-size: 14px;
            &:hover{
              color: $panel-text-color;
            }
          }
          .actionChoosed{
            color: $panel-text-highlight-color;
          }
          .actionCancel{
            color: $panel-text-color;
          }
        }
      }
    }
  }
</style>
<script>
  import { mapState } from 'vuex'
  import LayerManage from '@/map/mixin/LayerManage'
  export default {
    props: {},
    data () {
      return {
        zcsz: true,
        szhx: true,
        jzsz: true,
        xzsz: true,
        actionzcsz: '',
        actionszhx: '',
        actionjzsz: '',
        actionxzsz: ''
      }
    },
    mixins: [LayerManage],
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess
      })
    },
    mounted () {
      if (this.$store.getters.loadMapSuccess) {
        this.addLayer(true)
      }
    },
    watch: {
      loadMapSuccess () {
        this.addLayer(true)
      }
    },
    methods: {
      addLayer (active) {
        const _config0 = config.layerConfig.getLayerConfigByLayerName('line', 'overlaylayers')
        if (active) {
          this.addOverlayLayer(_config0, true)
        } else {
          this.removerLayer(_config0['layerName'])
        }
      },
      addStations (code, alias) {
        let params = ''
        let self = this
        if (code) {
          params = {
            where: 'BLOCK_TYPE in (' + code + ')',
            outFields: '*'
          }
          this.$api.queryStations(params).then((data) => {
            if (data.status === 200) {
              if (data.data.features.length > 0) {
                self.addStationsPolygon(data.data.features, alias)
              } else {
                this.$message({
                  message: '抱歉，未查到相关信息！！',
                  type: 'warning'
                })
              }
            }
          })
        }
      },
      addStationsPolygon (res, alias) {
        if (this[alias]) {
          this['action' + alias] = alias
          let obj = {}
          let points = []
          let imageSrcUrl = ''
          for (let i = 0; i < res.length; i++) {
            switch (res[i]['attributes']['BLOCK_TYPE']) {
              case 1:
                imageSrcUrl = 'static/images/control/icon_zcsz.png'
                break
              case 2:
                imageSrcUrl = 'static/images/control/icon_szhx.png'
                break
              case 3:
                imageSrcUrl = 'static/images/control/icon_jzsz.png'
                break
              case 4:
                imageSrcUrl = 'static/images/control/icon_jzqz.png'
                break
            }
            obj = {}
            obj['attributes'] = res[i]['attributes']
            obj['attributes']['id'] = res[i]['attributes']['ID']
            obj.attributes['style'] = {
              image: {
                type: 'icon',
                image: {
                  imageSrc: imageSrcUrl,
                  imageAnchor: [0.5, 1]
                }
              }
            }
            obj.attributes['selectStyle'] = {
              image: {
                type: 'icon',
                image: {
                  imageSrc: imageSrcUrl,
                  imageAnchor: [0.5, 1]
                }
              }
            }
            obj['geometry'] = 'POINT (' + res[i].geometry.x + ' ' + res[i].geometry.y + ')'
            obj['geometryType'] = 'Point'
            points.push(obj)
          }
          this.$Maps.addPoints(points, {
            layerName: alias + 'Stations',
            zoomToExtent: true
          })
          this[alias] = false
        } else {
          this[alias] = true
          this['action' + alias] = ''
          this.$Maps.removeFeatureByLayerName(alias + 'Stations')
        }
      },
      close () {
        this.$store.dispatch('showLegend', {
          isShow: false
        })
        this.removerLayer('line')
        this.$Maps.removeFeatureByLayerName('zcszStations')
        this.$Maps.removeFeatureByLayerName('szhxStations')
        this.$Maps.removeFeatureByLayerName('jzszStations')
        this.$Maps.removeFeatureByLayerName('xzszStations')
      }
    },
    components: {},
    destroyed () {
      this.close()
    }
  }
</script>
