<template>
  <div class="pano-sample-popup">
    <div class="popup-header"></div>
    <div class="popup-middle">
      <img v-if="src" :src="src" onerror="this.src = 'static/images/no_pics.png'" :alt="roadName">
      <img src="static/images/no_pics.png" v-else alt="暂无实景数据">
      <span>{{roadName}}</span>
    </div>
    <div class="popup-bottom">
      <img class="pano-eye-center" src="static/images/panoeye-center.png" alt="">
    </div>
  </div>
</template>
<style lang="scss">
  .pano-sample-popup {
    height: 128px;
    padding: 10px;
    overflow: hidden;
    .popup-middle {
      width: 100px;
      height: 90px;
      img {
        width: 100px;
        height: 90px;
      }
    }
    .popup-bottom {
      .pano-eye-center {
        position: absolute;
        bottom: -58px;
        left: 30px;
        pointer-events: none;
        transform: translate(-50%, 0);
        -webkit-transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);
        -o-transform: translate(-50%, 0);
      }
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        params: {},
        src: '',
        roadName: ''
      }
    },
    watch: {
      params: function (v, ov) {
        if (v && v['layerName'] && v['properties']) {
          this.src = v['properties']['imagesSrc']
          this.roadName = v['properties']['name'] ? v['properties']['name'] : '暂无实景数据'
        } else {
          this.src = 'static/images/no_pics.png'
          this.roadName = '暂无实景数据'
        }
      }
    }
  }
</script>
