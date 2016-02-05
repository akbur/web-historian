var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!
var urlArray = [];
exports.handleRequest = function (req, res) {
  
  if (req.method==="GET") {
    if (req.url==="/") {
      res.writeHead(200, helper.headers); 
      var filePath = path.join(archive.paths.siteAssets, 'index.html');
      helper.serveAssets(res, filePath, function(fileContents) {
        res.end(fileContents);
      });
    } else {  //if url invalid
      res.writeHead(404, helper.headers);
      res.end("error")
    }
  } else if (req.method==="POST") {

    req.on("data", function(data) {
      urlArray.push(data.toString());
      res.writeHead(200, helper.headers);
      var url = data.toString();
      

      archive.isUrlInList(url, function(found) {

        //if in sites.txt file
        if (found) {        
          console.log('found',found);
          //if archived
          if (archive.isUrlArchived(url)) {
            console.log('arvhiced');
            //TODO display page
          } else { //if not archived
            console.log('not arvhiced');
            //display loading
            var filePath = path.join(archive.paths.siteAssets, 'loading.html');
            helper.serveAssets(res, filePath, function(fileContents) {
              console.log(fileContents);
              res.write(fileContents);
            });
            archive.downloadUrls(url);
          }      
        } else { //if not found
          //append to sites.txt        
          archive.addUrlToList(data);
          //display loading
          console.log("archiving");
          var filePath = path.join(archive.paths.siteAssets, 'loading.html');
          helper.serveAssets(res, filePath, function(fileContents) {
            res.end(fileContents);
          });
        }
      });
        res.end();
    });
    //write urls to archives/sites.txt
  } 
};


//res.end(archive.paths.list);

/*
fs.appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});



var stream = fs.createReadStream(‘my-file.txt’);
stream.on(‘data’, function(chunk){
  stream.open()

  // do something with part of the file
  //open file once and then call write for each entry
});
stream.on(‘end’, function(chunk){
  // reached the end
});






*/