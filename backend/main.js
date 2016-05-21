// サーバーサイド
// 必要なパッケージの読み込み
var mongoose = require("mongoose");
var express = require('express');
var corser = require('corser');
var api = require('./routes/api');
var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/test:27017');

// Workaround for CORS
app.use(corser.create());

//apiサーバーへのルーティング定義
app.use('/api', api);

app.listen(port);
console.log('listen on port ' + port);
