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

TagParser.prototype.parseView = function(viewHtmlAsString, variables) {
  var regex = buildRegex.call(this);
  return viewHtmlAsString.replace(regex, function() {
    var tagName = arguments[1];
    var args = _.filter(Array.prototype.slice.call(arguments, 2), util.isString);
    args = _.map(args, function(arg) {
      return arg.trim();
    });

    var tag = this.tags[tagName];
    return tag.parse.apply({
      variables: variables
    }, args);
  }.bind(this));
};

function buildRegex() {
  var tagNameMatcher = Object.keys(this.tags).join("|");
  return new RegExp("<("+tagNameMatcher+")(\\s+[aA-zZ]+)(\\s+[aA-zZ]+)?(\\s+[aA-zZ]+)?>", "g");
}

module.exports = TagParser;

