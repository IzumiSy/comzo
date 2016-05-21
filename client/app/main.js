import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

var app = new Vue({
  created: {
    console.info("[APP] Vue app created")
  }
})
