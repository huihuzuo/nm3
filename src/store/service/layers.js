import axios from 'axios'
import { layerTools } from '../api'
const QX_SERVICES = config.service.weather

const reventData = (datas, pId, filed) => {
  const nodes = []
  const _tree = {}
  for (let i = 0; i < datas.length; i++) {
    _tree[datas[i]['id']] = datas[i]
  }
  for (let j = 0; j < datas.length; j++) {
    if (datas[j]['isParent']) {
      datas[j]['disableCheckBox'] = true
    } else {
      datas[j]['disableCheckBox'] = false
      datas[j]['transparentValue'] = 70
    }
    if (_tree[datas[j]['pId']] && datas[j]['id'] !== datas[j]['pId']) {
      if (!_tree[datas[j]['pId']]['children']) {
        _tree[datas[j]['pId']]['children'] = []
      }
      _tree[datas[j]['pId']]['children'].push(datas[j])
    } else {
      nodes.push(datas[j])
    }
  }
  return nodes
}

export default {
  // 图层叠加
  getLayersTree () {
    return axios.get(layerTools, {
      baseURL: ''
    }).then(res => {
      let nodes = []
      if (res.data) {
        nodes = reventData(res.data, '0', 'pId')
      }
      return nodes
    })
  },
  // 获取气象图层图片列表(并按日期重新排序)
  getLayerImages (params) {
    const that = this
    return axios.get(params.url, {
      params: {
        fullDay: params.fullDay
      },
      baseURL: ''
    }).then(res => {
      let [r] = []
      if (res['data']['data'] && res['data']['data'].length > 0) {
        r = res['data']['data'].reverse()
      }
      return new Promise(resolve => {
        const promiseData = that.getImagesBuffer(r)
        if (promiseData.length > 0) {
          Promise.all(promiseData).then(function (res) {
            if (res && res.length > 0) {
              for (let i = 0; i < res.length; i++) {
                r[i]['url'] = URL.createObjectURL(new Blob([res[i]], {type: 'image/png'}))
              }
            }
            resolve(r)
          })
        }
      })
    })
  },
  // 气象图例服务
  getLegendsLayer (_params) {
    return axios.get('/rest/getLegends', {
      params: _params,
      baseURL: QX_SERVICES
    })
  },
  // 获取气象点击详情
  getRasterValue (_params) {
    return axios.get('/rest/getRasterValue', {
      params: _params,
      baseURL: QX_SERVICES
    })
  },
  // 获取图片 buffer
  getImagesBuffer (datas) {
    const imagesPromise = []
    if (datas && datas.length > 0) {
      for (let i = 0; i < datas.length; i++) {
        imagesPromise.push(this._getImageData(datas[i]))
      }
    }
    return imagesPromise
  },
  // 获取真实图片数据
  _getImageData (item) {
    return axios({
      url: item['url'],
      method: 'get',
      responseType: 'blob'
    }).then(res => {
      return new Promise(resolve => {
        resolve(res['data'])
      })
    })
  },

  /**
   * get windy data
   * @param url
   * @returns {Promise<AxiosResponse<any>>}
   */
  getWindyData (url) {
    return axios.get(url).then(res => {
      return res.data
    })
  }
}
