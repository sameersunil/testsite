AWS.config.update({region: 'eu-west-1'});
AWS.config.update({
accessKeyId: 'AKIAISFBIZKIWQ7BMYXQ',
secretAccessKey: "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"});

var dynamodb = new AWS.DynamoDB();
var item={};
var mostViewed = { Hits : 0 };
var prod = {};
function updateClick(x){
	console.log(x.ID)
	var params = {
		TableName : 'sq20_Product_List',
		Key : {"ID": { N : ''+x.ID }},
		UpdateExpression : "set Hits = Hits + :val",
		ExpressionAttributeValues: { ":val" : { "N" : "1" } },
		ReturnValues:"UPDATED_NEW"
		};

	dynamodb.updateItem(params, function(err,data){
					if(err) console.log(err);
					else console.log(data);
					}
			    );
	if(x.Hits > mostViewed.Hits){
		mostViewed = x;
		renderMostViewed();
		}
	}

$.getJSON("/data", function(result){
		result.map(function(p){
				item=p;		
				if(p.Hits > mostViewed.Hits){
					console.log(p)
					mostViewed = p;
				}
				$("#pcontainer").append(` <div class="col-xs-6 col-lg-4">
              			<h2>${p.Name}</h2>
              			<img src=${p.URL} width="150px" height="150px" />
              			<p>Rs. ${p.Price} </p>
              			<p>${p.Desc}</p>
				
				<p><a class="btn btn-default" href="javascript:updateClick(item)" id =${p.ID}  role="button">View details »</a></p>
             			</div><!--/.col-xs-6.col-lg-4-->`);
				
 				});
				
		renderMostViewed();
		}
	);

function renderMostViewed(){
	$("#mv").append(`<div class="jumbotron">
                <h2>${mostViewed.Name}</h2>
                <img src=${mostViewed.URL} style="float:left"  width="150px" height="150px" />
                <p>Rs. ${mostViewed.Price}</p>
                <p>${mostViewed.Desc}</p>
                <p><a class="btn btn-default" href="javascript:updateClick(mostViewed)" id = { $mostViewed.ID } role="button">View details »</a></p>
                </div><!--/.col-xs-6.col-lg-4-->`)
}

