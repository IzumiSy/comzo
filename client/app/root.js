import Vue from 'vue'
import template from './root.html!text'
import mapComponent from './map.js'

export default {
  template: template,

  components: {
    'map-view': mapComponent
  },

  created() {
    console.info("[APP] rootComponent created")
  }
}
