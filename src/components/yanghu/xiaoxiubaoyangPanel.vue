<template>
  <div class="s-panel-query">
    <div class="s-input-panel">
      <el-row>
        <el-col :span="6">
          <div class="s-input-panel-col">
            <el-select
              v-model="data.lxbm"
              filterable
              remote
              reserve-keyword
              placeholder="部门"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in lxbmoOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="s-input-panel-col">
            <el-input v-model="data.qdzh" placeholder="年"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="s-input-panel-col">
            <el-input v-model="data.zdzh" placeholder="月"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xiaoxiubaoyangPanel',
    data () {
      return {
        lxbmoOptions: [],
        list: [],
        loading: false,
        states: ['Alabama', 'Alaska', 'Arizona',
          'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida',
          'Georgia'],
        data: {
          lxbm: [],
          qdzh: '',
          zdzh: '',
          sxxfx: '',
          sxxfxOptions: [
            {
              value: '1',
              label: '上行'
            },
            {
              value: '2',
              label: '下行'
            }
          ]
        }
      }
    },
    mounted () {
      this.list = this.states.map(item => {
        return {value: item, label: item}
      })
      this.list.unshift({'value': '', label: '全部'})
    },
    methods: {
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.lxbmoOptions = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.lxbmoOptions = []
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables";

  .s-panel-query {
    position: absolute;
    top: 50px;
    left: 10px;
    width: 390px;
    height: 50px;
    padding: 10px;
    line-height: 50px;
    background: $panel-bg-color;
    border-left: 1px solid $panel-border-color;
    border-right: 1px solid $panel-border-color;
    pointer-events: auto;
    .s-input-panel-col {
      height: 30px;
      line-height: 30px;
      margin: 0 5px;
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        background: $input-background-color;
        border: none;
        border-color: $index-bg !important;
        color: $panel-text-color;
        padding: 0 10px !important;
        transition: .3s;
      }
      .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
      }

      input:focus {
        background: #024677
      }
    }
  }

  input::-webkit-input-placeholder {
    color: $input-placeholder-color !important;
  }
</style>
