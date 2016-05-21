var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require("../models/event"); //モデルの宣言
var moment = require("moment");
var app = express();
var ObjectID = require('mongodb').ObjectID;

/**
 * サンプルデータ投入
 *db.event.save({name:"araki",event:"eat"})
 */

/**
 * GET index
 */
router.get('/events', function(req, res) {
  var params = {}

  if (req.query.date) {
    params.date = req.query.date
  }

  console.log("一覧表示命令来た");
  Event.find(params, function(err, events) {
    res.json(events);
    console.log(events)
  });
});

router.get("/date-sum", function(req, res){
  console.log("/month-sumにアクセスがありました. クエリは");
  console.log(req.query);
  var dateTime = req.query.date;
  Event.find({date: dateTime}, function(err, events) {
    var sum_people_per_day = 0;
    for(var i=0; i<events.length; i++){
      sum_people_per_day += events[i]["num_of_people"];
    }
    res.json(sum_people_per_day);
  })
});

module.exports = router;
