var config = {
  jxzsPage: 'http://211.101.37.227:9301/jxzs/indexMain.html#/in/app/main/default',
  service: {
    basicUrl: 'http://36.2.11.84:8804/',
    geocoding: 'http://36.2.11.84:7004/',
    geoserversde: 'http://36.2.6.21:7001/geoserver-sde/rest/action',
    // oldUrl: '36.2.6.21:7007',
    oldUrl: 'http://36.2.6.21:7007',
    // oldUrl: 'http://192.168.0.66:8080',
    videoUrl: 'rnmonitor-service/',
    trafficUrl: 'road-traffic-rest/',
    weatherUrl: 'waio-weather-rest/',
    gaodeEventUrl: 'event-gaode-spider/',
    gaodeTrafficUrl: 'traffic-gaode-spider/',
    layerUrl: 'them-layers/',
    videoConfig: {
      addr: '36.2.8.1',
      port: '12021',
      user: 'admin',
      pwd: 'admin@jxlw',
      video_id: '360100001400000006',
      demonstration: false
    }
  },
  Maps: {},
  mapconfig: {
    target: 'map',
    controls: {
      rotate: false,
      zoom: false,
      zoomSlider: false,
      attribution: false
    },
    view: {
      center: [115.95, 27.27],
      enableRotation: false, // 是否允许旋转
      projection: 'EPSG:4326',
      zoom: 7,
      minZoom: 0,
      maxZoom: 13
    },
    baseLayers: [
      {
        layerName: 'vector',
        isDefault: true,
        layerType: "TileXYZ",
        layerUrl: 'http://36.2.11.1:6080/arcgis/rest/services/jiangxi/JXMAP_BLUE/MapServer/tile/{z}/{y}/{x}'
      },
      {
        layerName: 'panorama',
        isDefault: false,
        visible: false,
        projection: 'EPSG:4326',
        layerType: "TileXYZ",
        layerUrl: 'http://36.2.11.1:6080/arcgis/rest/services/jiangxi/JXSTT/MapServer/tile/{z}/{y}/{x}'
      },
      {
        layerName: 'earth',
        isDefault: false,
        visible: false,
        layerType: 'TileWMS',
        version: '1.1.1',
        layerUrl: 'http://211.101.37.246:7090/rest/wms',
        layers: 'WGS84',
        styles: '',
        projection: 'EPSG:4326',
        tiled: true,
        tiledsorrigin: '-180.01993355482,-90'
      },
      {
        layerName: 'deformation',
        isDefault: false,
        visible: false,
        projection: 'EPSG:4326',
        layerType: "ImageLayer",
        sourceType: "ImageArcGISRest",
        params: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png32',
          F: 'image'
        },
        layerUrl: 'http://211.101.37.251:6080/arcgis/rest/services/jiangxi/jxbxt_map2018/MapServer'
      }
    ]
  },
  layerConfig: {
    layers: [
      {
        layerName: 'GIS_QL',
        tableName: 'GIS_QL',
        name: '桥梁',
        units: '座',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/ql_moicon.png',
          hover: './static/images/featureIcons/ql_djicon.png'
        }
      },
      {
        layerName: 'GIS_SD',
        tableName: 'GIS_SD',
        name: '隧道',
        units: '座',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/sd_moicon.png',
          hover: './static/images/featureIcons/sd_djicon.png'
        }
      },
      {
        layerName: 'GIS_SFZ',
        tableName: 'GIS_SFZ',
        name: '收费站',
        units: '座',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/sfz_mricon.png',
          hover: './static/images/featureIcons/sfz_djicon.png'
        }
      },
      {
        layerName: 'GIS_FWQ',
        tableName: 'GIS_FWQ',
        name: '服务区',
        units: '座',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/fwq_moicon.png',
          hover: './static/images/featureIcons/fwq_djicon.png'
        }
      },
      {
        layerName: 'GIS_CRK',
        tableName: 'GIS_CRK',
        name: '出入口',
        units: '座',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/crk_moicon.png',
          hover: './static/images/featureIcons/crk_djicon.png'
        }
      },
      {
        layerName: 'GIS_JYZ',
        tableName: 'GIS_JYZ',
        name: '加油站',
        units: '座',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/jyz_mricon.png',
          hover: './static/images/featureIcons/jyz_djicon.png'
        }
      },
      {
        layerName: 'GIS_SPD',
        tableName: 'GIS_SPD',
        name: '摄像头',
        units: '个',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/sxt_mricon.png',
          hover: './static/images/featureIcons/sxt_djicon.png'
        }
      },
      {
        layerName: 'GIS_QBB',
        tableName: 'GIS_KBQBB',
        name: '情报板',
        units: '个',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/qbb_mricon.png',
          hover: './static/images/featureIcons/qbb_djicon.png'
        }
      },
      {
        layerName: 'GIS_JDZ',
        tableName: 'GIS_JDZ',
        name: '交调站',
        units: '座',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/jtlgcz_moicon.png',
          hover: './static/images/featureIcons/jtlgcz_djicon.png'
        }
      },
      {
        layerName: 'GIS_YJZD',
        tableName: 'GIS_YJZD',
        name: '应急站点',
        units: '个',
        isOpen: true,
        icons: {
          icon: './static/images/featureIcons/yjzd_moicon.png',
          hover: './static/images/featureIcons/yjzd_djicon.png'
        }
      }
    ],
    roadStateLayers: [ // 路况图层
      {
        layerName: 'baidu',
        fields: 'layerDefs',
        layerUrl: 'http://211.101.37.227:9311/arcgis/rest/services/JIANGXI/JIANGXITRAFFIC/MapServer',
        value: ['0:LDLX', '1:LXLX'],
        layerType: 'TileArcGISRest',
        layerParams: {},
        visible: true,
        create: true
      },
      {
        layerName: 'amap',
        fields: 'lid',
        value: ['traffic_gs', 'traffic_gd', 'traffic_sd'],
        layerUrl: 'http://36.2.11.90:8883/tile?get=map&cache=off&x={x}&y={y}&z={z}',
        layerType: 'TileXYZ',
        visible: true,
        create: true
      },
      {
        layerName: 'station',
        fields: 'layerDefs',
        layerUrl: 'http://211.101.37.227:9311/arcgis/rest/services/JIANGXI/jdztraffic/MapServer',
        value: ['0:LXLX', '1:LXLX'],
        layerType: 'TileArcGISRest',
        layerParams: {},
        visible: true,
        create: true
      }
    ],
    // 图层叠加
    overlaylayers: [
      {
        layerName: 'roadNet',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:0,1,2',
          F: 'image'
        },
        layerUrl: 'http://211.101.37.251:6080/arcgis/rest/services/jiangxi/sjsw0524/MapServer'
      },
      {
        layerName: 'roadSituation',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1908, 513',
          F: 'image'
        },
        // layerUrl: 'http://192.168.0.186:6080/arcgis/rest/services/SHANXI/SXTRAFFIC/MapServer'
        // layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/SHANXI/SXTRAFFIC/MapServer'
        layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/JIANGXI/JIANGXI_TRAFFIC/MapServer'
      },
      {
        layerName: 'trafficWeather-visibility',
        layerType: 'TileWMS',
        // layerUrl: 'http://192.168.0.226:8089/geoserver/lwjk/wms',
        layerUrl: 'http://211.101.37.253:8089/geoserver/waio_jx/wms',
        layers: 'waio_jx:gis_jiangxi',
        style: 'waio_weather_visibilitys_nodata_SX',
        projection: 'EPSG:4326',
        srs: 'EPSG:4326',
        tiled: true,
        version: '1.1.0',
        tiledsorrigin: '31.7332203148665,106.041351666347',
        create: true,
        addLayer: true
      },
      {
        layerName: 'visibilitys',
        layerType: 'TileWMS',
        layerUrl: 'http://211.101.37.253:8089/geoserver/waio_jx/wms',
        layers: 'waio_jx:waio_weather_ss_fc',
        style: 'waio_weather_temperatures_SX',
        projection: 'EPSG:4326',
        viewparams: 'lx:10010105',
        srs: 'EPSG:4326',
        tiled: true,
        version: '1.1.0',
        tiledsorrigin: '31.7332203148665,106.041351666347',
        create: true,
        addLayer: true
      },
      {
        layerName: 'precipitations',
        layerType: 'TileWMS',
        layerUrl: 'http://211.101.37.253:8089/geoserver/waio_jx/wms',
        layers: 'waio_jx:waio_weather_ss_fc',
        style: 'waio_weather_precipitations_SX',
        projection: 'EPSG:4326',
        viewparams: 'lx:10010103',
        srs: 'EPSG:4326',
        tiled: true,
        version: '1.1.0',
        tiledsorrigin: '31.7332203148665,106.041351666347',
        create: true,
        addLayer: true
      },
      {
        layerName: 'winds',
        layerType: 'TileWMS',
        layerUrl: 'http://211.101.37.253:8089/geoserver/waio_jx/wms',
        layers: 'waio_jx:waio_weather_ss_fc',
        style: 'waio_weather_winds_SX',
        projection: 'EPSG:4326',
        viewparams: 'lx:10010104',
        srs: 'EPSG:4326',
        tiled: true,
        version: '1.1.0',
        tiledsorrigin: '31.7332203148665,106.041351666347',
        create: true,
        addLayer: true
      },
      {
        layerName: 'temperatures',
        layerType: 'TileWMS',
        layerUrl: 'http://211.101.37.253:8089/geoserver/waio_jx/wms',
        layers: 'waio_jx:waio_weather_ss_fc',
        style: 'waio_weather_temperatures_SX',
        projection: 'EPSG:4326',
        viewparams: 'lx:10010110',
        srs: 'EPSG:4326',
        tiled: true,
        version: '1.1.0',
        tiledsorrigin: '31.7332203148665,106.041351666347',
        create: true,
        addLayer: true
      },
      {
        layerName: 'GIS_JSDJ',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '103.61809424674925,31.359680818993308,114.94432863450137,39.592615899165985',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:0',
          F: 'image'
        },
        // layerUrl: 'http://192.168.0.186:6080/arcgis/rest/services/SHANXI/GIS_JSDJ/MapServer'
        layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/SHANXI/GIS_JSDJ/MapServer'
      },
      {
        layerName: 'GIS_XZDJ',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '103.39681094232657,34.25517240294999,113.34963912367346,39.92608124160001',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:0',
          F: 'image'
        },
        // http://192.168.0.186:6080/arcgis/rest/services/SHANXI/GIS_ROADXZDJ/MapServer
        layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/SHANXI/GIS_ROADXZDJ/MapServer'
      },
      {
        layerName: 'base_aspect',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:1',
          F: 'image'
        },
        // layerUrl: 'http://192.168.0.186:6080/arcgis/rest/services/SHANXI/GIS_JSDJ/MapServer'
        layerUrl: 'http://211.101.37.251:6080/arcgis/rest/services/jiangxi/jx_aspectnew1/MapServer'
      },
      {
        layerName: 'base_slope',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:1',
          F: 'image'
        },
        // layerUrl: 'http://192.168.0.186:6080/arcgis/rest/services/SHANXI/GIS_JSDJ/MapServer'
        layerUrl: 'http://211.101.37.251:6080/arcgis/rest/services/jiangxi/jx_slopenew/MapServer'
      },
      {
        layerName: 'GL_JSDJ_NC',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:2',
          F: 'image'
        },
        // layerUrl: 'http://192.168.0.186:6080/arcgis/rest/services/SHANXI/GIS_JSDJ/MapServer'
        layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/SHANXI/GIS_JSDJ/MapServer'
      },
      {
        layerName: 'GL_GCZ',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:0,1',
          F: 'image'
        },
        // layerUrl: 'http://192.168.0.186:6080/arcgis/rest/services/SHANXI/GL_GCZ/MapServer'
        layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/SHANXI/GL_GCZ/MapServer'
      },
      {
        layerName: 'GIS_SD',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:0,1,2',
          F: 'image'
        },
        // layerUrl: 'http://192.168.0.186:6080/arcgis/rest/services/SHANXI/GIS_SD/MapServer'
        layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/SHANXI/GIS_SD/MapServer'
      },
      {
        layerName: 'GIS_QL',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        layerParams: {
          BBOX: '106.62883574453902,32.97544821014683,120.27237452170401,36.643758164384586',
          TRANSPARENT: true,
          BBOXSR: 4326,
          IMAGESR: 4326,
          DPI: 96,
          FORMAT: 'png8',
          SIZE: '1428,719',
          LAYERS: 'show:0,1,2',
          F: 'image'
        },
        layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/SHANXI/GL_QL/MapServer'
      },
      {
        layerName: 'line',
        layerType: 'TileArcGISRest',
        visible: true,
        create: true,
        // layerUrl: 'http://192.168.0.186:6080/arcgis/rest/services/HENAN/T_CONTROL_EVENT/MapServer'
        layerUrl: 'http://211.101.37.253:6080/arcgis/rest/services/HENAN/T_CONTROL_EVENT/MapServer'
      }
    ],
    /**
     * 根据layerName或tableName获取配置信息
     * @param layerName
     * @param type
     * @returns {*}
     */
    getLayerConfigByLayerName: function (layerName, type) {
      var layerConfig = null
      type = type || 'layers'
      this[type].every(function (layer) {
        if (layerName === layer['layerName'] || layerName === layer['tableName']) {
          layerConfig = layer
          return false
        } else {
          return true
        }
      })
      return layerConfig
    }
  },
  statisticsLayerList: [
    {
      name: "全国公路气象预报数据",
      id: "003001001",
      type: "TRANSROAD",
      serviceUrl: "http://192.168.0.205:7011/tnms-weather/weather/getWeatherContent",
      isDisplayTime: true,
      legendClick: true,
      layers: [0],
      field: 'WEADAY'
    },
    {
      name: "未来第24小时气象影响落区预报",
      id: "003001002",
      type: "WP1",
      serviceUrl: "http://192.168.0.205:7011/tnms-weather/weather/getWeatherContent",
      isDisplayTime: true,
      legendClick: true,
      layers: [0],
      field: 'WEADAY'
    },
    {
      name: "未来48小时全国降水落区预报",
      id: "003001003",
      type: "rr48",
      serviceUrl: "http://10.254.123.56:8080/roadwm/getrwd",
      isDisplayTime: true
    },
    {
      name: "未来72小时全国降水落区预报",
      id: "003001004",
      type: "rr72",
      serviceUrl: "http://10.254.123.56:8080/roadwm/getrwd",
      isDisplayTime: true
    },
    {
      name: "全國公路气象预报数据",
      id: "003001001",
      type: "df24",
      serviceUrl: "http://10.254.123.56:8080/roadwm/getrwd",
      isDisplayTime: true
    }
  ]
}
