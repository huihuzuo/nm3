<template>
  <div class="weather-index">
    <div class="weather-header">
      <statistical-button :btnArray="btnArray" :isDefaultLook="true" @click-item="clickItem"></statistical-button>
    </div>
    <div class="weather-content">
      <div class="visibility-wrap" v-if="currentItem">
        <mini-panel :className="'visibility-wrap-mini-panel'">
          <weather-list ref="wea_list" :height="height" :currentItem="currentItem"></weather-list>
        </mini-panel>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .weather-index {
    width: 100%;
    height: 100%;
    .weather-header {
      width: 100%;
      height: 30px;
    }
    .weather-content {
      width: 100%;
      height: calc(100% - 30px);
    }
  }
</style>
<script>
  import statisticalButton from '@/components/common/statisticalButton'
  import miniPanel from '@/components/panels/miniPanel'
  import weatherList from './children/list/weatherList'
  export default {
    props: {},
    data () {
      return {
        btnArray: [],
        currentItem: null
      }
    },
    mounted () {
      this.weatherHead()
    },
    watch: {
    },
    methods: {
      clickItem: function (item) {
        this.currentItem = item
        this.$store.dispatch('isShow', false)
        this.height = document.querySelector('.weather-content').offsetHeight - 56 + 24 + 15
      },
      weatherHead () {
        this.$fetch.weatherHead().then(res => {
          this.btnArray = res
        }).catch(error => {
          console.warn(error)
        })
      }
    },
    components: {
      statisticalButton,
      miniPanel,
      weatherList
    }
  }
</script>
