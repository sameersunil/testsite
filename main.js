var express= require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('src/view'));

var $credentials = {
    "accessKeyId": "AKIAJLZD7P45UGLBWJRQ",
    "secretAccessKey": "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",
    "region": "eu-west-1"
}

app.get('/data',function(req,res){
var DynamoDB = require('aws-dynamodb')($credentials)

DynamoDB.table('sq20_Product_List')
	.scan(function(err, data){


			res.setHeader('content-type', 'application/json');
          		res.send(data);
			});
		});

var port = 5000;
app.listen(port,function(err){
	console.log('running on port 5000');
	});
