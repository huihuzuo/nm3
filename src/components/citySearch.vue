<template>
  <div class="city-search-wrap-d">

    <div class="city-select-wrap">
      <div class="city-select-content">

        <div class="region-wrap clearfix">
          <div class="city-all" :class="{true: 'select-city'}[Tree.now.code == '360000']">
            <span :class="{true: 'select-now'}[Tree.now.code == '360000']" @click="nodeClick({code: '360000', name: '江西省'})">江西省</span>
          </div>
          <ul class="clearfix">
            <li v-for="r in Tree.tree" :class="{true: 'select-city'}[Tree.now == r]">
              <span :class="{true: 'select-now'}[Tree.now == r]" @click="nodeClick(r)">{{r.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        Tree: {
          now: {
            'code': '360000',
            'name': '江西省',
            'ptx': 113.559333,
            'pty': 34.771106
          },                        // 当前选中节点
          tree: [
            {
              'code': '360100',
              'name': '南昌市'
            },
            {
              'code': '360200',
              'name': '景德镇市'
            },
            {
              'code': '360300',
              'name': '萍乡市'
            },
            {
              'code': '360400',
              'name': '九江市'
            },
            {
              'code': '360500',
              'name': '新余市'
            },
            {
              'code': '360600',
              'name': '鹰潭市'
            },
            {
              'code': '360700',
              'name': '赣州市'
            },
            {
              'code': '360800',
              'name': '吉安市'
            },
            {
              'code': '360900',
              'name': '宜春市'
            },
            {
              'code': '361000',
              'name': '抚州市'
            },
            {
              'code': '361100',
              'name': '上饶市'
            }
          ]
        }
      }
    },
    mounted () {
      this.$emit('input', this.Tree.now)
    },
    methods: {
      nodeClick (node) {
        this.Tree.now = node
        this.$emit('input', node)
        let layerName = ''
        if (node.code.indexOf('0000') > 0) {
          layerName = 'GIS_PROV'
        } else {
          layerName = 'GIS_CITY'
        }
        this.getGeometry(layerName, node.code)
      },
      getGeometry (layerName, code) {
        let params = {
          layerName: layerName,
          filter: "admincode='" + code + "'"
        }
        this.$api.getQhGeometry(params).then(res => {
          if (res.data.data && res.data.data.features && res.data.data.features.length > 0) {
            this.addPolygonByGeom(res.data.data.features)
          }
        })
      },
      addPolygonByGeom (feat) {
        this.$Maps.removeFeatureByLayerName('polygons')
        this.$Maps.addPolygons(feat, {
          layerName: 'polygons',
          zoomToExtent: true,
          style: {
            stroke: {
              strokeColor: '#1b9de8',
              strokeWidth: 3
            },
            fill: {
              fillColor: 'rgba(27, 157, 232, 0.2)'
            }
          },
          selectStyle: {
            stroke: {
              strokeColor: '#D81E06',
              strokeWidth: 3
            },
            fill: {
              fillColor: 'rgba(27, 157, 232, 0.2)'
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/variables.scss";
  .city-search-wrap-d {
    border: 1px solid $panel-border-color;
    border-radius: 3px;
    background: $panel-bg-color;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .2);
    overflow: hidden;
    .select-city {
      span {
        color: $panel-text-highlight-color !important;
      }
    }

    .select-now {
      border: 1px solid $panel-text-highlight-color !important;
    }

    .city-select-wrap {

      span {
        border: 1px solid rgba(0,0,0,0);
        font-size: 14px;
        border-radius: 3px;
        width: 62px !important;
        display: inline-block;
        text-align: center;
        height: 25px;
        line-height: 23px;
        transition: .3s;
        &:hover {
          cursor: pointer;
          color: $panel-text-highlight-color !important;
        }
      }

      .region-wrap {
        font-family: "Microsoft YaHei", serif;
        font-size: 12px;
        .city-all {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid $panel-border-color;
          margin: 0 0 10px;
          padding: 0 10px;
        }

        ul {
          padding: 0 10px 5px;
          li {
            float: left;
            text-align: center;
            margin-bottom: 5px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }

  }
</style>
