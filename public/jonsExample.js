// **************** john's example
   // fill in elements with current elements found in public folder
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
    //elements array is initialized
    //write our rendered index.html
    writeIndex();
  });

  // to update the index
 function writeIndex(){
    //get template
    fs.readFile('./templates/index.template.html', function(err, template){
      if(err) throw new Error('./templates/index.template.html does not exist or is not readable.  This file is required by application.', err.message);

      // render list of links for each element
      // into the template {{ listOfElements}}
      var renderedList = elements.map(function(element){
        return ' <li>' +
                  '<a href="{{ filePatn }}">' +
                    '{{ elementName }} '+
                  '</a>' +
                '</li>'.replace('{{ filePatn }}', element.toLowerCase() + ".html")
                .replace("{{ elementName }} ", element);
      });
      var rendered = template.toString().replace("{{ listOfElements }}", renderedList.join('\n'));

      // update the index.html
      fs.writeFile('./public/index.html', rendered, function(err){
        if(err) throw new Error("./public/index.html is not writeable and is required by this application", err.message);

      });
    });
  }

// ***************** End Jon's code