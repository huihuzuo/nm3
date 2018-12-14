<template>
  <div class="setting-wrap">
    <div class="setting-wrap-scroll">
      <div class="setting-wrap-header">互联网监测阈值设置</div>
      <div class="setting-wrap-content">
        <div class="setting-wrap-content-traffic">
          <div class="header">
            <span><label></label>交通流（百度）</span>
            <span class="save" @click="handleClick('traffic')">保存</span>
          </div>
          <div class="content">
            <ul>
              <div v-for="(i, key) in trafficForm" :key="key + 100">
                <li v-for="(item, index) in i.alertColumnList" :key="index">
                  <span class="select"><el-checkbox v-model="item.enable"/></span>
                  <span class="title">{{item.columnName}}</span>
                  <span class="char">{{item.char}}</span>
                  <span class="value"><el-input v-model="item.maxValue"/></span>
                  <span class="unit">{{item.unit}}</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div class="setting-wrap-content-traffic">
          <div class="header">
            <span><label></label>路网事件</span>
            <span class="save" @click="handleClick('event')">保存</span>
          </div>
          <div class="content">
            <ul>
              <div v-for="(i, key) in eventForm" :key="key + 100">
                <li v-for="(item, index) in i.alertColumnList" :key="index">
                  <span class="select"><el-checkbox v-model="item.enable"/></span>
                  <span class="title">{{item.columnName}}</span>
                  <span class="char">{{item.char}}</span>
                  <span class="value"><el-input v-model="item.maxValue"/></span>
                  <span class="unit">{{item.unit}}</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div class="setting-wrap-content-weather">
          <div class="header">
            <span><label></label>气象监测</span>
            <span class="save" @click="handleClick('weather')">保存</span>
          </div>
          <div class="content">
            <div class="content-item" v-for="(item, index) in weatherForm" :key="index">
              <div class="header">{{item.label}}</div>
              <div class="ul-li">
                <ul>
                  <li v-for="(i, key) in item.alertColumnList" :key="key + 100">
                    <span class="select"><el-checkbox v-model="i.enable"/></span>
                    <span class="title">{{i.columnName}}</span>
                    <span class="char">{{i.char}}</span>
                    <span class="value"><el-input v-model="i.maxValue"/></span>
                    <span class="unit">{{i.unit}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'setting',
    data () {
      return {
        checked: false,
        trafficForm: [
          {
            catalog: 'bdtraffic',
            alertColumnList: [
              {
                enable: false,
                columnName: '拥堵里程',
                char: '≥',
                maxValue: '',
                unit: '公里',
                column: 'len'
              },
              {
                enable: false,
                columnName: '拥堵时长',
                char: '≥',
                maxValue: '',
                unit: '小时',
                column: 'LONGTIME'
              }
            ]
          }
        ],
        eventForm: [
          {
            catalog: 'event',
            alertColumnList: [
              {
                enable: false,
                columnName: '影响里程',
                char: '≥',
                maxValue: '',
                unit: '公里',
                column: 'INFLUENCE_DIST'
              },
              {
                enable: false,
                columnName: '影响时长',
                char: '≥',
                maxValue: '',
                unit: '小时',
                column: 'INFLUENCE_DURATION'
              }
            ]
          }
        ],
        weatherForm: [
          {
            label: '能见度',
            catalog: 'visibility',
            alertColumnList: [
              {
                enable: false,
                columnName: '影响里程',
                char: '≥',
                maxValue: '',
                unit: '公里',
                column: 'INFLUENCE_DIST'
              },
              {
                enable: false,
                columnName: '持续时长',
                char: '≥',
                maxValue: '',
                unit: '小时',
                column: 'INFLUENCE_DURATION'
              },
              {
                enable: false,
                columnName: '能见度值',
                char: '≥',
                maxValue: '',
                unit: '米',
                column: 'sz'
              }
            ]
          },
          {
            label: '降水',
            catalog: 'rainfall',
            alertColumnList: [
              {
                enable: false,
                columnName: '影响里程',
                char: '≥',
                maxValue: '',
                unit: '公里',
                column: 'INFLUENCE_DIST'
              },
              {
                enable: false,
                columnName: '持续时长',
                char: '≥',
                maxValue: '',
                unit: '小时',
                column: 'INFLUENCE_DURATION'
              },
              {
                enable: false,
                columnName: '降水量',
                char: '≥',
                maxValue: '',
                unit: 'mm',
                column: 'sz'
              }
            ]
          },
          {
            label: '温度',
            catalog: 'TEMP',
            alertColumnList: [
              {
                enable: false,
                columnName: '影响里程',
                char: '≥',
                maxValue: '',
                unit: '公里',
                column: 'INFLUENCE_DIST'
              },
              {
                enable: false,
                columnName: '持续时长',
                char: '≥',
                maxValue: '',
                unit: '小时',
                column: 'INFLUENCE_DURATION'
              },
              {
                enable: false,
                columnName: '最高气温',
                char: '≥',
                maxValue: '',
                unit: '℃',
                column: 'sz'
              },
              {
                enable: false,
                columnName: '最低气温',
                char: '≥',
                maxValue: '',
                unit: '℃',
                column: 'sz'
              }
            ]
          },
          {
            label: '风力',
            catalog: 'windpower',
            alertColumnList: [
              {
                enable: false,
                columnName: '影响里程',
                char: '≥',
                maxValue: '',
                unit: '公里',
                column: 'INFLUENCE_DIST'
              },
              {
                enable: false,
                columnName: '持续时长',
                char: '≥',
                maxValue: '',
                unit: '小时',
                column: 'INFLUENCE_DURATION'
              },
              {
                enable: false,
                columnName: '风速',
                char: '≥',
                maxValue: '',
                unit: 'm/s',
                column: 'sz'
              }
            ]
          }
        ]
      }
    },
    mounted () {
      this.getWeather()
      this.getTraffic()
      this.getEvent()
    },
    methods: {
      /**
       * 气象数据加载
       */
      getWeather () {
        this.$fetch.getWeather().then(res => {
          if (res.successed) {
            this.formatResult(res.data, 'weatherForm')
          } else {
            this.$message.error('气象数据加载失败')
          }
        }).catch(error => {
          this.$message.error('气象数据加载失败')
          console.warn(error)
        })
      },
      /**
       * 路况数据加载
       */
      getTraffic () {
        this.$fetch.getTraffic().then(res => {
          if (res.successed) {
            this.formatResult(res.data, 'trafficForm')
          } else {
            this.$message.error('路况数据加载失败')
          }
        }).catch(error => {
          this.$message.error('路况数据加载失败')
          console.warn(error)
        })
      },
      /**
       * 事件数据加载
       */
      getEvent () {
        this.$fetch.getEvent().then(res => {
          if (res.code === '1') {
            this.formatResult(res.result, 'eventForm')
          } else {
            this.$message.error('事件数据加载失败')
          }
        }).catch(error => {
          this.$message.error('事件数据加载失败')
          console.warn(error)
        })
      },
      /**
       * 格式化查询结果
       */
      formatResult (result, alias) {
        result.forEach((resultItem, resultIndex) => {
          this[alias].forEach((weatItem, weatIndex) => {
            if (resultItem['catalog'] === weatItem['catalog']) {
              resultItem['alertColumnList'].forEach((resI, resIn) => {
                weatItem['alertColumnList'].forEach((weaI, weaIn) => {
                  if (resI['columnName'] === weaI['columnName'] && resI['column'] === weaI['column']) {
                    weaI['maxValue'] = resI['maxValue']
                    weaI['enable'] = resI['enable']
                  }
                })
              })
            }
          })
        })
      },
      /**
       * 保存事件
       * @param alias
       */
      handleClick (alias) {
        let [result, obj, temp, value] = [[], {}, {}, '']
        switch (alias) {
          case 'traffic':
            this.$fetch.settingTrafficSave(this.trafficForm).then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
                this.getTraffic()
              } else {
                this.$message.error('保存失败')
              }
            }).catch(error => {
              this.$message.error('保存失败')
              console.warn(error)
            })
            break
          case 'event':
            this.$fetch.settingEventSave(this.eventForm).then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
                this.getEvent()
              } else {
                this.$message.error('保存失败')
              }
            }).catch(error => {
              this.$message.error('保存失败')
              console.warn(error)
            })
            break
          case 'weather':
            this.weatherForm.forEach((item, index) => {
              obj = {
                catalog: item.catalog,
                alertColumnList: []
              }
              if (item['label'] === '温度') {
                item.alertColumnList.forEach((i, key) => {
                  if (i.title === '最高气温') {
                    value = i.model
                  } else {
                    if (i.title === '最低气温') {
                      temp = {
                        column: i.column,
                        columnName: i.columnName,
                        enable: i.enable,
                        maxValue: Number(i.maxValue),
                        minValue: Number(value)
                      }
                    } else {
                      temp = {
                        column: i.column,
                        columnName: i.columnName,
                        enable: i.enable,
                        maxValue: Number(i.maxValue)
                      }
                    }
                    obj['alertColumnList'].push(temp)
                  }
                })
              } else {
                item.alertColumnList.forEach((i, key) => {
                  temp = {
                    column: i.column,
                    columnName: i.columnName,
                    enable: i.enable,
                    maxValue: Number(i.maxValue)
                  }
                  obj['alertColumnList'].push(temp)
                })
              }
              result.push(obj)
            })
            this.$fetch.settingWeatherSave(result).then(res => {
              if (res.code === '1') {
                this.getWeather()
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
              } else {
                this.$message.error('保存失败')
              }
            }).catch(error => {
              this.$message.error('保存失败')
              console.warn(error)
            })
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  .setting-wrap{
    width: 100%;
    height: 100%;
    .setting-wrap-scroll{
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .setting-wrap-header{
        heigth: 50px;
        width: 100%;
        line-height: 50px;
        font-family: SimSun;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #59aaff;
        border-bottom: 1px #f1f1f1 solid;
      }
      .setting-wrap-content{
        width: 915px;
        height: calc(100% - 50px);
        margin: auto;
        .save{
          cursor: pointer;
        }
        .setting-wrap-content-traffic{
          width: 100%;
          height: auto;
          overflow: hidden;
          margin-top: 19px;
          .header{
            height: 35px;
            color: #1a82ee;
            font-size: 12px;
            border-bottom: 1px #f1f1f1 solid;
            span{
              display: inline-block;
            }
            span:nth-child(1){
              float: left;
              label{
                width: 4px;
                height: 12px;
                background-color: #1a82ee;
                display: inline-block;
                margin-right: 8px;
              }
            }
            span:nth-child(2){
              float: right;
            }
          }
          .content{
            margin-left: 188px;
            height: auto;
            overflow: hidden;
            color: #3c3c3c;
            .header{
              width: 100px;
              height: 100%;
              line-height: 100px;
              display: inline-block;
            }
            ul{
              list-style-type: none;
              li{
                margin-top: 30px;
                span{
                  display: inline-block;
                }
                .select{

                }
                .title{
                  padding: 0 10px;
                }
                .char{
                  padding: 0 10px;
                }
                .value{
                  padding: 0 10px;
                  width: 95px;
                }
                .unit{
                  padding: 0 10px;
                }
              }
            }
          }
        }
        .setting-wrap-content-weather{
          width: 100%;
          height: auto;
          overflow: hidden;
          margin-top: 19px;
          .header{
            height: 35px;
            color: #1a82ee;
            font-size: 12px;
            span{
              display: inline-block;
            }
            span:nth-child(1){
              float: left;
              label{
                width: 4px;
                height: 12px;
                background-color: #1a82ee;
                display: inline-block;
                margin-right: 8px;
              }
            }
            span:nth-child(2){
              float: right;
            }
          }
          .content{
            height: auto;
            overflow: hidden;
            color: #3c3c3c;
            margin-left: 90px;
            .content-item{
              width: 50%;
              height: auto;
              overflow: hidden;
              float: left;
              .header{
                width: 100px;
                height: 100%;
                line-height: 100px;
                display: inline-block;
                float: left;
              }
              .ul-li{
                width: calc(100% - 100px);
                height: auto;
                overflow: hidden;
                float: left;
                ul{
                  list-style-type: none;
                  li{
                    margin-top: 30px;
                    span{
                      display: inline-block;
                    }
                    .select{

                    }
                    .title{
                      width: 68px;
                      padding: 0 10px;
                    }
                    .char{
                      padding: 0 10px;
                    }
                    .value{
                      padding: 0 10px;
                      width: 95px;
                    }
                    .unit{
                      padding: 0 10px;
                    }
                  }
                }
              }
            }

          }
        }
      }
    }
  }
</style>
