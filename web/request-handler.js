var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
var request = require('request');
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
      
      //test
      request({
        url: 'http://'+ url,
        }, function(err, res, body) {
          console.log(body);
          //console.log(path.join(helper.archivedSites, url, ".html"));
          fs.writeFile(archive.paths.archivedSites+'/'+url+".html", body, function(error){
            if (error) {console.log("error");};
          });
        } 
      );


      //end test

      //in sites.txt?
      archive.isUrlInList(url, function(found) {
        console.log('found',found);
        if (found) {
          //is it archived?
            //if yes      
              //display page
            //if no
              //display loading
        } else {
          //append to sites.txt        
          archive.addUrlToList(data);
          //display loading
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