var express= require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('src/view'));

var port = 5000;
app.get('/',function(req,res){
res.send('Hello world');
});
app.listen(port,function(err){
console.log('running on port 5000');
});

