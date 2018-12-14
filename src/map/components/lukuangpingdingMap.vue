<template>
  <div class="sf-road-state-content">
    <ul>
      <li class="msg">
        <span>路况评定</span><span>（更新时间：{{update_year}}）</span>
      </li>
      <li class="line-bar">
        <div title="V<40"><span class="color firs"></span><span class="text">差</span></div>
        <div title="V<40"><span class="color fir"></span><span class="text">次</span></div>
        <div title="40<= V<60"><span class="color sec"></span><span class="text">中</span></div>
        <div title="V>=60"><span class="color th"></span><span class="text">良</span></div>
        <div><span class="color for"></span><span class="text">优</span></div>
      </li>
    </ul>
  </div>
</template>
<script>
  import moment from 'moment'
  import {mapState} from 'vuex'
  export default {
    name: 'lukuangpingding-map',
    data () {
      return {
        update_year: moment().format('YYYY 年')
      }
    },
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess
      })
    },
    mounted () {
      if (this.$store.getters.loadMapSuccess) {
        this.addRoadStatic(true)
      }
    },
    watch: {
      loadMapSuccess: function (value) {
        if (value) {
          this.addRoadStatic(value)
        }
      }
    },
    methods: {
      addRoadStatic (flag) {
        let vm = this
        if (flag) {
          vm.time = moment().format('H:mm')
          vm.addTrafficLayer(true)
          vm.timer = setInterval(() => {
            let now = new Date()
            let min = now.getMinutes()
            if (min % 5 === 0) {
              vm.time = moment().format('H:mm')
              vm.addTrafficLayer(flag)
            }
          }, 60 * 1000)
        } else {
          vm.addTrafficLayer(flag)
          window.clearInterval(vm.timer)
        }
      },
      closefunc_ () {
        this.addRoadStatic(false)
        this.$emit('close', 'roadstate')
      },
      addTrafficLayer (flag) {
        let _config = config.layerConfig.getLayerConfigByLayerName('roadSituation', 'overlaylayers')
        if (flag) {
          this.$Maps.createTitleLayer(_config['layerName'], _config)
        } else {
          this.$Maps.removeTileLayerByLayerName(_config['layerName'])
        }
      }
    },
    destroyed () {
      let _config = config.layerConfig.getLayerConfigByLayerName('roadSituation', 'overlaylayers')
      this.$Maps.removeTileLayerByLayerName(_config['layerName'])
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/variables.scss";
  .sf-road-state-content {
    font-size: 12px;
    position: absolute;
    bottom: 155px;
    right: 0;
    width: 256px;
    padding: 10px 10px 0px 10px;
    background-color: $panel-bg-color;
    border: 1px $panel-border-color solid;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    color: $panel-text-color;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.12), 1px 2px 1px -3px rgba(0, 0, 0, 0.3);
    pointer-events: auto;
    .closeCondition {
      cursor: pointer;
    }
    .msg {
      height: 32px;
      line-height: 20px;
      color: $panel-text-color;
      border-bottom: 1px $panel-border-color solid;
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        color: $panel-text-color;
        font-family: "SimSun";
        font-weight: bold;
      }
      span:nth-child(2) {
        color: $panel-text-color;
        font-family: "SimSun";
      }
      .el-icon-close {
        float: right;
        margin-right: 2px;
        margin-top: 3px;
        font-size: 16px;
        color: $panel-text-color;
        &:hover {
          color: $panel-text-highlight-color;
        }
      }
    }
    .msg:nth-child(2) {
      color: $panel-text-color;
      background-color: $panel-bg-color;
    }
    .line-bar {
      height: 50px;
      line-height: 35px;
      overflow: hidden;
      color: $panel-text-color;
      div {
        float: left;
        width: 20%;
        cursor: pointer;
        text-align: center;
        span {
          display: block;
          text-align: center;
        }
        .color {
          height: 5px;
          width: 46px;
          border-radius: 4px;
          margin: 10px 0 0px 8px;
        }
        .text{
          margin-left: 17px;
        }
        .firs {
          background-color: #FC5401;
        }
        .fir {
          background-color: #FFAB52;
        }
        .sec {
          background-color: #F6F072;
        }
        .th {
          background-color: #60FCE8;
        }
        .for {
          background-color: #78E138;
        }
      }
      div:nth-child(1){
        margin-left: -5px;
      }
    }
  }
</style>
