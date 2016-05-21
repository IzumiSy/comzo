import Vue from 'vue'
import moment from 'moment'

import template from './datepicker.html!text'
import './datepicker.scss!'

export default {
  template: template,

  data() {
    return {
      date: moment().format('YYYY-MM-DD').clone()
    }
  },

  watch: {
    date() {
      this.$dispatch('datepicker:date:changed', this.date)
    }
  }
}
