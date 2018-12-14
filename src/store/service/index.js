/**
 * author     dark
 * date       18/2/9
 */
import axios from 'axios'
import _merge from 'lodash/merge'

// modules
import $Map from './map'
import $Monitor from './monitor'
import $Layers from './layers'
import $Events from './events'
import $Perimeter from './perimeter'
import $Setting from './setting'
const fetch = _merge({}, $Map, $Monitor, $Layers, $Events, $Perimeter, $Setting)
export {
  axios
}

export default fetch
