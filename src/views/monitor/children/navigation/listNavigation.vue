<template>
  <div class="list-navigation clearfix">
    <div
      class="tilt-navigator"
      v-for="item in navigator"
      :class="selected === item.alias ? 'itemSelected':''"
      @click="clickNavigator(item)">
      <span>{{item.label}}</span>
    </div>
  </div>
</template>
<style lang="scss">
  .list-navigation {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    .tilt-navigator {
      //float: left;
      height: 100%;
      text-align: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 76px;
      span:nth-child(1) {
        font-family: SimSun;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        color: rgb(60,60,60);
        display: inline-block;
        position:relative;
      }
      /*.lineMark {
        width:50px;
        height:2px;
        background-color:rgb(26,130,238);
        position:absolute;
        top:37px;
        left:15px;
      }*/
    }
    .itemSelected {
      position:relative;
      span:nth-child(1){
        color:#50afff;
      }
      &:after{
        display:block;
        content:'';
        width:75%;
        height:2px;
        background-color: rgb(26,130,238);
        position:absolute;
        bottom:1px;
      }

    }
  }
</style>
<script>
  export default {
    props: {
      navigator: {
        type: Array,
        default: function () {
          return []
        }
      },
      isDefaultLook: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    data () {
      return {
        selected: null
      }
    },
    mounted () {
      // let number = this.navigator.length
      // let offsetWidth = document.querySelector('.list-navigation').offsetWidth
      // this.navigator.forEach((el, index) => {
      //   document.getElementsByClassName('tilt-navigator')[index].style.width = (offsetWidth / number) + 'px'
      // })
      if (this.navigator.length > 0 && this.isDefaultLook) {
        this.clickNavigator(this.navigator[0])
      }
    },
    watch: {
      navigator (v, ov) {
        let number = this.navigator.length
        let offsetWidth = document.querySelector('.list-navigation').offsetWidth
        this.navigator.forEach((el, index) => {
          document.getElementsByClassName('tilt-navigator')[index].style.width = (offsetWidth / number) + 'px'
        })
        if (this.navigator.length > 0 && this.isDefaultLook) {
          this.clickNavigator(this.navigator[0])
        }
      }
    },
    methods: {
      clickNavigator: function (item) {
        this.selected = item.alias
        this.$emit('click-navigator', item)
        this.$store.dispatch('isShow', false)
      }
    },
    components: {}
  }
</script>
