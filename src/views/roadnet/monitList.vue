<template>
  <transition
    enter-active-class="bounceInRight"
    leave-active-class="bounceOutRight">
    <panel :show-head="true"
           :title="monitTitle"
           :show-close="true"
           class="monit-mini-wrap" @onClose="onClose">
      <div class="list-wrap">
        <ul class="panel-list">
          <li class="list-item-header">
            <ul class="list-item">
              <li v-for="l in data1.titleList">{{l.name}}</li>
            </ul>
          </li>
        </ul>
        <!-- 路线拥堵 -->
        <div class="list-scroll">
          <transition-group
            class="panel-list"
            tag="ul"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <li v-for="(item, index) in data1.valueList"
                :key="item.attributes.BLOCK_ID"
                @click="clickEvent(item)"
                @mouseover="mouseover(item)"
                @mouseout="mouseout(item)"
                :data-index="index">
              <ul class="list-item">
                <li><span>{{index + 1}}</span></li>
                <li>
                  <div style="line-height: 40px">{{item.attributes.ROAD_ID}}</div>
                </li>
                <li>
                  <div>{{item.attributes.START_STAKE | formatZh}}</div>
                  <div>{{item.attributes.END_STAKE | formatZh}}</div>
                </li>
                <li>
                  <div>{{item.attributes.DETECT_TIME | formatTime}}</div>
                </li>
              </ul>
            </li>
          </transition-group>
          <div v-show="zwsjShow" class="wsjTp" style="">
            <img src="../../../static/images/zwsj.png">
          </div>
        </div>

        <div class="panel-pager">
          <el-pagination
            small
            layout="prev, pager, next"
            :current-page="current"
            :page-size="limit"
            :total="total"
            @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </panel>
  </transition>
</template>

<script>
  import {mapState} from 'vuex'
  import popover from '@/map/mixin/popover'
  import mixin from '@/mixin/mixin'
  export default {
    data () {
      return {
        title: '',
        zwsjShow: false,
        total: 0,
        current: 1,
        limit: 10,
        data1: {
          'titleList': [
            {'name': '序号'},
            {'name': '路线'},
            {'name': '桩号'},
            {'name': '发生时间'}
          ],
          'valueList': []
        }
      }
    },
    props: {
      monitTitle: [String, Object]
    },
    mixins: [mixin, popover],
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess
      })
    },
    watch: {
      loadMapSuccess () {
        this.block()
      }
    },
    mounted () {
      if (this.$store.getters.showWeather) {
        this.$store.dispatch('actionWeatherLayerName', this.activeTab)
      }
      if (this.$store.getters.loadMapSuccess) {
        this.block()
      }
    },
    methods: {
      onClose () {
        this.$Maps.removeFeatureByLayerName('blockPoints')
        // this.$emit('onClose', 'monitListShow')
        this.$store.dispatch('SHOW_MONIT_LIST', {'monitListShow': false})
      },
      block () {
        this.$api.getBlock({'params': {
          'layerName': 'V_T_BLOCK_TEMP',
          'filter': '',
          'pager': {'page': this.current, 'rows': this.limit}}}
        ).then(res => {
          this.total = res.data.data.allCount
          if (this.total !== 0) {
            this.data1.valueList = res.data.data.features
            this.addPoints(this.data1.valueList)
            this.zwsjShow = false
          } else {
            this.zwsjShow = true
          }
        })
      },
      addPoints (data) {
        let [obj, points] = [{}, []]
        for (let i = 0; i < data.length; i++) {
          obj = {}
          obj['attributes'] = data[i]['attributes']
          obj.attributes['style'] = {
            image: {
              type: 'icon',
              image: {
                imageSrc: 'static/images/map_position.png',
                imageAnchor: [0.5, 1.1]
              }
            },
            text: {
              textFont: 'normal lighter 14px Arial',
              textOverflow: false,
              text: (i + 1).toString(),
              textOffsetX: 3,
              textOffsetY: -18,
              textFill: {
                fillColor: '#FFF'
              }
            }
          }
          obj['attributes']['id'] = data[i]['attributes']['BLOCK_ID']
          obj['attributes']['layerName'] = 'blockPoints'
          obj.attributes['selectStyle'] = {
            image: {
              type: 'icon',
              image: {
                imageSrc: 'static/images/map_position_hover.png',
                imageAnchor: [0.5, 1]
              }
            },
            text: {
              textFont: 'normal lighter 14px Arial',
              textOverflow: false,
              text: (i + 1).toString(),
              textOffsetX: 3,
              textOffsetY: -18,
              textFill: {
                fillColor: '#FFF'
              }
            }
          }
          obj['geometry'] = data[i].geometry
          obj['geometryType'] = data[i].geometryType
          points.push(obj)
        }
        this.$Maps.addPoints(points, {
          layerName: 'blockPoints',
          zoomToExtent: true
        })
      },
      clickEvent (item) {
        this.matchConfig(item.attributes, item.geometry)
      },
      mouseover (item) {
        this.$Maps.highLightFeature(item['attributes']['id'])
      },
      mouseout (item) {
        this.$Maps.unHighLightFeature(item['attributes']['id'])
      },
      currentChange (current) {
        this.current = current
      }
    },
    destroyed () {
      this.$Maps.removeFeatureByLayerName('blockPoints')
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables";
  .monit-mini-wrap {
    top: 10px;
    right: 10px;
    left: initial;
    .list-wrap {
      top: 0 !important;
    }
  }
</style>
