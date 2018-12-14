<template>
  <menu-ani
    class="menu-center-wrapper"
    :menu-list="items"
    :start-angle="-20"
    :action-show="visible"
    :end-angle="340"
    :item-num="items.length + 1"
    :item-animation-delay="0.04"
    :animation-duration="0.2"
    @handleClick="callback"
    :radius="80"></menu-ani>
</template>
<style lang="scss">
  .context-menu-content {
    display: none;
    position: absolute;
    .menu-bar-con {
      display: none;
    }
  }
</style>
<script>
  import menuAni from '@/components/ui/menu'
  export default {
    data () {
      return {
        visible: false,
        items: [
          {
            name: '条件查询',
            icon: 'icon-xuanzhong',
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
            icon: 'icon-liangkeyiwei',
            alias: 'perimeter',
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
            icon: 'icon-jichusheshijiance',
            alias: 'print',
            selected: false
          }
        ]
      }
    },
    mounted () {
    },
    watch: {},
    methods: {
      callback (item) {
        console.log(item)
      }
    },
    components: {
      menuAni
    }
  }
</script>
