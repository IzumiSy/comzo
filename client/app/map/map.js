import Vue from 'vue'

import template from './map.html!text'
import './map.scss!'

GoogleMap.KEY =
  "AIzaSyA495d72CnxXzdTjvh1KmVPTUcNN-Quo74"

export default {
  template: template,

  props: {
    data: Object
  },

  watch: {
    data() {
      console.log("Update")
    }
  },

  ready() {
    this.initializeGoogleMap()
  },

  created() {
    console.info("[APP] mapComponent created")
  },

  methods: {
    initializeGoogleMap() {
      (new Promise((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition((pos) => {
          resolve(pos)
        }, () => {
          resolve(null)
        })
      })).then((pos) => {
        let defaultPosition = {
          lat: -34.397,
          lng: 150.644
        }

        if (pos) {
          defaultPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        }
      })
    }
  }
}
