import Vue from 'vue'

const API_HOST = "http://localhost:3000/api/events"

export default class API {
  static FetchHeatmap() {
    return (new Promise((resolve, reject) => {
      Vue.http.get(API_HOST, [], {
        emulateJSON: true
      }).then((data) => {
        resolve(data)
      }).catch((data) => {
        reject(data)
      })
    }))
  }
}
