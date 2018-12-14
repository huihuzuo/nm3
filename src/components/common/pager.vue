<template>
  <div class="pager clearfix">
    <!--<i class="iconfont icon-tubiaozhizuo-"></i>
    <i class="iconfont icon-icon-houtui"></i>-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="pageSizes"
      :page-size="limit"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
</template>
<style lang="scss">
  .pager {
    width: 100%;
    height: 100%;
    .el-pagination {
      text-align: center;
      padding: 0 !important;
      .el-pager {
        li {
          background-color: #7adaff;
          vertical-align: middle !important;
        }
        .number {
          min-width: 16px;
          width: 16px;
          height: 16px;
          line-height: 16px;
          background-color: transparent;
          text-align: center;
          border-radius: 2px;
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          color: rgb(57,57,57);
          font-weight: normal;
          padding: 0;
          margin: 0 5px;
          &:hover {
            background-color: transparent !important;
            color: #7adaff !important;
          }
        }
        .number:last-child {
          margin: 0;
        }
        .number:first-child {
          margin-right: 0;
        }
        .active {
          background-color: rgb(0,153,247) !important;
          color: #fff !important;
        }
      }
      .btn-prev, .btn-next, .more {
        min-width: 16px !important;
        width: 16px;
        height: 16px;
        line-height: 16px;
        background: transparent;
        vertical-align: middle;
        &:before {
          line-height: 16px;
        }
      }
      .btn-prev, .btn-next {
        position: relative;
        top: -2px;
      }
      .more {
        margin: 0 10px;
      }
    }
  }
</style>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      current: {
        type: Number,
        default: function () {
          return 1
        }
      },
      pageSizes: {
        type: Array,
        default: function () {
          return [10, 20, 30, 40]
        }
      },
      limit: {
        type: Number,
        default: function () {
          return 10
        }
      },
      layout: {
        type: String,
        default: function () {
          return 'prev, pager, next'
        }
      },
      total: {
        type: Number
      }
    },
    mounted () {
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.$emit('handleSizeChange', val)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.$emit('handleCurrentChange', val)
      }
    }
  }
</script>
