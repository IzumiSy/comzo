import Vue from 'vue'

const API_HOST = "http://localhost:3000"

let resource = function(url, options) {
  return Vue.resource(url, null, null, { emulateJSON: true });
}

export default class API {
  static FetchHeatmap(date) {
    return (new Promise((resolve, reject) => {
      resource(`${API_HOST}/api/events`).get(null, { date: date }).then((data) => {
        resolve(data)
      }).catch((data) => {
        reject(data)
      })
    }))
  }

  static FetchWeekSummary(date) {
    return (new Promise((resolve, reject) => {
      resource(`${API_HOST}/api/sum-of-week`).get(null, { date: date }).then((data) => {
        resolve(data)
      }).catch((data) => {
        reject(data)
      })
    }))
  }
}
