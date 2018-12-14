<template>
  <div class="detail-structure-wrap">
    <type-tab
      :data-types="dataTypes"
      @dataTypeChange="dataTypeChange"
      :distance-default="distanceDefault"
      @distanceTypeChange="distanceTypeChange"
      @zbssConfirm="zbssConfirm"
      @yxssConfirm="yxssConfirm"></type-tab>

    <div class="detail-structure-body" v-if="datas.length >= 1">
      <ul class="clearfix">
        <li v-for="item in datas" :title="item.name || item.ysmc" @click="itemClick(item)" :class="item === currItem ? 'selected' : ''">{{item.name || item.ysmc}}</li>
      </ul>
      <detail-table :data="tableData" :field="field"></detail-table>
    </div>
    <div class="detail-structure-body detail-zwsj" v-if="datas.length < 1">
    </div>
  </div>
</template>
<script>
  import typeTab from './typeTab'
  import detailTable from './detailTable'
  import * as api from '@/store/api'

  export default {
    props: {
      roadDetail: {
        type: [Object],
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        datas: [],
        tableData: [],
        field: [],
        currItem: {},
        zbssValue: 5,
        yxssValue: [0, 0],
        point: 'POINT (115.35980401 2029.32696026)',
        lxbm: '',
        type: {
          GIS_QL: 'ql',
          GIS_SD: 'sd'
        },
        code: {
          GIS_QL: 'qldm',
          GIS_SD: 'sddm'
        },
        dataTypes: [
          {
            code: 'GIS_QL',
            name: '桥梁'
          },
          {
            code: 'GIS_SD',
            name: '隧道'
          }
        ],
        dataType: 'GIS_QL',
        distanceDefault: [
          {
            min: 0,
            max: 0,
            value: 0
          },
          {
            min: 0,
            max: 0,
            value: [0, 0]
          }
        ],
        distanceType: '1'
      }
    },
    mounted () {
      this.distanceDefault = [
        {
          min: 0.5,
          max: 20,
          value: this.zbssValue
        },
        {
          min: this.roadDetail.qdzh,
          max: this.roadDetail.zdzh,
          value: [Number(this.roadDetail.zxzh) - 5, Number(this.roadDetail.zxzh) + 5]
        }
      ]
      this.yxssValue = [Number(this.roadDetail.zxzh) - 5, Number(this.roadDetail.zxzh) + 5]
      this.point = 'POINT (' + this.roadDetail.ptx + ' ' + this.roadDetail.pty + ')'
      this.lxbm = this.roadDetail.lxbm
      this.getField({code: 'ql'})
    },
    methods: {
      // 获取周边资源数据
      getZbData (_params) {
        api.getRIM(_params).then(res => {
          this.datas = res.data.result
          if (this.datas.length < 1) return
          this.currItem = this.datas[0]
          this['get' + this.dataType + 'Detail'](this.currItem.code)
        })
      },
      // 获取沿线设施数据
      getYxData (_params) {
        api.getStructureList(_params).then(res => {
          this.datas = res.data.rows
          if (this.datas.length < 1) return
          this.currItem = this.datas[0]
          this['get' + this.dataType + 'Detail'](this.currItem[this.code[this.dataType]])
        })
      },
      // 获取字段信息
      getField (_params) {
        api.getField(_params).then(res => {
          this.field = res.data
          if (this.distanceType === '0') {
            this.getZbData({
              tables: this.dataType,
              center: this.point,
              distance: this.zbssValue,
              current: 1,
              limit: 10
            })
          } else {
            this.getYxData({
              current: 1,
              limit: 10,
              type: this.type[this.dataType],
              params: {
                lxbm: this.lxbm,
                zhfwMin: this.yxssValue[0],
                zhfwMax: this.yxssValue[1]
              }
            })
          }
        })
      },
      // 获取桥梁详情
      getGIS_QLDetail (_id) {
        api.getQlDetail({id: _id}).then(res => {
          this.tableData = res.data.tab[0].data
        })
      },
      // 获取隧道详情
      getGIS_SDDetail (_id) {
        api.getSdDetail({id: _id}).then(res => {
          this.tableData = res.data
        })
      },
      // 列表点击事件
      itemClick (item) {
        this.currItem = item
        this['get' + this.dataType + 'Detail'](item.code || this.currItem[this.code[this.dataType]])
      },
      // 数据类型改变事件
      dataTypeChange (code) {
        this.dataType = code
        this.getField({code: this.type[code]})
      },
      // 距离类型改变事件
      distanceTypeChange (code) {
        this.distanceType = code
        this.getField({code: this.type[this.dataType]})
      },
      // 周边设施确认
      zbssConfirm (value) {
        this.zbssValue = value
        this.getField({code: this.type[this.dataType]})
      },
      // 沿线设施确认
      yxssConfirm (value) {
        this.yxssValue = value
        this.getField({code: this.type[this.dataType]})
      }
    },
    components: {
      typeTab,
      detailTable
    }
  }
</script>
<style lang="scss">
  .detail-structure-wrap {
    padding: 10px;
    .detail-structure-body {
      padding: 10px 0;
      clear: both;
      &.detail-zwsj {
        height: 420px;
        background: url('../../../static/images/zwsj2.png') no-repeat center;
      }
      ul {
        margin-bottom: 5px;
        li {
          width: 110px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          float: left;
          transition: .3s;
          font-family: SimSun;
          &:hover {
            cursor: pointer;
            color: #b8deff;
          }
          &.selected {
            color: #b8deff;
          }
        }
      }
    }
  }
</style>
