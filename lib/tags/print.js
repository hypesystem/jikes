function parsePrintTag(arg, callback) {
  if(typeof this.variables[arg] === "undefined") {
    return callback("Undefined variable: "+arg);
  }
  console.log("it exists, returning", this.variables[arg]);
  callback(this.variables[arg]);
}

module.exports = {
  name: "print",
  parse: parsePrintTag
};

