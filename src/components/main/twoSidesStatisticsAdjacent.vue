<template>
  <div class="twoSidesStatisticsLabelAdjacent-wrap">
    <div class="twoSidesStatisticsLabelAdjacent-wrap-list" v-for="item in list.content">
      <div class="twoSidesStatisticsLabelAdjacent-wrap-item-left">
        <span class="twoSidesStatisticsLabelAdjacent-wrap-item-left-label-num">{{item.leftContent[0].value}}</span>
        <span class="twoSidesStatisticsLabelAdjacent-wrap-item" v-for="val in item.leftContent"
              :style="classLeftObject(val)"></span>
      </div>
      <div class="twoSidesStatisticsLabelAdjacent-wrap-item-label">{{item.label}}</div>
      <div class="twoSidesStatisticsLabelAdjacent-wrap-item-right">
        <span class="twoSidesStatisticsLabelAdjacent-wrap-item" v-for="val in item.rightContent"
              :style="classRightObject(val)"></span>
        <span class="twoSidesStatisticsLabelAdjacent-wrap-item-right-label-num">{{item.rightContent[0].value}}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../assets/variables";

  .twoSidesStatisticsLabelAdjacent-wrap {
    width: 100%;
    height: 100%;
    margin-top: 12px;
    .twoSidesStatisticsLabelAdjacent-wrap-list {
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      .twoSidesStatisticsLabelAdjacent-wrap-item-left {
        width: calc((100% - 30px - 20px) / 2);
        height: 100%;
        text-align: right;
        display: inline-block;
        span {
          display: inline-block;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }
        .twoSidesStatisticsLabelAdjacent-wrap-item-left-label-num {
          font-size: 18px;
          color: $panel-text-color;
          margin-right: 10px;
        }
        .twoSidesStatisticsLabelAdjacent-wrap-item {
          width: 15px;
          height: 6px;
          line-height: 6px;
          color: #FFF;
          background-color: red;
          margin-right: 5px;
        }
      }
      .twoSidesStatisticsLabelAdjacent-wrap-item-right {
        width: calc((100% - 30px - 20px) / 2);
        height: 100%;
        text-align: left;
        display: inline-block;
        span {
          display: inline-block;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
        .twoSidesStatisticsLabelAdjacent-wrap-item-right-label-num {
          font-size: 18px;
          color: #348cee;
          margin-left: 10px;
        }
        .twoSidesStatisticsLabelAdjacent-wrap-item {
          width: 15px;
          height: 6px;
          background-color: #9AC965;
          margin-left: 5px;
          line-height: 6px;
          color: #FFF;
        }
      }
      .twoSidesStatisticsLabelAdjacent-wrap-item-label {
        width: 30px;
        color: $panel-text-color;
        text-align: center;
        display: inline-block;
      }
    }
  }

  @keyframes mymove {
    from {
      width: 0px;
    }
    to {
      width: var(--mymove);
    }
  }

  @-webkit-keyframes mymove /* Safari and Chrome */
  {
    from {
      width: 0px;
    }
    to {
      width: auto;
    }
  }

</style>
<script>
  export default {
    props: {
      list: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        leftMaxValue: 0,
        leftItemWidth: 5,
        rightMaxValue: 0,
        rightItemWidth: 5
      }
    },
    mounted () {
    },
    watch: {},
    created () {
      this.getValue()
    },
    beforeMount () {
    },
    methods: {
      getValue () {
        let num = this.maxNum()
        this.controlStyle(num)
      },
      maxNum () {
        return parseInt((90 - this.list.column * 10) / 5)
      },
      controlStyle (num) {
        let [obj, len] = [this.list.content, this.list.content.length]
        let [leftArr, rightArr] = [[], []]
        if (this.list.column === 2) {
          for (let i = 0; i < len; i++) {
            leftArr.push(obj[i].leftContent.reduce(function (p1, p2, p3, p4) {
              console.log(p1)
              console.log(p2)
              return p1.value + p2.value
            }))
            rightArr.push(obj[i].rightContent.reduce(function (p1, p2, p3, p4) {
              console.log(p1)
              console.log(p2)
              return p1.value + p2.value
            }))
          }
        } else if (this.list.column === 1) {
          for (let i = 0; i < len; i++) {
            leftArr.push(obj[i].leftContent[0].value)
            rightArr.push(obj[i].rightContent[0].value)
          }
        }
        this.leftMaxValue = Math.max.apply(null, leftArr)
        this.rightMaxValue = Math.max.apply(null, rightArr)
        if (this.rightMaxValue > num) {
          this.rightItemWidth = (90 - this.list.column * 10) / this.rightMaxValue
        }
        if (this.leftMaxValue > num) {
          this.leftItemWidth = (90 - this.list.column * 10) / this.leftMaxValue
        }
      },
      classLeftObject (item) {
        return {
          'width': item.value * this.leftItemWidth + 'px',
          '--mymove': item.value * this.leftItemWidth + 'px',
          'background-color': item.color,
          'animation': 'mymove 2s'
        }
      },
      classRightObject (item) {
        return {
          'width': item.value * this.rightItemWidth + 'px',
          '--mymove': item.value * this.rightItemWidth + 'px',
          'background-color': item.color,
          'animation': 'mymove 2s'
        }
      }
    }
  }
</script>
