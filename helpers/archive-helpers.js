var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
};

// Used for stubbing paths for tests
exports.initialize = function (pathsObj) {
  _.each(pathsObj, function (path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function (callback) {
  fs.readFile(exports.paths.list, function (err,sites) {
    sites = sites.toString().split('\n');
    if (callback) {
      callback(sites);
    }
  });
};

exports.isUrlInList = function (url, callback) {
  exports.readListOfUrls(function (sites) {
    var found = _.any(sites, function (site, i) {
      return site.match(url);
    });
    callback(found);
  });
};

exports.addUrlToList = function (data) {
  fs.appendFile(this.paths.list, data + '\n', function (err) {
    if (err) throw err;
  });
};

exports.isUrlArchived = function (url) {
  console.log(!!(exports.paths.archivedSites+'/'+url+".html"));
};

exports.downloadUrls = function (url) {
 request({
   url: 'http://'+ url,
   }, function (err, res, body) {
     console.log("downloadURL success");
     fs.writeFile(exports.paths.archivedSites+'/'+url+".html", body, function (error) {
       if (error) { console.log("error"); }
     });
   }
 );
};
