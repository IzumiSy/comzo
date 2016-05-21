import Vue from 'vue'
import template from './root.html!text'

import mapComponent from './map.js'
import sliderComponent from './slider.js'
import dateComponent from './datepicker.js'

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
      this.heatmap.date = data
      console.log(data)
    },

    'datepicker:date:changed': function(data) {
      this.heatmap.hour = data
      console.log(data)
    }
  },

  created() {
    console.info("[APP] rootComponent created")
  }
}
