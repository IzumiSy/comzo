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

router.get("/date-sum", function(req, res) {
  console.log("/month-sumにアクセスがありました. クエリは");
  console.log(req.query);
  var params = {}

  if (req.query.date) {
    params = req.query.date;
  }

  Event.find(params, function(err, events) {
    var sum_people_per_day = 0;
    events.forEach(function(event) {
      return sum_people_per_day += event["num_of_people"]
    })
    res.json(sum_people_per_day);
  })
});

router.get("/sum-as-week", function(req, res) {
  var date = {}

  if (req.query.date) {
    date = req.query.date
  }

  var _getDateValue = function(date) {
    return new Promise(function(resolve, reject) {
      var _date = date.format('YYYY-M-D')
      Event.find({ date: _date }, function(err, events) {
        var _sum = 0
        events.forEach(function(event) {
          _sum += event["num_of_people"]
        })
        resolve({
          day: _date,
          sum: _sum
        })
      })
    })
  }

  var _date = moment(date).clone()
  var _promises = []

  for (var i = 0;i < 7;i++) {
    _date.add(1, "day")
    _promises.push(_getDateValue(_date))
  }

  Promise.all(_promises).then(function(results) {
    console.log(results)
    res.json(results)
  })
})

module.exports = router;
