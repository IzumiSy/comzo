// サーバーサイド
// 必要なパッケージの読み込み
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

//apiサーバーへのルーティング定義
var api = require( './routes/api' );
app.use('/api', api);

app.listen(port);
console.log('listen on port ' + port);
