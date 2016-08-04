AWS.config.update({region: 'eu-west-1'});
AWS.config.update({
accessKeyId: 'AKIAISFBIZKIWQ7BMYXQ',
secretAccessKey: "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"});

function updateClick(id,p){
	var dynamodb = new AWS.DynamoDB();
	var prd=1;
	var params = {
		TableName : 'sq20_Product_List',
		Key: {"ID": { N: id+''}},
		UpdateExpression: "set Hits = Hits + :val",
		ExpressionAttributeValues:{ ":val": {N: '1'}},
		ReturnValues:"UPDATED_NEW"
		};
	dynamodb.updateItem(params, function(err,data){
					if(err) console.log(err);
					else console.log(data);
					}
			    );
	}

$.ajaxSetup({
  headers : {
    'credentials' : 'include'
  }
});

$.getJSON("/data", function(result){
		var mostViewed ={Hits:0};
 		result.map(function(p){
		if(p.Hits>mostViewed.Hits)
			mostViewed=p;
 		$("#pcontainer").append(` <div class="col-xs-6 col-lg-4">
                <h2>${p.Name}</h2>
                <img src=${p.URL} width="150px" height="150px" />
                <p>Rs. ${p.Price}</p>
                <p>${p.Desc}</p>
                <p><a class="btn btn-default" href="javascript:updateClick(${p.ID})" id=${p.ID}  role="button">View details »</a></p>
                </div><!--/.col-xs-6.col-lg-4-->`);
 		});
var p=mostViewed;
$("#mv").append(`<div class="jumbotron">
              <h2>${p.Name}</h2>
              <img src=${p.URL} style="float:left"  width="150px" height="150px" />
<p>Rs. ${p.Price}</p>
              <p>${p.Desc}</p>

              <p><a class="btn btn-default" href="javascript:updateClick(${p.ID})" id=${p.ID}  role="button">View details »</a></p>
            </div><!--/.col-xs-6.col-lg-4-->`)});

