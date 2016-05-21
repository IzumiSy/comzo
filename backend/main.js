// サーバーサイド
// 必要なパッケージの読み込み
var express = require('express');
var mongoose = require("mongoose");
var api = require('./routes/api');
var router = express.Router();
var app = express();

mongoose.connect('mongodb://localhost/test');

app.set('port', process.env.PORT || 3000)
app.use(app.router)

// apiサーバーへのルーティング定義
router.get(api.getEvents.path, api.getEvents.handler);

app.listen(port);

console.log('listen on port ' + port);
