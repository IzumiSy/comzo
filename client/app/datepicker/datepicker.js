import Vue from 'vue'
import moment from 'moment'

import template from './datepicker.html!text'
import './datepicker.scss!'

export default {
  template: template,

  data() {
    return {
      date: null
    }
  },

  ready() {
    this.date = moment().clone().format('YYYY-MM-DD')
  },

  watch: {
    date() {
      this.$dispatch('datepicker:date:changed', this.date)
    }
  }
}
