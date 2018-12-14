  <template>
   <div class="listCommonWrap" :style="{height: temHeight}">
     <div class="navList" :id="id">
       <div class="navListCon">
         <div class="wdDetailNav">
           <span class="wdDetailNavSp" v-for="(i, index) in listDataArr.navList" :style="{'width': index === 0 ? firstSpWidth:'inherit'}">{{i.navTitle}}</span>
         </div>
         <div class="listInfoWrap">
           <ul>
             <li v-if="listDataArr.title === '气象' && index < 10"
                 v-for="(i, index) in listData" :style="{background: activeNote === index? 'rgba(0, 61, 112, 0.6)': ''}"
                 @click="getGeoData(i, index)"
                 @mouseover="handleMouseOver(i, index)"
                 @mouseout="handleMouseOut(i, index)">
               <span class="firstSp" :style="{width: firstSpWidth}">
                 <span class="firstSpBox">{{index + 1}}</span>
                 <!--<span class="firstSpBox" :style="{'background-color': index < 6? '#FF6E45': '#63BAFF'}">{{index + 1}}</span>-->
               </span>
               <div  class="listInfoWrapSp">
                 <p>{{i.lxmc}}</p>
                 <p>{{i.sxxfx | formatSxxfx}}</p>
               </div>
               <div class="listInfoDb listInfoWrapSp">
                 <p>{{i.qdzh | formatZh}}</p>
                 <p>{{i.zdzh | formatZh}}</p>
               </div>
               <div class="listInfoDb listInfoWrapSp">
                 <p><span class="comClass">{{i.yxlc}}</span> 公里</p>
                 <!--<p><span class="comClass" :style="{color: index < 6? '#FF6D44': ''}">{{i.yxlc}}</span> 公里</p>-->
                 <p>
                   <span class="comClass" >{{i.sz}}</span>
                   <span v-if="listDataArr.navList[listDataArr.navList.length - 1].navTitle === '里程/能见度'">km</span>
                   <span v-if="listDataArr.navList[listDataArr.navList.length - 1].navTitle === '里程/降水量'">mm</span>
                   <span v-if="listDataArr.navList[listDataArr.navList.length - 1].navTitle === '里程/风速'">m/s</span>
                   <span v-if="listDataArr.navList[listDataArr.navList.length - 1].navTitle === '里程/温度值'">℃</span>
                 </p>
               </div>
             </li>
           </ul>
         </div>
       </div>
     </div>
   </div>
  </template>
  <style lang="scss">
    .listCommonWrap{
      .wdDetailNav span{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: #222;
        border-bottom: 1px solid rgba(44, 132, 206, 0.39);
      }
      .wdDetailNavSp{
        color: #50afff!important;
      }
      .navList{
        height: 100%;
        width: 100%;
        .navListCon{
          height: 100%;
          overflow: hidden;
          .listInfoWrap{
            height: calc(100% - 40px);
            overflow: hidden;
            ul{
              width: 100%;
              li{
                width: 100%;
                height: 60px;
                cursor: pointer;
                &:hover{
                  background: rgba(0, 61, 112, 0.6);
                }
                .listInfoWrapSp,.firstSp{
                  float: left;
                }
                .firstSp{
                  .firstSpBox{
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    border-radius: 100px;
                    line-height: 26px;
                    margin-top: 22px;
                    text-align: center;
                    background: #003562;
                    color: #50afff;
                  }
                }
                .firstSp, .listInfoDb{
                  float: left;
                  height: 60px;
                  text-align: center;
                }
                .sfzStyle{
                  line-height: 60px;
                }
                .firstSp,.listInfoWrapSp{
                  text-align: center;
                }
                .gczActive{
                  line-height: 60px;
                }
                .gczActiveSpeed{
                  color: #333;
                  font-weight: bold;
                  margin-right: 5px;
                  font-family: SimSun;
                }
                .gczActiveDanwei{
                  color: #646464;
                }
                .clColor{
                  font-weight: bold;
                  font-family: SimSun;
                }
                .comClass{
                  font-family: SimSun;
                  font-weight: bold;
                }
                .gczActiveType{
                  color: #FE0002;
                  font-weight: bold;
                  font-family: SimSun;
                }
                .gczActiveTypes{
                  color: #FFBE00;
                }
                .listInfoDb{
                  p{
                    &:nth-child(1){
                      margin: 6px 0;
                    }
                  }
                }
                .listInfoWrapSp{
                  p{
                    &:nth-child(1){
                      margin: 10px 0;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
          }
          .listInfo{
          }
        }
      }
      .ct{
        color: #3266FF;
      }
      .hx{
        color: #FD9C25;
      }
      .yd{
        color: #F13030;
      }
      .yzyd{
        color: #B80003;
      }
      .fcct{
        color: #00FF00;
      }
      .yb{
        color: #FFC100;
      }
      .yj{
        color: #FFC100;
      }
      .ds{
        color: #FF0000;
      }
      .maintes{
        line-height: 60px;
      }
    }

  </style>
  <script>
    import {mapState} from 'vuex'
    export default {
      props: {
        listDataArr: Object,
        listData: Array,
        id: String,
        firstSpWidth: String,
        temHeight: [String, Number]
      },
      data () {
        return {
          // activeNote: ''
        }
      },
      methods: {
        initWidth () {
          // 获取头部导航栏的个数
          this.$nextTick(function () {
            let wNav = this.listDataArr.navList.length - 1
            $('#' + this.id).find('.wdDetailNavSp:gt(0)').css({
              width: `calc((100% - ${this.firstSpWidth}) / ${wNav})`
            })
            $('#' + this.id).find('.listInfoWrapSp').css({
              width: `calc((100% - ${this.firstSpWidth}) / ${wNav})`
            })
          })
        },
        getGeoData (i, index) {
          this.$emit('geoData', i)
          // this.$store.dispatch('clickDatas', i)
          // this.activeNote = index
          // this.$store.dispatch('isShowBottom', false)
          this.$store.dispatch('clearWeatherSelected', index)
        },
        handleMouseOver (i) {
          this.$emit('handleMouseOver', i)
        },
        handleMouseOut (i) {
          this.$emit('handleMouseOut', i)
        }
      },
      mounted () {
        this.initWidth()
      },
      watch: {
        listData: function (va) {
          this.initWidth()
        },
        listDataArr: function (val) {
          this.listDataArr = val
        }
      },
      computed: {
        ...mapState({
          activeNote: state => state.event.activeNote
        })
      }
    }
  </script>
