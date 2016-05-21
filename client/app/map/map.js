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
      heatmap: null,
      points: []
    }
  },

  events: {
    'map:render:heatmap': function() {
      this.renderHeatmap()
    }
  },

  ready() {
    this.initializeGoogleMap()

    // Heatmap update must be right after initilization
    // of Google Map instance creation
    this.$watch('data.date', (v) => {
      this.updateHeatmap()
      this.renderHeatmap()
    })
    this.$watch('data.hour', () => {
      // Just change heatmap hour, not make a request to backend
    })
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
          this.renderHeatmap()
        }, 500)

        console.info('[Fire] initializeGoogleMap')
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
      console.info('[Fire] renderGoogleMap')
    },

    renderHeatmap() {
      if (this.heatmap) {
        this.heatmap.setMap(null)
      }

      this.heatmap =
        new window.google.maps.visualization.HeatmapLayer({
          data: this.points,
          map: this.map
        })
      this.heatmap.set('radius', 50)

      console.info('[Fire] renderHeatmap')
    },

    updateHeatmap() {
      console.info('[Fire] updateHeatmap')

      API.FetchHeatmap(this.data.date).then((response) => {
        if (!response || !response.data) {
          return
        }

        this.points = []
        response.data.forEach((data) => {
          this.points.push({
            location: new window.google.maps.LatLng(data.latitude, data.longitude),
            weight: data.num_of_people
          })
        })
      })
    }
  }
}
