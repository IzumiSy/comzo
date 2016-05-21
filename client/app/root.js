import Vue from 'vue'
import template from './root.html!text'

export default {
  template: template,

  created() {
    console.info("[APP] rootComponent created")
  }
}
