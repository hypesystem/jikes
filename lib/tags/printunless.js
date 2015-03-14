function parsePrintUnlessTag(cond, arg) {
  if(typeof this.variables[cond] === "undefined") {
    return "Undefined condition: "+cond;
  }
  if(typeof this.variables[arg] === "undefined") {
    return "Undefined variable: "+arg;
  }
  if(!this.variables[cond]) {
    return this.variables[arg];
  }
  return "";
}

module.exports = {
  name: "printunless",
  parse: parsePrintUnlessTag
};

