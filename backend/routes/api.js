var mongoose = require('mongoose');
var Event = require("../models/event");

module.exports = {
  getEvents: {
    path: '/events',
    handler: function(req, res) {
      console.log("一覧表示命令来た");
      Event.find({
        date: req.query.date || undefined
      }, function(err, events) {
        res.json(events);
        console.log(events)
      });
    }
  }
};
