function parsePrintIfElseTag(cond, printIfTrue, printIfFalse) {
  if(typeof this.variables[cond] === "undefined") {
    return "Undefined condition: "+cond;
  }
  if(typeof this.variables[printIfTrue] === "undefined") {
    return "Undefined variable: "+printIfTrue;
  }
  if(typeof this.variables[printIfFalse] === "undefined") {
    return "Undefined variable: "+printIfFalse;
  }
  if(this.variables[cond]) {
    return this.variables[printIfTrue];
  }
  return this.variables[printIfFalse];
}

module.exports = {
  name: "printifelse",
  parse: parsePrintIfElseTag
};

