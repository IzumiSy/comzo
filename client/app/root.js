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

  events: {
    'slider:hour:changed': function(data) {
      // Do something
    },

    'datepicker:date:changed': function(data) {
      // Do something
    }
  },

  created() {
    console.info("[APP] rootComponent created")
  }
}
