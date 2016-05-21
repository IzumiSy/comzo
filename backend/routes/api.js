var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require("../models/event"); //モデルの宣言
var app = express();

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

module.exports = router;
