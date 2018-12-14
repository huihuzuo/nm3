<template>
  <div class="sf-usr-tool">
    <el-tooltip
      class="tools-content"
      effect="dark"
      :content="item.name"
      :key="item.alias"
      v-for="item in lists"
      placement="top">
      <span
        class="tools-item iconfont"
        :class="[item.icon]"
        @click.stop="handleClick_(item)">
      </span>
    </el-tooltip>
  </div>
</template>

<script>
  import roadState from './roadState'
  export default {
    name: 'usr-tool',
    data () {
      return {
        showTraffic: false,
        tooltip: null,
        lists: [
          // {
          //   name: '图层叠加',
          //   icon: 'icon-tuceng',
          //   alias: 'layer',
          //   selected: false
          // }
        ]
      }
    },
    methods: {
      handleClick_ (item) {
        switch (item['alias']) {
          case 'zoomOut':
            this.$Maps.zoomOut()
            break
          case 'zoomIn':
            this.$Maps.zoomIn()
            break
          case 'layer':
            item.selected = !item.selected
            if (item.selected) {
              this.$store.dispatch('actionToolPanel', {
                type: item['alias'],
                params: ''
              })
            } else {
              this.$store.dispatch('actionToolPanel', {
                type: '',
                params: ''
              })
            }
            break
        }
      },
      closefunc_ () {
        this.showTraffic = false
      }
    },
    components: {
      roadState
    }
  }
</script>
<style lang="scss">
  .sf-usr-tool {
    width: auto;
    position: absolute;
    bottom: 20px;
    right: 2em;
    border-radius: 2px;
    color: #747474;
    background-color: #FFFFFF;
    .tools-item {
      border-radius: 2px;
      padding: 5px;
      font-size: 16px;
      color: #7c8196;
      width: 26px;
      background-color: #FFF;
      pointer-events: auto;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
      &:hover {
        cursor: pointer;
        color: #1b9de8;
      }
    }
    .selected {
      color: #1b9de8;
    }
  }
</style>
