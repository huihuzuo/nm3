<template>
  <div class="sf-map-tool">
    <el-tooltip
      class="tools-content"
      effect="dark"
      :content="item.name"
      :key="item.alias"
      v-for="item in menuList"
      placement="top">
      <span
        class="tools-item iconfont"
        :class="item.icon"
        @click="handleClick_(item)"></span>
    </el-tooltip>
  </div>
</template>
<script>
  export default {
    name: 'tool-box',
    data () {
      return {
        tooltip: null,
        menuList: [
          {
            name: '条件查询',
            icon: 'icon-chaxun1',
            alias: 'query',
            selected: false
          },
          {
            name: '标绘',
            icon: 'icon-zhongxiu',
            alias: 'plot',
            selected: false
          },
          {
            name: '绕行方案',
            icon: 'icon-lujing',
            alias: 'pathAnalysis',
            selected: false
          },
          {
            name: '图层',
            icon: 'icon-tuceng',
            alias: 'layer',
            selected: false
          },
          {
            name: '打印',
            icon: 'icon-wenbenwendang',
            alias: 'print',
            selected: false
          }
        ]
      }
    },
    methods: {
      handleClick_ (item) {
        switch (item['alias']) {
          case 'query':
          case 'plot':
          case 'pathAnalysis':
          case 'layer':
            this.$store.dispatch('actionToolPanel', {
              type: item['alias'],
              params: ''
            })
            break
          case 'print':
            break
        }
      }
    },
    components: {
    }
  }
</script>
<style lang="scss">
  .sf-map-tool {
    width: auto;
    position: absolute;
    bottom: 10px;
    left: 50%;
    border-radius: 5px;
    color: #747474;
    background-color: #FFFFFF;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
    transform: translate(-50%, 0px);
    .tools-item {
      display: inline-block;
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 22px;
      &:hover {
        cursor: pointer;
        color: #1b9de8;
      }
    }
  }
</style>
