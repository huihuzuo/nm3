<template>
  <div class="toolbar-wrap">
    <div class="tool-bar tool-bar-box">
      <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('zoomout')"></span>
      <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('zoomin')"></span>
      <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('measureLine')"></span>
      <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('measureArea')"></span>
      <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('all')"></span>
      <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('move')"></span>
    </div>
    <div class="tool-bar">
      <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('roadstate')"></span>
      <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('setting')"></span>
       <span class="tool-bar-item iconfont icon-xitongcanshu" @click="clickEvent('legend')"></span>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState({
        isFullScreen: state => state.tools.isFullScreen
      })
    },
    methods: {
      clickEvent (alias) {
        switch (alias) {
          case 'zoomout':
            break
          case 'zoomin':
            break
          case 'measureLine':
            break
          case 'measureArea':
            break
          case 'all':
            break
          case 'move':
            break
          case 'roadstate':
            break
          case 'setting':
            break
          case 'legend':
            break
        }
        this.$emit('clickEvent', alias)
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  .toolbar-wrap {
    position: absolute;
    bottom: 100px;
    right: 10px;
    z-index: 14;
    pointer-events: auto;
    .tool-bar-box{
      margin-bottom: 20px;
    }
    .tool-bar{
      box-shadow: 2px 4px 1px 0px
      rgba(7, 0, 2, 0.18);
      .tool-bar-item{
        width: 28px;
        height: 28px;
        font-size: 17px;
        display: block;
        color: #a0a0a0;
        background-color: #ffffff;
        border-bottom: 1px solid rgba(160,160,160, 0.2);
        text-align: center;
        line-height: 28px;
      }
    }
  }
</style>
