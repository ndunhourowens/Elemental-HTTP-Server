// require/import the HTTP module
var http = require('http');
var PORT = 3000;
var url = require('url');
var qs = require('querystring');

// reading files
var fs = require('fs');
// Create a server
var server = http.createServer(function(request,response){
  var dataBuffer = "";

  request.on('data', function(dataInFiles){
    dataBuffer += dataInFiles;
    // var data = qs.parse( dataBuffer.toString() );
  });

  request.on('end',function(){
    // read the input from the browser
    var inputFromBrowser = url.parse(request.url);
    console.log(inputFromBrowser);


    fs.readFile('./public' + inputFromBrowser.path, function(err, dataInFiles){
        // return the 404.html
        if(err) {
          fs.readFile('./public/404.html',function(err2,dataFrom404) {
            response.end(dataFrom404.toString());
          });
        } else {
          response.end(dataInFiles.toString());
        }
    });


    // if user request for information it is a GET method...

    // verify if the GET url request is in the public folder ==> return file

    // if url does not exist in public folder throw an error


  });
});



// *************  POST request

server.listen(PORT, function(){

});