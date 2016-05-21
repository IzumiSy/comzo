import Vue from 'vue'

import template from './slider.html!text'
import './slider.scss!'

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
