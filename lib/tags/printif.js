function parsePrintIfTag(cond, arg, callback) {
  if(typeof this.variables[cond] === "undefined") {
    return callback("Undefined condition: "+cond);
  }
  if(typeof this.variables[arg] === "undefined") {
    return callback("Undefined variable: "+arg);
  }
  if(this.variables[cond]) {
    return callback(this.variables[arg]);
  }
  callback("");
}

module.exports = {
  name: "printif",
  parse: parsePrintIfTag
};

