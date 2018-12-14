import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import panel from './modules/panel'
import event from './modules/event'
import map from './modules/map'
import plot from './modules/plot'
import pathAnalysis from './modules/pathAnalysis'
import lucene from './modules/lucene'
import infrastructure from './modules/infrastructure'
import weather from './modules/weather'
import perimeter from './modules/perimeter'
import mapOrientate from './modules/mapOrientate'
import cljg from './modules/cljg'
import tools from './modules/tools'
import perimeterInfo from './modules/perimeterInfo'
import control from './modules/control'
import roadWatch from './modules/roadWatch'
import BriefDetails from './modules/BriefDetails'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    search,
    panel,
    event,
    map,
    lucene,
    plot,
    pathAnalysis,
    infrastructure,
    weather,
    perimeter,
    mapOrientate,
    cljg,
    tools,
    perimeterInfo,
    control,
    roadWatch,
    BriefDetails
  }
})
