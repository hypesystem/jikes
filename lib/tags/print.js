function parsePrintTag(arg) {
  if(typeof this.variables[arg] === "undefined") {
    return "Undefined variable: "+arg;
  }
  return this.variables[arg];
}

module.exports = {
  name: "print",
  parse: parsePrintTag
};

