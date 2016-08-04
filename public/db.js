AWS.config.update({region: 'eu-west-1'});
AWS.config.update({
accessKeyId: 'AKIAISFBIZKIWQ7BMYXQ',
secretAccessKey: "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"});
var dynamodb = new AWS.DynamoDB();
var params = { RequestItems: {
	sq20_Product_List:{
		Keys: [{"ID" :{"N": "1"}} ]
	}}};
var file = new File([""], "data.txt");

dynamodb.batchGetItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else{     
	console.log(data);           // successful response
	file.writeln(data.toString());    	
	}
});

console.log("Test");
