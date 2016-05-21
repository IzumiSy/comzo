import Vue from 'vue'
import API from '../util/api.js'

import template from './map.html!text'
import './map.scss!'

const MAX_INTENSITY = 150

export default {
  template: template,

  props: {
    data: Object
  },

  data() {
    return {
      map: null,
      heatmap: null,
      points: [],
      hourlyHeatArray: []
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
      this.renderHourly()
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
        streetViewControl: false,
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

    renderHourly() {
      let _hourlyHeatArray = this.hourlyHeatArray
      this.points.forEach((point, i) => {
        point.weight = (_hourlyHeatArray[i][this.data.hour] * MAX_INTENSITY)
      })
      console.log(this.points.map((d) => d.weight))

      Vue.nextTick(() => {
        this.renderHeatmap()
      })
    },

    renderHeatmap() {
      if (this.heatmap) {
        this.heatmap.setMap(null)
      }

      this.heatmap =
        new window.google.maps.visualization.HeatmapLayer({
          data: this.points,
          map: this.map,
          radius: 65,
          maxIntensity: MAX_INTENSITY
        })

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
            weight: (data.houry_num[this.data.hour] * MAX_INTENSITY)
          })
          this.hourlyHeatArray.push(data.houry_num)
        })
      })
    }
  }
}
