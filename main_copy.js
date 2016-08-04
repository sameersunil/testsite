var express= require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('src/view'));

var $credentials = {
    "accessKeyId": "AKIAJLZD7P45UGLBWJRQ",
    "secretAccessKey": "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",
    "region": "eu-west-1"
}
var DynamoDB = require('aws-dynamodb')($credentials)
DynamoDB
    .table('sq20_Product_List')
    .scan(function( err, data ) {
	console.log("inside db")
        app.get('/data',function(req,res){
	var credentials = auth(req)
 	console.log(req);
	if(req.headers.host =='52.48.209.169:5000'){
		res.setHeader('content-type', 'application/json');
          	res.send(data);
	} else {
	 	if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret1') {
			res.statusCode = 401
			res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    			res.end('Access denied')
		  } else {
			 res.setHeader('content-type', 'application/json');
		          res.send(data);
  			} 
		}
        })
    });
// Alternatively, use an existing instance of AWS.DynamoDB.
var AWS = require('aws-sdk');
var $db = new AWS.DynamoDB();
var DynamoDB = require('aws-dynamodb')($db);
//
var port = 5000;
app.get('/',function(req,res){
 res.send('Hello world');
});
//
 app.listen(port,function(err){
 console.log('running on port 5000');
 });
var auth = require('basic-auth');
