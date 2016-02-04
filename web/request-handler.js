var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if (req.method==="GET") {
    if (req.url==="/") {
      res.writeHead(200, helper.headers);
      helper.serveAssets(res, './public/index.html', function(fileContents){
        console.log("1");
        console.log(fileContents);
        res.end(fileContents);
      });
    } else {  //if url invalid
      res.writeHead(404, helper.headers);
      res.end("error")
    }
  } else if (req.method==="POST") {
    req.on("data", function(data) {
      console.log(data.toString()); //do something with data
      res.writeHead(200, helper.headers);
      res.end();
    });
  }  
};




/*
res.write(fileContents);
.on('write', function(res) {
  res.end();
})


function sendResp(res, x){
  res.end(x)
}

//res.end(archive.paths.list);

fs.readFile('./public/index.html', 'utf8', function(err, contents) {
  res.end(contents);
})

exports.serveAssets = function(res, asset, callback) {
  fs.readFile(asset, 'utf8', function(err, contents){
    callback(contents);
  });
};

*/