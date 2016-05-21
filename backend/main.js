// サーバーサイド
// 必要なパッケージの読み込み
var express = require('express');
var corser = require('corser');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test:27017');

//apiサーバーへのルーティング定義
var api = require('./routes/api');
app.use('/api', api);

app.use(corser.create());
app.listen(port);
console.log('listen on port ' + port);
