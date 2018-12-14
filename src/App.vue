<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted () {}
  }
</script>

<style lang="scss">
  #app {
    height: 100%;
    /*overflow: hidden;*/
  }
</style>
