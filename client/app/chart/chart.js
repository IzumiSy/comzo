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
      var rendering_data = ["混雑度"]
      var x_ticks = ["x"]
      for(var i=0; i<res["data"].length; i++){
        rendering_data.push(res["data"][i]["sum"])
        x_ticks.push(res["data"][i]["day"])
      }

      var ave = 0
      var sum = 0
      for(var i=1; i<rendering_data.length; i++){
        sum += rendering_data[i]
      }
      ave = Math.round(sum/rendering_data.length);
       // Do something here
       var chart = c3.generate({
       bindto: '#chart',
       data: {
         x:"x",
         columns: [
           x_ticks,
           rendering_data,
           ["平均", ave, ave, ave, ave, ave, ave, ave]
         ],
         types: {
            "混雑度": 'line',
            "平均": 'line'
        }
       },
       axis: {
         x: {
           type: 'category',
           tick: {
               rotate: 75,
               multiline: false
           },
           height: 130
       },
         y: {
           label: { // ADD
             text: '混雑度'
           }
         }
       }
   });
    }
  }
}
