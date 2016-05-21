// app/models/todo.js
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('Event', new Schema({
  date: String,
  venue: String,
  longitude: Number,
  latitude: Number,
  num_of_people: Number
}, {
  collection: "Event" // これを指定しないと, 勝手に複数形になり, todosでアクセスされてしまう.
});
