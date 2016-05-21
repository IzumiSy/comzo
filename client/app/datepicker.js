import Vue from 'vue'
import template from './datepicker.html!text'

export default {
  template: template,

  date() {
    return {
      date: null
    }
  },

  watch: {
    date() {
      this.$dispatch('datepicker:date:changed', this.date)
    }
  }
}
