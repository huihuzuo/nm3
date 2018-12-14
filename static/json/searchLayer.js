export default [
  {
    'layer': 'line',
    'name': '路线',
    'icon': 'icon-iconfontluxian',
    'id': '01',
    'child': [
      {
        'name': '国省干线',
        'layer': 'line',
        'layerName': 'GL_NB_GS',
        'id': '3FBF6D2470B105A8E050007F01003095',
        'domainLayer': 'GL_NB_GS',
        'alias': 'gsgx',
        'type': 'LINE',
        'multiMedia': [],
        'keyWord': 'OBJECTID',
        'LXDM': 'LXDM',
        'LXMC': 'LXMC',
        'capacityDM': '',
        'capacityMC': '',
        'XZQH': 'XZQH',
        'haveData': true,
        'dept': '里程',
        'translation': [
          {
            'QDZH': 'formatZh'
          },
          {
            'ZDZH': 'formatZh'
          },
          {
            'LC': 'interceptNumber3'
          },
          {
            'LJKD': 'interceptNumber3'
          },
          {
            'LMKD': 'interceptNumber3'
          },
          {
            'CF_QDZH': 'formatZh'
          },
          {
            'CF_ZDZH': 'formatZh'
          },
          {
            'YHLC': 'interceptNumber3'
          },
          {
            'KLHLC': 'interceptNumber3'
          },
          {
            'YLHLC': 'interceptNumber3'
          },
          {
            'MCHD': 'interceptNumber3'
          },
          {
            'SJCRK': 'interceptNumber3'
          }
        ]
      }
    ]
  },
  {
    'layer': 'structure',
    'icon': 'icon-luxian',
    'name': '构造物',
    'id': '02',
    'child': [
      {
        'name': '桥梁',
        'layer': 'structure',
        'id': '3EA2E15BA528EDA0E050007F010047D1',
        'layerName': 'V_GL_QL',
        'domainLayer': 'V_GL_QL',
        'alias': 'ql',
        'type': 'POINT',
        'multiMedia': [
          {
            'className': '桥梁图片',
            'classCode': 'image',
            'serviceUrl': '/structure/qlyearpics',
            'keyWord': 'qldm',
            'icon': 'tupian',
            'iconDefault': 'tupian',
            'iconHover': 'tupianhover'
          }
        ],
        'keyWord': 'QLBM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'QLDM',
        'capacityMC': 'QLMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'ZH': 'QLZXZH',
        'dept': '座',
        'translation': [
          {
            'QLZXZH': 'formatZh'
          },
          {
            'QLQC': 'interceptNumber3'
          },
          {
            'KJZC': 'interceptNumber3'
          },
          {
            'DKZDKJ': 'interceptNumber3'
          },
          {
            'QLQK': 'interceptNumber3'
          },
          {
            'QMJK': 'interceptNumber3'
          },
          {
            'PDRQ': 'evaluateDate'
          }
        ]
      },
      {
        'name': '隧道',
        'layer': 'structure',
        'id': '3EB8FC7B77CBFE07E050007F01000507',
        'layerName': 'V_GL_SD',
        'domainLayer': 'V_GL_SD',
        'type': 'POINT',
        'alias': 'sd',
        'multiMedia': [],
        'keyWord': 'SDDM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'SDDM',
        'capacityMC': 'SDMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'ZH': 'SDZXZH',
        'dept': '座',
        'translation': [
          {
            'SDZXZH': 'formatZh'
          },
          {
            'SDCD': 'interceptNumber3'
          },
          {
            'SDJK': 'interceptNumber3'
          },
          {
            'SDJG': 'interceptNumber3'
          },
          {
            'PDRQ': 'evaluateDate'
          },
          {
            'TCRQ': 'evaluateDate'
          }
        ]
      },
      {
        'name': '渡口',
        'layer': 'structure',
        'id': '3EC9F86628A49851E050007F01003926',
        'layerName': 'GIS_DK',
        'domainLayer': 'GIS_DK',
        'type': 'POINT',
        'alias': 'dk',
        'multiMedia': [],
        'keyWord': 'DKBM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'DKBM',
        'capacityMC': 'DKMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'ZH': 'DKZXZH',
        'dept': '座',
        'translation': [
          {
            'DKZXZH': 'formatZh'
          }
        ]
      }
    ]
  },
  {
    'layer': 'facility',
    'icon': 'icon-fuwuqu',
    'name': '沿线设施',
    'id': '03',
    'child': [
      {
        'name': '收费站',
        'layer': 'facility',
        'id': '3F5753CEB15C2400E050007F01004D4C',
        'layerName': 'GIS_SFZ',
        'alias': 'sfz',
        'type': 'POINT',
        'domainLayer': 'GIS_SFZ',
        'multiMedia': [],
        'keyWord': 'SFZBM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'SFZBM',
        'capacityMC': 'SFZMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'ZH': 'SFZZXZH',
        'dept': '个'
      },
      {
        'name': '服务区',
        'layer': 'facility',
        'id': '3ECAE43CEF94AD32E050007F01003C2F',
        'layerName': 'V_GL_FWQ',
        'alias': 'fwq',
        'type': 'POINT',
        'domainLayer': 'V_GL_FWQ',
        'multiMedia': [],
        'keyWord': 'FWQDM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'FWQDM',
        'capacityMC': 'FWQMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'ZH': 'FWQZXZH',
        'dept': '个',
        'translation': [
          {
            'FWQZXZH': 'formatZh'
          }
        ]
      },
      {
        'name': '出入口',
        'layer': 'facility',
        'id': '3ECAE43CF0A8AD32E050007F01003C2F',
        'layerName': 'V_GL_CRK',
        'domainLayer': 'V_GL_CRK',
        'type': 'POINT',
        'alias': 'jyz',
        'multiMedia': [],
        'keyWord': 'CRKDM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'CRKDM',
        'capacityMC': 'CRKMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'ZH': 'CRKZXZH',
        'dept': '个',
        'translation': [
          {
            'CRKZXZH': 'formatZh'
          }
        ]
      },
      {
        'name': '交调站',
        'layer': 'structure',
        'id': '3ECAE43CF017AD32E050007F01003C2F',
        'layerName': 'V_GL_GCZ',
        'domainLayer': 'V_GL_GCZ',
        'type': 'POINT',
        'alias': 'jtll',
        'multiMedia': [
          {
            'className': '实时监测',
            'classCode': 'ssjc',
            'serviceUrl': '/jdext01/rest/dsi/dcsj/query.json',
            'keyWord': 'qldm',
            'icon': 'liuliangtongji',
            'iconDefault': 'liuliangtongji',
            'iconHover': 'liuliangtongji-hover'
          }
        ],
        'keyWord': 'GCZBH',
        'LXDM': 'LXBH',
        'LXMC': 'LXMC',
        'capacityDM': 'GCZBH',
        'capacityMC': 'GCZMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'dept': '个',
        'ZH': 'ZH',
        'translation': [
          {
            'GCLC': 'interceptNumber3'
          },
          {
            'LMKD': 'interceptNumber3'
          },
          {
            'LJKD': 'interceptNumber3'
          },
          {
            'SJSD': 'interceptNumber3'
          },
          {
            'QDZH': 'formatZh'
          },
          {
            'ZDZH': 'formatZh'
          },
          {
            'ZH': 'formatZh'
          },
          {
            'LONGITUDE': 'interceptNumber6'
          },
          {
            'LATITUDE': 'interceptNumber6'
          },
          {
            'JZRQ': 'dateMillisecond'
          },
          {
            'UPDATE_TIME': 'dateMillisecond'
          }
        ]
      },
      {
        'name': '加油站',
        'layer': 'facility',
        'id': '3ECAE43CF06CAD32E050007F01003C2F',
        'layerName': 'GIS_JYZ',
        'domainLayer': 'GIS_JYZ',
        'type': 'POINT',
        'alias': 'jyz',
        'multiMedia': [],
        'keyWord': 'JYZBM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'JYZBM',
        'capacityMC': 'JYZMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'dept': '个',
        'ZH': 'JYZZXZH',
        'translation': [
          {
            'JYZZXZH': 'formatZh'
          }
        ]
      },
      {
        'name': '治超站',
        'layer': 'facility',
        'id': '3ECAE43CF10CAD32E050007F01003C2F',
        'layerName': 'GIS_ZCZ',
        'domainLayer': 'GIS_ZCZ',
        'type': 'POINT',
        'alias': 'zcz',
        'multiMedia': [],
        'keyWord': 'ZCDBM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'ZCDBM',
        'capacityMC': 'ZCDMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'dept': '个',
        'ZH': 'ZCDZXZH',
        'translation': [
          {
            'ZCDZXZH': 'formatZh'
          }
        ]
      },
      {
        'name': '摄像头',
        'layer': 'facility',
        'id': '3ECAE43CF111AD32E050007F01003C2F',
        'layerName': 'GIS_SXT',
        'domainLayer': 'GIS_SXT',
        'type': 'POINT',
        'alias': 'sxt',
        'multiMedia': [],
        'keyWord': 'SXTBM',
        'LXDM': 'LXDM',
        'LXMC': '',
        'capacityDM': 'SXTBM',
        'capacityMC': 'SXTMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'dept': '个',
        'ZH': 'ZH'
      },
      {
        'name': '道路客运站',
        'layer': 'facility',
        'id': '3ECAE43CF141AD32E050007F01003C2F',
        'layerName': 'GIS_KYZ',
        'domainLayer': 'GIS_KYZ',
        'type': 'POINT',
        'alias': 'sxt',
        'multiMedia': [],
        'keyWord': 'KYZBM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'KYZBM',
        'capacityMC': 'KYZMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'dept': '个',
        'ZH': 'KYZZXZH',
        'translation': [
          {
            'KYZZXZH': 'formatZh'
          }
        ]
      },
      {
        'name': '高速停车区',
        'layer': 'facility',
        'id': 's_3',
        'layerName': 'GIS_GT',
        'domainLayer': 'GIS_GT',
        'type': 'POINT',
        'alias': 'sxt',
        'multiMedia': [],
        'keyWord': 'GTBM',
        'LXDM': 'LXBM',
        'LXMC': 'LXMC',
        'capacityDM': 'GTBM',
        'capacityMC': 'GTMC',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'dept': '个',
        'ZH': 'GTZXZH',
        'translation': [
          {
            'GTZXZH': 'formatZh'
          }
        ]
      },
      {
        'name': '车检器',
        'layer': 'facility',
        'id': 's_4',
        'layerName': 'V_GL_CJQ',
        'domainLayer': 'GL_CJQ',
        'type': 'POINT',
        'alias': 'sxt',
        'multiMedia': [],
        'keyWord': 'OBJECTID',
        'LXDM': '',
        'LXMC': '',
        'capacityDM': '',
        'capacityMC': '',
        'XZQH': 'ADMINCODE',
        'dept': '个',
        'haveData': false,
        'ZH': ''
      },
      {
        'name': '气象仪',
        'layer': 'facility',
        'id': 's_5',
        'layerName': 'V_GL_QXY',
        'domainLayer': 'GL_QXY',
        'type': 'POINT',
        'alias': 'sxt',
        'multiMedia': [],
        'keyWord': 'OBJECTID',
        'LXDM': '',
        'LXMC': '',
        'capacityDM': '',
        'capacityMC': '',
        'XZQH': 'ADMINCODE',
        'haveData': false,
        'dept': '个',
        'ZH': ''
      },
      {
        'name': 'ETC车道',
        'layer': 'facility',
        'id': 's_6',
        'layerName': 'V_GL_ETC',
        'domainLayer': 'GL_ETC',
        'type': 'POINT',
        'alias': 'sxt',
        'multiMedia': [],
        'keyWord': 'OBJECTID',
        'LXDM': '',
        'LXMC': '',
        'capacityDM': '',
        'capacityMC': '',
        'XZQH': 'ADMINCODE',
        'haveData': false,
        'dept': '个',
        'ZH': ''
      },
      {
        'name': '可变情报板',
        'layer': 'facility',
        'id': 's_1',
        'layerName': 'V_GL_QBB',
        'domainLayer': 'V_GL_QBB',
        'type': 'POINT',
        'alias': 'jtll',
        'multiMedia': [],
        'keyWord': 'OBJECTID',
        'LXDM': '',
        'LXMC': '',
        'capacityDM': '',
        'capacityMC': '',
        'XZQH': 'ADMINCODE',
        'haveData': false,
        'dept': '个',
        'ZH': ''
      }
    ]
  },
  {
    'layer': 'dynamic',
    'icon': 'icon-zuduan1',
    'name': '动态信息',
    'id': '04',
    'child': [
      {
        'name': '公路阻断',
        'layer': 'dynamic',
        'id': '3ECAE43CF192AD32E050007F01003C2F',
        'layerName': 'V_GL_BLOCK_TEMP',
        'domainLayer': 'V_GL_BLOCK_TEMP',
        'type': 'POINT',
        'alias': 'ZDSJ',
        'multiMedia': [],
        'keyWord': 'BLOCK_ID',
        'LXDM': 'ROAD_ID',
        'LXMC': 'ROAD_NAME',
        'capacityDM': '',
        'capacityMC': '',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'dept': '起',
        'label': '阻断事件',
        'translation': [
          {
            'UPDATE_TIME': 'dateMillisecond'
          },
          {
            'START_STAKE': 'formatZh'
          },
          {
            'END_STAKE': 'formatZh'
          },
          {
            'DETECT_TIME': 'dateMillisecond'
          },
          {
            'BLOCK_MILEAGE': 'interceptNumber3'
          },
          {
            'ESTIMATE_TIME': 'dateMillisecond'
          }
        ]
      },
      {
        'name': '自定义事件',
        'layer': 'dynamic',
        'id': '4E005FA31200E009E050FE0A4100494C',
        'layerName': 'GIS_CUSTOM_EVENT',
        'domainLayer': 'GIS_CUSTOM_EVENT',
        'type': 'POINT',
        'alias': 'ZDYSJ',
        'multiMedia': [],
        'keyWord': 'ID',
        'haveData': true,
        'dept': '起',
        'label': '自定义事件',
        'translation': [
        ]
      }

    ]
  },
  {
    'layer': 'glyh',
    'icon': 'icon-zuduan1',
    'name': '公路养护',
    'id': '05',
    'child': [
      {
        'name': '路况检测',
        'layer': 'dynamic',
        'id': '40D81AE608B44473E050007F01004EE5',
        'layerName': 'GL_LKJC',
        'domainLayer': 'GL_LKJC',
        'type': 'line',
        'alias': 'LKPD',
        'multiMedia': [],
        'keyWord': 'OBJECTID',
        'LXDM': 'LXDM',
        'LXMC': 'LXMC',
        'capacityDM': '',
        'capacityMC': '',
        'XZQH': 'ADMINCODE',
        'haveData': true,
        'dept': '次',
        'label': '路况评定'
      }
    ]
  }
]
