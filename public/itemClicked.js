function updateClick(id)
{
var dynamodb = new AWS.DynamoDB();
var params = {

TableName : 'sq20_Product_List',
Key: 
{
ID : { N: id }
},
AttributeUpdates: {
Hits : 'ADD',
Value :  {N: 1}
}
}
}
};
dynamodb.updateItem(params, function(err,data){
if(err) console.log(err);
else console.log(data);
});


}
