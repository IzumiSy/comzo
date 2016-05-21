var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require("../models/event"); //モデルの宣言
var app = express();

// GET index
/*
  サンプルデータ投入
  db.event.save({name:"araki",event:"eat"})
*/
router.get('/events', function(req, res) {
  console.log("一覧表示命令来た");

  var params = req.query.date ? {
    date: req.query.date
  } : {}

  Event.find(params, function(err, events) {
    res.json(events);
    console.log(events)
  });
});

module.exports = router;
