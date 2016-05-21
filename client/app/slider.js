import Vue from 'vue'
import template from './slider.html!text'

export default {
  template: template,

  data() {
    return {
      hour: 0
    }
  },

  watch: {
    hour() {
      this.$dispatch('slider:hour:changed', this.hour)
    }
  }
}
