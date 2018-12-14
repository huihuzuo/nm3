import axios from 'axios'

const isObject = value => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}
/**
 * 获取arcgis配置
 * @param _layer
 * @returns {AxiosPromise}
 */
const getArcParams = (_layer) => {
  return axios.get(_layer.layerService, {
    params: {
      f: 'pjson'
    }
  })
}

/**
 * 获取范围
 * @param data
 * @returns {*[]}
 * @private
 */
const getExtent_ = data => {
  return [data.data['fullExtent'].xmin, data.data['fullExtent'].ymin, data.data['fullExtent'].xmax, data.data['fullExtent'].ymax]
}

/**
 * 获取切片原点
 * @param data
 * @returns {*[]}
 * @private
 */
const getOrigin_ = data => {
  return [data.data.tileInfo.origin.x, data.data.tileInfo.origin.y]
}

/**
 * 获取分辨率
 * @param data
 * @returns {Array}
 * @private
 */
const getResolutions_ = data => {
  const resolutions = []
  for (let i = 0; i < data.data['tileInfo']['lods'].length; i++) {
    resolutions.push(data.data['tileInfo']['lods'][i].resolution)
  }
  return resolutions
}

/**
 * 组装地图配置信息
 * @param params
 * @returns {Promise<any>}
 */
const getMapParams = params => {
  return new Promise((resolve, reject) => {
    if (params['baseLayers'] && params['baseLayers'].length > 0) {
      const layers_ = []
      params['baseLayers'].forEach(_item => {
        layers_.push(getArcParams(_item))
        if (_item['label'] && Array.isArray(_item['label'])) {
          _item['label'].forEach(label_ => {
            layers_.push(getArcParams(label_))
          })
        } else if (isObject(_item['label'])) {
          layers_.push(getArcParams(_item['label']))
        }
      })
      axios.all(layers_).then(res => {
        let __index = 0
        params['baseLayers'] = params['baseLayers'].map((_item) => {
          _item.tileGrid = {
            tileSize: 256,
            extent: getExtent_(res[__index]),
            origin: getOrigin_(res[__index]),
            resolutions: getResolutions_(res[__index])
          }
          __index++
          if (_item['label'] && Array.isArray(_item['label'])) {
            _item['label'] = _item['label'].map(label_ => {
              label_.tileGrid = {
                tileSize: 256,
                extent: getExtent_(res[__index]),
                origin: getOrigin_(res[__index]),
                resolutions: getResolutions_(res[__index])
              }
              __index++
              return label_
            })
          } else if (isObject(_item['label'])) {
            _item['label'].tileGrid = {
              tileSize: 256,
              extent: getExtent_(res[__index]),
              origin: getOrigin_(res[__index]),
              resolutions: getResolutions_(res[__index])
            }
            __index++
          }
          return _item
        })
        params.view.extent = params['baseLayers'][0]['tileGrid']['extent']
        params.view.maxResolution = params['baseLayers'][0]['tileGrid']['resolutions'][params['baseLayers'][0]['tileGrid']['resolutions'].length - 1]
        resolve(params)
      }).catch(error => {
        reject(error)
      })
    }
  })
}

export {
  getMapParams
}
