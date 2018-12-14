<template>
  <div class="statistical-button" ref="statisticalButton">
    <div
      class="statistical-item"
      v-for="item in btnArray"
      @click="clickItem(item)">
      <div
        class="statistical-outer"
        :class="selected === item.label?'itemSelected':''">
        <div class="vertigo"></div>
        <div class="statistical-content">
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .statistical-button {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    background-color:rgb(218,234,253);
    margin-top:11px;
    border-radius:2px;
    .statistical-item {
      height: 100%;
      flex: 1;
      //border: 1px solid rgba(80, 175, 255, 0.2);
      border-right: none;
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        //border-right: 1px solid rgba(80, 175, 255, 0.2);
        border-radius: 0 4px 4px 0;
      }
    }
    .statistical-outer {
      width: 100%;
      height: 100%;
      display: flex;
      cursor: pointer;
      position: relative;
      justify-content: center;
      align-items: center;
      text-align: center;
      overflow: hidden;
      line-height: 38px;
      .vertigo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        //background: rgba(23, 84, 118, 0.8);
        filter: blur(10px);
        margin: auto;
        display: none;
      }
      .statistical-content {
        position: relative;
        z-index: 1;
        span {
          font-family: PingFang-SC-Regular;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          color: rgb(45,47,51);
        }
      }
      /*&:hover {
        .statistical-content {
          span {
            color: rgb(45,47,51);
          }
        }
        .vertigo {
          display: block;
        }
      }*/
    }
    .itemSelected {
      .statistical-content {
        span {
          color: rgb(64,158,255);
        }
      }
      .vertigo {
        display: block;
      }
    }
    .statistical-outer:last-child {
      border-right: none;
    }
  }
</style>
<script>
  export default {
    props: {
      btnArray: {
        type: Array,
        default: function () {
          return []
        }
      },
      isDefaultLook: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    data () {
      return {
        timer: null,
        selected: null,
        offsetHeight: '38px' // 给定默认值
      }
    },
    mounted () {
      if (this.btnArray && this.btnArray.length > 0) {
        this.clickItem(this.btnArray[0])
      }
    },
    watch: {
      btnArray (v, ov) {
        if (this.btnArray && this.btnArray.length > 0) {
          this.clickItem(this.btnArray[0])
        }
      }
    },
    methods: {
      clickItem: function (item) {
        this.selected = item.label
        this.$emit('click-item', item)
      }
    },
    components: {}
  }
</script>
