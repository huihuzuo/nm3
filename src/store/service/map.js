import axios from 'axios'
import { isString, isObject } from '@/helper'
import jsonp from '@/helper/jsonp'

const getLayerServiceUrl = url_ => {
  if (isString(url_)) {
    if (/{x}/.test(url_)) {
      return url_.replace('MapServer/tile/{z}/{y}/{x}', 'MapServer')
    } else if (/MapServer/.test(url_)) {
      return url_.replace('MapServer', 'MapServer')
    }
  }
}

export default {
  /**
   * 获取arcgis配置
   * @param _layer
   * @returns {AxiosPromise}
   */
  getArcParams (_layer) {
    return jsonp(getLayerServiceUrl(_layer.layerUrl) + '?f=pjson')
  },

  /**
   * 获取范围
   * @param data
   * @returns {*[]}
   * @private
   */
  getExtent_ (data) {
    return [data['fullExtent'].xmin, data['fullExtent'].ymin, data['fullExtent'].xmax, data['fullExtent'].ymax]
  },

  /**
   * 获取切片原点
   * @param data
   * @returns {*[]}
   * @private
   */
  getOrigin_ (data) {
    return [data.tileInfo.origin.x, data.tileInfo.origin.y]
  },

  /**
   * 获取分辨率
   * @param data
   * @returns {Array}
   * @private
   */
  getResolutions_ (data) {
    const resolutions = []
    for (let i = 0; i < data['tileInfo']['lods'].length; i++) {
      resolutions.push(data['tileInfo']['lods'][i].resolution)
    }
    return resolutions
  },

  /**
   * 组装地图配置信息
   * @param params
   * @returns {Promise<any>}
   */
  getMapParams (params) {
    return new Promise((resolve, reject) => {
      if (params['baseLayers'] && params['baseLayers'].length > 0) {
        const layers_ = []
        params['baseLayers'].forEach(_item => {
          if (_item['layerType'] === 'TileXYZ') {
            layers_.push(this.getArcParams(_item))
            if (_item['label'] && Array.isArray(_item['label'])) {
              _item['label'].forEach(label_ => {
                layers_.push(this.getArcParams(label_))
              })
            } else if (isObject(_item['label'])) {
              layers_.push(this.getArcParams(_item['label']))
            }
          }
        })
        axios.all(layers_).then(res => {
          let __index = 0
          params['baseLayers'] = params['baseLayers'].map((_item) => {
            if (_item['layerType'] === 'TileXYZ') {
              _item.tileGrid = {
                tileSize: 256,
                extent: this.getExtent_(res[__index]),
                origin: this.getOrigin_(res[__index]),
                resolutions: this.getResolutions_(res[__index])
              }
              __index++
              if (_item['label'] && Array.isArray(_item['label'])) {
                _item['label'] = _item['label'].map(label_ => {
                  label_.tileGrid = {
                    tileSize: 256,
                    extent: this.getExtent_(res[__index]),
                    origin: this.getOrigin_(res[__index]),
                    resolutions: this.getResolutions_(res[__index])
                  }
                  __index++
                  return label_
                })
              } else if (isObject(_item['label'])) {
                _item['label'].tileGrid = {
                  tileSize: 256,
                  extent: this.getExtent_(res[__index]),
                  origin: this.getOrigin_(res[__index]),
                  resolutions: this.getResolutions_(res[__index])
                }
                __index++
              }
            }
            return _item
          })
          params['baseLayers'].every(_item => {
            if (_item['tileGrid'] && _item['tileGrid']['extent'] && _item['tileGrid']['resolutions']) {
              params.view.extent = _item['tileGrid']['extent']
              params.view.resolutions = _item['tileGrid']['resolutions']
              params.view.maxResolution = _item['tileGrid']['resolutions'][_item['tileGrid']['resolutions'].length - 1]
              return false
            } else {
              return true
            }
          })
          resolve(params)
        }).catch(error => {
          reject(error)
        })
      }
    })
  }
}
