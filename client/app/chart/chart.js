import Vue from 'vue'
import API from '../util/api.js'

import template from './chart.html!text'
import './chart.scss!'

export default {
  template: template,

  props: ["date"],

  watch: {
    date() {
      this.makeRequest()
    }
  },

  ready() {
    this.makeRequest()
  },

  methods: {
    makeRequest() {
      API.FetchWeekSummary(this.date).then((response) => {
        this.renderCharts(response)
      }).catch((response) => {
        // TODO error handling
      })
    },

    renderCharts(res) {
      console.log(res["data"]);
      console.log(res["data"].length);
      console.log(res["data"][0]);
      console.log(res["data"][0]["sum"]);
      var rendering_data = ["混雑度"]
      for(var i=0; i<res["data"].length; i++){
        rendering_data.push(res["data"][i]["sum"])
      }
      console.log(rendering_data)
      console.log("上のレンダリン具データ")
       // Do something here
       var chart = c3.generate({
       bindto: '#chart',
       data: {
         columns: [
           rendering_data,
           ["平均", 120000, 120000, 120000, 120000, 120000, 120000, 120000]
         ],
         types: {
            混雑度: 'spline',
            平均: 'spline'
        }
       },
       axis: {
         y: {
           label: { // ADD
             text: 'Y Label'
           }
         }
       }
   });
    }
  }
}
