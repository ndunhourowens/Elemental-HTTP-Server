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

// **************** GET request

// write a condition to verify a get request


  request.on('data', function(dataInFiles){
    dataBuffer += dataInFiles;
    // var data = qs.parse( dataBuffer.toString() );
  });
console.log(request);

  request.on('end',function(){
    // read the input from the browser
    var inputFromBrowser = url.parse(request.url);
    console.log('what this qs? \n', qs.parse);

    // verify if the GET url request is in the public folder ==> return file
    fs.readFile('./public/' + inputFromBrowser.path, function(err, dataInFiles){
        // return the 404.html
        if(err) {
          // if url does not exist in public folder throw an error
          fs.readFile('./public/404.html',function(err2,dataFrom404) {
            response.end(dataFrom404.toString());
          });
        } else {
          response.end(dataInFiles.toString());
        }
    });
  });
});

// *************  POST request
var eleName = 'eleName';
var eleSymbol = 'eleSymbol';
var eleAtomNum = 'eleAtomNum';
var eleDes = 'eleDes';

// var querystring = url.parse( request.url, true);

var element = (
  '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>The Elements - ' + eleName + '</title> <link rel="stylesheet" href="/css/styles.css"> </head> <body> <h1>' + eleName + '</h1> <h2>' + eleSymbol + '</h2> <h3>' + eleAtomNum +'</h3> <p>' + eleDes + '</p> <p><a href="/">back</a></p> </body> </html>'
);


fs.writeFile( './public/' + eleName + '.html', element, function(err){
  if(err) throw new Error('could not write to testing.html' + err.message);
   console.log('done write to uber.txt');

});

server.listen(PORT, function(){

});