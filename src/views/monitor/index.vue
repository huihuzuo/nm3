<template>
  <div class="monitor-index">
    <panel ref="indexLeft" class="panel-outer" :showClose="false" :class="{true: 'expand', false: 'collapse'}[collapse]">
      <div class="list-navigation-outer" slot="head">
        <list-navigation :navigator="navigator" @click-navigator="clickNavigator"
                         :isDefaultLook="true"></list-navigation>
      </div>
      <div class="monitor-body" slot="body">
        <traffic v-if="showPanel === 'traffic'"></traffic>
        <event v-if="showPanel === 'event'"></event>
        <weather v-if="showPanel === 'weather'"></weather>
      </div>
    </panel>
    <!--<div class="collapse-wrap" @click="collapseClick" :class="{true: 'expand', false: 'collapse'}[collapse]"><span class="iconfont icon-youzhankai" :style="{transform: collapse ? 'rotateZ(180deg)' : 'rotateZ(0)'}"></span></div>-->
  </div>
</template>
<style lang="scss">
  .panel-body {
    height: calc(100% - 40px);
  }

  .monitor-index {
    width: 100%;
    height: 100%;
    .panel-outer {
      position: absolute;
      top: 10px;
      bottom: 10px;
      &.expand {
        left: 10px;
      }
      &.collapse {
        left: -400px;
      }
      .list-navigation-outer {
        width: 100%;
        height: 40px;
      }
      .monitor-body {
        width: 100%;
        height: 100%;
      }
    }

    .collapse-wrap {
      pointer-events: auto;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      height: 70px;
      line-height: 70px;
      width: 15px;
      text-align: center;
      background: #023142;
      border-color: rgba(80, 175, 255, 0.6);
      border-style: solid;
      border-width: 1px 1px 1px 0;
      overflow: hidden;
      border-radius: 0 3px 3px 0;
      &:hover {
        cursor: pointer;
      }
      &.expand {
        left: 396px;
      }
      &.collapse {
        left: 0;
      }
      span {
        transition: .3s;
        display: inline-block;
        font-size: 14px;
      }
    }
  }
</style>
<script>
  import listNavigation from './children/navigation/listNavigation'
  import traffic from './children/body/traffic'
  import event from './children/body/event'
  import weather from './children/body/weather'
  export default {
    props: {},
    data () {
      return {
        navigator: [
          {
            label: '路况',
            alias: 'traffic'
          },
          {
            label: '事件',
            alias: 'event'
          },
          {
            label: '气象',
            alias: 'weather'
          }
        ],
        showPanel: null,
        collapse: true
      }
    },
    mounted () {
    },
    watch: {},
    methods: {
      clickNavigator: function (item) {
        console.log(item)
        this.showPanel = item.alias
      },
      collapseClick () {
        this.collapse = !this.collapse
      }
    },
    components: {
      listNavigation,
      traffic,
      event,
      weather
    }
  }
</script>
