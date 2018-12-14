<template>
  <div class="sf-plot-header">
    <ul class="clearfix">
      <li
        v-for="(tool, index) in tools"
        class="sf-plot-header-li"
        :class="{true: 'sf-plot-selected'}[selected === tool.alias]"
        @click="changeSelectedItem(tool, index)">
        <img :src="'static/images/plot/' + tool.src" :alt="tool.name">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'plot-header',
    props: {
      tools: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        selected: ''
      }
    },
    methods: {
      changeSelectedItem (tool) {
        this.selected = tool['alias']
        if (tool['alias']) {
          this.$emit('selected', tool)
        } else {
          console.warn('不存在的标绘类型！')
        }
      }
    },
    destroyed () {
    }
  }
</script>

<style lang="scss">
  $plot-blue: #20A1FF;
  $font-color: #90949F;
  .sf-plot-header {
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
    &-li {
      padding: 5px;
      width: 32px;
      height: 32px;
      float: left;
      color: $font-color;
      text-align: center;
      line-height: 32px;
      background-repeat: no-repeat;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        cursor: pointer;
        color: $plot-blue;
      }
    }
    .sf-plot-selected {
      color: $plot-blue;
    }
  }
</style>
