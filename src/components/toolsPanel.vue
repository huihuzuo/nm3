<template>
  <div class="panel-tools-wrap">
    <div class="panel-tools-header">
      <ul class="panel-tools-ul clearfix">
        <li @click="toolClick('xzqh')">
          <span class="xzqh-span">{{city.name}}</span>
          <i class="xzqh-icon titafont tita-xiala"
             :style="{true: {transform: 'rotateZ(0)'}, false: {transform: 'rotateZ(-180deg)'}}[showDivision !== 'xzqh']"></i>
        </li>
        <li @click="toolClick('lk')">
          <span class="label-span titafont tita-lukuang">路况</span>
          <i class="xzqh-icon titafont tita-xiala"
             :style="{true: {transform: 'rotateZ(0)'}, false: {transform: 'rotateZ(-180deg)'}}[showDivision !== 'lk']"></i>
        </li>
        <li @click="toolClick('gj')">
          <span class="label-span titafont tita-gongju">工具</span>
          <i class="xzqh-icon titafont tita-xiala"
             :style="{true: {transform: 'rotateZ(0)'}, false: {transform: 'rotateZ(-180deg)'}}[showDivision !== 'gj']"></i>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="xzqh-wrap" v-show="showDivision === 'xzqh'">
        <city-search v-model="city"></city-search>
      </div>
    </transition>
    <transition name="fade">
      <div class="road-state-wrap" v-if="showDivision === 'lk'">
        <road-state-temp @close="hideRoadState"></road-state-temp>
      </div>
    </transition>
    <transition name="fade">
      <div class="gj-wrap" v-show="showDivision === 'gj'">
        <ul>
          <li v-for="item in gjData" @click="gjClick(item)"><span>{{item.name}}</span></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import citySearch from './citySearch'
  import roadStateTemp from '@/map/components/roadState'
  export default {
    data () {
      return {
        showDivision: '',
        city: {},
        gjData: [
          {
            name: '图层',
            type: 'layers'
          },
          {
            name: '测距',
            type: 'measureLength'
          },
          {
            name: '测面',
            type: 'measureArea'
          },
          /* {
            name: '应急标绘',
            type: 'plot'
          },
          {
            name: '搜周边',
            type: 'perimeter'
          }, */
          {
            name: '清空地图',
            type: 'clearMap'
          }
        ],
        measureTool: ''
      }
    },
    watch: {
      city: function (v, ov) {
        this.showDivision = false
      }
    },
    methods: {
      toolClick (type) {
        this.measureTool = new ol.interaction.MeasureTool()
        this.$Maps.addInteraction(this.measureTool)
        this.showDivision = this.showDivision === type ? '' : type
      },
      gjClick (item) {
        this.showDivision = ''
        switch (item.type) {
          case 'layers':
          case 'plot':
            this.$store.dispatch(item.type + 'State', true)
            break
          case 'measureLength':
            this.measureTool.setTool(true, 'measureLength', false)
            break
          case 'measureArea':
            this.measureTool.setTool(true, 'measureArea', false)
            break
          case 'perimeter':
            if (item['coordinates']) {
              // this.$store.dispatch('actionCenter', item['coordinates'])
            }
            this.$store.dispatch('actionToolPanel', {
              type: 'perimeter',
              params: '',
              isShow: true
            })
            break
          case 'clearMap':
            this.$Maps.removeAllLayer()
            break
        }
      },
      hideRoadState () {
        this.showDivision = ''
      },
      // 查询
      searchHandle () {
        // this.$router.push({name: 'search'})
      },
      // 图层
      layerHandle () {
        this.$store.dispatch('layersState', true)
      },
      // 标绘
      plotHandle () {
        this.$store.dispatch('plotState', true)
      },
      // 专题图
      topicHandle () {
        this.$store.dispatch('layersState', true)
      }
    },
    components: {
      citySearch,
      roadStateTemp
    }
  }
</script>

<style lang="scss">
  @import "../assets/variables.scss";

  .panel-tools-wrap {
    background: $panel-bg-color;
    border-radius: 3px;
    border: 1px solid $panel-border-color;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .2);
    pointer-events: auto;
    height: 40px;
    .panel-tools-header {
      line-height: 40px;
      font-size: 14px;
      .panel-tools-ul {
        li {
          float: left;
          height: 40px;
          line-height: 40px;
          position: relative;
          &:last-child {
            &:after {
              content: ' ';
              height: 0;
              width: 1px;
            }
          }
          &:after {
            position: absolute;
            top: 10px;
            right: 0;
            content: ' ';
            height: 20px;
            width: 1px;
            background: $panel-border-color;
          }
          &:hover {
            cursor: pointer;
          }
          .titafont {
            font-size: 14px;
            text-align: center;
            &:before {
              margin-right: 5px;
            }
          }
          .tita-xiala {
            &:before {
              margin: 0;
            }
          }
          .xzqh-span {
            display: inline-block;
            text-align: center;
            padding: 0 0 0 10px;
          }
          .label-span {
            display: inline-block;
            text-align: center;
            padding: 0 0 0 10px;
          }
          .xzqh-icon {
            margin: 0 5px;
            line-height: 40px;
            width: 20px;
            text-align: center;
            float: right;
            transition: .3s;
          }
        }
      }
    }
    .xzqh-wrap {
      position: absolute;
      right: 0;
      width: 270px;
      overflow: hidden;
      margin-top: 10px;
    }
    .road-state-wrap{
      right: 0;
      overflow: hidden;
      margin-top: 10px;
      background: $panel-bg-color;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, .2);
    }
    .gj-wrap {
      position: absolute;
      right: 0;
      background: $panel-bg-color;
      border: 1px solid $panel-border-color;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, .2);
      margin-top: 10px;
      border-radius: 3px;
      ul {
        li {
          line-height: 30px;
          height: 30px;
          padding: 0 10px;
          width: 87px;
          transition: .3s;
          &:hover {
            background: $panel-hover-bg-color;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
