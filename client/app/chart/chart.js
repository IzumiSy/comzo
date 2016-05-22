
import template from './chart.html!text'
import './chart.scss!'

export default {
  template: template,
  data() {
    return {
      data_per_week: null
    }
  },
  props: ["date"],
  ready() {
    this.$http.get('http://localhost:3000/api/sum-as-week' + "?date=" + this.date, function (data, status, request) {
        this.data_per_week = data
    })
    .error(function (data, status, request) {
      // handle error
    })
    console.log(this.data_per_week);
    console.log("ああああああああああ");
  }
}
