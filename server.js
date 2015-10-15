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

if(request.method === 'GET'){
  request.on('data', function(dataInFiles){
    dataBuffer += dataInFiles;
    // var data = qs.parse( dataBuffer.toString() );
  });

  request.on('end',function(){
    // read the input from the browser
    var inputFromBrowser = url.parse(request.url);

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
}else if(request.method === 'POST'){
// *************  POST request
  // var eleName = 'eleName';
  // var eleSymbol = 'eleSymbol';
  // var eleAtomNum = 'eleAtomNum';
  // var eleDes = 'eleDes';


  request.on('data', function(dataFromPost){
    dataBuffer += dataFromPost;
  });

  request.on('end', function() {
    // body...
    var querystring = url.parse(request.url);
    var newElement = qs.parse(dataBuffer.toString() );
    var element = (
      '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>The Elements - ' + newElement.eleName + '</title> <link rel="stylesheet" href="/css/styles.css"> </head> <body> <h1>' + newElement.eleName + '</h1> <h2>' + newElement.eleSymbol + '</h2> <h3>' + newElement.eleAtomNum +'</h3> <p>' + newElement.eleDes + '</p> <p><a href="/">back</a></p> </body> </html>'
    );
    fs.writeFile( './public/' + newElement.eleName + '.html', element, function(err){
      if(err) throw new Error('could not write to testing.html' + err.message);
      console.log('done write to uber.txt');
    });
  });

}  // end of if statement
}); // end of var server


server.listen(PORT, function(){

});