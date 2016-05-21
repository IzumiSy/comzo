import Vue from 'vue'

const API_HOST = "http://localhost:3000/data"

export default class API {
  static FetchHeatmap() {
    return (new Promise((resolve, reject) => {
      Vue.http.get(API_HOST).then((data) => {
        resolve(data)
      }).catch((data) => {
        reject(data)
      })
    }))
  }
}
