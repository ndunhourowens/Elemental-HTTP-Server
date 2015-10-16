/*

Jason and Jon,

  i know my code looks like puke, but i really do have the intention of refactoring this and
  making it cleaner.  The example of swtich case made a lot of sense, and it made me realize
  the areas where I can create a global variable that can be used in each method (GET, PUT, etc).

*/



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

  request.on('data', function(dataFromPost){
    dataBuffer += dataFromPost;
  });

  request.on('end', function() {
    // body...
    var querystring = url.parse(request.url);
    var newElement = qs.parse(dataBuffer.toString() );
    var elements = null; // empty array
    var newElementPage = (
      '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>The Elements - ' + newElement.eleName + '</title> <link rel="stylesheet" href="/css/styles.css"> </head> <body> <h1>' + newElement.eleName + '</h1> <h2>' + newElement.eleSymbol + '</h2> <h3>' + newElement.eleAtomNum +'</h3> <p>' + newElement.eleDes + '</p> <p><a href="/">back</a></p> </body> </html>'
    );

    // printing a new Element from the postman
    fs.writeFile( './public/' + newElement.eleName.toLowerCase() + '.html', newElementPage, function(err){
      if(err) throw new Error('could not write to testing.html' + err.message);
      console.log('done write to uber.txt');
    });
  // +++++++++++++++++++ start of rendering li to index
    // code a rendering code to insert into the index

    fs.readdir('./public', function(err, files){
      if(err) throw new Error('./public dir does not exist or is not readable' + err.message);

      // only want html element files
      elements = files.filter(function(file){
        return file.indexOf('.html') > 1 &&
          file !== '404.html' &&
          file !== 'index.html';
      }).map(function(elementFileName){
        return elementFileName.substr(0, elementFileName.indexOf('.html'));
      }).map(function(lowerCasedElementName){
        return lowerCasedElementName.substr(0,1).toUpperCase() + lowerCasedElementName.substr(1);
      });

      console.log('NEWELEMnt', newElement);
      //elements array is initialized
      //write our rendered index.html
      replaceIndex();
    });

    function replaceIndex(){
      fs.readFile('./templates/tempIndex.html', function(err, template){
        if(err) throw new Error('could not write to tempIndex.html' + err.message);

        // create the LI in html
        var createLI = elements.map(function(elementName){
        var newPath = ('/' + elementName.toLowerCase() + '.html');
        var newli = ("<li> <a href=" + newPath + ">" + elementName + "</a> </li>");

          return newli;
        });

  // console.log(request);
        var render = template.toString().replace('{{listOfElements}}', createLI.join('\n'));

        fs.writeFile('./public/index.html', render, function(err){
          if(err) throw new Error('could not write to ./public/index.html', err.message);
        });

      });
    }
  });
}else if(request.method === 'PUT'){
  // example http://stackoverflow.com/questions/23330107/what-is-the-format-of-a-http-put-request
  request.on('data', function(dataFromPost){
    dataBuffer += dataFromPost;
  });

  request.on('end', function() {

    var inputFromBrowser = url.parse(request.url);
    var fileToUpdate = qs.parse(dataBuffer.toString() );
    var elements = null; // empty array
    var updatePage = (
      '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>The Elements - '+ fileToUpdate.eleName + '</title> <link rel="stylesheet" href="/css/styles.css"> </head> <body> <h1>' + fileToUpdate.eleName + '</h1> <h2>' + fileToUpdate.eleSymbol + '</h2> <h3>' + fileToUpdate.eleAtomNum +'</h3> <p>' + fileToUpdate.eleDes + '</p> <p><a href="/">back</a> </p> </body> </html>');
    var tempFile = './templates/' + fileToUpdate.eleName.toLowerCase() + '.html';

    // create an array to verify user request is in file system
    fs.readdir('./public', function(err, files){
      if(err) throw new Error('./public dir does not exist or is not readable' + err.message);
      // console.log(files);
      // only want html element files
      elements = files.filter(function(file){
        return file.indexOf('.html') > -1 &&
          file !== '404.html' &&
          file !== 'index.html';
      }).map(function(elementFileName){
        return '/'+elementFileName;
      });

      // check to see if the `eleName` is in the `elements`
      // if(elements === inputFromBrowser.path){

        // create the updated file in a temp file
        fs.writeFile(tempFile, updatePage, function(err){
          if(err) throw new Error('could not write a temp file' + err.message);
        });

        // replace the old file with the updated file

        fs.writeFile('./public' + inputFromBrowser.path, updatePage, function(err){
          if(err) throw new Error('could not write to temp file' + err.message);
        });

      // }
          // else return 500 server
    });
    // if request path doesnot exist ==> 500server {Content-Type: application/json}
      // && {"error": "resource /carbon.html does not exist"}

    // if request http PUT request sucess ==> http response code 200 {Content-Type: application/json}
      // && {"sucess": true}

  });
}// End of PUT request
// +++++++++++++++++++ end of rendering li to index

}); // end of var server

server.listen(PORT, function(){

});