import Vue from 'vue'

const API_HOST = "http://localhost:3000/api/events"

let resource = function(url, options) {
  return Vue.resource(url, null, null, { emulateJSON: true });
}

export default class API {
  static FetchHeatmap(date) {
    return (new Promise((resolve, reject) => {
      resource(API_HOST).get(null, { date: date }).then((data) => {
        resolve(data)
      }).catch((data) => {
        reject(data)
      })
    }))
  }
}
