var Event = require("./models/event");
var ObjectID = require('mongodb').ObjectID;
var eventsData = require('./events.json').data

eventsData.forEach(function(data) {
  Event.update({
    _id: new ObjectID()
  }, {
    num_of_people: data["num_of_people"],
    start: data["start"],
    date: data["date"],
    venue: data["venue"],
    longitude: data["longitude"],
    latitude: data["latitude"]
  }, {
    upsert: true
  }, function(err, doc) {
    console.log(doc);
    console.log(err);
    console.log("更新しました?");
  });
})
