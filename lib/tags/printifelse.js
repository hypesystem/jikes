function parsePrintIfElseTag(cond, printIfTrue, printIfFalse, callback) {
  if(typeof this.variables[cond] === "undefined") {
    return callback("Undefined condition: "+cond);
  }
  if(typeof this.variables[printIfTrue] === "undefined") {
    return callback("Undefined variable: "+printIfTrue);
  }
  if(typeof this.variables[printIfFalse] === "undefined") {
    return callback("Undefined variable: "+printIfFalse);
  }
  if(this.variables[cond]) {
    return callback(this.variables[printIfTrue]);
  }
  callback(this.variables[printIfFalse]);
}

module.exports = {
  name: "printifelse",
  parse: parsePrintIfElseTag
};

