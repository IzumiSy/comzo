// サーバーサイド
// 必要なパッケージの読み込み
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.listen(port);
console.log('listen on port ' + port);
