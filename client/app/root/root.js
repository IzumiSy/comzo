import Vue from 'vue'
import moment from 'moment'

import mapComponent from '../map/map.js'
import sliderComponent from '../slider/slider.js'
import dateComponent from '../datepicker/datepicker.js'

import template from './root.html!text'
import './root.scss!'

export default {
  template: template,

  components: {
    'map-view': mapComponent,
    'hour-slider': sliderComponent,
    'date-picker': dateComponent
  },

  data() {
    return {
      heatmap: {
        date: null,
        hour: null
      }
    }
  },

  events: {
    'slider:hour:changed': function(data) {
      this.heatmap.hour = data
    },

    'datepicker:date:changed': function(data) {
      this.heatmap.date = moment(data).format('YYYY-M-D')
    }
  },

  created() {
    console.info("[APP] rootComponent created")
  }
}
