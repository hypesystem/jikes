function parseRenderTag(variablesToPassOn, view, callback) {
  if(typeof this.variables[variablesToPassOn] === "undefined") {
    return callback("Undefined variable: "+variablesToPassOn);
  }
  this.render(this.variables[view], this.variables[variablesToPassOn], function(error, result) {
    if(error) {
      return callback("Failed to render view "+view+": "+JSON.stringify(error));
    }
    callback(result);
  });
}

module.exports = {
  name: "render",
  parse: parseRenderTag
};

