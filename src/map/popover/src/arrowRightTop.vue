<template>
  <div class="arrow-wrap">
    <div class="arrow-right-wrap">
    </div>
    <div class="arrow-wrap-header">
      <span>详情</span>
      <span class="iconfont icon-guanbi" @click="close()"></span>
    </div>
    <div class="arrow-wrap-content">
      <p v-html="content"></p>
    </div>
  </div>
 <!-- <div class="sf-popover" :style="computedStyle" :class="className">
    <div class="sf-popover-header clearfix">
        <span class="sf-popover-header-title">
          <span class="code">{{code}}</span>
          <span class="name">{{name}}</span>
        </span>
      <span class="sf-popover-header-tool-content">
          <span class="tools">
          <span
            v-for="tool in tools"
            class="tool iconfont"
            @click.stop="handleToolAction(tool)"
            :class="['tools-icon', tool.icon]"
            :title="tool.name">
            <span v-if="tools && tools.length > 0" class="tools-line"></span>
          </span>
          </span>
          <button
            type="button"
            class="closer"
            v-if="showClose"
            @click="close()"
            @keydown.enter="close()">
            <i class="sf-popover__close el-icon-close"></i>
          </button>
        </span>
    </div>
    <div class="sf-popover-content" v-if="content !== ''">
      <div class="sf-popover-content__body">
        <slot>
          <p v-if="!dangerouslyUseHTMLString">{{ content }}</p>
          <p v-else v-html="content"></p>
        </slot>
      </div>
    </div>
    <div class="sf-popover-bottom">
      <div class="single"></div>
    </div>
  </div>-->
</template>

<script>
  import PerimeterSearch from '@/mixin/perimeterSearch'
  import PopoverAction from '../../mixin/PopoverAction'
  const size = {
    medium: [290, 'auto'],
    small: [],
    mini: []
  }
  export default {
    props: {
      size: {
        type: [String, Array],
        default: 'medium' // small mini
      },
      padding: {
        type: [String, Number],
        default: '20px'
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnHashChange: {
        default: true
      },
      className: {
        type: String,
        default: ''
      }
    },
    mixins: [PopoverAction, PerimeterSearch],
    data () {
      return {
        content: '',
        name: '',
        code: '',
        tools: '',
        callback: null,
        coordinates: '',
        dangerouslyUseHTMLString: false
      }
    },
    computed: {
      computedStyle () {
        return {
          width: (typeof this.size === 'string')
            ? size[this.size][0] + 'px'
            : (typeof this.size[0] === 'string' ? this.size[0] : this.size[0] + 'px'),
          height: (typeof this.size === 'string')
            ? size[this.size][1] + 'px'
            : (typeof this.size[1] === 'string' ? this.size[1] : this.size[1] + 'px'),
          padding: typeof this.padding === 'string' ? this.padding : this.padding + 'px'
        }
      }
    },
    watch: {},
    methods: {
      handleToolAction (tool) {
        console.log(tool, this)
        if (tool.alias === 'detail') {
          if (this.properties.layerName === 'GaodeTrafficPoint') {
            this.$store.dispatch('detailInfo', {
              model: '路况',
              lxbm: this.properties['lxbm'],
              sxxfx: this.properties['sxxfx'],
              zh: this.properties['zh'],
              ptx: this.properties['lng'],
              pty: this.properties['lat']
            })
          } else if (this.properties.layerName === 'BaiduTrafficPoint') {
            this.$store.dispatch('detailInfo', {
              model: '路况',
              lxbm: this.properties['lxbm'],
              sxxfx: this.properties['sxxfx'],
              zh: (this.properties['zdzh'] - this.properties['qdzh']) / 2 + this.properties['qdzh'],
              ptx: this.properties['ptx'],
              pty: this.properties['pty']
            })
          } else if (this.properties.layerName === 'JiaodiaozhanTrafficPoint') {
            this.$store.dispatch('detailInfo', {
              model: '路况',
              lxbm: this.properties['lxbm'],
              sxxfx: '3',
              zh: this.properties['zh'],
              ptx: this.properties['ptx'],
              pty: this.properties['pty']
            })
          } else if (this.properties.layerName === 'weatherPoints') {
            this.$store.dispatch('detailInfo', {
              model: '气象',
              lxbm: this.properties['lxbm'],
              sxxfx: this.properties['sxxfx'],
              zh: (this.properties['qdzh'] + this.properties['zdzh']) / 2,
              ptx: this.properties['ptx'],
              pty: this.properties['pty']
            })
          } else if (this.properties.layerName === 'LuwanEventPoint') {
            this.$store.dispatch('detailInfo', {
              model: '路网事件',
              lxbm: this.properties['roadNumber'],
              sxxfx: this.properties['sxxfx'],
              zh: (Number(this.properties['_roadStart']) + Number(this.properties['_roadEnd'])) / 2,
              ptx: this.properties['_roadStart'],
              pty: this.properties['_roadEnd']
            })
          } else if (this.properties.layerName === 'GaodeEventPoint') {
            this.$store.dispatch('detailInfo', {
              model: '高德事件',
              lxbm: this.properties['lxbm'],
              sxxfx: this.properties['sxxfx'],
              zh: this.properties['zh'],
              ptx: this.properties['qdzh'],
              pty: this.properties['zdzh']
            })
          }
        } else if (tool.alias === 'perimeter-search') {
          console.log(this.coordinates)
          this.createCircle(this.coordinates)
        }
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  @import "../../../../src/assets/variables";
  .arrow-wrap{
    width: 346px;
    height: 298px;
    background-color: #FFF;
    .arrow-right-wrap{
      width: 16px;
      height: 16px;
      position: absolute;
      top: 4px;
      right: -8px;
      transform: rotate(-45deg);
      background-color: #FFF;
      box-shadow: 1px 0 0 rgba(13, 5, 9, 0.15), 0 1px 0 rgba(13, 5, 9, 0.15), 0 -2px 0 rgba(13, 5, 9, 0), 0 -2px 0 rgba(13, 5, 9, 0)
    }
    .arrow-wrap-header{
      width: 100%;
      height: 34px;
      line-height: 34px;
      position: relative;
      color: #1a82ee;
      background-color: #daeafd;
      font-size: 13px;
      span{
        margin-left: 10px;
      }
      span:nth-child(2){
        float: right;
        margin-right: 10px;
        cursor: pointer;
        font-size: 12px;
        &:hover{
          font-size: 13px;
        }
      }
    }
    .arrow-wrap-content{
      height: calc(100% - 34px);
      padding: 10px 20px;
      z-index: 2;
      color: #585858;
      position: relative;
      background: #FFF;
      ul{
        list-style-type: none;
        li{
          line-height: 25px;
        }
      }
    }
  }
  .sf-popover {
    box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
    -ms-box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
    -webkit-box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);
    height: auto;
    font-family: SimSun;
    overflow: hidden;
    border-radius: 4px;
    &-header {
      &-title {
        color: #b8deff;
        font-weight: bold;
        font-size: 14px;
      }
      &-tool-content {
        position: relative;
        float: right;
        display: inline-block;
        top: -10px;
        right: -10px;
        .tools {
          height: 14px;
          display: inline-block;
          margin-right: -10px;
          &-icon {
            position: relative;
            margin-right: 20px;
            font-size: 14px;
            width: 14px;
            height: 14px;
            display: inline-block;
            color: #2487bb;
            top: -2px;
            &:hover {
              cursor: pointer;
              color: #7adaff;
            }
          }
          &-line {
            position: absolute;
            padding: 0;
            border: none;
            outline: none;
            top: 2px;
            right: -10px;
            width: 1px;
            height: 12px;
            background-color: rgba(32, 98, 125, .5);
            display: inline-block;
          }
        }
        .closer {
          padding: 0;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          i {
            font-size: 17px;
            color: #2487bb;
          }
          &:hover {
            i {
              cursor: pointer;
              color: #ff9c9c;
            }
          }
        }
      }
    }
    &-content {
      margin: 15px 0px 0px 0px;
      font-size: 12px;
      color: #7adaff;
      ul {
        li {
          line-height: 22px;
          margin-bottom: 10px;
        }
        li:nth-last-child(1) {
          margin-bottom: 0px;
        }
      }
    }
    &-bottom {
      width: 53px;
      height: 54px;
      position: absolute;
      left: calc(50% - 40px);
      bottom: -44px;
      background-image: url("../../../../static/images/popover.png");
      pointer-events: none;
      .single {
      }
    }
  }
</style>
