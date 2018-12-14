/**
 * 设置缓存
 * @param key
 * @param obj
 */
export const setSessionStorage = (key, obj) => {
  let strObj = JSON.stringify(obj)
  window.sessionStorage.setItem(key, strObj)
}

/**
 * 获取缓存
 * @param key
 */
export const getSessionStorage = (key) => {
  let strObj = window.sessionStorage.getItem(key)
  return JSON.parse(strObj)
}

/**
 * 移除缓存
 * @param key
 */
export const removeSessionStorage = (key) => {
  window.sessionStorage.removeItem(key)
}

/**
 * 移除所有缓存
 */
export const clearAllSessionStorage = () => {
  window.sessionStorage.clear()
}

/**
 * 保存周边搜索图标
 * @param source
 * @param item
 */
export const saveMarkOverLay = (source, item) => {
  if (source && item) {
    let _souce = getSessionStorage(source)
    if (_souce && Array.isArray(_souce)) {
      if (!hasMarkOverLay(source, item)) {
        _souce.push(item)
      }
    } else {
      _souce = [item]
    }
    setSessionStorage(source, _souce)
  }
}

/**
 * 判断是否有此数据
 * @param source
 * @param item
 * @returns {boolean}
 */
export const hasMarkOverLay = (source, item) => {
  let flag = false
  if (source && item) {
    let _souce = getSessionStorage(source)
    if (_souce && Array.isArray(_souce)) {
      _souce.every(_item => {
        if (_item === item) {
          flag = true
          return false
        } else {
          return true
        }
      })
    }
  }
  return flag
}
/**
 * 从缓存中移除
 * @param source
 * @param item
 */
export const removeMarkOverLay = (source, item) => {
  if (source && item && hasMarkOverLay(source, item)) {
    let _souce = getSessionStorage(source)
    if (_souce && Array.isArray(_souce)) {
      let items = _souce.filter(_item => {
        return (_item !== item)
      })
      setSessionStorage(source, items)
    }
  }
}
/**
 * 从缓存中获取
 * @param source
 * @returns {string}
 */
export const getMarkOverLay = source => {
  let ids = ''
  if (source) {
    let lists = getSessionStorage(source)
    if (lists && Array.isArray(lists) && lists.length > 0) {
      ids = lists.join(',')
    }
  }
  return ids
}

/**
 * 对所有数据排序
 * @param result
 * @param point
 * @param map
 */
export const sortAllData = (result, point, map) => {
  const wgs84Sphere = new ol.Sphere(6378137)
  const sourceProj = map.getView().getProjection()
  if (result && result.length > 0) {
    result.forEach(item => {
      if (item.geometry) {
        let c1 = ol.proj.transform(item.geometry, sourceProj, 'EPSG:4326')
        let _point = ol.proj.transform(point, sourceProj, 'EPSG:4326')
        item['attributes']['distance'] = wgs84Sphere.haversineDistance(c1, _point)
      }
    })
  }
  result.sort(function (a, b) {
    return a['attributes']['distance'] > b['attributes']['distance'] ? 1 : -1
  })
  return result
}
