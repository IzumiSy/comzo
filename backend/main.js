// サーバーサイド
// 必要なパッケージの読み込み
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({region: 'us-west-2'});

var params = {
    ExclusiveStartTableName: 'STRING_VALUE',
    Limit: 10
};

dynamodb.listTables(params, function(err, data) {
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {
        console.log(data);           // successful response
    }
});

var params = {TableName:'events'};
dynamodb.describeTable(params, function(err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log(data);
        // php.var_dump(data);
    }
});

//apiサーバーへのルーティング定義
var api = require( './routes/api' );
app.use('/api', api);

app.listen(port);
console.log('listen on port ' + port);
