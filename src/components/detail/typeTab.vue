<template>
  <div class="type-tab-wrap">
    <div class="type-tab" v-if="showType">
      <div v-for="type in dataTypes"
           :class="type.code === dataType ? 'selected' : ''"
           @click="dataTypeClick(type)"><span>{{type.name}}</span></div>
    </div>

    <div class="distance-type">
      <div v-for="type in distanceTypes"
           :class="type.code === distanceType ? 'selected' : ''"
           @click="distanceTypeClick(type)"><span>{{type.name}}</span></div>
    </div>
    <div class="slider-wrap" v-show="distanceTypes[0].show">
      <el-slider
        v-model="distanceTypes[0].value"
        :min="distanceDefault[0].min"
        :max="distanceDefault[0].max"
        :step="0.5"
        :format-tooltip="formatZbss"></el-slider>
      <div class="slider-btn">
        <span @click="zbssConfirm">确定</span>
        <span @click="distanceTypes[0].show = false">取消</span>
      </div>
    </div>

    <div class="slider-wrap" v-show="distanceTypes[1].show">
      <el-slider
        v-model="distanceTypes[1].value"
        range
        :step="5"
        :min="distanceDefault[1].min"
        :max="distanceDefault[1].max"
        :format-tooltip="formatYxss"></el-slider>
      <div class="slider-btn">
        <span @click="yxssConfirm">确定</span>
        <span @click="distanceTypes[1].show = false">取消</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      dataTypes: {
        type: [Array],
        default: function () {
          return [
            {
              code: '0',
              name: '行业'
            },
            {
              code: '1',
              name: '高德'
            }
          ]
        }
      },
      distanceDefault: {
        type: [Array],
        default: function () {
          return [
            {
              min: 10,
              max: 30,
              value: 0
            },
            {
              min: 10,
              max: 30,
              value: [0, 20]
            }
          ]
        }
      },
      showType: {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    watch: {
      distanceDefault: function (v) {
        this.distanceTypes[0].value = v[0].value
        this.distanceTypes[1].value = v[1].value
      }
    },
    data () {
      return {
        dataType: '0',
        distanceTypes: [
          {
            code: '0',
            name: '周边搜索',
            value: 0,
            show: false,
            func: 'zbssShowFunc'
          },
          {
            code: '1',
            name: '沿线设施',
            value: [0, 0],
            show: false,
            func: 'yxssShowFunc'
          }
        ],
        distanceType: '1'
      }
    },
    mounted () {
      this.dataType = this.dataTypes[0].code
    },
    methods: {
      // 数据类型点击事件
      dataTypeClick (type) {
        this.dataType = type.code
        this.$emit('dataTypeChange', type.code)
      },
      // 距离类型点击事件
      distanceTypeClick (type) {
        this.distanceType = type.code
        this[type.func]()
        this.$emit('distanceTypeChange', type.code)
      },
      // 周边资源显示
      zbssShowFunc () {
        this.distanceTypes[0].show = !this.distanceTypes[0].show
        this.distanceTypes[1].show = false
      },
      // 沿线设施显示
      yxssShowFunc () {
        this.distanceTypes[1].show = !this.distanceTypes[1].show
        this.distanceTypes[0].show = false
      },
      // 周边资源确定事件
      zbssConfirm () {
        this.distanceTypes[0].show = false
        this.$emit('zbssConfirm', this.distanceTypes[0].value)
      },
      // 沿线设施确定事件
      yxssConfirm () {
        this.distanceTypes[1].show = false
        this.$emit('yxssConfirm', this.distanceTypes[1].value)
      },
      formatZbss (val) {
        return val + 'km'
      },
      formatYxss (val) {
        return 'K' + val
      }
    }
  }
</script>
<style lang="scss">
  .type-tab-wrap {
    .type-tab {
      float: left;
      border: solid 1px rgba(80, 175, 255, 0.2);
      border-radius: 4px;
      background-color: #023142;
      height: 30px;
      line-height: 28px;
      /*box-shadow: inset 0 0 10px 2px rgba(80, 175, 255, 0.6);*/
      div {
        position: relative;
        display: inline-block;
        text-align: center;
        width: 124px;
        overflow: hidden;
        span {
          position: relative;
        }
        &.selected {
          color: #b8deff;
          &:before {
            position: absolute;
            left: 0;
            top: 0;
            display: inline-block;
            content: ' ';
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #175476cc;
            filter: blur(10px);;
          }
        }
        &:hover {
          cursor: pointer;
        }
        &:after {
          display: inline-block;
          width: 1px;
          height: 28px;
          content: ' ';
          float: left;
          background: rgba(80, 175, 255, 0.2);
        }
        &:first-child:after {
          display: none;
        }
      }
    }

    .distance-type {
      float: right;
      height: 30px;
      line-height: 28px;
      div {
        position: relative;
        display: inline-block;
        text-align: center;
        width: 75px;
        span {
          position: relative;
          font-family: SimSun;
        }
        &.selected {
          color: #b8deff;
        }
        &:hover {
          cursor: pointer;
        }
        &:last-child:after {
          display: inline-block;
          width: 1px;
          height: 12px;
          margin-top: 9px;
          content: ' ';
          float: left;
          background: #20627d;
        }
      }
    }

    .slider-wrap {
      background: #fff;
      box-shadow: 0 3px 9px 0 rgba(13, 4, 9, 0.3);
      border-radius: 3px;
      padding: 0 20px;
      width: 230px;
      position: absolute;
      right: 0;
      top: 50px;
      z-index: 1;
      .slider-btn {
        text-align: center;
        padding-bottom: 5px;
        span {
          display: inline-block;
          padding: 2px;
          border-radius: 3px;
          transition: .3s;
          &:hover {
            cursor: pointer;
            background: #ccc;
          }
        }
      }
    }
  }
</style>
