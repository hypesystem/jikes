var async = require("async");
var _ = require("lodash");
var util = require("util");

var TagParser = function(render) {
  this.tags = {};
  this.render = render;
};

TagParser.prototype.registerTag = function(tagData) {
  if(!tagData.name) {
    throw new Error("Fatal: Missing name of tag in data given to TagParser");
  }
  if(!tagData.parse) {
    throw new Error("Fatal: Missing parse function of tag in data given to TagParser");
  }
  this.tags[tagData.name] = tagData;
};

TagParser.prototype.parseView = function(viewHtmlAsString, variables, callback) {
  replaceEachTag.call(this, viewHtmlAsString, function(tagName, args, next) {
    args.push(next);

    var tag = this.tags[tagName];
    tag.parse.apply({
      variables: variables,
      render: this.render
    }, args);
  }.bind(this), callback);
};

function replaceEachTag(viewHtmlAsString, parseWithVariables, callback) {
  var regex = buildRegex.call(this);
  var parts = viewHtmlAsString.split(regex);
  var result = "";
  var i = 0;
  async.eachSeries(parts, function(part, next) {
    if(i % 5 == 0) {
      result += parts[i + 0];
      if(!parts[i + 1]) return next();
      var tagName = parts[i + 1];
      var args = [];
      if(parts[i + 2]) args.push(parts[i + 2].trim());
      if(parts[i + 3]) args.push(parts[i + 3].trim());
      if(parts[i + 4]) args.push(parts[i + 4].trim());
      parseWithVariables.call(this, tagName, args, function(tagResult) {
        result += tagResult;
	i++;
	next();
      });
    }
    else next();
  }.bind(this), function(error) {
    if(error) callback(error);
    callback(null, result);
  });
}

function buildRegex() {
  var tagNameMatcher = Object.keys(this.tags).join("|");
  return new RegExp("<("+tagNameMatcher+")(\\s+[aA-zZ]+)(\\s+[aA-zZ]+)?(\\s+[aA-zZ]+)?>", "g");
}

module.exports = TagParser;

