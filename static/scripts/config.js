//外网接口
export const hdIp = 'http://211.101.37.237:9001';//接口
export const hdIpField = 'http://211.101.37.237:9082';//接口
export const hdIpSearch = 'http://211.101.37.253';//接口
export const url1 = 'http://115.28.21.105:38280/traffic-urbanBrain/gate';
export const HIGHROAD_URL = 'http://114.215.146.210:25034/v3/tile?x={x}&y={y}&z={z}';//字
export const TileUrl = 'http://114.215.146.210:8883/tile?lid=traffic_jx&get=map&cache=off&x={x}&y={y}&z={z}&time=';//路况
export const tileUrl1 = ["http://{s}/v3/tile?z={z}&x={x}&y={y}",["114.215.146.210:25033","114.215.146.210:25033"]]//初始化地图tileUrl
/***
 *
 *内网配置
 ***/
/*export const host = "36.2.11.90";
 export const hdIp = 'http://36.2.6.21';//恒达接口
 export const url1 = 'http://36.2.11.91:8080/traffic-urbanBrain/gate';//图盟接口
 export const HIGHROAD_URL = 'http://36.2.11.90:25033/v3/tile?x={x}&y={y}&z={z}';//字
 export const TileUrl = 'http://36.2.11.90:8883/tile?lid=traffic&get=map&cache=off&x={x}&y={y}&z={z}&time=';//路况
 export const tileUrl1 = ["http://{s}/v3/tile?z={z}&x={x}&y={y}",["114.215.146.210:25033","114.215.146.210:25033"]]*///初始化地图tileUrl*!/

export const baseURL = ''
// sde相关服务
// export const WEBAPP = 'http://192.168.0.87:7003/tnms-service'
export const WEBAPP = 'http://211.101.37.253:8080/geoserver-sde-jx/rest/action/search'
// 查询相关服务
export const lxruWEBAPP = 'http://211.101.37.253:8702'
// export const WEBAPP2 = 'http://127.0.0.1:3001/tnms-service'
// 气象相关服务
export const QX_SERVICES = 'http://211.101.37.237:9001/rest'
// 综合展示系统
// export const ZHZS_PRO = 'http://36.2.6.21:7003/jxgis/app/indexMain.html#/login?un=admin&pw=e10adc3949ba59abbe56e057f20f883e'
export const ZHZS_PRO = 'http://211.101.37.247:8071/jxzs/indexMain.html#/in/app/main/default'
// export const QX_SERVICES = 'http://211.101.37.247:8003/expdp-transformation-rest/rest'
// 现场sde相关服务
// export const WEBAPP = 'http://36.2.11.84:8083/geoserver-sde-jx/rest/action/search'
// 现场查询相关服务
// export const lxruWEBAPP = 'http://36.2.6.21:8702'
// 现场气象相关服务
// export const QX_SERVICES = 'http://36.2.11.84:8080/expdp-transformation-rest/rest'
