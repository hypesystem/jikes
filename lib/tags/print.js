function parsePrintTag(variables, arg) {
  if(typeof variables[arg] === "undefined") {
    return "Undefined variable: "+arg;
  }
  return variables[arg];
}

module.exports = {
  name: "print",
  parse: parsePrintTag
};

