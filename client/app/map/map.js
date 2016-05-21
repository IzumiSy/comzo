import Vue from 'vue'
import API from '../util/api.js'

import template from './map.html!text'
import './map.scss!'

export default {
  template: template,

  props: {
    data: Object
  },

  data() {
    return {
      map: null,
      points: [ {} ]
    }
  },

  watch: {
    data: {
      handler() {
        this.updateHeatmap()
      },
      deep: true
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
        let defaultPosition = pos ? {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        } : {
          lat: -34.397,
          lng: 150.644
        }

        setTimeout(() => {
          this.renderGoogleMap(defaultPosition)
        }, 500)
      })
    },

    renderGoogleMap(defaultPosition) {
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
    },

    updateHeatmap() {
      API.FetchHeatmap().then((response) => {
        if (!response || !response.data) {
          return
        }

        data.response.forEach((data) => {
          this.points.pish(new window.google.maps.LatLng(
            data.latitude, data.longitude
          ))
        })
      })
    }
  }
}
