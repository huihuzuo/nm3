<template>
  <div class="block-statistic">
    <ul class="block-statistic-event-type clearfix">
      <li
        v-for="(item, index) in statistic"
        :style="{marginRight: (index + 1) % 2 !== 0 ? '10px' : 0}"
        :class="selected === item.code ? 'selected' : ''"
        @click="filterInfo(item)">
        <span>{{item.name}}</span>
        <span>{{item.count}}</span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  @import "../../assets/variables";
  .block-statistic {
    &-event-type {
      width: 100%;
      padding: 10px 0;
      li {
        color: #2A2A2C;
        float: left;
        width: 160px;
        height: 41px;
        line-height: 41px;
        font-size: 12px;
        text-align: center;
        margin-bottom: 10px;
        background-color: $panel-border-color;
        border-radius: 2px;
        opacity: 0.8;
        span:nth-child(1) {
          display: inline-block;
          height: 100%;
          position: relative;
          width: 65px;
          font-family: PingFang-SC-Regular;
          font-size: 12px;
          color: #292929;
          display: block;
          float: left;
          text-align: left;
          margin-left: 20px;
        }

        span:nth-child(2) {
          display: inline-block;
          font-style: inherit;
          width: 13px;
          font-family: PingFang-SC-Regular;
          font-size: 24px;
          float: left;
          margin-left: 10px;
        }
        &:hover {
          cursor: pointer;
          color: rgb(0, 153, 255);
        }
      }
      .selected {
        color: rgb(0, 153, 255);
      }
    }
  }
</style>
<script>
  export default{
    props: {
      statistic: {
        type: Array
      }
    },
    data () {
      return {
        historyItem: null,
        selected: ''
      }
    },
    mounted () {
    },
    computed: {},
    watch: {
    },
    methods: {
      filterInfo (item) {
        if (this.historyItem && this.historyItem.code !== item.code) {
          this.selected = null
          this.historyItem.flag = false
        }
        this.historyItem = item
        if (item.flag) {
          item.flag = false
          this.selected = null
        } else {
          item.flag = true
          this.selected = item.code
        }
        this.$emit('queryInfo', item)
      }
    },
    components: {}
  }
</script>
