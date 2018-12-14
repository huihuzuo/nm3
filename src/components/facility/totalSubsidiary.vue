<template>
  <panel-mini title="附属设施统计" :show-close="false" class="total-subsidiary-wrap">
    <div slot="body">
      <div class="sub-item-wrap">
        <div class="sub-item" v-for="item in data">
          <span>{{item.name}}</span>
          <span class="sub-item-number">{{item.value}}</span>
          <span class="sub-item-split">/</span>
          <span>{{item.newValue}}</span>
        </div>
      </div>
    </div>
  </panel-mini>
</template>
<script>
  import panelMini from '../panels/panelMini'
  export default {
    data () {
      return {
        data: [
          {
            name: '出入口',
            value: 392,
            newValue: 38
          },
          {
            name: '情报板',
            value: 392,
            newValue: 38
          },
          {
            name: '监控设备',
            value: 392,
            newValue: 38
          },
          {
            name: '交调站',
            value: 392,
            newValue: 38
          },
          {
            name: '服务区',
            value: 392,
            newValue: 38
          },
          {
            name: '收费站',
            value: 392,
            newValue: 38
          },
          {
            name: '治超站',
            value: 392,
            newValue: 38
          }
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.getData()
      },
      getData () {
      }
    },
    components: {
      panelMini
    }
  }
</script>
<style lang="scss">
  @import "../../assets/variables";

  .total-subsidiary-wrap {
    .sub-item-wrap {
      display: flex;
      flex-wrap: wrap;
      margin: 10px;
      .sub-item {
        width: 174px;
        line-height: 30px;
        .sub-item-number {
          color: $panel-text-highlight-color;
          margin-left: 10px;
        }

        .sub-item-split {
          padding: 0 5px;
        }
      }
    }
  }
</style>
