const express = require('express');
const app = express();

app.listen(3000, function(){
  console.log('Server is now connected to port 3000.');
});

app.use(express.static(__dirname + '/'));

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});