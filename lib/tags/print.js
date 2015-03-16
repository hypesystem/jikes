function parsePrintTag(arg, callback) {
  if(typeof this.variables[arg] === "undefined") {
    return callback("Undefined variable: "+arg);
  }
  callback(this.variables[arg]);
}

module.exports = {
  name: "print",
  parse: parsePrintTag
};

