// require/import the HTTP module
var http = require('http');
var PORT = 3000;
var url = require('url');
var qs = require('querystring');
// Create a server
var server = http.createServer(function(request,response){
    console.log('do something in data');
  var dataBuffer = "";

  request.on('data', function(data){
    console.log(dataBuffer);
    dataBuffer += data;
  });

  request.on('end',function(){
    // info from the request POST body
    var data = qs.parse( dataBuffer.toString() );
    response.end( JSON.stringify(data) );

  });
});



// *************  POST request

server.listen(PORT, function(){

});