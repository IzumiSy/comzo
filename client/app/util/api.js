import Vue from 'vue'

export default class API {
  const API_HOST = ""

  static FetchHeatMap() {
    return (new Promise((resolve, reject) => {
      Vue.http.get(API_HOST, (data, status, request) => {
        resolve(data)
      }).error((data, status, request) => {
        reject(data)
      })
    }))
  }
}
