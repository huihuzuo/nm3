<template>
  <div class="road-detail-wrap">
    <detail-table :data="data" :field="field"></detail-table>
  </div>
</template>
<script>
  import * as api from '@/store/api'
  import detailTable from './detailTable'
  export default {
    props: {
      roadDetail: {
        type: [Object],
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        data: [],
        field: []
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      getDetail () {
        api.getRoadSectionDetail({
          params: {
            lxbm: this.roadDetail.lxbm,
            zhfwMin: this.roadDetail.zxzh,
            zhfwMax: this.roadDetail.zxzh
          }
        }).then(res => {
          this.data = res.data
          this.getField()
        })
      },
      getField () {
        api.getField({code: 'ld'}).then(res => {
          this.field = res.data
        })
      }
    },
    components: {
      detailTable
    }
  }
</script>
<style lang="scss">
  .road-detail-wrap {
    padding: 10px;
  }
</style>
