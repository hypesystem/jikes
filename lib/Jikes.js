var fs = require("fs");
var vm = require("vm");
var express = require("express");
var TagParser = require("./TagParser.js");

var Jikes = function(basePath) {
  this.basePath = basePath;

  this.tagParser = new TagParser();
  this.tagParser.registerTag(require("./tags/print.js"));
  this.tagParser.registerTag(require("./tags/printif.js"));
  this.tagParser.registerTag(require("./tags/printunless.js"));
  this.tagParser.registerTag(require("./tags/printifelse.js"));

  this.app = express();

  this.app.use(function(req, res, next) {
    res.header("Content-Type", "text/html");
    next();
  });

  this.app.get("/", function(req, res) {
    tryRunPage.call(this, "/index", req, res);
  }.bind(this));

  this.app.get("/*", function(req, res) {
    tryRunPage.call(this, req.path, req, res);
  }.bind(this));
};

function tryRunPage(page, req, res) {
  var filePath = this.basePath+"/pages"+page;
  tryRunJavascriptPage.call(this, filePath, req, res, function(error1) {
    if(error1) {
      tryRunHtmlPage(filePath, req, res, function(error2) {
        if(error2) {
          runErrorPage(error1, error2, req, res);
	}
      });
    }
  });
}

function tryRunJavascriptPage(page, req, res, callback) {
  fs.readFile(page+".js", function(err, data) {
    if(err) {
      return callback(err);
    }
    var module = {};
    var context = vm.createContext({
      module: {}
    });
    try {
      vm.runInContext(data, context);
      context.module.exports.call({
        query: req.query
      }, function(viewToRender, variables) {
        renderView.call(this, viewToRender, variables, function(error, html) {
	  if(error) {
            return callback(error);
	  }
	  res.end(html);
	  callback();
	});
      }.bind(this));
    }
    catch(e) {
      console.log("error", e);
      return callback(e);
    }
  }.bind(this));
}

function renderView(view, variables, callback) {
  fs.readFile(this.basePath+"/views/"+view, function(err, data) {
    if(err) {
      return callback(err);
    }
    var result = this.tagParser.parseView(data.toString(), variables);
    callback(null, result);
  }.bind(this));
}

function tryRunHtmlPage(page, req, res, callback) {
  fs.readFile(page+".htm", function(err, data) {
    if(err) {
      return callback(err);
    }
    res.end(data);
    callback();
  });
}

function runErrorPage(error1, error2, req, res) {
  res.end("Failed to read the file<br>"+JSON.stringify(error1)+"<br>"+JSON.stringify(error2));
}

Jikes.prototype.listen = function(port) {
  this.app.listen(port);
};

module.exports = Jikes;

