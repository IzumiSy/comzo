import Vue from 'vue'
import Resource from 'vue-resource'
import rootComponent from './root.js'

Vue.use(Resource)

var app = new Vue({
  el: "#root-container",

  components: {
    'root-view': rootComponent
  },

  created() {
    console.info("[APP] Vue app created.")
  }
})
