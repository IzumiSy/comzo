var express = require('express');
var router = express.Router();
var app = express();;

// GET index
router.get('/',function(req, res){
  console.log("一覧表示命令来た");
});

module.exports = router;
