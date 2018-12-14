<template>
  <div class="mini-img" :style="{width: width + 'px', height: height + 'px'}">
    <div id="images" class="img-wrap clearfix"
         :style="{width: images.length * width + 'px', left: '-' + current * width + 'px'}">
      <div v-for="item in images"
           class="img" :style="{width: width + 'px', height: height + 'px'}">
        <img onerror="this.src='./static/images/error_img.jpg'" :src="item">
      </div>
    </div>
    <span @click="goto('next')"
          class="img-next iconfont icon-xiayiye"
          v-if="current !== images.length - 1"></span>
    <span @click="goto('last')"
          class="img-last iconfont icon-shangyiye"
          v-if="current !== 0"></span>
    <span class="pages">
      {{current + 1}}/{{images.length}}
    </span>
  </div>
</template>
<style lang="scss">
  @import '../../assets/scss/common/miniImg';
</style>
<script>
  export default {
    props: {
      images: {
        type: Array,
        default: function () {
          return []
        }
      },
      width: {
        type: Number,
        default: function () {
          return 360
        }
      },
      height: {
        type: Number,
        default: function () {
          return 210
        }
      }

    },
    mounted () {
    },
    updated () {
      let options = {
        url: 'data-original'
      }
      /* eslint-disable no-new */
      new Viewer(document.getElementById('images'), options)
    },
    data () {
      return {
        current: 0,
        basePath: 'http://'
      }
    },
    methods: {
      goto (_e) {
        let lengths = this.images.length
        if (_e === 'last' && this.current > 0) {
          this.current = this.current - 1
        } else if (_e === 'next' && this.current < lengths - 1) {
          this.current = this.current + 1
        }
      }
    }
  }
</script>
