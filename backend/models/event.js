// app/models/todo.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var EventSchema   = new Schema({
    date: String,
    longitude: Number,
    venue: String,
    latitude: Number,
    num_of_people: Number
  },{
    collection:"Event" // これを指定しないと, 勝手に複数形になり, todosでアクセスされてしまう.
  });


module.exports = mongoose.model('Event', EventSchema);
