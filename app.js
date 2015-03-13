var fs = require("fs");
var express = require("express");

var basePath = process.argv[2];

console.log("Started jikes @ "+basePath);

var app = express();

app.use(function(req, res, next) {
  res.header("Content-Type", "text/html");
  next();
});

app.get("/", function(req, res) {
  tryRunPage("/index", req, res);
});

app.get("/*", function(req, res) {
  tryRunPage(req.path, req, res);
});

function tryRunPage(page, req, res) {
  var filePath = basePath+"/pages"+page;
  var javascriptFilePath = filePath+".js";
  var htmlFilePath = filePath+".htm";
  fs.readFile(htmlFilePath, function(err, data) {
    if(err) {
      res.end("Failed to read the file "+htmlFilePath+": "+JSON.stringify(err));
      return;
    }
    res.end(data);
  });
}

app.listen(80);

