import Vue from 'vue'

import template from './map.html!text'
import './map.scss!'

export default {
  template: template,

  props: {
    data: Object
  },

  data() {
    return {
      map: null
    }
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

        let renderGoogleMap = () => {
          this.map = new google.maps.Map(this.$el, {
            center: defaultPosition,
            disableDefaultUI: true,
            zoom: 14,
            styles: [
              {
                featureType: "poi",
                stylers: [{
                  visibility: "off"
                }]
              }
            ]
          })
          google.maps.event.trigger(this.map, 'resize')
        }

        setTimeout(renderGoogleMap, 1000)
      })
    },

    updateHeatmap() {
      // update
    }
  }
}
