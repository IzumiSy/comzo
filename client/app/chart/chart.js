import Vue from 'vue'
import API from '../util/api.js'

import template from './chart.html!text'
import './chart.scss!'

export default {
  template: template,

  props: ["date"],

  ready() {
    API.FetchWeekSummary(this.data.date).then((response) => {
      this.renderCharts()
    }).catch((response) => {
      // TODO error handling
    })
  },

  methods: {
    renderCharts() {
      // Do something here
    }
  }
}
