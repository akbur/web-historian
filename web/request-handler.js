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
      helper.serveAssets(res, __dirname + '/public/index.html', function(fileContents){
        console.log(fileContents);
        res.end(fileContents);
      });
    } else {  //if url invalid
      res.writeHead(404, helper.headers);
      res.end("error")
    }
  } else if (req.method==="POST") {
    //save urls in an array
    req.on("data", function(data) {
      urlArray.push(data.toString());
      res.writeHead(200, helper.headers);
      console.log(urlArray);
      fs.appendFile(archive.paths.list, data.toString() + '\n', function(err){
        if (err) {console.log(err); };
        res.end();
      });

    });
    //write urls to archives/sites.txt
  }  
};


exports.readListOfUrls = function(){
};

exports.isUrlInList = function(){
};

exports.addUrlToList = function(){
};

exports.isUrlArchived = function(){
};

exports.downloadUrls = function(){
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