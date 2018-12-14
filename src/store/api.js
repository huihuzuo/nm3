import axios from 'axios'

const BASICURL = config.service.basicUrl
const SERVER_SERVICE = './static/json/'
const OLD_SERVICE = config.service.oldUrl
const GEOCODINGURL = config.service.geocoding

export {
  BASICURL,
  SERVER_SERVICE
}


// monitor
const trafficHead = 'monitor/head/trafficHead.json'
const eventHead = 'monitor/head/eventHead.json'
const weatherHead = 'monitor/head/weatherHead.json'


const settingWeatherUrl = config.service.settingWeatherUrl + '/alertConfig'
const settingTrafficUrl = config.service.settingTrafficUrl + '/alertConfig'
const settingEventUrl = config.service.settingEventUrl + '/alertconfig'
/*const BaiduTrafficList = config.service.basicUrl + config.service.trafficUrl + 'traffic/getTrafficRanking'
const BaiduTrafficStatic = config.service.basicUrl + config.service.trafficUrl + 'traffic/getRoadMileageStatistics'
const JiaodiaozhanTrafficList = 'rnmonitor-service/gcz/getGczList'
const LuwanEventList = 'monitor/list/LuwanEventList.json'
const GaodeTrafficList = config.service.basicUrl + config.service.gaodeTrafficUrl + 'gaodeTraffic/getGaodeTrafficList'
const GaodeEventList = config.service.basicUrl + config.service.gaodeEventUrl + 'gaodeEvent/getGaodeEventList'
const visibilityList = config.service.basicUrl + config.service.weatherUrl + 'weather/getRealTimeWeatherDataByLx'
const precipitationList = 'monitor/list/precipitationList.json'*/




const BaiduTrafficList = config.service.baiduTrafficUrl + 'getTrafficRanking' //百度路况下半部分数据
const BaiduTrafficStatic = config.service.baiduTrafficUrl + 'getRoadMileageStatistics'  //百度路况上半部分数据
const GaodeTrafficList = BASICURL + config.service.gaodeTrafficUrl + 'gaodeTraffic/getGaodeTrafficList'  //高德路况
const LuwanEventStatistic = BASICURL + config.service.LuwanEventStatisticUrl + 'block/getEventTypeStatistics' //路网事件上半部分
const LuwanEventList = BASICURL + config.service.LuwanEventListUrl + 'block/getEventListByPage' //路网事件下半部分
const GaodeEventList = config.service.basicUrl + config.service.HulianwangEventListUrl + 'gaodeEvent/getGaodeEventList' //互联网事件下半部分
const visibilityList = config.service.basicUrl + config.service.weatherUrl + 'weather/getRealTimeWeatherDataByLx'   //气象
const JiaodiaozhanTrafficStatistic = config.service.JiaodiaozhanTrafficUrl + 'gcz/getGczMileageStatistics'  //交调站static
const JiaodiaozhanTrafficList = config.service.basicUrl + config.service.JiaodiaozhanTrafficListUrl + 'gcz/getGczList'   //交调站list



const windPowerList = 'monitor/list/windPowerList.json'
const temperatureList = 'monitor/list/temperatureList.json'
const precipitationList = 'monitor/list/precipitationList.json'
const GaodeEventStatistics = 'GaodeEventStatistics'
const videoList = config.service.basicUrl + config.service.videoUrl + 'video/tree'
const layerTools = config.service.basicUrl + config.service.layerUrl + 'layers/layertools'

export {
  settingWeatherUrl,
  settingTrafficUrl,
  settingEventUrl,
  trafficHead,
  eventHead,
  weatherHead,

  GaodeTrafficList,
  BaiduTrafficList,
  BaiduTrafficStatic,
  LuwanEventStatistic,
  GaodeEventStatistics,
  LuwanEventList,
  GaodeEventList,
  visibilityList,
  JiaodiaozhanTrafficList,
  JiaodiaozhanTrafficStatistic,




  precipitationList,
  windPowerList,
  temperatureList,
  videoList,
  layerTools,

}

export const getLayerTree = () => {
  return axios.get(layerTools)
}

// 获取路段详情
export const getRoadSectionDetail = _params => {
  return axios.post('/jxgis-web-rest/lx/roadsection', _params, {
    baseURL: OLD_SERVICE
  })
}

// 获取路线详情
export const getRoadDetail = _params => {
  return axios.post('/jxgis-web-rest/lx/lx/info', _params, {
    baseURL: OLD_SERVICE
  })
}
// 获取桥梁详情
export const getQlDetail = _params => {
  return axios.get('/jxgis-web-rest/ql/info/' + _params.id, {
    baseURL: OLD_SERVICE
  })
}

// 获取隧道详情
export const getSdDetail = _params => {
  return axios.get('/jxgis-web-rest/sd/info/' + _params.id, {
    baseURL: OLD_SERVICE
  })
}

// 获取服务区详情
export const getFwqDetail = _params => {
  return axios.get('/jxgis-web-rest/fwq/info/' + _params.id, {
    baseURL: OLD_SERVICE
  })
}

// 获取出入口详情
export const getCrkDetail = _params => {
  return axios.get('/jxgis-web-rest/crk/info/' + _params.id, {
    baseURL: OLD_SERVICE
  })
}

// 获取视频点详情
export const getSpdDetail = _params => {
  return axios.get('/jxgis-web-rest/video/info/' + _params.id, {
    baseURL: OLD_SERVICE
  })
}

// 交调站详情
export const getJtlDetail = _params => {
  return axios.get('/jxgis-web-rest/jtl/info/' + _params.id, {
    baseURL: OLD_SERVICE
  })
}

// 获取构筑物列表
export const getStructureList = _params => {
  return axios.post('/jxgis-web-rest/' + _params.type + '/query/', _params, {
    baseURL: OLD_SERVICE
  })
}

// 获取字段信息
export const getField = _params => {
  return axios.get('/jxgis-web-rest/pub/field', {
    baseURL: OLD_SERVICE,
    params: _params
  })
}

// 交调站列表
export const getStaticon = _params => {
  return axios.post('/jxgis-web-rest/jtl/query', _params, {
    baseURL: OLD_SERVICE
  })
}

// 交调站统计图实时的饼图和折线图
export const getPieLineChart = _params => {
  return axios.post('/jxgis-web-rest/jtl/PolylineAndPiechart/', _params, {
    baseURL: OLD_SERVICE
  })
  // return axios.get('/PolylineAndPiechart.json', {
  //   baseURL: './static/json/'
  // })
}

// 获取周边资源
export const getRIM = _params => {
  return axios.get('/circle', {
    baseURL: GEOCODINGURL + 'geocoding/',
    params: _params
  })
}

// 高德事件 获取字段信息
export const getEventField = _params => {
  return axios.get('event-gaode-spider/gaodeEvent/getEventField', {
    baseURL: BASICURL,
    params: _params
  })
}

// 高德事件 获取id详情信息
export const getGaodeEventById = _params => {
  return axios.get('event-gaode-spider/gaodeEvent/getGaodeEventById/', {
    baseURL: BASICURL,
    params: _params
  })
}

// 高德事件 获取高德事件列表
export const getGaodeEventList = _params => {
  return axios.get('event-gaode-spider/gaodeEvent/getGaodeEventList', {
    baseURL: BASICURL,
    params: _params
  })
}

// 高德事件 沿线搜索
export const getGaodeEventListInfo = _params => {
  return axios.get('event-gaode-spider/gaodeEvent/getGaodeEventListInfo', {
    baseURL: BASICURL,
    params: _params
  })
}

// 行业 事件阻断
export const getEventList = _params => {
  return axios.post('rnmonitor-service/block/getEventListByPage', _params, {
    baseURL: BASICURL
  })
}

// 行业事件详情
export const getBlockDetail = _params => {
  return axios.get('rnmonitor-service/block/getBlockDetail', {
    baseURL: BASICURL,
    params: _params
  })
}

// 行业沿线搜索
export const getAlongSearch = _params => {
  return axios.post('rnmonitor-service/block/getAlongSearch', _params, {
    baseURL: BASICURL
  })
}
