import Vue from 'vue'
import GoogleMap from 'google-maps'
import template from './map.html!text'

export default {
  template: template,

  props: {
    data: Object
  },

  data() {
    return {
      googleMapOptions: {}
    }
  },

  watch: {
    data() {
      console.log("Update")
    }
  },

  ready() {
    GoogleMap.load((google) => {
      new google.maps.Map(this.$el, this.googleMapOptions)
    })

    GoogleMap.onLoad(() => {
      console.info('GoogleMap loaded')
    })
  },

  created() {
    console.info("[APP] mapComponent created")
  }
}
