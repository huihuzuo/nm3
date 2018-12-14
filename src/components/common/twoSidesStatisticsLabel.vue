<template>
  <div class="twoSidesStatisticsLabel-wrap">
    <div class="twoSidesStatisticsLabel-wrap-list" v-for="item in list.content">
      <span class="twoSidesStatisticsLabel-wrap-item-left-label">
        <span class="twoSidesStatisticsLabel-wrap-item-left-label-num">{{item.leftContent[0].value}}</span>
        <span class="twoSidesStatisticsLabel-wrap-item-left-label-unit">{{item.leftContent[0].unit}}</span>
      </span>
      <span class="twoSidesStatisticsLabel-wrap-item-left">
        <span class="twoSidesStatisticsLabel-wrap-item" v-for="val in item.leftContent" :style="classLeftObject(val)"></span>
      </span>
      <span class="twoSidesStatisticsLabel-wrap-item-label">
        <span :class="item.selected ? 'selected' : ''" @click="checkType(item)">
          {{item.label}}
        </span>
      </span>
      <span class="twoSidesStatisticsLabel-wrap-item-right">
        <span class="twoSidesStatisticsLabel-wrap-item" v-for="val in item.rightContent" :style="classRightObject(val)"></span>
      </span>
      <span class="twoSidesStatisticsLabel-wrap-item-right-label">
        <span class="twoSidesStatisticsLabel-wrap-item-right-label-num">{{item.rightContent[0].value}}</span>
        <span class="twoSidesStatisticsLabel-wrap-item-right-label-unit">{{item.rightContent[0].unit}}</span>
      </span>
    </div>
  </div>
</template>
<style lang="scss">
  .twoSidesStatisticsLabel-wrap{
    width: 100%;
    height: 100%;
    margin-top: 12px;
    .twoSidesStatisticsLabel-wrap-list{
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      .twoSidesStatisticsLabel-wrap-item-left-label{
        width: 50px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        float: left;
        text-align: center;
      }
      .twoSidesStatisticsLabel-wrap-item-left{
        width: calc((100% - 100px - 75px - 20px) / 2);
        height: 100%;
        text-align: right;
        display: inline-block;
        span{
          color: #FFF;
          display: inline-block;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }
        .twoSidesStatisticsLabel-wrap-item{
          width: 15px;
          height: 10px;
          line-height: 10px;
          color: #FFF;
          background-color: red;
        }
      }
      .twoSidesStatisticsLabel-wrap-item-right-label{
        width: 50px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        float: right;
        text-align: center;
      }
      .twoSidesStatisticsLabel-wrap-item-right{
        width: calc((100% - 100px - 75px - 20px) / 2);
        height: 100%;
        text-align: left;
        display: inline-block;
        span{
          color: #FFF;
          display: inline-block;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
        .twoSidesStatisticsLabel-wrap-item{
          width: 15px;
          height: 10px;
          background-color: #9AC965;
          line-height: 10px;
          color: #FFF;
        }
      }
      .twoSidesStatisticsLabel-wrap-item-label{
        width: 75px;
        color: #2a2a2a;
        text-align: center;
        display: inline-block;
        .selected {
          border-radius: 3px;
          color: #0492EA;
        }
        span {
          padding: 2px 5px;
          border: 1px solid transparent;
          box-sizing: border-box;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  @keyframes mymove
  {
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
  export default{
    props: {
      list: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        leftMaxValue: 0,
        leftItemWidth: 10,
        rightMaxValue: 0,
        rightItemWidth: 10
      }
    },
    mounted () {
    },
    watch: {
      list: {
        handler (newValue, oldValue) {
          this.getValue()
        },
        deep: true
      }
    },
    created () {
      this.getValue()
      console.log('created')
    },
    beforeMount () {
      console.log('beforeMount')
    },
    methods: {
      getValue () {
        let num = this.maxNum()
        this.controlStyle(num)
      },
      maxNum () {
        return parseInt((80 - this.list.column * 10) / 10)
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
          this.rightItemWidth = (80 - this.list.column * 10) / this.rightMaxValue
        }
        if (this.leftMaxValue > num) {
          this.leftItemWidth = (80 - this.list.column * 10) / this.leftMaxValue
        }
      },
      classLeftObject (item) {
        console.log(this.leftItemWidth + '------------le111111ft----------------')
        return {
          'width': item.value * this.leftItemWidth + 'px',
          '--mymove': item.value * this.leftItemWidth + 'px',
          'background-color': item.color,
          'animation': 'mymove 2s'
        }
      },
      classRightObject (item) {
        console.log(this.rightItemWidth + '---------ri11111ght----------------')
        return {
          'width': item.value * this.rightItemWidth + 'px',
          '--mymove': item.value * this.rightItemWidth + 'px',
          'background-color': item.color,
          'animation': 'mymove 2s'
        }
      },
      checkType (item) {
        if (item) {
          this.$set(item, 'selected', !item.selected)
          this.$emit('selected', item)
        }
      }
    }
  }
</script>
