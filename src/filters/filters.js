import moment from 'moment'
import { returnFloat } from '@/helper'
export default {
  dateFormat: function (value, format, isUnix) {
    if (value === undefined) return
    format = format || 'YYYY-MM-DD HH:mm:ss'
    return isUnix ? moment.unix(value).format(format) : moment(value).format(format)
  },
  /**
   * 格式化桩号
   * @param value
   * @returns {*}
   */
  formatZh: function (value) {
    if (typeof value !== 'number') {
      value = Number(value)
    }
    if (value !== null && value !== 'undefined') {
      value = parseFloat(value).toFixed(3)
      value = returnFloat(value)
      value = value.toString().replace('.', ' + ')
      return 'K' + value
    }
    return 'K' + value
  },
  formatReason: function (value) {
    if (value !== null && value !== 'undefined') {
      let arr = value.split('nbsp;')
      return arr[arr.length - 1]
    }
    return ''
  },
  toFixed: function (value) {
    if (value !== null && value !== 'undefined') {
      let _value = parseFloat(value)
      return _value.toFixed(3)
    }
    return ''
  },
  // 桥梁详情  小数点去除后面的0
  clearZero: function (res) {
    if (res === undefined) return
    if (res !== null || res !== '' || res !== undefined) {
      return parseFloat(res)
    }
  },
  // 隧道详情 小数点后保留两位
  doubleFixed: function (value) {
    if (value !== null && value !== 'undefined') {
      let _value = parseFloat(value)
      return _value.toFixed(2)
    }
    return ''
  },
  formatIf (value) {
    if (value === 1) {
      return '是'
    }
    if (value === 0) {
      return '否'
    }
    // return '-'
  },
  formatSszt (value) {
    if (value === 0) {
      return '稳定'
    }
    if (value === 1) {
      return '基本稳定'
    }
    if (value === 2) {
      return '不稳定'
    }
    return '-'
  },
  formatSxxfx (value) {
    if (value === 1 || value === '1') {
      return '上行'
    }
    if (value === 2 || value === '2') {
      return '下行'
    }
    if (value === 3 || value === '3') {
      return '双向'
    }
    return '-'
  },
  gaodeEventState (value) {
    if (value === 1 || value === '1') {
      return '拥堵'
    }
    if (value === 2 || value === '2') {
      return '趋向严重'
    }
    if (value === 3 || value === '3') {
      return '趋向疏通'
    }
    return '-'
  },
  formatReport (value) {
    if (value === 0) {
      return '未上报'
    }
    if (value === 1) {
      return '已上报'
    }
    return '-'
  },
  formatNone (value) {
    if (value !== undefined && value !== '') {
      return value
    } else {
      return '-'
    }
  },
  formatTime (value) {
    if (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    } else {
      return '-'
    }
  },

  /**
   * 将首字母转换为大写
   * @param str
   */
  upperFirstChart (str) {
    return (str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()))
  },
  /**
   * 保留小数处理
   * @param value
   * @param num
   * @returns {*}
   */
  keepDecimal (value, num) {
    if (value) {
      value = parseFloat(value).toFixed(num)
    }
    return value
  },
  formatRoadStatus (value) {
    switch (value) {
      case 1:
        return '畅通' // #4fd27d
      case 2:
        return '缓行' // #ffd045
      case 3:
        return '拥挤' // #e80e0e
      case 4:
        return '严重拥堵' // #b40000
    }
  },
  formatStationStatus (value) {
    if (typeof value !== 'number') {
      value = Number(value)
    }
    switch (value) {
      case 1:
        return '畅通'
      case 2:
        return '缓行'
      case 3:
        return '缓行'
      case 4:
        return '拥挤'
      case 5:
        return '严重拥堵'
    }
  }
}
