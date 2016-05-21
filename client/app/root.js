import Vue from 'vue'
import template from './root.html!text'
import mapComponent from './map.js'
import sliderComponent from './slider.js'

export default {
  template: template,

  components: {
    'map-view': mapComponent,
    'hour-slider': sliderComponent
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
